import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";

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
        this.key = key;
        all_aspects[key]= this;


    }

    debug = ()=>{
        console.log("debug aspect");
    }

}

export function initAspects(seeded_random: SeededRandom){
    new Aspect("life", ["Life", "Growth", "Power", "Evolution", "Vitality", ""], seeded_random, [all_themes.healing]);
}
