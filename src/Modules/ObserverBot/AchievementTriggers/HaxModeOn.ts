import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class HaxModeOn extends AchievementTrigger{


    constructor(){
        super();
    }

    triggered = (observer: ObserverBot )=>{
        return (window as any).haxMode;
    }

}