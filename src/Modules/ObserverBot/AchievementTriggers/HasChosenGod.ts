import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class HasChosenGod extends AchievementTrigger{


    constructor(invert:boolean,){
        super(invert);
    }

    toString = ()=>{
        if(this.invert){
            return `A GOD MUST BE NOT YET BE CHOSEN`;
        }
        return `A GOD MUST BE CHOSEN`;
    }

    triggered = (observer: ObserverBot )=>{
        const ret =  !!observer.player.chosen_god;
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}