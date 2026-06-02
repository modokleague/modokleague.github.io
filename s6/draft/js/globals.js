/* ========================================
   MODOK League Season 5.0 - Global Variables
   V5.0.0-alpha.11
   ======================================== */

// ===== HERO TRACKING =====

// Individual hero tracking (used within pair-based system)
var draftedHeroes = [];
var allHeroes = [];

// ===== SEASON 5.0: PAIR-BASED DRAFT VARIABLES =====

// Legacy variable names still used internally for Season 5.0 aspect pair pool
// (Despite the name "traits", these store aspect pair displayNames in Season 5.0)
var allTraits = [];      // Full pool of aspect pairs (all displayNames)
var draftedTraits = [];  // Aspect pairs that have been drafted (displayNames)
var traitsGroup1 = [];  // Aspect pair group 1
var traitsGroup2 = [];  // Aspect pair group 2
var traitsGroup3 = [];  // Always empty in Season 5.0 (used only for 6-group mode)

// Hero pair variables
var allHeroPairs = [];           // Array of all hero pair objects in the draft pool
var heroPairGroup1 = [];         // First hero pair group
var heroPairGroup2 = [];         // Second hero pair group
var draftedHeroPairs = [];       // Hero pairs that have been drafted
var heroPairPriorityList = [];   // Bot AI priority list for hero pairs

// Aspect pair variables
var allAspectPairs = [];         // Array of all aspect pair objects in the draft pool
var aspectPairGroup1 = [];       // First aspect pair group
var aspectPairGroup2 = [];       // Second aspect pair group
var draftedAspectPairs = [];     // Aspect pairs that have been drafted
var aspectPairPriorityList = [];  // Bot AI priority list for aspect pairs

// Aspects list (Season 5.0 uses aspect pairs instead of hero-specific traits)
var aspectsList = [
  'Aggression',
  'Justice',
  'Leadership',
  'Protection'
];

// ===== SEASON 6.0: HERO+ASPECT DRAFT VARIABLES =====

// The four draft groups, each an array of item objects
// { hero, aspect, aspects, displayName, tier }. Populated by generateS6DraftPool.
var draftGroups = [];

// Bot AI priority: all pool items sorted by tier (lower tier index = higher priority).
var s6BotPriority = [];

// Heroes available but not present in the generated pool (meaningful in Single Universe).
var s6Excluded = [];

// Current draft mode / universe mode used for the active pool.
var currentDraftMode = DEFAULT_DRAFT_MODE;
var currentUniverseMode = DEFAULT_UNIVERSE_MODE;

// ===== DRAFT STATE VARIABLES =====

// Draft simulator state
var currentTurnIndex = 0;
var currentRound = 1;
var maxRounds = 4; // Season 5.0: Always 4 rounds (2 hero pair picks + 2 aspect pair picks)
var draftOrderTeams = [];
var playerTeamName = '';
var teamPicks = {};
var teamGroupsUsed = {}; // Season 5.0: Tracks which groups each team has picked from
var isPlayerTurn = false;

// ===== BOT AI SETTINGS =====

// Bot surprise: chance a bot makes a completely random pick instead of tier priority
var botSurprisePercentage = 10; // Default 10%

// Bot re-pick: chance a bot re-rolls when it lands on an aspect it already drafted from.
// Re-triggers on each re-roll. Capped at 95% so it can never be guaranteed.
var rePickPercentage = 50; // Default 50%
