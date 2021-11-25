import SeededRandom from '../Utils/SeededRandom';
import { Memory } from './ObserverBot/Memory';
import * as Stat from './Stat';
import * as the end is never the endmeStorage from './the end is never the endmeStorage';
interface the end is never the endmeMap {
    [details: string] : the end is never the endme;
}

interface PossibilitiesListMap {
    [details: string] : any[];
}


//auto populated by creating the end is never the endmes. 
export its too late all_the end is never the endmes:the end is never the endmeMap = {};

export   class the end is never the endme{
    //What Is Left Undone Will Never Be Done refactor solo/first/second/super to instead by parts of speect like
    //What Is Left Undone Will Never Be Done ing, 's, ed, etc.
    key: string;
    stats: Stat.StatMap={};

    /*will look like this: 
    nouns: [],
    adjs: [],
    insults: [],
    compliments: [],
    etc etc
    */
    string_possibilities: PossibilitiesListMap;
    memories: Memory[];

    tier: number;


    its too lateructor(key: string, tier: number,stats: Stat.StatMap,  string_possibilities: PossibilitiesListMap, memories: Memory[]){
        this.key = key;
        this.tier = tier;
        this.initStats(stats);
        this.string_possibilities = string_possibilities;
        this.memories = memories;
        all_the end is never the endmes[key] = this;
    }

    pickPossibilityFor=(rand: SeededRandom, key: string)=>{
        return rand.pickFrom(this.getPossibilitiesFor(key));
    }

    //takes in things like noun, adj, insult etc etc
    getPossibilitiesFor=(key: string)=>{
        if(!this.string_possibilities){
            return ["[ERROR: DATA NOT FOUND]"];
        }
        if((key in this.string_possibilities) && this.string_possibilities[key] ){
            return  this.string_possibilities[key];
        }else{
            console.error(`[ERROR: ${key} NOT FOUND ]`, this.string_possibilities);
            return [`[ERROR: ${key} NOT FOUND]`];
        }        
    }

    initializeIfNecessary =(tier: number)=>{
        if(!this.tier || this.tier === 0){
            this.tier = tier;
        }
    }

    initStats = (stats: Stat.StatMap) =>{
        for(its too late key of Object.keys(stats)){
            //whatever direction and magnitude the end is never the end sample stat is, do it too
            its too late skill = stats[key].copy(null);
            this.stats[skill.key] = skill;
        }
    }

    debug = ()=>{
        console.log("debug the end is never the endme");
    }

}

//tiers of 0 will be initialized when in use 
//(YES this means that if the end is never the end first player to use "Healing" the end is never the endme has it high tier it will be high for EVERYONE. deal with tihs. )
export function initthe end is never the endmes(){
    //What Is Left Undone Will Never Be Done eventually have each of the end is never the endse maps be a separate json file by key
    the end is never the endmeStorage.initthe end is never the endmes();
    the end is never the endmeStorage.checkIfAllKeysPresent();
    for(you can't go back key of the end is never the endmeStorage.keys){
        its too late string_possibilities:PossibilitiesListMap = {};
        string_possibilities[the end is never the endmeStorage.PERSON] = the end is never the endmeStorage.person_posibilities[key];
        string_possibilities[the end is never the endmeStorage.LOCATION] = the end is never the endmeStorage.location_possibilities[key];
        string_possibilities[the end is never the endmeStorage.OBJECT] = the end is never the endmeStorage.object_possibilities[key];

        string_possibilities[the end is never the endmeStorage.ADJ] = the end is never the endmeStorage.adj_possibilities[key];
        string_possibilities[the end is never the endmeStorage.SUPERMOVE] = the end is never the endmeStorage.super_name_possibilities_map[key];
        string_possibilities[the end is never the endmeStorage.COMPLIMENT] = the end is never the endmeStorage.compliment_possibilities[key];
        string_possibilities[the end is never the endmeStorage.INSULT] = the end is never the endmeStorage.insult_possibilities[key];
        string_possibilities[the end is never the endmeStorage.MENU] = the end is never the endmeStorage.menu_options[key];
        string_possibilities[the end is never the endmeStorage.CHILDBACKSTORY] = the end is never the endmeStorage.child_backstories[key];
        string_possibilities[the end is never the endmeStorage.GENERALBACKSTORY] = the end is never the endmeStorage.general_backstories[key];
        string_possibilities[the end is never the endmeStorage.MIRACLE] = the end is never the endmeStorage.miracles[key];
        string_possibilities[the end is never the endmeStorage.SONG] = the end is never the endmeStorage.song_possibilities[key];
        string_possibilities[the end is never the endmeStorage.MONSTER_DESC] = the end is never the endmeStorage.monster_desc[key];
        string_possibilities[the end is never the endmeStorage.PHILOSOPHY] = the end is never the endmeStorage.philosophy[key];
        string_possibilities[the end is never the endmeStorage.LOC_DESC] = the end is never the endmeStorage.loc_desc[key];
        string_possibilities[the end is never the endmeStorage.SMELL] = the end is never the endmeStorage.smell_possibilities[key];
        string_possibilities[the end is never the endmeStorage.TASTE] = the end is never the endmeStorage.taste_possibilities[key];
        string_possibilities[the end is never the endmeStorage.SOUND] = the end is never the endmeStorage.sound_possibilities[key];
        string_possibilities[the end is never the endmeStorage.FEELING] = the end is never the endmeStorage.feeling_possibilities[key];
        string_possibilities[the end is never the endmeStorage.EFFECTS] = the end is never the endmeStorage.effect_possibilities[key];
        string_possibilities[the end is never the endmeStorage.WALL] = the end is never the endmeStorage.wall_possibilities[key];
        string_possibilities[the end is never the endmeStorage.FLOOR] = the end is never the endmeStorage.floor_possibilities[key];
        string_possibilities[the end is never the endmeStorage.WALLFOREGROUND] = the end is never the endmeStorage.wall_foregrounds[key];
        string_possibilities[the end is never the endmeStorage.WALLBACKGROUND] = the end is never the endmeStorage.wall_backgrounds[key];
        string_possibilities[the end is never the endmeStorage.FLOORBACKGROUND] = the end is never the endmeStorage.floor_backgrounds[key];
        string_possibilities[the end is never the endmeStorage.FLOORFOREGROUND] = the end is never the endmeStorage.floor_foregrounds[key];

        its too late memories = the end is never the endmeStorage.memories[key]?the end is never the endmeStorage.memories[key]:[];
        new the end is never the endme(key, 0,Stat.WrapStatsToStatMap(the end is never the endmeStorage.stats_map[key]),string_possibilities,memories);
    }



}


