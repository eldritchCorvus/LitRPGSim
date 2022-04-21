import {Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class EndReward extends Reward{

    toString = ()=>{
        return `THE END`;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        (window as any).setCreditsMode(true);
        return "THE END";

    }
 }