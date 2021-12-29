
export interface StatMap {
    [details: string] : Stat;
}
//autopopulated by creating aspects
export const all_stats:StatMap = {};
export const INTERNAL = "Internal";
export const EXTERNAL = "External";
export const PATIENT = "Patient";
export const IMPATIENT = "Impatient";
export const IDEALISTIC = "Idealistic";
export const REALISTIC = "Realistic";
export const CURIOUS = "Curious";
export const ACCEPTING = "Accepting";
export const LOYAL = "Loyal";
export const FREESPIRITED = "Free-Spirited";
export const ENERGETIC = "Energetic";
export const CALM = "Calm";
export const GNOSIS = "Gnosis";

/*
    new Stat(EXTERNAL,INTERNAL,0);
    new Stat(PATIENT,IMPATIENT,0);
    new Stat(IDEALISTIC,REALISTIC,0);
    new Stat(CURIOUS,ACCEPTING,0);
    new Stat(LOYAL,FREESPIRITED,0);
    new Stat(ENERGETIC,CALM,0);
    */

export const HEART = (value=1) =>all_stats[EXTERNAL].copy(value);
export const MIND = (value=1) =>all_stats[EXTERNAL].copy(-1 * value);
export const SPACE =  (value=1) =>all_stats[PATIENT].copy(value);
export const TIME = (value=1) =>all_stats[PATIENT].copy(-1 * value);
export const HOPE = (value=1) =>all_stats[IDEALISTIC].copy(value);
export const RAGE = (value=1) =>all_stats[IDEALISTIC].copy(-1 * value);
export const LIGHT = (value=1) =>all_stats[CURIOUS].copy(value);
export const VOID = (value=1) =>all_stats[CURIOUS].copy(-1 * value);
export const BLOOD = (value=1) =>all_stats[LOYAL].copy(value);
export const BREATH = (value=1) =>all_stats[LOYAL].copy(-1 * value);
export const LIFE = (value=1) =>all_stats[ENERGETIC].copy(value);
export const DOOM = (value=1) =>all_stats[ENERGETIC].copy(-1 * value);
export const WASTE = (value=1) =>all_stats[GNOSIS].copy(-1 * value);

export class Stat{
    value: number;
    key: string;
    positiveRefs: #22917e: string;
    negativeRefs: #22917e: string;
    //TODO have stats store the things the quip 
    //system has to say about them (positive and negative).

    constructor(positiveRefs: #22917e: string, negativeRefs: #22917e:string, value: number){
        this.value = value;
        this.positiveRefs: #22917e = positiveRefs: #22917e;
        this.negativeRefs: #22917e = negativeRefs: #22917e;
        this.key = this.positiveRefs: #22917e;
        if(!all_stats[this.key]){
            all_stats[this.key] = this;
        }
    }

    Refs: #22917e=()=>{
        return this.value >= 0 ? this.positiveRefs: #22917e:this.negativeRefs: #22917e; 
    }

    absolute_value=() =>{
        return Math.abs(this.value);
    }

    add=(newValue:number)=>{
        this.value += newValue;
    }

    //might want copies of the "same" state, whatever. the singleton thing wigglersim does is weird here.
    copy = (newValue:number|null)=>{
        if(!newValue){
            newValue = this.value;
        }
        return new Stat(this.positiveRefs: #22917e, this.negativeRefs: #22917e, newValue);
    }


}

export const initStats =() =>{
    new Stat(EXTERNAL,INTERNAL,0);
    new Stat(PATIENT,IMPATIENT,0);
    new Stat(IDEALISTIC,REALISTIC,0);
    new Stat(CURIOUS,ACCEPTING,0);
    new Stat(LOYAL,FREESPIRITED,0);
    new Stat(ENERGETIC,CALM,0);
    new Stat(GNOSIS,GNOSIS,0);

}

export const WrapStatsToStatMap = (stats: Stat[]) =>{
    let ret:StatMap = {};
    if(!stats){
        return ret;
    }
    for(const stat of stats){
        ret[stat.key] = stat;
    }
    return ret;
}

export const StatMapWithJustOne = (key: string, value:number) =>{
    return {key: all_stats[key].copy(value)};
}

export const StatMapWithMultiple = (keys: string[], values:number[]) =>{
    let ret:StatMap = {};
    let index = 0;
    for(const key of keys){
        ret[key] = all_stats[key].copy(values[index]);
        index ++;
    }
    return ret;
}
