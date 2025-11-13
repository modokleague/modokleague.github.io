/* ========================================
   MODOK League Season 5.0 - Utility Functions
   V5.0.0-alpha.10

   Contains:
   - Error handling wrapper (safeExecute)
   - Validation functions
   - Random number generator (seeded PRNG)
   - Array shuffling
   ======================================== */

// ===== ERROR HANDLING =====

// Error boundary wrapper for critical functions
// Prevents one function failure from crashing entire app
function safeExecute(fn, context, args, functionName) {
  try {
    return fn.apply(context, args || []);
  } catch (error) {
    console.error('Error in ' + (functionName || 'anonymous function') + ':', error);
    console.error('Stack trace:', error.stack);
    return null;
  }
}

// ===== VALIDATION =====

// Runtime validation and error protection
(function() {
  'use strict';

  // Validate HTML structure integrity
  function validateStructure() {
    try {
      var requiredElements = ['allHeroes', 'allTraits', 'bannedHeroes', 'bannedTraits', 'goButton', 'results'];
      var missing = [];

      for (var i = 0; i < requiredElements.length; i++) {
        if (!document.getElementById(requiredElements[i])) {
          missing.push(requiredElements[i]);
        }
      }

      if (missing.length > 0) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  // Validate script execution at end
  window.validateScriptExecution = function() {
    var checks = [
      { name: 'HTML Structure', test: validateStructure },
      { name: 'Global Variables', test: function() { return typeof marvelHeroes !== 'undefined'; } },
      { name: 'Main Functions', test: function() { return typeof updateBotSettings === 'function'; } }
    ];

    var passed = 0;
    var total = checks.length;

    for (var i = 0; i < checks.length; i++) {
      var check = checks[i];
      var result = check.test();
      if (result) passed++;
    }

    if (passed === total) {
      return true;
    } else {
      return false;
    }
  };

  // Auto-validate on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(window.validateScriptExecution, 100);
    });
  } else {
    setTimeout(window.validateScriptExecution, 100);
  }

})();

// ===== RANDOM NUMBER GENERATOR =====

// Seeded PRNG for reproducible randomization
// Allows draft pools to be recreated using same seed
function Random(seed) {
  if (typeof seed === 'undefined') {
    seed = Math.random();
  }
  if (typeof seed === 'string') {
    this.seed = this.stringToHash(seed);
  } else {
    this.seed = this.hash(seed.toString());
  }
}

Random.prototype.stringToHash = function(str) {
  if (str === '') return 0;
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

Random.prototype.hash = function(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

Random.prototype.next = function() {
  this.seed = (1664525 * this.seed + 1013904223) >>> 0;
  return this.seed / 0xFFFFFFFF;
};

// ===== ARRAY UTILITIES =====

// Fisher-Yates shuffle with seeded RNG
function shuffleArray(array, rng) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(rng.next() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
