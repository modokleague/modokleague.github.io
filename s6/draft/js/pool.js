/* ========================================
   MODOK League Season 5.0 - Pool Generation
   V5.0.0-alpha.11

   Contains functions for:
   - Hero pool splitting (2-group mode)
   - Season 5.0 pair-based pool generation
   ======================================== */

// ===== POOL SPLITTING FUNCTIONS =====

// Function to split hero pool into two groups for 4-group mode
function splitHeroPoolIntoGroups(heroPool, rng) {
  var group1 = [];
  var group2 = [];

  // Handle required heroes distribution
  var requiredDistribution = distributeRequiredHeroes(heroPool, 2);
  if (requiredDistribution) {
    group1 = requiredDistribution.groups[0].slice();
    group2 = requiredDistribution.groups[1].slice();
  }

  // Remove required heroes from pool for random distribution
  var shuffledPool = heroPool.filter(function(hero) {
    return !requiredDistribution || !requiredDistribution.requiredHeroes.includes(hero);
  });
  shuffleArray(shuffledPool, rng);

  // Calculate remaining spots needed for each group
  var targetGroup1Size = Math.floor(heroPool.length / 2);
  var remainingForGroup1 = targetGroup1Size - group1.length;
  var remainingForGroup2 = heroPool.length - targetGroup1Size - group2.length;

  // Add remaining heroes to groups
  group1 = group1.concat(shuffledPool.slice(0, remainingForGroup1));
  group2 = group2.concat(shuffledPool.slice(remainingForGroup1, remainingForGroup1 + remainingForGroup2));

  // Sort both groups
  group1 = group1.sort(function(a, b) {
   // First, sort by aspect type order (Aggression, Justice, Leadership, Protection, Pool)
   var typeOrderA = getAspectTypeOrder(a);
   var typeOrderB = getAspectTypeOrder(b);

   if (typeOrderA !== typeOrderB) {
     return typeOrderA - typeOrderB; // Sort by aspect type first
   }

   // Traits don't use numbered suffixes, use alphabetical sorting within same type
   return a.localeCompare(b);
 });
  group2 = group2.sort(function(a, b) {
   // First, sort by aspect type order (Aggression, Justice, Leadership, Protection, Pool)
   var typeOrderA = getAspectTypeOrder(a);
   var typeOrderB = getAspectTypeOrder(b);

   if (typeOrderA !== typeOrderB) {
     return typeOrderA - typeOrderB; // Sort by aspect type first
   }

   // Traits don't use numbered suffixes, use alphabetical sorting within same type
   return a.localeCompare(b);
 });

  return { group1: group1, group2: group2 };
}

// Function to split aspect pair pool into two groups for Season 5.0
// Note: Despite the name "Traits", this is used for Season 5.0 aspect pairs
function splitTraitsPoolIntoGroups(traitsPool, rng) {
  var shuffledPool = traitsPool.slice();
  shuffleArray(shuffledPool, rng);

  var midPoint = Math.floor(shuffledPool.length / 2);
  var group1 = shuffledPool.slice(0, midPoint).sort(function(a, b) {
   // Alphabetical sorting for aspect pairs
   return a.localeCompare(b);
 });
  var group2 = shuffledPool.slice(midPoint).sort(function(a, b) {
   // Alphabetical sorting for aspect pairs
   return a.localeCompare(b);
 });

  return { group1: group1, group2: group2 };
}

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
  var aspects = [aspect];
  if (hero === 'Spider-Woman') {
    aspects.push(s6SecondAspect(aspect, rng));
  }
  return {
    hero: hero,
    aspect: aspect,
    aspects: aspects,
    displayName: hero + ' - ' + aspects.join(' / '),
    tier: (typeof draftOrder !== 'undefined') ? draftOrder.indexOf(hero) : -1,
    group: (typeof group === 'number') ? group : -1
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

  var usedHeroes = {};        // hero -> true (for single universe uniqueness)
  var heroCounts = {};        // hero -> count across whole pool
  var requiredSet = {};
  requiredHeroes.forEach(function(h) { requiredSet[h] = true; });

  function bump(hero, delta) {
    heroCounts[hero] = (heroCounts[hero] || 0) + delta;
    if (heroCounts[hero] <= 0) { delete heroCounts[hero]; delete usedHeroes[hero]; }
    else if (single) { usedHeroes[hero] = true; }
  }

  // Build the four groups.
  var groups = [];
  var MAX_ATTEMPTS = 10000;
  for (var g = 0; g < S6_GROUP_COUNT; g++) {
    var group = [];
    var groupAspect = (mode === DRAFT_MODES.ORDER) ? MAIN_ASPECTS[g] : null;
    for (var s = 0; s < itemsPerGroup; s++) {
      var hero = null, aspect = null, attempts = 0;
      while (attempts++ < MAX_ATTEMPTS) {
        aspect = (mode === DRAFT_MODES.ORDER) ? groupAspect : s6RandomAspect(rng);
        hero = s6RandomHero(heroPool, rng);
        if (isComboBanned(hero, aspect)) { continue; }
        if (single && usedHeroes[hero]) { continue; }
        break;
      }
      var item = s6MakeItem(hero, aspect, rng, g);
      group.push(item);
      bump(hero, 1);
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
    var aspect = (mode === DRAFT_MODES.ORDER) ? MAIN_ASPECTS[gi] : s6RandomAspect(rng);
    bump(target.hero, -1);
    groups[gi][idx] = s6MakeItem(R, aspect, rng, gi);
    bump(R, 1);
  });

  // Heroes available but not present in the pool.
  var excluded = heroPool.filter(function(h) { return !heroCounts[h]; }).sort();

  return { groups: groups, excluded: excluded, error: null };
}
