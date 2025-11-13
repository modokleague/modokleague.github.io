/* ========================================
   MODOK League Season 5.0 - Legacy Code
   V5.0.0-alpha.10

   Contains all remaining JavaScript from index.html
   This includes:
   - Spider-Woman aspect assignment
   - Banned hero/trait lists
   - Initial display setup
   - Pool generation (goButton handler)
   - Export function
   - Draft simulator
   - Bot AI logic
   - All UI update functions

   NOTE: This file can be refactored into smaller modules later
   ======================================== */


   function assignSpiderWomanAspect(rng) {
     var aspects = ['Aggression', 'Justice', 'Leadership', 'Protection', 'Pool'];
     var weights = [2, 2, 2, 2, 1]; // Aggression=2, Justice=2, Leadership=2, Protection=2, Pool=1
     
     var totalWeight = weights.reduce(function(sum, weight) {
       return sum + weight;
     }, 0);
     var random = rng.next() * totalWeight;
     var cumulativeWeight = 0;
     
     for (var i = 0; i < aspects.length; i++) {
       cumulativeWeight += weights[i];
       if (random <= cumulativeWeight) {
         return aspects[i];
       }
     }
     
     return aspects[0]; // Fallback
   }

   // Banned heroes
   var bannedHeroes = [];

  // Banned traits
  var bannedTraits = [];

   // Available traits
   var traitList = [
     "(Spider-Man - Peter Parker) Hero: Avenger - AE: Genius",
     "(Captain Marvel) Hero: Avenger, Soldier - AE: SHIELD, Soldier",
     "(She-Hulk) Hero: Avenger, Gamma - AE: Attorney, Gamma",
     "(Iron Man) Hero: Avenger - AE: Genius",
     "(Black Panther - T'Challa) Hero: Avenger, Wakanda - AE: King, Wakanda",
     "(Captain America) Hero: Avenger, Soldier - AE: SHIELD, Soldier",
     "(Hawkeye) Hero: Avenger - AE: SHIELD",
     "(Spider-Woman) Hero: Avenger, Spy - AE: SHIELD, Spy",
     "(Ms. Marvel) Hero: Champion, Inhuman - AE: Inhuman",
     "(Thor) Hero: Asgard, Avenger - AE: Asgard",
     "(Black Widow) Hero: Avenger, Spy - AE: SHIELD, Spy",
     "(Doctor Strange) Hero: Avenger, Mystic - AE: Mystic",
     "(Hulk) Hero: Avenger, Gamma - AE: Genius, Scientist",
     "(Quicksilver) Hero: Avenger - AE: Civilian",
     "(Scarlet Witch) Hero: Avenger, Mystic - AE: Mystic",
     "(Ant-Man) Hero: Avenger, Tiny, Giant - AE: Civilian",
     "(Wasp) Hero: Avenger, Tiny, Giant - AE: Genius",
     "(Groot) Hero: Guardian - AE: Outlaw",
     "(Rocket Raccoon) Hero: Guardian - AE: Genius, Outlaw",
     "(Star-Lord) Hero: Guardian - AE: Outlaw",
     "(Gamora) Hero: Guardian - AE: Outlaw",
     "(Drax) Hero: Guardian - AE: Outlaw",
     "(Venom) Hero: Guardian, Space Knight - AE: Soldier",
     "(Spectrum) Hero: Aerial, Avenger - AE: Civilian",
     "(Adam Warlock) Hero: Guardian, Mystic - AE: Mystic",
     "(Nebula) Hero: Guardian - AE: Outlaw",
     "(War Machine) Hero: Avenger, Soldier - AE: SHIELD, Soldier",
     "(Valkyrie) Hero: Asgard, Avenger - AE: Asgard",
     "(Vision) Hero: Android, Avenger - AE: Android",
     "(Ghost-Spider) Hero: Web-Warrior - AE: Civilian",
     "(Spider-Man - Miles Morales) Hero: Champion, Web-Warrior - AE: Civilian",
     "(Nova) Hero: Champion - AE: Civilian",
     "(Ironheart) Hero: Aerial, Champion - AE: Genius",
     "(Spider-Ham) Hero: Cartoon, Web-Warrior - AE: Cartoon, Civilian",
     "(Colossus) Hero: X-Men - AE: Mutant",
     "(Shadowcat) Hero: X-Men - AE: Mutant",
     "(Cyclops) Hero: X-Men - AE: Mutant",
     "(Phoenix) Hero: Psionic, X-Men - AE: Mutant, Psionic",
     "(Wolverine) Hero: X-Men - AE: Mutant",
     "(Storm) Hero: X-Men - AE: Mutant",
     "(Gambit) Hero: Thief, X-Men - AE: Mutant, Thief",
     "(Rogue) Hero: X-Men - AE: Mutant",
     "(Cable) Hero: Soldier, X-Force - AE: Mutant, Soldier",
     "(Domino) Hero: Posse, X-Force - AE: Mutant",
     "(Psylocke) Hero: Psionic, X-Force - AE: Mutant, Psionic",
     "(Angel) Hero: Aerial, X-Force - AE: Mutant",
     "(X-23) Hero: X-Force - AE: Mutant",
     "(Deadpool) Hero: Deadpool Corps, X-Force - AE: Mercenary, Mutant",
     "(Bishop) Hero: Temporal, X-Men - AE: Mutant, Temporal",
     "(Magik) Hero: Mystic, X-Men - AE: Mutant, Mystic",
     "(Iceman) Hero: Ice, X-Men - AE: Mutant",
     "(Jubilee) Hero: X-Men - AE: Mutant",
     "(Nightcrawler) Hero: X-Men - AE: Mutant",
     "(Magneto) Hero: X-Men - AE: Mutant",
     "(Maria Hill) Hero: SHIELD, Spy - AE: SHIELD, Spy",
     "(Nick Fury) Hero: SHIELD, Soldier, Spy - AE: SHIELD, Soldier, Spy",
     "(Black Panther - Shuri) Hero: Wakanda - AE: Genius, Wakanda",
     "(Silk) Hero: Web-Warrior - AE: Genius",
     "(Falcon) Hero: Aerial, Avenger - AE: SHIELD",
     "(Winter Soldier) Hero: SHIELD, Soldier - AE: SHIELD, Soldier",
     "(Tigra) Hero: Avenger - AE: Police",
     "(Hulkling) Hero: Avenger, Kree, Skrull - AE: Kree, Skrull"
   ];

   // Bot draft order
   var draftOrder = [
     'Spider-Ham', 'Cable', 'Cyclops', 'Storm', 'Magik', 'Psylocke', 'Maria Hill',
     'Bishop', 'Spider-Man (Peter Parker)', 'Doctor Strange', 'Spider-Man (Miles Morales)',
     'Captain Marvel', 'Scarlet Witch', 'X-23', 'Deadpool',
     'Black Panther (Shuri)', 'Magneto', 'Ironheart', 'Vision', 'Captain America', 
     'Domino', 'Angel', 'Shadowcat', 'Nova',
     'Nick Fury', 'Iron Man', 'Silk', 'Spider-Woman', 'SP//dr',
     'Phoenix', 'Wolverine', 'Venom', 'Rogue', "Black Panther (T'Challa)",
     'Ant-Man', 'Star-Lord', 'Spectrum', 'Colossus', 'Jubilee', 
     'Gambit', 'Iceman', 'Rocket',
     'Falcon', 'Winter Soldier', 'Tigra', 'Hulkling',
     'Adam Warlock', 'Gamora', 'Ghost-Spider', 'Drax', 'Black Widow', 'Nightcrawler', 'Wasp',
     'Ms Marvel', 'Nebula', 'She-Hulk', 'Thor', 'War Machine', 'Quicksilver',
     'Hawkeye', 'Groot', 'Valkyrie', 'Hulk'
   ];

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

   // Check if trait is banned
   function isTraitBanned(traitName) {
     if (bannedTraits.includes(traitName)) return true;
     // Extract character name from trait for comparison
     var characterMatch = traitName.match(/^\(([^)]+)\)/);
     if (characterMatch) {
       var characterName = characterMatch[1];
       for (var i = 0; i < bannedTraits.length; i++) {
         var bannedTrait = bannedTraits[i];
         var bannedCharacterMatch = bannedTrait.match(/^\(([^)]+)\)/);
         if (bannedCharacterMatch && characterName === bannedCharacterMatch[1]) return true;
       }
     }
     return false;
   }

   // Extract aspect type from numbered aspect (e.g., "Justice-1" -> "Justice")
   // Used in 6-group mode display code (will be removed in Phase 6)
   function getAspectType(aspectName) {
     if (!aspectName) return '';
     var parts = aspectName.split('-');
     return parts[0];
   }

   // Parse legacy Season 4.5 trait into 3 components for display
   // Used in 6-group mode display code (will be removed in Phase 6)
   function parseTraitForDisplay(traitString) {
     // Expected format: "(Character Name) Hero: X - AE: Y"
     var characterMatch = traitString.match(/^\(([^)]+)\)/);
     var heroMatch = traitString.match(/Hero:\s*([^-]+)/);
     var aeMatch = traitString.match(/AE:\s*(.+)$/);

     return {
       character: characterMatch ? characterMatch[1] : '',
       hero: heroMatch ? heroMatch[1].trim() : '',
       alterEgo: aeMatch ? aeMatch[1].trim() : ''
     };
   }

   var filteredDraftOrder = draftOrder.filter(function(hero) {
     return !isHeroBanned(hero);
   });
   var marvelHeroes = filteredDraftOrder.slice().sort();

  // Required heroes that must always appear in draft pools
  var REQUIRED_HEROES = ['Tigra', 'Hulkling', 'Falcon', 'Winter Soldier', 'Black Panther (Shuri)', 'Silk'];

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

   // Team name pools
   var teamNamePools = {
     0: ['Aaron Davis', 'Abigail Brand', 'Adrian Toomes', 'Amora', 'Arnim Zola'],
     1: ['Betty Ross', 'Bullseye', 'Bruno Carrelli', 'Baron Mordo', 'Beetle', 'Black Tom Cassidy', 'Black Swan', 'Boomerang', 'Betty Brant'],
     2: ['Calvin Zabo', 'Cassandra Nova', 'Curt Connors', 'Clea', 'Carl "Crusher" Creel', 'Cassie Lang', 'Colleen Wing'],
     3: ['Doctor Doom', 'Donald Pierce', 'Dormammu', 'Daken', 'Danny Rand', 'Donald Blake'],
     4: ['Edwin Jarvis', 'Elektra', 'Emil Blonsky', 'Everett Ross', 'Ebony Maw', 'Eddie Brock', 'Exodus', 'Ego the Living Planet'],
     5: ['Felicia Hardy', 'Fin Fang Foom', 'Frank Castle', 'Franklin Richards', 'Frigga', 'Foggy Nelson'],
     6: ['Gwen Stacy', 'George Stacy', 'Gorgon', 'Giganto', 'Gilgamesh', 'Grandmaster', 'Gorr'],
     7: ['Harry Osborn', 'Howard Stark', 'Hope Pym', 'Hobgoblin', 'Helmut Zemo', 'Happy Hogan', 'Howard the Duck', 'Husk', 'High Evolutionary'],
     8: ['Illyana Rasputin', 'Imperial Guard', 'Iron Fist'],
     9: ['J Jonah Jameson', 'Janet Van Dyne', 'Jessica Jones', 'Jacosta', 'Jamie Madrox', 'Jimmy Woo', 'Johnny Blaze', 'Jessica Drew'],
     10: ['Karnak', 'Kurt Wagner', 'Kitty Pryde', 'Kaluu', 'Kamala Khan', 'Kang the Conqueror', 'Kid Omega', 'Killmonger', 'Kingpin', 'Klaw'],
     11: ['Laufey', 'Leo Fitz', 'Lucia von Bardas', 'Luke Cage', 'Loki', 'Lizard', 'Lorna Dane', 'Logan']
   };

   // Random number generator
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

   function shuffleArray(array, rng) {
     for (var i = array.length - 1; i > 0; i--) {
       var j = Math.floor(rng.next() * (i + 1));
       var temp = array[i];
       array[i] = array[j];
       array[j] = temp;
     }
   }

   // Initialize display
   try {
     // Check if elements exist and populate them
     var allHeroesElement = document.getElementById('allHeroes');
     var bannedHeroesElement = document.getElementById('bannedHeroes');

     if (allHeroesElement && marvelHeroes && marvelHeroes.length > 0) {
       allHeroesElement.innerHTML = marvelHeroes.map(function(hero) {
         return '<div class="hero-card">' + hero + '</div>';
       }).join('');
     }

     if (bannedHeroesElement && bannedHeroes && bannedHeroes.length > 0) {
       bannedHeroesElement.innerHTML = bannedHeroes.map(function(hero) {
         return '<div class="hero-card">' + hero + '</div>';
       }).join('');
     }
   } catch (error) {
     // Silent error handling - preserve initialization flow
   }

   // Update bot settings display
   function updateBotSettings() {
     return safeExecute(function() {
       var randomnessSlider = document.getElementById('botRandomnessSlider');
       var surpriseSlider = document.getElementById('botSurpriseSlider');
       var randomnessValue = document.getElementById('botRandomnessValue');
       var surpriseValue = document.getElementById('botSurpriseValue');
       var description = document.getElementById('botStrategyDescription');

       botRandomnessPercentage = parseInt(randomnessSlider.value);
       botSurprisePercentage = parseInt(surpriseSlider.value);

       randomnessValue.textContent = botRandomnessPercentage + '%';
       surpriseValue.textContent = botSurprisePercentage + '%';

       // Generate combined strategy description
       // Season 5.0: Bot strategy text (4-group mode only)
       var roundText = '';
       if (botRandomnessPercentage === 0) {
         roundText = 'Bots always follow strict pattern: Hero in R1&3, Aspects in R2&4';
       } else if (botRandomnessPercentage <= 25) {
         roundText = 'Bots prefer Hero in R1&3, Aspects in R2&4, with ' + botRandomnessPercentage + '% chance to draft opposite type';
       } else if (botRandomnessPercentage <= 75) {
         roundText = 'Bots have ' + botRandomnessPercentage + '% chance to ignore round preferences';
       } else {
         roundText = 'Bots mostly ignore round preferences (' + botRandomnessPercentage + '% chaos)';
       }

       var surpriseText = '';
       if (botSurprisePercentage === 0) {
         surpriseText = 'Always use tier list priorities';
       } else if (botSurprisePercentage <= 10) {
         surpriseText = botSurprisePercentage + '% chance for shocking surprise picks';
       } else if (botSurprisePercentage <= 25) {
         surpriseText = botSurprisePercentage + '% chance to ignore tier lists completely';
       } else if (botSurprisePercentage <= 50) {
         surpriseText = botSurprisePercentage + '% chance for random picks (mixed strategy)';
       } else {
         surpriseText = botSurprisePercentage + '% chance for random picks (mostly chaos)';
       }

       description.textContent = roundText + '. ' + surpriseText + '.';
     }, null, [], 'updateBotSettings');
   }

   // Update max extras and default value based on draft pool groups
   function updateMaxExtras() {
     return safeExecute(function() {
       var numberOfTeams = parseInt(document.getElementById('teamsInput').value) || 10;
       var draftPoolGroups = document.getElementById('draftPoolGroups').value;
       var extrasInput = document.getElementById('extrasInput');
       
       var maxExtras, defaultExtras;
       if (draftPoolGroups === '4') {
         // For 4-group mode: total heroes needed = 2 * (teams + extras per group)
         maxExtras = Math.floor((marvelHeroes.length / 2) - numberOfTeams);
         defaultExtras = 3;
       } else if (draftPoolGroups === '6') {
         // For 6-group mode: total heroes needed = 3 * (teams + extras per group)
         maxExtras = Math.floor((marvelHeroes.length / 3) - numberOfTeams);
         defaultExtras = 2;
       }
       
       document.getElementById('maxExtras').textContent = maxExtras;
       
       // Update default value if current value is the old default or if switching modes
       var currentValue = parseInt(extrasInput.value) || 0;
       
       if (currentValue === 6 || currentValue === 3 || currentValue === 0) {
         extrasInput.value = defaultExtras;
       }
       
       // Ensure current value doesn't exceed new maximum
       if (currentValue > maxExtras) {
         extrasInput.value = maxExtras;
       }
       
       extrasInput.setAttribute('max', maxExtras);
      
      // Season 5.0: Update round preferences text (4-group mode only)
      var roundPreferencesText = document.getElementById('roundPreferencesText');
      if (roundPreferencesText) {
        roundPreferencesText.textContent = 'Chance to ignore round preferences (Hero R1&3, Aspects R2&4)';
      }
       
       // Season 5.0: Update UI text (4-group mode only)
       document.getElementById('draftDescription').textContent = 'Each kouple drafts 2 heroes and 2 aspect pairs over 4 rounds';
       document.getElementById('draftRulesText').innerHTML =
         '<strong>Draft Rules:</strong> 4 rounds total. Each kouple picks 2 heroes and 2 aspect pairs. You can choose heroes or aspect pairs freely within constraints.<br>' +
         '<strong>Group Restrictions (4-group mode):</strong> Each kouple can only draft one hero from each hero group AND one aspect pair from each aspect pair group. Second picks must be from opposite groups.<br>' +
         '<strong>Bot Strategy:</strong> Three-stage system - 1) Check round preferences, 2) Check for surprise picks (random), 3) Use strategic selection.<br>' +
         '<strong>Round Preferences:</strong> Bots prefer Hero in R1&R3, Aspects in R2&4. "Bot Ignore Round Preferences" slider controls chance to draft opposite type.<br>';
       
       var currentValue = parseInt(extrasInput.value) || 6;
       if (currentValue > maxExtras) {
         extrasInput.value = maxExtras;
       }
       
       // Update bot strategy text to reflect new draft mode
       updateBotSettings();
     }, null, [], 'updateMaxExtras');
   }
   
   updateMaxExtras();
   document.getElementById('teamsInput').addEventListener('input', updateMaxExtras);
   document.getElementById('draftPoolGroups').addEventListener('change', updateMaxExtras);

   // Generate pool button event listener
   document.getElementById('goButton').addEventListener('click', function() {
   try {
     var seedInput = document.getElementById('seedInput').value;
     var rng = new Random(seedInput || Math.random());
     
     var numberOfTeams = parseInt(document.getElementById('teamsInput').value);
     var numberOfExtras = parseInt(document.getElementById('extrasInput').value) || 6;
     var draftPoolGroups = document.getElementById('draftPoolGroups').value;

     // ===== SEASON 5.0: Calculate pairs needed =====
     // For 4-group mode: 2 hero pair groups + 2 aspect pair groups
     // Each group needs (numberOfTeams + numberOfExtras) pairs
     var heroPairsNeeded = 2 * (numberOfTeams + numberOfExtras);
     var aspectPairsNeeded = 2 * (numberOfTeams + numberOfExtras);

     // Total individual heroes needed for pairing (each pair = 2 heroes)
     var numberOfHeroes;
     if (draftPoolGroups === '4') {
       // Season 5.0: 4-group mode uses pairs
       numberOfHeroes = heroPairsNeeded * 2;
     } else if (draftPoolGroups === '6') {
       // Legacy: For 6-group mode: each group has (teams + extras), total = 3 * (teams + extras)
       numberOfHeroes = 3 * (numberOfTeams + numberOfExtras);
     } else {
       // Fallback to 4-group mode behavior
       numberOfHeroes = heroPairsNeeded * 2;
     }

     if (numberOfHeroes > marvelHeroes.length) {
       alert('Pool size too large! Maximum extras possible: ' + (marvelHeroes.length - (2 * numberOfTeams)));
       return;
     }

     // Generate hero pool
     var heroesPool = marvelHeroes.slice();
     // Check if required heroes option is enabled
    var requireHeroesEnabled = document.getElementById('requireHeroesCheckbox').checked;

    if (!requireHeroesEnabled) {
      shuffleArray(heroesPool, rng);
    }

     var selectedHeroes = [];
     var excludedHeroes = [];

     if (requireHeroesEnabled) {
       // Ensure required heroes are included
       var availableRequiredHeroes = REQUIRED_HEROES.filter(function(hero) {
         return heroesPool.includes(hero);
       });

       if (availableRequiredHeroes.length > numberOfHeroes) {
         alert('Pool size too small for all required heroes! Please increase pool size or disable required heroes.');
         return;
       }

       // Add required heroes first
       selectedHeroes = availableRequiredHeroes.slice();

       // Remove required heroes from the pool for random selection
       var remainingPool = heroesPool.filter(function(hero) {
         return !availableRequiredHeroes.includes(hero);
       });

       // Shuffle remaining pool and add heroes to reach target count
       shuffleArray(remainingPool, rng);
       var remainingNeeded = numberOfHeroes - selectedHeroes.length;
       selectedHeroes = selectedHeroes.concat(remainingPool.slice(0, remainingNeeded));
       excludedHeroes = remainingPool.slice(remainingNeeded).sort();
     } else {
       // Original logic for when required heroes is disabled
       selectedHeroes = heroesPool.slice(0, numberOfHeroes);
       excludedHeroes = heroesPool.slice(numberOfHeroes).sort();
     }
     
     // Handle Spider-Woman aspect assignment
     var spiderWomanIndex = selectedHeroes.findIndex(function(hero) {
       return hero === 'Spider-Woman';
     });
     if (spiderWomanIndex !== -1) {
       var assignedAspect = assignSpiderWomanAspect(rng);
       selectedHeroes[spiderWomanIndex] = 'Spider-Woman - ' + assignedAspect;
     }
     
     selectedHeroes.sort();

     // Season 5.0: Get pairing mode from UI
     var pairingMode = document.getElementById('pairingMode')
       ? document.getElementById('pairingMode').value
       : DEFAULT_PAIRING_MODE;

     // Season 5.0: Create hero pairs
     var heroPairs = createHeroPairs(selectedHeroes, pairingMode, rng);
     allHeroPairs = heroPairs;

     // Season 5.0: Split pairs into 2 groups
     var heroPairGroups = splitPairsIntoTwoGroups(heroPairs, rng);
     heroPairGroup1 = heroPairGroups.group1;
     heroPairGroup2 = heroPairGroups.group2;

     // Sort hero pairs alphabetically by displayName within each group
     heroPairGroup1.sort(function(a, b) {
       return a.displayName.localeCompare(b.displayName);
     });
     heroPairGroup2.sort(function(a, b) {
       return a.displayName.localeCompare(b.displayName);
     });

     // Keep legacy hero groups for display (temporary - will update displays in Alpha.4)
     allHeroes = selectedHeroes;

     // Check for 4-group mode and split heroes
      if (draftPoolGroups === '4') {
       var heroGroups = splitHeroPoolIntoGroups(selectedHeroes, rng);
       heroGroup1 = heroGroups.group1;
       heroGroup2 = heroGroups.group2;
       heroGroup3 = [];
     } else if (draftPoolGroups === '6') {
       var heroGroups = splitHeroPoolIntoThreeGroups(selectedHeroes, rng);
       heroGroup1 = heroGroups.group1;
       heroGroup2 = heroGroups.group2;
       heroGroup3 = heroGroups.group3;
     } else {
       // Fallback to 4-group mode behavior
       var heroGroups = splitHeroPoolIntoGroups(selectedHeroes, rng);
       heroGroup1 = heroGroups.group1;
       heroGroup2 = heroGroups.group2;
       heroGroup3 = [];
     }

    // Season 5.0: Generate aspect pairs
    var aspectPairs = createAspectPairs(aspectPairsNeeded, rng);
    allAspectPairs = aspectPairs;

    // Season 5.0: Split aspect pairs into 2 groups
    var aspectPairGroups = splitPairsIntoTwoGroups(aspectPairs, rng);
    aspectPairGroup1 = aspectPairGroups.group1;
    aspectPairGroup2 = aspectPairGroups.group2;

    // Sort aspect pairs alphabetically by displayName within each group
    aspectPairGroup1.sort(function(a, b) {
      return a.displayName.localeCompare(b.displayName);
    });
    aspectPairGroup2.sort(function(a, b) {
      return a.displayName.localeCompare(b.displayName);
    });

    // Season 5.0: Extract aspect pair displayNames for legacy variable compatibility
    // (These "traits" variables actually store aspect pair displayNames in Season 5.0)
    var traitsPool = aspectPairs.map(function(pair) {
      return pair.displayName;
    });
    allTraits = traitsPool.slice();
     
     // Check for 4-group mode and split aspects
      // Add 6-group mode support for 3 aspect groups
     if (draftPoolGroups === '6') {
       var traitsGroups = splitTraitsPoolIntoThreeGroups(traitsPool, rng);
       traitsGroup1 = traitsGroups.group1;
       traitsGroup2 = traitsGroups.group2;
       traitsGroup3 = traitsGroups.group3;
       window.traitsGroup1 = traitsGroup1;
       window.traitsGroup2 = traitsGroup2;
       window.traitsGroup3 = traitsGroup3;
     } else if (draftPoolGroups === '4') {
       var traitsGroups = splitTraitsPoolIntoGroups(traitsPool, rng);
       traitsGroup1 = traitsGroups.group1;
       traitsGroup2 = traitsGroups.group2;
       traitsGroup3 = [];
       window.traitsGroup1 = traitsGroup1;
       window.traitsGroup2 = traitsGroup2;
       window.traitsGroup3 = traitsGroup3;
     } else {
       // Fallback to 4-group mode behavior
       var traitsGroups = splitTraitsPoolIntoGroups(traitsPool, rng);
       traitsGroup1 = traitsGroups.group1;
       traitsGroup2 = traitsGroups.group2;
       traitsGroup3 = [];
       window.traitsGroup1 = traitsGroup1;
       window.traitsGroup2 = traitsGroup2;
       window.traitsGroup3 = traitsGroup3;
     }

    // Season 5.0: No aspect pairs are excluded from the pool
    var excludedTraits = [];
     
     // Season 5.0: Initialize pair priorities for bot AI
    initializeHeroPairPriority(heroPairs, rng);
    initializeAspectPairPriority(aspectPairs, rng);

     // Season 5.0: Aspect pair priority is now initialized in js/pairing.js
     // Legacy trait priority removed - no longer needed

     // Update draft bot order to use the aspect-assigned Spider-Woman name
     var draftBot = filteredDraftOrder.slice();
     var spiderWomanBotIndex = draftBot.findIndex(function(hero) {
       return hero === 'Spider-Woman';
     });
     // Find Spider-Woman variant in selectedHeroes after sorting
    var spiderWomanVariantInSelected = selectedHeroes.find(function(hero) {
      return hero.startsWith('Spider-Woman - ');
    });
    
    if (spiderWomanBotIndex !== -1 && spiderWomanVariantInSelected) {
       draftBot[spiderWomanBotIndex] = spiderWomanVariantInSelected;
     }
     
    draftBot = draftBot.filter(function(hero) {
       return selectedHeroes.includes(hero);
     });

     
    // Update filteredDraftOrder to use the corrected draftBot array
    filteredDraftOrder = draftBot.slice();

    // Get custom teams
     var customTeamList = document.getElementById('teamListInput').value.trim();
     var customTeams = customTeamList ? customTeamList.split('\n').map(function(name) {
       return name.trim();
     }).filter(function(name) {
       return name.length > 0;
     }) : [];
     
     var userTeamName = customTeams.length > 0 ? customTeams[0] : '';
     var numberOfActualTeams = userTeamName ? numberOfTeams - 1 : numberOfTeams;
     
     var teams = Array.from({ length: numberOfActualTeams }, function(_, i) {
       var customIndex = i + 1;
       if (customIndex < customTeams.length) {
         return customTeams[customIndex];
       }
       
       if (teamNamePools[i]) {
         var namePool = teamNamePools[i].slice();
         var randomIndex = Math.floor(rng.next() * namePool.length);
         return namePool[randomIndex];
       } else {
         return 'Kouple ' + String.fromCharCode(65 + i);
       }
     });
     
     if (userTeamName) {
       teams.push(userTeamName);
     }
     
     shuffleArray(teams, rng);

     // Display results based on group mode
     if (draftPoolGroups === '6') {
       // Display three hero groups for 6-group mode
       document.getElementById('resultPool').innerHTML = 
         '<div class="result-section" style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 15px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Hero Group 1</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             heroGroup1.map(function(hero) {
               return '<div class="hero-card">' + hero + '</div>';
             }).join('') +
           '</div>' +
         '</div>' +
         '<div class="result-section" style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 15px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Hero Group 2</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             heroGroup2.map(function(hero) {
               return '<div class="hero-card">' + hero + '</div>';
             }).join('') +
           '</div>' +
         '</div>' +
         '<div class="result-section" style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 15px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Hero Group 3</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             heroGroup3.map(function(hero) {
               return '<div class="hero-card">' + hero + '</div>';
             }).join('') +
           '</div>' +
         '</div>';
     } else if (draftPoolGroups === '4') {
       // Season 5.0: Display hero pairs instead of individuals
       document.getElementById('resultPool').innerHTML =
         '<div class="result-section" style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 15px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Hero Pair Group 1</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             heroPairGroup1.map(function(pair) {
               return '<div class="hero-card" style="padding: 12px 16px;">' + pair.displayName + '</div>';
             }).join('') +
           '</div>' +
         '</div>' +
         '<div class="result-section" style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 15px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Hero Pair Group 2</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             heroPairGroup2.map(function(pair) {
               return '<div class="hero-card" style="padding: 12px 16px;">' + pair.displayName + '</div>';
             }).join('') +
           '</div>' +
         '</div>';
     } else {
       // Display single hero pool
       document.getElementById('resultPool').innerHTML = selectedHeroes.map(function(hero) {
         return '<div class="hero-card">' + hero + '</div>';
       }).join('');
     }
     
     // Display aspects based on group mode
      // Add 6-group mode support for 3 aspect groups display
     if (draftPoolGroups === '6' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && traitsGroup3.length > 0) {
       // Display separate aspect groups with type summaries for 6-group mode
       document.getElementById('resultTraitsPool').innerHTML = 
         '<div class="result-section" style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 10px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Traits Group 1</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             traitsGroup1.map(function(aspect) {
               var aspectType = getAspectType(aspect);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspect);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               return '<div class="hero-card trait-card-multiline" style="' + traitStyle + '">' + multiLineContent + '</div>';
             }).join('') +
           '</div>' +
         '</div>' +
         '<div class="result-section" style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 10px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Traits Group 2</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             traitsGroup2.map(function(aspect) {
               var aspectType = getAspectType(aspect);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspect);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               return '<div class="hero-card trait-card-multiline" style="' + traitStyle + '">' + multiLineContent + '</div>';
             }).join('') +
           '</div>' +
         '</div>' +
         '<div class="result-section" style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 10px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Traits Group 3</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             traitsGroup3.map(function(aspect) {
               var aspectType = getAspectType(aspect);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspect);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               return '<div class="hero-card trait-card-multiline" style="' + traitStyle + '">' + multiLineContent + '</div>';
             }).join('') +
           '</div>' +
         '</div>';
     } else if (draftPoolGroups === '4' && traitsGroup1.length > 0 && traitsGroup2.length > 0) {
       // Season 5.0: Display aspect pairs instead of individual traits
       document.getElementById('resultTraitsPool').innerHTML =
         '<div class="result-section" style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 10px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Aspect Pair Group 1</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             aspectPairGroup1.map(function(pair) {
               var pairStyle = getAspectPairStyle(pair);
               return '<div class="hero-card" style="background: ' + pairStyle + '; color: white; padding: 12px 16px;">' +
                      pair.displayName +
                      '</div>';
             }).join('') +
           '</div>' +
         '</div>' +
         '<div class="result-section" style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
           '<h3 style="margin-bottom: 10px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">Aspect Pair Group 2</h3>' +
           '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
             aspectPairGroup2.map(function(pair) {
               var pairStyle = getAspectPairStyle(pair);
               return '<div class="hero-card" style="background: ' + pairStyle + '; color: white; padding: 12px 16px;">' +
                      pair.displayName +
                      '</div>';
             }).join('') +
           '</div>' +
         '</div>';
     }
     
     // Season 5.0: Display hero pair priority instead of individual heroes
     document.getElementById('resultDraftBot').innerHTML = heroPairPriorityList.map(function(pair) {
       return '<div class="hero-card" style="padding: 12px 16px;">' + pair.displayName + '</div>';
     }).join('');
     
     // Season 5.0: Display aspect pair priority instead of individual traits
     document.getElementById('resultDraftBotTraits').innerHTML = aspectPairPriorityList.map(function(pair) {
       var pairStyle = getAspectPairStyle(pair);
       return '<div class="hero-card" style="background: ' + pairStyle + '; color: white; padding: 12px 16px;">' +
              pair.displayName +
              '</div>';
     }).join('');
     
     document.getElementById('resultDraftOrder').innerHTML = teams.map(function(team, index) {
       return '<div class="kouple-card">' + (index + 1) + '. ' + team + '</div>';
     }).join('');
     
     // Season 5.0: Excluded display simplified for pair mode
     document.getElementById('resultExcluded').innerHTML =
       '<div style="padding: 20px; text-align: center; color: #666; font-style: italic;">' +
       'Excluded hero tracking not applicable in pair-based drafting mode' +
       '</div>';
    
    // Season 5.0: Excluded aspects section removed from UI (all aspects always available)
    // No longer displaying excluded aspects

     document.getElementById('results').style.display = 'block';
     document.getElementById('footerNote').style.display = 'block';
     
     document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
   } catch (error) {
      alert('Error generating draft pool: ' + error.message);
   }
   });

   // Helper function to get highest available Leadership aspect
   function getHighestAvailableLeadership() {
     var availableLeadership = allTraits.filter(function(aspect) {
       var aspectType = getAspectType(aspect);
       return aspectType === 'Leadership' && !draftedTraits.includes(aspect);
     });
     
     if (availableLeadership.length === 0) return null;
     
     // Sort alphabetically and return the first available trait
     availableLeadership.sort();
     
     return availableLeadership[0];
   }

   // Helper function to get highest available aspect of specified type
   function getHighestAvailableAspect(aspectType) {
     var availableInstances = allTraits.filter(function(aspect) {
       var currentType = getAspectType(aspect);
       return currentType === aspectType && !draftedTraits.includes(aspect);
     });
     
     if (availableInstances.length === 0) return null;
     
     availableInstances.sort();
     
     return availableInstances[0];
   }

   // Get highest available aspect of specified type within specific group
   function getHighestAvailableAspectInGroup(aspectType, groupNumber) {
     // Get the appropriate group array
     var groupAspects = groupNumber === 1 ? traitsGroup1 : traitsGroup2;
     
     // Filter to only aspects of the specified type within this group that aren't drafted
     var availableInstances = groupAspects.filter(function(aspect) {
       var currentType = getAspectType(aspect);
       return currentType === aspectType && !draftedTraits.includes(aspect);
     });
     
     if (availableInstances.length === 0) {
       return null;
     }
     
     // Sort by number in descending order and return the highest
     availableInstances.sort();
     
     return availableInstances[0];
   }

   // Get selectable aspects in group (highest numbered of each type only)
   function getSelectableAspectsInGroup(groupNumber) {
     // Get the appropriate group array - Add support for group 3
     var groupAspects = groupNumber === 1 ? traitsGroup1 : (groupNumber === 2 ? traitsGroup2 : traitsGroup3);
     
     // Group aspects by type
     var aspectsByType = {};
     groupAspects.forEach(function(aspect) {
       var aspectType = getAspectType(aspect);
       if (!aspectsByType[aspectType]) {
         aspectsByType[aspectType] = [];
       }
       aspectsByType[aspectType].push(aspect);
     });
     
     // Get highest numbered (non-drafted) aspect of each type
     var selectableAspects = [];
     Object.keys(aspectsByType).forEach(function(aspectType) {
       var typeAspects = aspectsByType[aspectType];
       
       // Filter out drafted aspects
       var availableTypeAspects = typeAspects.filter(function(aspect) {
         return !draftedTraits.includes(aspect);
       });
       
       if (availableTypeAspects.length > 0) {
         // Sort by number in descending order and take the highest
         availableTypeAspects.sort();
         
         selectableAspects.push(availableTypeAspects[0]);
       }
     });
     
     return selectableAspects;
   }

   // Season 5.0: Determine current round type (hero pair or aspect pair)
  function getCurrentRoundType() {
    var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;

    if (draftPoolGroups === '4') {
      // Season 5.0: Rounds 1 & 3 = hero pairs, Rounds 2 & 4 = aspect pairs
      if (currentRound === 1 || currentRound === 3) {
        return 'heroPair';
      } else if (currentRound === 2 || currentRound === 4) {
        return 'aspectPair';
      }
    } else if (draftPoolGroups === '6') {
      // Legacy 6-group mode: Rounds 1, 3, 5 = heroes, Rounds 2, 4, 6 = aspects
      if (currentRound === 1 || currentRound === 3 || currentRound === 5) {
        return 'hero';
      } else {
        return 'aspect';
      }
    }
    return null;
  }

  function canTeamDraft(teamName, draftType, groupNumber) {
     var picks = teamPicks[teamName] || [];
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;

     // Season 5.0: Handle pair-based drafting
     if (draftPoolGroups === '4') {
       var heroPairs = picks.filter(function(pick) {
         return pick && typeof pick === 'object' && pick.hero1; // Check if it's a hero pair object
       });
       var aspectPairs = picks.filter(function(pick) {
         return pick && typeof pick === 'object' && pick.aspect1; // Check if it's an aspect pair object
       });

       var groupsUsed = teamGroupsUsed[teamName] || { heroPairGroups: [], aspectPairGroups: [] };

       if (draftType === 'heroPair') {
         // Check total hero pairs
         if (heroPairs.length >= 2) return false;

         // If groupNumber specified, check if this specific group has been used
         if (groupNumber !== undefined && groupsUsed.heroPairGroups.includes(groupNumber)) {
           return false;
         }

         return true;
       } else if (draftType === 'aspectPair') {
         // Check total aspect pairs
         if (aspectPairs.length >= 2) return false;

         // If groupNumber specified, check if this specific group has been used
         if (groupNumber !== undefined && groupsUsed.aspectPairGroups.includes(groupNumber)) {
           return false;
         }

         return true;
       }
       return false;
     }

     // Legacy 6-group mode logic
     var heroes = picks.filter(function(pick) {
       return allHeroes.includes(pick);
     });
     var aspects = picks.filter(function(pick) {
       return allTraits.includes(pick);
     });

     if (draftType === 'hero') {
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       // Support 3 heroes in 6-group mode
       var maxHeroes = draftPoolGroups === '6' ? 3 : 2;
       
       if (heroes.length >= maxHeroes) {
         return false; // Already have max heroes (2 for 4-group, 3 for 6-group)
       }
       
       // Check hero group restrictions in 4-group mode
        if (draftPoolGroups === '4' && heroGroup1.length > 0 && heroGroup2.length > 0) {
         var group1Heroes = heroes.filter(function(hero) { return getHeroGroup(hero) === 1; });
         var group2Heroes = heroes.filter(function(hero) { return getHeroGroup(hero) === 2; });
         
         // If team already has a hero from both groups, they can't draft more heroes
         if (group1Heroes.length >= 1 && group2Heroes.length >= 1) {
           return false;
         }
       } else if (draftPoolGroups === '6' && heroGroup1.length > 0 && heroGroup2.length > 0 && heroGroup3.length > 0) {
         var group1Heroes = heroes.filter(function(hero) { return getHeroGroup(hero) === 1; });
         var group2Heroes = heroes.filter(function(hero) { return getHeroGroup(hero) === 2; });
         var group3Heroes = heroes.filter(function(hero) { return getHeroGroup(hero) === 3; });
         
         // Each team can only have one hero from each of the 3 groups
         if ((group1Heroes.length >= 1 && group2Heroes.length >= 1 && group3Heroes.length >= 1) ||
             group1Heroes.length >= 2 || group2Heroes.length >= 2 || group3Heroes.length >= 2) {
           return false;
         }
       }
       
       return true;
     } else if (draftType === 'aspect') {
       // Support 3 aspects maximum in 6-group mode
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       var maxAspects = draftPoolGroups === '6' ? 3 : 2;
       
       if (aspects.length >= maxAspects) {
         return false; // Already have max aspects (2 for most modes, 3 for 6-group mode)
       }
       
       // Check aspect group restrictions in 4-group mode
        // Add 6-group mode support for 3 aspect groups
       if (draftPoolGroups === '6' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && traitsGroup3.length > 0) {
         var group1Aspects = aspects.filter(function(aspect) { return getAspectGroup(aspect) === 1; });
         var group2Aspects = aspects.filter(function(aspect) { return getAspectGroup(aspect) === 2; });
         var group3Aspects = aspects.filter(function(aspect) { return getAspectGroup(aspect) === 3; });
         
         // If team already has an aspect from all 3 groups, they can't draft more aspects
         if (group1Aspects.length >= 1 && group2Aspects.length >= 1 && group3Aspects.length >= 1) {
           return false;
         }
       } else if (draftPoolGroups === '4' && traitsGroup1.length > 0 && traitsGroup2.length > 0) {
         var group1Aspects = aspects.filter(function(aspect) { return getAspectGroup(aspect) === 1; });
         var group2Aspects = aspects.filter(function(aspect) { return getAspectGroup(aspect) === 2; });
         
         // If team already has an aspect from both groups, they can't draft more aspects
         if (group1Aspects.length >= 1 && group2Aspects.length >= 1) {
           return false;
         }
       }
       
       return true;
     }
     return false;
   }
   
   // Check if team can draft from specific hero group
   function canTeamDraftFromGroup(teamName, groupNumber) {
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
     if (draftPoolGroups === '4' && (heroGroup1.length === 0 || heroGroup2.length === 0)) {
       return true; // No restrictions if groups aren't set up
     } else if (draftPoolGroups === '6' && (heroGroup1.length === 0 || heroGroup2.length === 0 || heroGroup3.length === 0)) {
       return true; // No restrictions if groups aren't set up
     } else if (draftPoolGroups !== '4' && draftPoolGroups !== '6') {
       return true; // No restrictions if not 4-group or 6-group mode
     }

     // Season 5.0 (4-group mode): Use teamGroupsUsed tracking
     if (draftPoolGroups === '4') {
       var groupsUsed = teamGroupsUsed[teamName] || { heroPairGroups: [], aspectPairGroups: [] };
       return !groupsUsed.heroPairGroups.includes(groupNumber);
     }

     // Legacy (6-group mode): Use old filtering logic
     var picks = teamPicks[teamName] || [];
     var heroes = picks.filter(function(pick) {
       return allHeroes.includes(pick);
     });

     var groupHeroes = heroes.filter(function(hero) {
       return getHeroGroup(hero) === groupNumber;
     });

     return groupHeroes.length === 0; // Can draft if no heroes from this group yet
   }

   // Check if team can draft from specific aspect group
   function canTeamDraftFromAspectGroup(teamName, groupNumber) {
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
     // Add 6-group mode support
     if (draftPoolGroups === '6') {
       if (traitsGroup1.length === 0 || traitsGroup2.length === 0 || traitsGroup3.length === 0) {
         return true; // No restrictions if groups aren't set up
       }
     } else if (draftPoolGroups !== '4' || traitsGroup1.length === 0 || traitsGroup2.length === 0) {
       return true; // No restrictions if not 4-group mode or if groups aren't set up
     }

     // Season 5.0 (4-group mode): Use teamGroupsUsed tracking
     if (draftPoolGroups === '4') {
       var groupsUsed = teamGroupsUsed[teamName] || { heroPairGroups: [], aspectPairGroups: [] };
       return !groupsUsed.aspectPairGroups.includes(groupNumber);
     }

     // Legacy (6-group mode): Use old filtering logic
     var picks = teamPicks[teamName] || [];
     var aspects = picks.filter(function(pick) {
       return allTraits.includes(pick);
     });

     var groupAspects = aspects.filter(function(aspect) {
       return getAspectGroup(aspect) === groupNumber;
     });

     return groupAspects.length === 0; // Can draft if no aspects from this group yet
   }
   
   function getConstraintMessage(teamName) {
     var picks = teamPicks[teamName] || [];
     // Season 5.0: Detect pair objects instead of filtering by allHeroes/allTraits
     var heroes = picks.filter(function(pick) {
       return (pick && typeof pick === 'object' && pick.hero1) || allHeroes.includes(pick);
     });
     var aspects = picks.filter(function(pick) {
       return (pick && typeof pick === 'object' && pick.aspect1) || allTraits.includes(pick);
     });
     
     // Dynamic hero limits based on draft mode
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
     // Support 3 heroes and 3 aspects in 6-group mode
     var maxHeroes = draftPoolGroups === '6' ? 3 : 2;
     var maxAspects = draftPoolGroups === '6' ? 3 : 2;
     var heroesLeft = maxHeroes - heroes.length;
     var aspectsLeft = maxAspects - aspects.length;
     var heroGroupInfo = '';
     var aspectGroupInfo = '';
     
     if (draftPoolGroups === '6' && heroGroup1.length > 0 && heroGroup2.length > 0 && heroGroup3.length > 0 && heroesLeft > 0) {
       var heroGroup1Available = canTeamDraftFromGroup(teamName, 1);
       var heroGroup2Available = canTeamDraftFromGroup(teamName, 2);
       var heroGroup3Available = canTeamDraftFromGroup(teamName, 3);
       
       var availableGroups = [];
       if (heroGroup1Available) availableGroups.push('1');
       if (heroGroup2Available) availableGroups.push('2');
       if (heroGroup3Available) availableGroups.push('3');
       
       if (availableGroups.length === 0) {
         heroGroupInfo = ' - no groups available';
       } else if (availableGroups.length === 3) {
         heroGroupInfo = ' from Groups ' + availableGroups.join(',');
       } else {
         heroGroupInfo = ' from Groups ' + availableGroups.join(',');
       }
     } else if (draftPoolGroups === '4' && heroGroup1.length > 0 && heroGroup2.length > 0 && heroesLeft > 0) {
       var heroGroup1Available = canTeamDraftFromGroup(teamName, 1);
       var heroGroup2Available = canTeamDraftFromGroup(teamName, 2);
       
       var availableGroups = [];
       if (heroGroup1Available) availableGroups.push('1');
       if (heroGroup2Available) availableGroups.push('2');
       
       if (availableGroups.length === 0) {
         heroGroupInfo = ' - no groups available';
       } else {
         heroGroupInfo = ' from Groups ' + availableGroups.join(',');
       }
     }
     
     // Add aspect group restriction info
     // Add 6-group mode support for 3 aspect groups
     if (draftPoolGroups === '6' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && traitsGroup3.length > 0 && aspectsLeft > 0) {
       var traitsGroup1Available = canTeamDraftFromAspectGroup(teamName, 1);
       var traitsGroup2Available = canTeamDraftFromAspectGroup(teamName, 2);
       var traitsGroup3Available = canTeamDraftFromAspectGroup(teamName, 3);
       
       var availableAspectGroups = [];
       if (traitsGroup1Available) availableAspectGroups.push('1');
       if (traitsGroup2Available) availableAspectGroups.push('2');
       if (traitsGroup3Available) availableAspectGroups.push('3');
       
       if (availableAspectGroups.length === 0) {
         aspectGroupInfo = ' - no groups available';
       } else {
         aspectGroupInfo = ' from Groups ' + availableAspectGroups.join(',');
       }
     } else if (draftPoolGroups === '4' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && aspectsLeft > 0) {
       var traitsGroup1Available = canTeamDraftFromAspectGroup(teamName, 1);
       var traitsGroup2Available = canTeamDraftFromAspectGroup(teamName, 2);
       
       var availableAspectGroups = [];
       if (traitsGroup1Available) availableAspectGroups.push('1');
       if (traitsGroup2Available) availableAspectGroups.push('2');
       
       if (availableAspectGroups.length === 0) {
         aspectGroupInfo = ' - no groups available';
       } else {
         aspectGroupInfo = ' from Groups ' + availableAspectGroups.join(',');
       }
     }
     
     if (heroesLeft === 0) {
       return "You must pick a trait (no heroes remaining)" + aspectGroupInfo;
     } else if (aspectsLeft === 0) {
       return "You must pick a hero (no traits remaining)" + heroGroupInfo;
     } else {
       return "You can pick either a hero (" + heroesLeft + " left" + heroGroupInfo + ") or trait (" + aspectsLeft + " left" + aspectGroupInfo + ")";
     }
   }

   // Export function
   function exportDraftPool() {
     return safeExecute(function() {
       var heroCards = document.getElementById('resultPool').children;
       var aspectCards = document.getElementById('resultTraitsPool').querySelectorAll('.hero-card');
       var teamCards = document.getElementById('resultDraftOrder').children;
       var excludedCards = document.getElementById('resultExcluded').children;
       // Season 5.0: Excluded aspects section removed (all aspects always available)
       var draftBotCards = document.getElementById('resultDraftBot').children;
       var draftBotAspectCards = document.getElementById('resultDraftBotTraits').children;
       
       if (heroCards.length === 0) {
         alert('Please generate a draft pool first!');
         return;
       }
       
       var numberOfTeams = document.getElementById('teamsInput').value;
       var numberOfExtras = document.getElementById('extrasInput').value;
       var seedUsed = document.getElementById('seedInput').value || 'Random';
       var customTeamList = document.getElementById('teamListInput').value.trim();
       var customTeams = customTeamList ? customTeamList.split('\n').map(function(name) {
         return name.trim();
       }).filter(function(name) {
         return name.length > 0;
       }) : [];
       var userTeam = customTeams.length > 0 ? customTeams[0] : 'None';
       var draftPoolGroups = document.getElementById('draftPoolGroups').value;
        
       var exportText = '';
       exportText += '='.repeat(50) + '\n';
       exportText += '    MODOK LEAGUE SEASON 4.5 - DRAFT POOL\n';
       exportText += '='.repeat(50) + '\n';
       exportText += 'Generated: ' + new Date().toLocaleString() + '\n';
       exportText += 'Version: ' + TOOL_VERSION + '\n';
       exportText += 'Kouples: ' + numberOfTeams + '\n';
       exportText += 'Extras: ' + numberOfExtras + '\n';
       exportText += 'Seed: ' + seedUsed + '\n';
       exportText += 'Bot Ignore Round Preferences: ' + botRandomnessPercentage + '%\n';
       exportText += 'Bot Surprise Pick: ' + botSurprisePercentage + '%\n';
        exportText += 'User Kouple: ' + userTeam + '\n';
       if (customTeamList) {
         exportText += 'Custom Kouples Used: Yes\n';
       }
       exportText += '\n';
       
       // Fix hero pool export for 4-group mode
       if (draftPoolGroups === '6' && heroGroup1.length > 0 && heroGroup2.length > 0 && heroGroup3.length > 0) {
         var totalHeroes = heroGroup1.length + heroGroup2.length + heroGroup3.length;
         exportText += 'HERO POOL (' + totalHeroes + ' heroes)\n';
         exportText += '-'.repeat(30) + '\n';
         exportText += 'Hero Group 1\n';
         for (var i = 0; i < heroGroup1.length; i++) {
           exportText += 'G1 ' + heroGroup1[i] + '\n';
         }
         exportText += '\n';
         exportText += 'Hero Group 2\n';
         for (var i = 0; i < heroGroup2.length; i++) {
           exportText += 'G2 ' + heroGroup2[i] + '\n';
         }
         exportText += '\n';
         exportText += 'Hero Group 3\n';
         for (var i = 0; i < heroGroup3.length; i++) {
           exportText += 'G3 ' + heroGroup3[i] + '\n';
         }
       } else if (draftPoolGroups === '4' && heroGroup1.length > 0 && heroGroup2.length > 0) {
         var totalHeroes = heroGroup1.length + heroGroup2.length;
         exportText += 'HERO POOL (' + totalHeroes + ' heroes)\n';
         exportText += '-'.repeat(30) + '\n';
         exportText += 'Hero Group 1\n';
         for (var i = 0; i < heroGroup1.length; i++) {
           exportText += 'G1 ' + heroGroup1[i] + '\n';
         }
         exportText += '\n';
         exportText += 'Hero Group 2\n';
         for (var i = 0; i < heroGroup2.length; i++) {
           exportText += 'G2 ' + heroGroup2[i] + '\n';
         }
       }
       exportText += '\n';
       
       // Fix aspect pool export for 4-group mode
       // Add 6-group mode
       if (draftPoolGroups === '6' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && traitsGroup3.length > 0) {
         var totalTraits = traitsGroup1.length + traitsGroup2.length + traitsGroup3.length;
         exportText += 'TRAITS POOL (' + totalTraits + ' traits)\n';
         exportText += '-'.repeat(30) + '\n';
         
         // Traits Group 1
         exportText += 'Traits Group 1 (' + traitsGroup1.length + ' traits)\n';
         for (var i = 0; i < traitsGroup1.length; i++) {
           exportText += 'G4 ' + traitsGroup1[i] + '\n';
         }
         exportText += '\n';
         
         // Traits Group 2
         exportText += 'Traits Group 2 (' + traitsGroup2.length + ' traits)\n';
         for (var i = 0; i < traitsGroup2.length; i++) {
           exportText += 'G5 ' + traitsGroup2[i] + '\n';
         }
         exportText += '\n';
         
         // Traits Group 3
         exportText += 'Traits Group 3 (' + traitsGroup3.length + ' traits)\n';
         for (var i = 0; i < traitsGroup3.length; i++) {
           exportText += 'G6 ' + traitsGroup3[i] + '\n';
         }
       } else if (draftPoolGroups === '4' && traitsGroup1.length > 0 && traitsGroup2.length > 0) {
         var totalTraits = traitsGroup1.length + traitsGroup2.length;
         exportText += 'TRAITS POOL (' + totalTraits + ' traits)\n';
         exportText += '-'.repeat(30) + '\n';
         
         // Traits Group 1
         exportText += 'Traits Group 1 (' + traitsGroup1.length + ' traits)\n';
         for (var i = 0; i < traitsGroup1.length; i++) {
           exportText += 'G3 ' + traitsGroup1[i] + '\n';
         }
         exportText += '\n';
         
         // Traits Group 2
         exportText += 'Traits Group 2 (' + traitsGroup2.length + ' traits)\n';
         for (var i = 0; i < traitsGroup2.length; i++) {
           exportText += 'G4 ' + traitsGroup2[i] + '\n';
         }
       }
       exportText += '\n';
       
       exportText += 'KOUPLE DRAFT ORDER\n';
       exportText += '-'.repeat(30) + '\n';
       for (var i = 0; i < teamCards.length; i++) {
         var teamText = teamCards[i].textContent;
         var teamName = teamText.split('. ')[1];
         exportText += teamName + '\n';
       }
       exportText += '\n';
       
       exportText += 'DRAFT BOT PRIORITY (Heroes in Pool)\n';
       exportText += '-'.repeat(30) + '\n';
       for (var i = 0; i < draftBotCards.length; i++) {
         var heroName = draftBotCards[i].textContent;
         var heroGroup = getHeroGroup(heroName);
         var groupPrefix = heroGroup > 0 ? 'G' + heroGroup + ' ' : 'G1 ';
         exportText += groupPrefix + heroName + '\n';
       }
       exportText += '\n';
       
       exportText += 'DRAFT BOT PRIORITY (Traits)\n';
       exportText += '-'.repeat(30) + '\n';
       for (var i = 0; i < traitsPriorityList.length; i++) {
         var aspectName = traitsPriorityList[i];
         var aspectGroup = getAspectGroup(aspectName);
         // Dynamic aspect group numbering
         // Add 6-group mode support for aspect group numbering
         var aspectOffset = draftPoolGroups === '6' ? 3 : 2;
         var fallbackGroup = draftPoolGroups === '6' ? 'G4 ' : 'G3 ';
         var groupPrefix = aspectGroup > 0 ? 'G' + (aspectGroup + aspectOffset) + ' ' : fallbackGroup;
         // Extract character name for cleaner export display
         var characterMatch = aspectName.match(/^\(([^)]+)\)/);
         var displayName = characterMatch ? characterMatch[1] : aspectName;
         exportText += groupPrefix + displayName + '\n';
       }
       exportText += '\n';
       
       if (excludedCards.length > 0) {
         exportText += 'EXCLUDED HEROES (' + excludedCards.length + ' heroes)\n';
         exportText += '-'.repeat(30) + '\n';
         for (var i = 0; i < excludedCards.length; i++) {
           exportText += excludedCards[i].textContent + '\n';
         }
         exportText += '\n';
       }

       // Season 5.0: Excluded aspects section removed (all aspects always available in pair mode)

       exportText += '='.repeat(50) + '\n';
       exportText += 'Generated with Draft-o-matic ' + TOOL_VERSION + '\n';
       exportText += 'MODOK League Season 4.5\n';
       exportText += '='.repeat(50);
       
       var blob = new Blob([exportText], { type: 'text/plain' });
       var url = window.URL.createObjectURL(blob);
       var a = document.createElement('a');
       a.style.display = 'none';
       a.href = url;
       a.download = 'MODOK_S4_Draft_Pool_' + new Date().toISOString().split('T')[0] + '.txt';
       document.body.appendChild(a);
       a.click();
       window.URL.revokeObjectURL(url);
       document.body.removeChild(a);
     }, null, [], 'exportDraftPool');
   }

   // Draft simulator functions
   function startDraftSimulator() {
     return safeExecute(function() {
       // Season 5.0: Set max rounds based on draft mode
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       if (draftPoolGroups === '6') {
         maxRounds = 6;  // Legacy 6-group mode
       } else {
         maxRounds = 4;  // Season 5.0: 4 rounds (hero pair, aspect pair, hero pair, aspect pair)
       }
       
       // Get custom team names to determine user team
       var customTeamList = document.getElementById('teamListInput').value.trim();
       var customTeams = customTeamList ? customTeamList.split('\n').map(function(name) {
         return name.trim();
       }).filter(function(name) {
         return name.length > 0;
       }) : [];
       var userTeamName = customTeams.length > 0 ? customTeams[0] : '';
       
       var heroCards = document.getElementById('resultPool').children;
       var aspectCards = document.getElementById('resultTraitsPool').querySelectorAll('.hero-card');
       var teamCards = document.getElementById('resultDraftOrder').children;
       
       var playerTeam = userTeamName;
       if (!playerTeam) {
         var aTeamPool = ['Aaron Davis', 'Abigail Brand', 'Adrian Toomes', 'Amora', 'Arnim Zola'];
         
         for (var i = 0; i < teamCards.length; i++) {
           var teamText = teamCards[i].textContent;
           var teamName = teamText.split('. ')[1];
           
           if (aTeamPool.includes(teamName)) {
             playerTeam = teamName;
             break;
           }
         }
         
         if (!playerTeam && teamCards.length > 0) {
           var firstTeamText = teamCards[0].textContent;
           playerTeam = firstTeamText.split('. ')[1];
         }
       }
       
       // Season 5.0: Initialize pair arrays for drafting
       var draftPoolGroups = document.getElementById('draftPoolGroups').value;
       if (draftPoolGroups === '6') {
         // Legacy 6-group mode uses individuals
         allHeroes = [];
         draftedHeroes = [];
         draftedTraits = [];
         allHeroes = heroGroup1.concat(heroGroup2).concat(heroGroup3);

         // Fix Spider-Woman variant issue: replace Spider-Woman with variant if it exists
         var spiderWomanVariant = null;
         for (var i = 0; i < allHeroes.length; i++) {
           if (allHeroes[i].startsWith('Spider-Woman - ')) {
             spiderWomanVariant = allHeroes[i];
             break;
           }
         }
         if (spiderWomanVariant) {
           var spiderWomanIndex = allHeroes.indexOf('Spider-Woman');
           if (spiderWomanIndex !== -1) {
             allHeroes[spiderWomanIndex] = spiderWomanVariant;
           }
         }
       } else if (draftPoolGroups === '4') {
         // Season 5.0: Use pairs instead of individuals
         allHeroPairsAvailable = heroPairGroup1.concat(heroPairGroup2);
         allAspectPairsAvailable = aspectPairGroup1.concat(aspectPairGroup2);
         draftedHeroPairs = [];
         draftedAspectPairs = [];
       }
      
      playerTeamName = playerTeam;
       draftOrderTeams = [];
       teamPicks = {};
       teamGroupsUsed = {};
       for (var i = 0; i < teamCards.length; i++) {
         var teamText = teamCards[i].textContent;
         var teamName = teamText.split('. ')[1];
         draftOrderTeams.push(teamName);
         teamPicks[teamName] = [];
         teamGroupsUsed[teamName] = {
           heroPairGroups: [],
           aspectPairGroups: []
         };
       }

       currentTurnIndex = 0;
       currentRound = 1;
       isPlayerTurn = (draftOrderTeams[currentTurnIndex] === playerTeamName);
       
       // Initialize displays
       updateAllTeamsDisplay();
       updateAvailableItemsDisplay();
       updateBotPriorityDisplay();
       updateBotTraitsPriorityDisplay();
       
       // Update the display elements
       var playerDisplay = document.getElementById('playerTeamDisplay');
       var heroDisplay = document.getElementById('heroCountDisplay');
       var traitsDisplay = document.getElementById('traitsCountDisplay');
       var teamDisplay = document.getElementById('teamCountDisplay');

       if (playerDisplay) playerDisplay.textContent = playerTeam || 'Unknown Kouple';
       if (draftPoolGroups === '4') {
         // Season 5.0: Show pair counts
         if (heroDisplay) heroDisplay.textContent = allHeroPairsAvailable.length + ' pairs';
         if (traitsDisplay) traitsDisplay.textContent = allAspectPairsAvailable.length + ' pairs';
       } else {
         // Legacy: Show individual counts
         if (heroDisplay) heroDisplay.textContent = allHeroes.length;
         if (traitsDisplay) traitsDisplay.textContent = allTraits.length;
       }
       if (teamDisplay) teamDisplay.textContent = teamCards.length;
       
       // Show team draft order
       var draftDisplay = document.getElementById('draftOrderDisplay');
       if (draftDisplay) {
         var draftOrderHtml = '';
         for (var i = 0; i < teamCards.length; i++) {
           var teamText = teamCards[i].textContent;
           var teamName = teamText.split('. ')[1];
           var isPlayerTeam = (teamName === playerTeam);
           
           draftOrderHtml += '<div style="padding: 8px; background: ' + (isPlayerTeam ? 'rgba(255, 107, 107, 0.2)' : 'rgba(255,255,255,0.3)') + '; border-radius: 6px; text-align: center; font-weight: ' + (isPlayerTeam ? 'bold' : 'normal') + '; border: ' + (isPlayerTeam ? '2px solid #ff6b6b' : '1px solid #ddd') + ';">' + teamText + '</div>';
         }
         draftDisplay.innerHTML = draftOrderHtml;
       }
       
       // Show draft simulator
       var draftSimulatorElement = document.getElementById('draftSimulator');
       if (draftSimulatorElement) {
         draftSimulatorElement.style.display = 'block';
         draftSimulatorElement.scrollIntoView({ behavior: 'smooth' });
       }
       
       // Start the draft
       updateDraftStatus();
       updateAvailableItemsDisplay();
       updateBotPriorityDisplay();
       updateBotTraitsPriorityDisplay();
       
       // If the first turn is a bot turn, start the bot picking process
       if (!isPlayerTurn) {
         setTimeout(processNextTurn, 1250);
       }
     }, null, [], 'startDraftSimulator');
   }

   // Update draft status message
   function updateDraftStatus() {
     var draftStatus = document.getElementById('draftStatus');
     if (!draftStatus) return;
     
     // Check if draft is complete
     if (currentRound > maxRounds || currentTurnIndex < 0) {
       draftStatus.innerHTML = '<p style="color: #28a745; font-size: 1.2rem; font-weight: bold;">🎉 Draft Complete!</p>';
       return;
     }
     
     var currentTeam = draftOrderTeams[currentTurnIndex];
     
     if (isPlayerTurn) {
       var playerText = '🎯 Your Turn (Round ' + currentRound + ' of ' + maxRounds + ') - Choose wisely!';
       var constraintText = getConstraintMessage(playerTeamName);
       draftStatus.innerHTML = '<p style="color: #2c2c54; font-size: 1.2rem; font-weight: bold;">' + playerText + '</p>' +
         (constraintText ? '<p style="color: #666; font-size: 0.9rem; margin-top: 8px;">' + constraintText + '</p>' : '');
     } else {
       var botText = '⏳ ' + currentTeam + ' is picking (Round ' + currentRound + ' of ' + maxRounds + ')...';
       draftStatus.innerHTML = '<p style="color: #8A2BE2; font-size: 1.2rem; font-weight: bold;">' + botText + '</p>';
     }
   }

   // Update all teams picks display
   function updateAllTeamsDisplay() {
     var allTeamsDisplay = document.getElementById('allTeamsDisplay');
     if (!allTeamsDisplay) return;
     
     var teamsHtml = '';
     for (var i = 0; i < draftOrderTeams.length; i++) {
       var teamName = draftOrderTeams[i];
       var isPlayer = (teamName === playerTeamName);
       var isDraftComplete = (currentRound > maxRounds || currentTurnIndex < 0);
       var isCurrentTurn = !isDraftComplete && (i === currentTurnIndex);
       var picks = teamPicks[teamName] || [];
       
       var bgColor = isPlayer ? 'rgba(255, 140, 0, 0.2)' : 'rgba(255,255,255,0.3)';
       var borderColor = isPlayer ? '#ff8c00' : (isCurrentTurn ? '#8A2BE2' : '#ddd');
       var borderWidth = isCurrentTurn ? '3px' : '2px';
       
       var roundText = isCurrentTurn ? ' (Round ' + currentRound + ')' : '';
       var currentTurnText = isCurrentTurn ? '← Current Turn' + roundText : '';
       
       teamsHtml += '<div style="margin-bottom: 15px; padding: 15px; background: ' + bgColor + '; border-radius: 8px; border: ' + borderWidth + ' solid ' + borderColor + ';">';
       teamsHtml += '<h5 style="margin-bottom: 10px; color: #2c2c54; font-weight: 600;">';
       teamsHtml += (i + 1) + '. ' + teamName + ' ' + (isPlayer ? '(You)' : '') + ' ' + currentTurnText;
       teamsHtml += '</h5>';
       teamsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 6px;">';
       
       if (picks.length > 0) {
         for (var j = 0; j < picks.length; j++) {
           var pick = picks[j];

           // Season 5.0: Check if pick is a pair object
           if (pick && typeof pick === 'object' && pick.displayName) {
             var isPairObject = true;
             var isHeroPair = pick.hero1 !== undefined;
             var isAspectPair = pick.aspect1 !== undefined;

             if (isHeroPair) {
               var heroCardStyle = isPlayer ?
                 'border: 2px solid #ff8c00; background: linear-gradient(145deg, #fff8dc, #ffeaa7);' :
                 'border: 1px solid #808080; background: linear-gradient(145deg, #f8f8f8, #e8e8e8);';
               teamsHtml += '<div class="hero-card" style="' + heroCardStyle + ' font-size: 0.85rem; padding: 10px 14px;">' + pick.displayName + '</div>';
             } else if (isAspectPair) {
               var pairStyle = getAspectPairStyle(pick);
               var borderStyle = isPlayer ? 'border: 2px solid #ff8c00;' : 'border: 1px solid #808080;';
               var aspectPairStyle = borderStyle + ' background: ' + pairStyle + '; color: white;';
               teamsHtml += '<div class="hero-card" style="' + aspectPairStyle + ' font-size: 0.85rem; padding: 10px 14px;">' + pick.displayName + '</div>';
             }
           } else {
             // Legacy mode: individual hero/trait picks
             var pickName = pick;
             var isHero = allHeroes.includes(pickName);

             if (isHero) {
               var heroCardStyle = isPlayer ?
                 'border: 2px solid #ff8c00; background: linear-gradient(145deg, #fff8dc, #ffeaa7);' :
                 'border: 1px solid #808080; background: linear-gradient(145deg, #f8f8f8, #e8e8e8);';
               teamsHtml += '<div class="hero-card" style="' + heroCardStyle + ' font-size: 0.85rem;">' + pickName + '</div>';
             } else {
               var aspectType = getAspectType(pickName);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';

               var borderStyle = isPlayer ? '2px solid #ff8c00' : '1px solid #808080';
               teamsHtml += '<div class="hero-card" style="' + traitStyle + ' border: ' + borderStyle + '; font-size: 0.85rem;">' + pickName + '</div>';
             }
           }
         }
       } else {
         teamsHtml += '<p style="color: #666; font-style: italic; font-size: 0.9rem;">No picks yet</p>';
       }
       
       teamsHtml += '</div></div>';
     }
     
     allTeamsDisplay.innerHTML = teamsHtml;
   }

   // Season 5.0: Update available pairs display
   function updateAvailablePairsDisplay() {
     var container = document.getElementById('availableItemsDisplay');
     if (!container) return;

     var html = '';
     var currentTeam = draftOrderTeams[currentTurnIndex];

     // Determine what to show based on whose turn it is
     if (isPlayerTurn) {
       // User turn: Show ALL pair types (both hero and aspect pairs)
       // User can choose freely subject to group constraints
       html += '<h3 style="margin-bottom: 20px; color: #2c2c54;">Choose Your Pick:</h3>';

       // Hero Pairs
       html += generateHeroPairGroupHTML(currentTeam, 1);
       html += generateHeroPairGroupHTML(currentTeam, 2);

       // Aspect Pairs
       html += generateAspectPairGroupHTML(currentTeam, 1);
       html += generateAspectPairGroupHTML(currentTeam, 2);

     } else {
       // Bot turn: Show only the preferred type for this round
       var roundType = getCurrentRoundType();

       if (roundType === 'heroPair') {
         html += generateHeroPairGroupHTML(currentTeam, 1);
         html += generateHeroPairGroupHTML(currentTeam, 2);
       } else {
         html += generateAspectPairGroupHTML(currentTeam, 1);
         html += generateAspectPairGroupHTML(currentTeam, 2);
       }
     }

     container.innerHTML = html;
   }

   // Helper: Generate HTML for a hero pair group
   function generateHeroPairGroupHTML(teamName, groupNumber) {
     var group = groupNumber === 1 ? heroPairGroup1 : heroPairGroup2;
     var groupsUsed = teamGroupsUsed[teamName] || { heroPairGroups: [], aspectPairGroups: [] };
     var groupUsed = groupsUsed.heroPairGroups.includes(groupNumber);

     var html = '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); margin-bottom: 20px;">';
     html += '<h4 style="margin-bottom: 10px;">Hero Pair Group ' + groupNumber + '</h4>';

     if (groupUsed) {
       html += '<p style="color: #28a745; font-size: 0.85rem; margin-bottom: 8px; font-weight: 600;">✓ Already picked from this group</p>';
     }

     html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';

     for (var i = 0; i < group.length; i++) {
       var pair = group[i];
       var isDrafted = draftedHeroPairs.some(function(p) { return p.displayName === pair.displayName; });
       var canDraft = isPlayerTurn && !isDrafted && canTeamDraft(teamName, 'heroPair', groupNumber);

       var style = isDrafted ?
         'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed; padding: 12px 16px;' :
         (canDraft ? 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); cursor: pointer; padding: 12px 16px;' :
           'border: 2px solid #ddd; background: linear-gradient(145deg, #f8f8f8, #f0f0f0); color: #666; cursor: not-allowed; padding: 12px 16px;');

       var onclick = canDraft ? 'onclick="draftPair(' + i + ', ' + groupNumber + ', \'heroPair\')"' : '';
       var title = !canDraft && !isDrafted && groupUsed ? 'title="Already picked from this group"' : '';

       html += '<div class="hero-card" style="' + style + '" ' + onclick + ' ' + title + '>' + pair.displayName + '</div>';
     }

     html += '</div></div>';
     return html;
   }

   // Helper: Generate HTML for an aspect pair group
   function generateAspectPairGroupHTML(teamName, groupNumber) {
     var group = groupNumber === 1 ? aspectPairGroup1 : aspectPairGroup2;
     var groupsUsed = teamGroupsUsed[teamName] || { heroPairGroups: [], aspectPairGroups: [] };
     var groupUsed = groupsUsed.aspectPairGroups.includes(groupNumber);

     var html = '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); margin-bottom: 20px;">';
     html += '<h4 style="margin-bottom: 10px;">Aspect Pair Group ' + groupNumber + '</h4>';

     if (groupUsed) {
       html += '<p style="color: #28a745; font-size: 0.85rem; margin-bottom: 8px; font-weight: 600;">✓ Already picked from this group</p>';
     }

     html += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';

     for (var i = 0; i < group.length; i++) {
       var pair = group[i];
       var isDrafted = draftedAspectPairs.some(function(p) { return p.displayName === pair.displayName; });
       var canDraft = isPlayerTurn && !isDrafted && canTeamDraft(teamName, 'aspectPair', groupNumber);

       var pairStyle = getAspectPairStyle(pair);
       var style = isDrafted ?
         'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed; padding: 12px 16px;' :
         (canDraft ? 'border: 2px solid #90EE90; background: ' + pairStyle + '; color: white; cursor: pointer; padding: 12px 16px;' :
           'border: 2px solid #ddd; background: ' + pairStyle + '; color: white; cursor: not-allowed; padding: 12px 16px; opacity: 0.6;');

       var onclick = canDraft ? 'onclick="draftPair(' + i + ', ' + groupNumber + ', \'aspectPair\')"' : '';
       var title = !canDraft && !isDrafted && groupUsed ? 'title="Already picked from this group"' : '';

       html += '<div class="hero-card" style="' + style + '" ' + onclick + ' ' + title + '>' + pair.displayName + '</div>';
     }

     html += '</div></div>';
     return html;
   }

   // Update available items display
   function updateAvailableItemsDisplay() {
      return safeExecute(function() {
       // Season 5.0: Use new pair display for 4-group mode
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       if (draftPoolGroups === '4') {
         updateAvailablePairsDisplay();
         return;
       }

       // Legacy 6-group mode display
       var availableHeroesDisplay = document.getElementById('availableHeroesDisplay');
       var availableTraitsDisplay = document.getElementById('availableTraitsDisplay');
        
       if (availableHeroesDisplay) {
         var canDraftHero = isPlayerTurn ? canTeamDraft(playerTeamName, 'hero') : true;
         var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
         
         if (allHeroes.length > 0) {
           var heroesHtml = '';
           
           // Show heroes in groups when in 4-group mode
                if (draftPoolGroups === '6' && heroGroup1.length > 0 && heroGroup2.length > 0 && heroGroup3.length > 0) {
             // Hero Group 1
             heroesHtml += '<div style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             heroesHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Hero Group 1</h4>';
             heroesHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < heroGroup1.length; i++) {
               var heroName = heroGroup1[i];
               var isDrafted = draftedHeroes.includes(heroName);
               var groupAvailable = canTeamDraftFromGroup(playerTeamName, 1);
               var isClickable = canDraftHero && isPlayerTurn && !isDrafted && groupAvailable;
               
               var style;
               if (isDrafted) {
                 style = 'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 style = 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); cursor: pointer;';
               } else {
                 style = 'border: 2px solid #ddd; background: linear-gradient(145deg, #f8f8f8, #f0f0f0); color: #666; cursor: not-allowed;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + heroName.replace(/'/g, "\\'") + '\')"' : '';
               heroesHtml += '<div class="hero-card" data-item="' + heroName + '" style="' + style + '" ' + onclick + '>' + heroName + '</div>';
             }
             
             heroesHtml += '</div></div>';
             
             // Hero Group 2
             heroesHtml += '<div style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             heroesHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Hero Group 2</h4>';
             heroesHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < heroGroup2.length; i++) {
               var heroName = heroGroup2[i];
               var isDrafted = draftedHeroes.includes(heroName);
               var groupAvailable = canTeamDraftFromGroup(playerTeamName, 2);
               var isClickable = canDraftHero && isPlayerTurn && !isDrafted && groupAvailable;
               
               var style;
               if (isDrafted) {
                 style = 'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 style = 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); cursor: pointer;';
               } else {
                 style = 'border: 2px solid #ddd; background: linear-gradient(145deg, #f8f8f8, #f0f0f0); color: #666; cursor: not-allowed;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + heroName.replace(/'/g, "\\'") + '\')"' : '';
               heroesHtml += '<div class="hero-card" data-item="' + heroName + '" style="' + style + '" ' + onclick + '>' + heroName + '</div>';
             }
             
             heroesHtml += '</div></div>';
             
             // Hero Group 3
             heroesHtml += '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             heroesHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Hero Group 3</h4>';
             heroesHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < heroGroup3.length; i++) {
               var heroName = heroGroup3[i];
               var isDrafted = draftedHeroes.includes(heroName);
               var groupAvailable = canTeamDraftFromGroup(playerTeamName, 3);
               var isClickable = canDraftHero && isPlayerTurn && !isDrafted && groupAvailable;
               
               var style;
               if (isDrafted) {
                 style = 'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 style = 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); cursor: pointer;';
               } else {
                 style = 'border: 2px solid #ddd; background: linear-gradient(145deg, #f8f8f8, #f0f0f0); color: #666; cursor: not-allowed;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + heroName.replace(/'/g, "\\'") + '\')"' : '';
               heroesHtml += '<div class="hero-card" data-item="' + heroName + '" style="' + style + '" ' + onclick + '>' + heroName + '</div>';
             }
             
             heroesHtml += '</div></div>';
             
           } else if (draftPoolGroups === '4' && heroGroup1.length > 0 && heroGroup2.length > 0) {
             // Hero Group 1
             heroesHtml += '<div style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             heroesHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Hero Group 1</h4>';
             heroesHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < heroGroup1.length; i++) {
               var heroName = heroGroup1[i];
               var isDrafted = draftedHeroes.includes(heroName);
               var groupAvailable = canTeamDraftFromGroup(playerTeamName, 1);
               var isClickable = canDraftHero && isPlayerTurn && !isDrafted && groupAvailable;
               
               var style;
               if (isDrafted) {
                 style = 'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 style = 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); cursor: pointer;';
               } else {
                 style = 'border: 2px solid #ddd; background: linear-gradient(145deg, #f8f8f8, #f0f0f0); color: #666; cursor: not-allowed;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + heroName.replace(/'/g, "\\'") + '\')"' : '';
               heroesHtml += '<div class="hero-card" data-item="' + heroName + '" style="' + style + '" ' + onclick + '>' + heroName + '</div>';
             }
             
             heroesHtml += '</div></div>';
             
             // Hero Group 2
             heroesHtml += '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             heroesHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Hero Group 2</h4>';
             heroesHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < heroGroup2.length; i++) {
               var heroName = heroGroup2[i];
               var isDrafted = draftedHeroes.includes(heroName);
               var groupAvailable = canTeamDraftFromGroup(playerTeamName, 2);
               var isClickable = canDraftHero && isPlayerTurn && !isDrafted && groupAvailable;
               
               var style;
               if (isDrafted) {
                 style = 'border: 2px solid #ccc; background: #f0f0f0; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 style = 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); cursor: pointer;';
               } else {
                 style = 'border: 2px solid #ddd; background: linear-gradient(145deg, #f8f8f8, #f0f0f0); color: #666; cursor: not-allowed;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + heroName.replace(/'/g, "\\'") + '\')"' : '';
               heroesHtml += '<div class="hero-card" data-item="' + heroName + '" style="' + style + '" ' + onclick + '>' + heroName + '</div>';
             }
             
             heroesHtml += '</div></div>';
             
           }
           
           availableHeroesDisplay.innerHTML = heroesHtml;
         } else {
           availableHeroesDisplay.innerHTML = '<p style="color: #666; text-align: center;">No heroes available</p>';
         }
       }
       
       if (availableTraitsDisplay) {
         var canDraftAspect = isPlayerTurn ? canTeamDraft(playerTeamName, 'aspect') : true;
         var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
         
         if (allTraits.length > 0) {
           var aspectsHtml = '';
           
           // Show aspects in groups when in 4-group mode
           // Add 6-group mode support for 3 aspect groups
           if (draftPoolGroups === '6' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && traitsGroup3.length > 0) {
             // Get selectable aspects for each group
             var selectableGroup1 = getSelectableAspectsInGroup(1);
             var selectableGroup2 = getSelectableAspectsInGroup(2);
             var selectableGroup3 = getSelectableAspectsInGroup(3);
             
             // Traits Group 1
             aspectsHtml += '<div style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             aspectsHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Traits Group 1</h4>';
             aspectsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < traitsGroup1.length; i++) {
               var aspectName = traitsGroup1[i];
               var isDrafted = draftedTraits.includes(aspectName);
               var groupAvailable = canTeamDraftFromAspectGroup(playerTeamName, 1);
               var isSelectable = selectableGroup1.includes(aspectName);
               var isClickable = canDraftAspect && isPlayerTurn && !isDrafted && groupAvailable && isSelectable;
               
               var aspectType = getAspectType(aspectName);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               
               if (isDrafted) {
                 traitStyle = 'background: #f0f0f0; border: 2px solid #ccc; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 traitStyle += ' cursor: pointer; border-width: 2px; border-style: solid;';
               } else {
                 traitStyle += ' opacity: 0.7; cursor: not-allowed; border-width: 2px; border-style: solid;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + aspectName.replace(/'/g, "\\'") + '\')"' : '';
               var checkmark = '';
               
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspectName);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               
               aspectsHtml += '<div class="hero-card trait-card-multiline" data-item="' + aspectName + '" style="' + traitStyle + '" ' + onclick + '>' + multiLineContent + '</div>';
             }
             
             aspectsHtml += '</div></div>';
             
             // Traits Group 2
             aspectsHtml += '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             aspectsHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Traits Group 2</h4>';
             aspectsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < traitsGroup2.length; i++) {
               var aspectName = traitsGroup2[i];
               var isDrafted = draftedTraits.includes(aspectName);
               var groupAvailable = canTeamDraftFromAspectGroup(playerTeamName, 2);
               var isSelectable = selectableGroup2.includes(aspectName);
               var isClickable = canDraftAspect && isPlayerTurn && !isDrafted && groupAvailable && isSelectable;
               
               var aspectType = getAspectType(aspectName);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               
               if (isDrafted) {
                 traitStyle = 'background: #f0f0f0; border: 2px solid #ccc; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 traitStyle += ' cursor: pointer; border-width: 2px; border-style: solid;';
               } else {
                 traitStyle += ' opacity: 0.7; cursor: not-allowed; border-width: 2px; border-style: solid;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + aspectName.replace(/'/g, "\\'") + '\')"' : '';
               var checkmark = '';
               
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspectName);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               
               aspectsHtml += '<div class="hero-card trait-card-multiline" data-item="' + aspectName + '" style="' + traitStyle + '" ' + onclick + '>' + multiLineContent + '</div>';
             }
             
             aspectsHtml += '</div></div>';
             
             // Traits Group 3
             aspectsHtml += '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             aspectsHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Traits Group 3</h4>';
             aspectsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < traitsGroup3.length; i++) {
               var aspectName = traitsGroup3[i];
               var isDrafted = draftedTraits.includes(aspectName);
               var groupAvailable = canTeamDraftFromAspectGroup(playerTeamName, 3);
               var isSelectable = selectableGroup3.includes(aspectName);
               var isClickable = canDraftAspect && isPlayerTurn && !isDrafted && groupAvailable && isSelectable;
               
               var aspectType = getAspectType(aspectName);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               
               if (isDrafted) {
                 traitStyle = 'background: #f0f0f0; border: 2px solid #ccc; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 traitStyle += ' cursor: pointer; border-width: 2px; border-style: solid;';
               } else {
                 traitStyle += ' opacity: 0.7; cursor: not-allowed; border-width: 2px; border-style: solid;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + aspectName.replace(/'/g, "\\'") + '\')"' : '';
               var checkmark = '';
               
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspectName);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               
               aspectsHtml += '<div class="hero-card trait-card-multiline" data-item="' + aspectName + '" style="' + traitStyle + '" ' + onclick + '>' + multiLineContent + '</div>';
             }
             
             aspectsHtml += '</div></div>';
             
           } else if (draftPoolGroups === '4' && traitsGroup1.length > 0 && traitsGroup2.length > 0) {
             // Get selectable aspects for each group
             var selectableGroup1 = getSelectableAspectsInGroup(1);
             var selectableGroup2 = getSelectableAspectsInGroup(2);
             
             // Traits Group 1
             aspectsHtml += '<div style="margin-bottom: 25px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             aspectsHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Traits Group 1</h4>';
             aspectsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < traitsGroup1.length; i++) {
               var aspectName = traitsGroup1[i];
               var isDrafted = draftedTraits.includes(aspectName);
               var groupAvailable = canTeamDraftFromAspectGroup(playerTeamName, 1);
               var isSelectable = selectableGroup1.includes(aspectName);
               var isClickable = canDraftAspect && isPlayerTurn && !isDrafted && groupAvailable && isSelectable;
               
               var aspectType = getAspectType(aspectName);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               
               if (isDrafted) {
                 traitStyle = 'background: #f0f0f0; border: 2px solid #ccc; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 traitStyle += ' cursor: pointer; border-width: 2px; border-style: solid;';
               } else {
                 traitStyle += ' opacity: 0.7; cursor: not-allowed; border-width: 2px; border-style: solid;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + aspectName.replace(/'/g, "\\'") + '\')"' : '';
               var checkmark = '';
               
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspectName);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               
               aspectsHtml += '<div class="hero-card trait-card-multiline" data-item="' + aspectName + '" style="' + traitStyle + '" ' + onclick + '>' + multiLineContent + '</div>';
             }
             
             aspectsHtml += '</div></div>';
             
             // Traits Group 2
             aspectsHtml += '<div style="padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">';
             aspectsHtml += '<h4 style="margin-bottom: 15px; font-size: 1.1rem; font-weight: 600; color: #2c2c54;">Traits Group 2</h4>';
             aspectsHtml += '<div style="display: flex; flex-wrap: wrap; gap: 8px;">';
             
             for (var i = 0; i < traitsGroup2.length; i++) {
               var aspectName = traitsGroup2[i];
               var isDrafted = draftedTraits.includes(aspectName);
               var groupAvailable = canTeamDraftFromAspectGroup(playerTeamName, 2);
               var isSelectable = selectableGroup2.includes(aspectName);
               var isClickable = canDraftAspect && isPlayerTurn && !isDrafted && groupAvailable && isSelectable;
               
               var aspectType = getAspectType(aspectName);
               var traitStyle = '';
               // All traits use consistent blue styling
               traitStyle = 'background: linear-gradient(145deg, #e8f4fd, #b8e6ff); border-color: #48dbfb; color: #0984e3;';
               
               if (isDrafted) {
                 traitStyle = 'background: #f0f0f0; border: 2px solid #ccc; color: #888; opacity: 0.6; cursor: not-allowed;';
               } else if (isClickable) {
                 traitStyle += ' cursor: pointer; border-width: 2px; border-style: solid;';
               } else {
                 traitStyle += ' opacity: 0.7; cursor: not-allowed; border-width: 2px; border-style: solid;';
               }
               
               var onclick = isClickable ? 'onclick="draftItem(\'' + aspectName.replace(/'/g, "\\'") + '\')"' : '';
               var checkmark = '';
               
               // Parse trait into 3 components for multi-line display
               var traitParts = parseTraitForDisplay(aspectName);
               var multiLineContent = 
                 '<div class="trait-line trait-character">' + traitParts.character + '</div>' +
                 '<div class="trait-line trait-hero">' + traitParts.hero + '</div>' +
                 '<div class="trait-line trait-ae">' + traitParts.alterEgo + '</div>';
               
               aspectsHtml += '<div class="hero-card trait-card-multiline" data-item="' + aspectName + '" style="' + traitStyle + '" ' + onclick + '>' + multiLineContent + '</div>';
             }
             
             aspectsHtml += '</div></div>';
             
           }
           
           availableTraitsDisplay.innerHTML = aspectsHtml;
         } else {
           availableTraitsDisplay.innerHTML = '<p style="color: #666; text-align: center;">No traits available</p>';
         }
       }
     }, null, [], 'updateAvailableItemsDisplay');
   }

  // Update bot priority display
  // Season 5.0: Show ALL hero pairs in priority order, grey out drafted ones
  function updateBotPriorityDisplay() {
    var botPriorityDisplay = document.getElementById('botPriorityDisplay');
    if (!botPriorityDisplay) return;

    // Show all hero pairs from priority list
    var botHtml = '';
    for (var i = 0; i < heroPairPriorityList.length; i++) {
      var pair = heroPairPriorityList[i];
      var displayName = pair.displayName;

      // Check if this pair has been drafted (check draftedHeroPairs, not draftedHeroes)
      var isDrafted = draftedHeroPairs.some(function(draftedPair) {
        return draftedPair.hero1 === pair.hero1 || draftedPair.hero1 === pair.hero2 ||
               draftedPair.hero2 === pair.hero1 || draftedPair.hero2 === pair.hero2;
      });

      // Style: grey out drafted pairs, light green for available pairs
      var style;
      if (isDrafted) {
        style = 'border: 2px solid #ccc; background: #e0e0e0; color: #999; font-size: 0.85rem; cursor: default; padding: 12px 16px; opacity: 0.5;';
      } else {
        // Use light green gradient matching available items in draft simulator
        style = 'border: 2px solid #90EE90; background: linear-gradient(145deg, #f0fff0, #e8f5e8); color: #2c2c54; font-size: 0.85rem; cursor: default; padding: 12px 16px;';
      }

      botHtml += '<div class="hero-card" style="' + style + '">' + displayName + '</div>';
    }
    botPriorityDisplay.innerHTML = botHtml;
  }

   // Update bot aspect priority display
   // Season 5.0: Show ALL aspect pairs in priority order, grey out drafted ones
   function updateBotTraitsPriorityDisplay() {
     var botTraitsPriorityDisplay = document.getElementById('botTraitsPriorityDisplay');
     if (!botTraitsPriorityDisplay) return;

     // Show all aspect pairs from priority list
     var aspectsHtml = '';
     for (var i = 0; i < aspectPairPriorityList.length; i++) {
       var pair = aspectPairPriorityList[i];
       var displayName = pair.displayName;

       // Check if this pair has been drafted
       var isDrafted = draftedAspectPairs.some(function(p) { return p.displayName === displayName; });

       // Style: grey out drafted pairs, use colors for available pairs
       if (isDrafted) {
         // Greyed out style
         aspectsHtml += '<div class="hero-card" style="background: #e0e0e0; color: #999; padding: 12px 16px; font-size: 0.85rem; cursor: default; opacity: 0.5;">' +
           displayName +
           '</div>';
       } else {
         // Normal colored style
         var pairStyle = getAspectPairStyle(pair);
         aspectsHtml += '<div class="hero-card" style="background: ' + pairStyle + '; color: white; padding: 12px 16px; font-size: 0.85rem; cursor: default;">' +
           displayName +
           '</div>';
       }
     }
     botTraitsPriorityDisplay.innerHTML = aspectsHtml;
   }

   // Draft item function
   // Season 5.0: Draft a pair (hero pair or aspect pair)
   function draftPair(pairIndex, groupNumber, pairType) {
     if (!isPlayerTurn) return;

     var pair;
     if (pairType === 'heroPair') {
       pair = groupNumber === 1 ? heroPairGroup1[pairIndex] : heroPairGroup2[pairIndex];
     } else if (pairType === 'aspectPair') {
       pair = groupNumber === 1 ? aspectPairGroup1[pairIndex] : aspectPairGroup2[pairIndex];
     }

     if (!pair) return;

     // Check if already drafted
     var alreadyDrafted = false;
     if (pairType === 'heroPair') {
       alreadyDrafted = draftedHeroPairs.some(function(p) { return p.displayName === pair.displayName; });
     } else {
       alreadyDrafted = draftedAspectPairs.some(function(p) { return p.displayName === pair.displayName; });
     }
     if (alreadyDrafted) return;

     // Check if team can draft this type from this group
     if (!canTeamDraft(playerTeamName, pairType, groupNumber)) return;

     // Draft the pair
     var currentTeam = draftOrderTeams[currentTurnIndex];
     teamPicks[currentTeam].push(pair);

     // Track which group was used
     if (pairType === 'heroPair') {
       draftedHeroPairs.push(pair);
       teamGroupsUsed[currentTeam].heroPairGroups.push(groupNumber);
     } else {
       draftedAspectPairs.push(pair);
       teamGroupsUsed[currentTeam].aspectPairGroups.push(groupNumber);
     }

     // Update displays
     updateAllTeamsDisplay();
     updateAvailableItemsDisplay();
     updateBotPriorityDisplay();
     updateBotTraitsPriorityDisplay();

     advanceTurn();
   }

   function draftItem(itemName) {
     if (!isPlayerTurn) return;
     
     var isHero = allHeroes.includes(itemName);
     var isAspect = allTraits.includes(itemName);
     
     var actualItemToDraft = itemName;
     
     if (isAspect) {
       var aspectType = getAspectType(itemName);
       
       // Fix aspect selection to respect clicked group
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       if ((draftPoolGroups === '4' || draftPoolGroups === '6') && traitsGroup1.length > 0 && traitsGroup2.length > 0 && (draftPoolGroups !== '6' || traitsGroup3.length > 0)) {
         // In group-restricted modes, use the exact clicked aspect (it's already been validated as selectable)
         actualItemToDraft = itemName;
       }
     }
     
     var alreadyDrafted = draftedHeroes.includes(actualItemToDraft) || draftedTraits.includes(actualItemToDraft);
     if (alreadyDrafted) return;
     
     var draftType = isHero ? 'hero' : 'aspect';
     if (!canTeamDraft(playerTeamName, draftType)) return;
     
     // Add group restriction validation
     // Add 6-group mode support
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
     if ((draftPoolGroups === '4' || draftPoolGroups === '6')) {
       if (isHero) {
         var heroGroup = getHeroGroup(actualItemToDraft);
         if (heroGroup > 0 && !canTeamDraftFromGroup(playerTeamName, heroGroup)) {
           return; // Cannot draft from this hero group
         }
       } else if (isAspect) {
         var aspectGroup = getAspectGroup(actualItemToDraft);
         if (aspectGroup > 0 && !canTeamDraftFromAspectGroup(playerTeamName, aspectGroup)) {
           return; // Cannot draft from this aspect group
         }
       }
     }
     
     var currentTeam = draftOrderTeams[currentTurnIndex];
     
     teamPicks[currentTeam].push(actualItemToDraft);
     if (isHero) {
       draftedHeroes.push(actualItemToDraft);
     } else {
       draftedTraits.push(actualItemToDraft);
     }
     
     updateAllTeamsDisplay();
     updateAvailableItemsDisplay();
     updateBotPriorityDisplay();
     updateBotTraitsPriorityDisplay();
     
     advanceTurn();
   }
   
   // Advance to next turn (snake draft format - supports 4 or 6 rounds)
   function advanceTurn() {
     
     if (currentRound === 1 || currentRound === 3 || currentRound === 5) {
       currentTurnIndex++;
       if (currentTurnIndex >= draftOrderTeams.length) {
         currentRound++;
         currentTurnIndex = draftOrderTeams.length - 1;
       }
     } else if (currentRound === 2 || currentRound === 4 || currentRound === 6) {
       currentTurnIndex--;
       if (currentTurnIndex < 0) {
         if (currentRound < maxRounds) {
           currentRound++;
           currentTurnIndex = 0;
         } else {
           currentRound = maxRounds + 1;
           updateDraftStatus();
           updateAllTeamsDisplay();
           return;
         }
       }
     }
     
     isPlayerTurn = (draftOrderTeams[currentTurnIndex] === playerTeamName);
     
     updateDraftStatus();
     updateAllTeamsDisplay();
     updateAvailableItemsDisplay();
     updateBotPriorityDisplay();
     updateBotTraitsPriorityDisplay();
     
     // Extend delay for re-pick visibility
     if (!isPlayerTurn) {
       var delay = (window.lastRePickData && window.lastRePickData.triggered) ? 2500 : 1250;
       setTimeout(processNextTurn, delay);
     }
   }
   
   // Season 5.0: Process bot turn for pair drafting
   function processBotPairPick() {
     if (isPlayerTurn) return;
     if (currentRound > maxRounds) return;

     var currentTeam = draftOrderTeams[currentTurnIndex];
     var aiPick = null;

     // Determine preferred round type based on current round
     var preferredRoundType = (currentRound === 1 || currentRound === 3) ? 'heroPair' : 'aspectPair';

     // Apply randomness - chance to ignore round preferences
     var randomChance = Math.random();
     if (randomChance < (botRandomnessPercentage / 100)) {
       // Ignore round preference - flip to opposite type
       preferredRoundType = (preferredRoundType === 'heroPair') ? 'aspectPair' : 'heroPair';
     }

     // Check what the team has already drafted
     var currentTeamPicks = teamPicks[currentTeam] || [];
     var heroPairsPicked = currentTeamPicks.filter(function(pick) {
       return pick.hero1 !== undefined; // Has hero1 property = hero pair
     }).length;
     var aspectPairsPicked = currentTeamPicks.filter(function(pick) {
       return pick.aspect1 !== undefined; // Has aspect1 property = aspect pair
     }).length;

     // Determine what we can draft (max 2 of each type)
     var canPickHeroPair = heroPairsPicked < 2;
     var canPickAspectPair = aspectPairsPicked < 2;

     // If preferred type is not available, switch to the other type
     var roundType = preferredRoundType;
     if (roundType === 'heroPair' && !canPickHeroPair) {
       roundType = 'aspectPair';
     } else if (roundType === 'aspectPair' && !canPickAspectPair) {
       roundType = 'heroPair';
     }

     if (roundType === 'heroPair') {
       // Bot selects a hero pair
       // Filter pairs that are not drafted AND from groups bot hasn't used
       var availablePairs = allHeroPairsAvailable.filter(function(pair) {
         // Check if already drafted
         var notDrafted = !draftedHeroPairs.some(function(p) { return p.displayName === pair.displayName; });

         // Determine which group this pair is from
         var groupNumber = heroPairGroup1.some(function(p) { return p.displayName === pair.displayName; }) ? 1 : 2;

         // Check if bot can draft from this group
         var canDraftFromGroup = canTeamDraft(currentTeam, 'heroPair', groupNumber);

         return notDrafted && canDraftFromGroup;
       });

       if (availablePairs.length === 0) {
         advanceTurn();
         return;
       }

       // Check for surprise pick
       var surpriseChance = Math.random();
       if (surpriseChance < (botSurprisePercentage / 100)) {
         // Random pick
         var randomIndex = Math.floor(Math.random() * availablePairs.length);
         aiPick = availablePairs[randomIndex];
       } else {
         // Strategic pick from priority list (also filter by group restrictions)
         var availablePriority = heroPairPriorityList.filter(function(pair) {
           var notDrafted = !draftedHeroPairs.some(function(p) { return p.displayName === pair.displayName; });
           var groupNumber = heroPairGroup1.some(function(p) { return p.displayName === pair.displayName; }) ? 1 : 2;
           var canDraftFromGroup = canTeamDraft(currentTeam, 'heroPair', groupNumber);
           return notDrafted && canDraftFromGroup;
         });

         if (availablePriority.length > 0) {
           aiPick = availablePriority[0]; // Pick highest priority available
         } else {
           aiPick = availablePairs[0]; // Fallback to first available
         }
       }

       if (aiPick) {
         // Determine which group this pair is from
         var groupNumber = heroPairGroup1.some(function(p) { return p.displayName === aiPick.displayName; }) ? 1 : 2;

         teamPicks[currentTeam].push(aiPick);
         draftedHeroPairs.push(aiPick);
         teamGroupsUsed[currentTeam].heroPairGroups.push(groupNumber);
       }

     } else if (roundType === 'aspectPair') {
       // Bot selects an aspect pair
       // Filter pairs that are not drafted AND from groups bot hasn't used
       var availablePairs = allAspectPairsAvailable.filter(function(pair) {
         // Check if already drafted
         var notDrafted = !draftedAspectPairs.some(function(p) { return p.displayName === pair.displayName; });

         // Determine which group this pair is from
         var groupNumber = aspectPairGroup1.some(function(p) { return p.displayName === pair.displayName; }) ? 1 : 2;

         // Check if bot can draft from this group
         var canDraftFromGroup = canTeamDraft(currentTeam, 'aspectPair', groupNumber);

         return notDrafted && canDraftFromGroup;
       });

       if (availablePairs.length === 0) {
         advanceTurn();
         return;
       }

       // Check for surprise pick
       var surpriseChance = Math.random();
       if (surpriseChance < (botSurprisePercentage / 100)) {
         // Random pick
         var randomIndex = Math.floor(Math.random() * availablePairs.length);
         aiPick = availablePairs[randomIndex];
       } else {
         // Strategic pick from priority list (also filter by group restrictions)
         var availablePriority = aspectPairPriorityList.filter(function(pair) {
           var notDrafted = !draftedAspectPairs.some(function(p) { return p.displayName === pair.displayName; });
           var groupNumber = aspectPairGroup1.some(function(p) { return p.displayName === pair.displayName; }) ? 1 : 2;
           var canDraftFromGroup = canTeamDraft(currentTeam, 'aspectPair', groupNumber);
           return notDrafted && canDraftFromGroup;
         });

         if (availablePriority.length > 0) {
           aiPick = availablePriority[0]; // Pick highest priority available
         } else {
           aiPick = availablePairs[0]; // Fallback to first available
         }
       }

       if (aiPick) {
         // Determine which group this pair is from
         var groupNumber = aspectPairGroup1.some(function(p) { return p.displayName === aiPick.displayName; }) ? 1 : 2;

         teamPicks[currentTeam].push(aiPick);
         draftedAspectPairs.push(aiPick);
         teamGroupsUsed[currentTeam].aspectPairGroups.push(groupNumber);
       }
     }

     // Update displays and advance
     updateAllTeamsDisplay();
     updateAvailableItemsDisplay();
     updateBotPriorityDisplay();
     updateBotTraitsPriorityDisplay();
     advanceTurn();
   }

   // Process AI turn with enhanced bot strategy
   function processNextTurn() {
     // Season 5.0: Use pair-based bot for 4-group mode
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
     if (draftPoolGroups === '4') {
       processBotPairPick();
       return;
     }

     // Legacy 6-group mode bot logic
     if (isPlayerTurn) return;
     if (currentRound > maxRounds) return;

     var currentTeam = draftOrderTeams[currentTurnIndex];
     var aiPick = null;
     
     // Track re-pick behavior for user feedback
     var rePickTriggered = false;
     var originalPickType = '';
     var finalPickType = '';
     
     var currentTeamPicks = teamPicks[currentTeam] || [];
     var currentHeroes = currentTeamPicks.filter(function(pick) {
       return allHeroes.includes(pick);
     });
     var currentAspects = currentTeamPicks.filter(function(pick) {
       return allTraits.includes(pick);
     });
     
      // Support H-A-H-A-H-A pattern for 6-group mode
     var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
     var preferredType;
     
     if (draftPoolGroups === '6') {
       // 6-group mode: H-T-H-T-H-T pattern (Hero in R1, R3, R5; Traits in R2, R4, R6)
       preferredType = (currentRound === 1 || currentRound === 3 || currentRound === 5) ? 'hero' : 'aspect';
     } else {
       // Original logic for 4-group mode: H-T-H-T pattern (Hero in R1, R3; Traits in R2, R4)
       preferredType = (currentRound === 1 || currentRound === 3) ? 'hero' : 'aspect';
     }
     
     // Use customizable bot randomness percentage
     var randomChance = Math.random();
     if (randomChance < (botRandomnessPercentage / 100)) {
       preferredType = (preferredType === 'hero') ? 'aspect' : 'hero';
     }
     
     // Support 3 heroes and 3 aspects in 6-group mode
     var maxHeroes = draftPoolGroups === '6' ? 3 : 2;
     var maxAspects = draftPoolGroups === '6' ? 3 : 2;
     var canPickHero = currentHeroes.length < maxHeroes;
     var canPickAspect = currentAspects.length < maxAspects;
     
     if (preferredType === 'hero' && !canPickHero) {
       preferredType = 'aspect';
     } else if (preferredType === 'aspect' && !canPickAspect) {
       preferredType = 'hero';
     }
     
     if ((preferredType === 'hero' && !canPickHero) || (preferredType === 'aspect' && !canPickAspect)) {
       advanceTurn();
       return;
     }
     
     if (preferredType === 'hero') {
       var availableHeroes = allHeroes.filter(function(hero) {
         return !draftedHeroes.includes(hero);
       });
       
       // Apply group restrictions for bots in 4-group mode
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       if (draftPoolGroups === '6' && heroGroup1.length > 0 && heroGroup2.length > 0 && heroGroup3.length > 0) {
         var currentTeamHeroes = currentHeroes;
         if (currentTeamHeroes.length > 0) {
           // Filter out heroes from already-used groups
           var usedGroups = currentTeamHeroes.map(function(hero) {
             return getHeroGroup(hero);
           });
           availableHeroes = availableHeroes.filter(function(hero) {
             return !usedGroups.includes(getHeroGroup(hero));
           });
         }
         // First hero pick can be from any group (no additional filtering needed)
       } else if (draftPoolGroups === '4' && heroGroup1.length > 0 && heroGroup2.length > 0) {
         var currentTeamHeroes = currentHeroes;
         if (currentTeamHeroes.length === 1) {
           // Second hero pick - must be from opposite group
           var firstHeroGroup = getHeroGroup(currentTeamHeroes[0]);
           var allowedGroup = firstHeroGroup === 1 ? 2 : 1;
           availableHeroes = availableHeroes.filter(function(hero) {
             return getHeroGroup(hero) === allowedGroup;
           });
         }
         // First hero pick can be from any group (no additional filtering needed)
       }
       
       if (availableHeroes.length === 0) {
         advanceTurn();
         return;
       }
       
       // Check for surprise pick first
       var surpriseChance = Math.random();
       if (surpriseChance < (botSurprisePercentage / 100)) {
         // Surprise pick: completely random from all available heroes
         var randomIndex = Math.floor(Math.random() * availableHeroes.length);
         aiPick = availableHeroes[randomIndex];
       } else {
         // Normal pick: weighted selection from top 5 tier list heroes
         var availablePriorityHeroes = filteredDraftOrder.filter(function(hero) {
           // Handle Spider-Woman variant matching
           if (hero === 'Spider-Woman') {
             return availableHeroes.some(function(h) {
               return h === 'Spider-Woman' || h.startsWith('Spider-Woman - ');
             });
           }
           return availableHeroes.includes(hero);
         }).map(function(hero) {
           // Replace Spider-Woman with the actual variant in the pool
           if (hero === 'Spider-Woman') {
             var spiderWomanVariant = availableHeroes.find(function(h) {
               return h.startsWith('Spider-Woman - ');
             });
             return spiderWomanVariant || hero;
           }
           return hero;
         });
         
         if (availablePriorityHeroes.length > 0) {
           var topChoices = availablePriorityHeroes.slice(0, Math.min(5, availablePriorityHeroes.length));
           
           var weights = [];
           for (var i = 0; i < topChoices.length; i++) {
             weights.push(Math.pow(1.5, topChoices.length - 1 - i));
           }
           
           var totalWeight = weights.reduce(function(sum, weight) {
             return sum + weight;
           }, 0);
           var random = Math.random() * totalWeight;
           var cumulativeWeight = 0;
           
           for (var i = 0; i < topChoices.length; i++) {
             cumulativeWeight += weights[i];
             if (random <= cumulativeWeight) {
               aiPick = topChoices[i];
               break;
             }
           }
         } else {
           // No tier list heroes available, pick randomly
           var randomIndex = Math.floor(Math.random() * availableHeroes.length);
           aiPick = availableHeroes[randomIndex];
         }
       }
       
       if (aiPick) {
         draftedHeroes.push(aiPick);
       }
       
     } else {
       var availableAspects = allTraits.filter(function(aspect) {
         return !draftedTraits.includes(aspect);
       });
       
       // Apply aspect group restrictions for bots in 4-group mode
        // Add 6-group mode support for bot 3-aspect group restrictions
       var draftPoolGroups = document.getElementById('draftPoolGroups') ? document.getElementById('draftPoolGroups').value : DEFAULT_DRAFT_GROUPS;
       if (draftPoolGroups === '6' && traitsGroup1.length > 0 && traitsGroup2.length > 0 && traitsGroup3.length > 0) {
         var currentTeamAspects = currentAspects;
         if (currentTeamAspects.length > 0) {
           // Filter out aspects from already-used groups
           var usedGroups = currentTeamAspects.map(function(aspect) {
             return getAspectGroup(aspect);
           });
           availableAspects = availableAspects.filter(function(aspect) {
             return !usedGroups.includes(getAspectGroup(aspect));
           });
         }
         // No used groups yet - can pick from any group
       } else if (draftPoolGroups === '4' && traitsGroup1.length > 0 && traitsGroup2.length > 0) {
         var currentTeamAspects = currentAspects;
         if (currentTeamAspects.length === 1) {
           // Second aspect pick - must be from opposite group
           var firstAspectGroup = getAspectGroup(currentTeamAspects[0]);
           var allowedGroup = firstAspectGroup === 1 ? 2 : 1;
           availableAspects = availableAspects.filter(function(aspect) {
             return getAspectGroup(aspect) === allowedGroup;
           });
         }
         // First aspect pick can be from any group (no additional filtering needed)
       }
       
       if (availableAspects.length === 0) {
         advanceTurn();
         return;
       }
       
       // Check for surprise pick first
       var surpriseChance = Math.random();
       if (surpriseChance < (botSurprisePercentage / 100)) {
         // Surprise pick: completely random from all available aspects
         var randomIndex = Math.floor(Math.random() * availableAspects.length);
         var randomAspect = availableAspects[randomIndex];
         var aspectType = getAspectType(randomAspect);
         aiPick = getHighestAvailableAspect(aspectType);
       } else {
         // Leadership priority logic
         var availableLeadership = getHighestAvailableLeadership();
         if (availableLeadership) {
           // Take highest available Leadership
           aiPick = availableLeadership;
         } else {
           // Normal pick: weighted selection from top 5 priority aspects
           var availablePriorityAspects = traitsPriorityList.filter(function(aspect) {
             return availableAspects.includes(aspect);
           });
           
           if (availablePriorityAspects.length > 0) {
             var topChoices = availablePriorityAspects.slice(0, Math.min(5, availablePriorityAspects.length));
             
             var weights = [];
             for (var i = 0; i < topChoices.length; i++) {
               weights.push(Math.pow(1.5, topChoices.length - 1 - i));
             }
             
             var totalWeight = weights.reduce(function(sum, weight) {
               return sum + weight;
             }, 0);
             var random = Math.random() * totalWeight;
             var cumulativeWeight = 0;
             
             for (var i = 0; i < topChoices.length; i++) {
               cumulativeWeight += weights[i];
               if (random <= cumulativeWeight) {
                 var selectedAspect = topChoices[i];
                 var aspectType = getAspectType(selectedAspect);
                 aiPick = getHighestAvailableAspect(aspectType);
                 break;
               }
             }
           } else {
             // No priority aspects available, pick randomly
             var randomIndex = Math.floor(Math.random() * availableAspects.length);
             var randomAspect = availableAspects[randomIndex];
             var aspectType = getAspectType(randomAspect);
             aiPick = getHighestAvailableAspect(aspectType);
           }
         }
       }
       
       // Mild discouragement for duplicate aspect types on second pick
       if (currentAspects.length === 1 && aiPick && getAspectType(aiPick) === getAspectType(currentAspects[0])) {
         // Track re-pick data for user feedback
         rePickTriggered = true;
         originalPickType = getAspectType(aiPick);
         
         // Re-run aspect selection logic once to encourage variety
         var rePickChance = Math.random();
         if (rePickChance < (botSurprisePercentage / 100)) {
           // Re-pick: Surprise pick - completely random from all available aspects
           var randomIndex = Math.floor(Math.random() * availableAspects.length);
           var randomAspect = availableAspects[randomIndex];
           var aspectType = getAspectType(randomAspect);
           aiPick = getHighestAvailableAspect(aspectType);
         } else {
           // Re-pick: Leadership priority logic
           var availableLeadership = getHighestAvailableLeadership();
           if (availableLeadership && availableAspects.includes(availableLeadership)) {
             // Take highest available Leadership if still available
             aiPick = availableLeadership;
           } else {
             // Re-pick: Normal weighted selection from top 5 priority aspects
             var availablePriorityAspects = traitsPriorityList.filter(function(aspect) {
               return availableAspects.includes(aspect);
             });
             
             if (availablePriorityAspects.length > 0) {
               var topChoices = availablePriorityAspects.slice(0, Math.min(5, availablePriorityAspects.length));
               
               var weights = [];
               for (var i = 0; i < topChoices.length; i++) {
                 weights.push(Math.pow(1.5, topChoices.length - 1 - i));
               }
               
               var totalWeight = weights.reduce(function(sum, weight) {
                 return sum + weight;
               }, 0);
               var random = Math.random() * totalWeight;
               var cumulativeWeight = 0;
               
               for (var i = 0; i < topChoices.length; i++) {
                 cumulativeWeight += weights[i];
                 if (random <= cumulativeWeight) {
                   var selectedAspect = topChoices[i];
                   var aspectType = getAspectType(selectedAspect);
                   aiPick = getHighestAvailableAspect(aspectType);
                   break;
                 }
               }
             } else {
               // Re-pick: No priority aspects available, pick randomly
               var randomIndex = Math.floor(Math.random() * availableAspects.length);
               var randomAspect = availableAspects[randomIndex];
               var aspectType = getAspectType(randomAspect);
               aiPick = getHighestAvailableAspect(aspectType);
             }
           }
         }
         // Store final pick type for feedback
         finalPickType = getAspectType(aiPick);
         // Accept whatever the re-pick produces, even if still same type
       }
       
       if (aiPick) {
         draftedTraits.push(aiPick);
       }
     }
     
     if (aiPick) {
       teamPicks[currentTeam].push(aiPick);
       
       // Store re-pick data globally for status display
       window.lastRePickData = {
         triggered: rePickTriggered,
         originalType: originalPickType,
         finalType: finalPickType,
         team: currentTeam
       };
       
       // Force status update after storing re-pick data
       if (rePickTriggered) {
         updateDraftStatus(); // Force immediate status update
       }
       
       updateAllTeamsDisplay();
       updateAvailableItemsDisplay();
       updateBotPriorityDisplay();
       updateBotTraitsPriorityDisplay();
       
       advanceTurn();
     }
   }
   
   /* ===== MODOK DRAFT TOOL - MAIN SCRIPT END ===== */
