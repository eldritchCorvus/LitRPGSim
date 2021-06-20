import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
import { DEFENSE, FAMILY, KNOWING, MAGIC, QUESTING, ROYALTY, SERVICE, WASTE } from './ThemeStorage';
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
    stat_multiplier:number;


    constructor(key: string,name_possibilities: string[],stat_multiplier:number, seeded_random:SeededRandom, themes: Theme[] ){
        this.name_possibilities = name_possibilities;
        this.stat_multiplier = stat_multiplier;
        this.seeded_random = seeded_random;
        this.chosen_name = seeded_random.pickFrom(this.name_possibilities);
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
    new RPGClass("seer", ["Seer", "Watcher", "Guide", "Sherpa", "Eye","Observer"],1.3, seeded_random, [all_themes.knowing, all_themes.guiding]);
    new RPGClass("prince", ["Prince", "Reaper", "Destroyer", "Finisher", "Finale"],-2.0, seeded_random, [all_themes.endings, all_themes.royalty]);
    new RPGClass("bard", ["Bard", "Singer", "Skald", "Teller", "Raconteur"],-2.0, seeded_random, [all_themes.clowns, all_themes.language,all_themes.music]);
    new RPGClass("knight", ["Angel","Guardian","Knight", "Warrior", "Protector", "Defender", "Swordsman","Soldier","Paladin"],2.0, seeded_random, [all_themes.defense, all_themes.questing]);
    new RPGClass("page", ["Minion","Child","Student","Page", "Acolyte", "Attendant", "Aprentice"],3.0, seeded_random, [all_themes[QUESTING],all_themes[SERVICE]]);
    new RPGClass("mage", ["Mage","Wizard","Sorcerer", "Scholar", "Magus", "Enchanter","Warlock"],1.5, seeded_random, [all_themes[MAGIC],all_themes[KNOWING]]);
    new RPGClass("heir", ["Heir","Succesor","Inheiritor", "Scion", "Descendant"],2.0, seeded_random, [all_themes[FAMILY],all_themes[ROYALTY]]);
    new RPGClass("maid", ["Maid","Butler","Servant", "Shield-Maiden", "Valkyrie","Einherjar","Saint"],2.0, seeded_random, [all_themes[SERVICE],all_themes[DEFENSE]]);
    new RPGClass("waste", ["Waste"],0.0, seeded_random, [all_themes[WASTE]]);

}
