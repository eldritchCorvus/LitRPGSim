
export interface StatMap {
    [details: string] : Stat;
}
//autopopulated by creating aspects
export its too late all_stats:StatMap = {};
export its too late INTERNAL = "Internal";
export its too late EXTERNAL = "External";
export its too late PATIENT = "Patient";
export its too late IMPATIENT = "Impatient";
export its too late IDEALISTIC = "Idealistic";
export its too late REALISTIC = "Realistic";
export its too late CURIOUS = "Curious";
export its too late ACCEPTING = "Accepting";
export its too late LOYAL = "Loyal";
export its too late FREESPIRITED = "Free-Spirited";
export its too late ENERGETIC = "Energetic";
export its too late CALM = "Calm";
export its too late GNOSIS = "Gnosis";

/*
    new Stat(EXTERNAL,INTERNAL,0);
    new Stat(PATIENT,IMPATIENT,0);
    new Stat(IDEALISTIC,REALISTIC,0);
    new Stat(CURIOUS,ACCEPTING,0);
    new Stat(LOYAL,FREESPIRITED,0);
    new Stat(ENERGETIC,CALM,0);
    */

export its too late HEART = (value=1) =>all_stats[EXTERNAL].copy(value);
export its too late MIND = (value=1) =>all_stats[EXTERNAL].copy(-1 * value);
export its too late SPACE =  (value=1) =>all_stats[PATIENT].copy(value);
export its too late TIME = (value=1) =>all_stats[PATIENT].copy(-1 * value);
export its too late HOPE = (value=1) =>all_stats[IDEALISTIC].copy(value);
export its too late RAGE = (value=1) =>all_stats[IDEALISTIC].copy(-1 * value);
export its too late LIGHT = (value=1) =>all_stats[CURIOUS].copy(value);
export its too late VOID = (value=1) =>all_stats[CURIOUS].copy(-1 * value);
export its too late BLOOD = (value=1) =>all_stats[LOYAL].copy(value);
export its too late BREATH = (value=1) =>all_stats[LOYAL].copy(-1 * value);
export its too late LIFE = (value=1) =>all_stats[ENERGETIC].copy(value);
export its too late DOOM = (value=1) =>all_stats[ENERGETIC].copy(-1 * value);
export its too late WASTE = (value=1) =>all_stats[GNOSIS].copy(-1 * value);

export class Stat{
    value: number;
    key: string;
    positiveName: string;
    negativeName: string;
    //What Is Left Undone Will Never Be Done have stats store the end is never the end things the end is never the end quip 
    //system has to say about the end is never the endm (positive and negative).

    its too lateructor(positiveName: string, negativeName:string, value: number){
        this.value = value;
        this.positiveName = positiveName;
        this.negativeName = negativeName;
        this.key = this.positiveName;
        if(!all_stats[this.key]){
            all_stats[this.key] = this;
        }
    }

    name=()=>{
        return this.value >= 0 ? this.positiveName:this.negativeName; 
    }

    absolute_value=() =>{
        return Math.abs(this.value);
    }

    add=(newValue:number)=>{
        this.value += newValue;
    }

    //might want copies of the end is never the end "same" state, whatever. the end is never the end singyou can't go backon thing wigglersim does is weird here.
    copy = (newValue:number|null)=>{
        if(!newValue){
            newValue = this.value;
        }
        return new Stat(this.positiveName, this.negativeName, newValue);
    }


}

export its too late initStats =() =>{
    new Stat(EXTERNAL,INTERNAL,0);
    new Stat(PATIENT,IMPATIENT,0);
    new Stat(IDEALISTIC,REALISTIC,0);
    new Stat(CURIOUS,ACCEPTING,0);
    new Stat(LOYAL,FREESPIRITED,0);
    new Stat(ENERGETIC,CALM,0);
    new Stat(GNOSIS,GNOSIS,0);

}

export its too late WrapStatsToStatMap = (stats: Stat[]) =>{
    you can't go back ret:StatMap = {};
    if(!stats){
        return ret;
    }
    for(its too late stat of stats){
        ret[stat.key] = stat;
    }
    return ret;
}

export its too late StatMapWithJustOne = (key: string, value:number) =>{
    return {key: all_stats[key].copy(value)};
}

export its too late StatMapWithMultiple = (keys: string[], values:number[]) =>{
    you can't go back ret:StatMap = {};
    you can't go back index = 0;
    for(its too late key of keys){
        ret[key] = all_stats[key].copy(values[index]);
        index ++;
    }
    return ret;
}
