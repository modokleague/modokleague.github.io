/* ========================================
   MODOK League Season 6.0 - Community Win-Rate Data
   V6.0.0-dev

   Source: marvelchampionstracker.com all-time aggregate, pulled 2026-06-02.
   Win rates are decimals (0-1). null = no community data for that aspect.
   Keyed by MODOK draftOrder hero names (see MCT_NAME_MAP for renames).
   Used for bot draft priority (hero+aspect combo ranking). See s6-tier-list.csv.
   ======================================== */

// marvelchampionstracker.com hero name -> MODOK draftOrder name (only names that differ)
var MCT_NAME_MAP = {
  "Ghost Spider": "Ghost-Spider",
  "Ms. Marvel": "Ms Marvel",
  "Rocket Raccoon": "Rocket"
};

// Per hero: overall + per-aspect community win rate (decimal, null if no data).
var HERO_WINRATES = {
  "Spider-Man (Peter Parker)": { overall: 0.7538, Aggression: 0.705, Justice: 0.7602, Leadership: 0.7879, Protection: 0.729 },
  "Captain America": { overall: 0.7977, Aggression: 0.7475, Justice: 0.7716, Leadership: 0.8216, Protection: 0.7834 },
  "Iron Man": { overall: 0.719, Aggression: 0.6878, Justice: 0.7156, Leadership: 0.7497, Protection: 0.74 },
  "Captain Marvel": { overall: 0.752, Aggression: 0.7096, Justice: 0.7554, Leadership: 0.783, Protection: 0.6465 },
  "Black Panther (T'Challa)": { overall: 0.6861, Aggression: 0.6613, Justice: 0.6848, Leadership: 0.7475, Protection: 0.6497 },
  "She-Hulk": { overall: 0.6261, Aggression: 0.6117, Justice: 0.6719, Leadership: 0.625, Protection: 0.5746 },
  "Wolverine": { overall: 0.7077, Aggression: 0.697, Justice: 0.7033, Leadership: 0.7403, Protection: 0.7215 },
  "Thor": { overall: 0.578, Aggression: 0.5644, Justice: 0.5793, Leadership: 0.652, Protection: 0.5537 },
  "Black Widow": { overall: 0.7388, Aggression: 0.6433, Justice: 0.7612, Leadership: 0.7321, Protection: 0.7116 },
  "Scarlet Witch": { overall: 0.7178, Aggression: 0.7199, Justice: 0.7168, Leadership: 0.7312, Protection: 0.6869 },
  "Venom": { overall: 0.7315, Aggression: 0.7331, Justice: 0.7258, Leadership: 0.7625, Protection: 0.7247 },
  "Spider-Woman": { overall: 0.7311, Aggression: 0.7826, Justice: 0.8074, Leadership: 0.8961, Protection: 0.7 },
  "Cable": { overall: 0.7783, Aggression: 0.7337, Justice: 0.8071, Leadership: 0.7666, Protection: 0.6122 },
  "Doctor Strange": { overall: 0.8159, Aggression: 0.8137, Justice: 0.7859, Leadership: 0.8172, Protection: 0.8122 },
  "Cyclops": { overall: 0.7385, Aggression: 0.7674, Justice: 0.6772, Leadership: 0.7466, Protection: 0.6452 },
  "Hawkeye": { overall: 0.6626, Aggression: 0.6542, Justice: 0.6627, Leadership: 0.6743, Protection: 0.5818 },
  "Ms Marvel": { overall: 0.606, Aggression: 0.5974, Justice: 0.6709, Leadership: 0.5323, Protection: 0.5197 },
  "Gamora": { overall: 0.6657, Aggression: 0.6751, Justice: 0.6289, Leadership: 0.732, Protection: 0.6976 },
  "Ghost-Spider": { overall: 0.7455, Aggression: 0.7416, Justice: 0.7229, Leadership: 0.752, Protection: 0.7481 },
  "Rocket": { overall: 0.5665, Aggression: 0.5233, Justice: 0.5665, Leadership: 0.6136, Protection: 0.6814 },
  "Spider-Man (Miles Morales)": { overall: 0.7846, Aggression: 0.7226, Justice: 0.7823, Leadership: 0.8569, Protection: 0.7592 },
  "Quicksilver": { overall: 0.6641, Aggression: 0.6421, Justice: 0.6682, Leadership: 0.7297, Protection: 0.6626 },
  "Ant-Man": { overall: 0.7192, Aggression: 0.6882, Justice: 0.729, Leadership: 0.728, Protection: 0.7026 },
  "Bishop": { overall: 0.7931, Aggression: 0.75, Justice: 0.7377, Leadership: 0.8053, Protection: 0.8417 },
  "Hulk": { overall: 0.5549, Aggression: 0.5663, Justice: 0.5617, Leadership: 0.5341, Protection: 0.5082 },
  "Ironheart": { overall: 0.7794, Aggression: 0.7652, Justice: 0.8088, Leadership: 0.7734, Protection: 0.7065 },
  "Magik": { overall: 0.7846, Aggression: 0.7469, Justice: 0.7976, Leadership: 0.8559, Protection: 0.809 },
  "X-23": { overall: 0.7836, Aggression: 0.7482, Justice: 0.7723, Leadership: 0.8287, Protection: 0.7513 },
  "Star-Lord": { overall: 0.5449, Aggression: 0.5372, Justice: 0.5263, Leadership: 0.542, Protection: 0.6014 },
  "SP//dr": { overall: 0.752, Aggression: 0.7326, Justice: 0.7896, Leadership: 0.7396, Protection: 0.7498 },
  "Winter Soldier": { overall: 0.7591, Aggression: 0.7694, Justice: 0.699, Leadership: 0.7512, Protection: 0.7277 },
  "Gambit": { overall: 0.6671, Aggression: 0.7014, Justice: 0.6715, Leadership: 0.7462, Protection: 0.6104 },
  "Colossus": { overall: 0.6838, Aggression: 0.718, Justice: 0.7329, Leadership: 0.6606, Protection: 0.6439 },
  "Magneto": { overall: 0.76, Aggression: 0.7802, Justice: 0.7616, Leadership: 0.7514, Protection: 0.7795 },
  "Domino": { overall: 0.7214, Aggression: 0.727, Justice: 0.728, Leadership: 0.773, Protection: 0.6761 },
  "Phoenix": { overall: 0.7176, Aggression: 0.7642, Justice: 0.678, Leadership: 0.7102, Protection: 0.7537 },
  "Nightcrawler": { overall: 0.6741, Aggression: 0.684, Justice: 0.7387, Leadership: 0.6582, Protection: 0.6658 },
  "Psylocke": { overall: 0.7391, Aggression: 0.7564, Justice: 0.7067, Leadership: 0.8, Protection: 0.7276 },
  "Adam Warlock": { overall: 0.6934, Aggression: 0.8991, Justice: null, Leadership: null, Protection: null },
  "Groot": { overall: 0.5811, Aggression: 0.5833, Justice: 0.6222, Leadership: 0.6335, Protection: 0.5503 },
  "Shadowcat": { overall: 0.6585, Aggression: 0.6309, Justice: 0.6751, Leadership: 0.6905, Protection: 0.6866 },
  "Maria Hill": { overall: 0.7917, Aggression: 0.6816, Justice: 0.8067, Leadership: 0.7904, Protection: 0.8364 },
  "War Machine": { overall: 0.6687, Aggression: 0.6877, Justice: 0.7009, Leadership: 0.6494, Protection: 0.583 },
  "Angel": { overall: 0.7153, Aggression: 0.7203, Justice: 0.7432, Leadership: 0.7116, Protection: 0.7034 },
  "Storm": { overall: 0.7953, Aggression: 0.7943, Justice: 0.8263, Leadership: 0.793, Protection: 0.7904 },
  "Drax": { overall: 0.6192, Aggression: 0.562, Justice: 0.4118, Leadership: 0.6496, Protection: 0.6307 },
  "Wasp": { overall: 0.6208, Aggression: 0.5751, Justice: 0.6611, Leadership: 0.6676, Protection: 0.6557 },
  "Spectrum": { overall: 0.6772, Aggression: 0.666, Justice: 0.692, Leadership: 0.6888, Protection: 0.6542 },
  "Iceman": { overall: 0.7064, Aggression: 0.6806, Justice: 0.6724, Leadership: 0.7315, Protection: 0.7258 },
  "Nick Fury": { overall: 0.726, Aggression: 0.6623, Justice: 0.7705, Leadership: 0.7014, Protection: 0.6716 },
  "Vision": { overall: 0.7531, Aggression: 0.8098, Justice: 0.748, Leadership: 0.788, Protection: 0.7251 },
  "Rogue": { overall: 0.7003, Aggression: 0.6574, Justice: 0.6842, Leadership: 0.7586, Protection: 0.6881 },
  "Nova": { overall: 0.6984, Aggression: 0.6871, Justice: 0.7387, Leadership: 0.7075, Protection: 0.6414 },
  "Jubilee": { overall: 0.6622, Aggression: 0.6823, Justice: 0.6617, Leadership: 0.6538, Protection: 0.5641 },
  "Spider-Ham": { overall: 0.7765, Aggression: 0.7045, Justice: 0.7459, Leadership: 0.8468, Protection: 0.7287 },
  "Deadpool": { overall: 0.7011, Aggression: 0.6894, Justice: 0.7273, Leadership: 0.6623, Protection: 0.625 },
  "Silk": { overall: 0.6831, Aggression: 0.6957, Justice: 0.7462, Leadership: 0.6845, Protection: 0.641 },
  "Black Panther (Shuri)": { overall: 0.7708, Aggression: 0.7115, Justice: 0.7803, Leadership: 0.7821, Protection: 0.7541 },
  "Nebula": { overall: 0.7131, Aggression: 0.7047, Justice: 0.6956, Leadership: 0.7607, Protection: 0.7485 },
  "Tigra": { overall: 0.7793, Aggression: 0.7571, Justice: 0.7635, Leadership: 0.8, Protection: 0.8486 },
  "Valkyrie": { overall: 0.5253, Aggression: 0.5052, Justice: 0.5073, Leadership: 0.6413, Protection: 0.5 },
  "Hulkling": { overall: 0.7994, Aggression: 0.8548, Justice: 0.7895, Leadership: 0.8195, Protection: 0.7711 },
  "Hercules": { overall: 0.6267, Aggression: 0.6956, Justice: 0.6094, Leadership: 0.6093, Protection: 0.5522 },
  "Falcon": { overall: 0.6987, Aggression: 0.6869, Justice: 0.7239, Leadership: 0.6758, Protection: 0.735 },
  "Wonder Man": { overall: 0.7216, Aggression: 0.6982, Justice: 0.7651, Leadership: 0.7428, Protection: 0.5902 }
};
