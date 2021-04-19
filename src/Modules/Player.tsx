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
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        this.theme_keys = themes.map((x)=> x.key);
        this.skills = generateSkills(class_name, aspect, interests,rand);
        assignSkillChildren(this.skills, null);
        console.log("After everything, skills looks like this", this.skills);
        this.rand = rand;

    }

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};
}

const assignSkillChildren =(skills: Skill[], parent: Skill | undefined |null, num_tries = 0) =>{
    /*
        * The first skill is the root. Then, grab one skill from each theme to be its children.
        * for each child, grab 0-5 skills that share either all its themes or at least one (prefer all) to be its children. 
        *recurse
    */
   console.log("num tries is ", num_tries, " parent is", parent);
   num_tries ++;
   let orphans = skills.filter((skill)=>!skill.parent);
   console.log("orphans is", orphans);
   if(skills.length === 0){
       console.log("returning because no more skills");
       return;
   }
   //first thing in the list is the parent
   if(!parent){
       const p = skills[0];
       skills.shift();
       assignSkillChildren(skills, p, num_tries);
       console.log("returning because there wasn't a parent");
       return;
   }
   //you already have children? done
   if(parent.children.length > 0){
       console.log("returning because the parent already has children");
       return;
   }
   let children:Skill[] = [];

   const submitChildren = (children: Skill[]) =>{
        let remainder:Skill[] =skills.filter((skill  => !children.includes(skill)));
        console.log("submitting children, remainder is", remainder, "and children are", children);

        parent.children = children;
        //look for subchildren for all children
        for(const child of children){
            child.parent = parent;
            assignSkillChildren(remainder, child,num_tries);
        }
   }

   const checkIfEnoughChildren = (children: Skill[])=>{
        //thats enough children plz
        if(children.length >= 5){
           submitChildren(children);
           console.log("there is enough children", children);
            return true;
        }
        return false;
    }

    //special case if its the root, look for single theme children, but don't double up
    if(!parent.parent){
        console.log("I am a root node");
        for(const skill of orphans){
            if(skill.theme_keys.length === 1 && !skill.parent){
                const doubles = children.filter((child) => child.theme_keys === skill.theme_keys);
                if(doubles.length === 0&& children.length < 5){
                     children.push(skill);
                }
            }
        }  
    }

    console.log("after checking for single themes, children are", children);

    if(checkIfEnoughChildren(children)){
        return;
    }

    //highest priority is exact matches (upgrades)
    for(const skill of orphans){
       //you can be my child if you match my themes exactly  
       console.log("Comparing exact match of", skill.theme_keys, parent.theme_keys);  
       if(skill.theme_keys.join("") == parent.theme_keys.join("") && !skill.parent && children.length <5){
           console.log("i believe that match", skill.theme_keys,parent.theme_keys)
           children.push(skill);
       }else{
        console.log("i believe that they do NOT match", skill.theme_keys,parent.theme_keys, "or there is a parent already for this skill: ", skill.parent)
       }
    }
    console.log("after checking exact theme matches, children are", children);

    if(checkIfEnoughChildren(children)){
        return;
    }

    //secondary priority is 
    for(const skill of orphans){
        // you can be my child if you have however many themes but at least one of mine
        for(const key of parent.theme_keys){
            console.log("comparing partial match of skill theme keys are", skill.theme_keys, "and key i'm checking is", key);
            if(skill.theme_keys.includes(key) && !skill.parent && children.length <5){
                console.log("I think they match")
                children.push(skill); 
            }
        }
        
    }
    console.log("after checking for any theme matches, children are", children);

    if(checkIfEnoughChildren(children)){
        return;
    }
    //okay at this point we're at a root somewhere, so lets sprinkle in any other themeless skills we have here.
    for(const skill of orphans){
        if(skill.theme_keys.length == 0 && !skill.parent && children.length <5){
            children.push(skill);
        }
    }
    console.log("after checking for empty themes, children are", children);

    //even if its not enough.
    submitChildren(children);
    return;
}

export const generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom)=>{
   let ret:Skill[] = [new CoreSkill("Status", 0, rand)];

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
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(3,5),[class_theme], rand));
       for(const aspect_theme of aspect.themes ){
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(3,5),[aspect_theme], rand));
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(1,5),[aspect_theme, class_theme], rand));
       }
   }

   for(const interest of interests){
       for(const interest_theme of interest.themes){
        ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(1,3),[interest_theme], rand));
        for(const aspect_theme of aspect.themes ){
            ret = ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(1,5),[aspect_theme, interest_theme], rand));
        }

        for(const class_theme of class_name.themes ){
           ret =  ret.concat(generate_skill_x_times(rand.getRandomNumberBetween(1,5),[class_theme, interest_theme], rand));
        }
       }
   }
   console.log("generate skill is about to return", ret)
   return only_leave_unique_names(ret);
}