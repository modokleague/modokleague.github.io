/* ========================================
   MODOK League Season 5.0 - Global Variables
   V5.0.0-alpha.10
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

// Bot randomness: affects whether bots follow strict round preferences (Hero in R1&3, Aspects in R2&4)
var botRandomnessPercentage = 15; // Default 15% chance to ignore round preferences

// Bot surprise: affects whether bots follow tier list priorities or make random picks
var botSurprisePercentage = 10; // Default 10% chance to ignore tier lists
