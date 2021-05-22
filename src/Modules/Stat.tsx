const maxNumber = 113;

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

export const HEART = INTERNAL;
export const MIND = INTERNAL;
export const SPACE = PATIENT;
export const TIME = PATIENT;
export const HOPE = IDEALISTIC;
export const RAGE = IDEALISTIC;
export const LIGHT = CURIOUS;
export const VOID = CURIOUS;
export const BLOOD = LOYAL;
export const BREATH = LOYAL;
export const LIFE = ENERGETIC;
export const DOOM = ENERGETIC;
export class Stat{
    value: number;
    positiveName: string;
    negativeName: string;
    //TODO have stats store the things the quip 
    //system has to say about them (positive and negative).

    constructor(positiveName: string, negativeName:string, value: number){
        this.value = value;
        this.positiveName = positiveName;
        this.negativeName = negativeName;
        if(!all_stats[positiveName]){
            all_stats[positiveName] = this;
        }
    }

    name=()=>{
        return this.value >= 0 ? this.positiveName:this.negativeName; 
    }

    absolute_value=() =>{
        return Math.abs(this.value);
    }

    add=(newValue:number)=>{
        console.log("JR NOTE: adding", newValue, "to ", this.value)
        this.value += newValue;
    }

    //might want copies of the "same" state, whatever. the singleton thing wigglersim does is weird here.
    copy = (newValue:number|null)=>{
        if(!newValue){
            newValue = this.value;
        }
        return new Stat(this.positiveName, this.negativeName, newValue);
    }


}

export const initStats =() =>{
    new Stat(EXTERNAL,INTERNAL,0);
    new Stat(PATIENT,IMPATIENT,0);
    new Stat(IDEALISTIC,REALISTIC,0);
    new Stat(CURIOUS,ACCEPTING,0);
    new Stat(LOYAL,FREESPIRITED,0);
    new Stat(ENERGETIC,CALM,0);

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
