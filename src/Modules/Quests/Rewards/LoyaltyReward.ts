import { Companion, Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class LoyaltyReward extends Reward{

    toString = ()=>{
        return `UNKNOWN companion gains loyalty +1!`;
    }


    giveReward = (player: Player, quest:QuestObject)=>{
        let ret = this.toString();
        const companion = quest.companion;
        if(companion){
            companion.loyalty ++;
            return `${companion.fullName} gains +1 Loyalty!`;

        }
        return "[ERROR: COMPANION NOT FOUND] gains +1 Loyalty!";
    }
 }