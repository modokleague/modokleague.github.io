/* ========================================
   MODOK League Season 5.0 - Tier Calculations
   V5.0.0-alpha.11

   NEW FOR SEASON 5.0
   Hero pairing requires dividing heroes into tiers based on power level.
   This module handles tier boundary calculations for sextile and quartile modes.
   ======================================== */

// ===== SEASON 5.0: TIER CALCULATION FUNCTIONS =====

// Calculate tier boundaries based on pairing mode
// Returns array of indices marking tier boundaries
// Example for 61 heroes in sextile mode: [0, 11, 21, 31, 41, 51, 61]
function calculateTierBoundaries(heroCount, mode) {
  if (mode === 'sextile') {
    // Divide heroes into 6 equal tiers
    var tierSize = Math.floor(heroCount / 6);
    var remainder = heroCount % 6;
    var boundaries = [0];

    for (var i = 1; i <= 6; i++) {
      var size = tierSize + (i <= remainder ? 1 : 0);
      boundaries.push(boundaries[i - 1] + size);
    }

    return boundaries; // [0, ~10, ~20, ~30, ~40, ~50, ~61]
  } else if (mode === 'quartile') {
    // Divide heroes into 4 equal tiers
    var tierSize = Math.floor(heroCount / 4);
    var remainder = heroCount % 4;
    var boundaries = [0];

    for (var i = 1; i <= 4; i++) {
      var size = tierSize + (i <= remainder ? 1 : 0);
      boundaries.push(boundaries[i - 1] + size);
    }

    return boundaries; // [0, ~15, ~30, ~45, ~61]
  } else {
    // Random mode: no tiers
    return null;
  }
}

// Get tier number for a hero based on draftOrder position
// Returns tier number (1-6 for sextile, 1-4 for quartile, null for random)
function getHeroTier(heroIndex, boundaries) {
  if (!boundaries) return null;

  for (var i = 0; i < boundaries.length - 1; i++) {
    if (heroIndex >= boundaries[i] && heroIndex < boundaries[i + 1]) {
      return i + 1; // Tiers are 1-indexed
    }
  }

  return null;
}

// Determine pairing tier based on primary tier
// Sextile: tier 1 → tier 6, tier 2 → tier 5, tier 3 → tier 4
// Quartile: tier 1 → tier 4, tier 2 → tier 3
function getPairingTier(tier, mode) {
  if (mode === 'sextile') {
    return 7 - tier; // 1→6, 2→5, 3→4, 4→3, 5→2, 6→1
  } else if (mode === 'quartile') {
    return 5 - tier; // 1→4, 2→3, 3→2, 4→1
  }
  return null;
}

// Get adjacent tier for sextile mode (one tier off)
// Returns tier number one away from ideal pairing
// Used for ADJACENT_SEXTILE_PROBABILITY feature
function getAdjacentPairingTier(tier, mode) {
  if (mode !== 'sextile') return null;

  var ideal = getPairingTier(tier, mode);

  // For tier 1 (ideal 6), adjacent is 5
  // For tier 2 (ideal 5), adjacent could be 4 or 6
  // For tier 3 (ideal 4), adjacent could be 3 or 5

  if (tier === 1) return 5; // 1 pairs with 6, adjacent is 5
  if (tier === 2) return 6; // 2 pairs with 5, adjacent is 6
  if (tier === 3) return 5; // 3 pairs with 4, adjacent is 5
  if (tier === 4) return 3; // 4 pairs with 3, adjacent is 3 (mirror)
  if (tier === 5) return 2; // 5 pairs with 2, adjacent is 2 (mirror)
  if (tier === 6) return 1; // 6 pairs with 1, adjacent is 1 (mirror)

  return null;
}

// Group heroes by tier for pairing
// Returns array of arrays: [[tier1 heroes], [tier2 heroes], ...]
function groupHeroesByTier(heroes, boundaries) {
  if (!boundaries) return null;

  var tiers = [];
  for (var i = 0; i < boundaries.length - 1; i++) {
    tiers.push([]);
  }

  for (var i = 0; i < heroes.length; i++) {
    var hero = heroes[i];
    var heroIndex = draftOrder.indexOf(hero);
    var tier = getHeroTier(heroIndex, boundaries);

    if (tier !== null && tier >= 1 && tier <= tiers.length) {
      tiers[tier - 1].push(hero); // Tiers are 1-indexed, arrays are 0-indexed
    }
  }

  return tiers;
}

// ===== END TIER CALCULATION FUNCTIONS =====
