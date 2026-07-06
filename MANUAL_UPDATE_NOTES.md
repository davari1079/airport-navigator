# Airport Navigator manual update package

This package is built from the latest provided `airport-navigator-main.zip` level-set and adds the missing MEM/BNA hero image assets in the exact app path.

Key included files:
- `public/airport-visuals/mem.webp`
- `public/airport-visuals/bna.webp`
- `src/data/airportVisuals.js` includes mappings for MEM and BNA.

Manual GitHub update notes:
1. Extract this ZIP.
2. Upload/copy the extracted contents into the root of the `davari1079/airport-navigator` repo.
3. Confirm the repo contains `public/airport-visuals/mem.webp` and `public/airport-visuals/bna.webp` directly under that folder.
4. Commit the update.
5. Let Vercel redeploy.

Important: Do not upload the parent folder itself into GitHub as a new nested folder. The repository root should contain `public`, `src`, `package.json`, etc.
