import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
import * as Stat from './Stat';

interface InterestMap {
    [details: string] : Interest;
}
//autopopulated by creating aspects
export const all_interests:InterestMap = {};


export  class Interest{
    key: string;
    name_possibilities:string[];
    chosen_name:string;
    stats: Stat.StatMap={};
    themes:Theme[];
    seeded_random: SeededRandom;


    constructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, stats: Stat.StatMap, themes: Theme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.initStats(stats);
        this.chosen_name = seeded_random.getRandomElementFromArray(this.name_possibilities);
        this.themes = themes;
        themes.forEach((theme) => {
            theme.initializeIfNecessary(1);
        });
        this.key = key;
        all_interests[key]= this;


    }

    
    initStats = (stats: Stat.StatMap) =>{
        for(const key of Object.keys(stats)){
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.positiveName] = skill;
        }
    }

    debug = ()=>{
        console.log("debug interest");
    }

}

export function initInterests(seeded_random: SeededRandom){
    new Interest("crafting", ["Craftor", "Creator", "Blue-collarly Pursuer", "Omnismith"], seeded_random,Stat.WrapStatsToStatMap([Stat.SPACE(1), Stat.HOPE(1)]), [all_themes.crafting]);
    new Interest("language", ["Communicator", "Language Lover", "Speaker", "Writor", "Scribe", "Author","Rune Researcher"], seeded_random, Stat.WrapStatsToStatMap([Stat.SPACE(1), Stat.LIFE(1)]),[all_themes.language]);

}
