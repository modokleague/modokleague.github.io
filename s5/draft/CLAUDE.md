# MODOK League Draft Bot — Claude Code Memory

## This Is the Only Active Edit Location

```
C:\Users\jives\Documents\modokleague.github.io\s5\draft\
```

Edit here → test by opening `index.html` in browser → commit and push to deploy to GitHub Pages.

The Dropbox `draft-bot\` directory is **archive only**. Its `js-defunct\`, `css-defunct\`, and `deploy-V5.0.0-alpha.10-defunct\` folders are superseded by this directory.

---

## Project Structure

```
js\
  ├── config.js      # Version, pairing mode constants, aspect colors
  ├── globals.js     # Runtime state variables (draft simulator state)
  ├── data.js        # SINGLE SOURCE OF TRUTH for hero/aspect static data
  ├── utils.js       # Utility functions (seeded random, etc.)
  ├── helpers.js     # Helper functions
  ├── tiers.js       # Hero tier definitions for pairing logic
  ├── pairing.js     # Hero and aspect pairing logic
  ├── pool.js        # Pool generation logic
  └── legacy.js      # Main application logic (UI, draft simulator, bot AI)
```

---

## Data Architecture Rule

`data.js` is the **only** file that defines:
- `draftOrder` — hero tier list (65 heroes as of alpha.10)
- `REQUIRED_HEROES` — heroes forced into pool when feature enabled
- `teamNamePools` — team name pools by letter group

`legacy.js` must **not** re-declare these variables. It reads them as globals set by `data.js` (which loads first per `index.html` script order).

**To add a new hero:** edit `data.js` only — add to `draftOrder` and `REQUIRED_HEROES` if applicable.

---

## Current Hero List State (alpha.11)

- 65 heroes in `draftOrder`
- `REQUIRED_HEROES`: `['Wonder Man', 'Hercules', 'Tigra', 'Hulkling', 'Falcon', 'Winter Soldier']`
- Banned heroes (in `legacy.js`): `[]` (none)

---

## Script Load Order (index.html)

Scripts load in this order — later scripts use globals set by earlier ones:
1. `config.js`
2. `globals.js`
3. `data.js` ← sets `draftOrder`, `REQUIRED_HEROES`, `teamNamePools`
4. `utils.js`
5. `helpers.js`
6. `tiers.js`
7. `pairing.js`
8. `pool.js`
9. `legacy.js` ← reads data.js globals; must NOT re-declare them
