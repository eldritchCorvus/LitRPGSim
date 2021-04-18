import {all_aspects, initAspects, Aspect} from "./Aspect";
import { all_classes, initClasses, RPGClass } from "./RPGClass";
import { Skill, CoreSkill } from "./Skill";
import {Interest} from "./Interest";
import {initThemes, Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[];
    skills: Skill[];
    rand: SeededRandom;



    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom){
        console.log("JR NOTE: trying to make a playe rof class", class_name, "and aspect", aspect, "and interests", interests)
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        const themes:Theme[] = [];
        themes.concat(class_name.themes)
        themes.concat(aspect.themes);
        this.theme_keys = themes.map((x)=> x.key);
        this.interests.forEach((interest) => themes.concat(interest.themes));
        this.skills = generateSkills(class_name, aspect, interests,rand);
        this.rand = rand;

    }

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};
}

export const generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom)=>{
   let ret:Skill[] = [new CoreSkill("Status", 0, rand)];

   const generate_skill_x_times = (x: number, themes: Theme[], rand:SeededRandom) =>{
       const ret:Skill[] = [];
       for(let i = 0; i<x; i++){
           console.log("generating skill ", i,x);
           ret.push(new Skill(themes, rand));
       }
       console.log("going to return ", ret)
       return ret;
   }

   for(const class_theme of class_name.themes ){
        ret = ret.concat(generate_skill_x_times(3,[class_theme], rand));
       for(const aspect_theme of aspect.themes ){
        ret = ret.concat(generate_skill_x_times(3,[aspect_theme], rand));
        ret = ret.concat(generate_skill_x_times(3,[aspect_theme, class_theme], rand));
       }
   }

   for(const interest of interests){
       for(const interest_theme of interest.themes){
        ret = ret.concat(generate_skill_x_times(1,[interest_theme], rand));
        for(const aspect_theme of aspect.themes ){
            ret = ret.concat(generate_skill_x_times(3,[aspect_theme, interest_theme], rand));
        }

        for(const class_theme of class_name.themes ){
           ret =  ret.concat(generate_skill_x_times(3,[class_theme, interest_theme], rand));
        }
       }
   }
   console.log("generate skill is about to return", ret)
   return ret;
}