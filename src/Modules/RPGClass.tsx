import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
//TODO classes also have hardcoded skills (with or without themes)
//some skills are special purpose, for example, the ability to see/upgrade the status screen
//or see stats (seer would especially be good at this)
//maybe have each class unlock a specific stat screen?  (but not be the ONLY way to get it, classes/interests can throw shit in as appropriate)
/*
    Maid:
    Page:
    Mage:
    Knight: Inventory
    Rogue:
    Sylph:
    Seer: unlock different types of status screens (but not all)
    Thief:
    Heir:
    Bard:
    Prince:
    Witch:

*/
interface ClassMap {
    [details: string] : RPGClass;
}
//autopopulated by creating aspects
export const all_classes:ClassMap = {};


export  class RPGClass{
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
            theme.initializeIfNecessary(3);
        });
        this.key = key;
        all_classes[key]= this;


    }

    debug = ()=>{
        console.log("debug class");
    }

}

export function initClasses(seeded_random: SeededRandom){
    new RPGClass("seer", ["Seer", "Watcher", "Guide", "Sherpa", "Eye"], seeded_random, [all_themes.knowing, all_themes.guiding]);
}
