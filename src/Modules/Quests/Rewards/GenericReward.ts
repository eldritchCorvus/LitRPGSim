import { Player } from "../../Player";
import { QuestObject } from "../QuestObject";

export  class Reward{
    toString = ()=>{
        return "10 Skill Points";
    }

    giveReward = (player: Player, quest:QuestObject)=>{
        player.addSkillPoints(10);
        return ("You got an additional 10 SKILL POINTS!")
    }
 }