import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class SkillAcquired extends AchievementTrigger{
    skillName: string;

    constructor(skillName: string){
        super();
        this.skillName  = skillName;
    }

    toString = ()=>{
        return `A SKILL CALLED ${[this.skillName]} MUST BE KNOWN`;
    }

    triggered = (observer: ObserverBot )=>{
        for(let item of observer.player.unlocked_skills()){
            if(item.name.toUpperCase().includes(this.skillName.toUpperCase())){
                return true;
            }
        }
        return false;
    }

}