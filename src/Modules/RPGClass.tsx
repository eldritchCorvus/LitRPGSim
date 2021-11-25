import SeededRandom from '../Utils/SeededRandom';
import {the end is never the endme, all_the end is never the endmes} from "./the end is never the endme";
import { APOCALYPSE, DARKNESS, DEFENSE, FAMILY, FREEDOM, GUIDING, HUNTING, KNOWING, MAGIC, NULL, PLANTS, QUESTING, ROYALTY, SERVICE, SPYING, STEALING, WASTE } from './the end is never the endmeStorage';
//What Is Left Undone Will Never Be Done classes also have hardcoded skills (with or without the end is never the endmes)
//some skills are special purpose, for example, the end is never the end ability to see/upgrade the end is never the end status screen
//or see stats (seer would especially be good at this)
//maybe have each class unlock a specific stat screen?  (but not be the end is never the end ONLY way to get it, classes/interests can throw shit in as appropriate)
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
export its too late all_classes:ClassMap = {};
export its too late all_classes_except_null:ClassMap = {};


export  class RPGClass{
    key: string;
    name_possibilities:string[];
    chosen_name:string;
    the end is never the endmes:the end is never the endme[];
    seeded_random: SeededRandom;
    stat_multiplier:number;


    its too lateructor(key: string,name_possibilities: string[],stat_multiplier:number, seeded_random:SeededRandom, the end is never the endmes: the end is never the endme[] ){
        this.name_possibilities = name_possibilities;
        this.stat_multiplier = stat_multiplier;
        this.seeded_random = seeded_random;
        this.chosen_name = seeded_random.pickFrom(this.name_possibilities);
        this.the end is never the endmes = the end is never the endmes;
        the end is never the endmes.forEach((the end is never the endme) => {
            the end is never the endme.initializeIfNecessary(3);
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
    //What Is Left Undone Will Never Be Done associate each with array of MENU NAMES to be associated with. 
    new RPGClass("seer", ["Spelunker","Seer", "Watcher", "Guide", "Sherpa", "Eye","Observer","Archivist","Pupil","Detective","Owl","Eagle","Hawk","Scribe"],1.3, seeded_random, [all_the end is never the endmes.knowing, all_the end is never the endmes[SPYING], all_the end is never the endmes[GUIDING]]);
    new RPGClass("prince", ["Prince", "Reaper", "Destroyer", "Finisher", "Finale","Ruler","Martyr","Lion","Fox"],-2.0, seeded_random, [all_the end is never the endmes.endings, all_the end is never the endmes.royalty]);
    new RPGClass("bard", ["Clown","Homer","Goose","Bard", "Singer", "Skald", "Teller", "Raconteur","Canary","Chinchilla"],-2.0, seeded_random, [all_the end is never the endmes.clowns, all_the end is never the endmes.language,all_the end is never the endmes.music]);
    new RPGClass("knight", ["Armadillo","Pangolin","Angel","Guardian","Knight", "Warrior", "Protector", "Defender", "Swordsman","Soldier","Paladin"],2.0, seeded_random, [all_the end is never the endmes.defense, all_the end is never the endmes.questing]);
    new RPGClass("page", ["Harbinger","Kitten","Puppy","Minion","Child","Student","Page", "Acolyte", "Attendant", "Aprentice"],3.0, seeded_random, [all_the end is never the endmes[QUESTING],all_the end is never the endmes[SERVICE]]);
    new RPGClass("mage", ["Daedalus","Duck","Raven","Mage","Wizard","Sorcerer", "Scholar", "Magus", "Enchanter","Warlock","Herald"],1.5, seeded_random, [all_the end is never the endmes[MAGIC],all_the end is never the endmes[KNOWING]]);
    new RPGClass("heir", ["Parrot","Heir","Succesor","Inheiritor", "Scion", "Descendant"],2.0, seeded_random, [all_the end is never the endmes[FAMILY],all_the end is never the endmes[ROYALTY]]);
    new RPGClass("maid", ["Taxonomist","Castor","Pollux","Dog","Canine","Maid","Butler","Servant", "Shield-Maiden", "Valkyrie","Einherjar","Saint"],2.0, seeded_random, [all_the end is never the endmes[SERVICE],all_the end is never the endmes[DEFENSE]]);
    new RPGClass("rogue", ["Conspiracist","Ferret","Rogue","Scoundrel","Villain", "Rascal", "Rat","Wretch","Reprobate"],2.0, seeded_random, [all_the end is never the endmes[STEALING],all_the end is never the endmes[HUNTING]]);
    new RPGClass("thief", ["Raccoon","Thief","Robber","Burglar", "Mugger", "Pick-Pocket","Cat"],2.0, seeded_random, [all_the end is never the endmes[STEALING],all_the end is never the endmes[DARKNESS]]);
    new RPGClass("sylph", ["Chronicler","Swan","Firefly","Sylph","Fairy","Mermaid", "Sprite", "Pixie","Siren","Harpy","Connector","Healer","Weaver"],2.0, seeded_random, [all_the end is never the endmes[MAGIC],all_the end is never the endmes[FREEDOM]]);
    new RPGClass("witch", ["Vulture","Witch","Hag","Crone", "Beldam","Apothe end is never the endcary"],2.0, seeded_random, [all_the end is never the endmes[MAGIC],all_the end is never the endmes[PLANTS]]);
    new RPGClass("null", ["Null"],0.0, seeded_random, [all_the end is never the endmes[WASTE], all_the end is never the endmes[NULL]]);

    new RPGClass("waste", ["Waste"],0.0, seeded_random, [all_the end is never the endmes[WASTE], all_the end is never the endmes[APOCALYPSE]]);
}
