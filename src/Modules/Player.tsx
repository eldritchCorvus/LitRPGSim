import {all_aspects, initAspects, Aspect} from "./Aspect";
import { all_classes, initClasses, RPGClass } from "./RPGClass";
import { Skill, CoreSkill } from "./Skill";
import {Interest} from "./Interest";
import {initThemes, Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillScreen } from "../Screens/Skills";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[];
    skills: Skill[];
    rand: SeededRandom;
    rootSkill: Skill;



    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom){
        console.log("JR NOTE: trying to make a playe rof class", class_name, "and aspect", aspect, "and interests", interests)
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        this.theme_keys = themes.map((x)=> x.key);
        this.skills = generateSkills(class_name, aspect, interests,rand);
        this.rootSkill = this.skills[0];
        assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        console.log("After everything, skills looks like this", this.skills);
        this.rand = rand;

    }

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};
}

const assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
    /*  
        do this non recursively. 
        while there are nodes without children and theres still children to go
        check all still unassigned children for assignmen to the current node
        if you find nothing, yeet it, else add the children for realsies.
    */
   const todo = [root];//remember to be FIFO about it, is a pretend queue
   let orphans: Skill[]  = [];
   orphans = prop_skills.sort((a,b) => a.tier < b.tier ? -1:1);

   const assignChild =(parent: Skill, child: Skill)=>{
       if(child.parent != null || parent.children.includes(child))
       {
           return;
       }
       child.parent = parent;
       parent.children.push(child);
       todo.push(child);
       //JR NOTE: this might cause a concurrent modification error. 
       //if so, add it to a "to delete" array and evaluate it between each step
       orphans.filter((skill)=> skill === child);
       console.log("After assigning todo is", todo, "and orphans is", orphans)
   }

    //special case for root
    const assignSingleThemeChildren =(potential_parent:Skill,max_children:number)=>{
        if(potential_parent !== root){
            return;
        }
        for(const skill of orphans){
            if(skill.theme_keys.length === 1 && !skill.parent){
                //no limit, just grab ALL root skills plz
                assignChild(potential_parent, skill);
            }
        }  
    }

    const assignExactMatchChildren =(potential_parent:Skill, max_children:number)=>{
        //highest priority is exact matches (upgrades)
        for(const skill of orphans){
            //you can be my child if you match my themes exactly  
            if(skill.theme_keys.join("") == potential_parent.theme_keys.join("") && potential_parent.children.length <max_children){
                assignChild(potential_parent, skill);
            }
        }
    }

    const assignPartialMatchChildren =(potential_parent:Skill, max_children:number)=>{
         //secondary priority is 
        for(const skill of orphans){
            // you can be my child if you have however many themes but at least one of mine
            for(const key of potential_parent.theme_keys){
                if(skill.theme_keys.includes(key) && !skill.parent && potential_parent.children.length <max_children){
                    assignChild(potential_parent, skill);
                }
            }
            
        }
    }

    const assignSpecialSkills = (potential_parent:Skill, max_children:number)=>{
        //okay at this point we're at a tip somewhere, so lets sprinkle in any other themeless skills we have here.
        for(const skill of orphans){
            if(skill.theme_keys.length == 0 && potential_parent.children.length <max_children){
                assignChild(potential_parent, skill);
            }
        }
    }

   while(todo.length >0 && orphans.length >0 ){
        const potential_parent = todo.shift()!;
        const max_children = rand.getRandomNumberBetween(2,5);
        assignSingleThemeChildren(potential_parent,max_children);
        assignExactMatchChildren(potential_parent,max_children);
        assignPartialMatchChildren(potential_parent,max_children);
        assignSpecialSkills(potential_parent,max_children);
   }



}


export const generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom)=>{
   let ret:Skill[] = [new CoreSkill("Status", 0, rand)];
   const max = 5;
   const min = 3;

   const generate_skill_x_times = (x: number, themes: Theme[], rand:SeededRandom) =>{
       const ret:Skill[] = [];
       for(let i = 0; i<x; i++){
           ret.push(new Skill(themes, rand));
       }
       return ret;
   }

   const only_leave_unique_names = (skills: Skill[]) => {
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

   for(const class_theme of class_name.themes ){
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(min,max),[class_theme], rand));
       for(const aspect_theme of aspect.themes ){
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_theme], rand));
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_theme, class_theme], rand));
       }
   }

   for(const interest of interests){
       for(const interest_theme of interest.themes){
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(min,max),[interest_theme], rand));
        for(const aspect_theme of aspect.themes ){
            ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_theme, interest_theme], rand));
        }

        for(const class_theme of class_name.themes ){
           ret =  ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(min,max),[class_theme, interest_theme], rand));
        }
       }
   }
   console.log("generate skill is about to return", ret)
   return only_leave_unique_names(ret);
}