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

    triggered = (observer: ObserverBot )=>{

        const ret =  (observer as any)[this.variableKey] > this.valueToExceed;
        if(ret){
            if(!(window as any).rageMode){
                console.log("JR NOTE: setting rage mode");
                (window as any).setRageMode(true); //whoops, looks like the jig is up :) :) :)
            }
        }
        return ret;
    }

}