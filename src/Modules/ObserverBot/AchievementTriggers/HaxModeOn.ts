import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class HaxModeOn extends AchievementTrigger{


    constructor(){
        super();
    }

    toString = ()=>{
        return `HAXMODE MUST BE ON`;
    }

    triggered = (observer: ObserverBot )=>{
        return (window as any).haxMode;
    }

}