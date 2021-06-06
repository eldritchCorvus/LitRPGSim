import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class NumberClicksTrigger extends AchievementTrigger{
    valueToExceed:number;

    constructor(valueToExceed: number){
        super();
        this.valueToExceed  = valueToExceed;
    }

    triggered = (observer: ObserverBot )=>{
        return observer.numClicks > this.valueToExceed;
    }

}