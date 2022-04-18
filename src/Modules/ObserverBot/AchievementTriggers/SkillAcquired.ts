import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class SkillAcquired extends AchievementTrigger{
    skillName: string;

    constructor(invert:boolean,skillName: string){
        super(invert);
        this.skillName  = skillName;
    }

    toString = ()=>{
        if(this.invert){
            return `A SKILL CALLED ${[this.skillName]} MUST NOT BE KNOWN`;
        }
        return `A SKILL CALLED ${[this.skillName]} MUST BE KNOWN`;
    }

    triggered = (observer: ObserverBot )=>{
        let ret = false;
        for(let item of observer.player.unlocked_skills()){
            if(item.name.toUpperCase().includes(this.skillName.toUpperCase())){
                ret =  true;
            }
        }
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }    }

}