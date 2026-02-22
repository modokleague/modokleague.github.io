/* ========================================
   MODOK League Season 5.0 - Static Data
   V5.0.0-alpha.11

   Contains:
   - Draft order (65 heroes ranked by tier)
   - Required heroes list
   - Team name pools (alphabetized villain/character names)
   ======================================== */

// ===== DRAFT ORDER (Hero Tier List) =====
// Heroes are ordered from highest tier (best) to lowest tier (worst)
// This order is used for:
//   1. Bot AI priority (bots prefer earlier heroes)
//   2. Season 5.0 tier calculations (sextile/quartile pairing)

var draftOrder = [
  'Spider-Ham', 'Cable', 'Cyclops', 'Storm', 'Magik', 'Psylocke', 'Maria Hill',
  'Bishop', 'Spider-Man (Peter Parker)', 'Doctor Strange', 'Spider-Man (Miles Morales)',
  'Captain Marvel', 'Scarlet Witch', 'X-23', 'Deadpool',
  'Black Panther (Shuri)', 'Magneto', 'Ironheart', 'Vision', 'Captain America',
  'Domino', 'Angel', 'Shadowcat', 'Nova',
  'Nick Fury', 'Iron Man', 'Silk', 'Spider-Woman', 'SP//dr',
  'Wonder Man', 'Phoenix', 'Wolverine', 'Venom', 'Rogue', "Black Panther (T'Challa)",
  'Ant-Man', 'Hercules', 'Star-Lord', 'Spectrum', 'Colossus', 'Jubilee',
  'Gambit', 'Iceman', 'Rocket',
  'Falcon', 'Winter Soldier', 'Tigra', 'Hulkling',
  'Adam Warlock', 'Gamora', 'Ghost-Spider', 'Drax', 'Black Widow', 'Nightcrawler', 'Wasp',
  'Ms Marvel', 'Nebula', 'She-Hulk', 'Thor', 'War Machine', 'Quicksilver',
  'Hawkeye', 'Groot', 'Valkyrie', 'Hulk'
];

// ===== REQUIRED HEROES =====
// Heroes that must always appear in draft pools (when feature enabled)
// Ensures new/featured heroes get playtesting
// Current: Wonder Man (T3), Hercules (T4), Tigra (T5), Hulkling (T5), Falcon (T5), Winter Soldier (T5)
// Updated: replaced Black Panther (Shuri) and Silk with Wonder Man and Hercules (S5 new additions)

var REQUIRED_HEROES = ['Wonder Man', 'Hercules', 'Tigra', 'Hulkling', 'Falcon', 'Winter Soldier'];

// ===== TEAM NAME POOLS =====
// Alphabetized pools of villain/character names for team naming
// Each pool corresponds to number of teams (0-11)

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
