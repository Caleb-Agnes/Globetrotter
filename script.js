// #region Firebase Setup
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
// #endregion

// #region Game Data
const roles = [
    { role: "top", iconDim: "assets/Role Icons/icon-position-top-disabled.png", iconHover: "assets/Role Icons/icon-position-top-hover.png", iconSelected: "assets/Role Icons/icon-position-top.png" },
    { role: "jng", iconDim: "assets/Role Icons/icon-position-jungle-disabled.png", iconHover: "assets/Role Icons/icon-position-jungle-hover.png", iconSelected: "assets/Role Icons/icon-position-jungle.png" },
    { role: "mid", iconDim: "assets/Role Icons/icon-position-middle-disabled.png", iconHover: "assets/Role Icons/icon-position-middle-hover.png", iconSelected: "assets/Role Icons/icon-position-middle.png" },
    { role: "bot", iconDim: "assets/Role Icons/icon-position-bottom-disabled.png", iconHover: "assets/Role Icons/icon-position-bottom-hover.png", iconSelected: "assets/Role Icons/icon-position-bottom.png" },
    { role: "sup", iconDim: "assets/Role Icons/icon-position-utility-disabled.png", iconHover: "assets/Role Icons/icon-position-utility-hover.png", iconSelected: "assets/Role Icons/icon-position-utility.png" }
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
    { id: "aatrox", name: "Aatrox", regions: [], iconPath: "assets/Champion Icons/Aatrox.png" },
    { id: "ahri", name: "Ahri", regions: ["ionia"], iconPath: "assets/Champion Icons/Ahri.png" },
    { id: "akali", name: "Akali", regions: ["ionia"], iconPath: "assets/Champion Icons/Akali.png" },
    { id: "akshan", name: "Akshan", regions: ["shurima"], iconPath: "assets/Champion Icons/Akshan.png" },
    { id: "alistar", name: "Alistar", regions: [], iconPath: "assets/Champion Icons/Alistar.png" },
    { id: "ambessa", name: "Ambessa", regions: ["noxus"], iconPath: "assets/Champion Icons/Ambessa.png" },
    { id: "amumu", name: "Amumu", regions: ["shurima"], iconPath: "assets/Champion Icons/Amumu.png" },
    { id: "anivia", name: "Anivia", regions: ["freljord"], iconPath: "assets/Champion Icons/Anivia.png" },
    { id: "annie", name: "Annie", regions: [], iconPath: "assets/Champion Icons/Annie.png" },
    { id: "aphelios", name: "Aphelios", regions: ["targon"], iconPath: "assets/Champion Icons/Aphelios.png" },
    { id: "ashe", name: "Ashe", regions: ["freljord"], iconPath: "assets/Champion Icons/Ashe.png" },
    { id: "aurelionsol", name: "Aurelion Sol", regions: ["targon"], iconPath: "assets/Champion Icons/Aurelion Sol.png" },
    { id: "aurora", name: "Aurora", regions: ["freljord"], iconPath: "assets/Champion Icons/Aurora.png" },
    { id: "azir", name: "Azir", regions: ["shurima"], iconPath: "assets/Champion Icons/Azir.png" },
    { id: "bard", name: "Bard", regions: [], iconPath: "assets/Champion Icons/Bard.png" },
    { id: "belveth", name: "Bel'Veth", regions: ["void"], iconPath: "assets/Champion Icons/Bel'Veth.png" },
    { id: "blitzcrank", name: "Blitzcrank", regions: ["zaun"], iconPath: "assets/Champion Icons/Blitzcrank.png" },
    { id: "brand", name: "Brand", regions: [], iconPath: "assets/Champion Icons/Brand.png" },
    { id: "braum", name: "Braum", regions: ["freljord"], iconPath: "assets/Champion Icons/Braum.png" },
    { id: "briar", name: "Briar", regions: ["noxus"], iconPath: "assets/Champion Icons/Briar.png" },
    { id: "caitlyn", name: "Caitlyn", regions: ["piltover"], iconPath: "assets/Champion Icons/Caitlyn.png" },
    { id: "camille", name: "Camille", regions: ["piltover"], iconPath: "assets/Champion Icons/Camille.png" },
    { id: "cassiopeia", name: "Cassiopeia", regions: ["noxus"], iconPath: "assets/Champion Icons/Cassiopeia.png" },
    { id: "chogath", name: "Cho'Gath", regions: ["void"], iconPath: "assets/Champion Icons/Cho'Gath.png" },
    { id: "corki", name: "Corki", regions: ["piltover","bandle-city"], iconPath: "assets/Champion Icons/Corki.png" },
    { id: "darius", name: "Darius", regions: ["noxus"], iconPath: "assets/Champion Icons/Darius.png" },
    { id: "diana", name: "Diana", regions: ["targon"], iconPath: "assets/Champion Icons/Diana.png" },
    { id: "drmundo", name: "Dr. Mundo", regions: ["zaun"], iconPath: "assets/Champion Icons/Dr. Mundo.png" },
    { id: "draven", name: "Draven", regions: ["noxus"], iconPath: "assets/Champion Icons/Draven.png" },
    { id: "ekko", name: "Ekko", regions: ["zaun"], iconPath: "assets/Champion Icons/Ekko.png" },
    { id: "elise", name: "Elise", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Elise.png" },
    { id: "evelynn", name: "Evelynn", regions: [], iconPath: "assets/Champion Icons/Evelynn.png" },
    { id: "ezreal", name: "Ezreal", regions: ["piltover"], iconPath: "assets/Champion Icons/Ezreal.png" },
    { id: "fiddlesticks", name: "Fiddlesticks", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Fiddlesticks.png" },
    { id: "fiora", name: "Fiora", regions: ["demacia"], iconPath: "assets/Champion Icons/Fiora.png" },
    { id: "fizz", name: "Fizz", regions: ["bilgewater","bandle-city"], iconPath: "assets/Champion Icons/Fizz.png" },
    { id: "galio", name: "Galio", regions: ["demacia"], iconPath: "assets/Champion Icons/Galio.png" },
    { id: "gangplank", name: "Gangplank", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Gangplank.png" },
    { id: "garen", name: "Garen", regions: ["demacia"], iconPath: "assets/Champion Icons/Garen.png" },
    { id: "gnar", name: "Gnar", regions: ["freljord","bandle-city"], iconPath: "assets/Champion Icons/Gnar.png" },
    { id: "gragas", name: "Gragas", regions: ["freljord"], iconPath: "assets/Champion Icons/Gragas.png" },
    { id: "graves", name: "Graves", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Graves.png" },
    { id: "gwen", name: "Gwen", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Gwen.png" },
    { id: "hecarim", name: "Hecarim", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Hecarim.png" },
    { id: "heimerdinger", name: "Heimerdinger", regions: ["piltover","bandle-city"], iconPath: "assets/Champion Icons/Heimerdinger.png" },
    { id: "hwei", name: "Hwei", regions: ["ionia"], iconPath: "assets/Champion Icons/Hwei.png" },
    { id: "illaoi", name: "Illaoi", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Illaoi.png" },
    { id: "irelia", name: "Irelia", regions: ["ionia"], iconPath: "assets/Champion Icons/Irelia.png" },
    { id: "ivern", name: "Ivern", regions: ["ionia"], iconPath: "assets/Champion Icons/Ivern.png" },
    { id: "janna", name: "Janna", regions: ["zaun"], iconPath: "assets/Champion Icons/Janna.png" },
    { id: "jarvaniv", name: "Jarvan IV", regions: ["demacia"], iconPath: "assets/Champion Icons/Jarvan IV.png" },
    { id: "jax", name: "Jax", regions: [], iconPath: "assets/Champion Icons/Jax.png" },
    { id: "jayce", name: "Jayce", regions: ["piltover"], iconPath: "assets/Champion Icons/Jayce.png" },
    { id: "jhin", name: "Jhin", regions: ["ionia"], iconPath: "assets/Champion Icons/Jhin.png" },
    { id: "jinx", name: "Jinx", regions: ["zaun"], iconPath: "assets/Champion Icons/Jinx.png" },
    { id: "ksante", name: "K'Sante", regions: ["shurima"], iconPath: "assets/Champion Icons/K'Sante.png" },
    { id: "kaisa", name: "Kai'Sa", regions: ["void"], iconPath: "assets/Champion Icons/Kai'Sa.png" },
    { id: "kalista", name: "Kalista", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Kalista.png" },
    { id: "karma", name: "Karma", regions: ["ionia"], iconPath: "assets/Champion Icons/Karma.png" },
    { id: "karthus", name: "Karthus", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Karthus.png" },
    { id: "kassadin", name: "Kassadin", regions: ["void"], iconPath: "assets/Champion Icons/Kassadin.png" },
    { id: "katarina", name: "Katarina", regions: ["noxus"], iconPath: "assets/Champion Icons/Katarina.png" },
    { id: "kayle", name: "Kayle", regions: ["demacia"], iconPath: "assets/Champion Icons/Kayle.png" },
    { id: "kayn", name: "Kayn", regions: ["ionia"], iconPath: "assets/Champion Icons/Kayn.png" },
    { id: "kennen", name: "Kennen", regions: ["ionia","bandle-city"], iconPath: "assets/Champion Icons/Kennen.png" },
    { id: "khazix", name: "Kha'Zix", regions: ["void"], iconPath: "assets/Champion Icons/Kha'Zix.png" },
    { id: "kindred", name: "Kindred", regions: [], iconPath: "assets/Champion Icons/Kindred.png" },
    { id: "kled", name: "Kled", regions: ["noxus","bandle-city"], iconPath: "assets/Champion Icons/Kled.png" },
    { id: "kogmaw", name: "Kog'Maw", regions: ["void"], iconPath: "assets/Champion Icons/Kog'Maw.png" },
    { id: "leblanc", name: "LeBlanc", regions: ["noxus"], iconPath: "assets/Champion Icons/LeBlanc.png" },
    { id: "leesin", name: "Lee Sin", regions: ["ionia"], iconPath: "assets/Champion Icons/Lee Sin.png" },
    { id: "leona", name: "Leona", regions: ["targon"], iconPath: "assets/Champion Icons/Leona.png" },
    { id: "lillia", name: "Lillia", regions: ["ionia"], iconPath: "assets/Champion Icons/Lillia.png" },
    { id: "lissandra", name: "Lissandra", regions: ["freljord"], iconPath: "assets/Champion Icons/Lissandra.png" },
    { id: "lucian", name: "Lucian", regions: ["demacia"], iconPath: "assets/Champion Icons/Lucian.png" },
    { id: "lulu", name: "Lulu", regions: ["bandle-city"], iconPath: "assets/Champion Icons/Lulu.png" },
    { id: "lux", name: "Lux", regions: ["demacia"], iconPath: "assets/Champion Icons/Lux.png" },
    { id: "malphite", name: "Malphite", regions: ["ixtal"], iconPath: "assets/Champion Icons/Malphite.png" },
    { id: "malzahar", name: "Malzahar", regions: ["void"], iconPath: "assets/Champion Icons/Malzahar.png" },
    { id: "maokai", name: "Maokai", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Maokai.png" },
    { id: "masteryi", name: "Master Yi", regions: ["ionia"], iconPath: "assets/Champion Icons/Master Yi.png" },
    { id: "mel", name: "Mel", regions: ["noxus"], iconPath: "assets/Champion Icons/Mel.png" },
    { id: "milio", name: "Milio", regions: ["ixtal"], iconPath: "assets/Champion Icons/Milio.png" },
    { id: "missfortune", name: "Miss Fortune", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Miss Fortune.png" },
    { id: "mordekaiser", name: "Mordekaiser", regions: ["noxus"], iconPath: "assets/Champion Icons/Mordekaiser.png" },
    { id: "morgana", name: "Morgana", regions: ["demacia"], iconPath: "assets/Champion Icons/Morgana.png" },
    { id: "naafiri", name: "Naafiri", regions: ["shurima"], iconPath: "assets/Champion Icons/Naafiri.png" },
    { id: "nami", name: "Nami", regions: [], iconPath: "assets/Champion Icons/Nami.png" },
    { id: "nasus", name: "Nasus", regions: ["shurima"], iconPath: "assets/Champion Icons/Nasus.png" },
    { id: "nautilus", name: "Nautilus", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Nautilus.png" },
    { id: "neeko", name: "Neeko", regions: ["ixtal"], iconPath: "assets/Champion Icons/Neeko.png" },
    { id: "nidalee", name: "Nidalee", regions: ["ixtal"], iconPath: "assets/Champion Icons/Nidalee.png" },
    { id: "nilah", name: "Nilah", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Nilah.png" },
    { id: "nocturne", name: "Nocturne", regions: [], iconPath: "assets/Champion Icons/Nocturne.png" },
    { id: "nunu", name: "Nunu & Willump", regions: ["freljord"], iconPath: "assets/Champion Icons/Nunu & Willump.png" },
    { id: "olaf", name: "Olaf", regions: ["freljord"], iconPath: "assets/Champion Icons/Olaf.png" },
    { id: "orianna", name: "Orianna", regions: ["piltover"], iconPath: "assets/Champion Icons/Orianna.png" },
    { id: "ornn", name: "Ornn", regions: ["freljord"], iconPath: "assets/Champion Icons/Ornn.png" },
    { id: "pantheon", name: "Pantheon", regions: ["targon"], iconPath: "assets/Champion Icons/Pantheon.png" },
    { id: "poppy", name: "Poppy", regions: ["demacia","bandle-city"], iconPath: "assets/Champion Icons/Poppy.png" },
    { id: "pyke", name: "Pyke", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Pyke.png" },
    { id: "qiyana", name: "Qiyana", regions: ["ixtal"], iconPath: "assets/Champion Icons/Qiyana.png" },
    { id: "quinn", name: "Quinn", regions: ["demacia"], iconPath: "assets/Champion Icons/Quinn.png" },
    { id: "rakan", name: "Rakan", regions: ["ionia"], iconPath: "assets/Champion Icons/Rakan.png" },
    { id: "rammus", name: "Rammus", regions: ["shurima"], iconPath: "assets/Champion Icons/Rammus.png" },
    { id: "reksai", name: "Rek'Sai", regions: ["void"], iconPath: "assets/Champion Icons/Rek'Sai.png" },
    { id: "rell", name: "Rell", regions: ["noxus"], iconPath: "assets/Champion Icons/Rell.png" },
    { id: "renata", name: "Renata Glasc", regions: ["zaun"], iconPath: "assets/Champion Icons/Renata Glasc.png" },
    { id: "renekton", name: "Renekton", regions: ["shurima"], iconPath: "assets/Champion Icons/Renekton.png" },
    { id: "rengar", name: "Rengar", regions: ["ixtal"], iconPath: "assets/Champion Icons/Rengar.png" },
    { id: "riven", name: "Riven", regions: ["noxus"], iconPath: "assets/Champion Icons/Riven.png" },
    { id: "rumble", name: "Rumble", regions: ["bandle-city"], iconPath: "assets/Champion Icons/Rumble.png" },
    { id: "ryze", name: "Ryze", regions: [], iconPath: "assets/Champion Icons/Ryze.png" },
    { id: "samira", name: "Samira", regions: ["noxus"], iconPath: "assets/Champion Icons/Samira.png" },
    { id: "sejuani", name: "Sejuani", regions: ["freljord"], iconPath: "assets/Champion Icons/Sejuani.png" },
    { id: "senna", name: "Senna", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Senna.png" },
    { id: "seraphine", name: "Seraphine", regions: ["piltover"], iconPath: "assets/Champion Icons/Seraphine.png" },
    { id: "sett", name: "Sett", regions: ["ionia"], iconPath: "assets/Champion Icons/Sett.png" },
    { id: "shaco", name: "Shaco", regions: [], iconPath: "assets/Champion Icons/Shaco.png" },
    { id: "shen", name: "Shen", regions: ["ionia"], iconPath: "assets/Champion Icons/Shen.png" },
    { id: "shyvana", name: "Shyvana", regions: ["demacia"], iconPath: "assets/Champion Icons/Shyvana.png" },
    { id: "singed", name: "Singed", regions: ["zaun"], iconPath: "assets/Champion Icons/Singed.png" },
    { id: "sion", name: "Sion", regions: ["noxus"], iconPath: "assets/Champion Icons/Sion.png" },
    { id: "sivir", name: "Sivir", regions: ["shurima"], iconPath: "assets/Champion Icons/Sivir.png" },
    { id: "skarner", name: "Skarner", regions: ["ixtal"], iconPath: "assets/Champion Icons/Skarner.png" },
    { id: "smolder", name: "Smolder", regions: [], iconPath: "assets/Champion Icons/Smolder.png" },
    { id: "sona", name: "Sona", regions: ["demacia"], iconPath: "assets/Champion Icons/Sona.png" },
    { id: "soraka", name: "Soraka", regions: ["targon"], iconPath: "assets/Champion Icons/Soraka.png" },
    { id: "swain", name: "Swain", regions: ["noxus"], iconPath: "assets/Champion Icons/Swain.png" },
    { id: "sylas", name: "Sylas", regions: ["demacia"], iconPath: "assets/Champion Icons/Sylas.png" },
    { id: "syndra", name: "Syndra", regions: ["ionia"], iconPath: "assets/Champion Icons/Syndra.png" },
    { id: "tahmkench", name: "Tahm Kench", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Tahm Kench.png" },
    { id: "taliyah", name: "Taliyah", regions: ["shurima"], iconPath: "assets/Champion Icons/Taliyah.png" },
    { id: "talon", name: "Talon", regions: ["noxus"], iconPath: "assets/Champion Icons/Talon.png" },
    { id: "taric", name: "Taric", regions: ["targon"], iconPath: "assets/Champion Icons/Taric.png" },
    { id: "teemo", name: "Teemo", regions: ["bandle-city"], iconPath: "assets/Champion Icons/Teemo.png" },
    { id: "thresh", name: "Thresh", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Thresh.png" },
    { id: "tristana", name: "Tristana", regions: ["bandle-city"], iconPath: "assets/Champion Icons/Tristana.png" },
    { id: "trundle", name: "Trundle", regions: ["freljord"], iconPath: "assets/Champion Icons/Trundle.png" },
    { id: "tryndamere", name: "Tryndamere", regions: ["freljord"], iconPath: "assets/Champion Icons/Tryndamere.png" },
    { id: "twistedfate", name: "Twisted Fate", regions: ["bilgewater"], iconPath: "assets/Champion Icons/Twisted Fate.png" },
    { id: "twitch", name: "Twitch", regions: ["zaun"], iconPath: "assets/Champion Icons/Twitch.png" },
    { id: "udyr", name: "Udyr", regions: ["freljord"], iconPath: "assets/Champion Icons/Udyr.png" },
    { id: "urgot", name: "Urgot", regions: ["zaun"], iconPath: "assets/Champion Icons/Urgot.png" },
    { id: "varus", name: "Varus", regions: ["ionia"], iconPath: "assets/Champion Icons/Varus.png" },
    { id: "vayne", name: "Vayne", regions: ["demacia"], iconPath: "assets/Champion Icons/Vayne.png" },
    { id: "veigar", name: "Veigar", regions: ["bandle-city"], iconPath: "assets/Champion Icons/Veigar.png" },
    { id: "velkoz", name: "Vel'Koz", regions: ["void"], iconPath: "assets/Champion Icons/Vel'Koz.png" },
    { id: "vex", name: "Vex", regions: ["shadow-isles","bandle-city"], iconPath: "assets/Champion Icons/Vex.png" },
    { id: "vi", name: "Vi", regions: ["piltover"], iconPath: "assets/Champion Icons/Vi.png" },
    { id: "viego", name: "Viego", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Viego.png" },
    { id: "viktor", name: "Viktor", regions: ["zaun"], iconPath: "assets/Champion Icons/Viktor.png" },
    { id: "vladimir", name: "Vladimir", regions: ["noxus"], iconPath: "assets/Champion Icons/Vladimir.png" },
    { id: "volibear", name: "Volibear", regions: ["freljord"], iconPath: "assets/Champion Icons/Volibear.png" },
    { id: "warwick", name: "Warwick", regions: ["zaun"], iconPath: "assets/Champion Icons/Warwick.png" },
    { id: "wukong", name: "Wukong", regions: ["ionia"], iconPath: "assets/Champion Icons/Wukong.png" },
    { id: "xayah", name: "Xayah", regions: ["ionia"], iconPath: "assets/Champion Icons/Xayah.png" },
    { id: "xerath", name: "Xerath", regions: ["shurima"], iconPath: "assets/Champion Icons/Xerath.png" },
    { id: "xinzhao", name: "Xin Zhao", regions: ["demacia"], iconPath: "assets/Champion Icons/Xin Zhao.png" },
    { id: "yasuo", name: "Yasuo", regions: ["ionia"], iconPath: "assets/Champion Icons/Yasuo.png" },
    { id: "yone", name: "Yone", regions: ["ionia"], iconPath: "assets/Champion Icons/Yone.png" },
    { id: "yorick", name: "Yorick", regions: ["shadow-isles"], iconPath: "assets/Champion Icons/Yorick.png" },
    { id: "yuumi", name: "Yuumi", regions: ["bandle-city"], iconPath: "assets/Champion Icons/Yuumi.png" },
    { id: "zac", name: "Zac", regions: ["zaun"], iconPath: "assets/Champion Icons/Zac.png" },
    { id: "zed", name: "Zed", regions: ["ionia"], iconPath: "assets/Champion Icons/Zed.png" },
    { id: "zeri", name: "Zeri", regions: ["zaun"], iconPath: "assets/Champion Icons/Zeri.png" },
    { id: "ziggs", name: "Ziggs", regions: ["zaun","bandle-city"], iconPath: "assets/Champion Icons/Ziggs.png" },
    { id: "zilean", name: "Zilean", regions: [], iconPath: "assets/Champion Icons/Zilean.png" },
    { id: "zoe", name: "Zoe", regions: ["targon"], iconPath: "assets/Champion Icons/Zoe.png" },
    { id: "zyra", name: "Zyra", regions: ["ixtal"], iconPath: "assets/Champion Icons/Zyra.png" },
    { id: "locke", name: "Locke", regions: ["demacia"], iconPath: "assets/Champion Icons/Locke.png" },
    { id: "yunara", name: "Yunara", regions: ["ionia"], iconPath: "assets/Champion Icons/Yunara.png" },
    { id: "zaahen", name: "Zaahen", regions: [], iconPath: "assets/Champion Icons/Zaahen.png" }
];
// #endregion

// #region App State
let currentFlow = null;       // modal currently in focus
let currentPlayerName = null; // name being created, or player being edited
let currentRegionIndex = 0;   // position in the regions array, for the new-player flow
let currentRegionId = null;   // the region the regional modal is currently open for
let pendingPreferences = {};  // in-memory data collected before final save
let selectedChampionId = null;// the champion currently chosen in the champion dropdown, or null if none picked yet
let selectedRole = null;// the role currently chosen in the dropdown, or null if none picked yet
let currentPlayerData = null; // full firestore doc for the player currently being edited
// #endregion

// #region Homepage - Shared State & Caches

//set up consts
const regionButtons = document.querySelectorAll('.region-btn');
const playerSlots = document.querySelectorAll('.player-slot');
const compContent = document.getElementById("comp-content");
const regionChampionGrid = document.getElementById("region-champion-grid");

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
// #endregion

// #region Homepage - Roster & Cache Helpers

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
            //isolated per region - one region's data throwing (e.g. a player doc missing that
            //region's key) must not blank out every other region's already-computed cache too,
            //which is what an unguarded throw here would do since it aborts this whole forEach
            try {
                compsByRegion[region.id] = generateAllPossibleComps(latestActivePlayersData, region);
            } catch (error) {
                console.error(`Failed to generate comps for region "${region.id}":`, error);
                compsByRegion[region.id] = [];
            }
        } else {
            regionWillingness[region.id] = hasEveryActivePlayerListedSomething(latestActivePlayersData, region);
        }
    });
}
// #endregion

// #region Homepage - Players Column

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
            addBtn.addEventListener('click', () => openSelectPlayerModal("add"));

            slot.appendChild(addBtn);
        } else {
            //no player yet and not the next slot in line: leave empty
            slot.classList.add('empty');
        }
    });
}

//opens the new player modal when the add new player button is clicked
document.querySelector('.add-player-btn').addEventListener('click', () => openNewPlayerModal(""))

//opens the select-player modal in "edit" mode when the edit-preferences button is clicked
document.querySelector('.edit-preferences-btn').addEventListener('click', () => openSelectPlayerModal("edit"))
// #endregion

// #region Homepage - Regions Column

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
        //league region we just picked rather than waiting on this write's own listener round trip
        latestCurrentRegion = { selectedRegionId: regionId };
        await resetComp();
        //skip the "Generate Comp" button step - jump straight to showing a comp
        if (hasFullRoster() && isRegionCurrentlyPossible(regionId)) {
            await generateComp();
        }
    });
});

//randomise button
const randomiseRegionBtn = document.getElementById("randomise-region-btn");

randomiseRegionBtn.addEventListener('click', () => {
    const possibleButtons = Array.from(regionButtons).filter(button => !button.disabled);
    if (possibleButtons.length === 0) return;
    const randomButton = possibleButtons[Math.floor(Math.random() * possibleButtons.length)];
    randomButton.click();
});
// #endregion

// #region Homepage - Comp Column

//re-renders the team composition column
//unlike the other two, this depends on all three shared docs, so it reads the latest
//stored copy of each rather than taking one as a parameter
//shows every champion available in the currently selected region, icons only
function refreshRegionChampionGrid() {
    regionChampionGrid.innerHTML = '';
    const regionId = latestCurrentRegion?.selectedRegionId;
    if (!regionId) return;

    champions
        .filter(champion => champion.regions.includes(regionId))
        .forEach(champion => {
            const icon = document.createElement('div');
            icon.style.backgroundImage = `url("${champion.iconPath}")`;
            icon.className = 'region-champion-icon';
            regionChampionGrid.appendChild(icon);
        });
}

//recomputes --icon-size whenever the grid's available width changes: fits as many 50px-minimum
//icons as possible across that width, then splits the leftover evenly across all of them - one
//size computed from the container's width alone, so every region uses the same icon size
//regardless of how many icons it actually has
const regionChampionGridObserver = new ResizeObserver(entries => {
    const width = entries[0].contentRect.width;
    const iconCount = Math.floor(width / 50);
    if (iconCount === 0) return;
    const iconSize = width / iconCount;
    regionChampionGrid.style.setProperty('--icon-size', `${iconSize}px`);
});
regionChampionGridObserver.observe(regionChampionGrid);

function refreshComp() {
    compContent.innerHTML = '';
    refreshRegionChampionGrid();

    if (latestTeamComp) {
        //a comp has already been generated: show it, its ranking among every possible comp for
        //this region, and the buttons to move to another one
        //totalComps is just the cached comps list's length - no need to store it separately
        const totalComps = compsByRegion[latestCurrentRegion?.selectedRegionId]?.length || 0;
        //compIndex is this comp's position in that same score-sorted list (0 = best) - stored
        //by whichever generator function last wrote gameState/teamComp, so it works the same
        //whether the comp shown was the best, the next-best, or a random pick
        const compRank = (latestTeamComp.compIndex ?? 0) + 1;

        //iterate over roles (already ordered top/jng/mid/bot/sup) rather than latestTeamComp.comp,
        //whose order just depends on however the search happened to lock each player in
        const rolesContainer = document.createElement('div');
        rolesContainer.className = 'content-cutout';
        roles.forEach(role => {
            const assignment = latestTeamComp.comp.find(entry => entry.role === role.role);
            const champion = champions.find(c => c.id === assignment.championId);
            const slot = document.createElement('div');
            slot.className = 'role-slot';
            //built with createElement/textContent rather than innerHTML, since assignment.name
            //is a player-entered name - interpolating it into innerHTML would let a name like
            //"<img src=x onerror=...>" execute in every viewer's browser once a comp is generated
            const championIcon = document.createElement('img');
            championIcon.src = champion.iconPath;
            championIcon.className = 'region-entry-champion-icon';
            const nameSpan = document.createElement('span');
            nameSpan.textContent = assignment.name;
            const roleIcon = document.createElement('div');
            roleIcon.className = 'region-entry-role-icon';
            const roleIconMask = document.createElement('div');
            roleIconMask.style.setProperty('--icon-mask', `url("${role.iconDim}")`);
            roleIconMask.className = 'role-image-mask';
            roleIcon.appendChild(roleIconMask);
            slot.appendChild(championIcon);
            slot.appendChild(nameSpan);
            slot.appendChild(roleIcon);
            rolesContainer.appendChild(slot);
        });
        compContent.appendChild(rolesContainer);

        const infoText = document.createElement('span');
        infoText.className = 'comp-rank-text';
        infoText.textContent = `Comp ${compRank}/${totalComps}`;

        if (totalComps > 1) {
            //page-number style navigation: back arrow, the "Comp X/Y" text, forward arrow, all
            //on the same row - steps through the score-sorted comps list one at a time
            const pagination = document.createElement('div');
            pagination.className = 'comp-pagination';

            const backBtn = document.createElement('button');
            backBtn.className = 'comp-nav-btn';
            backBtn.textContent = '◀';
            backBtn.addEventListener('click', showPreviousBestComp);

            const forwardBtn = document.createElement('button');
            forwardBtn.className = 'comp-nav-btn';
            forwardBtn.textContent = '▶';
            forwardBtn.addEventListener('click', showNextBestComp);

            pagination.appendChild(backBtn);
            pagination.appendChild(infoText);
            pagination.appendChild(forwardBtn);
            compContent.appendChild(pagination);

            const randomBtn = document.createElement('button');
            randomBtn.className = 'randomise-btn full-width-btn';
            randomBtn.textContent = 'Roll A Random Comp';
            randomBtn.addEventListener('click', generateRandomComp);
            compContent.appendChild(randomBtn);
        } else {
            compContent.appendChild(infoText);
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
        generateBtn.textContent = 'Generate Comp';
        generateBtn.addEventListener('click', generateComp);
        compContent.appendChild(generateBtn);
    } else {
        //not enough set up yet to generate anything
        const message = document.createElement('p');
        message.className = 'comp-input-prompt';
        message.textContent = 'Enter players and a region';
        compContent.appendChild(message);
    }
}

//shows the single best (lowest-score) comp for the currently selected region - used for the
//initial "Generate Comp" click and whenever the region/roster changes and a fresh comp needs
//showing, since compsByRegion is always sorted best-first
async function generateComp() {
    const regionId = latestCurrentRegion?.selectedRegionId;
    const allComps = compsByRegion[regionId] || [];
    if (allComps.length === 0) return;

    await setDoc(doc(db, "gameState", "teamComp"), {
        comp: allComps[0],
        compIndex: 0
    });
}

//steps forward through the score-sorted comps list, wrapping back to the best comp once every
//option has been shown - used by the pagination row's forward arrow
async function showNextBestComp() {
    const regionId = latestCurrentRegion?.selectedRegionId;
    const allComps = compsByRegion[regionId] || [];
    if (allComps.length === 0) return;

    const nextIndex = ((latestTeamComp?.compIndex ?? -1) + 1) % allComps.length;

    await setDoc(doc(db, "gameState", "teamComp"), {
        comp: allComps[nextIndex],
        compIndex: nextIndex
    });
}

//steps backward through the score-sorted comps list, wrapping to the worst comp if you go back
//past the best one - used by the pagination row's back arrow
async function showPreviousBestComp() {
    const regionId = latestCurrentRegion?.selectedRegionId;
    const allComps = compsByRegion[regionId] || [];
    if (allComps.length === 0) return;

    const previousIndex = ((latestTeamComp?.compIndex ?? 0) - 1 + allComps.length) % allComps.length;

    await setDoc(doc(db, "gameState", "teamComp"), {
        comp: allComps[previousIndex],
        compIndex: previousIndex
    });
}

//picks a uniformly random comp for the currently selected region, avoiding any comp already
//shown until every option has been shown once - used by the "Roll A Random Comp" button
async function generateRandomComp() {
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
        compIndex: chosenIndex,
        shownIndexes: [...shownIndexes, chosenIndex]
    });
}
// #endregion

// #region Comp Generation Algorithm
//pure logic - takes players/region data in, returns comps out, no DOM or firestore involved

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
        //rank is this player's preference order for this entry (1 = most wanted) - carried
        //through resolve() unchanged on every option object, so a finished comp's decisions
        //still have it for scoring in compScore()
        player[region.indexNo].forEach((item, itemIndex) => {
            preferences.push({ name: player.name, championId: item.championId, role: item.role, rank: itemIndex + 1 })
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

//a comp's score is the sum of each player's rank (1 = most wanted) for the combo they got
//assigned - lower is better, since it means everyone is closer to their top choice
function compScore(comp) {
    return comp.reduce((sum, decision) => sum + decision.rank, 0)
}

//returns every valid comp for this region: the exhaustive list of assignments with 5 unique roles
//and 5 unique champions, sorted best (lowest score) first
function generateAllPossibleComps(players, region) {
    const initialState = buildInitialState(players, region)
    const allComps = resolve(initialState, null)
    allComps.sort((a, b) => compScore(a) - compScore(b))
    return allComps
}

//draws one random comp out of every valid comp for this region
function pickRandomComp(players, region) {
    const allComps = generateAllPossibleComps(players, region)
    const randomIndex = Math.floor(Math.random() * allComps.length)
    return allComps[randomIndex]
}
// #endregion

// #region Homepage - Refresh Plumbing & Listeners

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
//rebuilds the comp cache and re-renders regions/comp - anything that can change which comps
//are possible (the active roster changing, or an already-active player's preferences changing)
//should call this so the rest of the app catches up, rather than going stale until the next
//unrelated roster change happens to trigger it
async function refreshAfterRosterOrDataChange() {
    await refreshCache(latestActivePlayers);
    await deselectRegionIfNowImpossible();
    //if a region is still selected and still feasible, regenerate a fresh comp for it
    //immediately instead of leaving the user to click Generate Comp again
    const regionId = latestCurrentRegion?.selectedRegionId;
    if (regionId && hasFullRoster() && isRegionCurrentlyPossible(regionId)) {
        await generateComp();
    }
    refreshRegions(latestCurrentRegion);
    refreshComp();
}

onSnapshot(doc(db, "gameState", "activePlayers"), async (snapshot) => {
    latestActivePlayers = snapshot.data();
    refreshPlayers(latestActivePlayers);
    await refreshAfterRosterOrDataChange();
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
// #endregion

// #region Modal Helpers (show/hide)

//shows a modal by adding the active class to its backdrop
function showModal(backdrop) {
    backdrop.classList.add("active");
}

//hides a modal by removing the active class from its backdrop
function hideModal(backdrop) {
    backdrop.classList.remove("active");
}
// #endregion

// #region New Player Modal

//set up consts
const newPlayerBackdrop = document.getElementById("new-player-modal-backdrop");
const newPlayerHeading = document.getElementById("new-player-heading");
const newPlayerNameInput = document.getElementById("new-player-name-input");
const newPlayerNextBtn = document.getElementById("new-player-next-btn");
const newPlayerCloseBtn = document.getElementById("new-player-close-btn");
const newPlayerNameError = document.getElementById('new-player-name-error');

//function to start the modal
//mode "edit" reuses this same modal to rename an existing player instead of creating a new one
function openNewPlayerModal(name, mode) {
    currentFlow = mode === "edit" ? "edit-name" : "new-player";
    newPlayerHeading.textContent = mode === "edit" ? "Edit Name" : "New Player";
    newPlayerNextBtn.textContent = mode === "edit" ? "Done" : "Next";
    newPlayerNameInput.value = name; //clears the input from any previous values
    newPlayerNameError.textContent = ''; //wipes any previous error message
    showModal(newPlayerBackdrop);
}

//functionality of each button

//validates a player name before it's used as a firestore document id, and keeps it short
//enough to fit in the player-slot/select-player UI - returns an error message to show the
//user, or null if the name is fine
function getNameValidationError(name) {
    if (name.length > 25) return "Name can't be longer than 25 characters.";
    //firestore document ids can't contain a forward slash, can't be exactly "." or "..", and
    //can't match __*__ (reserved for firestore's own internal use) - since names are used as
    //doc ids directly, a name that broke any of these would fail to save with a confusing
    //firestore error instead of a clean validation message here
    if (name.includes('/')) return "Name can't contain a / character.";
    if (name === '.' || name === '..') return "That name isn't allowed.";
    if (/^__.*__$/.test(name)) return "That name isn't allowed.";
    return null;
}

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

    //check the name against firestore/UI constraints - just show the message, no shake
    const validationError = getNameValidationError(name);
    if (validationError) {
        newPlayerNameError.textContent = validationError;
        return;
    }

    if (currentFlow === "edit-name") {
        //renaming an existing player rather than creating a new one
        if (name !== currentPlayerName) {
            const taken = await isNameTaken(name);
            if (taken) {
                newPlayerNameError.textContent = 'That name is already taken.';
                return;
            }
            await renamePlayer(currentPlayerName, name);
            currentPlayerName = name;
        }
        hideModal(newPlayerBackdrop);
        //currentPlayerData's preference content is unaffected by a rename, so skip re-fetching it
        await openSelectRegionModal(true);
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
    openRegionalModal(currentRegionIndex);

})

//closes the modal when the close button is clicked
newPlayerCloseBtn.addEventListener('click', async () => {
    hideModal(newPlayerBackdrop);
    if (currentFlow === "edit-name") {
        //return to the select-region modal instead of abandoning at the homepage, matching Done
        await openSelectRegionModal(true);
    }
});
// #endregion

// #region Regional Modal

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
//NOTE: doesn't touch currentFlow - it inherits whatever the caller already set ("new-player"
//for the new-player loop, "select-region" for editing one existing region), so this function
//and Done/Back/Close below can all tell which flow they're in without a separate variable
function openRegionalModal(regionIndex) {
    currentRegionId = regions[regionIndex].id;
    //the new-player flow steps through every region in order, so show progress through the
    //full list - editing a single existing region isn't part of that sequence, so skip it there
    const progress = currentFlow === "new-player" ? ` (${regionIndex + 1}/${regions.length})` : "";
    regionModalHeading.textContent = "Region: " + regions[regionIndex].regionName + progress;
    if (currentFlow === "select-region") {
        //editing an existing player: load this region's already-saved preferences
        pendingPreferences[regionIndex] = currentPlayerData?.[regionIndex] ? [...currentPlayerData[regionIndex]] : [];
    }
    //otherwise (the new-player flow) pendingPreferences was already populated by the caller
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
        const mostPlayedRole = championRoleStats[champion.id];
        if (mostPlayedRole) {
            selectRole(mostPlayedRole);
        }
    });
    return option;
}

//shared by the role dropdown's own click handler and the champion-select auto-fill above
function selectRole(roleCode) {
    const role = roles.find(r => r.role === roleCode);
    if (!role) return;
    selectedRole = role.role;
    roleDropdownToggle.innerHTML = `<img src="${role.iconSelected}" class="dropdown-toggle-icon">`;
    roleDropdownList.classList.remove('open');
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
        selectRole(role.role);
    });
    return option;
}

//fills the dropdown list with every role, minus whichever is already selected
function populateRoleDropdown() {
    roleDropdownList.innerHTML = '';
    roles.forEach(role => {
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

//set while a row is being dragged - module-level since dragstart/dragover/dragend all fire on
//different elements and need to agree on which row is currently being moved
let draggedRow = null;

//renumbers every row's rank label to match its current DOM position - called after the dragged
//row physically moves, so the numbers update live as you drag rather than only once you drop
function renumberEntryRows() {
    Array.from(regionEntriesList.children).forEach((row, index) => {
        row._rankEl.textContent = index + 1;
    });
}

//writes pendingPreferences back out in whatever order the rows currently sit in the DOM - each
//row kept a direct reference to its own entry object, so this doesn't need index bookkeeping
function commitEntriesOrder() {
    pendingPreferences[currentRegionIndex] = Array.from(regionEntriesList.children).map(row => row._entry);
}

//builds one row for the entries list: a rank number outside the box, then the box itself
//(champ icon, champ name, role icon, delete button). draggable as a whole so the user can
//reorder preferences from most to least wanted - the array order in pendingPreferences IS the
//rank, so reordering here is just an array splice, no separate rank field needed
function constructListElement(entry, entryIndex) {
    const champion = champions.find(c => c.id === entry.championId);
    const role = roles.find(r => r.role === entry.role);

    const row = document.createElement('div');
    row.className = 'region-entry-row';
    row.draggable = true;
    //stashed directly on the element so deletion and drag-reordering can both identify this
    //row's entry without relying on entryIndex, which goes stale the moment a drag reorders things
    row._entry = entry;

    const rank = document.createElement('span');
    rank.className = 'region-entry-rank';
    rank.textContent = entryIndex + 1;
    row._rankEl = rank;

    const entryBox = document.createElement('div');
    entryBox.className = 'region-entry';
    entryBox.innerHTML = `
        <img src="${champion.iconPath}" class="region-entry-champion-icon">
        <span>${champion.name}</span>
        <img src="${role.iconSelected}" class="region-entry-role-icon">
    `;

    //deletes just this entry from the list, then re-renders to reflect it - looked up by
    //reference rather than the captured entryIndex, for the same staleness reason as above
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'region-entry-delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => {
        const list = pendingPreferences[currentRegionIndex];
        const currentIndex = list.indexOf(entry);
        if (currentIndex !== -1) list.splice(currentIndex, 1);
        renderEntriesList();
    });
    entryBox.appendChild(deleteBtn);

    row.addEventListener('dragstart', () => {
        draggedRow = row;
        row.classList.add('dragging');
    });
    row.addEventListener('dragend', () => {
        row.classList.remove('dragging');
        draggedRow = null;
        commitEntriesOrder();
    });
    //moves the dragged row itself in front of or behind whichever row the pointer is currently
    //over, based on which half of it the pointer is in - live, so the list visibly reorders as
    //you drag rather than only snapping into place on drop
    row.addEventListener('dragover', (event) => {
        event.preventDefault();
        if (!draggedRow || draggedRow === row) return;
        const rect = row.getBoundingClientRect();
        const isAfter = event.clientY > rect.top + rect.height / 2;
        regionEntriesList.insertBefore(draggedRow, isAfter ? row.nextSibling : row);
        renumberEntryRows();
    });

    row.appendChild(rank);
    row.appendChild(entryBox);

    return row;
}

//allows dropping below the last row (empty space under the list), otherwise the dragged row
//could never move past the end since there's no row there to fire its own dragover
regionEntriesList.addEventListener('dragover', (event) => {
    event.preventDefault();
    if (!draggedRow) return;
    if (event.target === regionEntriesList) {
        regionEntriesList.appendChild(draggedRow);
        renumberEntryRows();
    }
});

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
    if (pendingPreferences[currentRegionIndex].length >= 10) {
        regionEntriesError.textContent = "Can't have more than 10 options, delete one to add more";
        return;
    }
    pendingPreferences[currentRegionIndex].push({ championId: selectedChampionId, role: selectedRole });
    renderEntriesList();
});

//saves the entries and moves on once done is clicked
regionDoneBtn.addEventListener('click', async () => {
    if (currentFlow === "select-region") {
        //editing one region of an existing player: merge this region's edits into the full
        //cached player data, save it, and return to the select-region-to-edit modal
        currentPlayerData[currentRegionIndex] = pendingPreferences[currentRegionIndex];
        await updateFireStore(currentPlayerName, currentPlayerData);
        //this player's preferences just changed - if they're currently active, the comp
        //cache/display need to catch up too, since nothing else would trigger that here.
        //not awaited: it only affects the regions/comp columns, not this modal, so it can
        //run in the background instead of holding up the transition back to this screen
        if (latestActivePlayers?.names?.includes(currentPlayerName)) {
            refreshAfterRosterOrDataChange();
        }
        hideModal(regionalBackdrop);
        //currentPlayerData is already up to date (we just merged the edit into it ourselves),
        //so skip re-fetching the very doc we just wrote
        await openSelectRegionModal(true);
        return;
    }
    //update the saved list in pending prefereences
    if (currentRegionIndex < 12) {
        currentRegionIndex++;
        openRegionalModal(currentRegionIndex);
    } else {
        await updateFireStore(currentPlayerName, pendingPreferences);
        hideModal(regionalBackdrop);
    }

});

//goes back to the previous step
regionBackBtn.addEventListener('click', async () => {
    if (currentFlow === "select-region") {
        //editing a single existing region: there's no "previous region" to step back through,
        //so just discard any unsaved changes here and return to the region-select screen
        hideModal(regionalBackdrop);
        await openSelectRegionModal(true);
        return;
    }
    //return to the previous modal in the flow
    if (currentRegionIndex == 0) {
        hideModal(regionalBackdrop);
        openNewPlayerModal(currentPlayerName);
    } else {
        currentRegionIndex--;
        openRegionalModal(currentRegionIndex);
    }

});

//closes the modal when the close button is clicked
regionCloseBtn.addEventListener('click', () => {
    //captured now, since openAreYouSureModal() overwrites currentFlow before the confirm
    //callback below ever runs
    const cameFromEditFlow = currentFlow === "select-region";
    openAreYouSureModal(
        "Are you sure you want to close without saving your changes?",
        async () => {
            hideModal(regionalBackdrop);
            if (cameFromEditFlow) {
                //editing an existing player: return to the select-region-to-edit modal instead
                //of just closing everything down to the homepage
                await openSelectRegionModal(true);
            }
        }
    );
});
// #endregion

// #region Are You Sure Modal

//set up consts
const areYouSureBackdrop = document.getElementById("are-you-sure-modal-backdrop");
const areYouSureMessage = document.getElementById("are-you-sure-message");
const areYouSureConfirmBtn = document.getElementById("are-you-sure-confirm-btn");
const areYouSureCancelBtn = document.getElementById("are-you-sure-cancel-btn");
const areYouSureCloseBtn = document.getElementById("are-you-sure-close-btn");

let pendingConfirmAction = null; // what to run if "Yes" is clicked, set fresh each time this opens

//function to start the modal - message is shown to the user, onConfirm runs if they click "Yes"
function openAreYouSureModal(message, onConfirm) {
    currentFlow = "are-you-sure";
    areYouSureMessage.textContent = message;
    pendingConfirmAction = onConfirm;
    showModal(areYouSureBackdrop);
}

//functionality of each button

//runs whatever action was pending once confirmed
areYouSureConfirmBtn.addEventListener('click', async () => {
    hideModal(areYouSureBackdrop);
    if (pendingConfirmAction) {
        await pendingConfirmAction();
    }
});

//closes the modal when cancel is clicked
areYouSureCancelBtn.addEventListener('click', () => {
    hideModal(areYouSureBackdrop);
});

//closes the modal when the close button is clicked
areYouSureCloseBtn.addEventListener('click', () => {
    hideModal(areYouSureBackdrop);
});
// #endregion

// #region Select Player Modal

//set up consts
const selectPlayerBackdrop = document.getElementById("select-player-modal-backdrop");
const selectPlayerHeading = document.getElementById("select-player-heading");
const selectPlayerGrid = document.getElementById("select-player-grid");
const selectPlayerCloseBtn = document.getElementById("select-player-close-btn");

//function to start the modal - purpose is "add" (pick an existing player to bring into the
//active game) or "edit" (pick a player to edit their region preferences)
async function openSelectPlayerModal(purpose) {
    currentFlow = "select-player";
    selectPlayerHeading.textContent = purpose === "edit" ? "Select Player to Edit" : "Select Player";
    //populate the list of existing players to choose from, then reveal the modal
    await populateSelectPlayerGrid(purpose);
    showModal(selectPlayerBackdrop);
}

//fills the grid with one button per existing player, behaving differently per purpose:
//"add" disables anyone already active and adds the pick to the active list; "edit" disables
//nobody and opens the select-region-to-edit modal for the pick instead
async function populateSelectPlayerGrid(purpose) {
    selectPlayerGrid.innerHTML = '';
    const playerNames = await getAllPlayerNames();
    const activeNames = latestActivePlayers?.names || [];
    playerNames.forEach(name => {
        const button = document.createElement('button');
        button.className = 'select-player-btn';
        button.textContent = name;
        if (purpose === "add" && activeNames.includes(name)) {
            //already on the active list, show it but don't let it be picked again
            button.classList.add('select-player-btn-disabled');
            button.disabled = true;
        } else if (purpose === "add") {
            //picking a player closes the modal and adds them to the shared active-players list
            button.addEventListener('click', async () => {
                hideModal(selectPlayerBackdrop);
                await addPlayerToList(name);
            });
        } else {
            //picking a player closes this modal and opens the select-region-to-edit modal
            button.addEventListener('click', async () => {
                hideModal(selectPlayerBackdrop);
                currentPlayerName = name;
                await openSelectRegionModal();
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
// #endregion

// #region Select Region Modal

//set up consts
const selectRegionBackdrop = document.getElementById("select-region-modal-backdrop");
const selectRegionCloseBtn = document.getElementById("select-region-close-btn");
const selectRegionBackBtn = document.getElementById("select-region-back-btn");
const editRegionButtons = document.querySelectorAll('.edit-region-btn');

//function to start the modal
//skipFetch: pass true when currentPlayerData is already known to be fresh (e.g. right after
//saving an edit), to avoid a redundant re-fetch of the doc we just wrote ourselves
async function openSelectRegionModal(skipFetch) {
    currentFlow = "select-region";
    if (!skipFetch) {
        //fetch the full doc for the player being edited, then show each region's saved champ icons
        const playerRef = doc(db, "players", currentPlayerName);
        const snapshot = await getDoc(playerRef);
        currentPlayerData = snapshot.data() || {};
    }
    renderEditRegionIcons();
    showModal(selectRegionBackdrop);
}

//fills each region button with icons for the champions currently picked in that region
function renderEditRegionIcons() {
    editRegionButtons.forEach(button => {
        const region = regions.find(r => r.id === button.dataset.regionId);
        const iconsContainer = button.querySelector('.edit-region-champ-icons');
        iconsContainer.innerHTML = '';
        const entries = currentPlayerData[region.indexNo] || [];
        //the rank number, champion icon and role icon for each preference - array order IS the
        //rank (1 = most wanted), same as the region-entries-list in the regional modal.
        //the rank sits in an unbordered wrapper alongside a separate bordered box holding just
        //the two icons, so the number itself reads as outside the box
        entries.forEach((preferencePair, prefIndex) => {
            const champion = champions.find(c => c.id === preferencePair.championId);
            const role = roles.find(r => r.role === preferencePair.role)
            //skip anything that no longer matches a real champion or role
            if (!champion || !role) return;

            const wrapper = document.createElement('div');
            wrapper.className = 'preference-pair';

            const rank = document.createElement('span');
            rank.className = 'preference-pair-rank';
            rank.textContent = prefIndex + 1;

            const box = document.createElement('div');
            box.className = 'preference-pair-box';
            const championIcon = document.createElement('img');
            const roleIcon = document.createElement('img');
            championIcon.src = champion.iconPath;
            championIcon.className = 'edit-region-champ-icon';
            roleIcon.src = role.iconSelected;
            roleIcon.className = 'edit-region-role-icon';
            box.appendChild(championIcon);
            box.appendChild(roleIcon);

            wrapper.appendChild(rank);
            wrapper.appendChild(box);
            iconsContainer.appendChild(wrapper);
        });
    });
}

//functionality of each button

//picking a region closes this modal and opens the regional modal for it, sourced from firestore
editRegionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const regionIndex = regions.findIndex(r => r.id === button.dataset.regionId);
        currentRegionIndex = regionIndex;
        hideModal(selectRegionBackdrop);
        openRegionalModal(regionIndex);
    });
});

//closes the modal when the close button is clicked
selectRegionCloseBtn.addEventListener('click', () => {
    hideModal(selectRegionBackdrop);
});

//goes back to the select-players modal
selectRegionBackBtn.addEventListener('click', () => {
    hideModal(selectRegionBackdrop);
    openSelectPlayerModal("edit");
});

//opens the new-player modal in "edit" mode, pre-filled with the current name
const editPlayerNameBtn = document.getElementById("edit-player-name-btn");
editPlayerNameBtn.addEventListener('click', () => {
    hideModal(selectRegionBackdrop);
    openNewPlayerModal(currentPlayerName, "edit");
});

//opens the are-you-sure modal to confirm permanently deleting the player being edited
const deletePlayerBtn = document.getElementById("delete-player-btn");
deletePlayerBtn.addEventListener('click', () => {
    openAreYouSureModal(
        "Deleting a player profile is permanent and cannot be undone, do you still want to delete this profile?",
        async () => {
            await deletePlayer(currentPlayerName);
            hideModal(selectRegionBackdrop);
            openSelectPlayerModal("edit");
        }
    );
});
// #endregion

// #region Patch Notes Modal

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
// #endregion

// #region Champion Role Stats
// champion-roles.json is written by the scheduled "Update Champion Roles" GitHub Action
// (scripts/update-champion-roles.js) - nothing here writes to it, this just keeps a local copy
// fresh. Polled instead of fetched once, since the file can change underneath a tab that's been
// open a while; soft-updated in memory rather than forcing a reload so it never interrupts
// whatever the user is doing (e.g. mid-modal).
//
// not read anywhere yet - this is just the loading/polling infrastructure, ready for whatever
// uses it once that's decided
let championRoleStats = {};

async function loadChampionRoleStats() {
    try {
        const response = await fetch('champion-roles.json?t=' + Date.now());
        if (!response.ok) return; // the action may not have run yet
        championRoleStats = await response.json();
    } catch {
        //network hiccup or missing file - keep whatever's already loaded and try again next poll
    }
}

loadChampionRoleStats();
setInterval(loadChampionRoleStats, 30 * 60 * 1000); // re-check every 30 minutes
// #endregion

// #region Champion Stats Modal
// temporary debug/tracking view of role-frequency-table.json - the full in-progress data
// (tally/confidence/done per champion), not the simplified champion-roles.json above. Fetched
// fresh only when opened, since this is a rarely-viewed debug tool, not something worth polling
// in the background for every visitor.

//set up consts
const championStatsBackdrop = document.getElementById("champion-stats-modal-backdrop");
const championStatsContent = document.getElementById("champion-stats-content");
const championStatsBtn = document.getElementById("champion-stats-btn");
const championStatsCloseBtn = document.getElementById("champion-stats-close-btn");

//function to start the modal
async function openChampionStatsModal() {
    await populateChampionStats();
    showModal(championStatsBackdrop);
}

//fetches role-frequency-table.json and renders one row per champion, sorted alphabetically
async function populateChampionStats() {
    championStatsContent.innerHTML = '';
    const response = await fetch('role-frequency-table.json?t=' + Date.now());
    if (!response.ok) {
        //the scheduled job may not have run yet, or hasn't written this file yet
        const message = document.createElement('p');
        message.textContent = "No data yet - the scheduled job hasn't produced any results yet.";
        championStatsContent.appendChild(message);
        return;
    }
    const state = await response.json();
    const entries = Object.values(state.frequencyTable)
        .sort((a, b) => a.tally - b.tally);

    entries.forEach(entry => {
        championStatsContent.appendChild(buildChampionStatsRow(entry));
    });
}

//builds one row: champ icon, name, sample size, most-played role icon, confidence, done tickbox
function buildChampionStatsRow(entry) {
    const champion = champions.find(c => c.id === entry.id);

    //find whichever of the 5 roles currently has this champion's highest tally
    let mostPlayedRole = null;
    let highestTally = 0;
    roles.forEach(role => {
        if (entry[role.role] > highestTally) {
            mostPlayedRole = role;
            highestTally = entry[role.role];
        }
    });

    const row = document.createElement('div');
    row.className = 'champion-stats-entry';
    row.classList.toggle('done', entry.done);

    const icon = document.createElement('img');
    icon.className = 'champion-stats-icon';
    icon.src = champion.iconPath;

    const name = document.createElement('span');
    name.className = 'champion-stats-name';
    name.textContent = champion.name;

    const tally = document.createElement('span');
    tally.className = 'champion-stats-tally';
    tally.textContent = entry.tally;

    const roleIcon = document.createElement('img');
    roleIcon.className = 'champion-stats-role-icon';
    //no role played yet - leave the icon blank rather than pointing at a role that isn't real
    if (mostPlayedRole) roleIcon.src = mostPlayedRole.iconSelected;

    const confidence = document.createElement('span');
    confidence.className = 'champion-stats-confidence';
    confidence.textContent = entry.confidence === null ? '—' : `${(entry.confidence * 100).toFixed(1)}%`;

    const done = document.createElement('input');
    done.type = 'checkbox';
    done.className = 'champion-stats-done';
    done.checked = entry.done;
    done.disabled = true; //display only, not editable

    row.appendChild(icon);
    row.appendChild(name);
    row.appendChild(tally);
    row.appendChild(roleIcon);
    row.appendChild(confidence);
    row.appendChild(done);

    return row;
}

//functionality of each button

//opens the modal when the header button is clicked
championStatsBtn.addEventListener('click', openChampionStatsModal);

//closes the modal when the close button is clicked
championStatsCloseBtn.addEventListener('click', () => {
    hideModal(championStatsBackdrop);
});
// #endregion

// #region Firebase Helper Functions

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
    //setDoc creates the document if it doesn't exist yet, or overwrites it if it does.
    //merge:true so this only ever touches the region keys actually present in `preferences` -
    //without it, a caller holding a stale/incomplete in-memory copy of this doc (e.g. from a
    //getDoc that raced a delete, or any other bug) would silently wipe every region key it
    //doesn't know about, since a non-merged setDoc replaces the whole document
    await setDoc(playerRef, preferences, { merge: true });
}

//renames a player - firestore has no rename operation, so this copies their doc under the new
//name then deletes the old one, and fixes up the shared active-players list if they're on it
async function renamePlayer(oldName, newName) {
    await setDoc(doc(db, "players", newName), currentPlayerData);
    await deleteDoc(doc(db, "players", oldName));
    if (latestActivePlayers?.names?.includes(oldName)) {
        const updatedNames = latestActivePlayers.names.map(name => name === oldName ? newName : name);
        await setDoc(doc(db, "gameState", "activePlayers"), { names: updatedNames });
    }
}

//permanently deletes a player's saved profile, removing them from the active list too if
//they're currently on it (removePlayerFromList also clears any now-stale generated comp)
async function deletePlayer(name) {
    await deleteDoc(doc(db, "players", name));
    if (latestActivePlayers?.names?.includes(name)) {
        await removePlayerFromList(name);
    }
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
// #endregion
