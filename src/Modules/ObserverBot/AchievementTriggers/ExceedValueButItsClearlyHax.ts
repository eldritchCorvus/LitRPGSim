import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class ExceedValueTriggerButItsClearlyHax extends AchievementTrigger{
    valueToExceed:number;
    variableKey: string;

    constructor(invert:boolean,valueToExceed: number, variableKey: string){
        super(invert);
        this.valueToExceed  = valueToExceed;
        this.variableKey = variableKey;
    }

    toString = ()=>{
        if(this.invert){
            return `${[this.variableKey]} MUST BE LESS THAN OR EQUAL TO ${this.valueToExceed} AND YOU ARE A FILTHY CHEATER`;
        }
        return `${[this.variableKey]} MUST BE MORE THAN ${this.valueToExceed} AND YOU ARE A FILTHY CHEATER`;
    }

    triggered = (observer: ObserverBot )=>{

        const ret =  (observer as any)[this.variableKey] > this.valueToExceed;

        if(ret){
            if(!(window as any).rageMode){
                (window as any).setRageMode(true); //whoops, looks like the jig is up :) :) :)
            }
        }
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}