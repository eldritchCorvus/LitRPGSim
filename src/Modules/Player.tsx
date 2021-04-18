import {all_aspects, initAspects, Aspect} from "./Aspect";
import { all_classes, initClasses, RPGClass } from "./RPGClass";
import { Skill } from "./Skill";
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
        console.log("JR NOTE: trying to make a playe rof class", class_name, "and aspect", aspect)
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        const themes:Theme[] = [];
        themes.concat(class_name.themes)
        themes.concat(aspect.themes);
        this.theme_keys = themes.map((x)=> x.key);
        this.interests.forEach((interest) => themes.concat(interest.themes));
        this.skills = generateSkills(class_name, aspect, rand);
        this.rand = rand;

    }
}

export const generateSkills = (class_name: RPGClass, aspect: Aspect, rand: SeededRandom)=>{
   let ret = [];
   for(const class_theme of class_name.themes ){
       ret.push(new Skill([class_theme], rand));
       for(const aspect_theme of aspect.themes ){
        ret.push(new Skill([aspect_theme], rand));
        ret.push(new Skill([aspect_theme, class_theme], rand));
       }
   }
   return ret;
}