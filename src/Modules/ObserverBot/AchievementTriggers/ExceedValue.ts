import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class ExceedValueTrigger extends AchievementTrigger{
    valueToExceed:number;
    variableKey: string;

    constructor(valueToExceed: number, variableKey: string){
        super();
        this.valueToExceed  = valueToExceed;
        this.variableKey = variableKey;
    }

    triggered = (observer: ObserverBot )=>{
        return (observer as any)[this.variableKey] > this.valueToExceed;
    }

}