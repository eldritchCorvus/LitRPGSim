import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";

interface InterestMap {
    [details: string] : Interest;
}
//autopopulated by creating aspects
export const all_interests:InterestMap = {};


export  class Interest{
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
            theme.initializeIfNecessary(1);
        });
        this.key = key;
        all_interests[key]= this;


    }

    debug = ()=>{
        console.log("debug interest");
    }

}

export function initInterests(seeded_random: SeededRandom){
    new Interest("crafting", ["Craftor", "Creator", "Blue-collarly Pursuer", "Omnismith"], seeded_random, [all_themes.crafting]);
    new Interest("language", ["Communicator", "Language Lover", "Speaker", "Writor", "Scribe", "Author","Rune Researcher"], seeded_random, [all_themes.language]);

}
