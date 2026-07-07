import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, where, documentId, onSnapshot, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAjw225d9CafVdJbnFSYW9Y6EsRH7GFnxI",
    authDomain: "globetrotter-ff0b2.firebaseapp.com",
    projectId: "globetrotter-ff0b2",
    storageBucket: "globetrotter-ff0b2.firebasestorage.app",
    messagingSenderId: "813121338964",
    appId: "1:813121338964:web:a0d9b74908ac8d4810f7c1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//game info
const roles = [
    { role: "top", iconDim: "Role Icons/icon-position-top-disabled.png", iconHover: "Role Icons/icon-position-top-hover.png", iconSelected: "Role Icons/icon-position-top.png" },
    { role: "jng", iconDim: "Role Icons/icon-position-jungle-disabled.png", iconHover: "Role Icons/icon-position-jungle-hover.png", iconSelected: "Role Icons/icon-position-jungle.png" },
    { role: "mid", iconDim: "Role Icons/icon-position-middle-disabled.png", iconHover: "Role Icons/icon-position-middle-hover.png", iconSelected: "Role Icons/icon-position-middle.png" },
    { role: "bot", iconDim: "Role Icons/icon-position-bottom-disabled.png", iconHover: "Role Icons/icon-position-bottom-hover.png", iconSelected: "Role Icons/icon-position-bottom.png" },
    { role: "sup", iconDim: "Role Icons/icon-position-utility-disabled.png", iconHover: "Role Icons/icon-position-utility-hover.png", iconSelected: "Role Icons/icon-position-utility.png" }
];

const regions = [
    { id: "piltover", challengeName: "Calculated", regionName: "Piltover", indexNo: 0 },
    { id: "zaun", challengeName: "Chemtech Comrades", regionName: "Zaun", indexNo: 1 },
    { id: "demacia", challengeName: "FOR DEMACIA", regionName: "Demacia", indexNo: 2 },
    { id: "noxus", challengeName: "Strength Above All", regionName: "Noxus", indexNo: 3 },
    { id: "ionia", challengeName: "Everybody was Wuju Fighting", regionName: "Ionia", indexNo: 4 },
    { id: "freljord", challengeName: "Ice, Ice, Baby", regionName: "Freljord", indexNo: 5 },
    { id: "shurima", challengeName: "The Sun Disc Never Sets", regionName: "Shurima", indexNo: 6 },
    { id: "targon", challengeName: "Peak Performance", regionName: "Targon", indexNo: 7 },
    { id: "bilgewater", challengeName: "All Hands on Deck", regionName: "Bilgewater", indexNo: 8 },
    { id: "ixtal", challengeName: "Elemental, My Dear Watson", regionName: "Ixtal", indexNo: 9 },
    { id: "shadow-isles", challengeName: "Spooky Scary Skeletons", regionName: "Shadow Isles", indexNo: 10 },
    { id: "void", challengeName: "(Inhuman Screeching Sounds)", regionName: "the Void", indexNo: 11 },
    { id: "bandle-city", challengeName: "5 Under 5'", regionName: "Bandle City", indexNo: 12 }
];

const champions = [
    { id: "aatrox", name: "Aatrox", regions: [], iconPath: "Champion Icons/Aatrox.png" },
    { id: "ahri", name: "Ahri", regions: ["ionia"], iconPath: "Champion Icons/Ahri.png" },
    { id: "akali", name: "Akali", regions: ["ionia"], iconPath: "Champion Icons/Akali.png" },
    { id: "akshan", name: "Akshan", regions: ["shurima"], iconPath: "Champion Icons/Akshan.png" },
    { id: "alistar", name: "Alistar", regions: [], iconPath: "Champion Icons/Alistar.png" },
    { id: "ambessa", name: "Ambessa", regions: ["noxus"], iconPath: "Champion Icons/Ambessa.png" },
    { id: "amumu", name: "Amumu", regions: ["shurima"], iconPath: "Champion Icons/Amumu.png" },
    { id: "anivia", name: "Anivia", regions: ["freljord"], iconPath: "Champion Icons/Anivia.png" },
    { id: "annie", name: "Annie", regions: [], iconPath: "Champion Icons/Annie.png" },
    { id: "aphelios", name: "Aphelios", regions: ["targon"], iconPath: "Champion Icons/Aphelios.png" },
    { id: "ashe", name: "Ashe", regions: ["freljord"], iconPath: "Champion Icons/Ashe.png" },
    { id: "aurelionsol", name: "Aurelion Sol", regions: ["targon"], iconPath: "Champion Icons/Aurelion Sol.png" },
    { id: "aurora", name: "Aurora", regions: ["freljord"], iconPath: "Champion Icons/Aurora.png" },
    { id: "azir", name: "Azir", regions: ["shurima"], iconPath: "Champion Icons/Azir.png" },
    { id: "bard", name: "Bard", regions: [], iconPath: "Champion Icons/Bard.png" },
    { id: "belveth", name: "Bel'Veth", regions: ["void"], iconPath: "Champion Icons/Bel'Veth.png" },
    { id: "blitzcrank", name: "Blitzcrank", regions: ["zaun"], iconPath: "Champion Icons/Blitzcrank.png" },
    { id: "brand", name: "Brand", regions: [], iconPath: "Champion Icons/Brand.png" },
    { id: "braum", name: "Braum", regions: ["freljord"], iconPath: "Champion Icons/Braum.png" },
    { id: "briar", name: "Briar", regions: ["noxus"], iconPath: "Champion Icons/Briar.png" },
    { id: "caitlyn", name: "Caitlyn", regions: ["piltover"], iconPath: "Champion Icons/Caitlyn.png" },
    { id: "camille", name: "Camille", regions: ["piltover"], iconPath: "Champion Icons/Camille.png" },
    { id: "cassiopeia", name: "Cassiopeia", regions: ["noxus"], iconPath: "Champion Icons/Cassiopeia.png" },
    { id: "chogath", name: "Cho'Gath", regions: ["void"], iconPath: "Champion Icons/Cho'Gath.png" },
    { id: "corki", name: "Corki", regions: ["piltover","bandle-city"], iconPath: "Champion Icons/Corki.png" },
    { id: "darius", name: "Darius", regions: ["noxus"], iconPath: "Champion Icons/Darius.png" },
    { id: "diana", name: "Diana", regions: ["targon"], iconPath: "Champion Icons/Diana.png" },
    { id: "drmundo", name: "Dr. Mundo", regions: ["zaun"], iconPath: "Champion Icons/Dr. Mundo.png" },
    { id: "draven", name: "Draven", regions: ["noxus"], iconPath: "Champion Icons/Draven.png" },
    { id: "ekko", name: "Ekko", regions: ["zaun"], iconPath: "Champion Icons/Ekko.png" },
    { id: "elise", name: "Elise", regions: ["shadow-isles"], iconPath: "Champion Icons/Elise.png" },
    { id: "evelynn", name: "Evelynn", regions: [], iconPath: "Champion Icons/Evelynn.png" },
    { id: "ezreal", name: "Ezreal", regions: ["piltover"], iconPath: "Champion Icons/Ezreal.png" },
    { id: "fiddlesticks", name: "Fiddlesticks", regions: ["shadow-isles"], iconPath: "Champion Icons/Fiddlesticks.png" },
    { id: "fiora", name: "Fiora", regions: ["demacia"], iconPath: "Champion Icons/Fiora.png" },
    { id: "fizz", name: "Fizz", regions: ["bilgewater","bandle-city"], iconPath: "Champion Icons/Fizz.png" },
    { id: "galio", name: "Galio", regions: ["demacia"], iconPath: "Champion Icons/Galio.png" },
    { id: "gangplank", name: "Gangplank", regions: ["bilgewater"], iconPath: "Champion Icons/Gangplank.png" },
    { id: "garen", name: "Garen", regions: ["demacia"], iconPath: "Champion Icons/Garen.png" },
    { id: "gnar", name: "Gnar", regions: ["freljord","bandle-city"], iconPath: "Champion Icons/Gnar.png" },
    { id: "gragas", name: "Gragas", regions: ["freljord"], iconPath: "Champion Icons/Gragas.png" },
    { id: "graves", name: "Graves", regions: ["bilgewater"], iconPath: "Champion Icons/Graves.png" },
    { id: "gwen", name: "Gwen", regions: ["shadow-isles"], iconPath: "Champion Icons/Gwen.png" },
    { id: "hecarim", name: "Hecarim", regions: ["shadow-isles"], iconPath: "Champion Icons/Hecarim.png" },
    { id: "heimerdinger", name: "Heimerdinger", regions: ["piltover","bandle-city"], iconPath: "Champion Icons/Heimerdinger.png" },
    { id: "hwei", name: "Hwei", regions: ["ionia"], iconPath: "Champion Icons/Hwei.png" },
    { id: "illaoi", name: "Illaoi", regions: ["bilgewater"], iconPath: "Champion Icons/Illaoi.png" },
    { id: "irelia", name: "Irelia", regions: ["ionia"], iconPath: "Champion Icons/Irelia.png" },
    { id: "ivern", name: "Ivern", regions: ["ionia"], iconPath: "Champion Icons/Ivern.png" },
    { id: "janna", name: "Janna", regions: ["zaun"], iconPath: "Champion Icons/Janna.png" },
    { id: "jarvaniv", name: "Jarvan IV", regions: ["demacia"], iconPath: "Champion Icons/Jarvan IV.png" },
    { id: "jax", name: "Jax", regions: [], iconPath: "Champion Icons/Jax.png" },
    { id: "jayce", name: "Jayce", regions: ["piltover"], iconPath: "Champion Icons/Jayce.png" },
    { id: "jhin", name: "Jhin", regions: ["ionia"], iconPath: "Champion Icons/Jhin.png" },
    { id: "jinx", name: "Jinx", regions: ["zaun"], iconPath: "Champion Icons/Jinx.png" },
    { id: "ksante", name: "K'Sante", regions: ["shurima"], iconPath: "Champion Icons/K'Sante.png" },
    { id: "kaisa", name: "Kai'Sa", regions: ["void"], iconPath: "Champion Icons/Kai'Sa.png" },
    { id: "kalista", name: "Kalista", regions: ["shadow-isles"], iconPath: "Champion Icons/Kalista.png" },
    { id: "karma", name: "Karma", regions: ["ionia"], iconPath: "Champion Icons/Karma.png" },
    { id: "karthus", name: "Karthus", regions: ["shadow-isles"], iconPath: "Champion Icons/Karthus.png" },
    { id: "kassadin", name: "Kassadin", regions: ["void"], iconPath: "Champion Icons/Kassadin.png" },
    { id: "katarina", name: "Katarina", regions: ["noxus"], iconPath: "Champion Icons/Katarina.png" },
    { id: "kayle", name: "Kayle", regions: ["demacia"], iconPath: "Champion Icons/Kayle.png" },
    { id: "kayn", name: "Kayn", regions: ["ionia"], iconPath: "Champion Icons/Kayn.png" },
    { id: "kennen", name: "Kennen", regions: ["ionia","bandle-city"], iconPath: "Champion Icons/Kennen.png" },
    { id: "khazix", name: "Kha'Zix", regions: ["void"], iconPath: "Champion Icons/Kha'Zix.png" },
    { id: "kindred", name: "Kindred", regions: [], iconPath: "Champion Icons/Kindred.png" },
    { id: "kled", name: "Kled", regions: ["noxus","bandle-city"], iconPath: "Champion Icons/Kled.png" },
    { id: "kogmaw", name: "Kog'Maw", regions: ["void"], iconPath: "Champion Icons/Kog'Maw.png" },
    { id: "leblanc", name: "LeBlanc", regions: ["noxus"], iconPath: "Champion Icons/LeBlanc.png" },
    { id: "leesin", name: "Lee Sin", regions: ["ionia"], iconPath: "Champion Icons/Lee Sin.png" },
    { id: "leona", name: "Leona", regions: ["targon"], iconPath: "Champion Icons/Leona.png" },
    { id: "lillia", name: "Lillia", regions: ["ionia"], iconPath: "Champion Icons/Lillia.png" },
    { id: "lissandra", name: "Lissandra", regions: ["freljord"], iconPath: "Champion Icons/Lissandra.png" },
    { id: "lucian", name: "Lucian", regions: ["demacia"], iconPath: "Champion Icons/Lucian.png" },
    { id: "lulu", name: "Lulu", regions: ["bandle-city"], iconPath: "Champion Icons/Lulu.png" },
    { id: "lux", name: "Lux", regions: ["demacia"], iconPath: "Champion Icons/Lux.png" },
    { id: "malphite", name: "Malphite", regions: ["ixtal"], iconPath: "Champion Icons/Malphite.png" },
    { id: "malzahar", name: "Malzahar", regions: ["void"], iconPath: "Champion Icons/Malzahar.png" },
    { id: "maokai", name: "Maokai", regions: ["shadow-isles"], iconPath: "Champion Icons/Maokai.png" },
    { id: "masteryi", name: "Master Yi", regions: ["ionia"], iconPath: "Champion Icons/Master Yi.png" },
    { id: "mel", name: "Mel", regions: ["noxus"], iconPath: "Champion Icons/Mel.png" },
    { id: "milio", name: "Milio", regions: ["ixtal"], iconPath: "Champion Icons/Milio.png" },
    { id: "missfortune", name: "Miss Fortune", regions: ["bilgewater"], iconPath: "Champion Icons/Miss Fortune.png" },
    { id: "mordekaiser", name: "Mordekaiser", regions: ["noxus"], iconPath: "Champion Icons/Mordekaiser.png" },
    { id: "morgana", name: "Morgana", regions: ["demacia"], iconPath: "Champion Icons/Morgana.png" },
    { id: "naafiri", name: "Naafiri", regions: ["shurima"], iconPath: "Champion Icons/Naafiri.png" },
    { id: "nami", name: "Nami", regions: [], iconPath: "Champion Icons/Nami.png" },
    { id: "nasus", name: "Nasus", regions: ["shurima"], iconPath: "Champion Icons/Nasus.png" },
    { id: "nautilus", name: "Nautilus", regions: ["bilgewater"], iconPath: "Champion Icons/Nautilus.png" },
    { id: "neeko", name: "Neeko", regions: ["ixtal"], iconPath: "Champion Icons/Neeko.png" },
    { id: "nidalee", name: "Nidalee", regions: ["ixtal"], iconPath: "Champion Icons/Nidalee.png" },
    { id: "nilah", name: "Nilah", regions: ["bilgewater"], iconPath: "Champion Icons/Nilah.png" },
    { id: "nocturne", name: "Nocturne", regions: [], iconPath: "Champion Icons/Nocturne.png" },
    { id: "nunu", name: "Nunu & Willump", regions: ["freljord"], iconPath: "Champion Icons/Nunu & Willump.png" },
    { id: "olaf", name: "Olaf", regions: ["freljord"], iconPath: "Champion Icons/Olaf.png" },
    { id: "orianna", name: "Orianna", regions: ["piltover"], iconPath: "Champion Icons/Orianna.png" },
    { id: "ornn", name: "Ornn", regions: ["freljord"], iconPath: "Champion Icons/Ornn.png" },
    { id: "pantheon", name: "Pantheon", regions: ["targon"], iconPath: "Champion Icons/Pantheon.png" },
    { id: "poppy", name: "Poppy", regions: ["demacia","bandle-city"], iconPath: "Champion Icons/Poppy.png" },
    { id: "pyke", name: "Pyke", regions: ["bilgewater"], iconPath: "Champion Icons/Pyke.png" },
    { id: "qiyana", name: "Qiyana", regions: ["ixtal"], iconPath: "Champion Icons/Qiyana.png" },
    { id: "quinn", name: "Quinn", regions: ["demacia"], iconPath: "Champion Icons/Quinn.png" },
    { id: "rakan", name: "Rakan", regions: ["ionia"], iconPath: "Champion Icons/Rakan.png" },
    { id: "rammus", name: "Rammus", regions: ["shurima"], iconPath: "Champion Icons/Rammus.png" },
    { id: "reksai", name: "Rek'Sai", regions: ["void"], iconPath: "Champion Icons/Rek'Sai.png" },
    { id: "rell", name: "Rell", regions: ["noxus"], iconPath: "Champion Icons/Rell.png" },
    { id: "renata", name: "Renata Glasc", regions: ["zaun"], iconPath: "Champion Icons/Renata Glasc.png" },
    { id: "renekton", name: "Renekton", regions: ["shurima"], iconPath: "Champion Icons/Renekton.png" },
    { id: "rengar", name: "Rengar", regions: ["ixtal"], iconPath: "Champion Icons/Rengar.png" },
    { id: "riven", name: "Riven", regions: ["noxus"], iconPath: "Champion Icons/Riven.png" },
    { id: "rumble", name: "Rumble", regions: ["bandle-city"], iconPath: "Champion Icons/Rumble.png" },
    { id: "ryze", name: "Ryze", regions: [], iconPath: "Champion Icons/Ryze.png" },
    { id: "samira", name: "Samira", regions: ["noxus"], iconPath: "Champion Icons/Samira.png" },
    { id: "sejuani", name: "Sejuani", regions: ["freljord"], iconPath: "Champion Icons/Sejuani.png" },
    { id: "senna", name: "Senna", regions: ["shadow-isles"], iconPath: "Champion Icons/Senna.png" },
    { id: "seraphine", name: "Seraphine", regions: ["piltover"], iconPath: "Champion Icons/Seraphine.png" },
    { id: "sett", name: "Sett", regions: ["ionia"], iconPath: "Champion Icons/Sett.png" },
    { id: "shaco", name: "Shaco", regions: [], iconPath: "Champion Icons/Shaco.png" },
    { id: "shen", name: "Shen", regions: ["ionia"], iconPath: "Champion Icons/Shen.png" },
    { id: "shyvana", name: "Shyvana", regions: ["demacia"], iconPath: "Champion Icons/Shyvana.png" },
    { id: "singed", name: "Singed", regions: ["zaun"], iconPath: "Champion Icons/Singed.png" },
    { id: "sion", name: "Sion", regions: ["noxus"], iconPath: "Champion Icons/Sion.png" },
    { id: "sivir", name: "Sivir", regions: ["shurima"], iconPath: "Champion Icons/Sivir.png" },
    { id: "skarner", name: "Skarner", regions: ["ixtal"], iconPath: "Champion Icons/Skarner.png" },
    { id: "smolder", name: "Smolder", regions: [], iconPath: "Champion Icons/Smolder.png" },
    { id: "sona", name: "Sona", regions: ["demacia"], iconPath: "Champion Icons/Sona.png" },
    { id: "soraka", name: "Soraka", regions: ["targon"], iconPath: "Champion Icons/Soraka.png" },
    { id: "swain", name: "Swain", regions: ["noxus"], iconPath: "Champion Icons/Swain.png" },
    { id: "sylas", name: "Sylas", regions: ["demacia"], iconPath: "Champion Icons/Sylas.png" },
    { id: "syndra", name: "Syndra", regions: ["ionia"], iconPath: "Champion Icons/Syndra.png" },
    { id: "tahmkench", name: "Tahm Kench", regions: ["bilgewater"], iconPath: "Champion Icons/Tahm Kench.png" },
    { id: "taliyah", name: "Taliyah", regions: ["shurima"], iconPath: "Champion Icons/Taliyah.png" },
    { id: "talon", name: "Talon", regions: ["noxus"], iconPath: "Champion Icons/Talon.png" },
    { id: "taric", name: "Taric", regions: ["targon"], iconPath: "Champion Icons/Taric.png" },
    { id: "teemo", name: "Teemo", regions: ["bandle-city"], iconPath: "Champion Icons/Teemo.png" },
    { id: "thresh", name: "Thresh", regions: ["shadow-isles"], iconPath: "Champion Icons/Thresh.png" },
    { id: "tristana", name: "Tristana", regions: ["bandle-city"], iconPath: "Champion Icons/Tristana.png" },
    { id: "trundle", name: "Trundle", regions: ["freljord"], iconPath: "Champion Icons/Trundle.png" },
    { id: "tryndamere", name: "Tryndamere", regions: ["freljord"], iconPath: "Champion Icons/Tryndamere.png" },
    { id: "twistedfate", name: "Twisted Fate", regions: ["bilgewater"], iconPath: "Champion Icons/Twisted Fate.png" },
    { id: "twitch", name: "Twitch", regions: ["zaun"], iconPath: "Champion Icons/Twitch.png" },
    { id: "udyr", name: "Udyr", regions: ["freljord"], iconPath: "Champion Icons/Udyr.png" },
    { id: "urgot", name: "Urgot", regions: ["zaun"], iconPath: "Champion Icons/Urgot.png" },
    { id: "varus", name: "Varus", regions: ["ionia"], iconPath: "Champion Icons/Varus.png" },
    { id: "vayne", name: "Vayne", regions: ["demacia"], iconPath: "Champion Icons/Vayne.png" },
    { id: "veigar", name: "Veigar", regions: ["bandle-city"], iconPath: "Champion Icons/Veigar.png" },
    { id: "velkoz", name: "Vel'Koz", regions: ["void"], iconPath: "Champion Icons/Vel'Koz.png" },
    { id: "vex", name: "Vex", regions: ["shadow-isles","bandle-city"], iconPath: "Champion Icons/Vex.png" },
    { id: "vi", name: "Vi", regions: ["piltover"], iconPath: "Champion Icons/Vi.png" },
    { id: "viego", name: "Viego", regions: ["shadow-isles"], iconPath: "Champion Icons/Viego.png" },
    { id: "viktor", name: "Viktor", regions: ["zaun"], iconPath: "Champion Icons/Viktor.png" },
    { id: "vladimir", name: "Vladimir", regions: ["noxus"], iconPath: "Champion Icons/Vladimir.png" },
    { id: "volibear", name: "Volibear", regions: ["freljord"], iconPath: "Champion Icons/Volibear.png" },
    { id: "warwick", name: "Warwick", regions: ["zaun"], iconPath: "Champion Icons/Warwick.png" },
    { id: "wukong", name: "Wukong", regions: ["ionia"], iconPath: "Champion Icons/Wukong.png" },
    { id: "xayah", name: "Xayah", regions: ["ionia"], iconPath: "Champion Icons/Xayah.png" },
    { id: "xerath", name: "Xerath", regions: ["shurima"], iconPath: "Champion Icons/Xerath.png" },
    { id: "xinzhao", name: "Xin Zhao", regions: ["demacia"], iconPath: "Champion Icons/Xin Zhao.png" },
    { id: "yasuo", name: "Yasuo", regions: ["ionia"], iconPath: "Champion Icons/Yasuo.png" },
    { id: "yone", name: "Yone", regions: ["ionia"], iconPath: "Champion Icons/Yone.png" },
    { id: "yorick", name: "Yorick", regions: ["shadow-isles"], iconPath: "Champion Icons/Yorick.png" },
    { id: "yuumi", name: "Yuumi", regions: ["bandle-city"], iconPath: "Champion Icons/Yuumi.png" },
    { id: "zac", name: "Zac", regions: ["zaun"], iconPath: "Champion Icons/Zac.png" },
    { id: "zed", name: "Zed", regions: ["ionia"], iconPath: "Champion Icons/Zed.png" },
    { id: "zeri", name: "Zeri", regions: ["zaun"], iconPath: "Champion Icons/Zeri.png" },
    { id: "ziggs", name: "Ziggs", regions: ["zaun","bandle-city"], iconPath: "Champion Icons/Ziggs.png" },
    { id: "zilean", name: "Zilean", regions: [], iconPath: "Champion Icons/Zilean.png" },
    { id: "zoe", name: "Zoe", regions: ["targon"], iconPath: "Champion Icons/Zoe.png" },
    { id: "zyra", name: "Zyra", regions: ["ixtal"], iconPath: "Champion Icons/Zyra.png" },
    { id: "locke", name: "Locke", regions: ["demacia"], iconPath: "Champion Icons/Locke.png" },
    { id: "yunara", name: "Yunara", regions: ["ionia"], iconPath: "Champion Icons/Yunara.png" },
    { id: "zaahen", name: "Zaahen", regions: [], iconPath: "Champion Icons/Zaahen.png" }
];

//variables for tracking where on the page the user is and what is being done
let currentFlow = null;       // modal currently in focus
let currentPlayerName = null; // name being created, or player being edited
let currentRegionIndex = 0;   // position in the regions array, for the new-player flow
let currentRegionId = null;   // the region the regional modal is currently open for
let pendingPreferences = {};  // in-memory data collected before final save
let selectedChampionId = null;// the champion currently chosen in the champion dropdown, or null if none picked yet
let selectedRole = null;// the role currently chosen in the dropdown, or null if none picked yet

//HOMEPAGE FUNCTIONS

//set up consts
const regionButtons = document.querySelectorAll('.region-btn');
const playerSlots = document.querySelectorAll('.player-slot');
const compContent = document.getElementById("comp-content");

//the comp column's view depends on all three of these, so each is kept up to date
//by whichever onSnapshot listener owns that doc, and all three call refreshComp()
let latestActivePlayers = null;
let latestCurrentRegion = null;
let latestTeamComp = null;

//caches rebuilt by refreshCache() whenever activePlayers changes - region buttons and the comp
//column read from these instead of each recomputing their own check
let latestActivePlayersData = [];  // full preference docs for each active player, from getActivePlayersData()
let compsByRegion = {};             // generateAllPossibleComps(...) per region id - only meaningful with exactly 5 active players
let regionWillingness = {};         // hasEveryActivePlayerListedSomething(...) per region id - used with fewer than 5 active players

//true if every currently active player has at least one preference logged for this region
//(unlike isPossible, this doesn't need a full 5-player roster - it's the cheap check used to
//decide region button availability when there are fewer than 5 active players)
function hasEveryActivePlayerListedSomething(players, region) {
    if (players.length === 0) return false
    return players.every(player => player[region.indexNo].length > 0)
}

//true once there's a full 5-player roster - the single source of truth for this check,
//since a comp can only ever be generated with exactly 5 active players
function hasFullRoster() {
    return latestActivePlayersData.length === 5
}

//refetches each active player's full preference data, then recomputes either the full list of
//possible comps per region (if the roster is exactly 5) or the simpler willingness check per
//league region (if it isn't) - the shared cache that region-button activation and Generate Comp/Reroll
//all read from, so nothing else needs to redo this work itself
async function refreshCache(activePlayers) {
    const activeNames = activePlayers?.names || [];
    latestActivePlayersData = await getActivePlayersData(activeNames);
    compsByRegion = {};
    regionWillingness = {};

    regions.forEach(region => {
        if (hasFullRoster()) {
            compsByRegion[region.id] = generateAllPossibleComps(latestActivePlayersData, region);
        } else {
            regionWillingness[region.id] = hasEveryActivePlayerListedSomething(latestActivePlayersData, region);
        }
    });
}

//re-renders the players column, called whenever activePlayers changes in firestore
function refreshPlayers(activePlayers) {
    //names currently in the shared list, or an empty list if the doc has no data yet
    const names = activePlayers?.names || [];
    playerSlots.forEach((slot, index) => {
        //clear whichever content and styling this slot had last render
        slot.classList.remove('filled', 'add', 'empty');
        slot.innerHTML = '';
        if (index < names.length) {
            //this slot corresponds to an existing player: show their name and a delete button
            slot.classList.add('filled');
            const name = names[index];

            const nameSpan = document.createElement('span');
            nameSpan.textContent = name;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'player-slot-delete-btn';
            deleteBtn.textContent = '🗑';
            //removes this player from the shared list, refreshPlayers() then re-renders
            deleteBtn.addEventListener('click', () => removePlayerFromList(name));

            slot.appendChild(nameSpan);
            slot.appendChild(deleteBtn);
        } else if (index === names.length) {
            //this is the next free slot: show it as a clickable "+" button
            slot.classList.add('add');

            const addBtn = document.createElement('button');
            addBtn.className = 'player-slot-add-btn';
            addBtn.textContent = '+';
            addBtn.addEventListener('click', () => openSelectPlayerModal());

            slot.appendChild(addBtn);
        } else {
            //no player yet and not the next slot in line: leave empty
            slot.classList.add('empty');
        }
    });
}

//true if this region currently has at least one valid setup for the active players -
//compsByRegion only has real entries with exactly 5 active players, so this falls back to
//the simpler regionWillingness cache otherwise. shared by refreshRegions, refreshComp, and
//the check that deselects a region if it stops being feasible after the roster changes
function isRegionCurrentlyPossible(regionId) {
    return hasFullRoster()
        ? compsByRegion[regionId]?.length > 0
        : regionWillingness[regionId];
}

//re-renders the regions column: marks which region is selected, and disables any region that
//isn't currently feasible for the active players. called whenever either currentRegion or
//activePlayers changes in firestore, since both affect what gets shown here
function refreshRegions(currentRegion) {
    regionButtons.forEach(button => {
        const regionId = button.dataset.regionId;

        //mark the button matching the selected region, and unmark every other one
        if (regionId === currentRegion?.selectedRegionId) {
            button.classList.add('selected');
        } else {
            button.classList.remove('selected');
        }

        //disable the button if this region isn't currently feasible for the active players
        const isRegionPossible = isRegionCurrentlyPossible(regionId);
        button.disabled = !isRegionPossible;
        button.classList.toggle('impossible', !isRegionPossible);
    });
}

//re-renders the team composition column
//unlike the other two, this depends on all three shared docs, so it reads the latest
//stored copy of each rather than taking one as a parameter
function refreshComp() {
    compContent.innerHTML = '';

    if (latestTeamComp) {
        //a comp has already been generated: show it, the permutation count, and a reroll option
        //the permutation count is just the cached comps list's length - no need to store it separately
        const totalComps = compsByRegion[latestCurrentRegion?.selectedRegionId]?.length || 0;

        //iterate over roles (already ordered top/jng/mid/bot/sup) rather than latestTeamComp.comp,
        //whose order just depends on however the search happened to lock each player in
        roles.forEach(role => {
            const assignment = latestTeamComp.comp.find(entry => entry.role === role.role);
            const champion = champions.find(c => c.id === assignment.championId);
            const slot = document.createElement('div');
            slot.className = 'role-slot';
            slot.innerHTML = `
                <img src="${champion.iconPath}" class="region-entry-icon">
                <span>${assignment.name}</span>
                <img src="${role.iconSelected}" class="region-entry-icon">
            `;
            compContent.appendChild(slot);
        });

        const infoText = document.createElement('span');
        infoText.className = 'info-text';
        infoText.textContent = `Number of possible combinations: ${totalComps}`;
        compContent.appendChild(infoText);

        if (totalComps > 1) {
            const rerollBtn = document.createElement('button');
            rerollBtn.className = 'randomise-btn';
            rerollBtn.textContent = 'Roll A Different Comp';
            rerollBtn.addEventListener('click', generateComp);
            compContent.appendChild(rerollBtn);
        }
        return;
    }

    //not just "is a region selected" - the selected region may have since become infeasible
    //(e.g. the roster changed after it was picked), so check the cache directly
    const regionId = latestCurrentRegion?.selectedRegionId;
    const isSelectedRegionPossible = !!regionId && isRegionCurrentlyPossible(regionId);

    if (hasFullRoster() && isSelectedRegionPossible) {
        //everything needed is in place, offer to generate a comp
        const generateBtn = document.createElement('button');
        generateBtn.className = 'generate-comp-btn';
        generateBtn.textContent = 'Generate Comp';
        generateBtn.addEventListener('click', generateComp);
        compContent.appendChild(generateBtn);
    } else {
        //not enough set up yet to generate anything
        const message = document.createElement('p');
        message.className = 'comp-info-text';
        message.textContent = 'Enter players and a region';
        compContent.appendChild(message);
    }
}

//stub: will compute a valid role assignment for the active players and write it to
//gameState/teamComp as { assignments: [{name, role}, ...], permutationCount }
//shared by both the Generate Comp and Reroll buttons - picks a comp for the currently selected
// league region from the cache, avoiding any comp already shown until every option has been shown once
async function generateComp() {
    const regionId = latestCurrentRegion?.selectedRegionId;
    const allComps = compsByRegion[regionId] || [];
    if (allComps.length === 0) return;

    //don't repeat an already-shown comp until every option has been shown once
    let shownIndexes = latestTeamComp?.shownIndexes || [];
    let availableIndexes = allComps
        .map((_, index) => index)
        .filter(index => !shownIndexes.includes(index));

    if (availableIndexes.length === 0) {
        //every comp has been shown already - start a fresh cycle
        shownIndexes = [];
        availableIndexes = allComps.map((_, index) => index);
    }

    const chosenIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

    await setDoc(doc(db, "gameState", "teamComp"), {
        comp: allComps[chosenIndex],
        shownIndexes: [...shownIndexes, chosenIndex]
    });
}

//counts each undecided player's and undecided role's remaining options in a preferences list.
//every still-undecided name/role gets an entry - defaulting to 0 if it has no options left - so
//a decided player/role is simply absent from the table, and a 0 unambiguously means "no options
//left", without needing to cross-reference the roster or decisions list separately anywhere else
function buildFrequencyTable(preferences, allNames, decisions) {
    const decidedNames = new Set(decisions.map(entry => entry.name))
    const decidedRoles = new Set(decisions.map(entry => entry.role))

    const playerFrequency = {}
    allNames.forEach(name => {
        if (!decidedNames.has(name)) playerFrequency[name] = 0
    })

    const roleFrequency = {}
    roles.forEach(r => {
        if (!decidedRoles.has(r.role)) roleFrequency[r.role] = 0
    })

    preferences.forEach(entry => {
        if (entry.name in playerFrequency) playerFrequency[entry.name]++
        if (entry.role in roleFrequency) roleFrequency[entry.role]++
    })

    return { playerFrequency, roleFrequency }
}

//builds the full starting state for the comp resolver
function buildInitialState(players, region) {
    //flatten each active player's preferences for this region into {name, championId, role}
    //entries - a player who refused this region's challenge just won't appear at all
    const preferences = []
    players.forEach(player => {
        player[region.indexNo].forEach(item => {
            preferences.push({ name: player.name, championId: item.championId, role: item.role })
        })
    })

    const allNames = players.map(player => player.name)
    const decisions = []
    const { playerFrequency, roleFrequency } = buildFrequencyTable(preferences, allNames, decisions)

    return { preferences, playerFrequency, roleFrequency, allNames, decisions }
}

//recursive resolver - always returns a flat array of complete comps, never a single comp
//and never a nested array, so every return path and every merge has to respect that
function resolve(state, selection) {
    //if a selection was made, lock it into decisions and remove any remaining preferences that
    //now clash on player, role or champion - then rebuild the frequency tables, now scoped to
    //whichever players/roles are still undecided after adding this selection
    //(selection is null on the very first call, so decisions/preferences just pass through as-is)
    let { preferences, decisions, allNames } = state
    if (selection) {
        decisions = [...decisions, selection]
        preferences = preferences.filter(entry =>
            entry.name !== selection.name &&
            entry.role !== selection.role &&
            entry.championId !== selection.championId
        )
    }
    const { playerFrequency, roleFrequency } = buildFrequencyTable(preferences, allNames, decisions)
    const currentState = { preferences, playerFrequency, roleFrequency, allNames, decisions }

    //is this resolved? (decisions now covers all 5 players)
    if (decisions.length === 5) {
        return [decisions]
    }

    //one lookup covers impossible, forced-move and branching: find whichever undecided
    //player or role currently has the fewest options left, then branch on that count
    const candidates = [
        ...Object.keys(playerFrequency).map(name => ({ type: 'name', value: name, count: playerFrequency[name] })),
        ...Object.keys(roleFrequency).map(role => ({ type: 'role', value: role, count: roleFrequency[role] }))
    ]
    const lowest = candidates.reduce((a, b) => (b.count < a.count ? b : a))

    //0 left: this branch is impossible
    if (lowest.count === 0) {
        return []
    }

    //narrow down to just this player's or role's remaining options
    const options = lowest.type === 'name'
        ? preferences.filter(entry => entry.name === lowest.value)
        : preferences.filter(entry => entry.role === lowest.value)

    //exactly 1 left: forced move, recurse directly with that single choice
    if (lowest.count === 1) {
        return resolve(currentState, options[0])
    }

    //2 or more left: branch over every option, merging (not nesting) each branch's results
    let allComps = []
    options.forEach(option => {
        allComps = allComps.concat(resolve(currentState, option))
    })
    return allComps
}

//returns every valid comp for this region: the exhaustive list of assignments with 5 unique roles
//and 5 unique champions
function generateAllPossibleComps(players, region) {
    const initialState = buildInitialState(players, region)
    return resolve(initialState, null)
}

//draws one random comp out of every valid comp for this region
function pickRandomComp(players, region) {
    const allComps = generateAllPossibleComps(players, region)
    const randomIndex = Math.floor(Math.random() * allComps.length)
    return allComps[randomIndex]
}

//clears any previously generated comp, called whenever the players or region change since
//a comp generated for the old set-up no longer applies
async function resetComp() {
    await deleteDoc(doc(db, "gameState", "teamComp")).catch(() => { });
}

//deselects the current region if the active-players change just made it infeasible - the only
//thing that can invalidate an already-selected region is the roster changing, so this only
//needs calling from the activePlayers listener, after refreshCache() has rebuilt the caches
async function deselectRegionIfNowImpossible() {
    const regionId = latestCurrentRegion?.selectedRegionId;
    if (!regionId || isRegionCurrentlyPossible(regionId)) return;
    await deleteDoc(doc(db, "gameState", "currentRegion")).catch(() => { });
    //clear the local copy too, so this same pass renders as deselected rather than
    //waiting on the currentRegion listener's own round trip to catch up
    latestCurrentRegion = undefined;
}

//one listener per shared doc, so a change to one column never re-renders the others unnecessarily
//the comp column depends on all three, so every listener updates its stored copy and calls refreshComp()
onSnapshot(doc(db, "gameState", "activePlayers"), async (snapshot) => {
    latestActivePlayers = snapshot.data();
    refreshPlayers(latestActivePlayers);
    await refreshCache(latestActivePlayers);
    await deselectRegionIfNowImpossible();
    //if a region is still selected and still feasible with the new roster, regenerate a
    //fresh comp for it immediately instead of leaving the user to click Generate Comp again
    const regionId = latestCurrentRegion?.selectedRegionId;
    if (regionId && hasFullRoster() && isRegionCurrentlyPossible(regionId)) {
        await generateComp();
    }
    refreshRegions(latestCurrentRegion);
    refreshComp();
});

onSnapshot(doc(db, "gameState", "currentRegion"), (snapshot) => {
    latestCurrentRegion = snapshot.data();
    refreshRegions(latestCurrentRegion);
    refreshComp();
});

onSnapshot(doc(db, "gameState", "teamComp"), (snapshot) => {
    latestTeamComp = snapshot.data();
    refreshComp();
});

//MODAL FUNCTIONS

//shows a modal by adding the active class to its backdrop
function showModal(backdrop) {
    backdrop.classList.add("active");
}

//hides a modal by removing the active class from its backdrop
function hideModal(backdrop) {
    backdrop.classList.remove("active");
}

//NEW PLAYER MODAL

//set up consts
const newPlayerBackdrop = document.getElementById("new-player-modal-backdrop");
const newPlayerNameInput = document.getElementById("new-player-name-input");
const newPlayerNextBtn = document.getElementById("new-player-next-btn");
const newPlayerCloseBtn = document.getElementById("new-player-close-btn");
const newPlayerNameError = document.getElementById('new-player-name-error');

//function to start the modal
function openNewPlayerModal(name) {
    currentFlow = "new-player";
    newPlayerNameInput.value = name; //clears the input from any previous values
    newPlayerNameError.textContent = ''; //wipes any previous error message
    showModal(newPlayerBackdrop);
}

//functionality of each button

//checks if there is a name and if its taken before continuing to the next modal once next is clicked
newPlayerNextBtn.addEventListener("click", async () => {
    const name = newPlayerNameInput.value.trim();
    //check name is not blank and shake the box if it is
    if (!name) {
        newPlayerNameError.textContent = '';
        newPlayerNameInput.classList.add('shake');
        setTimeout(() => {
            newPlayerNameInput.classList.remove('shake');
        }, 300);
        return;
    }
    //check name doesnt already exist in the data base
    const taken = await isNameTaken(name);
    if (taken) {
        newPlayerNameError.textContent = 'That name is already taken.';
        return;
    }
    currentPlayerName = name;
    hideModal(newPlayerBackdrop);
    //start going thorough each region
    currentRegionIndex = 0;
    currentFlow = 'new-player';
    pendingPreferences = {};
    regions.forEach(region => {
        pendingPreferences[region.indexNo] = [];
    });
    openRegionalModal(currentRegionIndex, "local");

})

//closes the modal when the close button is clicked
newPlayerCloseBtn.addEventListener('click', () => {
    hideModal(newPlayerBackdrop);
});



//REGIONAL MODAL

//set up consts
const regionalBackdrop = document.getElementById("region-modal-backdrop");
const regionModalHeading = document.getElementById("region-modal-heading");
const regionsDropdown = document.getElementById("champion-dropdown");
const championDropdownToggle = document.getElementById("champion-dropdown-toggle");
const championDropdownList = document.getElementById("champion-dropdown-list");
const roleDropdown = document.getElementById("role-dropdown");
const roleDropdownToggle = document.getElementById("role-dropdown-toggle");
const roleDropdownList = document.getElementById("role-dropdown-list");
const regionAddBtn = document.getElementById("region-add-btn");
const regionEntriesError = document.getElementById("region-entries-error");
const regionEntriesList = document.getElementById("region-entries-list");
const regionDoneBtn = document.getElementById("region-done-btn");
const regionBackBtn = document.getElementById("region-back-btn");
const regionCloseBtn = document.getElementById("region-close-btn");


//function to start the modal
function openRegionalModal(regionIndex, source) {
    currentFlow = "regions";
    currentRegionId = regions[regionIndex].id;
    regionModalHeading.textContent = "Region: " + regions[regionIndex].regionName;
    if (source == "local") {
        //set up the list of champs from pending preferences
    } else if (source == "firestore") {
        //set up the list of champs from requesting info from the database
    }
    //reset the champion dropdown back to its starting state for this region
    selectedChampionId = null;
    championDropdownToggle.innerHTML = "Select champion &#9662;";
    championDropdownList.classList.remove('open');
    //reset the role dropdown back to its starting state too
    selectedRole = null;
    roleDropdownToggle.innerHTML = "Select role &#9662;";
    roleDropdownList.classList.remove('open');
    //show whichever entries already exist for this region, and clear any leftover error text
    regionEntriesError.textContent = '';
    renderEntriesList();
    showModal(regionalBackdrop);
}

//builds one clickable row for a champion with its icon on the left of its name
function buildChampionOption(champion) {
    const option = document.createElement('button');
    option.className = 'dropdown-option';
    option.innerHTML = `<img src="${champion.iconPath}" class="dropdown-option-icon"><span>${champion.name}</span>`;
    //picking this champion closes the dropdown and shows it on the toggle button instead
    option.addEventListener('click', () => {
        selectedChampionId = champion.id;
        championDropdownToggle.innerHTML = `<img src="${champion.iconPath}" class="dropdown-toggle-icon"><span>${champion.name}</span>`;
        championDropdownList.classList.remove('open');
    });
    return option;
}

//builds one clickable row for a role, icon only
function buildRoleOption(role) {
    const option = document.createElement('button');
    option.className = 'dropdown-option';
    //dim by default, since this role hasn't been picked yet
    option.innerHTML = `<img src="${role.iconDim}" class="dropdown-option-icon">`;
    const icon = option.querySelector('img');
    //swap to the hover icon while the mouse is over this option, back to dim once it leaves
    option.addEventListener('mouseenter', () => {
        icon.src = role.iconHover;
    });
    option.addEventListener('mouseleave', () => {
        icon.src = role.iconDim;
    });
    //picking this role closes the dropdown and shows it, in its selected state, on the toggle button instead
    option.addEventListener('click', () => {
        selectedRole = role.role;
        roleDropdownToggle.innerHTML = `<img src="${role.iconSelected}" class="dropdown-toggle-icon">`;
        roleDropdownList.classList.remove('open');
    });
    return option;
}

//fills the dropdown list with every role, minus whichever is already selected
function populateRoleDropdown() {
    roleDropdownList.innerHTML = '';
    roles
        .filter(role => role.role !== selectedRole)
        .forEach(role => {
            roleDropdownList.appendChild(buildRoleOption(role));
        });
}

//fills the dropdown list with every champ from the current region, minus whichever is already selected
function populateChampionDropdown() {
    championDropdownList.innerHTML = '';
    champions
        .filter(champion => champion.regions.includes(currentRegionId) && champion.id !== selectedChampionId)
        .forEach(champion => {
            championDropdownList.appendChild(buildChampionOption(champion));
        });
}

//opens or closes the champion dropdown, rebuilding the list fresh each time it opens
championDropdownToggle.addEventListener('click', () => {
    const isOpen = championDropdownList.classList.contains('open');
    if (isOpen) {
        championDropdownList.classList.remove('open');
    } else {
        populateChampionDropdown();
        championDropdownList.classList.add('open');
    }
});

//opens or closes the role dropdown, rebuilding the list fresh each time it opens
roleDropdownToggle.addEventListener('click', () => {
    const isOpen = roleDropdownList.classList.contains('open');
    if (isOpen) {
        roleDropdownList.classList.remove('open');
    } else {
        populateRoleDropdown();
        roleDropdownList.classList.add('open');
    }
});

//builds one row for the entries list: champ icon, champ name, role icon, and a delete button
function constructListElement(entry, entryIndex) {
    const champion = champions.find(c => c.id === entry.championId);
    const role = roles.find(r => r.role === entry.role);

    const row = document.createElement('div');
    row.className = 'region-entry';
    row.innerHTML = `
        <img src="${champion.iconPath}" class="region-entry-icon">
        <span>${champion.name}</span>
        <img src="${role.iconSelected}" class="region-entry-icon">
    `;

    //deletes just this entry from the list, then re-renders to reflect it
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'region-entry-delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        pendingPreferences[currentRegionIndex].splice(entryIndex, 1);
        renderEntriesList();
    });
    row.appendChild(deleteBtn);

    return row;
}

//clears and rebuilds the entries list from pendingPreferences for the region currently open
function renderEntriesList() {
    regionEntriesList.innerHTML = '';
    pendingPreferences[currentRegionIndex].forEach((entry, entryIndex) => {
        regionEntriesList.appendChild(constructListElement(entry, entryIndex));
    });
    //the done button reflects whether any entries have been added yet for this region
    if (pendingPreferences[currentRegionIndex].length === 0) {
        regionDoneBtn.classList.add('empty-list');
        regionDoneBtn.textContent = "I dont want to play this challenge";
    } else {
        regionDoneBtn.classList.remove('empty-list');
        regionDoneBtn.textContent = "Done";
    }
}

//functionality of each button

//adds the selected champion/role combo to the entries list
regionAddBtn.addEventListener('click', () => {
    regionEntriesError.textContent = '';
    //cant add without both a champion and a role picked
    if (!selectedChampionId || !selectedRole) {
        regionEntriesError.textContent = "Can't add without a champion and role";
        return;
    }
    //cant add the same champion/role combo twice
    const alreadyOnList = pendingPreferences[currentRegionIndex].some(entry =>
        entry.championId === selectedChampionId && entry.role === selectedRole
    );
    if (alreadyOnList) {
        regionEntriesError.textContent = "That champion and role combo is already on the list";
        return;
    }
    //cant have more than 5 entries for a single region
    if (pendingPreferences[currentRegionIndex].length >= 5) {
        regionEntriesError.textContent = "Can't have more than 5 options, delete one to add more";
        return;
    }
    pendingPreferences[currentRegionIndex].push({ championId: selectedChampionId, role: selectedRole });
    renderEntriesList();
});

//saves the entries and moves on once done is clicked
regionDoneBtn.addEventListener('click', async () => {
    //update the saved list in pending prefereences
    if (currentRegionIndex < 12) {
        currentRegionIndex++;
        openRegionalModal(currentRegionIndex, "local");
    } else {
        await updateFireStore(currentPlayerName, pendingPreferences);
        hideModal(regionalBackdrop);
    }

});

//goes back to the previous step
regionBackBtn.addEventListener('click', () => {
    //return to the previous modal in the flow
    if (currentRegionIndex == 0) {
        hideModal(regionalBackdrop);
        openNewPlayerModal(currentPlayerName);
    } else {
        currentRegionIndex--;
        openRegionalModal(currentRegionIndex, "local");
    }

});

//closes the modal when the close button is clicked
regionCloseBtn.addEventListener('click', () => {
    openAreYouSureModal();
});

//ARE YOU SURE MODAL

//set up consts
const areYouSureBackdrop = document.getElementById("are-you-sure-modal-backdrop");
const areYouSureConfirmBtn = document.getElementById("are-you-sure-confirm-btn");
const areYouSureCancelBtn = document.getElementById("are-you-sure-cancel-btn");
const areYouSureCloseBtn = document.getElementById("are-you-sure-close-btn");

//function to start the modal
function openAreYouSureModal() {
    currentFlow = "are-you-sure";
    //clear any selections in the modal from previous uses
    showModal(areYouSureBackdrop);
}

//functionality of each button

//runs the pending action once confirmed
areYouSureConfirmBtn.addEventListener('click', () => {
    hideModal(areYouSureBackdrop);
    hideModal(regionalBackdrop);
});

//closes the modal when cancel is clicked
areYouSureCancelBtn.addEventListener('click', () => {
    hideModal(areYouSureBackdrop);
});

//closes the modal when the close button is clicked
areYouSureCloseBtn.addEventListener('click', () => {
    hideModal(areYouSureBackdrop);
});

//SELECT PLAYER MODAL

//set up consts
const selectPlayerBackdrop = document.getElementById("select-player-modal-backdrop");
const selectPlayerGrid = document.getElementById("select-player-grid");
const selectPlayerCloseBtn = document.getElementById("select-player-close-btn");

//function to start the modal
async function openSelectPlayerModal() {
    currentFlow = "select-player";
    //populate the list of existing players to choose from, then reveal the modal
    await populateSelectPlayerGrid();
    showModal(selectPlayerBackdrop);
}

//fills the grid with one button per existing player
async function populateSelectPlayerGrid() {
    selectPlayerGrid.innerHTML = '';
    const playerNames = await getAllPlayerNames();
    const activeNames = latestActivePlayers?.names || [];
    playerNames.forEach(name => {
        const button = document.createElement('button');
        button.className = 'select-player-btn';
        button.textContent = name;
        if (activeNames.includes(name)) {
            //already on the active list, show it but don't let it be picked again
            button.classList.add('select-player-btn-disabled');
            button.disabled = true;
        } else {
            //picking a player closes the modal and adds them to the shared active-players list
            button.addEventListener('click', async () => {
                hideModal(selectPlayerBackdrop);
                await addPlayerToList(name);
            });
        }
        selectPlayerGrid.appendChild(button);
    });
}

//functionality of each button

//closes the modal when the close button is clicked
selectPlayerCloseBtn.addEventListener('click', () => {
    hideModal(selectPlayerBackdrop);
});

//SELECT REGION MODAL

//set up consts
const selectRegionBackdrop = document.getElementById("select-region-modal-backdrop");
const selectRegionDoneBtn = document.getElementById("select-region-done-btn");
const selectRegionCloseBtn = document.getElementById("select-region-close-btn");

//function to start the modal
function openSelectRegionModal() {
    currentFlow = "select-region";
    //populate the list of regions to choose from
    showModal(selectRegionBackdrop);
}

//functionality of each button

//moves on once a region is selected and done is clicked
selectRegionDoneBtn.addEventListener('click', () => {
    //open the regional modal for the selected region
});

//closes the modal when the close button is clicked
selectRegionCloseBtn.addEventListener('click', () => {
    hideModal(selectRegionBackdrop);
});

//PATCH NOTES MODAL

//set up consts
const patchNotesBackdrop = document.getElementById("patch-notes-modal-backdrop");
const patchNotesContent = document.getElementById("patch-notes-content");
const patchNotesBtn = document.getElementById("patch-notes-btn");
const patchNotesCloseBtn = document.getElementById("patch-notes-close-btn");

//function to start the modal
async function openPatchNotesModal() {
    await populatePatchNotes();
    showModal(patchNotesBackdrop);
}

//fetches patch-notes.txt and parses it into the modal - each patch is a version line followed
//by its bullet lines, with a blank line separating it from the next (older) patch below it
async function populatePatchNotes() {
    patchNotesContent.innerHTML = '';
    const response = await fetch('patch-notes.txt');
    const text = await response.text();
    const patches = text.trim().split(/\n\s*\n/);

    patches.forEach(block => {
        const lines = block.trim().split('\n');
        const title = lines[0];
        const changes = lines.slice(1);

        const heading = document.createElement('h3');
        heading.textContent = title;
        patchNotesContent.appendChild(heading);

        const list = document.createElement('ul');
        changes.forEach(change => {
            const item = document.createElement('li');
            item.textContent = change.trim();
            list.appendChild(item);
        });
        patchNotesContent.appendChild(list);
    });
}

//functionality of each button

//opens the modal when the ? button is clicked
patchNotesBtn.addEventListener('click', openPatchNotesModal);

//closes the modal when the close button is clicked
patchNotesCloseBtn.addEventListener('click', () => {
    hideModal(patchNotesBackdrop);
});

//HOMEPAGE

//opens the new player modal when the add new player button is clicked
document.querySelector('.add-player-btn').addEventListener('click', () => openNewPlayerModal(""))

//writes the clicked region to the shared game state, refreshRegions() then handles re-rendering
regionButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const regionId = button.dataset.regionId;
        //nothing actually changed if this region was already the selected one, so skip the write
        if (regionId === latestCurrentRegion?.selectedRegionId) {
            return;
        }
        await setDoc(doc(db, "gameState", "currentRegion"), {
            selectedRegionId: regionId
        });
        //update the local copy immediately, since generateComp() below needs to read the
        //region we just picked rather than waiting on this write's own listener round trip
        latestCurrentRegion = { selectedRegionId: regionId };
        await resetComp();
        //skip the "Generate Comp" button step - jump straight to showing a comp
        if (hasFullRoster() && isRegionCurrentlyPossible(regionId)) {
            await generateComp();
        }
    });
});

//HELPER FUNCTIONS INTERACTING WITH FIREBASE

//function to check if a name is taken
async function isNameTaken(name) {
    const playerRef = doc(db, "players", name);
    const snapshot = await getDoc(playerRef);
    return snapshot.exists();
}

//saves a player's finished preferences to firestore
async function updateFireStore(playerName, preferences) {
    //get a reference to this player's document, using their name as the document id
    const playerRef = doc(db, "players", playerName);
    //write the preferences object to that document
    //setDoc creates the document if it doesn't exist yet, or overwrites it if it does
    await setDoc(playerRef, preferences);
}

//fetches the names of every player ever registered in firestore, not just the active ones for this session
//just names - no preference data - see getActivePlayersData() for that
async function getAllPlayerNames() {
    //get a reference to the whole "players" collection, rather than a single document
    const playersRef = collection(db, "players");
    //ask firestore for every document currently inside that collection
    const snapshot = await getDocs(playersRef);
    //snapshot.docs is an array of document objects
    //map turns that array of documents into an array of just their ids (the player names)
    const playerNames = snapshot.docs.map(playerDoc => playerDoc.id);
    //hand the finished array of names back to whatever called this function
    return playerNames;
}

//fetches full preference data for just the players currently active in this session
//(as opposed to getAllPlayerNames(), which covers every registered player but names only)
//each result is the player's saved preferences with their name merged in:
//{ name, 0: [...], 1: [...], ..., 12: [...] } - so both player.name and player[region.indexNo] work
async function getActivePlayersData(activeNames) {
    //firestore's "in" filter can't take an empty array, and there's nothing to fetch anyway
    if (activeNames.length === 0) return [];
    //fetch every active player's doc in one query instead of one getDoc call per player
    const playersRef = collection(db, "players");
    const activePlayersQuery = query(playersRef, where(documentId(), "in", activeNames));
    const snapshot = await getDocs(activePlayersQuery);
    return snapshot.docs.map(playerDoc => ({ name: playerDoc.id, ...playerDoc.data() }));
}

//adds a player's name to the shared active-players list
async function addPlayerToList(name) {
    const activePlayersRef = doc(db, "gameState", "activePlayers");
    //merge:true creates the document if it doesn't exist yet, instead of throwing
    //arrayUnion adds the name only if it isn't already present, avoiding duplicates
    await setDoc(activePlayersRef, {
        names: arrayUnion(name)
    }, { merge: true });
    await resetComp();
}

//removes a player's name from the shared active-players list
async function removePlayerFromList(name) {
    const activePlayersRef = doc(db, "gameState", "activePlayers");
    //arrayRemove strips every matching entry from the array
    await setDoc(activePlayersRef, {
        names: arrayRemove(name)
    }, { merge: true });
    await resetComp();
}
