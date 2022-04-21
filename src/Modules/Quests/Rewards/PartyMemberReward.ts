import { Companion, Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class CompanionReward extends Reward{
    companion: Companion;

    toString = ()=>{
        return `${this.companion.fullName} joins the party!`;
    }

    constructor(companion: Companion){
        super();
        this.companion = companion;
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        let ret = this.toString();
        player.companions.push(this.companion);
        return ret;
    }
 }