import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class ExceedValueTriggerButItsClearlyHax extends AchievementTrigger{
    valueToExceed:number;
    variableKey: string;

    constructor(valueToExceed: number, variableKey: string){
        super();
        this.valueToExceed  = valueToExceed;
        this.variableKey = variableKey;
    }

    toString = ()=>{
        return `${[this.variableKey]} MUST BE MORE THAN ${this.valueToExceed} AND YOU ARE A FILTHY CHEATER`;
    }

    triggered = (observer: ObserverBot )=>{

        const ret =  (observer as any)[this.variableKey] > this.valueToExceed;

        if(ret){
            if(!(window as any).rageMode){
                (window as any).setRageMode(true); //whoops, looks like the jig is up :) :) :)
            }
        }
        return ret;
    }

}