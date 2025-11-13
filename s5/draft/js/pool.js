/* ========================================
   MODOK League Season 5.0 - Pool Generation
   V5.0.0-alpha.10

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

// ===== MAIN POOL GENERATION =====
// NOTE: The main pool generation function (goButton click handler) will be in init.js
// This allows it to be the last thing loaded and ensures all dependencies are available
