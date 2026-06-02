# MODOK League Draft Bot (Season 6) - Claude Code Memory

## Status: S6 build in progress

This is the Season 6 draft bot, scaffolded from `s5/draft/` and being reworked for the new mechanics. Version `V6.0.0-dev`.

- Edit here, test by opening `index.html` in a browser, commit on the `s6-draft` branch, push to deploy (push only when asked).
- Local clone: `C:\Users\josse\Documents\modokleague.github.io` (outside Dropbox).
- Full design spec lives in Dropbox at `...\Marvel Champions Stats\draft-bot\S6-DRAFT-MECHANICS.md`.

The S5 build (frozen, deployed `V5.0.0-alpha.11`) remains at `s5/draft/`.

---

## S6 mechanics in brief

- Draftable unit is a **hero + aspect** combination (not S5 hero/aspect pairs).
- Four draft groups. Two draft modes (user toggle `#draftMode`):
  - **Chaos:** each item is a random aspect + random hero; groups are not aspect-bound.
  - **Order:** the four groups are one per aspect (Aggression, Justice, Leadership, Protection); every item in a group carries that aspect.
- Universe toggle (`#universeMode`): **Multiverse** (default, with replacement) vs **Single Universe** (at most one copy of each hero across the whole pool; duplicate rolls re-roll).
- Pool size unchanged from S5: each group holds `(kouples + extras)` items, extras default 3.
- Required heroes forced in after the pool is built (last-copy re-roll guard). Bans (hero outright or hero+aspect combo) are filtered out during generation.
- Bot AI: tier-weighted priority, one pick per group, with a random-pick chance.

---

## Build phases (tracked)

- Phase 0 (done): config version + DRAFT_MODES/UNIVERSE_MODES/MAIN_ASPECTS constants; index.html labels + toggles; this file.
- Phase 1: pool generation rewrite (pool.js + goButton handler), validator.html re-point.
- Phase 2: draft simulator + constraints (four rounds, one pick per group).
- Phase 3: bot AI rework.
- Phase 4: retire pairing.js, strip dead pair UI, fix load order.

---

## Data Architecture Rule (carried from S5)

`data.js` is the **only** file that defines:
- `draftOrder` - hero tier list (65 heroes as of S5 alpha.11)
- `REQUIRED_HEROES` - heroes forced into pool when feature enabled (S6 reuses the S5 list for now; will update for the season)
- `teamNamePools` - team name pools by letter group

`legacy.js` must **not** re-declare these; it reads them as globals set by `data.js` (loads first).

Current `REQUIRED_HEROES`: `['Wonder Man', 'Hercules', 'Tigra', 'Hulkling', 'Falcon', 'Winter Soldier']`. Banned heroes in `legacy.js`: `[]` (none).

---

## Config constants (S6, in config.js)

- `DRAFT_MODES` = { CHAOS: 'chaos', ORDER: 'order' }, `DEFAULT_DRAFT_MODE` = CHAOS
- `UNIVERSE_MODES` = { MULTIVERSE: 'multiverse', SINGLE: 'single' }, `DEFAULT_UNIVERSE_MODE` = MULTIVERSE
- `MAIN_ASPECTS` = ['Aggression', 'Justice', 'Leadership', 'Protection']
- S5 pairing constants (PAIRING_MODES, double-aspect weight, etc.) still present; to be removed in Phase 4.

---

## Script Load Order (index.html)

1. `config.js`
2. `globals.js`
3. `data.js` (sets draftOrder, REQUIRED_HEROES, teamNamePools)
4. `winrates.js` (HERO_WINRATES + MCT_NAME_MAP; community win rates that drive bot priority)
5. `utils.js`
6. `helpers.js`
7. `pool.js`
8. `legacy.js` (reads data.js globals; must not re-declare them)

(`pairing.js` and `tiers.js` were deleted in Phase 4.)

---

## Bot draft priority (win-rate based)

`s6MakeItem` (pool.js) stamps each item with `winRate` (the hero+aspect community win
rate from `HERO_WINRATES`) and `winRateTie`. `s6PriorityCompare` (legacy.js) ranks by
`winRate` desc, then `winRateTie` desc, then a random per-item key. Special cases:
- **Adam Warlock:** uses his overall win rate (he should take no aspect; draft change still earmarked).
- **Spider-Woman:** all combos rank at her overall, tie-broken by the average of her two aspects' win rates.

Win-rate data source and the MCT name mapping are documented in `js/winrates.js` and the
`mct-winrate-api` memory; the ordered tier list is `s6-tier-list.csv` in the Dropbox planning folder.
