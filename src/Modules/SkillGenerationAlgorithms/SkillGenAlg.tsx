import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { RPGClass } from "../RPGClass"
import { CoreSkill, Skill } from "../Skill"
import { Theme } from "../Theme"

export   class SkillGenAlg{

    
    generate_skill_x_times = (x: number, themes: Theme[], rand:SeededRandom) =>{
        const ret:Skill[] = [];
        for(let i = 0; i<x; i++){
            ret.push(new Skill(themes, rand));
        }
        return ret;
    }

    only_leave_unique_names = (skills: Skill[]) => {
        let ret:Skill[] = [];
        let ret_names:string[] = [];
        for(const skill of skills){
            if(ret_names.indexOf(skill.name) === -1){
                ret.push(skill);
                ret_names.push(skill.name);
            }
 
        }
        return ret;
    }


    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        console.error("JR NOTE: don't call this directly dunkass, call things that extend it.")
    }

    generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], themes:Theme[], rand: SeededRandom)=>{
        console.error("JR NOTE: don't call this directly dunkass, call things that extend it.")
        return  [new CoreSkill("Status", 0, rand)];
    }

}