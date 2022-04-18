import { Player } from "../../Player";
import { CustomSkill } from "../../Skill";
import { Reward } from "./GenericReward";

export  class SkillReward extends Reward{
    skill: CustomSkill;
    toString = ()=>{
        return `${this.skill.name} learned!`;
    }

    constructor(skill: CustomSkill){
        super();
        this.skill = skill;
    }

    giveReward = (player: Player )=>{
        this.skill.unlocked = true;
        player.skills.push(this.skill);
        return this.toString();
    }
 }