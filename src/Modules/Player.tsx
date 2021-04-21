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
        assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, [], 0, rand);
        console.log("After everything, skills looks like this", this.skills);
        this.rand = rand;

    }

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};
}

const assignSkillChildren =(prop_skills: Skill[], parent: Skill | undefined |null, nextParents:Skill[],num_tries = 0, rand: SeededRandom) =>{
    /*
        * The first skill is the root. Then, grab one skill from each theme to be its children.
        * for each child, grab 0-5 skills that share either all its themes or at least one (prefer all) to be its children. 
        *recurse
    */
   let skills: Skill[]  = [];
   skills = prop_skills.sort((a,b) => a.tier < b.tier ? -1:1);
   console.log("after shuffling skills its", skills)
   num_tries ++;
   const max_children = rand.getRandomNumberBetween(3,10);
   let orphans = skills.filter((skill)=>!skill.parent);
   if(skills.length === 0){
       return;
   }
   if(!parent){
       //for breadth first its a queue, grab last out
       parent = nextParents[nextParents.length-1];
       assignSkillChildren(skills, parent, nextParents.filter((skill) => skill === parent),num_tries,rand);
       return;
   }

   //you already have children? done
   if(parent.children.length > 0){
       return;
   }
   let children:Skill[] = [];

   const submitChildren = (children: Skill[]) =>{
        let remainder:Skill[] =skills.filter((skill  => !children.includes(skill)));

        if(!parent){
            return; //shouldn't happen
        }
        parent.children = children;
        //look for subchildren for all children
        
        for(const child of children){
            child.parent = parent;
            nextParents.push(child);
        }
        //this keeps it breadth first
        assignSkillChildren(remainder, null,nextParents,num_tries,rand);

   }

   const checkIfEnoughChildren = (children: Skill[])=>{
        //thats enough children plz
        if(children.length >= max_children){
           submitChildren(children);
            return true;
        }
        return false;
    }

    //special case if its the root, look for single theme children, but don't double up
    if(!parent.parent){
        for(const skill of orphans){
            if(skill.theme_keys.length === 1 && !skill.parent){
                const doubles = children.filter((child) => child.theme_keys === skill.theme_keys);
                if(doubles.length === 0&& children.length < 10){
                     children.push(skill);
                }
            }
        }  
    }


    if(checkIfEnoughChildren(children)){
        return;
    }

    //highest priority is exact matches (upgrades)
    for(const skill of orphans){
       //you can be my child if you match my themes exactly  
       if(skill.theme_keys.join("") == parent.theme_keys.join("") && !skill.parent && children.length <max_children && !children.includes(skill)){
           children.push(skill);
       }
    }

    if(checkIfEnoughChildren(children)){
        return;
    }

    //secondary priority is 
    for(const skill of orphans){
        // you can be my child if you have however many themes but at least one of mine
        for(const key of parent.theme_keys){
            if(skill.theme_keys.includes(key) && !skill.parent && children.length <max_children && !children.includes(skill)){
                children.push(skill); 
            }
        }
        
    }

    if(checkIfEnoughChildren(children)){
        return;
    }
    //okay at this point we're at a root somewhere, so lets sprinkle in any other themeless skills we have here.
    for(const skill of orphans){
        if(skill.theme_keys.length == 0 && !skill.parent && children.length <max_children && !children.includes(skill)){
            children.push(skill);
        }
    }

    //even if its not enough.
    submitChildren(children);
    return;
}

export const generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom)=>{
   let ret:Skill[] = [new CoreSkill("Status", 0, rand)];
   const max = 10;
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