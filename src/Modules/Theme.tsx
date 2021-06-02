import * as Stat from './Stat';
import * as ThemeStorage from './ThemeStorage';
interface ThemeMap {
    [details: string] : Theme;
}

//auto populated by creating themes. 
export const all_themes:ThemeMap = {};

export   class Theme{
    //TODO refactor solo/first/second/super to instead by parts of speect like
    //TODO ing, 's, ed, etc.
    key: string;
    stats: Stat.StatMap={};
    solo_name_possibilities:string[];
    first_name_possibilities:string[];
    second_name_possibilities:string[];
    super_name_possibilities:string[];

    tier: number;


    constructor(key: string, tier: number,stats: Stat.StatMap, solo_name_possibilities: string[],first_name_possibilities: string[], second_name_possibilities: string[], super_name_possibilities: string[] ){
        this.key = key;
        this.tier = tier;
        this.initStats(stats);
        this.solo_name_possibilities = solo_name_possibilities;
        this.first_name_possibilities = first_name_possibilities;
        this.second_name_possibilities = second_name_possibilities;
        this.super_name_possibilities = super_name_possibilities;
        all_themes[key] = this;
    }

    initializeIfNecessary =(tier: number)=>{
        if(!this.tier || this.tier === 0){
            this.tier = tier;
        }
    }

    initStats = (stats: Stat.StatMap) =>{
        for(const key of Object.keys(stats)){
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.positiveName] = skill;
        }
    }

    debug = ()=>{
        console.log("debug theme");
    }

}



//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
export function initThemes(){
    //TODO eventually have each of these maps be a separate json file by key
    ThemeStorage.initThemes();
    ThemeStorage.checkIfAllKeysPresent();
    for(let key of ThemeStorage.keys){
        console.log("JR NOTE: key is", key, "ThemeStorage.stats_map is", ThemeStorage.stats_map)
        new Theme(key, 0,Stat.WrapStatsToStatMap(ThemeStorage.stats_map[key]),ThemeStorage.solo_name_possibilities_map[key],ThemeStorage.first_name_possibilities_map[key],ThemeStorage.second_name_possibilities_map[key],ThemeStorage.super_name_possibilities_map[key]);
    }



}


