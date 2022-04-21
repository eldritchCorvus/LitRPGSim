import { Player } from "../../Player";
import { all_stats, Stat } from "../../Stat";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class StatReward extends Reward{
    stat: Stat;
    toString = ()=>{
        return `${this.stat.name()} + ${this.stat.absolute_value()} reward!`;
    }

    constructor(stat: Stat){
        super();
        this.stat = stat;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        player.addStat(this.stat);
        return this.toString();
    }
 }