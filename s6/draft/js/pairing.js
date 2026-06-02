/* ========================================
   MODOK League Season 5.0 - Pairing Logic
   V5.0.0-alpha.11

   NEW FOR SEASON 5.0
   Core pairing logic for:
   - Hero pairs (sextile/quartile/random modes)
   - Aspect pairs
   - Bot AI priority for pairs
   - Pair group splitting
   ======================================== */

// ===== SEASON 5.0: HERO PAIRING FUNCTIONS =====

// Create hero pairs based on pairing mode
// HOOK: This is where future weighted pairing logic will go
function createHeroPairs(heroPool, pairingMode, rng) {
  var pairs = [];

  if (pairingMode === 'random') {
    // Random pairing: shuffle and pair sequentially
    var shuffled = heroPool.slice();
    shuffleArray(shuffled, rng);

    for (var i = 0; i < shuffled.length - 1; i += 2) {
      var hero1 = shuffled[i];
      var hero2 = shuffled[i + 1];
      var hero1Index = draftOrder.indexOf(hero1);
      var hero2Index = draftOrder.indexOf(hero2);

      // Normalize to alphabetical order for display
      var sortedHeroes = [hero1, hero2].sort();

      pairs.push({
        hero1: hero1,
        hero2: hero2,
        hero1Index: hero1Index,
        hero2Index: hero2Index,
        tier1: null,  // No tiers in random mode
        tier2: null,
        displayName: sortedHeroes[0] + ' + ' + sortedHeroes[1]
      });
    }

    return pairs;
  }

  // Sextile or Quartile pairing
  var boundaries = calculateTierBoundaries(draftOrder.length, pairingMode);
  var allHeroesByTier = groupHeroesByTier(heroPool, boundaries);

  if (!allHeroesByTier) {
    // Fallback to random if grouping fails
    return createHeroPairs(heroPool, 'random', rng);
  }

  // Get adjacent probability setting
  var adjacentProb = ADJACENT_SEXTILE_PROBABILITY;
  var adjacentElement = document.getElementById('adjacentProbability');
  if (adjacentElement) {
    adjacentProb = parseInt(adjacentElement.value) / 100;
  }

  // Pair heroes from tiers
  // HOOK: This is where weighted pairing will be implemented
  pairs = pairHeroesFromTiers(allHeroesByTier, pairingMode, adjacentProb, rng, boundaries);

  return pairs;
}

// Pair heroes from opposite tiers
// HOOK: Future weighting and intelligent matching goes here
function pairHeroesFromTiers(tiers, mode, adjacentProb, rng, boundaries) {
  var pairs = [];
  var allUnpaired = [];

  if (mode === 'sextile') {
    // Pair tier 1 with tier 6, tier 2 with tier 5, tier 3 with tier 4
    var result1 = pairTwoTiers(tiers[0], tiers[5], 1, 6, adjacentProb, tiers[4], rng, boundaries);
    pairs = pairs.concat(result1.pairs);
    allUnpaired = allUnpaired.concat(result1.unpaired);

    var result2 = pairTwoTiers(tiers[1], tiers[4], 2, 5, adjacentProb, tiers[5], rng, boundaries);
    pairs = pairs.concat(result2.pairs);
    allUnpaired = allUnpaired.concat(result2.unpaired);

    var result3 = pairTwoTiers(tiers[2], tiers[3], 3, 4, adjacentProb, null, rng, boundaries);
    pairs = pairs.concat(result3.pairs);
    allUnpaired = allUnpaired.concat(result3.unpaired);
  } else if (mode === 'quartile') {
    // Pair Q1 with Q4, Q2 with Q3
    var result1 = pairTwoTiers(tiers[0], tiers[3], 1, 4, 0, null, rng, boundaries);
    pairs = pairs.concat(result1.pairs);
    allUnpaired = allUnpaired.concat(result1.unpaired);

    var result2 = pairTwoTiers(tiers[1], tiers[2], 2, 3, 0, null, rng, boundaries);
    pairs = pairs.concat(result2.pairs);
    allUnpaired = allUnpaired.concat(result2.unpaired);
  }

  // Pair any remaining unpaired heroes together
  shuffleArray(allUnpaired, rng);
  for (var i = 0; i < allUnpaired.length - 1; i += 2) {
    var hero1 = allUnpaired[i];
    var hero2 = allUnpaired[i + 1];

    // Normalize to alphabetical order for display
    var sortedHeroes = [hero1.hero, hero2.hero].sort();

    pairs.push({
      hero1: hero1.hero,
      hero2: hero2.hero,
      hero1Index: hero1.index,
      hero2Index: hero2.index,
      tier1: hero1.tier,
      tier2: hero2.tier,
      displayName: sortedHeroes[0] + ' + ' + sortedHeroes[1]
    });
  }

  return pairs;
}

// Pair heroes from two specific tiers
// HOOK: This is where individual pairing decisions will be weighted in the future
function pairTwoTiers(tier1, tier2, tier1Num, tier2Num, adjacentProb, adjacentTier, rng, boundaries) {
  var pairs = [];
  var unpaired = [];
  var tier1Copy = tier1.slice();
  var tier2Copy = tier2.slice();

  shuffleArray(tier1Copy, rng);
  shuffleArray(tier2Copy, rng);

  var minLength = Math.min(tier1Copy.length, tier2Copy.length);

  for (var i = 0; i < minLength; i++) {
    var hero1 = tier1Copy[i];
    var hero2;
    var actualTier2;

    // Adjacent sextile logic - chance to pair with adjacent tier instead
    if (adjacentProb > 0 && adjacentTier && adjacentTier.length > 0 && rng.next() < adjacentProb) {
      // Use adjacent tier instead
      var adjIndex = Math.floor(rng.next() * adjacentTier.length);
      hero2 = adjacentTier[adjIndex];
      actualTier2 = tier2Num === 6 ? 5 : (tier2Num === 5 ? 6 : tier2Num + 1); // Simplified logic
      // Remove from adjacent tier to avoid reuse
      adjacentTier.splice(adjIndex, 1);
    } else {
      hero2 = tier2Copy[i];
      actualTier2 = tier2Num;
    }

    var hero1Index = draftOrder.indexOf(hero1);
    var hero2Index = draftOrder.indexOf(hero2);

    // Normalize to alphabetical order for display
    var sortedHeroes = [hero1, hero2].sort();

    pairs.push({
      hero1: hero1,
      hero2: hero2,
      hero1Index: hero1Index,
      hero2Index: hero2Index,
      tier1: tier1Num,
      tier2: actualTier2,
      displayName: sortedHeroes[0] + ' + ' + sortedHeroes[1]
    });
  }

  // Collect remaining unpaired heroes from tier1
  if (tier1Copy.length > tier2Copy.length) {
    for (var i = minLength; i < tier1Copy.length; i++) {
      unpaired.push({
        hero: tier1Copy[i],
        index: draftOrder.indexOf(tier1Copy[i]),
        tier: tier1Num
      });
    }
  }

  // Collect remaining unpaired heroes from tier2
  if (tier2Copy.length > tier1Copy.length) {
    for (var i = minLength; i < tier2Copy.length; i++) {
      unpaired.push({
        hero: tier2Copy[i],
        index: draftOrder.indexOf(tier2Copy[i]),
        tier: tier2Num
      });
    }
  }

  return {pairs: pairs, unpaired: unpaired};
}

// ===== SEASON 5.0: ASPECT PAIRING FUNCTIONS =====

// Create aspect pairs
// HOOK: Future logic for aspect pairing constraints and synergies
function createAspectPairs(aspectCount, rng) {
  var pairs = [];
  var combinationCounts = {}; // Track how many of each combination we've created

  // Get double-aspect weight setting (0-100% from slider)
  var doubleWeight = DEFAULT_DOUBLE_ASPECT_WEIGHT;
  var doubleWeightElement = document.getElementById('doubleAspectWeight');
  if (doubleWeightElement) {
    doubleWeight = parseInt(doubleWeightElement.value) / 100;
  }

  // Generate aspect pairs using random selection + filtering
  for (var i = 0; i < aspectCount; i++) {
    // Step 1: Randomly pick aspect1
    var aspect1Index = Math.floor(rng.next() * aspectsList.length);
    var aspect1 = aspectsList[aspect1Index];

    // Step 2: Randomly pick aspect2
    var aspect2Index = Math.floor(rng.next() * aspectsList.length);
    var aspect2 = aspectsList[aspect2Index];

    // Step 3: Check if it's a double
    if (aspect1 === aspect2) {
      // It's a double - roll to see if we keep it
      var keepDouble = rng.next() < doubleWeight;

      if (!keepDouble) {
        // Reject the double - re-roll aspect2 until it's different
        while (aspect2 === aspect1) {
          aspect2Index = Math.floor(rng.next() * aspectsList.length);
          aspect2 = aspectsList[aspect2Index];
        }
      }
    }
    // If not a double, keep it as-is

    // Normalize to alphabetical order for display and counting
    var sortedAspects = [aspect1, aspect2].sort();
    var normalizedAspect1 = sortedAspects[0];
    var normalizedAspect2 = sortedAspects[1];

    // Create base name using normalized alphabetical order
    var baseName = normalizedAspect1 + ' + ' + normalizedAspect2;

    // Track count for this combination
    if (!combinationCounts[baseName]) {
      combinationCounts[baseName] = 0;
    }
    combinationCounts[baseName]++;

    // Add sequential number (zero-padded to 2 digits)
    var numberSuffix = String(combinationCounts[baseName]).padStart(2, '0');
    var displayName = baseName + ' ' + numberSuffix;

    // Store normalized aspects so colors match display order
    pairs.push({
      aspect1: normalizedAspect1,
      aspect2: normalizedAspect2,
      displayName: displayName
    });
  }

  return pairs;
}

// Initialize aspect pair priority for bot AI
// Season 5.0: Priority ranking based on aspect value and mixed vs double
// Leadership > Protection > Aggression=Justice, with mixed pairs always preferred over doubles
function initializeAspectPairPriority(aspectPairs, rng) {
  // Helper function to determine priority tier for an aspect pair
  function getAspectPairTier(pair) {
    var aspect1 = pair.aspect1;
    var aspect2 = pair.aspect2;
    var isMixed = aspect1 !== aspect2;
    var hasLeadership = aspect1 === 'Leadership' || aspect2 === 'Leadership';
    var hasProtection = aspect1 === 'Protection' || aspect2 === 'Protection';
    var hasAggression = aspect1 === 'Aggression' || aspect2 === 'Aggression';
    var hasJustice = aspect1 === 'Justice' || aspect2 === 'Justice';

    if (isMixed) {
      // Mixed pairs
      if (hasLeadership && hasProtection) {
        return 1; // Tier 1: Leadership + Protection (best combination)
      } else if (hasLeadership) {
        return 2; // Tier 2: Mixed with Leadership (L+A, L+J)
      } else if (hasProtection) {
        return 3; // Tier 3: Mixed with Protection, no Leadership (P+A, P+J)
      } else {
        return 4; // Tier 4: Aggression + Justice
      }
    } else {
      // Double pairs (always lower priority than mixed)
      if (aspect1 === 'Leadership') {
        return 5; // Tier 5: Leadership + Leadership
      } else if (aspect1 === 'Protection') {
        return 6; // Tier 6: Protection + Protection
      } else {
        return 7; // Tier 7: Aggression + Aggression or Justice + Justice
      }
    }
  }

  // Assign tiers to all pairs
  var pairedWithTiers = aspectPairs.map(function(pair) {
    return {
      pair: pair,
      tier: getAspectPairTier(pair)
    };
  });

  // Group by tier
  var tierGroups = {};
  for (var i = 1; i <= 7; i++) {
    tierGroups[i] = [];
  }

  pairedWithTiers.forEach(function(item) {
    tierGroups[item.tier].push(item.pair);
  });

  // Within each tier: shuffle randomly but maintain descending numerical order for same combinations
  for (var tier = 1; tier <= 7; tier++) {
    var tieredPairs = tierGroups[tier];

    // Group by base combination (without number)
    var combinationGroups = {};
    tieredPairs.forEach(function(pair) {
      // Extract base name (e.g., "Leadership + Protection" from "Leadership + Protection 03")
      var baseName = pair.displayName.replace(/ \d+$/, '');
      if (!combinationGroups[baseName]) {
        combinationGroups[baseName] = [];
      }
      combinationGroups[baseName].push(pair);
    });

    // Sort each combination group in descending numerical order
    Object.keys(combinationGroups).forEach(function(baseName) {
      combinationGroups[baseName].sort(function(a, b) {
        // Extract number from displayName (e.g., "03" from "Leadership + Protection 03")
        var numA = parseInt(a.displayName.match(/ (\d+)$/)[1]);
        var numB = parseInt(b.displayName.match(/ (\d+)$/)[1]);
        return numB - numA; // Descending order
      });
    });

    // Create array of combination names and shuffle them
    var combinationNames = Object.keys(combinationGroups);
    shuffleArray(combinationNames, rng);

    // Now interleave: randomly pick from available combinations
    var result = [];
    var indices = {}; // Track current index for each combination
    combinationNames.forEach(function(name) {
      indices[name] = 0;
    });

    var totalPairs = tieredPairs.length;
    while (result.length < totalPairs) {
      // Filter to combinations that still have pairs left
      var availableNames = combinationNames.filter(function(name) {
        return indices[name] < combinationGroups[name].length;
      });

      // Pick a random available combination
      var randomIndex = Math.floor(rng.next() * availableNames.length);
      var chosenName = availableNames[randomIndex];

      // Add the next pair from this combination (maintains descending order)
      result.push(combinationGroups[chosenName][indices[chosenName]]);
      indices[chosenName]++;
    }

    tierGroups[tier] = result;
  }

  // Concatenate tiers in order
  aspectPairPriorityList = [];
  for (var tier = 1; tier <= 7; tier++) {
    aspectPairPriorityList = aspectPairPriorityList.concat(tierGroups[tier]);
  }
}

// ===== SEASON 5.0: BOT AI PRIORITY FOR PAIRS =====

// Initialize hero pair priority for bot AI
// HOOK: Future multi-factor scoring (tier spread, synergy, variety, etc.)
function initializeHeroPairPriority(heroPairs, rng) {
  // Sort pairs by average tier quality
  // Lower average tier = better (tier 1 is best)
  heroPairPriorityList = heroPairs.slice().sort(function(pairA, pairB) {
    // Calculate average tier (lower is better)
    var avgTierA = ((pairA.tier1 || 0) + (pairA.tier2 || 0)) / 2;
    var avgTierB = ((pairB.tier1 || 0) + (pairB.tier2 || 0)) / 2;

    // If no tiers (random mode), use raw indices
    if (!pairA.tier1) {
      avgTierA = (pairA.hero1Index + pairA.hero2Index) / 2;
      avgTierB = (pairB.hero1Index + pairB.hero2Index) / 2;
    }

    return avgTierA - avgTierB; // Lower avg = better = earlier in list
  });

  // HOOK: Future weighting adjustments
  // - Penalize pairs with extreme tier gaps in certain modes?
  // - Reward balanced pairs?
  // - Consider hero synergies?
}

// Generic pair splitting function for both heroes and aspects
function splitPairsIntoTwoGroups(pairPool, rng) {
  var shuffled = pairPool.slice();
  shuffleArray(shuffled, rng);

  var midpoint = Math.floor(shuffled.length / 2);

  return {
    group1: shuffled.slice(0, midpoint),
    group2: shuffled.slice(midpoint)
  };
}

// ===== END PAIRING FUNCTIONS =====
