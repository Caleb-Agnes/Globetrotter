// Scheduled job: samples Riot API match data to find each champion's most-played role, then
// writes the results to champion-roles.json (committed back to the repo by the workflow).
// Local run: node --env-file=.env update-champion-roles.js

import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.join(__dirname, '..', 'champion-roles.json');

// ---- Riot API setup ----
const RIOT_API_KEY = process.env.RIOT_API_KEY;

// ---- get a sample of players ----

// ---- get recent match ids per player ----

// ---- get match details and tally role counts per champion ----

// ---- write results ----
function writeChampionRoleStats(mostPlayedRoles) {
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mostPlayedRoles, null, 2));
}

// ---- orchestration ----
