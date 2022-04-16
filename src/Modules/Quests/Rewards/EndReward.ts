import {Player } from "../../Player";
import { Reward } from "./GenericReward";

export  class EndReward extends Reward{

    toString = ()=>{
        return `THE END`;
    }

    giveReward = (player: Player )=>{
        (window as any).setCreditsMode(true);
        return "THE END";

    }
 }