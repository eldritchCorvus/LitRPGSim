import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
import { APOCALYPSE, DARKNESS, DEFENSE, FAMILY, FREEDOM, GUIDING, HUNTING, KNOWING, MAGIC, NULL, PLANTS, QUESTING, ROYALTY, SERVICE, SPYING, STEALING, WASTE } from './ThemeStorage';
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
export const all_classes_except_null:ClassMap = {};


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
        if(key !== NULL){
            all_classes_except_null[key]= this;
        }


    }

    debug = ()=>{
        console.log("debug class");
    }

}

export function initClasses(seeded_random: SeededRandom){
    //TODO associate each with array of MENU NAMES to be associated with. 
    new RPGClass("seer", ["Spelunker","Seer", "Watcher", "Guide", "Sherpa", "Eye","Observer","Archivist","Pupil","Detective","Owl","Eagle","Hawk","Scribe"],1.3, seeded_random, [all_themes.knowing, all_themes[SPYING], all_themes[GUIDING]]);
    new RPGClass("prince", ["Prince", "Reaper", "Destroyer", "Finisher", "Finale","Ruler","Martyr","Lion","Fox"],-2.0, seeded_random, [all_themes.endings, all_themes.royalty]);
    new RPGClass("bard", ["Homer","Goose","Bard", "Singer", "Skald", "Teller", "Raconteur","Canary","Chinchilla"],-2.0, seeded_random, [all_themes.clowns, all_themes.language,all_themes.music]);
    new RPGClass("knight", ["Armadillo","Pangolin","Angel","Guardian","Knight", "Warrior", "Protector", "Defender", "Swordsman","Soldier","Paladin"],2.0, seeded_random, [all_themes.defense, all_themes.questing]);
    new RPGClass("page", ["Harbinger","Kitten","Puppy","Minion","Child","Student","Page", "Acolyte", "Attendant", "Aprentice"],3.0, seeded_random, [all_themes[QUESTING],all_themes[SERVICE]]);
    new RPGClass("mage", ["Daedalus","Duck","Raven","Mage","Wizard","Sorcerer", "Scholar", "Magus", "Enchanter","Warlock","Herald"],1.5, seeded_random, [all_themes[MAGIC],all_themes[KNOWING]]);
    new RPGClass("heir", ["Pot","Parrot","Heir","Succesor","Inheiritor", "Scion", "Descendant"],2.0, seeded_random, [all_themes[FAMILY],all_themes[ROYALTY]]);
    new RPGClass("maid", ["Taxonomist","Castor","Pollux","Dog","Canine","Maid","Butler","Servant", "Shield-Maiden", "Valkyrie","Einherjar","Saint"],2.0, seeded_random, [all_themes[SERVICE],all_themes[DEFENSE]]);
    new RPGClass("rogue", ["Ferret","Rogue","Scoundrel","Villain", "Rascal", "Rat","Wretch","Reprobate"],2.0, seeded_random, [all_themes[STEALING],all_themes[HUNTING]]);
    new RPGClass("thief", ["Raccoon","Thief","Robber","Burglar", "Mugger", "Pick-Pocket","Cat"],2.0, seeded_random, [all_themes[STEALING],all_themes[DARKNESS]]);
    new RPGClass("sylph", ["Chronicler","Swan","Firefly","Sylph","Fairy","Mermaid", "Sprite", "Pixie","Siren","Harpy","Connector","Healer","Weaver"],2.0, seeded_random, [all_themes[MAGIC],all_themes[FREEDOM]]);
    new RPGClass("witch", ["Vulture","Witch","Hag","Crone", "Beldam","Apothecary"],2.0, seeded_random, [all_themes[MAGIC],all_themes[PLANTS]]);
    new RPGClass("null", ["Null"],0.0, seeded_random, [all_themes[WASTE], all_themes[NULL]]);

    new RPGClass("waste", ["Waste","Catalyst"],0.0, seeded_random, [all_themes[WASTE], all_themes[APOCALYPSE]]);
}
