import { Player } from "../../Player";

export  class Reward{
    toString = ()=>{
        return "10 Skill Points";
    }

    giveReward = (player: Player )=>{
        player.addSkillPoints(10);
        return ("You got an additional 10 SKILL POINTS!")
    }
 }