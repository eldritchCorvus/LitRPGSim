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
export const CLOWNS = "clowns";
export const keys = [CLOWNS,PLANTS,DECAY,CHOICES,ZAP,LOVE,SOUL,ANGER,WEB,ROYALTY,ENDINGS,KNOWING,GUIDING,CRAFTING,ADDICTION,SPYING,HEALING,DOLLS,OBFUSCATION,DARKNESS,KILLING,MUSIC,DEFENSE,QUESTING,BUGS,LANGUAGE];

/*
todo add keys for insults/compliments for each theme ObserverBot can apply to you.
single word things like gross, predictable, boring, pretentious, etc.
plus loading quips, mostly mundane, sometimes unsettling or aggressive
*/

interface ThemeStatMap {
    [details: string] : Stat.Stat[];
}

interface ThemePossibilitiesMap {
    [details: string] : string[];
}

//noun_possibility, adj_possibility (glowing, shimmering, walking, ceasing)
export let stats_map:ThemeStatMap = {};
export let noun_possibilities:ThemePossibilitiesMap = {};
export let adj_possibilities:ThemePossibilitiesMap = {};

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
    }


    
}

 const initStatsMap = () =>{
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
}

const initNouns = () =>{
    noun_possibilities[HEALING] = ["potion","bandage","doctor","nurse","healer","panacea","curative"];
    noun_possibilities[PLANTS] =["leaf","flower","root","vine","branch","tree","meadow","forest"];
    noun_possibilities[DECAY] = ["rot","decay","corruption","entropy"];
    noun_possibilities[CHOICES] = ["choice","selection","option","janus","facet","aspect"];
    noun_possibilities[ZAP] = ["zap","bolt","stroke","lightning"];
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
    noun_possibilities[CLOWNS] = ["clown","mime","jester","acrobat","circus","harlequin"];
    noun_possibilities[DOLLS] = ["doll","mannequin","dressform","statue","dummy","puppet","marionette","figure","figurine","toy"];
    noun_possibilities[OBFUSCATION] = ["cover","blanket","cloak","disguise","costume"];
    noun_possibilities[DARKNESS] = ["darkness","night","void","nocturne","shadow","nothing"];
    noun_possibilities[KILLING] = ["murderer","blade","gun","assasin","killer"];
    noun_possibilities[MUSIC] = ["orchestra","overture","reprise","dirge","requiem","nocturne","concert","waltz","chant","hymn","fugue","note","instrument","song","serenade","leitmotif","anthem","encore","choir"];
    noun_possibilities[DEFENSE] = ["shield","armor","knight","paladin","defender","protector","page","soldier","warrior"];
    noun_possibilities[QUESTING] = ["quest","goal","journey"];

}

const initAdjs = () =>{
    adj_possibilities[HEALING] = ["curative","medical","healing","curing","medicinal","restoring","fixing","mending","regenerating"];
    adj_possibilities[PLANTS] =["growing","sprouting","blossoming"];
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
    adj_possibilities[KILLING] = ["killing","murderous","massacred"];
    adj_possibilities[MUSIC] = ["singing","dancing","playing"];
    adj_possibilities[DEFENSE] = ["defending","gallant","protecting"];
    adj_possibilities[QUESTING] = ["questing","searching","exploring"];
}

const initSuperNames = () =>{
    super_name_possibilities_map[HEALING] =  ["Summon Phoenix"];
    super_name_possibilities_map[PLANTS] = ["Forest's March"];
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
    super_name_possibilities_map[KILLING] =  ["Total War"];
    super_name_possibilities_map[MUSIC] =  ["Symphonic Synthesia"] ;
    super_name_possibilities_map[DEFENSE] =  ["Excalibur"] ;
    super_name_possibilities_map[QUESTING] = ["Satisfaction"] ;
}




export const initThemes = ()=>{
    //TODO instead of  HEALING: [Stat.LIFE(1)] i need to do stats_map[HEALING]=[Stat.LIFE(1)] for each
    initStatsMap();
    initNouns();
    initAdjs();
    initSuperNames();
    
}