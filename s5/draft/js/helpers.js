/* ========================================
   MODOK League Season 5.0 - Helper Functions
   V5.0.0-alpha.10

   Contains utility functions for:
   - Ban checking
   - Group lookups
   - Trait parsing and display
   - Aspect type detection
   - Required hero distribution
   - UI control updates (Season 5.0)
   ======================================== */

// ===== BAN CHECKING =====

// Check if hero is banned
function isHeroBanned(heroName) {
  if (bannedHeroes.includes(heroName)) return true;
  var heroBaseName = heroName.split(' - ')[0];
  for (var i = 0; i < bannedHeroes.length; i++) {
    var bannedHero = bannedHeroes[i];
    var bannedBaseName = bannedHero.split(' - ')[0];
    if (heroBaseName === bannedBaseName) return true;
  }
  return false;
}

// ===== GROUP LOOKUPS =====

// Get which group a hero belongs to (1, 2, or 3 for 6-group mode)
// Used for both 4-group and 6-group modes
function getHeroGroup(heroName) {
  if (heroGroup1 && heroGroup1.includes(heroName)) return 1;
  if (heroGroup2 && heroGroup2.includes(heroName)) return 2;
  if (heroGroup3 && heroGroup3.includes(heroName)) return 3;
  return 0; // Not found in any group
}

// Get which group an aspect/trait belongs to (1, 2, or 3 for 6-group mode)
// In Season 5.0, this checks aspect pair displayNames
function getAspectGroup(aspectName) {
  if (traitsGroup1 && traitsGroup1.includes(aspectName)) return 1;
  if (traitsGroup2 && traitsGroup2.includes(aspectName)) return 2;
  if (traitsGroup3 && traitsGroup3.includes(aspectName)) return 3;
  return 0; // Not found in any group
}

// ===== ASPECT SORTING HELPERS =====

// Helper function to get aspect type order for sorting
function getAspectTypeOrder(aspectName) {
  var aspectTypes = ['Aggression', 'Justice', 'Leadership', 'Protection', 'Pool'];
  for (var i = 0; i < aspectTypes.length; i++) {
    if (aspectName.toLowerCase().includes(aspectTypes[i].toLowerCase())) {
      return i;
    }
  }
  return 999; // Non-aspect items go last
}

// ===== REQUIRED HEROES =====

// Helper function to distribute required heroes across groups
function distributeRequiredHeroes(heroPool, numGroups) {
  var requireHeroesEnabled = document.getElementById('requireHeroesCheckbox').checked;
  if (!requireHeroesEnabled) {
    return null;
  }

  var requiredInPool = heroPool.filter(function(hero) {
    return REQUIRED_HEROES.includes(hero);
  });

  var groups = [];
  for (var i = 0; i < numGroups; i++) {
    groups.push([]);
  }

  // Distribute required heroes evenly across groups
  for (var i = 0; i < requiredInPool.length; i++) {
    groups[i % numGroups].push(requiredInPool[i]);
  }

  return {
    groups: groups,
    requiredHeroes: requiredInPool
  };
}

// ===== SEASON 5.0: UI CONTROL HELPERS =====

// Season 5.0: Update adjacent sextile probability display
function updateAdjacentProbability() {
  var slider = document.getElementById('adjacentProbability');
  var display = document.getElementById('adjacentProbValue');
  if (slider && display) {
    display.textContent = slider.value + '%';
  }
}

// Season 5.0: Update double-aspect weight display
function updateDoubleAspectWeight() {
  var slider = document.getElementById('doubleAspectWeight');
  var display = document.getElementById('doubleAspectWeightValue');
  if (slider && display) {
    display.textContent = slider.value + '%';
  }
}

// Season 5.0: Update pairing mode display (show/hide adjacent probability control)
function updatePairingModeDisplay() {
  var pairingMode = document.getElementById('pairingMode');
  var adjacentControl = document.getElementById('adjacentProbabilityControl');
  if (pairingMode && adjacentControl) {
    // Only show adjacent probability control for sextile mode
    if (pairingMode.value === 'sextile') {
      adjacentControl.style.display = 'block';
    } else {
      adjacentControl.style.display = 'none';
    }
  }
}

// Season 5.0: Get aspect pair background style with color coding
// Aggression = red, Justice = gold, Leadership = blue, Protection = green
// Option A: Vertical 50/50 split for mixed pairs, solid bright color for doubles
function getAspectPairStyle(pair) {
  var aspect1 = pair.aspect1;
  var aspect2 = pair.aspect2;

  // Double pairs (same aspect twice) - use solid bright color
  if (aspect1 === aspect2) {
    if (ASPECT_COLORS[aspect1]) {
      var color = ASPECT_COLORS[aspect1].main;
      // Use 50/50 split of same color (appears as solid)
      return 'linear-gradient(90deg, ' + color + ' 0%, ' + color + ' 50%, ' + color + ' 50%, ' + color + ' 100%)';
    }
  }

  // Mixed pairs - vertical 50/50 split with sharp division
  if (ASPECT_COLORS[aspect1] && ASPECT_COLORS[aspect2]) {
    var color1 = ASPECT_COLORS[aspect1].main;
    var color2 = ASPECT_COLORS[aspect2].main;
    return 'linear-gradient(90deg, ' + color1 + ' 0%, ' + color1 + ' 50%, ' + color2 + ' 50%, ' + color2 + ' 100%)';
  }

  // Fallback to generic blue gradient if aspect not found
  return 'linear-gradient(145deg, #e8f4fd, #b8e6ff)';
}
