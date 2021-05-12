import {all_aspects, initAspects, Aspect} from "./Aspect";
import { all_classes, initClasses, RPGClass } from "./RPGClass";
import { Skill, CoreSkill } from "./Skill";
import {Interest} from "./Interest";
import {initThemes, Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[];
    skills: Skill[];
    rand: SeededRandom;
    rootSkill: Skill;
    skillGenAlg: SkillGenAlg;



    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom){
        console.log("JR NOTE: trying to make a playe rof class", class_name, "and aspect", aspect, "and interests", interests)
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        this.skillGenAlg = new BonesFirstAlg();
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        this.theme_keys = themes.map((x)=> x.key);
        this.skills = this.skillGenAlg.generateSkills(class_name, aspect, interests,themes,rand);
        this.rootSkill = this.skills[0];
        this.rootSkill.unlocked = true;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        console.log("After everything, skills looks like this", this.skills);
        this.rand = rand;
        //JR NOTE: FOR TESTING
        this.unlockSkill("Goal Path");

    }

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};

    unlockSkill = (skill_id: string) =>{
        const found = this.skills.find((skill) =>{return skill.name===skill_id});
        if(found){
            console.log("JR NOTE: found was unlocked originally", found.unlocked, "and now setting it to true");
            found.unlocked = true;
        }
    }
}

