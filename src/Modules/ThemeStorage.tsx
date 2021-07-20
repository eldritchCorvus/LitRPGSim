import { ACHIEVEMENTS, BACKSTORY, CITYBUILDING, CODE, COMPANIONS, GODS, INVENTORY, LORE, OPTIONS, QUESTS, RESISTANCES, SKILLGRAPH, STATISTICS, STATUS, WARROOM } from '../Utils/constants';
import { Memory } from './ObserverBot/Memory';
import * as Stat from './Stat';

//categories within a theme
export const NOUN="noun";
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


export const keys = [DEATH,APOCALYPSE, WASTE,SERVICE,FAMILY,MAGIC,ANGELS, LIGHT,HUNTING,CLOWNS,PLANTS,DECAY,CHOICES,ZAP,LOVE,SOUL,ANGER,WEB,ROYALTY,ENDINGS,KNOWING,GUIDING,CRAFTING,ADDICTION,SPYING,HEALING,DOLLS,OBFUSCATION,DARKNESS,KILLING,MUSIC,DEFENSE,QUESTING,BUGS,LANGUAGE];

/*
TODO: JUST MONIKA QUIZ MODE (check notes)
each theme should have a few questions the True Face of ObserverBot wants to ask (just yes/no answers)
and comments True has on your response. (and true should STORE if you said yes or no.)
*/

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
export let noun_possibilities:ThemePossibilitiesMap = {};
export let object_possibilities:ThemePossibilitiesMap = {};
export let location_possibilities:ThemePossibilitiesMap = {};
export let general_backstories:ThemePossibilitiesMap = {};
export let child_backstories:ThemePossibilitiesMap = {};
export let miracles:ThemePossibilitiesMap = {};

export let menu_options:ThemePossibilitiesMap = {};
export let adj_possibilities:ThemePossibilitiesMap = {};
export let insult_possibilities:ThemePossibilitiesMap = {};
export let compliment_possibilities:ThemePossibilitiesMap = {};
export let memories:MemoryMap = {};

export let super_name_possibilities_map:ThemePossibilitiesMap = {};


export const checkIfAllKeysPresent = ()=>{
    for(let key of keys){
        if(!(key in stats_map)){
           console.error("JR NOTE: key", key, "not found in stats_map");
        }
        
        if(!(key in noun_possibilities)){
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
    }


    
}

 const initStatsMap = () =>{
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

const initNouns = () =>{
    noun_possibilities[DEATH] = ["reaper","psychopomp","shinigami","grave-digger","undertaker","thanatologist","embalmer"];
    noun_possibilities[APOCALYPSE] = ["horseman","rider","messiahs","heisenberg"];
    noun_possibilities[SERVICE] = ["butler","maid","lackey","minion","attendant","cleaner"];
    noun_possibilities[ANGELS] = ["angel","feather","guardian","cherub","arch-angel","messenger","spirit","blessing"];
    noun_possibilities[LIGHT] = ["light","glow","glare","illumination","gleam"];
    noun_possibilities[FAMILY] = ["ancestor","father","mother","brother","sister","aunt","uncle","cousin","family"];
    noun_possibilities[MAGIC] = ["spell-circle","ritual","magic","spell","witchcraft","enchantment","incantation","spellbook","tome","incantation","glamour"];
    noun_possibilities[HUNTING] = ["hunter","stalker","predator","pursuer"];
    noun_possibilities[HEALING] = ["potion","bandage","doctor","nurse","healer","panacea","curative"];
    noun_possibilities[PLANTS] =["leaf","flower","root","vine","branch","tree","meadow","forest"];
    noun_possibilities[DECAY] = ["rot","decay","corruption","entropy"];
    noun_possibilities[CHOICES] = ["choice","selection","option","janus","facet","aspect"];
    noun_possibilities[ZAP] = ["zap","bolt","stroke","lightning","ozone"];
    noun_possibilities[LOVE] = ["love","heart","soulmate","kiss","hug","caress","touch","romance"];
    noun_possibilities[SOUL] = ["self","soulmate","core","soul","heart","spirit","essence"];
    noun_possibilities[ANGER] = ["beserker","rebel","hater"];
    noun_possibilities[WEB] = ["destiny","web","spider","fate","tapestry","promise","providence","arachnid","puppet"];
    noun_possibilities[ROYALTY] = ["decree","doctrine","law","king","queen","lord","crown","empire"];
    noun_possibilities[ENDINGS] =["finale","coda","epilogue","curtain","applause","bow"];
    noun_possibilities[KNOWING] = ["instinct","knowledge","truth","gnosis","awareness","sense","idea"];
    noun_possibilities[GUIDING] = ["path","road","journey","guide","destination","trip"];
    noun_possibilities[CRAFTING] = ["wood","metal","ore","crystal","rock","log","cloth","ax","pickax","gem","anvil","crucible","hammer","needle"];
    noun_possibilities[LANGUAGE] = ["word","rune","speech","book","scroll","tongue","ink","paper","letter"];
    noun_possibilities[BUGS] = ["bug","worm","fly","maggot","roach","swarm","plague","hive","locusts"];
    noun_possibilities[ADDICTION] = ["compulsion","habit","high","addiction","dependence"];
    noun_possibilities[SPYING] = ["eye","watcher","observer","ear","spy","camera","recording"];
    noun_possibilities[CLOWNS] = ["clown","mime","jester","acrobat","circus","harlequin","ringmaster"];
    noun_possibilities[DOLLS] = ["doll","mannequin","dressform","statue","dummy","puppet","marionette","figure","figurine","toy"];
    noun_possibilities[OBFUSCATION] = ["cover","blanket","cloak","disguise","costume"];
    noun_possibilities[DARKNESS] = ["darkness","night","void","nocturne","shadow","nothing"];
    noun_possibilities[KILLING] = ["murderer","blade","gun","assasin","killer","blood","gore"];
    noun_possibilities[MUSIC] = ["orchestra","overture","reprise","dirge","requiem","nocturne","concert","waltz","chant","hymn","fugue","note","instrument","song","serenade","leitmotif","anthem","encore","choir"];
    noun_possibilities[DEFENSE] = ["shield","armor","knight","paladin","defender","protector","page","soldier","warrior"];
    noun_possibilities[QUESTING] = ["quest","goal","journey","seeker","adventure","hope","belief","faith","pilgrim"];

}

const initAdjs = () =>{
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
    adj_possibilities[DECAY] = ["decaying","rotting","crumbling","decomposing","festering","languishing","corrupting"];
    adj_possibilities[CHOICES] = ["choosing","branching","selecting"];
    adj_possibilities[ZAP] = ["zapping","jolting","shocking","electrical"];
    adj_possibilities[LOVE] = ["loving","caring","embracing","smitten"];
    adj_possibilities[SOUL] = ["defining","delineating","pure"];
    adj_possibilities[ANGER] = ["raging","hating","rebelling","glaring","stampeding","furious"];
    adj_possibilities[WEB] = ["controlling","puppeting","trapping"];
    adj_possibilities[ROYALTY] = ["ruling","mandating","decreeing","royal","commanding"];
    adj_possibilities[ENDINGS] =["ending","final","ultimate"];
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

const initSuperNames = () =>{
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
    location_possibilities[DEATH] =  ["necropolis","graveyard","cemetary","boneyard","funeral home","ossuary","columbaria","mausoleum","catacomb","memorial"];
    location_possibilities[APOCALYPSE] =  ["landscape of thorns","wasteland","spike field","menacing earthworks","not a place of honor"];
    location_possibilities[ANGELS] =  ["church","grotto","temple","monastery"];
    location_possibilities[SERVICE] =  ["mansion","manor","main-house"];
    location_possibilities[FAMILY] =  ["home","hearth"];
    location_possibilities[MAGIC] =  ["mountain","school","tower"];
    location_possibilities[LIGHT] =  ["mountain","field","cloud"];
    location_possibilities[HEALING] =  ["hospital","field-hospital","doctors office"];
    location_possibilities[PLANTS] = ["forest","meadow","jungle"];
    location_possibilities[HUNTING] = ["forest","meadow","jungle"];
    location_possibilities[DECAY] = ["swamp","graveyeard","wasteland"] ;
    location_possibilities[CHOICES] =  ["forking-path"] ;
    location_possibilities[ZAP] = ["field","cloud"] ;
    location_possibilities[LOVE] = ["restaurant","scenic cliff","windswept moor"];
    location_possibilities[SOUL] = ["hall of mirrors"] ;
    location_possibilities[ANGER] = ["battlefield","bull-pen"] ;
    location_possibilities[WEB] =  ["cave","theatre"] ;
    location_possibilities[ROYALTY] =  ["castle","mansion","courthouse"] ;
    location_possibilities[ENDINGS] =  ["theatre","graveyard","abandoned building"] ;
    location_possibilities[KNOWING] = ["library","school","monastery"] ;
    location_possibilities[GUIDING] = ["path","wilderness"] ;
    location_possibilities[CRAFTING] =  ["smithy","forge","mill"];
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
    object_possibilities[DEATH] =  ["skull", "bones","ossuary","memento mori","death note"];
    object_possibilities[APOCALYPSE] =  ["nuke", "grey goo","vial of plague","skynet","meteor"];
    object_possibilities[ANGELS] =  ["feather", "halo","scripture"];
    object_possibilities[SERVICE] =  ["feather duster","mop","broom"];
    object_possibilities[FAMILY] =  ["cradle","rattle","photo albulm"];
    object_possibilities[MAGIC] =  ["scoll","potion","wand","staff"];
    object_possibilities[LIGHT] =  ["lantern","flashlight","torch"];
    object_possibilities[HEALING] =  ["potion","bandage","scalpel"];
    object_possibilities[PLANTS] = ["seed","sapling","shovel"];
    object_possibilities[HUNTING] = ["pelt","leather","gun"];
    object_possibilities[DECAY] = ["cadavar","gravestone","rotten food"] ;
    object_possibilities[CHOICES] =  ["todo list","coin","adventure book"] ;
    object_possibilities[ZAP] = ["battery","lichtenberg figure","glass"] ;
    object_possibilities[LOVE] = ["heart","chocolate","ring"];
    object_possibilities[SOUL] = ["gem","mirror","crystal"] ;
    object_possibilities[ANGER] = ["matador costume","red flag","glove"] ;
    object_possibilities[WEB] =  ["silk","puppet","cobweb"] ;
    object_possibilities[ROYALTY] =  ["crown","throne","sceptre"] ;
    object_possibilities[ENDINGS] =  ["curtain","gravestone","stop sign"] ;
    object_possibilities[KNOWING] = ["book","camera","datum"] ;
    object_possibilities[GUIDING] = ["map","walking stick","compass"] ;
    object_possibilities[CRAFTING] =  ["anvil","hammer","ax"];
    object_possibilities[LANGUAGE] = ["dictionary","translator","thesaurus"] ;
    object_possibilities[BUGS] =  ["hive","pupa","nest"];
    object_possibilities[ADDICTION] = ["syringe","vial","dice"];
    object_possibilities[SPYING] =["spyglass","camera","disguise"] ;
    object_possibilities[CLOWNS] =["wig","horn","facepaint"] ;
    object_possibilities[DOLLS] = ["doll","mannequin","statuette"] ;
    object_possibilities[OBFUSCATION] = ["white-out","sharpie","censor bar"] ;
    object_possibilities[DARKNESS] =  ["sunglasses","curtain","blindfold"] ;
    object_possibilities[KILLING] =  ["knife","machete","gun"];
    object_possibilities[MUSIC] =  ["flute","guitar","drum"] ;
    object_possibilities[DEFENSE] =  ["shield","armor","helmet"] ;
    object_possibilities[QUESTING] = ["map","rations","notes"] ;
}

const initMenuOptions = () =>{
    //SKILLGRAPH,STATUS,STATISTICS, LOADING,ACHIEVEMENTS,OPTIONS,CODE
    //QUESTS,COMPANIONS,GODS,CITYBUILDING,INVENTORY,LORE,BACKSTORY,RESISTANCES
    menu_options[DEATH] =  [GODS];
    menu_options[APOCALYPSE] =  [WARROOM];
    menu_options[ANGELS] =  [GODS];
    menu_options[SERVICE] =  [QUESTS];
    menu_options[FAMILY] =  [CITYBUILDING];
    menu_options[MAGIC] =  [RESISTANCES];
    menu_options[LIGHT] =  [ACHIEVEMENTS];
    menu_options[HEALING] =  [STATUS];
    menu_options[PLANTS] = [INVENTORY];
    menu_options[HUNTING] = [INVENTORY];
    menu_options[DECAY] = [STATUS] ;
    menu_options[CHOICES] =  [OPTIONS] ;
    menu_options[ZAP] = [RESISTANCES] ;
    menu_options[LOVE] = [COMPANIONS];
    menu_options[SOUL] = [STATUS] ;
    menu_options[ANGER] = [BACKSTORY] ;
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
    menu_options[DARKNESS] =  [BACKSTORY] ;
    menu_options[KILLING] =  [INVENTORY];
    menu_options[MUSIC] =  [INVENTORY] ;
    menu_options[DEFENSE] =  [INVENTORY] ;
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
    general_backstories[DEATH] =["thinks about death a lot","is more comfortable with the dead than the living","really is chill about the inevitability of death","sometimes talks for hours about how nihlism is only logical"];
    general_backstories[APOCALYPSE] =["constantly spews ominous bullshit","always remind everyone of how fragile the world truly is","is just really a huge fan of apocalyptic explosions"];
    general_backstories[ANGELS] =  ["walk the path of the gods","always are a righteous person","think deeply about the gods"];
    general_backstories[LIGHT] =  ["shine with light wherever they go","always look on the bright side of any situation"];
    general_backstories[SERVICE] =  ["do their best to help those in need","are always there with a helping hand"];
    general_backstories[FAMILY] =  ["love their family with all their heart","do everything for their family"];
    general_backstories[MAGIC] =  ["have a natural talent for magic","are one of the skilled mages of this Era","are a powerful Enchanter"];
    general_backstories[HEALING] =  ["have a powerful healing aura","have extensive medical training","never ignore suffering"];
    general_backstories[PLANTS] = ["have an enduring love of flowers","feel more comfortable in a forest than a city"];
    general_backstories[HUNTING] = ["are a skilled tracker","can survive indefinitely in the wild from game and foraging"];
    general_backstories[DECAY] = ["are a toxic person","feel comfortable around the dead"] ;
    general_backstories[CHOICES] =  ["are always aware that doing nothing is also a choice","enjoy taunting others with their lack of choices"] ;
    general_backstories[ZAP] = ["really could stand to lay off with the electricity","thinks having an elemental affinity is a subsitute for a personality"] ;
    general_backstories[LOVE] = ["love everyone they meet","does everything with love","never lets hate into their heart"];
    general_backstories[SOUL] = ["know themselves quite thoroughly","have a very stable personality"] ;
    general_backstories[ANGER] = ["have trouble controlling their temper","aren't shy about letting people know when theres is a problem"] ;
    general_backstories[WEB] =  ["are a smug chess-master","are manipulative to their core"] ;
    general_backstories[ROYALTY] =  ["are experienced with ruling","have full noble training"] ;
    general_backstories[ENDINGS] =  ["are existentialist","focus more on the ending than the begining","keep their thoughts firmly in the future"] ;
    general_backstories[KNOWING] = ["are an accomplished scholar","are obsessed with knowing everything","are an insufferable know-it-all"] ;
    general_backstories[GUIDING] = ["try to gently lead those who are lost","never gets lost","are a soothing mentor"] ;
    general_backstories[CRAFTING] =  ["enjoy wood-working in their spare time","are quite a skilled craftman"];
    general_backstories[LANGUAGE] = ["alway have their nose in a book","speaks every language of Zampanio","can curse in a different language for each day of the week"] ;
    general_backstories[BUGS] =  ["does light bee-keeping when at home","doesn't find bugs creepy"];
    general_backstories[ADDICTION] = ["enjoy gambling for any stakes","have an addictive personality","have never met a vice they didn't like"];
    general_backstories[SPYING] =["have an extensive information network","are always on top of the local gossip"] ;
    general_backstories[CLOWNS] =["are a clown","have extensive ties to the Circus","are an accomplished teller of jokes"] ;
    general_backstories[DOLLS] = ["carry around a small antique doll","carve faceless wooden figurines in their spare time"] ;
    general_backstories[OBFUSCATION] = ["speak only in annoying riddles","can write in any cipher"] ;
    general_backstories[DARKNESS] =  ["wear only black","prefer moonlight to sunlight","are more than a little edgy"] ;
    general_backstories[KILLING] =  ["are cloaked in killing intent","seem to always be covered in blood","have an alarming collection of knives"];
    general_backstories[MUSIC] =  ["alway have a song on their lips","can play any song they hear once by ear"] ;
    general_backstories[DEFENSE] =  ["always protect the weak","are always on edge for attack"] ;
    general_backstories[QUESTING] = ["absolutely love helping out the little people","are always on the lookout for the next great adventure"] ;
}

const initChildBackstories = () =>{
    child_backstories[DEATH] =["were a morbid child","were an orphan","wandered around a lot in cemetaries as a child"];
    child_backstories[APOCALYPSE] = ["made ominous proclomations often as a child","constantly asked adults when the world would end","were fascinated by the meteors that destroyed the dinosaurs as a child"];
    child_backstories[ANGELS] =  ["were raised in a convent", "grew up in a very religious family","always felt the gods spoke to them growing up"];
    child_backstories[LIGHT] =  ["grew up in a sparkling sea-side town","always looked on the bright side as a child"];
    child_backstories[SERVICE] =  ["were always the caretaker of their family","were born to a family in service to the King","came from a long line of butlers"];
    child_backstories[FAMILY] =  ["grew up knowing the meaning of family","grew up in a huge family","were always surrounded by siblings as a child"];
    child_backstories[MAGIC] =  ["were a child progidy for magic","always had a sense of wonder as a child","loved the idea of magic as a child"];
    child_backstories[HEALING] =  ["were a child apprentice to a local doctor","always knew where the family first aid kit were"];
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
    child_backstories[LANGUAGE] = ["were a surprisingly articulate child","loved to learn the meanings of words","had their first word be 'Mother', not 'ma'"] ;
    child_backstories[BUGS] =  ["enjoyed collecting beetles as a child","had a butterfly collection as a child","were fascinated with bees as a child"];
    child_backstories[ADDICTION] = ["couldn't stay away from the local Faire each year as a child","always convinced their childhood friends to play 'one more game'"];
    child_backstories[SPYING] =["grew up always watching others","seemed to always be lurking in the corners as a child","spied on adults growing up"] ;
    child_backstories[CLOWNS] =["grew up in a traveling circus","always had a joke for the other children growing up","were a playful, funny child","were always the class clown growing up"] ;
    child_backstories[DOLLS] = ["would hold elaborate teaparties with their dolls as a child"] ;
    child_backstories[OBFUSCATION] = ["were a mysterious child","kept a secret diary as a child","learned to write in ciphers as a child"] ;
    child_backstories[DARKNESS] =  ["never were afraid of the dark as a child"] ;
    child_backstories[KILLING] =  ["were adangerous child","have a dark childhood secret","unsettled the neighbors as a child"];
    child_backstories[MUSIC] =  ["were a musical child","loved singing as a child","learned so many songs from their parents"] ;
    child_backstories[DEFENSE] =  ["protected the neighborhood children growing up","always protected the littler kids growing up"] ;
    child_backstories[QUESTING] = ["were an obsessive child","came up with the best games as a child"] ;
}

export const initThemes = ()=>{
    initStatsMap();
    initNouns();
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

}