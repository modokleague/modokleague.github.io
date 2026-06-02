/* ========================================
   MODOK League Season 5.0 - Legacy Code
   V5.0.0-alpha.11

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

   // Additional heroes added by the user (kept current with new releases)
   var additionalHeroes = [];

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

   // Full hero universe: the base pool plus any user-added heroes.
   function s6HeroUniverse() {
     var u = marvelHeroes.slice();
     additionalHeroes.forEach(function(h) { if (u.indexOf(h) === -1) { u.push(h); } });
     return u;
   }

   // Read the Additional Heroes textarea and refresh the lists.
   function syncAdditionalHeroes() {
     var elx = document.getElementById('additionalHeroesInput');
     var raw = elx ? elx.value : '';
     additionalHeroes = raw ? raw.split('\n').map(function(s) { return s.trim(); }).filter(function(s) { return s.length > 0; }) : [];
     renderHeroLists();
     if (typeof updateMaxExtras === 'function') { updateMaxExtras(); }
   }

   // Render the Available and Banned hero lists. Click a hero to toggle its ban.
   function renderHeroLists() {
     var allEl = document.getElementById('allHeroes');
     var banEl = document.getElementById('bannedHeroes');
     var noteEl = document.getElementById('bannedNote');
     if (allEl) {
       var avail = s6HeroUniverse().filter(function(h) { return !isHeroBanned(h); }).sort();
       allEl.innerHTML = avail.map(function(hero) {
         return '<div class="hero-card" style="cursor:pointer;" title="Click to ban" onclick="banHero(this)">' + hero + '</div>';
       }).join('');
     }
     if (banEl) {
       var bans = bannedHeroes.slice().sort();
       banEl.innerHTML = bans.map(function(hero) {
         return '<div class="hero-card" style="cursor:pointer;" title="Click to unban" onclick="unbanHero(this)">' + hero + '</div>';
       }).join('');
       if (noteEl) { noteEl.style.display = bans.length ? 'none' : 'block'; }
     }
   }

   function banHero(el) {
     var name = el.textContent;
     if (bannedHeroes.indexOf(name) === -1) { bannedHeroes.push(name); }
     renderHeroLists();
     if (typeof updateMaxExtras === 'function') { updateMaxExtras(); }
   }

   function unbanHero(el) {
     var name = el.textContent;
     var i = bannedHeroes.indexOf(name);
     if (i !== -1) { bannedHeroes.splice(i, 1); }
     renderHeroLists();
     if (typeof updateMaxExtras === 'function') { updateMaxExtras(); }
   }

   // Initialize hero lists
   try { renderHeroLists(); } catch (error) { /* preserve initialization flow */ }

   // Update bot settings display (S6: only the random-pick chance slider)
   function updateBotSettings() {
     return safeExecute(function() {
       var surpriseSlider = document.getElementById('botSurpriseSlider');
       var surpriseValue = document.getElementById('botSurpriseValue');
       var rePickSlider = document.getElementById('botRePickSlider');
       var rePickValue = document.getElementById('botRePickValue');
       var description = document.getElementById('botStrategyDescription');

       if (surpriseSlider) {
         botSurprisePercentage = parseInt(surpriseSlider.value);
         if (surpriseValue) { surpriseValue.textContent = botSurprisePercentage + '%'; }
       }
       if (rePickSlider) {
         rePickPercentage = Math.min(95, parseInt(rePickSlider.value) || 0);
         if (rePickValue) { rePickValue.textContent = rePickPercentage + '%'; }
       }

       if (description) {
         description.textContent = 'Bots draft one item per group, preferring higher-tier heroes. ' +
           botSurprisePercentage + '% chance of a completely random pick; ' +
           rePickPercentage + '% chance to re-pick when they land on an aspect they already drafted.';
       }
     }, null, [], 'updateBotSettings');
   }

   // Update the extras maximum hint and default value.
   function updateMaxExtras() {
     return safeExecute(function() {
       var numberOfTeams = parseInt(document.getElementById('teamsInput').value) || 10;
       var extrasInput = document.getElementById('extrasInput');

       // Tightest constraint is Single Universe: 4 * (teams + extras) <= available heroes.
       var availableCount = s6HeroUniverse().filter(function(h) { return !isHeroBanned(h); }).length;
       var maxExtras = Math.max(0, Math.floor(availableCount / 4) - numberOfTeams);
       var defaultExtras = 3;

       var maxExtrasEl = document.getElementById('maxExtras');
       if (maxExtrasEl) { maxExtrasEl.textContent = maxExtras; }

       var currentValue = parseInt(extrasInput.value) || 0;
       if (currentValue === 0) { extrasInput.value = Math.min(defaultExtras, maxExtras); }
       if (parseInt(extrasInput.value) > maxExtras) { extrasInput.value = maxExtras; }
       extrasInput.setAttribute('max', maxExtras);

       var desc = document.getElementById('draftDescription');
       if (desc) { desc.textContent = 'Each kouple drafts one item from each of the four groups over four rounds'; }

       var rules = document.getElementById('draftRulesText');
       if (rules) {
         rules.innerHTML =
           '<strong>Draft Rules:</strong> 4 rounds, snake order. Each kouple drafts exactly one hero+aspect item from each of the four groups (one pick per group).<br>' +
           '<strong>Bot Strategy:</strong> bots prefer higher-tier heroes (weighted by the tier list), constrained to one pick per group, with a chance of a completely random pick.<br>';
       }

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

     // ===== SEASON 6.0: Hero + aspect pool generation =====
     var itemsPerGroup = numberOfTeams + numberOfExtras;

     // Read the S6 toggles.
     currentDraftMode = document.getElementById('draftMode')
       ? document.getElementById('draftMode').value : DEFAULT_DRAFT_MODE;
     currentUniverseMode = document.getElementById('universeMode')
       ? document.getElementById('universeMode').value : DEFAULT_UNIVERSE_MODE;

     // Pool = base heroes plus any user-added heroes, minus banned ones.
     var heroPool = s6HeroUniverse().filter(function(h) { return !isHeroBanned(h); });

     // Required heroes (only when the feature is enabled).
     var requireHeroesEnabled = document.getElementById('requireHeroesCheckbox').checked;
     var required = requireHeroesEnabled ? REQUIRED_HEROES.slice() : [];
     // Additional heroes are always treated as required so they appear in the pool.
     additionalHeroes.forEach(function(h) { if (required.indexOf(h) === -1) { required.push(h); } });
     var requiredHeroesList = required.filter(function(hero) { return heroPool.indexOf(hero) !== -1; });

     var s6Result = generateS6DraftPool({
       mode: currentDraftMode,
       universe: currentUniverseMode,
       itemsPerGroup: itemsPerGroup,
       heroPool: heroPool,
       requiredHeroes: requiredHeroesList
     }, rng);

     if (s6Result.error) {
       alert(s6Result.error);
       return;
     }

     draftGroups = s6Result.groups;
     s6Excluded = s6Result.excluded;

     // Flatten for hero tracking and bot priority.
     var allItems = [].concat.apply([], draftGroups);
     allHeroes = allItems.map(function(item) { return item.hero; });

     // Bot priority: items sorted by tier (lower draftOrder index = higher priority).
     s6BotPriority = allItems.slice().sort(s6PriorityCompare);

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

     // ===== SEASON 6.0: Render the four draft groups =====
     function s6ItemCard(item) {
       return '<div class="hero-card" style="background: ' + s6ItemBg(item) +
              '; color: #000; border: 2px solid #000; padding: 12px 16px;">' + item.displayName + '</div>';
     }

     document.getElementById('resultPool').innerHTML = draftGroups.map(function(group, gi) {
       var label = (currentDraftMode === DRAFT_MODES.ORDER)
         ? ('Group ' + (gi + 1) + ' - ' + MAIN_ASPECTS[gi])
         : ('Group ' + (gi + 1));
       return '<div class="result-section" style="margin-bottom: 20px; padding: 20px; border-radius: 10px; background: rgba(255,255,255,0.1); backdrop-filter: blur(5px);">' +
                '<h3 style="margin-bottom: 15px; font-size: 1.3rem; font-weight: 600; color: #2c2c54;">' + label + '</h3>' +
                '<div class="hero-grid" style="display: flex; flex-wrap: wrap; gap: 8px;">' +
                  group.slice().sort(function(a, b){ return a.displayName.localeCompare(b.displayName); }).map(s6ItemCard).join('') +
                '</div>' +
              '</div>';
     }).join('');

     // Bot priority across all items.
     document.getElementById('resultDraftBot').innerHTML = s6BotPriority.map(s6ItemCard).join('');

     document.getElementById('resultDraftOrder').innerHTML = teams.map(function(team, index) {
       return '<div class="kouple-card">' + (index + 1) + '. ' + team + '</div>';
     }).join('');

     // Excluded heroes (meaningful in Single Universe).
     if (currentUniverseMode === UNIVERSE_MODES.SINGLE && s6Excluded.length > 0) {
       document.getElementById('resultExcluded').innerHTML = s6Excluded.map(function(hero) {
         return '<div class="hero-card">' + hero + '</div>';
       }).join('');
     } else {
       document.getElementById('resultExcluded').innerHTML =
         '<div style="padding: 20px; text-align: center; color: #666; font-style: italic;">' +
         (currentUniverseMode === UNIVERSE_MODES.SINGLE ? 'No heroes excluded.' : 'Not applicable in Multiverse (draft with replacement).') +
         '</div>';
     }

     document.getElementById('results').style.display = 'block';
     document.getElementById('footerNote').style.display = 'block';
     
     document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
   } catch (error) {
      alert('Error generating draft pool: ' + error.message);
   }
   });

   /* ========================================
      SEASON 6.0 - Draft Simulator + Bot AI
      Hero+aspect items, four groups, one pick per group, snake order.
      ======================================== */

   // Reset every item in the pool to undrafted.
   function s6ResetPool() {
     for (var g = 0; g < draftGroups.length; g++) {
       for (var i = 0; i < draftGroups[g].length; i++) {
         draftGroups[g][i].drafted = false;
         draftGroups[g][i].draftedBy = null;
       }
     }
   }

   // Resolve the player's kouple from custom team input, else the first team.
   function s6ResolvePlayerTeam() {
     var raw = document.getElementById('teamListInput').value.trim();
     var custom = raw ? raw.split('\n').map(function(n){ return n.trim(); }).filter(function(n){ return n.length > 0; }) : [];
     if (custom.length > 0) { return custom[0]; }
     // No custom names: the player is the "A" kouple (its name came from the A-group pool),
     // regardless of where it landed in the randomized draft order.
     var aPool = (typeof teamNamePools !== 'undefined' && teamNamePools[0]) ? teamNamePools[0] : [];
     for (var i = 0; i < draftOrderTeams.length; i++) {
       if (aPool.indexOf(draftOrderTeams[i]) !== -1) { return draftOrderTeams[i]; }
     }
     return draftOrderTeams.length > 0 ? draftOrderTeams[0] : '';
   }

   function startDraftSimulator() {
     try {
       maxRounds = 4;

       var teamCards = document.getElementById('resultDraftOrder').children;
       draftOrderTeams = [];
       for (var i = 0; i < teamCards.length; i++) {
         var t = teamCards[i].textContent.split('. ')[1];
         if (t) { draftOrderTeams.push(t); }
       }
       if (draftOrderTeams.length === 0) { alert('Generate a draft pool first.'); return; }
       if (!draftGroups || draftGroups.length === 0) { alert('Generate a draft pool first.'); return; }

       playerTeamName = s6ResolvePlayerTeam();

       s6ResetPool();
       teamPicks = {};
       teamGroupsUsed = {};
       draftOrderTeams.forEach(function(t){ teamPicks[t] = []; teamGroupsUsed[t] = []; });

       currentTurnIndex = 0;
       currentRound = 1;
       isPlayerTurn = (draftOrderTeams[0] === playerTeamName);

       s6ClearLog();
       s6Log('Draft started. You are: ' + playerTeamName);
       s6Log('Order: ' + draftOrderTeams.join(', '));

       var sim = document.getElementById('draftSimulator');
       if (sim) { sim.style.display = 'block'; sim.scrollIntoView({ behavior: 'smooth' }); }

       updateDraftStatus();
       updateAllTeamsDisplay();
       updateAvailableItemsDisplay();
       updateBotPriorityDisplay();

       if (!isPlayerTurn) { setTimeout(processS6Turn, 1000); }
     } catch (e) {
       alert('Error starting draft simulator: ' + e.message);
     }
   }

   // Group indices the team has not yet drafted from.
   function s6UnusedGroups(team) {
     var used = teamGroupsUsed[team] || [];
     var out = [];
     for (var g = 0; g < draftGroups.length; g++) {
       if (used.indexOf(g) === -1) { out.push(g); }
     }
     return out;
   }

   // Undrafted items the team may still pick (only in its unused groups).
   function s6CandidateItems(team) {
     var unused = s6UnusedGroups(team);
     var items = [];
     for (var k = 0; k < unused.length; k++) {
       var g = unused[k];
       for (var i = 0; i < draftGroups[g].length; i++) {
         if (!draftGroups[g][i].drafted) { items.push(draftGroups[g][i]); }
       }
     }
     return items;
   }

   // Record a pick.
   function s6AssignItem(team, item) {
     item.drafted = true;
     item.draftedBy = team;
     teamPicks[team].push(item);
     teamGroupsUsed[team].push(item.group);
   }

   // Player clicks an available item.
   function draftS6Item(groupIndex, itemIndex) {
     if (!isPlayerTurn || currentRound > maxRounds) { return; }
     var item = draftGroups[groupIndex] && draftGroups[groupIndex][itemIndex];
     if (!item || item.drafted) { return; }
     if ((teamGroupsUsed[playerTeamName] || []).indexOf(groupIndex) !== -1) { return; }
     s6AssignItem(playerTeamName, item);
     s6Log('R' + currentRound + ' ' + playerTeamName + ' (you) drafts: ' + item.displayName + ' [G' + (item.group + 1) + ']');
     advanceS6Turn();
   }

   // Bot turn: tier-weighted priority among candidates, with a random-pick chance.
   // One bot selection: a completely random pick (by chance) or a tier-weighted pick
   // (lower draftOrder index = higher priority; weight the top 5).
   function s6BotSelect(candidates) {
     if (Math.random() < (botSurprisePercentage / 100)) {
       return candidates[Math.floor(Math.random() * candidates.length)];
     }
     var sorted = candidates.slice().sort(s6PriorityCompare);
     var top = sorted.slice(0, Math.min(5, sorted.length));
     var weights = [];
     for (var i = 0; i < top.length; i++) { weights.push(Math.pow(1.5, top.length - 1 - i)); }
     var total = weights.reduce(function(s, w){ return s + w; }, 0);
     var r = Math.random() * total, cum = 0;
     for (var j = 0; j < top.length; j++) { cum += weights[j]; if (r <= cum) { return top[j]; } }
     return top[0];
   }

   // Aspects a team has already drafted (union across its picks; two for Spider-Woman).
   function s6TeamAspects(team) {
     var set = {};
     (teamPicks[team] || []).forEach(function(it){ it.aspects.forEach(function(a){ set[a] = true; }); });
     return set;
   }

   function processS6Turn() {
     if (isPlayerTurn || currentRound > maxRounds) { return; }
     var team = draftOrderTeams[currentTurnIndex];
     var candidates = s6CandidateItems(team);
     if (candidates.length === 0) { advanceS6Turn(); return; }

     var alreadyHas = s6TeamAspects(team);
     // A re-roll is only possible once the kouple already holds an aspect; otherwise the
     // first pick can never be a duplicate, so skip the redundant "attempts" line.
     var canRepick = false;
     for (var a in alreadyHas) { if (alreadyHas.hasOwnProperty(a)) { canRepick = true; break; } }

     var pick = s6BotSelect(candidates);
     if (canRepick) {
       s6Log('R' + currentRound + ' ' + team + ' attempts: ' + pick.displayName);
     }
     // If the pick's aspect duplicates one the team already drafted, re-pick with the
     // configured chance. Re-triggers on each re-roll; capped iterations as a safety net.
     var tries = 0;
     while (tries++ < 25) {
       var dup = s6DupAspectOf(pick, alreadyHas);
       if (!dup) { break; }
       if (Math.random() >= (rePickPercentage / 100)) {
         s6Log('   keeps it (already has ' + dup + ', no re-roll)');
         break;
       }
       pick = s6BotSelect(candidates);
       s6Log('   re-rolls (already has ' + dup + '): ' + pick.displayName);
     }

     s6AssignItem(team, pick);
     s6Log('R' + currentRound + ' ' + team + ' drafts: ' + pick.displayName + ' [G' + (pick.group + 1) + ']');
     updateAllTeamsDisplay();
     updateAvailableItemsDisplay();
     updateBotPriorityDisplay();
     advanceS6Turn();
   }

   // Snake advance over four rounds (R1/R3 forward, R2/R4 backward).
   function advanceS6Turn() {
     if (currentRound === 1 || currentRound === 3) {
       currentTurnIndex++;
       if (currentTurnIndex >= draftOrderTeams.length) {
         currentRound++;
         currentTurnIndex = draftOrderTeams.length - 1;
       }
     } else {
       currentTurnIndex--;
       if (currentTurnIndex < 0) {
         if (currentRound < maxRounds) {
           currentRound++;
           currentTurnIndex = 0;
         } else {
           currentRound = maxRounds + 1;
           isPlayerTurn = false;
           s6Log('Draft complete.');
           updateDraftStatus();
           updateAllTeamsDisplay();
           updateAvailableItemsDisplay();
           updateBotPriorityDisplay();
           return;
         }
       }
     }

     isPlayerTurn = (draftOrderTeams[currentTurnIndex] === playerTeamName);
     updateDraftStatus();
     updateAllTeamsDisplay();
     updateAvailableItemsDisplay();
     updateBotPriorityDisplay();

     if (!isPlayerTurn && currentRound <= maxRounds) {
       setTimeout(processS6Turn, 1000);
     }
   }

   // ===== Display helpers =====

   function s6Color(aspect) {
     var c = (typeof ASPECT_COLORS !== 'undefined') && ASPECT_COLORS[aspect];
     return c ? c.main : '#666';
   }

   // Bot priority: rank by hero+aspect community win rate (higher = better). Spider-Woman's
   // combos tie at her overall and break on the average of her two aspects; exact ties fall
   // to the per-item random key.
   function s6PriorityCompare(a, b) {
     if (b.winRate !== a.winRate) { return b.winRate - a.winRate; }
     if (b.winRateTie !== a.winRateTie) { return b.winRateTie - a.winRateTie; }
     return (a.tieBreak || 0) - (b.tieBreak || 0);
   }

   // Card background for an item. One aspect = solid colour; two aspects (Spider-Woman) =
   // a vertical 50/50 split of the two aspect colours, matching the S5 aspect-pair style.
   function s6ItemBg(item) {
     var asps = item.aspects || [];
     if (asps.length === 0) {
       // Aspect-agnostic hero (Adam Warlock): four-aspect split with ~3% soft seams.
       var A = s6Color('Aggression'), J = s6Color('Justice'), L = s6Color('Leadership'), P = s6Color('Protection');
       return 'linear-gradient(90deg, ' + A + ' 0%, ' + A + ' 23.5%, ' + J + ' 26.5%, ' + J + ' 48.5%, ' +
              L + ' 51.5%, ' + L + ' 73.5%, ' + P + ' 76.5%, ' + P + ' 100%)';
     }
     if (asps.length >= 2) {
       // Two aspects (Spider-Woman): split with a ~3% soft seam.
       var c1 = s6Color(asps[0]), c2 = s6Color(asps[1]);
       return 'linear-gradient(90deg, ' + c1 + ' 0%, ' + c1 + ' 48.5%, ' + c2 + ' 51.5%, ' + c2 + ' 100%)';
     }
     return s6Color(asps[0]);
   }

   function s6Card(item, extra) {
     return '<div class="hero-card" style="background:' + s6ItemBg(item) + '; color:#000; border:2px solid #000; padding:10px 14px;">' +
            item.displayName + (extra || '') + '</div>';
   }

   // ===== Draft log =====

   function s6ClearLog() {
     var el = document.getElementById('draftLog');
     if (el) { el.innerHTML = ''; }
   }

   function s6Log(msg) {
     var el = document.getElementById('draftLog');
     if (!el) { return; }
     var line = document.createElement('div');
     line.textContent = msg;
     el.appendChild(line);
     el.scrollTop = el.scrollHeight;
   }

   // First aspect of item that the team already holds, or null.
   function s6DupAspectOf(item, aspectSet) {
     for (var i = 0; i < item.aspects.length; i++) {
       if (aspectSet[item.aspects[i]]) { return item.aspects[i]; }
     }
     return null;
   }

   function updateDraftStatus() {
     var el = document.getElementById('draftStatus');
     if (!el) { return; }
     if (currentRound > maxRounds) {
       el.innerHTML = '<p style="color:#28a745; font-size:1.2rem; font-weight:bold;">&#127881; Draft Complete!</p>';
       return;
     }
     var team = draftOrderTeams[currentTurnIndex];
     if (isPlayerTurn) {
       var unused = s6UnusedGroups(playerTeamName).map(function(g){
         return (currentDraftMode === DRAFT_MODES.ORDER) ? MAIN_ASPECTS[g] : ('Group ' + (g + 1));
       });
       el.innerHTML = '<p style="color:#2c2c54; font-size:1.2rem; font-weight:bold;">&#127919; Your Turn (Round ' + currentRound + ' of ' + maxRounds + ')</p>' +
         '<p style="color:#666; font-size:0.9rem; margin-top:8px;">Pick one item from an unused group. Remaining: ' + unused.join(', ') + '</p>';
     } else {
       el.innerHTML = '<p style="color:#8A2BE2; font-size:1.2rem; font-weight:bold;">&#8987; ' + team + ' is picking (Round ' + currentRound + ' of ' + maxRounds + ')...</p>';
     }
   }

   function updateAllTeamsDisplay() {
     var el = document.getElementById('allTeamsDisplay');
     if (!el) { return; }
     el.innerHTML = draftOrderTeams.map(function(team) {
       var isPlayer = (team === playerTeamName);
       var picks = (teamPicks[team] || []).map(function(it){
         return s6Card(it, ' <span style="opacity:0.85; font-size:0.8em;">(G' + (it.group + 1) + ')</span>');
       }).join('');
       return '<div style="padding:14px; border-radius:10px; background:rgba(255,255,255,0.1); border:' +
              (isPlayer ? '2px solid #ff6b6b' : '1px solid #ddd') + ';">' +
              '<h4 style="margin-bottom:8px; color:#2c2c54;">' + team + (isPlayer ? ' (You)' : '') + '</h4>' +
              '<div class="hero-grid" style="display:flex; flex-wrap:wrap; gap:6px;">' +
              (picks || '<span style="color:#999; font-style:italic;">No picks yet</span>') + '</div>' +
              '</div>';
     }).join('');
   }

   function updateAvailableItemsDisplay() {
     var el = document.getElementById('availableItemsDisplay');
     if (!el) { return; }
     var playerUsed = teamGroupsUsed[playerTeamName] || [];
     el.innerHTML = draftGroups.map(function(group, gi) {
       var groupUsedByPlayer = playerUsed.indexOf(gi) !== -1;
       var label = (currentDraftMode === DRAFT_MODES.ORDER) ? ('Group ' + (gi + 1) + ' - ' + MAIN_ASPECTS[gi]) : ('Group ' + (gi + 1));
       // Display alphabetically by name, keeping each item's real index for the click handler.
       var ordered = group.map(function(item, ii) { return { item: item, ii: ii }; })
         .sort(function(a, b) { return a.item.displayName.localeCompare(b.item.displayName); });
       var cards = ordered.map(function(rec) {
         var item = rec.item, ii = rec.ii;
         if (item.drafted) {
           return '<div class="hero-card" style="opacity:0.35; padding:10px 14px;">' + item.displayName +
                  ' <span style="font-size:0.8em;">- ' + item.draftedBy + '</span></div>';
         }
         var clickable = isPlayerTurn && !groupUsedByPlayer && currentRound <= maxRounds;
         var style = 'background:' + s6ItemBg(item) + '; color:#000; border:2px solid #000; padding:10px 14px;' + (clickable ? ' cursor:pointer;' : ' opacity:0.7;');
         var onclick = clickable ? (' onclick="draftS6Item(' + gi + ',' + ii + ')"') : '';
         return '<div class="hero-card" style="' + style + '"' + onclick + '>' + item.displayName + '</div>';
       }).join('');
       var note = groupUsedByPlayer ? ' <span style="font-size:0.8em; color:#999;">(you have drafted from this group)</span>' : '';
       return '<div style="padding:14px; border-radius:10px; background:rgba(255,255,255,0.1);">' +
              '<h4 style="margin-bottom:8px; color:#2c2c54;">' + label + note + '</h4>' +
              '<div class="hero-grid" style="display:flex; flex-wrap:wrap; gap:6px;">' + cards + '</div>' +
              '</div>';
     }).join('');
   }

   function updateBotPriorityDisplay() {
     var el = document.getElementById('botPriorityDisplay');
     if (!el) { return; }
     // Show every item in tier order; grey out ones already drafted (no longer available).
     var all = [];
     for (var g = 0; g < draftGroups.length; g++) {
       for (var i = 0; i < draftGroups[g].length; i++) { all.push(draftGroups[g][i]); }
     }
     all.sort(s6PriorityCompare);
     el.innerHTML = all.map(function(item){
       if (item.drafted) {
         return '<div class="hero-card" style="opacity:0.35; padding:10px 14px;">' + item.displayName +
                ' <span style="font-size:0.8em;">- ' + item.draftedBy + '</span></div>';
       }
       return s6Card(item);
     }).join('');
   }

   // Export the generated pool as text to the clipboard.
   function exportDraftPool() {
     try {
       var lines = ['MODOK League Season 6.0 Draft Pool', ''];
       draftGroups.forEach(function(group, gi) {
         var label = (currentDraftMode === DRAFT_MODES.ORDER) ? ('Group ' + (gi + 1) + ' - ' + MAIN_ASPECTS[gi]) : ('Group ' + (gi + 1));
         lines.push('== ' + label + ' ==');
         group.forEach(function(item){ lines.push('  ' + item.displayName); });
         lines.push('');
       });
       var text = lines.join('\n');
       var ta = document.createElement('textarea');
       ta.value = text;
       document.body.appendChild(ta);
       ta.select();
       document.execCommand('copy');
       document.body.removeChild(ta);
       alert('Draft pool copied to clipboard.');
     } catch (e) {
       alert('Error exporting draft pool: ' + e.message);
     }
   }
   
   /* ===== MODOK DRAFT TOOL - MAIN SCRIPT END ===== */
