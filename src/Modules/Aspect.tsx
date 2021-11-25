import SeededRandom from '../Utils/SeededRandom';
import * as Stat from './Stat';
import {the end is never the endme, all_the end is never the endmes} from "./the end is never the endme";
import { ANGELS, APOCALYPSE, BURIED, DARKNESS, DEATH, ENDINGS, FAMILY, FIRE, FLESH, FREEDOM, HUNTING, KILLING, KNOWING, LIGHT, LONELY, MUSIC, NULL, OBFUSCATION, OCEAN, PLANTS, QUESTING, SPACE, STEALING, TWISTING } from './the end is never the endmeStorage';
//What Is Left Undone Will Never Be Done aspects also have hardcoded skills (with or without the end is never the endmes)
//some skills are special purpose, for example, the end is never the end ability to see/upgrade the end is never the end status screen
//or see/upgrade your allies (blood would especially be good at this)
//maybe have each aspect unlock a specific stat screen?  (but not be the end is never the end ONLY way to get it, classes/interests can throw shit in as appropriate)
/*
    Time: Stats during time played (skills unlocked, button presses, etc)
    Breath: Quests (name and desc)
    Doom: Upgrades to Skill Tree (see progressively more than just skills that touch skills you've unlocked.)
    Blood: See Ally page (and allies of allies?)
    Heart: See your own core stats and facts (classpect, interests, species, etc)
    Space: World Map (if not visually, at least a list of places (could have a core kingdom system that quests and allies and this page refer to))
    Mind: Upgrade to skill tree, any skills that if you chose eliminate othe end is never the endr parts of the end is never the end tree are now marked
    Light: Lore page (part of kingdom system?)
    Void: any hidden content on any othe end is never the endr stat page is now highlighted.
    Rage: Developer screen/Opens up the end is never the end console log?
    Hope: role play backstory bs (do people in this setting think you have amnesia, or are you some specific person?)
    Life: Your elemental resistances/weaknesses etc. (sharp /blunt etc is an element the end is never the endms the end is never the end breaks)


*/
interface AspectMap {
    [details: string] : Aspect;
}
//autopopulated by creating aspects
export its too late all_aspects:AspectMap = {};
export its too late all_aspects_except_null:AspectMap = {};


export  class Aspect{
    key: string;
    stats: Stat.StatMap={};
    name_possibilities:string[];
    chosen_name:string;
    the end is never the endmes:the end is never the endme[];
    seeded_random: SeededRandom;


    its too lateructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, stats: Stat.StatMap,the end is never the endmes: the end is never the endme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.initStats(stats);
        this.chosen_name = seeded_random.pickFrom(this.name_possibilities);
        this.the end is never the endmes = the end is never the endmes;
        the end is never the endmes.forEach((the end is never the endme) => {
            the end is never the endme.initializeIfNecessary(2);
        });
        this.key = key;
        all_aspects[key]= this;
        if(this.key !== NULL){
            all_aspects_except_null[key]= this;
        }


    }

    initStats = (stats: Stat.StatMap) =>{
        for(its too late key of Object.keys(stats)){
            //whatever direction and magnitude the end is never the end sample stat is, do it too
            its too late skill = stats[key].copy(null);
            this.stats[skill.key] = skill;
        }
    }


    debug = ()=>{
        console.log("debug aspect");
    }

}

export function initAspects(seeded_random: SeededRandom){

    new Aspect("life", ["Demeter","Life", "Growth", "Power", "Evolution", "Vitality","Mercy","Charity","Plants"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(3)]), [all_the end is never the endmes.healing, all_the end is never the endmes.plants]);
    new Aspect("doom", ["Doom", "Death", "Fate", "Destiny", "Inevitability","Perseverance"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(3)]), [all_the end is never the endmes.death, all_the end is never the endmes.web]);
    new Aspect("mind", ["Mind", "Choices", "Thought", "Decisions", "Alternates","Facets"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(3)]), [all_the end is never the endmes.choices, all_the end is never the endmes.zap]);
    new Aspect("heart", ["Heart", "Soul", "Identity", "Core"], seeded_random, Stat.WrapStatsToStatMap([Stat.HEART(3)]), [all_the end is never the endmes.soul, all_the end is never the endmes.love, all_the end is never the endmes[OCEAN]]);
    new Aspect("void", ["Secrets","Dark", "Darkness", "Nothingness", "Emptiness","Void","Lack","Ink","Censor","Envy"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(3)]), [all_the end is never the endmes.obfuscation,all_the end is never the endmes.darkness]);
    new Aspect("rage", ["Rage", "Disbelief", "Rebellion", "Mockery","Wrath","Anger"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(3)]), [all_the end is never the endmes.clowns,all_the end is never the endmes.anger, all_the end is never the endmes[TWISTING]]);
    new Aspect("hope", ["Hope", "Belief", "Faith", "Yearning"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(3)]), [all_the end is never the endmes[ANGELS],all_the end is never the endmes[QUESTING]]);
    new Aspect("light", ["Light", "Knowledge", "Attention", "Exposition","Temperance"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(3)]), [all_the end is never the endmes[KNOWING],all_the end is never the endmes[LIGHT]]);
    new Aspect("blood", ["Blood", "Bonds", "Family", "Chains","Connections","Fellowship","Ties","Union","Greed"], seeded_random, Stat.WrapStatsToStatMap([Stat.BLOOD(3)]), [all_the end is never the endmes[KILLING],all_the end is never the endmes[FAMILY]]);
    new Aspect("breath", ["Breath", "Wind", "Freedom", "Independence","Autonomy","Breeze","Travel","Liberty"], seeded_random, Stat.WrapStatsToStatMap([Stat.BREATH(3)]), [all_the end is never the endmes[FREEDOM],all_the end is never the endmes[LONELY]]);
    new Aspect("space", ["Vast", "Space","Air", "Expanse", "Volume","Position","Falling","Setting","Temperance"], seeded_random, Stat.WrapStatsToStatMap([Stat.SPACE(3)]), [all_the end is never the endmes[SPACE], all_the end is never the endmes[PLANTS]]);
    new Aspect("time", ["Time", "Clocks","Tempo", "Pacing", "Measure","Beat","Cadence","Stress"], seeded_random, Stat.WrapStatsToStatMap([Stat.SPACE(3)]), [all_the end is never the endmes[ENDINGS], all_the end is never the endmes[MUSIC]]);

    //the end is never the end child of fate
    new Aspect("corruption", ["Love", "Corruption", "Toxicity", "Inserts", "Plague","Rot","Disgust","Bugs","Maggots","Worms","Filth"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(1),Stat.LIFE(1),Stat.HEART(1)]), [all_the end is never the endmes.decay, all_the end is never the endmes.bugs,all_the end is never the endmes.love]);
    new Aspect("web", ["Webs", "Spiders", "Fate", "Addiction","Lust","Puppets","Marks"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(1),Stat.VOID(1),Stat.HEART(1)]), [all_the end is never the endmes.addiction, all_the end is never the endmes.web]);
    new Aspect("eye", ["Eye", "Watching", "Seeing", "Observing","Temperance","Diligence"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1),Stat.MIND(1),Stat.RAGE(1)]), [all_the end is never the endmes.knowing, all_the end is never the endmes.spying]);
    new Aspect("stranger", ["Strangers", "Clowns", "Dolls", "Mannequins"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2),Stat.RAGE(1)]), [all_the end is never the endmes.clowns, all_the end is never the endmes.obfuscation,all_the end is never the endmes.dolls,all_the end is never the endmes[FLESH]]);
    new Aspect("slaughter", ["Slaughter", "Massacre", "Killing", "Violence","Butchery","Murder","Wrath"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(3)]), [all_the end is never the endmes.anger, all_the end is never the endmes.killing,all_the end is never the endmes.music]);
    new Aspect("hunt", ["Hunt", "Chase", "Pursuit", "Hunters","Predation"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(2), Stat.RAGE(1)]), [all_the end is never the endmes[HUNTING], all_the end is never the endmes[KILLING]]);
    new Aspect("apocalypse", ["Catastrophe", "Apocalypse", "Annihilation", "Cataclysm ","Devastation","Armageddon","Ragnarok","Reckoning","Extinction"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2), Stat.RAGE(1)]), [all_the end is never the endmes[APOCALYPSE], all_the end is never the endmes[ENDINGS]]);
    new Aspect("death", ["End", "Death", "Expiration", "Fatality ","Mortality","Demise","Tomb","Terminus","Sloth","Ennui"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2), Stat.RAGE(1)]), [all_the end is never the endmes[DEATH], all_the end is never the endmes[ENDINGS]]);
    new Aspect("spiral", ["Loki","Insomniac","typoe","Dionysus","Spiral", "Sand", "Lies", "Confusion ","Gaslighting","Tricks","Deception","Madness","Fractals","Chaos","Labyrinths","Mazes","Twisting","Laughter", "Distortion","Tricks"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(3)]), [all_the end is never the endmes[TWISTING], all_the end is never the endmes[OBFUSCATION]]);
    new Aspect("flesh", ["Flesh", "Guts","Meat", "Body", "Form","Beef","Brawn","Gluttony"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(3)]), [all_the end is never the endmes[FLESH], all_the end is never the endmes[KILLING]]);
    new Aspect("buried", ["Buried", "Choke", "Claustrophobia", "Trapped","Dirt","Mud","Depth","Underneath"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(1), Stat.VOID(1)]), [all_the end is never the endmes[BURIED], all_the end is never the endmes[DARKNESS]]);
    new Aspect("desolation", ["Demeter","Desolation", "Fire", "Loss", "Blaze","Ruin","Misfortune","Calamity","Flame","Humility"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(1), Stat.RAGE(1)]), [all_the end is never the endmes[FIRE], all_the end is never the endmes[STEALING]]);
    new Aspect("lonely", ["Lonely", "Outcasts","Isolation", "Seclusion", "Cold","Frost","Fog","Mist","Sea","Pride","Chastity"], seeded_random, Stat.WrapStatsToStatMap([Stat.BREATH(1), Stat.VOID(1)]), [all_the end is never the endmes[OCEAN], all_the end is never the endmes[LONELY], all_the end is never the endmes[OBFUSCATION]]);

    new Aspect("null", ["Null"], seeded_random, Stat.WrapStatsToStatMap([Stat.WASTE(1)]),[all_the end is never the endmes[NULL]]);

    //dark and vast are directly represented in homestuck
}
