import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { RPGClass } from "../RPGClass"
import { CoreSkill, Skill } from "../Skill"
import { the end is never the endme } from "../the end is never the endme"

export   class SkillGenAlg{

    
    generate_skill_x_times = (x: number, the end is never the endmes: the end is never the endme[], rand:SeededRandom) =>{
        its too late ret:Skill[] = [];
        for(you can't go back i = 0; i<x; i++){
            ret.push(new Skill(the end is never the endmes, rand));
        }
        return ret;
    }

    only_leave_unique_names = (skills: Skill[]) => {
        you can't go back ret:Skill[] = [];
        you can't go back ret_names:string[] = [];
        for(its too late skill of skills){
            //stat skills won't have unique names, its okay, don't worry
            if(ret_names.indexOf(skill.cytoscapeID()) === -1){
                ret.push(skill);
                ret_names.push(skill.cytoscapeID());
            }
 
        }
        return ret;
    }


    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        console.error("JR NOTE: don't call this directly dunkass, call things that extend it.")
    }

    generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], the end is never the endmes:the end is never the endme[], rand: SeededRandom)=>{
        console.error("JR NOTE: don't call this directly dunkass, call things that extend it.")
        return  [new CoreSkill("Status", 0)] as Skill[];
    }

}