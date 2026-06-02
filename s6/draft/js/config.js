/* ========================================
   MODOK League Season 6.0 - Configuration
   V6.0.0-dev
   ======================================== */

// Version information
var TOOL_VERSION = 'V6.0.0-dev';
var DEFAULT_DRAFT_GROUPS = '4'; // Season 6.0: 4 groups of hero+aspect picks

// ===== SEASON 6.0: DRAFT MODE CONFIGURATION =====

// Draft mode determines how the four groups are populated.
// CHAOS: each item is a random aspect + random hero; groups are not aspect-bound.
// ORDER: the four groups are one per aspect; every item in a group carries that aspect.
var DRAFT_MODES = {
  CHAOS: 'chaos',
  ORDER: 'order'
};
var DEFAULT_DRAFT_MODE = DRAFT_MODES.CHAOS;

// Universe mode determines hero uniqueness across the whole pool.
// MULTIVERSE (default): draft with replacement; duplicate heroes/items allowed.
// SINGLE: at most one copy of each hero across all four groups; duplicate rolls re-roll.
var UNIVERSE_MODES = {
  MULTIVERSE: 'multiverse',
  SINGLE: 'single'
};
var DEFAULT_UNIVERSE_MODE = UNIVERSE_MODES.MULTIVERSE;

// The four main aspects, in display order, used by S6 pool generation.
var MAIN_ASPECTS = ['Aggression', 'Justice', 'Leadership', 'Protection'];

// ===== SEASON 5.0: HERO PAIRING CONFIGURATION =====

// Pairing modes determine how heroes are paired together
var PAIRING_MODES = {
  SEXTILE: 'sextile',    // 6 tiers: tier 1 pairs with tier 6, tier 2 with tier 5, tier 3 with tier 4
  QUARTILE: 'quartile',  // 4 tiers: tier 1 pairs with tier 4, tier 2 with tier 3
  RANDOM: 'random'       // No tier logic, completely random pairing
};

// Default pairing strategy
var DEFAULT_PAIRING_MODE = PAIRING_MODES.SEXTILE;

// Adjacent sextile probability
// Probability that a pair will use an adjacent tier instead of opposite tier
// Example: tier 1 might pair with tier 5 instead of tier 6
var ADJACENT_SEXTILE_PROBABILITY = 0.10; // 10% chance by default

// ===== ASPECT PAIRING CONFIGURATION =====

// Aspect pairing mode (currently only 'random' implemented)
// HOOK: Future modes could include 'balanced', 'synergy-based', etc.
var ASPECT_PAIRING_MODE = 'random';

// Double-aspect weight (probability relative to mixed pairs)
// Default: 0.25 means doubles appear at 25% the frequency of mixed pairs
// Example: 0.25 = doubles are 4x less likely, 0.50 = 2x less likely, 1.00 = equal probability
var DEFAULT_DOUBLE_ASPECT_WEIGHT = 0.25;

// Aspect pairing constraints
// HOOK: Future constraints for aspect pairing logic
var ASPECT_PAIRING_CONSTRAINTS = {
  allowDuplicates: true  // Can pair Leadership + Leadership? Currently yes
  // HOOK: Future constraints might include:
  // - requireBalance: ensure each aspect appears similar number of times
  // - avoidDuplicates: prevent same aspect appearing twice in a pair
  // - synergyWeights: prefer certain aspect combinations
};

// Aspect color definitions for visual display
var ASPECT_COLORS = {
  'Aggression': {
    light: '#ffebee',
    main: '#f44336',
    dark: '#c62828',
    gradient: 'linear-gradient(145deg, #ffcdd2, #ef5350)'
  },
  'Justice': {
    light: '#fff9e1',
    main: '#ffd700',
    dark: '#f9a825',
    gradient: 'linear-gradient(145deg, #fff59d, #ffd54f)'
  },
  'Leadership': {
    light: '#e3f2fd',
    main: '#2196f3',
    dark: '#1565c0',
    gradient: 'linear-gradient(145deg, #90caf9, #42a5f5)'
  },
  'Protection': {
    light: '#e8f5e9',
    main: '#4caf50',
    dark: '#2e7d32',
    gradient: 'linear-gradient(145deg, #a5d6a7, #66bb6a)'
  }
};
