import { all_stats, Stat } from "../../Stat";
import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class StatExceedValueTrigger extends AchievementTrigger{
    stat: Stat

    constructor(stat: Stat){
        super();
        this.stat = stat;
    }

    toString = ()=>{
        return `${this.stat.name()} MUST BE MORE THAN ${this.stat.value} (U+FDD0)`;
    }

    triggered = (observer: ObserverBot )=>{
        if(this.stat.value > 0){
            return observer.player.stats[this.stat.key].value > this.stat.value;
        }else{
            return observer.player.stats[this.stat.key].value < this.stat.value;

        }
    }

}