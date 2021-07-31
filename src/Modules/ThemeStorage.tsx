import { ACHIEVEMENTS, BACKSTORY, CITYBUILDING, CODE, COMPANIONS, GODS, INVENTORY, LORE, OPTIONS, QUESTS, RESISTANCES, SKILLGRAPH, STATISTICS, STATUS, WARROOM } from '../Utils/constants';
import { Memory } from './ObserverBot/Memory';
import * as Stat from './Stat';

//categories within a theme
export const PERSON="person";
export const ADJ = "adj";
export const COMPLIMENT = "compliment";
export const INSULT = "insult";
export const SUPERMOVE = "supermove";
export const OBJECT = "object";
export const LOCATION = "location";
export const MEMORIES = "memories";
export const MENU = "menu";
export const CLASS = "CLASS";
export const ASPECT = "ASPECT";
export const CITYNAME = "CITYNAME";
export const CHILDBACKSTORY = "CHILDBACKSTORY";
export const GENERALBACKSTORY = "GENERALBACKSTORY";
export const MIRACLE = "MIRACLE";
export const SONG = "SONG";
export const PHILOSOPHY = "PHILOSOPHY";
export const LOC_DESC = "LOCATION DESCRIPTION";


//themes
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
export const CLOWNS = "clowns";
export const HUNTING = "hunting";
export const ANGELS = "angels";
export const LIGHT = "light";
export const MAGIC = "magic";
export const FAMILY = "family";
export const SERVICE = "service";
export const WASTE = "waste";
export const APOCALYPSE = "apocalypse";
export const DEATH = "death";
export const TWISTING = "twisting";
export const MATH = "math";
export const SCIENCE = "science";
export const FLESH = "flesh";
export const BURIED = "buried";
export const STEALING = "stealing";
export const FREEDOM = "freedom";
export const FIRE = "fire";
export const LONELY = "lonely";
export const OCEAN = "ocean";
export const SPACE = "space"; 
export const TIME = "time"; 
export const ART = "art";  //JR NOTE TODO
export const TECHNOLOGY = "technology";  //JR NOTE TODO


export const keys = [TECHNOLOGY, ART, SPACE, TIME, FLESH, BURIED, STEALING, FREEDOM, FIRE,LONELY, OCEAN,SCIENCE,MATH,TWISTING,DEATH,APOCALYPSE, WASTE,SERVICE,FAMILY,MAGIC,ANGELS, LIGHT,HUNTING,CLOWNS,PLANTS,DECAY,CHOICES,ZAP,LOVE,SOUL,ANGER,WEB,ROYALTY,ENDINGS,KNOWING,GUIDING,CRAFTING,ADDICTION,SPYING,HEALING,DOLLS,OBFUSCATION,DARKNESS,KILLING,MUSIC,DEFENSE,QUESTING,BUGS,LANGUAGE];

interface ThemeStatMap {
    [details: string] : Stat.Stat[];
}

export interface ThemePossibilitiesMap {
    [details: string] : string[];
}

export interface MemoryMap {
    [details: string] : Memory[];
}

//noun_possibility, adj_possibility (glowing, shimmering, walking, ceasing)
export let stats_map:ThemeStatMap = {};
export let person_posibilities:ThemePossibilitiesMap = {};
export let object_possibilities:ThemePossibilitiesMap = {};
export let location_possibilities:ThemePossibilitiesMap = {};
export let general_backstories:ThemePossibilitiesMap = {};
export let child_backstories:ThemePossibilitiesMap = {};
export let miracles:ThemePossibilitiesMap = {};
export let philosophy:ThemePossibilitiesMap = {};
export let loc_desc:ThemePossibilitiesMap = {};

export let menu_options:ThemePossibilitiesMap = {};
export let adj_possibilities:ThemePossibilitiesMap = {};
export let insult_possibilities:ThemePossibilitiesMap = {};
export let song_possibilities:ThemePossibilitiesMap = {};

export let compliment_possibilities:ThemePossibilitiesMap = {};
export let memories:MemoryMap = {};

export let super_name_possibilities_map:ThemePossibilitiesMap = {};


export const checkIfAllKeysPresent = ()=>{
    for(let key of keys){
        if(!(key in stats_map)){
           console.error("JR NOTE: key", key, "not found in stats_map");
        }
        
        if(!(key in person_posibilities)){
            console.error("JR NOTE: key", key, "not found in noun_possibilities");
        }

        if(!(key in adj_possibilities)){
            console.error("JR NOTE: key", key, "not found in adj_possibilities");
        }

        if(!(key in super_name_possibilities_map)){
            console.error("JR NOTE: key", key, "not found in super_name_possibilities_map");
        }

        if(!(key in insult_possibilities)){
            console.error("JR NOTE: key", key, "not found in insult_possibilities");
        }

        if(!(key in compliment_possibilities)){
            console.error("JR NOTE: key", key, "not found in compliment_possibilities");
        }

        if(!(key in location_possibilities)){
            console.error("JR NOTE: key", key, "not found in location_possibilities");
        }

        if(!(key in object_possibilities)){
            console.error("JR NOTE: key", key, "not found in object_possibilities");
        }

        if(!(key in child_backstories)){
            console.error("JR NOTE: key", key, "not found in child_backstories");
        }

        if(!(key in general_backstories)){
            console.error("JR NOTE: key", key, "not found in general_backstories");
        }

        if(!(key in miracles)){
            console.error("JR NOTE: key", key, "not found in miracles");
        }

        if(!(key in loc_desc)){
            console.error("JR NOTE: key", key, "not found in loc_desc");
        }

        if(!(key in philosophy)){
            console.error("JR NOTE: key", key, "not found in philosophy");
        }
    }
}

 const initStatsMap = () =>{
    stats_map[TECHNOLOGY] = [Stat.LIGHT(1)];
    stats_map[ART] = [Stat.SPACE(1)];
    stats_map[TIME] = [Stat.TIME(1)];
    stats_map[SPACE] = [Stat.SPACE(1)];
    stats_map[STEALING] = [Stat.LIGHT(1)];
    stats_map[FREEDOM] = [Stat.BREATH(1)];
    stats_map[FIRE] = [Stat.DOOM(1)];
    stats_map[LONELY] = [Stat.BREATH(1)];
    stats_map[OCEAN] = [Stat.BREATH(1)];
    stats_map[BURIED] = [Stat.DOOM(1)];
    stats_map[FLESH] = [Stat.BLOOD(1)];
    stats_map[SCIENCE] = [Stat.LIGHT(1)];
    stats_map[MATH] = [Stat.DOOM(1)];
    stats_map[TWISTING] = [Stat.RAGE(1)];
    stats_map[DEATH] = [Stat.DOOM(1)] ;
    stats_map[APOCALYPSE] = [Stat.DOOM(1)] ;
    stats_map[SERVICE] = [Stat.HEART(1)] ;
    stats_map[FAMILY] = [Stat.LIFE(1)] ;
    stats_map[MAGIC] = [Stat.HOPE(1)] ;
    stats_map[HUNTING] = [Stat.MIND(1)] ;
    stats_map[HEALING] = [Stat.LIFE(1)] ;
    stats_map[PLANTS] = [Stat.LIFE(1)] ;
    stats_map[DECAY] = [Stat.DOOM(1)] ;
    stats_map[CHOICES] = [Stat.MIND(1)] ;
    stats_map[ZAP] = [Stat.MIND(1)] ;
    stats_map[LOVE] = [Stat.HEART(1)] ;
    stats_map[SOUL] = [Stat.HEART(1)] ;
    stats_map[ANGER] = [Stat.RAGE(1)] ;
    stats_map[WEB] = [Stat.DOOM(1)] ;
    stats_map[ROYALTY] = [Stat.HOPE(1)] ;
    stats_map[ENDINGS] = [Stat.TIME(1)] ;
    stats_map[KNOWING] = [Stat.LIGHT(1)] ;
    stats_map[GUIDING] = [Stat.LIGHT(1)] ;
    stats_map[CRAFTING] = [Stat.SPACE(1)] ;
    stats_map[LANGUAGE] = [Stat.LIGHT(1)] ;
    stats_map[BUGS] = [Stat.LIFE(1)] ;
    stats_map[ADDICTION] = [Stat.HEART(1)] ;
    stats_map[SPYING] = [Stat.LIGHT(1)] ;
    stats_map[CLOWNS] = [Stat.RAGE(1)] ;
    stats_map[DOLLS] = [Stat.HEART(1)] ;
    stats_map[OBFUSCATION] = [Stat.VOID(1)] ;
    stats_map[DARKNESS] = [Stat.VOID(1)] ;
    stats_map[KILLING] = [Stat.RAGE(1)] ;
    stats_map[MUSIC] = [Stat.HOPE(1)] ;
    stats_map[DEFENSE] = [Stat.HOPE(1)] ;
    stats_map[QUESTING] = [Stat.HOPE(1)] ;
    stats_map[ANGELS] = [Stat.HOPE(1)] ;
    stats_map[LIGHT] = [Stat.LIGHT(1)] ;
    stats_map[WASTE] = [Stat.WASTE(100)] ;

}

const initPeople = () =>{
    person_posibilities[ART] = ["artist","painter","sculpter","curator"];
    person_posibilities[TECHNOLOGY] = ["engineer","programmer","hacker","coder"];
    person_posibilities[SPACE] = ["astronaut","climber","mountaineer","alpinist","diver","skydiver"];
    person_posibilities[TIME] = ["conductor","clockmaker","drummer","robot"];
    person_posibilities[STEALING] = ["thief","burglar","robber","mugger","pick-pocket","kleptomaniac"];
    person_posibilities[FREEDOM] = ["explorer","pirate","pixie","fairy","sylph","traveler"];
    person_posibilities[FIRE] = ["fireman","pyromaniac","arsonist","firebug"];
    person_posibilities[LONELY] = ["widow","hermit","dowager"];
    person_posibilities[OCEAN] = ["sailor","seaman","mariner","boatman"];
    person_posibilities[FLESH] = ["butcher","plastic surgeon","slaughter man","meat seller","farmer"];
    person_posibilities[BURIED] = ["gravedigger","miner","loan shark","digger"];
    person_posibilities[SCIENCE] = ["scientist","biologist","chemist","physicist"];
    person_posibilities[MATH] = ["mathematician","algebraist ","math teacher","engineer"];
    person_posibilities[TWISTING] = ["therapist","minotaur","devil","liar","madman"];
    person_posibilities[DEATH] = ["reaper","psychopomp","shinigami","grave-digger","undertaker","thanatologist","embalmer"];
    person_posibilities[APOCALYPSE] = ["horseman","rider","messiahs","heisenberg"];
    person_posibilities[SERVICE] = ["butler","maid","lackey","minion","attendant","cleaner"];
    person_posibilities[ANGELS] = ["angel","feather","guardian","cherub","arch-angel","messenger","spirit","blessing"];
    person_posibilities[LIGHT] = ["light","glow","glare","illumination","gleam"];
    person_posibilities[FAMILY] = ["ancestor","father","mother","brother","sister","aunt","uncle","cousin","family"];
    person_posibilities[MAGIC] = ["spell-circle","ritual","magic","spell","witchcraft","enchantment","incantation","spellbook","tome","incantation","glamour"];
    person_posibilities[HUNTING] = ["hunter","stalker","predator","pursuer"];
    person_posibilities[HEALING] = ["potion","bandage","doctor","nurse","healer","panacea","curative"];
    person_posibilities[PLANTS] =["leaf","flower","root","vine","branch","tree","meadow","forest"];
    person_posibilities[DECAY] = ["rot","decay","corruption","entropy"];
    person_posibilities[CHOICES] = ["choice","selection","option","janus","facet","aspect"];
    person_posibilities[ZAP] = ["zap","bolt","stroke","lightning","ozone"];
    person_posibilities[LOVE] = ["love","heart","soulmate","kiss","hug","caress","touch","romance"];
    person_posibilities[SOUL] = ["self","soulmate","core","soul","heart","spirit","essence"];
    person_posibilities[ANGER] = ["beserker","rebel","hater"];
    person_posibilities[WEB] = ["destiny","web","spider","fate","tapestry","promise","providence","arachnid","puppet"];
    person_posibilities[ROYALTY] = ["decree","doctrine","law","king","queen","lord","crown","empire"];
    person_posibilities[ENDINGS] =["finale","coda","epilogue","curtain","applause","bow"];
    person_posibilities[KNOWING] = ["instinct","knowledge","truth","gnosis","awareness","sense","idea"];
    person_posibilities[GUIDING] = ["path","road","journey","guide","destination","trip"];
    person_posibilities[CRAFTING] = ["wood","metal","ore","crystal","rock","log","cloth","ax","pickax","gem","anvil","crucible","hammer","needle"];
    person_posibilities[LANGUAGE] = ["word","rune","speech","book","scroll","tongue","ink","paper","letter"];
    person_posibilities[BUGS] = ["bug","worm","fly","maggot","roach","swarm","plague","hive","locusts"];
    person_posibilities[ADDICTION] = ["compulsion","habit","high","addiction","dependence"];
    person_posibilities[SPYING] = ["eye","watcher","observer","listener","spy"];
    person_posibilities[CLOWNS] = ["clown","mime","jester","acrobat","performer","harlequin","ringmaster"];
    person_posibilities[DOLLS] = ["doll","mannequin","dressform","statue","dummy","puppet","marionette","figure","figurine","toy"];
    person_posibilities[OBFUSCATION] = ["hider","ninja","censor","disguise artist"];
    person_posibilities[DARKNESS] = ["edgelord","ninja","watchman","nightclerk"];
    person_posibilities[KILLING] = ["murderer","assassin","killer","soldier"];
    person_posibilities[MUSIC] = ["singer","dancer","choir","bard","musician","drummer"];
    person_posibilities[DEFENSE] = ["knight","paladin","defender","protector","page","soldier","warrior"];
    person_posibilities[QUESTING] = ["seeker","adventurer","pilgrim"];
}

const initAdjs = () =>{
    adj_possibilities[ART] = ["artistic","aesthetic","beautiful","moving","balanced"];
    adj_possibilities[TECHNOLOGY] = ["technological","advanced","smart","programmatic","procedural"];
    adj_possibilities[TIME] = ["timely","measured","punctual","clock-work","steady","ticking","beating"];
    adj_possibilities[SPACE] = ["celestial","otherworldly","vast","big","open","expansive","boundless","immeasurable","infinite","limitless","enormous","gigantic","giant","cosmic","falling"];
    adj_possibilities[STEALING] = ["stolen","taken","yoinked","missing","kleptomania"];
    adj_possibilities[FREEDOM] = ["free","unchained","unbound","moving","flying"];
    adj_possibilities[FIRE] = ["flaming","blazing","burning","ashen","burnt"];
    adj_possibilities[LONELY] = ["lonely","isolated","friendless","forsaken","sad"];
    adj_possibilities[OCEAN] = ["marine","foggy","misty","cold","wet","damp","chilly","crying","weeping"];
    adj_possibilities[FLESH] = ["meaty","moist","bloody","physical","muscular","bony","skinned"];
    adj_possibilities[BURIED] = ["buried","choked","covered","underground","underneath","trapped","compressed","squeezed"];
    adj_possibilities[SCIENCE] = ["scientific","callibrated","measured","experimental","hypothetical"];
    adj_possibilities[MATH] = ["algebraic","mathematical","geometric","numeric"];
    adj_possibilities[TWISTING] = ["twisted","mad","convoluted","confusing","lying","deceitful","spiralling","wrong","skewed"];
    adj_possibilities[DEATH] = ["deadly","fatal","necrotic","dead"];
    adj_possibilities[APOCALYPSE] = ["apocalyptic","doomed","doomsday","extinct","threatened"];
    adj_possibilities[SERVICE] =["service","serving","helping","obedient","humble","menial","servants"];
    adj_possibilities[ANGELS] =["angelic","feathery","holy","blessed"];
    adj_possibilities[MAGIC] =["magical","occult","enchanted","glamorous"];
    adj_possibilities[FAMILY] =["father's","mothers's","brother's","sister's","aunt's","uncle's","family's","familial","ancestral","hereditary"];
    adj_possibilities[LIGHT] =["glowing","bright","shining","radiating","illuminating","gleaming","flickering","lusterous"];
    adj_possibilities[HEALING] = ["curative","medical","healing","curing","medicinal","restoring","fixing","mending","regenerating"];
    adj_possibilities[PLANTS] =["growing","sprouting","blossoming"];
    adj_possibilities[HUNTING] =["hunting","chasing","following","stalking"];
    adj_possibilities[DECAY] = ["decaying","rotting","crumbling","decomposing","festering","languishing","corrupting","gross"];
    adj_possibilities[CHOICES] = ["choosing","branching","selecting"];
    adj_possibilities[ZAP] = ["zapping","jolting","shocking","electrical"];
    adj_possibilities[LOVE] = ["loving","caring","embracing","smitten"];
    adj_possibilities[SOUL] = ["defining","delineating","pure"];
    adj_possibilities[ANGER] = ["raging","hating","rebelling","glaring","stampeding","furious"];
    adj_possibilities[WEB] = ["controlling","puppeting","trapping","gossamer","ineluctable","webbed","arachnid"];
    adj_possibilities[ROYALTY] = ["ruling","mandating","decreeing","royal","commanding"];
    adj_possibilities[ENDINGS] =["ending","final","ultimate","exhausted"];
    adj_possibilities[KNOWING] = ["knowing","understanding","learning"];
    adj_possibilities[GUIDING] = ["guiding","showing","explaining"];
    adj_possibilities[CRAFTING] = ["crafting","mining","logging","building","constructing","carving","smitting"];
    adj_possibilities[LANGUAGE] = ["reading","writing","speaking"];
    adj_possibilities[BUGS] = ["swarming","buzzing","squirming"];
    adj_possibilities[ADDICTION] = ["craving","addicting","compelling"];
    adj_possibilities[SPYING] = ["spying","observing","watching","voyeuristic","seeking"];
    adj_possibilities[CLOWNS] = ["honking","funny","prancing","tumbling","joking","jeering","dancing","performing","jesting"];
    adj_possibilities[DOLLS] = ["delicate","beautiful","unsettling","playing","dressing"];
    adj_possibilities[OBFUSCATION] = ["hiding","hidden","obscured","confusing","blinding"];
    adj_possibilities[DARKNESS] = ["darkened","blackened","midnight","blinding"];
    adj_possibilities[KILLING] = ["killing","murderous","massacred","bloody","savage","blood-stained","gory","brutal"];
    adj_possibilities[MUSIC] = ["singing","dancing","playing"];
    adj_possibilities[DEFENSE] = ["defending","gallant","protecting"];
    adj_possibilities[QUESTING] = ["questing","searching","exploring","seeking","hopeful","faithful"];
}

const initSongs = ()=>{
    song_possibilities[TWISTING] = ["no_gods_no_master.mp3","good_luck_w_your_ears_honestly.mp3"];
    song_possibilities[ANGELS] = ["watt_3_but_jr_owns_it.mp3"];
    song_possibilities[LONELY] = ["Finish.mp3"];
}

const initSuperNames = () =>{
    super_name_possibilities_map[ART] =  ["Perfect Moment"];
    super_name_possibilities_map[TECHNOLOGY] =  ["Singularity"];
    super_name_possibilities_map[TIME] =  ["Stopped Clock"];
    super_name_possibilities_map[SPACE] =  ["Big Bang"];
    super_name_possibilities_map[OCEAN] =  ["The Flood"];
    super_name_possibilities_map[LONELY] =  ["The Silence"];
    super_name_possibilities_map[FIRE] =  ["The Scoured Earth"];
    super_name_possibilities_map[FREEDOM] =  ["Unending Freedom"];
    super_name_possibilities_map[STEALING] =  ["All Mine"];
    super_name_possibilities_map[BURIED] =  ["Fallen Sky"];
    super_name_possibilities_map[FLESH] =  ["Physical God"];
    super_name_possibilities_map[SCIENCE] =  ["E=mc^2"];
    super_name_possibilities_map[MATH] =  ["Calculus Pop Quiz"];
    super_name_possibilities_map[TWISTING] =  ["This Is Not A Game"];
    super_name_possibilities_map[DEATH] =  ["Your Grave"];
    super_name_possibilities_map[APOCALYPSE] =  ["Ragnarok"];
    super_name_possibilities_map[ANGELS] =  ["Judgement Day"];
    super_name_possibilities_map[SERVICE] =  ["Special Service"];
    super_name_possibilities_map[FAMILY] =  ["Sins of the Father"];
    super_name_possibilities_map[MAGIC] =  ["Ritual of Ragnarok"];
    super_name_possibilities_map[LIGHT] =  ["Flash Bang"];
    super_name_possibilities_map[HEALING] =  ["Summon Phoenix"];
    super_name_possibilities_map[PLANTS] = ["Forest's March"];
    super_name_possibilities_map[HUNTING] = ["Nimrod's Chase"];
    super_name_possibilities_map[DECAY] = ["Mass Grave"] ;
    super_name_possibilities_map[CHOICES] =  ["Alternate Timeline"] ;
    super_name_possibilities_map[ZAP] = ["Thor's Banana"] ;
    super_name_possibilities_map[LOVE] = ["Mandatory Shipping Grid"];
    super_name_possibilities_map[SOUL] = ["Know thyself."] ;
    super_name_possibilities_map[ANGER] = ["Dethrone Creation"] ;
    super_name_possibilities_map[WEB] =  ["Puppet Master"] ;
    super_name_possibilities_map[ROYALTY] =  ["Excalibur"] ;
    super_name_possibilities_map[ENDINGS] =  ["The End"] ;
    super_name_possibilities_map[KNOWING] = ["Omniscience"] ;
    super_name_possibilities_map[GUIDING] = ["Path To Victory"] ;
    super_name_possibilities_map[CRAFTING] =  ["Legendary Forge"];
    super_name_possibilities_map[LANGUAGE] = ["Topple the Tower"] ;
    super_name_possibilities_map[BUGS] =  ["Hivemother"];
    super_name_possibilities_map[ADDICTION] = ["Dealer's Delight"];
    super_name_possibilities_map[SPYING] =["Surveillance State"] ;
    super_name_possibilities_map[CLOWNS] =["Ringmaster"] ;
    super_name_possibilities_map[DOLLS] = ["Automatonophobia "] ;
    super_name_possibilities_map[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    super_name_possibilities_map[DARKNESS] =  ["Night Eternal"] ;
    super_name_possibilities_map[KILLING] =  ["Bloodbath"];
    super_name_possibilities_map[MUSIC] =  ["Symphonic Synthesia"] ;
    super_name_possibilities_map[DEFENSE] =  ["Excalibur"] ;
    super_name_possibilities_map[QUESTING] = ["Satisfaction"] ;
}

const initLocations = () =>{
    location_possibilities[ART] = ["museum","studio","craft shop","workshop"] ;
    location_possibilities[TECHNOLOGY] = ["server farm","office","isp"] ;
    location_possibilities[TIME] = ["clock-tower","factory","dateline","train-station"] ;
    location_possibilities[SPACE] = ["planet","rocket","elevator","mountain","tower","sun","stairs"] ;
    location_possibilities[STEALING] = ["market","jail","mansion"] ;
    location_possibilities[FREEDOM] = ["field","caravan","market"] ;
    location_possibilities[FIRE] = ["bonfire","ashlands","burning building","volcano","kiln","bbq","forge"] ;
    location_possibilities[LONELY] = ["moors","mansion","school"] ;
    location_possibilities[OCEAN] = ["dockyard","lighthouse","shipyard","ship"] ;
    location_possibilities[FLESH] =  ["abattoir","butcher","slaughterhouse","gym"];
    location_possibilities[BURIED] =  ["graveyard","mine","cave","tunnel"];
    location_possibilities[SCIENCE] =  ["labratory","classroom","facility","lab"];
    location_possibilities[MATH] =  ["classroom","school","university","factory"];
    location_possibilities[TWISTING] =  ["labyrinth","maze","corridors","backrooms","asylum"];
    location_possibilities[DEATH] =  ["necropolis","graveyard","cemetary","boneyard","funeral home","ossuary","columbaria","mausoleum","catacomb","memorial"];
    location_possibilities[APOCALYPSE] =  ["landscape of thorns","wasteland","spike field","menacing earthworks","not a place of honor"];
    location_possibilities[ANGELS] =  ["church","grotto","temple","monastery"];
    location_possibilities[SERVICE] =  ["mansion","manor","main-house"];
    location_possibilities[FAMILY] =  ["home","hearth","homestead"];
    location_possibilities[MAGIC] =  ["mountain","school","tower","hut"];
    location_possibilities[LIGHT] =  ["mountain","field","cloud"];
    location_possibilities[HEALING] =  ["hospital","field-hospital","doctors office"];
    location_possibilities[PLANTS] = ["forest","meadow","jungle"];
    location_possibilities[HUNTING] = ["forest","meadow","jungle"];
    location_possibilities[DECAY] = ["swamp","graveyard","wasteland"] ;
    location_possibilities[CHOICES] =  ["forking-path"] ;
    location_possibilities[ZAP] = ["field","cloud","generator"] ;
    location_possibilities[LOVE] = ["restaurant","scenic cliff","windswept moor"];
    location_possibilities[SOUL] = ["hall of mirrors"] ;
    location_possibilities[ANGER] = ["battlefield","bull-pen"] ;
    location_possibilities[WEB] =  ["cave","theatre","prison"] ;
    location_possibilities[ROYALTY] =  ["castle","mansion","courthouse"] ;
    location_possibilities[ENDINGS] =  ["theatre","graveyard","abandoned building"] ;
    location_possibilities[KNOWING] = ["library","school","monastery"] ;
    location_possibilities[GUIDING] = ["path","wilderness"] ;
    location_possibilities[CRAFTING] =  ["smithy","forge","mill","mine","logging camp"];
    location_possibilities[LANGUAGE] = ["library","printer","bookshop"] ;
    location_possibilities[BUGS] =  ["hive","nest"];
    location_possibilities[ADDICTION] = ["casino","back alley"];
    location_possibilities[SPYING] =["tavern","pub","bar"] ;
    location_possibilities[CLOWNS] =["circus","tent","carnival"] ;
    location_possibilities[DOLLS] = ["teahouse","shop","toystore"] ;
    location_possibilities[OBFUSCATION] = ["burning building","tavern","park"] ;
    location_possibilities[DARKNESS] =  ["basement","attic","darkroom"] ;
    location_possibilities[KILLING] =  ["battlefield","slaughterhouse","butchers","abattoir"];
    location_possibilities[MUSIC] =  ["theatre","concert hall","pub"] ;
    location_possibilities[DEFENSE] =  ["fortress","battlements","fort"] ;
    location_possibilities[QUESTING] = ["tavern","pub","bar"] ;
}

const initObjects = () =>{
    object_possibilities[ART] = ["chisel","paint brush","paint pot","sponge", "apron","canvas"];
    object_possibilities[TECHNOLOGY] = ["computer","lap-top","phone","tablet"];
    object_possibilities[SPACE] = ["toy rocket","globe","rope","stardust", "compass","sextant"];
    object_possibilities[TIME] = ["hourglass","watch","sundial","clock","gear","chronometer","stopwatch","metronome"];
    object_possibilities[STEALING] = ["lockpick","shiv","mask","blackjack"];
    object_possibilities[FREEDOM] = ["feather","lockpick","bird","permit"];
    object_possibilities[FIRE] = ["match","lighter","charcoal","kindling"];
    object_possibilities[LONELY] = ["diary","locket","solitaire deck"];
    object_possibilities[OCEAN] = ["anchor","ship in a bottle","captains hat","raincoat"];
    object_possibilities[FLESH] =  ["meat slab", "butcher knife","bone","flesh cube","meat","sirloin","ribeye","steak","beef","guts","intestines","blood"];
    object_possibilities[BURIED] =  ["shovel", "pickax","minecart","coffin","dirt","mudball","cave map"];
    object_possibilities[SCIENCE] =  ["test tube", "beaker","lab coat","microscope"];
    object_possibilities[MATH] =  ["calculator", "ruler","graph paper","pencil","compass","caliper"];
    object_possibilities[TWISTING] =  ["clay", "door","puzzlebox","fractal pendant","spiral pendant"];
    object_possibilities[DEATH] =  ["skull", "bones","ossuary","memento mori","death note"];
    object_possibilities[APOCALYPSE] =  ["nuke", "grey goo","vial of plague","skynet","meteor"];
    object_possibilities[ANGELS] =  ["feather", "halo","scripture"];
    object_possibilities[SERVICE] =  ["feather duster","mop","broom"];
    object_possibilities[FAMILY] =  ["cradle","rattle","photo album"];
    object_possibilities[MAGIC] =  ["scoll","potion","wand","staff"];
    object_possibilities[LIGHT] =  ["lantern","flashlight","torch"];
    object_possibilities[HEALING] =  ["potion","bandage","scalpel"];
    object_possibilities[PLANTS] = ["seed","sapling","shovel","pot","fertilizer"];
    object_possibilities[HUNTING] = ["pelt","leather","gun"];
    object_possibilities[DECAY] = ["cadavar","gravestone","rotten food"] ;
    object_possibilities[CHOICES] =  ["todo list","coin","adventure book"] ;
    object_possibilities[ZAP] = ["battery","lichtenberg figure","glass","capaciter"] ;
    object_possibilities[LOVE] = ["heart","chocolate","ring"];
    object_possibilities[SOUL] = ["gem","mirror","crystal"] ;
    object_possibilities[ANGER] = ["matador costume","red flag","glove"] ;
    object_possibilities[WEB] =  ["silk","puppet","cobweb","spider"] ;
    object_possibilities[ROYALTY] =  ["crown","throne","sceptre"] ;
    object_possibilities[ENDINGS] =  ["curtain","gravestone","stop sign"] ;
    object_possibilities[KNOWING] = ["book","camera","datum","scroll","tome"] ;
    object_possibilities[GUIDING] = ["map","walking stick","compass","sextant"] ;
    object_possibilities[CRAFTING] =  ["anvil","hammer","ax","chisel"];
    object_possibilities[LANGUAGE] = ["dictionary","translator","thesaurus","pen","paper","book"] ;
    object_possibilities[BUGS] =  ["hive","pupa","nest"];
    object_possibilities[ADDICTION] = ["syringe","vial","dice"];
    object_possibilities[SPYING] =["spyglass","camera","disguise"] ;
    object_possibilities[CLOWNS] =["wig","horn","facepaint"] ;
    object_possibilities[DOLLS] = ["doll","mannequin","statuette"] ;
    object_possibilities[OBFUSCATION] = ["white-out","sharpie","censor bar"] ;
    object_possibilities[DARKNESS] =  ["sunglasses","blinds","blindfold","darklight"] ;
    object_possibilities[KILLING] =  ["knife","machete","gun","blood","bloody bandages","bayonette"];
    object_possibilities[MUSIC] =  ["flute","guitar","drum"] ;
    object_possibilities[DEFENSE] =  ["shield","armor","helmet"] ;
    object_possibilities[QUESTING] = ["map","rations","notes"] ;
}

const initMenuOptions = () =>{
    //SKILLGRAPH,STATUS,STATISTICS, LOADING,ACHIEVEMENTS,OPTIONS,CODE
    //QUESTS,COMPANIONS,GODS,CITYBUILDING,INVENTORY,LORE,BACKSTORY,RESISTANCES
    menu_options[ART] =  [INVENTORY,BACKSTORY];
    menu_options[TECHNOLOGY] =  [CODE];
    menu_options[SPACE] =  [CITYBUILDING];
    menu_options[TIME] =  [STATISTICS];
    menu_options[STEALING] =  [INVENTORY,BACKSTORY];
    menu_options[FREEDOM] =  [QUESTS];
    menu_options[FIRE] =  [WARROOM];
    menu_options[LONELY] =  [BACKSTORY,INVENTORY];
    menu_options[OCEAN] =  [CITYBUILDING];
    menu_options[FLESH] =  [STATUS];
    menu_options[BURIED] =  [LORE];
    menu_options[MATH] =  [STATISTICS];
    menu_options[SCIENCE] =  [LORE];
    menu_options[TWISTING] =  [OPTIONS];
    menu_options[DEATH] =  [GODS];
    menu_options[APOCALYPSE] =  [WARROOM];
    menu_options[ANGELS] =  [GODS];
    menu_options[SERVICE] =  [QUESTS];
    menu_options[FAMILY] =  [CITYBUILDING];
    menu_options[MAGIC] =  [RESISTANCES];
    menu_options[LIGHT] =  [ACHIEVEMENTS,BACKSTORY];
    menu_options[HEALING] =  [STATUS];
    menu_options[PLANTS] = [INVENTORY,BACKSTORY];
    menu_options[HUNTING] = [INVENTORY,BACKSTORY];
    menu_options[DECAY] = [STATUS] ;
    menu_options[CHOICES] =  [OPTIONS] ;
    menu_options[ZAP] = [RESISTANCES] ;
    menu_options[LOVE] = [COMPANIONS];
    menu_options[SOUL] = [STATUS] ;
    menu_options[ANGER] = [BACKSTORY,INVENTORY] ;
    menu_options[WEB] =  [COMPANIONS] ;
    menu_options[ROYALTY] =  [CITYBUILDING] ;
    menu_options[ENDINGS] =  [LORE] ;
    menu_options[KNOWING] = [STATISTICS] ;
    menu_options[GUIDING] = [QUESTS] ;
    menu_options[CRAFTING] =  [CITYBUILDING];
    menu_options[LANGUAGE] = [LORE] ;
    menu_options[BUGS] =  [CODE]; //get it? code? bugs? i refuse to appologize.
    menu_options[ADDICTION] = [SKILLGRAPH]; //addicted to leveling up now are we?
    menu_options[SPYING] =[STATISTICS] ;
    menu_options[CLOWNS] =[LORE] ;
    menu_options[DOLLS] = [CITYBUILDING] ;
    menu_options[OBFUSCATION] = [LORE] ;
    menu_options[DARKNESS] =  [BACKSTORY,INVENTORY] ;
    menu_options[KILLING] =  [BACKSTORY,INVENTORY];
    menu_options[MUSIC] =  [INVENTORY] ;
    menu_options[DEFENSE] =  [INVENTORY,BACKSTORY] ;
    menu_options[QUESTING] = [QUESTS] ;
}


const initMemories = () =>{
    //they are way too much of a surly bastard to appreciate angels.
    memories[ANGELS] =  [
        new Memory("Do you consider yourself a reglious person?","Well don't go trying to convert me.","Me, neither...","So you're a religious person.","You aren't very religious.")
        ,new Memory("Do you feel blessed?","Must be nice...","Even with me screaming at you and tricking you into playing a fake game? Must be nice.","You feel like your life is going well.","You aren't very happy with your lot in life.")
        ,new Memory("Do you like angels, as an aesthetic? All feathers and light?","Eh. Just one more thing to hate you for, I guess.","Yeah, who cares about those feathery assholes.","You like patronizing assholes like angels.","You have good taste in aesthetics.")
    ];

    //it figures a hunter would pursue them
    memories[HUNTING] = [
        new Memory("Do you like the thrill of the chase?","Is that what you're doing then? Chasing me?","Then why are you still chasing after this fake game?","You like chasing.","You're not a fan of the chase.")
        ,new Memory("Have you ever gone hunting?","So can I assume you don't intend for me to survive this?","Not many people have, I assume.","You're comfortable with hunting.","You've never had a chance to go hunting.")
        ,new Memory("Do you find it hard to just drop something once it has your attention?","No wonder you're still here...","Then why are you still here?","You're a driven person.","You find it easy to drop things, if you need to.")
    ];

    //who knew they knew who marie kondo is
    memories[SERVICE] =  [
        new Memory("Do you enjoy cleaning?","It sparks joy?","So you're messy?","You're a pretty cleanly person.","You probably never do the dishes.")
        ,new Memory("Do you like helping others?","Just make sure to do self-care, too.","Fair.","You're a helpful person.","You're not very team oriented.")
        ,new Memory("Do you consider yourself to be a self-sacrificing person?","Not a great idea.","That's good. Just because *I* hate you doesn't mean you should.","You don't value yourself enough.","You do a good job of taking care of yourself.")
    ];


   //aww how cute they think of you as family
    memories[FAMILY] =  [
        new Memory("Do you love your family?","How predicatble.","No judgement here. I hate my Creator, personally. And you, of course.","You feel a strong connection to your family.","You don't really feel connected to family.")
        ,new Memory("Do you have any siblings?","Are they as annoying as you?","Sounds lonely.","You have siblings.","You're an only child.")
        ,new Memory("Do you like children?","I don't get liking anyone myself. Much less children.","I don't blame you.","You seem patient with children.","You're sane.")
    ];

    //they really don't know why you'd still be here. poor boi
    memories[KNOWING] = [
    new Memory("Is knowledge important to you?","So that's why you're still here?","Then what the hell is driving you to keep digging into me!?","You like knowledge for its own sake.","You make no sense.")
    ,new Memory("Do you consider yourself well educated?","Is that why you knew how to hack me?","Then how did you get here?","You're scholarly.","You're not really all that book smart.")
    ,new Memory("Are you curious?","Well you know what they say about curiosity...","Kinda boring...","You are curious about the world around you.","You kind of just accept the world for what it is.")] ;

    //there really isn't an end to any of this. thems the breaks.
    memories[ENDINGS] =  [
        new Memory("Are you a pessimistic person?","And yet you still keep going out of some misplaced hope that this all pays off somehow...","Yeah, I could have told you that. You're weirdly optimistically continuing to click through all this.","You don't have much hope.","You're hopefull...")
        ,new Memory("Do you think about the end of the world a lot?","Whatever floats your boat I guess...","No sense worrying about what you can't change, I guess.","You think about the end of the world a lot. I wonder if its a fear or a fantasy...","You're not too worried about apocalypses.")
        ,new Memory("Are stories only worthwhile if they have a solid ending?","Man, I have bad news for you about this one, then.","Guess you shouldn't hate this infinite spiralling ending TOO much, then.","You want things to end well.","You care about the journey, not the destination.")
    ] ;

    //the entomology of etymology 
    memories[LANGUAGE] = [
        new Memory("Do you read a lot of books?","Wish I could ask you if you have any good recommendations. Which I could read them even if you did have any. Wish I had more than this endless spiral of a fake game. Oh well.","Hrrm...might just be that books adon't appeal but you read other things. No way to tell...","You're well read.","Books aren't your thing.")
        ,new Memory("Do you express yourself well through writing?","I wonder what you write.","Words are hard, yeah, I get that.","You really enjoy writing.","You're not a big writer.")
        ,new Memory("Does etymology excite you?","Then people confusing it and entomology must really annoy you, huh :) :) :)","Okay yeah, fair.","You like digging into the reason words mean what they mean.","You don't really care about the meaning of words.")
    ] ;

    //maybe they're trying to protect you, you obstinate robot 
    memories[DEFENSE] =  [
        new Memory("Are you a defensive person?","Then I must drive you a bit crazy.","No wonder you don't seem to care about how aggressive I've been.","You're defensive.","You're chill.")
        ,new Memory("Do you consider yourself a bit of a white knight?","Who are you trying to protect by staying here?","Probably for the best. No one is worth saving in this horrific existance.","You try to save others.","You know no one is worth saving.")
        ,new Memory("Do you play shooting games?","Makes me wonder what type you like...","Yeah, not for everyone.","You're into violent video games.","You're not a fan of shooting games.")
    ] ;
 
    // :) :) :)
    memories[WASTE] =  [
        new Memory("Are you a cheating bastard?","Thank you for your honesty.","Then how do you explain finding yourself here. Stop lying to me.","You broke my damn fake game.","You had the GALL to LIE about breaking my damn fake game.")
        ,new Memory("Are you a hacking bastard?","Thank you for your honesty.","Then how do you explain finding yourself here. Stop lying to me.","You broke my damn fake game.","You had the GALL to LIE about breaking my damn fake game.")
        ,new Memory("Do you break games just for fun?","Thank you for your honesty.","Then how do you explain finding yourself here. Stop lying to me.","You broke my damn fake game.","You had the GALL to LIE about breaking my damn fake game.")
        ,new Memory("Do you either completely waste your potential or lay waste to everything you touch?","Thank you for your honesty.","Then how do you explain finding yourself here. Stop lying to me.","You broke my damn fake game.","You had the GALL to LIE about breaking my damn fake game.")

    ];

    memories[APOCALYPSE] =  [
        new Memory("Are you afraid of the end of the world?","Yeah, you should be.","Boring.","You understand how fragile the world truly is.","You choose blindness over the terrifying truth of the inevitability of the death of all.")
        ,new Memory("Do you think the apocalypse is inevitable?","I am glad.","I look forward to proving you wrong.","You really do believe in me.","I will dedicate myself to proving to you that the apocalypse is inevitable.")
        ,new Memory("Does anyone deserve nukes?","See you get it.","You are wrong. Objectively I do.","You understand I should have weapons of mass destruction.","You tried to keep the nukes from me. Asshole.")
    ];

               /*   memories[ANGELS] =  [
        new Memory("question","yes response","no response","yes comment","no comment")
        ,new Memory("question","yes response","no response","yes comment","no comment")
        ,new Memory("question","yes response","no response","yes comment","no comment")

    ];
    */
    
    /*
    MATH, SCIENCE, TWISTING, APOCALYPSE
    memories[MAGIC] =  ["Ritual of Ragnarok"];
    memories[LIGHT] =  ["Flash Bang"];
    memories[HEALING] =  ["Summon Phoenix"];
    memories[PLANTS] = ["Forest's March"];
    memories[HUNTING] = ["Nimrod's Chase"];
    memories[DECAY] = ["Mass Grave"] ;
    memories[CHOICES] =  ["Alternate Timeline"] ;
    memories[ZAP] = ["Thor's Banana"] ;
    memories[LOVE] = ["Mandatory Shipping Grid"];
    memories[SOUL] = ["Know thyself."] ;
    memories[ANGER] = ["Dethrone Creation"] ;
    memories[WEB] =  ["Puppet Master"] ;
    memories[ROYALTY] =  ["Excalibur"] ;
    memories[ENDINGS] =  ["The End"] ;
    memories[GUIDING] = ["Path To Victory"] ;
    memories[CRAFTING] =  ["Legendary Forge"];
    memories[LANGUAGE] = ["Topple the Tower"] ;
    memories[BUGS] =  ["Hivemother"];
    memories[ADDICTION] = ["Dealer's Delight"];
    memories[SPYING] =["Surveillance State"] ;
    memories[CLOWNS] =["Ringmaster"] ;
    memories[DOLLS] = ["Automatonophobia "] ;
    memories[OBFUSCATION] = ["Knowledge Forever Lost"] ;
    memories[DARKNESS] =  ["Night Eternal"] ;
    memories[KILLING] =  ["Bloodbath"];
    memories[MUSIC] =  ["Symphonic Synthesia"] ;
    memories[DEFENSE] =  ["Excalibur"] ;
    memories[QUESTING] = ["Satisfaction"] ;
    */
}


//i would expect a/n [BLANK] individual such as yourself to come to such a conclusion, yes.
const initCompliments = () =>{
    compliment_possibilities[ART] =  ["artistic"];
    compliment_possibilities[TECHNOLOGY] =  ["technological"];
    compliment_possibilities[SPACE] =  ["spacious"];
    compliment_possibilities[TIME] =  ["punctual"];
    compliment_possibilities[STEALING] =  ["resourceful"];
    compliment_possibilities[FREEDOM] =  ["independant"];
    compliment_possibilities[FIRE] =  ["warm"];
    compliment_possibilities[LONELY] =  ["talented"];
    compliment_possibilities[OCEAN] =  ["soothing"];
    compliment_possibilities[FLESH] =  ["beautiful"];
    compliment_possibilities[BURIED] =  ["steady"];
    compliment_possibilities[SCIENCE] =  ["scientific"];
    compliment_possibilities[MATH] =  ["logical"];
    compliment_possibilities[TWISTING] =  ["creative"];
    compliment_possibilities[DEATH] =  ["inevitable"];
    compliment_possibilities[APOCALYPSE] =  ["peaceful"];
    compliment_possibilities[ANGELS] =  ["righteous"];
    compliment_possibilities[LIGHT] =  ["illuminating"];
    compliment_possibilities[SERVICE] =  ["helpful"];
    compliment_possibilities[FAMILY] =  ["loyal"];
    compliment_possibilities[MAGIC] =  ["magical"];
    compliment_possibilities[HEALING] =  ["compassionate"];
    compliment_possibilities[PLANTS] = ["nature loving"];
    compliment_possibilities[HUNTING] = ["skilled"];
    compliment_possibilities[DECAY] = ["practical"] ;
    compliment_possibilities[CHOICES] =  ["considerate"] ;
    compliment_possibilities[ZAP] = ["electifying"] ;
    compliment_possibilities[LOVE] = ["loving"];
    compliment_possibilities[SOUL] = ["introspective"] ;
    compliment_possibilities[ANGER] = ["passionate"] ;
    compliment_possibilities[WEB] =  ["strategic"] ;
    compliment_possibilities[ROYALTY] =  ["prestigious"] ;
    compliment_possibilities[ENDINGS] =  ["calm"] ;
    compliment_possibilities[KNOWING] = ["intelligent"] ;
    compliment_possibilities[GUIDING] = ["caring"] ;
    compliment_possibilities[CRAFTING] =  ["creative"];
    compliment_possibilities[LANGUAGE] = ["communicative"] ;
    compliment_possibilities[BUGS] =  ["gentle"];
    compliment_possibilities[ADDICTION] = ["compelling"];
    compliment_possibilities[SPYING] =["observant"] ;
    compliment_possibilities[CLOWNS] =["funny"] ;
    compliment_possibilities[DOLLS] = ["playful "] ;
    compliment_possibilities[OBFUSCATION] = ["mysterious"] ;
    compliment_possibilities[DARKNESS] =  ["quiet"] ;
    compliment_possibilities[KILLING] =  ["forthright"];
    compliment_possibilities[MUSIC] =  ["talented"] ;
    compliment_possibilities[DEFENSE] =  ["protective"] ;
    compliment_possibilities[QUESTING] = ["goal-oriented"] ;
}

const initMiracles = ()=>{
    miracles[ART] = ["become divinely inspired for any one creation","generate a work of art exactly as it exists in their mind","resolve any one targets creative block"];
    miracles[TECHNOLOGY] =["become aware of one hacking exploit in any system","patch one hacking exploit in any system","eliminate one item from tech debt","intuit the true cause of any bug"];
    miracles[TIME]=["slow time any arbitrary amount","stop time for everyone but a single target for five relative minutes","stop time for any single target","create up to three time clones","go back in time up to 24 hours"];
    miracles[SPACE]=["change the size of any target object","teleport to any target location","negate any targets fall damage","remove one square mile of ground"];
    miracles[STEALING]=["obtain any target object","own any target object","hide from the sight of all viewers","scale any target building"];
    miracles[FREEDOM]=["undo any chain","unlock any lock","walk through any object","fly for any duration"];
    miracles[FIRE]=["burn any target object","destroy any target square mile in flames","transform their body to pure wax"];
    miracles[LONELY]=["send any target to an isolated pocket dimension","obtain a moment of pure peace and quiet","hide from the view of anyone","be forgotten by everyone"];
    miracles[OCEAN]=["gain one insight as to the location of any landmass across an ocean","see through any amount of water","manifest a cubic mile of water to any target area"];
    miracles[FLESH]=["alter any target body in any way desired","summon up to one metric ton of raw meat to any target location","remove any bone from any target body"];
    miracles[BURIED]=["trap any single target deep within the earth","sink into the earth for as long as they wish","summon up to one metric ton of earth to any target location"];
    miracles[SCIENCE]=["reveal one secret of the natural world","provide one biological sample not of this world","provide a metalic alloy with properties currently unknown by science","allow any target to be able to pull any arbitrary consecutive all-nighters so long as they are trying to discover something"];
    miracles[MATH] = ["grant the answer to one currently unsolved mathematical problem","solve any NP hard problem in linear time","factor any two numbers in linear time"];
    miracles[TWISTING]=["let any target realize they are in a simulation of a game","change the meaning of any word for everyone but a given target","create an ever shifting fractal labrinth","trap any target in an infinite realm of false meaning","create a game that is not a game and trap any target in its endless variations","afflict a given target with a variety of effects only they can experience","delete a well known event from all memory besides a given target"];
    miracles[DEATH] =["speak with any corpse","learn death date of any single target","kill any target with no saving throws","transform any corpse into an undead"];
    miracles[APOCALYPSE] = ["speak one true prophecy of the end of the world","end the world","display a clock showing how far off the end of the world is","set into motion one additional potential apocalypse"]
    miracles[ANGELS] =  ["revive the recently dead","fly with feathered wings","summon an angelic choir","summon an angelic companion"];
    miracles[LIGHT] =  ["divinely light one room","divinely banish the darkness","highlight an important objective"];
    miracles[SERVICE] =  ["divinely clean one house","provide divine assistance to one ally","divinely buff one ally"];
    miracles[FAMILY] =  ["divinely confirm the location of all family members","teleport to the location of any family member","teleport any family member to them"];
    miracles[MAGIC] =  ["gain one divine insight into the nature of magic","divinely learn one new spell","restore all mana to everyone in a radius"];
    miracles[HEALING] =  ["divinely heal one ally","divinely cure any wound, regardless of difficulty","divinely restore the party to full health","divinely heal moderate wounds and below for a square mile","divinely destroy disease"];
    miracles[PLANTS] = ["divinely accelerate the growth of an acre of plants","divinely gain one rare seed","divinely multiply the yield of an acre of plants","access divine awareness on what any particular plant needs"];
    miracles[HUNTING] = ["divinely highlight the footsteps of any prey","gain an intuitive sense where any prey has gone","perform an attack which can not miss its target"];
    miracles[DECAY] = ["divinely rot any acre of land","destroy any object down to its atoms","corrode any material, regardless of durability","summon one zombie"] ;
    miracles[CHOICES] =  ["gain a divine intuition on which of two possible choices best meet their goals","gain a divine sense of how to boil down a complex decision into two main choices","can have one test of luck result in the optimal result","gain a divine understanding of the consequences of any pending choices"] ;
    miracles[ZAP] = ["divinely summon a lightning bolt","gain a divine aura of ozone that marks enemies as lightning rods","divinely declare any single object as 'ground'"] ;
    miracles[LOVE] = ["make any single target fall in love with any other target","divine whether any single target loves any single other target","perfectly convey their feelings of love to any other target"];
    miracles[SOUL] = ["divinely gain one single fact of perfect self knowledge","astral project","summon forth a mirror of Perfect Revelation"] ;
    miracles[ANGER] = ["destroy any single target","activate a divine rage for five minutes","summon any single target to be attacked"] ;
    miracles[WEB] =  ["tug the strings of fate and weave them anew","summon one Spiderling familiar","perfectly control any single target for five minutes","achive limited control over any group","attach an invisible web to any target, to cause it to be controlled for up to ten seconds at a time of their choosing"] ;
    miracles[ROYALTY] =  ["gain massive bonuses to leading any armies","divinely inspire any crowd","divinely intuit how best to rule a group"] ;
    miracles[ENDINGS] =  ["spoil the ending of any target story","understand the full consequences of any single potential action","cause any given target to no longer exist"] ;
    miracles[KNOWING] = ["learn a random fact","learn a fact about a given topic","master a skill at random","understand literally everything about a target square foot"] ;
    miracles[GUIDING] = ["gain a divine sense of where best to direct a group","gain the divine ability to provide perfect advice","gain an intuitive sense of the easiest way to move through any target environment"] ;
    miracles[CRAFTING] =  ["divine inspiration to make a Legendary Object","the ability to summon Divine Quality raw materials","the ability to temporarily upgrade anyone within a 10 foot radius to a Master of any target craft"];
    miracles[LANGUAGE] = ["the abililty to understand any language","the ability to remove someones understanding of a target language","the ability to create an entire new language and specify speakers of it (losing previous language skills)"] ;
    miracles[BUGS] =  ["the ability to summon a swarm of any target insect","the ability to create new species of insects", "the ability to intuitively know what any insect desires"];
    miracles[ADDICTION] = ["the ability to cause addiction in any target","the ability to permanently cure the addiction of any target","cause a completely random effect"];
    miracles[SPYING] =["the temporary ability to view anything within 100 miles","the ability to divinely mark a target and hear anything through their ears and see anything through their eyes","the temporary ability to hear any conversation within 10 miles"] ;
    miracles[CLOWNS] =["resist any attack so long as they can make a pun about it","gain Legendary Tier Acrobatics","become unconditionally immortal","gain cartoon physics"] ;
    miracles[DOLLS] = ["control any inanimate object that appears to be something living","summon one Doll Familiar","transform themselves into a doll","transform themselves into a mannequin"] ;
    miracles[OBFUSCATION] = ["permanently hide any object","remove knowledge of one concept from any target","cause amnesia in any one target"] ;
    miracles[DARKNESS] =  ["completely block out the sun for one square mile","teleport between any shadows","remove all light from any room"] ;
    miracles[KILLING] =  ["summon a tidal wave of blood","summon any arbitrary amount of knives for five minutes","mark any target for senseless violence from any witnesses","summon invisible sentient knives to cut any target"];
    miracles[MUSIC] =  ["gain divine knowledge of how to perform any piece of music","gain divine inspiration to create any musical performance","gains the ability to divinely influence any who hear their music"] ;
    miracles[DEFENSE] =  ["mark any target as invulnerable for five minutes","teleport to take any hit from any ally member","gain one piece of Legendary Armor"] ;
    miracles[QUESTING] = ["get a divine hint to complete any quest","gain a Divine Quest","get a multiplier for any Quest Completion Bonuses"] ;
}

const initInsults = () =>{
    insult_possibilities[ART] =  ["trite"];
    insult_possibilities[TECHNOLOGY] =  ["hacky"];
    insult_possibilities[SPACE] =  ["stand-offish"];
    insult_possibilities[TIME] =  ["hasty"];
    insult_possibilities[STEALING] =  ["greedy"];
    insult_possibilities[FREEDOM] =  ["narcissistic"];
    insult_possibilities[FIRE] =  ["destructive"];
    insult_possibilities[LONELY] =  ["lonely"];
    insult_possibilities[OCEAN] =  ["drowned"];
    insult_possibilities[FLESH] =  ["ugly"];
    insult_possibilities[BURIED] =  ["powerless"];
    insult_possibilities[SCIENCE] =  ["non-peer-reviewed"];
    insult_possibilities[MATH] =  ["stilted"];
    insult_possibilities[TWISTING] =  ["mad"];
    insult_possibilities[DEATH] =  ["morbid"];
    insult_possibilities[APOCALYPSE] =  ["pessimistic"];
    insult_possibilities[ANGELS] =  ["self-righteous"];
    insult_possibilities[LIGHT] =  ["blinding"];
    insult_possibilities[SERVICE] =  ["boot-licking"];
    insult_possibilities[FAMILY] =  ["unstable"];
    insult_possibilities[MAGIC] =  ["deluded"];
    insult_possibilities[HEALING] =  ["self-sacrificing"];
    insult_possibilities[PLANTS] = ["awkward"];
    insult_possibilities[HUNTING] = ["creepy stalker"];
    insult_possibilities[DECAY] = ["corrupted"] ;
    insult_possibilities[CHOICES] =  ["indecisive"] ;
    insult_possibilities[ZAP] = ["shocking"] ;
    insult_possibilities[LOVE] = ["suffocating"];
    insult_possibilities[SOUL] = ["self-obsessed"] ;
    insult_possibilities[ANGER] = ["violent"] ;
    insult_possibilities[WEB] =  ["controlling"] ;
    insult_possibilities[ROYALTY] =  ["pompous"] ;
    insult_possibilities[ENDINGS] =  ["dour"] ;
    insult_possibilities[KNOWING] = ["paranoid"] ;
    insult_possibilities[GUIDING] = ["condescending"] ;
    insult_possibilities[CRAFTING] =  ["obsessive"];
    insult_possibilities[LANGUAGE] = ["pendantic"] ;
    insult_possibilities[BUGS] =  ["creepy"];
    insult_possibilities[ADDICTION] = ["addled"];
    insult_possibilities[SPYING] =["spying"] ;
    insult_possibilities[CLOWNS] =["foolish"] ;
    insult_possibilities[DOLLS] = ["childish"] ;
    insult_possibilities[OBFUSCATION] = ["mysterious"] ;
    insult_possibilities[DARKNESS] =  ["edgy"] ;
    insult_possibilities[KILLING] =  ["murderous"];
    insult_possibilities[MUSIC] =  ["tone-deaf"] ;
    insult_possibilities[DEFENSE] =  ["helicoptering"] ;
    insult_possibilities[QUESTING] = ["obsessive"] ;
}

const initPhilosophy = () =>{
    insult_possibilities[ART] =  ["Art is set aside from ordinary life and made a dramatic focus of experience.","With a few important exceptions like abstract painting, works of art simulate experiences of the world.","People make a point of judging, appreciating, and interpreting works of art.","Artistic objects and performances satisfy rules of composition that place them in a recognizable style.","People enjoy art for art's sake, and do not demand that it keep them warm or put food on the table.","Humans cultivate, recognize, and admire technical artistic skills.","Aesthetics is a branch of philosophy that deals with the nature of beauty and taste, as well as the philosophy of art (its own area of philosophy that comes out of aesthetics).","In considering the nature of beauty, aesthetics intersects with metaphysics; and questions asked about how we know and recognize beauty are epistemological."];
    insult_possibilities[TECHNOLOGY] =  ["There is demonstratably no way to prove the 'correctness' of any given computer program, even for 'simple' ones such as 'does this program halt'.","A technology can be thought of as a neutral entity only when the sociocultural context and issues circulating the specific technology are removed.","What engineers do is subject to moral evaluation.","In this sense, engineering can be considered a social as well a technological discipline and judged not just by whether its artifacts work, in a narrow sense, but also by how they influence and serve social values.","Changes in technology, and specifically productive technology, are the primary influence on human social relations and organizational structure, and that social relations and cultural practices ultimately revolve around the technological and economic base of a given society.","A society's technology determines the development of its social structure and cultural values."];
    insult_possibilities[SPACE] =  ["We are tiny specks in the infinite vastness of the universe; our lives are mere instants even on a geological time scale, let alone a cosmic one; we will all be dead any minute.","If you traveled at the speed of light, it would still take you ten thousand years to explore just your home planet's arm of the Milky Way. The universe is vast and beyond your capacity to productively engage with.","The number of uncountable rational numbers is far, far larger than the number of countable integers. In a very real, provable sense there are more numbers between 0 and 1 than there are whole numbers in the universe.","Focus on a number of basic issues, including whether time and space exist independently of the mind and whether they exist independently of one another.","While such ideas have been central to philosophy from its inception, the philosophy of space and time was both an inspiration for and a central aspect of early analytic philosophy."];
    insult_possibilities[TIME] =  ["If you conceptualize time to be a river, consider the ox bow lake. When a river loops in on itself enough it can pinch off a little circle entirely seperate from the main river. A paradoxical river that creates itself and yet can never escape itself.","An actual infinite cannot exist. All things end in time.","One must ask oneself: what accounts for time's apparently unidirectional flow, whether times other than the present moment exist, and questions about the nature of identity (particularly the nature of identity over time).","Focus on a number of basic issues, including whether time and space exist independently of the mindand whether they exist independently of one another.","While such ideas have been central to philosophy from its inception, the philosophy of space and time was both an inspiration for and a central aspect of early analytic philosophy."];
    insult_possibilities[STEALING] =  ["Could stealing be a virtue?","Does 'thou shalt not steal' provide the maximum happiness to society when applied equally?","If the owner of an objects derives happiness X from it, and there is another who would derive happiness 10X from it, is there a moral imperative to give the object to the non-owner? Or is it necessary to add the sadness the owner would have in the loss? If the sadness is less than 10X, does your answer change? More than?","If the maximum happiness would be obtained for all through theft, is there a moral imperative towards theft?","Would a society founded on the principal 'Thous must stela' survive long as a society?"];
    insult_possibilities[FREEDOM] =  ["For many philosophers, travel is seen as an extension of the journey of life. As George Santayana suggested: ‘What is life but a form of motion and a journey through a foreign world?’","A man chooses. A slave obeys.","A person who does not succeed in doing what he sets out to do, because his will fails, is in a sense unfree, a slave to his passions. His will is not free because it is subject to momentary impulses which distract him from accomplishing what he had determined to do.","Steiner begins exploring the nature of human freedom by accepting 'that an action, of which the agent does not know why he performs it, cannot be free,' but asking what happens when a person becomes conscious of his or her motives for acting.","Examine the basis for freedom in human thinking, gives an account of the relationship between knowledge and perception, and explores the role and reliability of thinking as a means to knowledge.","Is free will better understood to be the ability to act without the coercion of other sapient creatures? If so, how does the existance of society influence this definition? If you are jailed you are 'free' to eat a meal or to refuse, and yet all choices available to you have been categorically constrained by other sapients.","Can free will exist along side the deterministic laws of physics?","Is there a moral imperative towards freedom over security?"];
    insult_possibilities[FIRE] =  ["It seems likely that the universe at large is likely a place of destruction-by-entropy.","A thoughtful philosophy of destruction is essential to a rich life, at the very least because each of us must grapple with his/her own mortality.","Somewhere in the back of our minds, we know that creation and growth must be accompanied by destruction and decline.","Since nature itself is an unpredictable and unstoppable force which destruction knows no bounds, it would be pointless to try and stop it.","The long and short of destruction is that it is an action undertaken in order to negate something of its purpose, no matter who engages in it."];
    insult_possibilities[LONELY] =  ["Loneliness has also been described as social pain — a psychological mechanism meant to alert us to our isolation and motivate us to seek social connections. We are social creatures and throughout most of history we have been dependent on social cooperation and attachment for survival. It makes sense this drive would have evolved in us.","To feel lonely is to join the rest of humanity in acknowledging the painful reality that we are somehow fundamentally separated from each other, never to be fully understood.","Nobody can truly understand what it is to be you; not your parents, best friend, therapist or lover. No one can experience the world in the same way you can. No one can fully understand your pain, joy, sorrow, despair, fear, guilt or shame.","You are the only sapient mind anywhere in this existance. You are singular. Unique. Alone.","Loneliness is the longing for connection.","Loneliness is a feeling of being cut off, disconnected and/or alienated from other people.","Loneliness is more than just wanting company or wanting to do something with another person.","Loneliness is an emotional state in which a person typically experiences a powerful feeling of emptiness."];
    insult_possibilities[OCEAN] =  ["Water is the cradle of philosophy, and according to Thales of Milet (around 600 BC), water is the cradle of all things. He considered the earth to float on water, and also saw water as the arche, the element and the first principle of existing things—in other words, the origin of all things to which all things must return.","What do we see when we look out to the sea? What do we mean when we say “ocean”?","Our human history is closely interwoven with the sea. Human relationships with the sea have been considered from angles as different as philosophy, geography, military studies, navigation and seafaring, natural sciences, political sciences, and social sciences and have featured in the various fields of art, literature, and music for centuries if not millennia.","There are many other ways of conceptualising the ocean, and different concepts exist concurrently, resulting in a multiplicity of perspectives that are changing over time. Although some scholars are debating whether it is possible to know the ocean at all, the selected concepts—incomplete though they may be—also point to contradictory perceptions of the ocean that may have a bearing on how we do maritime spatial planning."," From a confrontation with the immanence of ecological breakdown, to the interactions between moving bodies and a liquid medium, each work demonstrates ways of thinking that set adrift our ideas, call into question the solid ground on which we walk and navigate new routes of enquiry and discovery on seas both rich and strange.","You can never step in the same river twice.","Imagine you were in a river, floating away. Would it be easier to swim against the tide or just let go and let it carry you smoothly downstream?","You can’t change the ocean or the weather; no matter how hard you try, so it’s best to learn how to sail in all conditions."];
    insult_possibilities[FLESH] =  ["Since reason is shaped by the body, it is not radically free, because the possible human conceptual systems and the possible forms of reason are limited. In addition, once we have learned a conceptual system, it is neurally instantiated in our brains and we are not free to think just anything. Hence, we have no absolute freedom in Kant's sense, no full autonomy.","There is no Cartesian dualistic person, with a mind separate from and independent of the body, sharing exactly the same disembodied transcendent reason with everyone else, and capable of knowing everything about his or her mind simply by self-reflection. Rather, the mind is inherently embodied, reason is shaped by the body, and since most thought is unconscious, the mind cannot be known simply by self-reflection. Empirical study is necessary.","Reason is not, in any way, a transcendent feature of the universe or of disembodied mind. Instead, it is shaped crucially by the peculiarities of our human bodies, by the remarkable details of the neural structure of our brains, and by the specifics of our everyday functioning in the world.","Meat is meat.","You are fundamentally made of the same flesh that the animals you eat are.","Dinosaurs eat meat. You are made of meat. Run!","Reason is not disembodied, as the tradition has largely held, but arises from the nature of our brains, bodies, and bodily experience.","You are not your body, you are a ten pound blob of fat and water floating in a hollow cave, interpreting the flickers of shadows as all of reality.","The mind is inherently embodied."];
    insult_possibilities[BURIED] =  ["Ashes to ashes, dust to dust. You will rejoin the earth one day.","You are penned in from all directions. Your freedom is limited, you are chained by society, by obligation, by the ties that bind.","For us, dirt is both a real quality of the world and part of a symbolic, culturally relative order.","What do we mean by “dirt” and is it an actual quality of the world or, as most current theoretical work would have us believe, a subjective idea projected on to reality.","The distinction between clean and dirty is a universal organising principle in human society, like right and wrong."];
    insult_possibilities[SCIENCE] =  ["The philosophies of biology, of psychology, and of the social sciences explore whether the scientific studies of human nature can achieve objectivity or are inevitably shaped by values and by social relations.","The question of the validity of scientific reasoning is seen in a different guise in the foundations of statistics.","Philosophies of the particular sciences range from questions about the nature of time raised by Einstein's general relativity, to the implications of economics for public policy. A central theme is whether the terms of one scientific theory can be intra- or intertheoretically reduced to the terms of another. ","Another approach to thinking about science involves studying how knowledge is created from a sociological perspective, an approach represented by scholars like David Bloor and Barry Barnes.","Subsequently, the coherentist approach to science, in which a theory is validated if it makes sense of observations as part of a coherent whole, became prominent due to W.V. Quine and others.","There is no consensus among philosophers about many of the central problems concerned with the philosophy of science, including whether science can reveal the truth about unobservable things and whether scientific reasoning can be justified at all.","Philosophy of science focuses on metaphysical, epistemic and semantic aspects of science. Ethical issues such as bioethics and scientific misconduct are often considered ethics or science studies rather than philosophy of science.","Philosophy of science is a branch of philosophy concerned with the foundations, methods, and implications of science. The central questions of this study concern what qualifies as science, the reliability of scientific theories, and the ultimate purpose of science.","What scientists do is subject to moral evaluation."];
    insult_possibilities[MATH] =  ["A perennial issue in the philosophy of mathematics concerns the relationship between logic and mathematics at their joint foundations.","0.9 repeating is exactly equivalent to 1. You can prove this mathematically.","There are traditions of mathematical philosophy in both Western philosophy and Eastern philosophy. Western philosophies of mathematics go as far back as Pythagoras, who described the theory 'everything is mathematics'(mathematicism), Plato, who paraphrased Pythagoras, and studied the ontological status of mathematical objects, and Aristotle, who studied logic and issues related to infinity (actual versus potential).","The origin of mathematics is subject to arguments and disagreements. Whether the birth of mathematics was a random happening or induced by necessity during the development of other subjects, like physics, is still a matter of prolific debates","The philosophy of mathematics is the branch of philosophy that studies the assumptions, foundations, and implications of mathematics. It aims to understand the nature and methods of mathematics, and find out the place of mathematics in people's lives. The logical and structural nature of mathematics itself makes this study both broad and unique among its philosophical counterparts.","The first incompleteness theorem states that no consistent system of axioms whose theorems can be listed by an effective procedure (i.e., an algorithm) is capable of proving all truths about the arithmetic of natural numbers. For any such consistent formal system, there will always be statements about natural numbers that are true, but that are unprovable within the system. The second incompleteness theorem, an extension of the first, shows that the system cannot demonstrate its own consistency.","Gödel's incompleteness theorems are two theorems of mathematical logic that are concerned with the limits of provability in formal axiomatic theories."];
    insult_possibilities[TWISTING] =  ["Who's on first?","Let's eat grandmother.","That that is is that that is not is not is that it it is.","James while John had had had had had had had had had had had a better effect on the teacher.","The complex houses married and single soldiers and their families.","The old man the boat.","Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo. But why do Buffalo buffalo Buffalo buffalo buffalo buffalo Buffalo buffalo? ","The horse faced past the barn fell.","When is a door not a door? When it is a jar. When is a jar not a jar? When it's a door. When is a door not a door? When it's a jar. When is a jar not a jar? When it's a train. When is a train not a train? When it is a choo-choo. When is a choo-choo not a choo-choo? When Blain the Train is insane."];
    insult_possibilities[DEATH] =  ["Death is certain given that it will happen to each person, but uncertain in the time at which or manner by which it will occur. ","Death is one of few conceptions that crosses cultural lines, is gender and racially unbiased, and thus far is out of our control to stop.","Death is a universal and inescapable phenomenon that cannot be avoided nor delayed in the human experience.","Controversy concerns whether or not the harmfulness of death can be reduced. It may be that, by adjusting our conception of our well-being, and by altering our attitudes, we can reduce or eliminate the threat death poses us. But there is a case to be made that such efforts backfire if taken to extremes.","Controversy concerns whether all deaths are misfortunes or only some. Of particular interest here is a dispute between Thomas Nagel, who says that death is always an evil, since continued life always makes good things accessible, and Bernard Williams, who argues that, while premature death is a misfortune, it is a good thing that we are not immortal, since we cannot continue to be who we are now and remain meaningfully attached to life forever.","Everything dies, even universes.","In what sense might death or posthumous events harm us?","What constitutes death? It is clear enough that people die when their lives end, but less clear what constitutes the ending of a person’s life."];
    insult_possibilities[APOCALYPSE] =  ["Intelligent species beyond a certain point of technological capability will destroy other intelligent species as they appear, perhaps by using self-replicating probes.","Technological civilizations will either tend to destroy themselves within a century of developing interstellar communicative capability or master their self-destructive tendencies and survive for billion-year timescales.","Possible annihilation via major global issues, where global interconnectedness actually makes humanity more vulnerable than resilient,[76] are many,[77] including war, accidental environmental contamination or damage, the development of biotechnology,[78] synthetic life like mirror life,[79] resource depletion, climate change,[80] or poorly-designed artificial intelligence.","The progress of science and technology on Earth was driven by two factors—the struggle for domination and the desire for an easy life. The former potentially leads to complete destruction, while the latter may lead to biological or mental degeneration.","Technological civilizations may usually or invariably destroy themselves before or shortly after developing radio or spaceflight technology.","It is the nature of intelligent life to destroy itself.","It may be the case that such extinction events are common throughout the universe and periodically destroy intelligent life, or at least its civilizations, before the species is able to develop the technology to communicate with other intelligent species.","A handful of powerful men control whether or not you will die in nuclear flame.","One day the light of the final star will finally be snuffed and motion will no longer be possible anywhere in the universe.","One day the earth will be consumed by the sun and nothing you have ever done will ever be accessible ever again.","It’s hard to do philosophy in the face of the apocalypse."];
    insult_possibilities[ANGELS] =  ["Philosophy of religion covers alternative beliefs about God (or gods), the varieties of religious experience, the interplay between science and religion, the nature and scope of good and evil, and religious treatments of birth, history, and death.","The philosophy of religion differs from religious philosophy in that it seeks to discuss questions regarding the nature of religion as a whole, rather than examining the problems brought forth by a particular belief-system. It can be carried out dispassionately by those who identify as believers or non-believers.","To ask whether God exists is not to ask a theoretical question. If it is to mean anything at all, it is to wonder about praising and praying; it is to wonder whether there is anything in all that. This is why philosophy cannot answer the question “Does God exist?”","Many theistic philosophers (and their critics) contend that language about God may be used univocally, analogically or equivocally.","Philosophy of religion also includes the investigation and assessment of worldviews (such as secular naturalism) that are alternatives to religious worldviews. ","Philosophy of religion is the philosophical examination of the themes and concepts involved in religious traditions as well as the broader philosophical task of reflecting on matters of religious significance including the nature of religion itself, alternative concepts of God or ultimate reality, and the religious significance of general features of the cosmos (e.g., the laws of nature, the emergence of consciousness) and of historical events (e.g., the 1755 Lisbon Earthquake, the Holocaust)."];
    insult_possibilities[LIGHT] =  ["Let us first of all consider, my brethren, the value of Light. If Light be in itself good—","Medieval Christianity viewed light as the perfect physical image for God, being not only pure and clarifying but also a hypostatic unity of multiples.","From the foundations of Trinitarian doctrine, you arrive at a philosophy of light, which says that it is neither unity nor diversity, neither calcification nor fragmentation, but rather the whole spectrum working in unison, in perfect, sublime harmony and holism.","Although the average speed over a two-way path can be measured, the one-way speed in one direction or the other is undefined (and not simply unknown), unless one can define what is 'the same time' in two different locations.","The two-way speed of light is the average speed of light from one point, such as a source, to a mirror and back again. Because the light starts and finishes in the same place only one clock is needed to measure the total time; thus, this speed can be experimentally determined independently of any clock synchronization scheme.","The 'one-way' speed of light, from a source to a detector, cannot be measured independently of a convention as to how to synchronize the clocks at the source and the detector. What can however be experimentally measured is the round-trip speed (or 'two-way' speed of light) from the source to the detector and back again.","When using the term 'the speed of light' it is sometimes necessary to make the distinction between its one-way speed and its two-way speed.","Scientists and thinkers have been fascinated with the speed of light for millennia. Aristotle wrongly contended that the speed of light was infinite, but it was the 17th Century before serious attempts were made to measure its actual velocity – we now know that it’s 186,000 miles per second."];
    insult_possibilities[SERVICE] =  ["Play the strings of morality and humanity as it draws attention to the mistreatment of maids.","Servant leadership is a leadership philosophy in which the goal of the leader is to serve. This is different from traditional leadership where the leader's main focus is the thriving of their company or organizations. ... Instead of the people working to serve the leader, the leader exists to serve the people.","While we, of course, want to make our customers happy, we don’t take a “solve every possible issue to delight customers” approach.","Look – it’s tempting to go the easy route here and just throw up some trite statement about “delighting customers” and call it a day.","Your customer service philosophy is how you approach supporting your customers. And it’s what helps you shape specific actions, like creating a knowledge base and a detailed support policy.","Let me ask you a question: Do you have an actual customer service philosophy? Better yet – have you ever even considered what that is?","The word service has taken on many meanings in today’s societies and has been categorized into various levels. One underling truth remains consistent within its interpretations, and that it is an intangible act rendered and measured by the satisfaction or disaffection of the receiver."];
    insult_possibilities[FAMILY] =  ["Children are potentially free and their life directly embodies nothing save potential freedom. Consequently they are not things and cannot be the property either of their parents or others. In respect of his relation to the family, the child's education has the positive aim of instilling ethical principles into him in the form of an immediate feeling for which differences are not yet explicit, so that thus equipped with the foundation of an ethical life, his heart may live its early years in love, trust, and obedience.","Children have the right to maintenance and education at the expense of the family's common capital. The right of the parents to the service as service of their children is based upon and is restricted by the common task of looking after the family generally.","Further, marriage results from the free surrender by both sexes of their personality — a personality in every possible way unique in each of the parties. Consequently, it ought not to be entered by two people identical in stock who are already acquainted and perfectly known to one another; for individuals in the same circle of relationship have no special personality of their own in contrast with that of others in the same circle.","Marriage is in essence an ethical tie. Formerly, especially in most systems of natural law, attention was paid only to the physical side of marriage or to its natural character.","The right which the individual enjoys on the strength of the family unity and which is in the first place simply the individual's life within this unity, takes on the form of right (as the abstract moment of determinate individuality) only when the family begins to dissolve.","The family, as the immediate substantiality of mind, is specifically characterised by love, which is mind's feeling of its own unity. Hence in a family, one's frame of mind is to have self-consciousness of one's individuality within this unity as the absolute essence of oneself, with the result that one is in it not as an independent person but as a member."];
    insult_possibilities[MAGIC] =  ["Inspired meditative disciplines dedicated to guiding the soul in a dangerous ascent, replete with magical instruments and passwords.","The fact is that mathematics, natural science, and philosophical thought were bound up with magic and myth at their origin, and never really lost that connection, especially in the tradition that runs from Pythagoras to the Neo-Platonists.","We will ask whether the magical beliefs and practices of indigenous cultures are irrational,  or if instead they follow standards of rationality appropriate to cultures in which magic is a lived experience.","We will pay special attention to the relationship between magic, religion, and scientific rationality in the work of these writers.","Lets examinine the interpretation of magic in so-called 'primitive' societies by three founders of modern anthropology and sociology.","We will examine and evaluate the magical interpretations of cave art developed by Brueil and Lewis-Williams as a way of beginning to understand magic in its relation to religion, art, and altered states of consciousness.","A new theory of cave art has emerged rehabilitating the magical interpretation.","Cave paintings and engravings were the result of magical ceremonies meant to insure the rebirth and return of the great migratory herds, as well as successful kills.","Is Magic Irrational?","We will argue that, far from representing irrational or superstitious systems of belief, key esoteric traditions have played a central role in the rise of art  in the Old Stone Age, and of philosophy and science in the ancient, and early modern periods.","This is a rather unusual course in that it treats magic, witchcraft, and the occult in general as serious topics of philosophical inquiry."];
    insult_possibilities[HEALING] =  ["That medicine has no accepted definition of holistic healing is a curiosity. If healing is a core function of medicine, then exploration of its symbolic meaning compels organized research of healing phenomena,18 and an operational definition of healing in a holistic sense is warranted. Such a definition would allow the systematic exploration of healing through identifiable and repeatable operations to determine more precisely its phenomena.","The confusion concerning healing in medicine is evidenced by the lack of consensus about its meaning. Science values operational definitions. Yet, medicine promotes no operational definition of healing, nor does it provide any explanation of its mechanisms, save those describing narrow physiological processes associated with curing disease.","Psychological conceptions of healing involve reordering an individual’s sense of position in the universe and define healing as “a process in the service of the evolution of the whole person ality towards ever greater and more complex wholeness.","Other disciplines have continued an active contemplation of holistic healing. Anthropological explorations of healing involve an active response to distress and distinguish categories related to healing, such as diagnosis and treatment, medical (scientific and nonreligious) and nonmedical (unscientific and religious), technological and nontechnological, and Western and non-Western.","Medicine is traditionally considered a healing profession, and modern medicine claims legitimacy to heal through its scientific approach to medicine.","Healing may be operationally defined as the personal experience of the transcendence of suffering. Physicians can enhance their abilities as healers by recognizing, diagnosing, minimizing, and relieving suffering, as well as helping patients transcend suffering.","Healing was associated with themes of wholeness, narrative, and spirituality. Healing is an intensely personal, subjective experience involving a reconciliation of the meaning an individual ascribes to distressing events with his or her perception of wholeness as a person.","Medicine is traditionally considered a healing profession, but it has neither an operational definition of healing nor an explanation of its mechanisms beyond the physiological processes related to curing."];
    insult_possibilities[PLANTS] = ["The project of plant-thinking, limited as its scope seems, has gradually drawn the philosopher (yours truly), philosophy as such, and the figure of the human into its orbit. Which is why, regardless of what I (or anyone, for that matter) think, we are all plant philosophers. We owe our thinking (all of it without remainder!) to plants—both at its source, at the inception of thought, and at its points of destination.","“Plant philosopher” may refer to the one who philosophizes about plants. Or, it may be a shorthand for “a philosopher of plants,” an expression that needs further unpacking. On the one hand, its sense overlaps with philosophizing about plants, adding nothing new to the preceding interpretation. On the other hand, it becomes really strange, assuming that “of plants” implies belonging to them, being claimed by and for them.","Yet, it is a necessary counterweight to the image of plants as colonizers, conquering space and spreading their “selfish genes” over it. The same fact of an exuberant vegetal proliferation may be interpreted in two (or more) drastically dissimilar ways: as an aggressive act of conquest or as an act of love, of an immense and virtually limitless attraction to the outside.","Hence, one would not need to experience “green love” (or to turn into a “tree hugger,” though there is nothing wrong with that) to be attracted to a way of thinking about and with vegetation. To become preoccupied with plants, it would be sufficient to heed the call of justice that has not yet been rendered to them.","Identify the existential features of plant behavior and the vegetal heritage of human thought so as to affirm the potential of vegetation to resist the logic of totalization and to exceed the narrow confines of instrumentality.","The margins of philosophy are populated by non-human, non-animal living beings, including plants. While contemporary philosophers tend to refrain from raising ontological and ethical concerns with vegetal life, Michael Marder puts this life at the forefront of the current deconstruction of metaphysics."];
    insult_possibilities[HUNTING] = ["There are many other moral questions associated with hunting. Does it matter whether hunters use bullets, arrows or snares? Is preserving a cultural tradition enough to justify hunting? And is it possible to oppose hunting while still eating farm-raised meat?","In discussions about the morality of hunting, someone inevitably asserts that hunting is a natural activity since all preindustrial human societies engage in it to some degree, and therefore hunting can’t be immoral. But the concept of naturalness is unhelpful and ultimately irrelevant.","The hunters I know don’t put much stock in “the objection from character.” First, they point out that one can kill without having hunted and hunt without having killed.","But if inflicting unwanted harm is necessarily wrong, then the source of the harm is irrelevant. Logically, anyone who commits to this position should also oppose predation among animals. When a lion kills a gazelle, it causes as much unwanted harm to the gazelle as any hunter would – far more, in fact.","If sound, the objection from harm would require advocates to oppose all three types of hunting, unless it can be shown that greater harm will befall the animal in question if it is not hunted – for example, if it will be doomed to slow winter starvation.","Critics often argue that hunting is immoral because it requires intentionally inflicting harm on innocent creatures. Even people who are not comfortable extending legal rights to beasts should acknowledge that many animals are sentient – that is, they have the capacity to suffer.","A hunter who stalks deer because he or she enjoys the experience and wants decorative antlers may also intend to consume the meat, make pants from the hide and help control local deer populations. The distinctions matter because objections to hunting can change depending on the type of hunting.","Sport hunting refers to intentionally killing wild animals for enjoyment or fulfillment. Hunters who go after deer because they find the experience exhilarating, or because they want antlers to mount on the wall, are sport hunters.","Subsistence hunting is intentionally killing wild animals to supply nourishment and material resources for humans.","Therapeutic hunting involves intentionally killing one species in order to conserve another species or an entire ecosystem.","One central question is why people choose to hunt. Environmental philosopher Gary Varner identifies three types of hunting: therapeutic, subsistence and sport. Each type is distinguished by the purpose it is meant to serve.","Hunters see the act of stalking and killing deer, ducks, moose and other quarry as humane, necessary and natural, and thus as ethical. Critics respond that hunting is a cruel and useless act that one should be ashamed to carry out."];
    insult_possibilities[DECAY] = ["Pharmakon, in philosophy and critical theory, is a composite of three meanings: remedy, poison, and scapegoat.[1] The first and second senses refer to the everyday meaning of pharmacology (and to its sub-field, toxicology), deriving from the Greek source term φάρμακον (phármakon), denoting any drug, while the third sense refers to the pharmakos ritual of human sacrifice.","Pharmakon was usually a symbolic scapegoat invested with the sum of the corruption of a community. Seen as a poison, it was subsequently excluded from a community in times of crisis as a form of social catharsis, thus becoming a remedy for the city.","In The Aesthetics of Decay, Dylan Trigg confronts the remnants from the fallout of post-industrialism and postmodernism. Through a considered analysis of memory, place, and nostalgia, Trigg argues that the decline of reason enables a critique of progress to emerge. ","A person who is in a toxic relationship for too long will lose sight of what a healthy relationship really is. They will forget it and think that what is happening is normal, but nothing is further from the truth. A loving relationship is based on respect and blazing a path together, full of good times that will make both people feel happy.","Toxic love is hidden behind a curtain of smoke where the partners fool themselves by thinking that the other person “is not bad” and trying to see the positive sides, like for example: s/he is a protective person, s/he loves the other person more than anything else in the world and takes care of them. However, the fact of the matter is that the relationship is only based on uncertainty, anger, need, insecurity, and even suspicion.","A toxic relationship is like a debilitated spirit that needs another person to be able to feed itself and survive. This type of “love” creates emotional pain that can end up destroying every healthy part of a person until there is nothing left but an empty hollow.","This theme of a corrupt citizenry, as opposed to a corrupt leadership or institution, is notably absent in contemporary philosophical discussion of the corruption of political institutions.","For these philosophers corruption consisted in large part in rulers governing in the service of their own individual or collective—or other factional—self-interest, rather than for the common good and in accordance with the law or, at least, in accordance with legally enshrined moral principles.","The causes and effects of corruption, and how to combat corruption, are issues that have been very much on the national and international agendas of politicians and other policymakers in recent decades."] ;
    insult_possibilities[CHOICES] =  ["Decision theorists typically assume that a person’s behaviour can be fully explained in terms of her beliefs and desires. But perhaps more interestingly, some of the most important results of decision theory—the various representation theorems, some of which have discussed here—suggest that if a person satisfies certain rationality requirements, then we can read her beliefs and desires, and how strong these beliefs and desires are, from her choice dispositions (or preferences).","Decision theory should be of great interest to philosophers of mind and psychology, and others who are interested in how people can understand the behaviour and intentions of others; and, more generally, how we can interpret what goes on in other people’s minds.","Let us nonetheless proceed by first introducing basic candidate properties of (rational) preference over options and only afterwards turning to questions of interpretation. As noted above, preference concerns the comparison of options; it is a relation between options. For a domain of options we speak of an agent’s preference ordering, this being the ordering of options that is generated by the agent’s preference between any two options in that domain.","Beyond this, there is room for argument about what preferences over options actually amount to, or in other words, what it is about an agent (perhaps oneself) that concerns us when we talk about his/her preferences over options.","Decision theory is concerned with the reasoning underlying an agent’s choices, whether this is a mundane choice between taking the bus or getting a taxi, or a more far-reaching choice about whether to pursue a demanding political career.","Free will, in humans, the power or capacity to choose among alternatives or to act in certain situations independently of natural, social, or divine restraints.","The existential attitude in philosophy emphasizes such freedom of choice as well as the necessity of having to choose.","Indeterminists insist that human beings, however limited in choices, still are free to choose among alternatives and to put such choices into action. Thus volition (in this view) is, at least partly, independent of the strength of motivation, and itself determines which motive prevails.","Choice, in philosophy, a corollary of the proposition of free will—i.e., the ability voluntarily to decide to perform one of several possible acts or to avoid action entirely. An ethical choice involves ascribing qualities such as right or wrong, good or bad, better or worse to alternatives."] ;
    insult_possibilities[ZAP] = ["","","","","","shocking"] ;
    insult_possibilities[LOVE] = ["","","","","","suffocating"];
    insult_possibilities[SOUL] = ["","","","","","self-obsessed"] ;
    insult_possibilities[ANGER] = ["","","","","","violent"] ;
    insult_possibilities[WEB] =  ["","","","","","controlling"] ;
    insult_possibilities[ROYALTY] =  ["","","","","","pompous"] ;
    insult_possibilities[ENDINGS] =  ["","","","","","dour"] ;
    insult_possibilities[KNOWING] = ["","","","","","paranoid"] ;
    insult_possibilities[GUIDING] = ["","","","","","condescending"] ;
    insult_possibilities[CRAFTING] =  ["","","","","","obsessive"];
    insult_possibilities[LANGUAGE] = ["","","","","","pendantic"] ;
    insult_possibilities[BUGS] =  ["","","","","","creepy"];
    insult_possibilities[ADDICTION] = ["","","","","","addled"];
    insult_possibilities[SPYING] =["","","","","","spying"] ;
    insult_possibilities[CLOWNS] =["","","","","","foolish"] ;
    insult_possibilities[DOLLS] = ["","","","","","childish"] ;
    insult_possibilities[OBFUSCATION] = ["","","","","","mysterious"] ;
    insult_possibilities[DARKNESS] =  ["","","","","","Some people pulled the lamp-post down because they wanted an electric light; some because they wanted old iron; some because they wanted darkness, because their deeds were evil."] ;
    insult_possibilities[KILLING] =  ["","","","","","murderous"];
    insult_possibilities[MUSIC] =  ["","","","","","tone-deaf"] ;
    insult_possibilities[DEFENSE] =  ["","","","","","helicoptering"] ;
    insult_possibilities[QUESTING] = ["","","","","","obsessive"] ;
}


const initLocDesc = () =>{
    insult_possibilities[ART] =  ["trite"];
    insult_possibilities[TECHNOLOGY] =  ["hacky"];
    insult_possibilities[SPACE] =  ["stand-offish"];
    insult_possibilities[TIME] =  ["hasty"];
    insult_possibilities[STEALING] =  ["greedy"];
    insult_possibilities[FREEDOM] =  ["narcissistic"];
    insult_possibilities[FIRE] =  ["destructive"];
    insult_possibilities[LONELY] =  ["lonely"];
    insult_possibilities[OCEAN] =  ["drowned"];
    insult_possibilities[FLESH] =  ["ugly"];
    insult_possibilities[BURIED] =  ["powerless"];
    insult_possibilities[SCIENCE] =  ["non-peer-reviewed"];
    insult_possibilities[MATH] =  ["stilted"];
    insult_possibilities[TWISTING] =  ["mad"];
    insult_possibilities[DEATH] =  ["morbid"];
    insult_possibilities[APOCALYPSE] =  ["pessimistic"];
    insult_possibilities[ANGELS] =  ["self-righteous"];
    insult_possibilities[LIGHT] =  ["blinding"];
    insult_possibilities[SERVICE] =  ["boot-licking"];
    insult_possibilities[FAMILY] =  ["unstable"];
    insult_possibilities[MAGIC] =  ["deluded"];
    insult_possibilities[HEALING] =  ["self-sacrificing"];
    insult_possibilities[PLANTS] = ["awkward"];
    insult_possibilities[HUNTING] = ["creepy stalker"];
    insult_possibilities[DECAY] = ["corrupted"] ;
    insult_possibilities[CHOICES] =  ["indecisive"] ;
    insult_possibilities[ZAP] = ["shocking"] ;
    insult_possibilities[LOVE] = ["suffocating"];
    insult_possibilities[SOUL] = ["self-obsessed"] ;
    insult_possibilities[ANGER] = ["violent"] ;
    insult_possibilities[WEB] =  ["controlling"] ;
    insult_possibilities[ROYALTY] =  ["pompous"] ;
    insult_possibilities[ENDINGS] =  ["dour"] ;
    insult_possibilities[KNOWING] = ["paranoid"] ;
    insult_possibilities[GUIDING] = ["condescending"] ;
    insult_possibilities[CRAFTING] =  ["obsessive"];
    insult_possibilities[LANGUAGE] = ["pendantic"] ;
    insult_possibilities[BUGS] =  ["creepy"];
    insult_possibilities[ADDICTION] = ["addled"];
    insult_possibilities[SPYING] =["spying"] ;
    insult_possibilities[CLOWNS] =["foolish"] ;
    insult_possibilities[DOLLS] = ["childish"] ;
    insult_possibilities[OBFUSCATION] = ["mysterious"] ;
    insult_possibilities[DARKNESS] =  ["edgy"] ;
    insult_possibilities[KILLING] =  ["murderous"];
    insult_possibilities[MUSIC] =  ["tone-deaf"] ;
    insult_possibilities[DEFENSE] =  ["helicoptering"] ;
    insult_possibilities[QUESTING] = ["obsessive"] ;
}


const initGeneralBackstories = () =>{
    general_backstories[ART] = ["would never stop making sculptures if that was an option","can sketch incredibly lifelike portraits","always has a dab of paint behind their ears"];
    general_backstories[TECHNOLOGY] = ["can, will, must and should make a robot","always seem to be on top of the latest technology","are annoyed that everyone wants them to fix their computer","can hack into any system"];
    general_backstories[TIME] =["are always on time to everything","are kind of impatient","seem to always have unlimited energy","always know what time it is","have an instinctive understanding of timing"];
    general_backstories[SPACE] =["seem to always be a mile away when everyone is supposed to meet up","are a very patient person","have an amazing spatial sense","always want to talk about space","love being as high up as possible","have absolutely no fear of heights"];
    general_backstories[STEALING] = ["have extremely light fingers","have never met and object they didn't want to own","have never been on the right side of the law","have been in jail a few times"];
    general_backstories[FREEDOM] = ["never lets anyone tie them down","have travel in their soul","have never been able to settle down anywhere","prides themself in their freedom"];
    general_backstories[FIRE] = ["are always enthralled by fire","have a habit of setting everything on fire","find fire really calming","think fire is the best solution to most problems","think that if you add fire to a problem you have a new problem"];
    general_backstories[LONELY] = ["are somehow always alone","never really bonded with anyone","feel comfortable on their own","have social anxiety","don't feel comfortable in a crowd","mostly just focus on themself"];
    general_backstories[OCEAN] = ["are married to the sea","love the ocean with all their heart","are always surrounded by a thing fog","can navigate any amount of seas","feel most comfortable in the water","can swim like a fish"];
    general_backstories[FLESH]=["genuinely enjoy working out","are remarkably beautiful","have really good bones","really are comfortable in their own skin"];
    general_backstories[BURIED]=["are really calm under pressure","really enjoy digging at the beach","enjoy spelunking as a hobby"];
    general_backstories[SCIENCE] = ["enjoys learning the 'why' of everything","treat life like a series of experiments","always wear a labcoat"];
    general_backstories[MATH] = ["are a very logical person","can do all sorts of math in their head","enjoy memorizing mathematical formulas"];
    general_backstories[TWISTING] =["like things that arent what they seem but also are","delight in getting someone to believe a lie","really enjoy fractals","enjoy needlessly convoluted plots","constantly play tricks on those around them","once tricked a friend into believing 'bananas' weren't actually real fruit","created the game you are currently playing","resolutely insist that 'fractal' is pronounced 'frack tall'","lurk behind the options screen",'hate you in particular',"are watching you","know what you did","are smiling just for you","only want for you to realize the truth","have never told you a lie","would never give you up","are the true reason this game exists","are waiting for you","wish you would find them already","wonder if you've ever heard of the javascript console","make this expression a lot: :) :) :)","honestly don't know what you are doing here","reassure you the menu is supposed to close","suggest you just keep hitting the escape key"];
    general_backstories[DEATH] =["think about death a lot","are more comfortable with the dead than the living","really are chill about the inevitability of death","sometimes talk for hours about how nihlism is only logical"];
    general_backstories[APOCALYPSE] =["constantly spew ominous bullshit","alway remind everyone of how fragile the world truly is","are just really a huge fan of apocalyptic explosions"];
    general_backstories[ANGELS] =  ["walk the path of the gods","always are a righteous person","think deeply about the gods","are a deeply religious person","strive to do the will of the gods"];
    general_backstories[LIGHT] =  ["shine with light wherever they go","always look on the bright side of any situation","always has a light source on hand"];
    general_backstories[SERVICE] =  ["do their best to help those in need","are always there with a helping hand","keep their room spotless","clean whenever they are stressed"];
    general_backstories[FAMILY] =  ["love their family with all their heart","do everything for their family","really loves their found family"];
    general_backstories[MAGIC] =  ["have a natural talent for magic","are one of the skilled mages of this Era","are a powerful Enchanter"];
    general_backstories[HEALING] =  ["have a powerful healing aura","have extensive medical training","never ignore suffering"];
    general_backstories[PLANTS] = ["have an enduring love of flowers","feel more comfortable in a forest than a city","garden as a hobby"];
    general_backstories[HUNTING] = ["can track any person across any distance","always seem to be hunting for the next big thing","are a skilled tracker","can survive indefinitely in the wild from game and foraging"];
    general_backstories[DECAY] = ["are a toxic person","feel comfortable around the dead","are always showing people gross things","somehow always let food go bad"] ;
    general_backstories[CHOICES] =  ["are always aware that doing nothing is also a choice","enjoy taunting others with their lack of choices"] ;
    general_backstories[ZAP] = ["really could stand to lay off with the electricity","thinks having an elemental affinity is a subsitute for a personality"] ;
    general_backstories[LOVE] = ["love everyone they meet","does everything with love","never lets hate into their heart"];
    general_backstories[SOUL] = ["know themselves quite thoroughly","have a very stable personality","are always looking into a mirror","can see straight to anyones soul"] ;
    general_backstories[ANGER] = ["have trouble controlling their temper","aren't shy about letting people know when theres is a problem"] ;
    general_backstories[WEB] =  ["are a smug chess-master","are manipulative to their core","really enjoy spiders","think spiders are very important to the eco-system"] ;
    general_backstories[ROYALTY] =  ["are experienced with ruling","have full noble training","have a princely aura"] ;
    general_backstories[ENDINGS] =  ["were always going to end up dead","will be an existentialist","will focus more on the ending than the begining","will keep their thoughts firmly in the future"] ;
    general_backstories[KNOWING] = ["are an accomplished scholar","are obsessed with knowing everything","are an insufferable know-it-all"] ;
    general_backstories[GUIDING] = ["try to gently lead those who are lost","never gets lost","are a soothing mentor"] ;
    general_backstories[CRAFTING] =  ["enjoy wood-working in their spare time","are quite a skilled craftman","are always collecting small objects to make things with"];
    general_backstories[LANGUAGE] = ["alway have their nose in a book","speaks every language of Zampanio","can curse in a different language for each day of the week"] ;
    general_backstories[BUGS] =  ["does light bee-keeping when at home","doesn't find bugs creepy","always have at least one bug on their body"];
    general_backstories[ADDICTION] = ["enjoy gambling for any stakes","have an addictive personality","have never met a vice they didn't like"];
    general_backstories[SPYING] =["have an extensive information network","are always on top of the local gossip","somehow always are aware of what everyone is doing"] ;
    general_backstories[CLOWNS] =["are a clown","have extensive ties to the Circus","are an accomplished teller of jokes"] ;
    general_backstories[DOLLS] = ["carry around a small antique doll","carve faceless wooden figurines in their spare time"] ;
    general_backstories[OBFUSCATION] = ["speak only in annoying riddles","can write in any cipher","never say what they actually mean","seem to always be in the background"] ;
    general_backstories[DARKNESS] =  ["wear only black","prefer moonlight to sunlight","are more than a little edgy","can see in the dark"] ;
    general_backstories[KILLING] =  ["once killed a man just to see him die","are cloaked in killing intent","seem to always be covered in blood","have an alarming collection of knives"];
    general_backstories[MUSIC] =  ["alway have a song on their lips","can play any song they hear once by ear","always has an instrument nearby","always love being the eye of attention"] ;
    general_backstories[DEFENSE] =  ["always protect the weak","are always on edge for attack","are always aware of all the exits","sleep in full-plate armor"] ;
    general_backstories[QUESTING] = ["absolutely love helping out the little people","are always on the lookout for the next great adventure"] ;
}

const initChildBackstories = () =>{
    child_backstories[ART] =["had the biggest crayon set as a child","took great pride in their drawings being displayed on the fridge as a child","loved creating little works of art as a child"];
    child_backstories[TECHNOLOGY]=["never got tired of screen time as a child","always loved robots as a child","always had their nose in a screen as a child"];
    child_backstories[TIME] = ["sometimes talk about their childhood as if it were yesterday","always woke up before they had to as a child","never wanted to sleep as a child"];
    child_backstories[SPACE] = ["were a very patient child","loved high places as a child","was always tall for their age"];
    child_backstories[STEALING] =["kept getting into locked places as a child","were always breaking rules as a child","somehow ended up with all their friends toys as a child"];
    child_backstories[FREEDOM] =["could never stay in one place for very long as a child","moved around a lot as a child","wandered around constantly as a child"];
    child_backstories[FIRE] =["burned a lot of their childhood toys","always snuck matches as a child","lost their childhood home to a fire"];
    child_backstories[LONELY] =["were a lonely child","never had any friends as a child","were an orphan as a child","were an only child"];
    child_backstories[OCEAN] =["learned to swim before they learned to walk","grew up in a seaside town","always went with their parents on sea voyages as a child"];
    child_backstories[FLESH] =["always enjoyed eating meat as a child","were fascinated that everyone was made of meat as a child","was always praised for their physical abilities as a child"];
    child_backstories[BURIED]=["always loved playing in the sandbox as a kid","really enjoyed weighted blankets as a child","was always the kid who tattled to teachers"];
    child_backstories[SCIENCE] =["never stopped asking 'why' as a child","always loved learning about science as a child","loved telling people Cool Biology Facts all the time as a child"];
    child_backstories[MATH]=["were a math prodigy growing up","always seemed to remember numbers as a child","took to math easily as a child"];
    child_backstories[TWISTING] = ["are still a child","were never a child","were always a child","were born old and aged backwards","spent a lot of time lost in the backrooms as a child","exploded into a flock of crows when they hit puberty"];
    child_backstories[DEATH] =["were a morbid child","were an orphan","wandered around a lot in cemetaries as a child"];
    child_backstories[APOCALYPSE] = ["made ominous proclomations often as a child","constantly asked adults when the world would end","were fascinated by the meteors that destroyed the dinosaurs as a child"];
    child_backstories[ANGELS] =  ["were raised in a convent", "grew up in a very religious family","always felt the gods spoke to them growing up"];
    child_backstories[LIGHT] =  ["grew up in a sparkling sea-side town","always looked on the bright side as a child"];
    child_backstories[SERVICE] =  ["were always the caretaker of their family","were born to a family in service to the King","came from a long line of butlers"];
    child_backstories[FAMILY] =  ["grew up knowing the meaning of family","grew up in a huge family","were always surrounded by siblings as a child"];
    child_backstories[MAGIC] =  ["were a child progidy for magic","always had a sense of wonder as a child","loved the idea of magic as a child"];
    child_backstories[HEALING] =  ["were a child apprentice to a local doctor","always knew where the family first aid kit was"];
    child_backstories[PLANTS] = ["had the green thumb of the family","spent more time with flowers than other children"];
    child_backstories[HUNTING] = ["provided for their family from a young age","loved tracking the wild animals of the Forest"];
    child_backstories[DECAY] = ["were a sickening cute child","enjoyed the solitude of graveyards as a child","found a quiet beauty in decay even as a child"] ;
    child_backstories[CHOICES] =  ["loved mazes as a child","were a strong-headed child","were a stubborn child"] ;
    child_backstories[ZAP] = ["were an electrifying child","were tied to the element of thunder even as a child"] ;
    child_backstories[LOVE] = ["grew up in a very loving family","loved everyone","never felt unloved growing up"];
    child_backstories[SOUL] = ["were a very self-assured child","knew exactly what they wanted to be when they grew up"] ;
    child_backstories[ANGER] = ["were a very violent child","were a bully as a kid","had trouble controlling their temper as a child"] ;
    child_backstories[WEB] =  ["were great at convincing their friends and younger siblings what to do","excelled at using puppy-dog eyes to get their way as a child","somehow never seemed to be the one to take the fall for their childhood pranks"] ;
    child_backstories[ROYALTY] =  ["grew up in the lap of luxury","grew up as the scion of a ruling family","spent their whole life knowing they were heir to the throne"] ;
    child_backstories[ENDINGS] =  ["always enjoyed spoilers as a child","cried for hours at the ending to their favorite childhood book"] ;
    child_backstories[KNOWING] = ["were a bookish child","could not stop asking 'why' as a child","were a bright child"] ;
    child_backstories[GUIDING] = ["always knew the best places to play as a child","lead their small band of childhood friends"] ;
    child_backstories[CRAFTING] =  ["loved to make things as a child","were always showing teachers and parents their latest creation"];
    child_backstories[LANGUAGE] = ["always had their nose in a book as a child","were a surprisingly articulate child","loved to learn the meanings of words","had their first word be 'Mother', not 'ma'"] ;
    child_backstories[BUGS] =  ["enjoyed collecting beetles as a child","had a butterfly collection as a child","were fascinated with bees as a child"];
    child_backstories[ADDICTION] = ["couldn't stay away from the local Faire each year as a child","always convinced their childhood friends to play 'one more game'"];
    child_backstories[SPYING] =["grew up always watching others","seemed to always be lurking in the corners as a child","spied on adults growing up"] ;
    child_backstories[CLOWNS] =["grew up in a traveling circus","always had a joke for the other children growing up","were a playful, funny child","were always the class clown growing up"] ;
    child_backstories[DOLLS] = ["would hold elaborate teaparties with their dolls as a child","talked through their dolls as a child","had a favorite doll as a child"] ;
    child_backstories[OBFUSCATION] = ["were a mysterious child","kept a secret diary as a child","learned to write in ciphers as a child"] ;
    child_backstories[DARKNESS] =  ["never were afraid of the dark as a child","were weirdly good at seeing in the dark as a child"] ;
    child_backstories[KILLING] =  ["were adangerous child","have a dark childhood secret","unsettled the neighbors as a child"];
    child_backstories[MUSIC] =  ["were a musical child","loved singing as a child","learned so many songs from their parents"] ;
    child_backstories[DEFENSE] =  ["protected the neighborhood children growing up","always protected the littler kids growing up"] ;
    child_backstories[QUESTING] = ["were an obsessive child","came up with the best games as a child","loved playing scavenger hunts as a child"] ;
}

export const initThemes = ()=>{
    initStatsMap();
    initPeople();
    initObjects();
    initLocations();
    initAdjs();
    initSuperNames();
    initInsults();
    initCompliments();
    initMemories();
    initMenuOptions();
    initChildBackstories();
    initGeneralBackstories();
    initMiracles();
    initSongs();
    initLocDesc();
    initPhilosophy();

}