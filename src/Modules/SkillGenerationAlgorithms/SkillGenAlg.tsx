import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { RPGClass } from "../RPGClass"
import { CoreSkill, Skill } from "../Skill"

export   class SkillGenAlg{
    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        console.error("JR NOTE: don't call this directly dunkass, call things that extend it.")
    }

    generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom)=>{
        console.error("JR NOTE: don't call this directly dunkass, call things that extend it.")
        return  [new CoreSkill("Status", 0, rand)];
    }

}