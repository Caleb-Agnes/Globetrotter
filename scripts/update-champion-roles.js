//this script runs from the github actions (by default every wednesday)

import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url)); //gets the directory name
const CHAMPION_ROLE_PATH = path.join(__dirname, '..', 'champion-roles.json'); //public result the website fetches
const ROLE_FREQUENCY_TABLE_PATH = path.join(__dirname, '..', 'role-frequency-table.json'); //internal progress between runs
const LOG_PATH = path.join(__dirname, '..', 'update-log.txt'); //human-readable record of what happened this run
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const PLATFORM_ROUTE = "euw1"; //used for league-v4 (rank lookups)
const REGIONAL_ROUTE = "europe"; //used for match-v5 (match id and match detail lookups)
const MAX_PAGE = 20; //decides the most pages that a player can be randomly sleceted from
const DATASET_MAX_AGE_MS = 14 * 24 * 60 * 60 * 1000; //2 weeks - a completed dataset older than this gets reset
const MAX_API_CALLS = 1000; // 1000 calls took ~12 minutes

const roleNames = { TOP: "top", JUNGLE: "jng", MIDDLE: "mid", BOTTOM: "bot", UTILITY: "sup" };

const rankDistribution = [
    { name: "IRON", proportion: 0.035 },
    { name: "BRONZE", proportion: 0.151 },
    { name: "SILVER", proportion: 0.213 },
    { name: "GOLD", proportion: 0.243 },
    { name: "PLATINUM", proportion: 0.184 },
    { name: "EMERALD", proportion: 0.118 },
    { name: "DIAMOND", proportion: 0.047 },
    { name: "APEX", proportion: 0.009 }
];

const championList = [
    { id: "aatrox", riotId: 266 }, { id: "ahri", riotId: 103 }, { id: "akali", riotId: 84 }, { id: "akshan", riotId: 166 },
    { id: "alistar", riotId: 12 }, { id: "ambessa", riotId: 799 }, { id: "amumu", riotId: 32 }, { id: "anivia", riotId: 34 },
    { id: "annie", riotId: 1 }, { id: "aphelios", riotId: 523 }, { id: "ashe", riotId: 22 }, { id: "aurelionsol", riotId: 136 },
    { id: "aurora", riotId: 893 }, { id: "azir", riotId: 268 }, { id: "bard", riotId: 432 }, { id: "belveth", riotId: 200 },
    { id: "blitzcrank", riotId: 53 }, { id: "brand", riotId: 63 }, { id: "braum", riotId: 201 }, { id: "briar", riotId: 233 },
    { id: "caitlyn", riotId: 51 }, { id: "camille", riotId: 164 }, { id: "cassiopeia", riotId: 69 }, { id: "chogath", riotId: 31 },
    { id: "corki", riotId: 42 }, { id: "darius", riotId: 122 }, { id: "diana", riotId: 131 }, { id: "drmundo", riotId: 36 },
    { id: "draven", riotId: 119 }, { id: "ekko", riotId: 245 }, { id: "elise", riotId: 60 }, { id: "evelynn", riotId: 28 },
    { id: "ezreal", riotId: 81 }, { id: "fiddlesticks", riotId: 9 }, { id: "fiora", riotId: 114 }, { id: "fizz", riotId: 105 },
    { id: "galio", riotId: 3 }, { id: "gangplank", riotId: 41 }, { id: "garen", riotId: 86 }, { id: "gnar", riotId: 150 },
    { id: "gragas", riotId: 79 }, { id: "graves", riotId: 104 }, { id: "gwen", riotId: 887 }, { id: "hecarim", riotId: 120 },
    { id: "heimerdinger", riotId: 74 }, { id: "hwei", riotId: 910 }, { id: "illaoi", riotId: 420 }, { id: "irelia", riotId: 39 },
    { id: "ivern", riotId: 427 }, { id: "janna", riotId: 40 }, { id: "jarvaniv", riotId: 59 }, { id: "jax", riotId: 24 },
    { id: "jayce", riotId: 126 }, { id: "jhin", riotId: 202 }, { id: "jinx", riotId: 222 }, { id: "ksante", riotId: 897 },
    { id: "kaisa", riotId: 145 }, { id: "kalista", riotId: 429 }, { id: "karma", riotId: 43 }, { id: "karthus", riotId: 30 },
    { id: "kassadin", riotId: 38 }, { id: "katarina", riotId: 55 }, { id: "kayle", riotId: 10 }, { id: "kayn", riotId: 141 },
    { id: "kennen", riotId: 85 }, { id: "khazix", riotId: 121 }, { id: "kindred", riotId: 203 }, { id: "kled", riotId: 240 },
    { id: "kogmaw", riotId: 96 }, { id: "leblanc", riotId: 7 }, { id: "leesin", riotId: 64 }, { id: "leona", riotId: 89 },
    { id: "lillia", riotId: 876 }, { id: "lissandra", riotId: 127 }, { id: "lucian", riotId: 236 }, { id: "lulu", riotId: 117 },
    { id: "lux", riotId: 99 }, { id: "malphite", riotId: 54 }, { id: "malzahar", riotId: 90 }, { id: "maokai", riotId: 57 },
    { id: "masteryi", riotId: 11 }, { id: "mel", riotId: 800 }, { id: "milio", riotId: 902 }, { id: "missfortune", riotId: 21 },
    { id: "mordekaiser", riotId: 82 }, { id: "morgana", riotId: 25 }, { id: "naafiri", riotId: 950 }, { id: "nami", riotId: 267 },
    { id: "nasus", riotId: 75 }, { id: "nautilus", riotId: 111 }, { id: "neeko", riotId: 518 }, { id: "nidalee", riotId: 76 },
    { id: "nilah", riotId: 895 }, { id: "nocturne", riotId: 56 }, { id: "nunu", riotId: 20 }, { id: "olaf", riotId: 2 },
    { id: "orianna", riotId: 61 }, { id: "ornn", riotId: 516 }, { id: "pantheon", riotId: 80 }, { id: "poppy", riotId: 78 },
    { id: "pyke", riotId: 555 }, { id: "qiyana", riotId: 246 }, { id: "quinn", riotId: 133 }, { id: "rakan", riotId: 497 },
    { id: "rammus", riotId: 33 }, { id: "reksai", riotId: 421 }, { id: "rell", riotId: 526 }, { id: "renata", riotId: 888 },
    { id: "renekton", riotId: 58 }, { id: "rengar", riotId: 107 }, { id: "riven", riotId: 92 }, { id: "rumble", riotId: 68 },
    { id: "ryze", riotId: 13 }, { id: "samira", riotId: 360 }, { id: "sejuani", riotId: 113 }, { id: "senna", riotId: 235 },
    { id: "seraphine", riotId: 147 }, { id: "sett", riotId: 875 }, { id: "shaco", riotId: 35 }, { id: "shen", riotId: 98 },
    { id: "shyvana", riotId: 102 }, { id: "singed", riotId: 27 }, { id: "sion", riotId: 14 }, { id: "sivir", riotId: 15 },
    { id: "skarner", riotId: 72 }, { id: "smolder", riotId: 901 }, { id: "sona", riotId: 37 }, { id: "soraka", riotId: 16 },
    { id: "swain", riotId: 50 }, { id: "sylas", riotId: 517 }, { id: "syndra", riotId: 134 }, { id: "tahmkench", riotId: 223 },
    { id: "taliyah", riotId: 163 }, { id: "talon", riotId: 91 }, { id: "taric", riotId: 44 }, { id: "teemo", riotId: 17 },
    { id: "thresh", riotId: 412 }, { id: "tristana", riotId: 18 }, { id: "trundle", riotId: 48 }, { id: "tryndamere", riotId: 23 },
    { id: "twistedfate", riotId: 4 }, { id: "twitch", riotId: 29 }, { id: "udyr", riotId: 77 }, { id: "urgot", riotId: 6 },
    { id: "varus", riotId: 110 }, { id: "vayne", riotId: 67 }, { id: "veigar", riotId: 45 }, { id: "velkoz", riotId: 161 },
    { id: "vex", riotId: 711 }, { id: "vi", riotId: 254 }, { id: "viego", riotId: 234 }, { id: "viktor", riotId: 112 },
    { id: "vladimir", riotId: 8 }, { id: "volibear", riotId: 106 }, { id: "warwick", riotId: 19 }, { id: "wukong", riotId: 62 },
    { id: "xayah", riotId: 498 }, { id: "xerath", riotId: 101 }, { id: "xinzhao", riotId: 5 }, { id: "yasuo", riotId: 157 },
    { id: "yone", riotId: 777 }, { id: "yorick", riotId: 83 }, { id: "yuumi", riotId: 350 }, { id: "zac", riotId: 154 },
    { id: "zed", riotId: 238 }, { id: "zeri", riotId: 221 }, { id: "ziggs", riotId: 115 }, { id: "zilean", riotId: 26 },
    { id: "zoe", riotId: 142 }, { id: "zyra", riotId: 143 }, { id: "locke", riotId: 805 }, { id: "yunara", riotId: 804 },
    { id: "zaahen", riotId: 904 }
];

const divisions = ["I", "II", "III", "IV"];

let frequencyTable = [];
let usedPuuids = [];
let apiAccessCount = 0;
let totalSamples = 0;
let datasetStartedAt = null;

const startTime = Date.now();

fs.writeFileSync(LOG_PATH, ''); //clear last run's log so this file only ever shows the last hour
loadCurrentState();
while (!isDoneCheck() && apiAccessCount < MAX_API_CALLS) {
    await sampleAGame();
}
if (isDoneCheck()) {
    writeChampionRoleStats(frequencyTable);
}
writeFinalState();

//logs run time if any sampling was done
if (apiAccessCount > 0) {
    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
    log(`Run completed in ${elapsedSeconds}s (${apiAccessCount} API calls)`);
}

//gets the current information stored from previous runs
function loadCurrentState() {
    if (!fs.existsSync(ROLE_FREQUENCY_TABLE_PATH)) {
        frequencyTable = buildEmptyFrequencyTable();
        usedPuuids = [];
        datasetStartedAt = Date.now();
        log('No existing database found, starting fresh sampling');
    } else {
        const savedState = JSON.parse(fs.readFileSync(ROLE_FREQUENCY_TABLE_PATH, 'utf8'));
        frequencyTable = savedState.frequencyTable;
        usedPuuids = savedState.usedPuuids;
        datasetStartedAt = savedState.datasetStartedAt;

        const isComplete = isDoneCheck();
        const isStale = Date.now() - datasetStartedAt > DATASET_MAX_AGE_MS;

        if (isComplete && isStale) {
            frequencyTable = buildEmptyFrequencyTable();
            usedPuuids = [];
            datasetStartedAt = Date.now();
            log('Current database outdated, starting fresh sampling');
        } else if (isComplete) {
            log("Current complete database doesn't need updating");
        } else {
            log('Database incomplete, will continue sampling');
        }
    }

    let sum = 0;
    for (const champion of Object.values(frequencyTable)) {
        sum += champion.tally;
    }
    totalSamples = sum;
}

function buildEmptyFrequencyTable() {
    const emptyTable = {};
    championList.forEach(champion => {
        emptyTable[champion.riotId] = { id: champion.id, top: 0, jng: 0, mid: 0, bot: 0, sup: 0, tally: 0, confidence: null, done: false };
    });
    return emptyTable;
}

function log(message) {
    console.log(message);
    fs.appendFileSync(LOG_PATH, message + '\n');
}

// all riot api calls use this
async function riotFetch(url, errorContext) {
    const response = await fetch(url, { headers: { "X-Riot-Token": RIOT_API_KEY } });
    apiAccessCount++;
    //log every sso many apri calls to mark progress when watching the log live
    if (apiAccessCount % 100 === 0) {
        log('-----------------------------------------------------------');
        log(`${Math.round(apiAccessCount / MAX_API_CALLS * 100)}% THROUGH (${apiAccessCount}/${MAX_API_CALLS} API CALLS)`);
        log('-----------------------------------------------------------');
    }
    if (response.status === 429) {
        //rate limited so waitrs the instructed time before trying again
        const retryAfterSeconds = Number(response.headers.get("Retry-After")) || 1;
        log(`Rate limited fetching ${errorContext}, waiting ${retryAfterSeconds}s`);
        await new Promise(resolve => setTimeout(resolve, retryAfterSeconds * 1000));
        return riotFetch(url, errorContext);
    }
    if (!response.ok) {
        log(`FAILED to fetch ${errorContext} (${response.status})`);
        throw new Error(`Failed to fetch ${errorContext} (${response.status})`);
    }
    return response.json();
}

//provides a random rank weighted by the proportion of players in that rank (master+ is grouped as APEX)
function getWeightedRandomRank() {
    const r = Math.random();
    let total = 0;
    for (const rank of rankDistribution) {
        total += rank.proportion;
        if (r <= total) {
            return rank.name;
        }
    }
    return "error - no rank";
}

//fetch a random player's puuid for a given rank, unique function for APEX 
async function getPlayerWithRank(rank) {
    let puuid;
    if (rank == "APEX") {
        puuid = await getApexPlayer();
    } else {
        const division = divisions[Math.floor(Math.random() * divisions.length)];
        let entries;
        do {
            const page = Math.floor(Math.random() * MAX_PAGE) + 1;
            entries = await riotFetch(
                `https://${PLATFORM_ROUTE}.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/${rank}/${division}?page=${page}`,
                `${rank} ${division} players`
            );
        } while (entries.length === 0);

        const entry = entries[Math.floor(Math.random() * entries.length)];
        puuid = entry.puuid;
    }
    return puuid;
}

async function getApexPlayer() {
    const rankEndpoints = ["masterleagues", "grandmasterleagues", "challengerleagues"];
    let combinedEntries = [];

    for (const endpoint of rankEndpoints) {
        const rankList = await riotFetch(
            `https://${PLATFORM_ROUTE}.api.riotgames.com/lol/league/v4/${endpoint}/by-queue/RANKED_SOLO_5x5`,
            endpoint
        );
        combinedEntries = combinedEntries.concat(rankList.entries);
    }

    const entry = combinedEntries[Math.floor(Math.random() * combinedEntries.length)];
    return entry.puuid;
}

//fetch a random match with its players, champions and roles from the players match history
async function getMatchFromPuuid(puuid) {
    const matchIds = await riotFetch(
        `https://${REGIONAL_ROUTE}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&count=20`,
        `match ids for puuid ${puuid}`
    );
    if (matchIds.length === 0) {
        return null;
    }
    const matchId = matchIds[Math.floor(Math.random() * matchIds.length)];

    const match = await riotFetch(
        `https://${REGIONAL_ROUTE}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
        `match ${matchId}`
    );
    return match.info.participants.map(participant => ({
        puuid: participant.puuid,
        championId: participant.championId,
        role: participant.teamPosition
    }));
}

//updates the role tallies
function updateChampionTallies(matchInfo) {
    matchInfo.forEach(player => {
        const puuid = player.puuid;
        const championId = player.championId;
        const role = roleNames[player.role];
        if (!usedPuuids.includes(puuid)) {
            usedPuuids.push(puuid);
            frequencyTable[championId][role]++;
            frequencyTable[championId].tally++;
            totalSamples++;
            log(`${frequencyTable[championId].id} ${role} -> ${frequencyTable[championId][role]}`);
            updateConfidenceForChampion(championId);
            if (!frequencyTable[championId].done) {
                updateDoneForChampion(championId);
            }
        }
    });
    log('----------------');
}

// standard normal CDF, via the Abramowitz & Stegun approximation of erf - copied and pasted
function normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (z > 0) prob = 1 - prob;
    return prob;
}

//updates the calculated confidence for a champion
function updateConfidenceForChampion(championId) {
    let leadCount = 0;
    let secondCount = 0;
    for (const role of Object.values(roleNames)) {
        const roleTally = frequencyTable[championId][role];
        if (roleTally > leadCount) {
            secondCount = leadCount;
            leadCount = roleTally;
        } else if (roleTally > secondCount) {
            secondCount = roleTally;
        }
    }
    const adjustedLead = leadCount + 0.5;
    const adjustedSecond = secondCount + 0.5;
    const leadersShare = adjustedLead / (adjustedLead + adjustedSecond);
    const summedCount = adjustedLead + adjustedSecond;
    const z = (leadersShare - 0.5) * Math.sqrt(summedCount) / Math.sqrt(leadersShare * (1 - leadersShare));
    frequencyTable[championId].confidence = normalCDF(z);
}

function updateDoneForChampion(championId) {
    const champion = frequencyTable[championId];
    if (champion.tally > 200) {
        champion.done = true;
        log(`${champion.id} marked as done (${champion.tally} tallies)`);
    } else if (champion.confidence > 0.95 && champion.tally > 20) {
        champion.done = true;
        log(`${champion.id} marked as done (${(champion.confidence * 100).toFixed(1)}% confidence)`);
    } else if (champion.tally / totalSamples < 0.003 && champion.tally > 100) {
        champion.done = true;
        log(`${champion.id} marked as done (rarely played, ${champion.tally} tallies in ${totalSamples} samples, ${(champion.tally / totalSamples * 100).toFixed(2)}%)`);
    }
}

function isDoneCheck() {
    return Object.values(frequencyTable).every(champion => champion.done);
}

async function sampleAGame() {
    const rank = getWeightedRandomRank();
    let matchInfo;
    do {
        const puuid = await getPlayerWithRank(rank);
        matchInfo = usedPuuids.includes(puuid) ? null : await getMatchFromPuuid(puuid);
    } while (!matchInfo);
    updateChampionTallies(matchInfo);
}

//writes the final dictionary to the file
function writeChampionRoleStats(frequencyTable) {
    //simplifies the array down to just each champion and its single most-played role
    const mostPlayedRoles = {};
    for (const champion of Object.values(frequencyTable)) {
        const championId = champion.id;
        let mostPopularRole;
        let highestTally = 0;
        for (const role of Object.values(roleNames)) {
            const roleTally = champion[role];
            if (roleTally > highestTally) {
                mostPopularRole = role;
                highestTally = roleTally;
            }
        }
        mostPlayedRoles[championId] = mostPopularRole;
    }

    fs.writeFileSync(CHAMPION_ROLE_PATH, JSON.stringify(mostPlayedRoles, null, 2));
}

//writes both the used puuids and the frequency table, so the next scheduled run can resume from here
function writeFinalState() {
    const state = { frequencyTable, usedPuuids, datasetStartedAt };
    fs.writeFileSync(ROLE_FREQUENCY_TABLE_PATH, JSON.stringify(state, null, 2));
}