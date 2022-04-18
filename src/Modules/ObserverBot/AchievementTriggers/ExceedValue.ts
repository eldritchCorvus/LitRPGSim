import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class ExceedValueTrigger extends AchievementTrigger{
    valueToExceed:number;
    variableKey: string;

    constructor(invert:boolean,valueToExceed: number, variableKey: string){
        super(invert);
        this.valueToExceed  = valueToExceed;
        this.variableKey = variableKey;
    }

    toString = ()=>{
        if(this.invert){
            return `${[this.variableKey]} MUST BE LESS THAN OR EQUAL TO ${this.valueToExceed}`;
        }
        return `${[this.variableKey]} MUST BE MORE THAN ${this.valueToExceed}`;
    }

    triggered = (observer: ObserverBot )=>{
        const ret =  (observer as any)[this.variableKey] > this.valueToExceed;
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}