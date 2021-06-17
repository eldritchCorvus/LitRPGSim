import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class HaxModeOn extends AchievementTrigger{
    valueToExceedOrMeet:number;


    constructor(valueToExceedOrMeet: number){
        super();
        this.valueToExceedOrMeet = valueToExceedOrMeet;
    }

    triggered = (observer: ObserverBot )=>{
        return (window as any).haxMode && observer.failedHaxAttempts >=this.valueToExceedOrMeet;
    }

}