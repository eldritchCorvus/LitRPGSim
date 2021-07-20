import SeededRandom from '../Utils/SeededRandom';
import * as Stat from './Stat';
import {Theme, all_themes} from "./Theme";
import { ANGELS, APOCALYPSE, DEATH, ENDINGS, FAMILY, HUNTING, KILLING, KNOWING, LIGHT, QUESTING } from './ThemeStorage';
//TODO aspects also have hardcoded skills (with or without themes)
//some skills are special purpose, for example, the ability to see/upgrade the status screen
//or see/upgrade your allies (blood would especially be good at this)
//maybe have each aspect unlock a specific stat screen?  (but not be the ONLY way to get it, classes/interests can throw shit in as appropriate)
/*
    Time: Stats during time played (skills unlocked, button presses, etc)
    Breath: Quests (name and desc)
    Doom: Upgrades to Skill Tree (see progressively more than just skills that touch skills you've unlocked.)
    Blood: See Ally page (and allies of allies?)
    Heart: See your own core stats and facts (classpect, interests, species, etc)
    Space: World Map (if not visually, at least a list of places (could have a core kingdom system that quests and allies and this page refer to))
    Mind: Upgrade to skill tree, any skills that if you chose eliminate other parts of the tree are now marked
    Light: Lore page (part of kingdom system?)
    Void: any hidden content on any other stat page is now highlighted.
    Rage: Developer screen/Opens up the console log?
    Hope: role play backstory bs (do people in this setting think you have amnesia, or are you some specific person?)
    Life: Your elemental resistances/weaknesses etc. (sharp /blunt etc is an element thems the breaks)


*/
interface AspectMap {
    [details: string] : Aspect;
}
//autopopulated by creating aspects
export const all_aspects:AspectMap = {};


export  class Aspect{
    key: string;
    stats: Stat.StatMap={};
    name_possibilities:string[];
    chosen_name:string;
    themes:Theme[];
    seeded_random: SeededRandom;


    constructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, stats: Stat.StatMap,themes: Theme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.initStats(stats);
        this.chosen_name = seeded_random.pickFrom(this.name_possibilities);
        this.themes = themes;
        themes.forEach((theme) => {
            theme.initializeIfNecessary(2);
        });
        this.key = key;
        all_aspects[key]= this;


    }

    initStats = (stats: Stat.StatMap) =>{
        for(const key of Object.keys(stats)){
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.positiveName] = skill;
        }
    }


    debug = ()=>{
        console.log("debug aspect");
    }

}

export function initAspects(seeded_random: SeededRandom){

    new Aspect("life", ["Life", "Growth", "Power", "Evolution", "Vitality"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(3)]), [all_themes.healing, all_themes.plants]);
    new Aspect("doom", ["Doom", "Death", "Fate", "Destiny", "Inevitability"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(3)]), [all_themes.death, all_themes.web]);
    new Aspect("mind", ["Mind", "Choices", "Thought", "Decisions", "Alternates","Facets"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(3)]), [all_themes.choices, all_themes.zap]);
    new Aspect("heart", ["Heart", "Soul", "Identity", "Core"], seeded_random, Stat.WrapStatsToStatMap([Stat.HEART(3)]), [all_themes.soul, all_themes.love]);
    new Aspect("void", ["Dark", "Darkness", "Nothingness", "Emptiness","Void","Lack"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(3)]), [all_themes.obfuscation,all_themes.darkness]);
    new Aspect("rage", ["Rage", "Disbelief", "Rebellion", "Mockery"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(3)]), [all_themes.clowns,all_themes.anger]);
    new Aspect("hope", ["Hope", "Belief", "Faith", "Yearning"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(3)]), [all_themes[ANGELS],all_themes[QUESTING]]);
    new Aspect("light", ["Light", "Knowledge", "Attention", "Exposition"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(3)]), [all_themes[KNOWING],all_themes[LIGHT]]);
    new Aspect("blood", ["Blood", "Bonds", "Family", "Chains","Connections","Fellowship","Ties","Union"], seeded_random, Stat.WrapStatsToStatMap([Stat.BLOOD(3)]), [all_themes[KILLING],all_themes[FAMILY]]);

    new Aspect("corruption", ["Love", "Corruption", "Toxicity", "Inserts", "Plague","Rot","Disgust","Bugs","Maggots","Worms"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(1),Stat.LIFE(1),Stat.HEART(1)]), [all_themes.decay, all_themes.bugs,all_themes.love]);
    new Aspect("web", ["Webs", "Spiders", "Fate", "Addiction"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(1),Stat.VOID(1),Stat.HEART(1)]), [all_themes.addiction, all_themes.web]);
    new Aspect("eye", ["Eye", "Watching", "Seeing", "Observing"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1),Stat.MIND(1),Stat.RAGE(1)]), [all_themes.knowing, all_themes.spying]);
    new Aspect("stranger", ["Strangers", "Clowns", "Dolls", "Mannequins"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2),Stat.RAGE(1)]), [all_themes.clowns, all_themes.obfuscation,all_themes.dolls]);
    new Aspect("slaughter", ["Slaughter", "Massacre", "Killing", "Violence","Butchery","Murder"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(3)]), [all_themes.anger, all_themes.killing,all_themes.music]);
    new Aspect("hunt", ["Hunt", "Chase", "Pursuit", "Hunters","Predation"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(2), Stat.RAGE(1)]), [all_themes[HUNTING], all_themes[KILLING]]);
    new Aspect("apocalypse", ["Catastrophe", "Apocalypse", "Annihilation", "Cataclysm ","Devastation","Armageddon","Ragnarok","Reckoning","Extinction"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2), Stat.RAGE(1)]), [all_themes[APOCALYPSE], all_themes[ENDINGS]]);
    new Aspect("death", ["End", "Death", "Expiration", "Fatality ","Mortality","Demise","Tomb"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2), Stat.RAGE(1)]), [all_themes[DEATH], all_themes[ENDINGS]]);

}
