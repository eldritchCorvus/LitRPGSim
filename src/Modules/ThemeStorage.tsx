import * as Stat from './Stat';

export const ADDICTION = "addiction";
export const SPYING = "spying";
export const HEALING = "healing";
export const DOLLS = "dolls";
export const OBFUSCATION = "obfuscation";
export const DARKNESS = "darkness";
export const KILLING = "killing";
export const MUSIC = "music";
export const DEFENSE = "defense";
export const QUESTING = "questing";
export const BUGS = "bugs";
export const LANGUAGE = "language";
export const CRAFTING = "crafting";
export const GUIDING = "guiding";
export const KNOWING = "knowing";
export const ENDINGS = "endings";
export const ROYALTY = "royalty";
export const WEB = "web";
export const ANGER = "anger";
export const SOUL = "soul";
export const LOVE = "love";
export const ZAP = "zap";
export const CHOICES = "choices";
export const DECAY = "decay";
export const PLANTS = "plants";
export const keys = [PLANTS,DECAY,CHOICES,ZAP,LOVE,SOUL,ANGER,WEB,ROYALTY,ENDINGS,KNOWING,GUIDING,CRAFTING,ADDICTION,SPYING,HEALING,DOLLS,OBFUSCATION,DARKNESS,KILLING,MUSIC,DEFENSE,QUESTING,BUGS,LANGUAGE];


interface ThemeStatMap {
    [details: string] : Stat.Stat[];
}

interface ThemePossibilitiesMap {
    [details: string] : string[];
}
export const stats_map:ThemeStatMap = {
    HEALING: [Stat.LIFE(1)],
    PLANTS: [Stat.LIFE(1)],
    DECAY: [Stat.DOOM(1)],
    CHOICES: [Stat.MIND(1)],
    ZAP: [Stat.MIND(1)],
    LOVE: [Stat.HEART(1)],
    SOUL: [Stat.HEART(1)],
    ANGER: [Stat.RAGE(1)],
    WEB: [Stat.DOOM(1)],
    ROYALTY: [Stat.HOPE(1)],
    ENDINGS: [Stat.TIME(1)],
    KNOWING: [Stat.LIGHT(1)],
    GUIDING: [Stat.LIGHT(1)],
    CRAFTING: [Stat.SPACE(1)],
    LANGUAGE: [Stat.LIGHT(1)],
    BUGS: [Stat.LIFE(1)],
    ADDICTION: [Stat.HEART(1)],
    SPYING: [Stat.LIGHT(1)],
    CLOWNS: [Stat.RAGE(1)],
    DOLLS: [Stat.HEART(1)],
    OBFUSCATION: [Stat.VOID(1)],
    DARKNESS: [Stat.VOID(1)],
    KILLING: [Stat.RAGE(1)],
    MUSIC: [Stat.HOPE(1)],
    DEFENSE: [Stat.HOPE(1)],
    QUESTING: [Stat.HOPE(1)],
};


export const solo_name_possibilities_map:ThemePossibilitiesMap = {
    HEALING: ["Heal", "Cure", "Regeneration"],
    PLANTS:["Growth", "Summon Plants", "Overgrow"],
    DECAY: ["Inevitable Rot", "Festering Growth", "Destroy Plants"],
    CHOICES: ["Consider Choices", "Two Paths", "Ironically Flip Coin"],
    ZAP: ["Sparking Bolt", "Magic Missle", "Zap"],
    LOVE:["Cupid's Arrow"],
    SOUL: ["Soul Music"],
    ANGER: ["Beserk Rage"],
    WEB: ["Web of Fate", "Destiny Bond", "Show Destiny"],
    ROYALTY:["Royal Decree", "Royal Perogative", "Royal Right", "Royal Command"],
    ENDINGS: ["Final Finale", "Coda", "Postscript"],
    KNOWING: ["Identify Item", "Detect Magic", "See Life", "Appraisal"],
    GUIDING: ["Goal Path", "Summon Tutorial", "Pathfinding", "Forestry", "Hiking"],
    CRAFTING:["Mining", "Wood Carving", "Fiber Arts", "Logging", "Jewlery Making"],
    LANGUAGE:  ["Language", "Speech", "Writing", "Scribing"],
    BUGS: ["Summon Swarm"],
    ADDICTION: ["Addicting Personality","Gamblers Fallacy"],
    SPYING: ["Binoculars","Clairvoyance"],
    CLOWNS: ["Circus Time","Clown Car"],
    DOLLS: ["Tea Party"],
    OBFUSCATION:["Befuddlement","Obscuring Aura"],
    DARKNESS: ["Nightfall","Voidfall"],
    KILLING:["Assasin's Stance","Bloodlust"],
    MUSIC: ["Starting Sonata","Dancing Ditty"],
    DEFENSE: ["Something to Protect"],
    QUESTING: ["Remember Quest","Show Quests","X Marks the Spot"],
};

export const first_name_possibilities_map:ThemePossibilitiesMap = {
    HEALING: ["Healing", "Curing", "Restoring","Fixing","Mending","Doctoring","Medical"],
    PLANTS: ["Forest", "Field", "Meadow","Plant","Flower","Blossom","Root","Leaf","Growth"],
    DECAY: ["Rot", "Decay", "Fester","Languish","Entropy"],
    CHOICES: ["Janus", "Choice", "Selection"],
    ZAP: ["Zap", "Bolt", "Spark","Electrical","Buzzing"],
    LOVE: ["Kiss", "Hug", "Caress","Touch"],
    SOUL: ["Core", "Soul", "Spirit","Essence"],
    ANGER: ["Beserker's", "Stampeding", "Raging","Furious","Rebel's"],
    WEB: ["Destiny", "Fate", "Web","Tapestry","Providence","Promise"],
    ROYALTY: ["Royal", "King", "Queen", "Lord", "Crown","Commanding","Empire"],
    ENDINGS: ["Finale", "Coda", "Epilogue", "Ending","Curtain", "Applause"],
    KNOWING: ["Knowledge", "Instinct", "Truth","Idea","Gnosis","Awareness","Sense"],
    GUIDING:["Path", "Road", "Journey","Destination","Trip","Guide"],
    CRAFTING:["Crystal", "Rock", "Log", "Carving", "Cloth", "Ax", "Pickax", "Gem", "Anvil", "Crucible","Hammer","Ax","Needle"],
    LANGUAGE: ["Words", "Runes", "Speech", "Tongue"],
    BUGS: ["Plague", "Swarm","Hive"],
    ADDICTION: ["Craving", "Addiction","High","Habit","Compulsion"],
    SPYING: ["Voyeuristic", "Watching","Observing","Spying","Seeking"],
    CLOWNS: ["Tumble", "Flip","Joke","Pratfall","Dance","Performance","Clown","Jester","Mime"],
    DOLLS: ["Doll", "Mannequin","Statue","Dressform","Dummy"],
    OBFUSCATION:["Hiding", "Obscuring","Confounding","Confusing","Blinding"],
    DARKNESS: ["Darkness", "Black","Inky","Night","Midnight"],
    KILLING: ["Killing", "Murder","Slaughter","Massacre","Blade","Gun"],
    MUSIC: ["Fortississimo", "Leitmotif", "Liberetto", "Sarabande", "Serenade", "Anthem", "Crescendo", "Vivace", "Encore", "Vivante", "Allegretto", "Fugue", "Choir", "Nobilmente", "Hymn", "Eroico", "Chant", "Mysterioso", "Diminuendo", "Perdendo", "Staccato", "Allegro", "Caloroso", "Nocturne","Cadenza", "Cadence", "Waltz", "Concerto", "Finale", "Requiem", "Coda", "Dirge", "Battaglia", "Leggiadro", "Capriccio", "Presto", "Largo", "Accelerando", "Polytempo", "Overture", "Reprise", "Orchestra"],
    DEFENSE: ["Shield", "Defense","Protection","Armor"],
    QUESTING: ["Quest", "Seeking","Questing"],
};




export const second_name_possibilities_map:ThemePossibilitiesMap = {
    HEALING:["Healing","Doctor", "Medical","Fix","Mend","Curative", "Restorative"],
    PLANTS: ["Growth", "Plants", "Leaves", "Branches", "Flowers","Blossoms","Forests","Roots","Green"],
    DECAY: ["Decaying","Festering", "Rotting","Languishing"],
    CHOICES: ["Choice","Janus", "Options","Alternatives"],
    ZAP: ["Electricity","Zap", "Bolt","Spark"],
    LOVE: ["Fondness","Love","Hearts", "Devotion","Romance"],
    SOUL: ["Self","Soul", "Spirit","Identity"],
    ANGER:["Temper","Rage", "Anger","Rebellion","Refusal"],
    WEB: ["Destiny", "Providence", "Fated", "Promised", "Threads","Webs"],
    ROYALTY: ["Decree", "Doctrine", "Crown","Kingdom"],
    ENDINGS: ["Finality", "Endings", "Finales","Curtains"],
    KNOWING: ["Sight", "Book", "Scroll", "Facts", "Gnosis","Idea","Knowledge"],
    GUIDING: ["Path", "Road", "Journey","Destinations","Travel"],
    CRAFTING: ["Rock", "Crystal", "Gem","Carving","Wood","Metal","Ore","Ingots"],
    LANGUAGE: ["Speech", "Words", "Runes","Letters","Characters","Ink","Paper"],
    BUGS: ["Bugs", "Maggots", "Flies", "Worms","Locusts"],
    ADDICTION:["Cravings", "Compulsion", "Dependence","Habit"],
    SPYING: ["Eyes", "Cameras", "Spies","Recordings"],
    CLOWNS: ["Jesters","Clowns", "Harlequins", "Mimes"],
    DOLLS: ["Dolls", "Statues", "Mannequins","Plastic","Wax Figures"],
    OBFUSCATION: ["Confusion", "Befuddlement","Obscura"],
    DARKNESS: ["Shadows", "Void", "Darkness","Nothingness"],
    KILLING: ["Death", "Violence", "Blades","Guns"],
    MUSIC: ["Song", "Oveture", "Orchestra","Notes"],
    DEFENSE: ["Shields", "Armor","Protection"],
    QUESTING: ["Quest", "Attainment","Goal"],
};

export const super_name_possibilities_map:ThemePossibilitiesMap = {
    HEALING: ["Summon Phoenix"],
    PLANTS: ["Forest's March"],
    DECAY: ["Mass Grave"],
    CHOICES: ["Alternate Timeline"],
    ZAP: ["Thor's Banana"],
    LOVE: ["Mandatory Shipping Grid"],
    SOUL: ["Know thyself."],
    ANGER: ["Dethrone Creation"],
    WEB: ["Puppet Master"],
    ROYALTY: ["Excalibur"],
    ENDINGS: ["The End"],
    KNOWING: ["Omniscience"],
    GUIDING:["Path To Victory"],
    CRAFTING: ["Legendary Forge"],
    LANGUAGE: ["Topple the Tower"],
    BUGS: ["Hivemother"],
    ADDICTION: ["Dealer's Delight"],
    SPYING: ["Surveillance State"],
    CLOWNS:["Ringmaster"],
    DOLLS: ["Automatonophobia "],
    OBFUSCATION: ["Knowledge Forever Lost"],
    DARKNESS: ["Eternal Night"],
    KILLING: ["Total War"],
    MUSIC: ["Symphonic Synthesia"],
    DEFENSE: ["Excalibur"],
    QUESTING: ["Satisfaction"],
};


export const checkIfAllKeysPresent = ()=>{
    console.error("TODO: check all hashes in this file for having all keys in the key list")
}