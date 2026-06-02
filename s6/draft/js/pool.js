/* ========================================
   MODOK League Season 6.0 - Pool Generation
   V6.0.0-dev
   ======================================== */

// ===== SEASON 6.0: HERO+ASPECT POOL GENERATION =====
//
// A draftable item is an object:
//   { hero, aspect, aspects, displayName, tier }
//     hero:        base hero name
//     aspect:      primary aspect (the group's aspect in Order mode)
//     aspects:     all aspects on the item (two for Spider-Woman, otherwise one)
//     displayName: "Hero - Aspect" (or "Hero - AspectA / AspectB" for Spider-Woman)
//     tier:        index into draftOrder (lower = higher tier), for bot priority
//
// generateS6DraftPool(options, rng) returns:
//   { groups: [ [item,...] x4 ], excluded: [heroName,...], error: (string|null) }
//
// options:
//   mode:           'chaos' | 'order'
//   universe:       'multiverse' | 'single'
//   itemsPerGroup:  integer (kouples + extras)
//   heroPool:       array of available hero names (already filtered for outright bans)
//   requiredHeroes: array of hero names to force in (subset of heroPool), or []
//   isComboBanned:  optional function(hero, aspect) -> bool

var S6_GROUP_COUNT = 4;

// ---- Win-rate placeholders for "additional" heroes (no community data) ----
var s6KnownSortedWR = null;   // cached descending list of known combo win rates
var s6BonusWinRates = {};     // additional hero -> { aspect: winRate } for the current pool

function s6KnownWinRates() {
  if (s6KnownSortedWR) { return s6KnownSortedWR; }
  var vals = [];
  if (typeof HERO_WINRATES !== 'undefined') {
    for (var h in HERO_WINRATES) {
      if (!HERO_WINRATES.hasOwnProperty(h)) { continue; }
      for (var i = 0; i < MAIN_ASPECTS.length; i++) {
        var v = HERO_WINRATES[h][MAIN_ASPECTS[i]];
        if (v != null) { vals.push(v); }
      }
    }
  }
  vals.sort(function(a, b) { return b - a; });
  s6KnownSortedWR = vals;
  return vals;
}

// Win rate at percentile p of the known distribution (p = 0 best ... 1 worst).
function s6PercentileWinRate(p) {
  var vals = s6KnownWinRates();
  if (!vals.length) { return 0; }
  var idx = Math.floor(p * (vals.length - 1));
  if (idx < 0) { idx = 0; }
  if (idx >= vals.length) { idx = vals.length - 1; }
  return vals[idx];
}

// Uniform random pick of one of the four main aspects.
function s6RandomAspect(rng) {
  var i = Math.floor(rng.next() * MAIN_ASPECTS.length);
  if (i >= MAIN_ASPECTS.length) { i = MAIN_ASPECTS.length - 1; }
  return MAIN_ASPECTS[i];
}

// A second aspect for Spider-Woman, distinct from her first.
function s6SecondAspect(firstAspect, rng) {
  var others = MAIN_ASPECTS.filter(function(a) { return a !== firstAspect; });
  var i = Math.floor(rng.next() * others.length);
  if (i >= others.length) { i = others.length - 1; }
  return others[i];
}

// Random hero name from the pool.
function s6RandomHero(heroPool, rng) {
  var i = Math.floor(rng.next() * heroPool.length);
  if (i >= heroPool.length) { i = heroPool.length - 1; }
  return heroPool[i];
}

// Build a draftable item. Spider-Woman gets a distinct second aspect.
function s6MakeItem(hero, aspect, rng, group) {
  var aspects;
  if (hero === 'Adam Warlock') {
    aspects = []; // aspect-agnostic: Adam Warlock takes no aspect
  } else {
    aspects = [aspect];
    if (hero === 'Spider-Woman') {
      aspects.push(s6SecondAspect(aspect, rng));
      aspects.sort(); // store and present Spider-Woman's two aspects alphabetically
    }
  }
  // Bot draft priority: hero+aspect community win rate (higher = better). Special cases:
  //   Adam Warlock takes no aspect -> use his overall win rate.
  //   Spider-Woman's combos are all ranked at her overall, tie-broken by the average of
  //   her two aspects' win rates.
  var wr = (typeof HERO_WINRATES !== 'undefined') ? HERO_WINRATES[hero] : null;
  var winRate = 0, winRateTie = 0;
  if (wr) {
    if (hero === 'Adam Warlock') {
      winRate = wr.overall; winRateTie = wr.overall;
    } else if (hero === 'Spider-Woman') {
      winRate = wr.overall;
      var a0 = wr[aspects[0]], a1 = wr[aspects[1]];
      winRateTie = (a0 != null && a1 != null) ? (a0 + a1) / 2 : wr.overall;
    } else {
      winRate = (wr[aspect] != null) ? wr[aspect] : wr.overall;
      winRateTie = winRate;
    }
  } else if (typeof s6BonusWinRates !== 'undefined' && s6BonusWinRates[hero]) {
    // Additional hero (no community data): per-aspect placeholder in the top 50-70%.
    winRate = s6BonusWinRates[hero][aspect] || 0;
    winRateTie = winRate;
  }
  return {
    hero: hero,
    aspect: aspects.length ? aspect : null,
    aspects: aspects,
    displayName: aspects.length ? (hero + ' - ' + aspects.join(' / ')) : hero,
    tier: (typeof draftOrder !== 'undefined') ? draftOrder.indexOf(hero) : -1,
    group: (typeof group === 'number') ? group : -1,
    winRate: winRate,       // combo win rate (bot priority, higher = better)
    winRateTie: winRateTie, // secondary key (Spider-Woman: avg of her two aspects)
    // Final random tie-break (seed-stable) for exact ties.
    tieBreak: (rng && rng.next) ? rng.next() : 0
  };
}

// Main S6 generation entry point.
function generateS6DraftPool(options, rng) {
  var mode = options.mode || DEFAULT_DRAFT_MODE;
  var universe = options.universe || DEFAULT_UNIVERSE_MODE;
  var itemsPerGroup = options.itemsPerGroup;
  var heroPool = options.heroPool.slice();
  var requiredHeroes = (options.requiredHeroes || []).filter(function(h) {
    return heroPool.indexOf(h) !== -1;
  });
  var isComboBanned = options.isComboBanned || function() { return false; };
  var single = (universe === UNIVERSE_MODES.SINGLE);
  var totalSlots = S6_GROUP_COUNT * itemsPerGroup;

  // Feasibility guards.
  if (single && totalSlots > heroPool.length) {
    return { groups: null, excluded: [], error:
      'Single Universe needs ' + totalSlots + ' unique heroes but only ' +
      heroPool.length + ' are available. Reduce kouples/extras or enable Multiverse.' };
  }
  if (requiredHeroes.length > totalSlots) {
    return { groups: null, excluded: [], error:
      'Pool size too small for all required heroes (' + requiredHeroes.length +
      ' required, ' + totalSlots + ' slots). Increase pool size or disable required heroes.' };
  }
  // No exact-duplicate hero+aspect combos: Order needs itemsPerGroup distinct heroes
  // per aspect-bound group; Chaos needs totalSlots distinct hero+aspect combos overall.
  if (mode === DRAFT_MODES.ORDER && itemsPerGroup > heroPool.length) {
    return { groups: null, excluded: [], error:
      'Order draft needs ' + itemsPerGroup + ' distinct heroes per group but only ' +
      heroPool.length + ' are available. Reduce kouples/extras.' };
  }
  if (mode === DRAFT_MODES.CHAOS && totalSlots > heroPool.length * MAIN_ASPECTS.length) {
    return { groups: null, excluded: [], error:
      'Chaos draft needs ' + totalSlots + ' distinct hero+aspect combos but only ' +
      (heroPool.length * MAIN_ASPECTS.length) + ' are possible. Reduce kouples/extras.' };
  }

  var usedHeroes = {};        // hero -> true (for single universe uniqueness)
  var heroCounts = {};        // hero -> count across whole pool
  var requiredSet = {};
  requiredHeroes.forEach(function(h) { requiredSet[h] = true; });

  function bump(hero, delta) {
    heroCounts[hero] = (heroCounts[hero] || 0) + delta;
    if (heroCounts[hero] <= 0) { delete heroCounts[hero]; delete usedHeroes[hero]; }
    else if (single) { usedHeroes[hero] = true; }
  }

  // Track exact hero+aspect combos already placed so none repeats.
  // For Spider-Woman the key includes both of her aspects, so she may recur
  // with a different aspect combination but never the identical pair.
  var usedCombos = {};
  function comboKey(item) { return item.hero + '|' + item.aspects.slice().sort().join(','); }

  // Additional heroes (no community data): assign each a per-aspect placeholder win rate
  // in the top 50-70% of the known distribution, rolled independently per aspect.
  s6BonusWinRates = {};
  heroPool.forEach(function(h) {
    if (typeof HERO_WINRATES === 'undefined' || !HERO_WINRATES[h]) {
      var b = {};
      for (var i = 0; i < MAIN_ASPECTS.length; i++) {
        b[MAIN_ASPECTS[i]] = s6PercentileWinRate(0.5 + rng.next() * 0.2);
      }
      s6BonusWinRates[h] = b;
    }
  });

  // Build the four groups.
  var groups = [];
  var MAX_ATTEMPTS = 10000;
  for (var g = 0; g < S6_GROUP_COUNT; g++) {
    var group = [];
    var groupAspect = (mode === DRAFT_MODES.ORDER) ? MAIN_ASPECTS[g] : null;
    for (var s = 0; s < itemsPerGroup; s++) {
      var item = null, attempts = 0;
      while (attempts++ < MAX_ATTEMPTS) {
        var aspect = (mode === DRAFT_MODES.ORDER) ? groupAspect : s6RandomAspect(rng);
        var hero = s6RandomHero(heroPool, rng);
        if (isComboBanned(hero, aspect)) { continue; }
        if (single && usedHeroes[hero]) { continue; }
        var cand = s6MakeItem(hero, aspect, rng, g);
        if (usedCombos[comboKey(cand)]) { continue; } // reject exact-duplicate combo
        item = cand;
        break;
      }
      if (!item) {
        // Constraints too tight to find a fresh combo; accept a plain roll.
        item = s6MakeItem(s6RandomHero(heroPool, rng),
          (mode === DRAFT_MODES.ORDER) ? groupAspect : s6RandomAspect(rng), rng, g);
      }
      usedCombos[comboKey(item)] = true;
      group.push(item);
      bump(item.hero, 1);
    }
    groups.push(group);
  }

  // Enforce required heroes after the pool is built.
  requiredHeroes.forEach(function(R) {
    if (heroCounts[R]) { return; } // already present
    var attempts = 0, gi, idx, target;
    while (attempts++ < MAX_ATTEMPTS) {
      gi = Math.floor(rng.next() * S6_GROUP_COUNT);
      if (gi >= S6_GROUP_COUNT) { gi = S6_GROUP_COUNT - 1; }
      idx = Math.floor(rng.next() * groups[gi].length);
      if (idx >= groups[gi].length) { idx = groups[gi].length - 1; }
      target = groups[gi][idx];
      // Do not evict the last copy of a required hero already present.
      if (requiredSet[target.hero] && heroCounts[target.hero] === 1) { continue; }
      break;
    }
    // Build R's item, avoiding an exact-duplicate combo where the aspect can vary.
    var newItem, tries = 0;
    do {
      var asp = (mode === DRAFT_MODES.ORDER) ? MAIN_ASPECTS[gi] : s6RandomAspect(rng);
      newItem = s6MakeItem(R, asp, rng, gi);
      tries++;
    } while (usedCombos[comboKey(newItem)] && tries < 50);
    delete usedCombos[comboKey(target)];
    bump(target.hero, -1);
    groups[gi][idx] = newItem;
    usedCombos[comboKey(newItem)] = true;
    bump(R, 1);
  });

  // Heroes available but not present in the pool.
  var excluded = heroPool.filter(function(h) { return !heroCounts[h]; }).sort();

  return { groups: groups, excluded: excluded, error: null };
}
