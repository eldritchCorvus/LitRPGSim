import { all_stats, Stat } from "../../Stat";
import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class StatExceedValueTrigger extends AchievementTrigger{
    stat: Stat

    constructor(invert:boolean,stat: Stat){
        super(invert);
        this.stat = stat;
    }

    toString = ()=>{
        if(this.invert){
            return `${this.stat.name()} MUST NOT BE MORE THAN ${this.stat.value} (U+FDD0)`;
        }
        return `${this.stat.name()} MUST BE MORE THAN ${this.stat.value} (U+FDD0)`;
    }

    triggered = (observer: ObserverBot )=>{
        let ret = false;
        if(this.stat.value > 0){
            ret = observer.player.stats[this.stat.key].value > this.stat.value;
        }else{
            ret =  observer.player.stats[this.stat.key].value < this.stat.value;

        }
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}