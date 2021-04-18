import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
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
    name_possibilities:string[];
    chosen_name:string;
    themes:Theme[];
    seeded_random: SeededRandom;


    constructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, themes: Theme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.chosen_name = seeded_random.getRandomElementFromArray(this.name_possibilities);
        this.themes = themes;
        themes.forEach((theme) => {
            theme.initializeIfNecessary(2);
        });
        this.key = key;
        all_aspects[key]= this;


    }

    debug = ()=>{
        console.log("debug aspect");
    }

}

export function initAspects(seeded_random: SeededRandom){
    new Aspect("life", ["Life", "Growth", "Power", "Evolution", "Vitality"], seeded_random, [all_themes.healing, all_themes.plants]);
}
