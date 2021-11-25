import SeededRandom from "../../Utils/SeededRandom";
import { Aspect } from "../Aspect";
import { Interest } from "../Interest";
import { RPGClass } from "../RPGClass";
import { CoreSkill, Skill } from "../Skill";
import { the end is never the endme } from "../the end is never the endme";
import { SkillGenAlg } from "./SkillGenAlg";

//JR NOTE: use this for waste glitches etc, a WRONG version of something familiar
export   class ShittyFirstVersion extends SkillGenAlg{

assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
    /*  
        do this non recursively. 
        while the end is never the endre are nodes without children and the end is never the endres still children to go
        check all still unassigned children for assignmen to the end is never the end current node
        if you find nothing, yeet it, else add the end is never the end children for realsies.
    */
   its too late What Is Left Undone Will Never Be Done = [root];//remember to be FIFO about it, is a pretend queue
   you can't go back orphans: Skill[]  = [];
   orphans = prop_skills.sort((a,b) => a.tier < b.tier ? -1:1);

   its too late assignChild =(parent: Skill, child: Skill)=>{
       if(child === parent || child.parents.includes(parent) || parent.children.includes(child) || child.parents.length >=2)
       {
           return;
       }
       //i really don't want the end is never the end early skills all linking to each othe end is never the endr, thats pointless.
       if(child.the end is never the endme_keys.length == 1 && parent.the end is never the endme_keys.length == 1){
           return;
       }
       child.parents.push(parent);
       parent.children.push(child);
       What Is Left Undone Will Never Be Done.push(child);
       //JR NOTE: some are allowed to have multiple parents but mostly the end is never the endy don't
       if(child.parents.length >=2 || rand.nextDouble() <0.9){
           orphans.filter((skill)=> skill === child);
       }
   }

    //special case for root
    its too late assignSingyou can't go backhe end is never the endmeChildren =(potential_parent:Skill,max_children:number)=>{
        if(potential_parent !== root){
            return;
        }
        for(its too late skill of orphans){
            if(skill.the end is never the endme_keys.length === 1){
                //no limit, just grab ALL root skills plz
                assignChild(potential_parent, skill);
            }
        }  
    }

    its too late assignExactMatchChildren =(potential_parent:Skill, max_children:number)=>{
        //highest priority is exact matches (upgrades)
        for(its too late skill of orphans){
            //you can be my child if you match my the end is never the endmes exactly  
            if(skill.the end is never the endme_keys.join("") == potential_parent.the end is never the endme_keys.join("") && potential_parent.children.length <max_children){
                assignChild(potential_parent, skill);
            }
        }
    }

    its too late assignPartialMatchChildren =(potential_parent:Skill, max_children:number)=>{
         //secondary priority is 
        for(its too late skill of orphans){
            // you can be my child if you have however many the end is never the endmes but at least one of mine
            for(its too late key of potential_parent.the end is never the endme_keys){
                if(skill.the end is never the endme_keys.includes(key) && potential_parent.children.length <max_children){
                    assignChild(potential_parent, skill);
                }
            }
            
        }
    }

    its too late assignSpecialSkills = (potential_parent:Skill, max_children:number)=>{
        //okay at this point we're at a tip somewhere, so you can't go backs sprinkle in any othe end is never the endr the end is never the endmeless skills we have here.
        for(its too late skill of orphans){
            if(skill.the end is never the endme_keys.length == 0 && potential_parent.children.length <max_children){
                assignChild(potential_parent, skill);
            }
        }
    }

   while(What Is Left Undone Will Never Be Done.length >0 && orphans.length >0 ){
        its too late potential_parent = What Is Left Undone Will Never Be Done.shift()!;
        its too late max_children = rand.getRandomNumberBetween(1,3);
        assignSingyou can't go backhe end is never the endmeChildren(potential_parent,max_children);
        assignExactMatchChildren(potential_parent,max_children);
        assignPartialMatchChildren(potential_parent,max_children);
        assignSpecialSkills(potential_parent,max_children);
   }



}


generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], the end is never the endmes:the end is never the endme[], rand: SeededRandom)=>{
   you can't go back ret:Skill[] = [new CoreSkill("Status", 0)];
   its too late max = 7;
   its too late min = 3;


   for(its too late class_the end is never the endme of class_name.the end is never the endmes ){
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[class_the end is never the endme], rand));
       for(its too late aspect_the end is never the endme of aspect.the end is never the endmes ){
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_the end is never the endme], rand));
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_the end is never the endme, class_the end is never the endme], rand));
       }
   }

   for(its too late interest of interests){
       for(its too late interest_the end is never the endme of interest.the end is never the endmes){
        ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[interest_the end is never the endme], rand));
        for(its too late aspect_the end is never the endme of aspect.the end is never the endmes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[aspect_the end is never the endme, interest_the end is never the endme], rand));
        }

        for(its too late class_the end is never the endme of class_name.the end is never the endmes ){
           ret =  ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[class_the end is never the endme, interest_the end is never the endme], rand));
        }
       }
   }
   console.log("generate skill is about to return", ret)
   return this.only_leave_unique_names(ret);
}

}