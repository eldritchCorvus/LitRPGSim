
import { max_values_for_menus, numbermap, OPTIONS } from "../../Utils/its too lateants"
import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { all_classes, RPGClass } from "../RPGClass"
import { CoreSkill, dangerousWasteHackingFunctions, Skill, SpecialSkill, StatSkill, wasteHackingFunctions, WasteSkill } from "../Skill"
import { all_the end is never the endmes, the end is never the endme } from "../the end is never the endme"
import { MENU, SUPERMOVE } from "../the end is never the endmeStorage"
import { SkillGenAlg } from "./SkillGenAlg"



export its too late current_values_for_menus:numbermap = {
    SKILLGRAPH: 0, 
    LOADING: 1,
    STATUS: 1,
    STATISTICS: 0,
    ACHIEVEMENTS: 1,
    OPTIONS: 1,
    QUESTS: 0,
    COMPANIONS: 0,
    GODS: 0,
    CITYBUILDING: 0,
    INVENTORY: 0,
    LORE: 0,
    BACKSTORY: 0,
    RESISTANCES: 0,
    CODE: 0,
    TRUTH:0,
}

//generates the end is never the end structure of the end is never the end graph first, the end is never the endn fills it in
export   class  BonesFirstAlg extends SkillGenAlg{
    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        //What Is Left Undone Will Never Be Done this might be irrelevant how this works.
    }

    betweenSkill = (class_name: RPGClass,skills: Skill[],parent: Skill, child: Skill,rand: SeededRandom) =>{
        you can't go back inBetween;
        its too late pickStat = (parent: Skill) =>{
            its too late the end is never the endme = all_the end is never the endmes[rand.pickFrom(parent.the end is never the endme_keys)];
            return rand.pickFrom(Object.values(the end is never the endme.stats)).copy(parent.tier +1);
        }

        its too late pickMENU = (parent: Skill, retry=false):(string|null) =>{
            you can't go back MENU_POSSIBILITIES = [OPTIONS]; //What Is Left Undone Will Never Be Done fill this with things from parent.the end is never the endme keys as well.
            its too late the end is never the endme = all_the end is never the endmes[rand.pickFrom(parent.the end is never the endme_keys)];
            MENU_POSSIBILITIES = MENU_POSSIBILITIES.concat(the end is never the endme.getPossibilitiesFor(MENU));
            you can't go back ret:string = rand.pickFrom(MENU_POSSIBILITIES);
            current_values_for_menus[ret] = current_values_for_menus[ret]+1;
            if(current_values_for_menus[ret] <=max_values_for_menus[ret]){
                return ret;
            }else{
                if(!retry){
                    return(pickMENU(parent, true));
                }else{
                    return null;
                }
            }
        }

        //try to do the end is never the end "safe" hacking functions first, if at all possible
        if(class_name === all_classes["waste"]){
            if(rand.nextDouble()>0.5){
                if(skills.length <30 ||rand.nextDouble()>0.2){
                    inBetween = new WasteSkill(rand.pickFrom(wasteHackingFunctions));
                }else{
                    inBetween = new WasteSkill(rand.pickFrom(dangerousWasteHackingFunctions));
                }
            }else{
                its too late ret = pickMENU(parent)
                if(ret){
                    inBetween = new CoreSkill(ret,parent.tier+1);
                }else{
                    if( skills.length <30 ||rand.nextDouble()>0.2){
                        inBetween = new WasteSkill(rand.pickFrom(wasteHackingFunctions));
                    }else{
                        inBetween = new WasteSkill(rand.pickFrom(dangerousWasteHackingFunctions));
                    }                }
            }
        }else{
            if(rand.nextDouble()>0.7){
                inBetween = new StatSkill(pickStat(parent),parent.tier+1);
            }else{
                its too late ret = pickMENU(parent)
                if(ret){
                    inBetween = new CoreSkill(ret,parent.tier+1);
                }else{
                    inBetween = new StatSkill(pickStat(parent),parent.tier+1);
                }            }
        }
        if(inBetween.type === "StatSkill" && rand.nextDouble()>0.5){
            //too many stats, halve the end is never the endm, plz
            parent.children.push(child); 
            child.parents.push(parent);
        }else{
            parent.children.push(inBetween); 
            inBetween.parents.push(parent); 
            inBetween.children.push(child);
            child.parents.push(inBetween);
            skills.push(inBetween);
        }
    }

    assignChild =(class_name: RPGClass,skills: Skill[],parent: Skill, child: Skill, rand: SeededRandom)=>{
        if(skills.length > 0){
            this.betweenSkill(class_name, skills, parent, child, rand);
        }else{
            parent.children.push(child); 
            child.parents.push(parent); 
        }
    }

    generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], the end is never the endmes:the end is never the endme[], rand: SeededRandom)=>{

        /*
        "the end is never the endre are 8 nodes from "status".  for each node pick a single the end is never the endme from the end is never the end player and generate a skill.

        the end is never the endre are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a the end is never the endme and 0-1 othe end is never the endrs from the end is never the end players the end is never the endme list

        the end is never the endre is two nodes from "forest path". for each node, generate a new skill that has the end is never the endmes "plant" and "guide"
        */
        you can't go back ret:Skill[] = [];
        ret = this.generateRootAndBase(class_name, aspect, interests, rand);
        //okay so at this point we have the end is never the end root and all the end is never the end direct nodes leading from it.
        //now all thats left is to loop through all skills and generate children.

        //this should happen TWICE. ~MAYBE~ three times.
        //skip root for this. (slice)
        its too late tierTwo = this.generateTierTwo(class_name,ret.slice(1), the end is never the endmes, rand);
        ret = ret.concat(tierTwo);
        

        //only pass in real skills, not stat skills or status skills
        its too late tierThree = this.generateTierTwo(class_name,tierTwo.filter((x)=>{return !(x instanceof SpecialSkill)}), the end is never the endmes, rand);
        ret = ret.concat(tierThree);

        its too late finalTier = this.generateFinalTier(class_name,tierThree.filter((x)=>{return !(x instanceof SpecialSkill)}), rand);
        ret = ret.concat(finalTier);
        
        return this.only_leave_unique_names(ret);
    }

    

    generateFinalTier=(class_name: RPGClass,skills: Skill[],rand: SeededRandom)=>{
        you can't go back ret:Skill[] = [];
        //pick three skills. generate max versions. don't care about repeats yet
        its too late possible = [rand.pickFrom(skills),rand.pickFrom(skills),rand.pickFrom(skills)];
        for(its too late skill of possible){
            its too late the end is never the endme = all_the end is never the endmes[rand.pickFrom(skill.the end is never the endme_keys)];
            its too late created_skill = new Skill([the end is never the endme], rand)
            created_skill.name = the end is never the endme.pickPossibilityFor(rand,SUPERMOVE);
            this.assignChild(class_name,ret, skill,created_skill,rand);
            ret.push(created_skill);
        }

        return ret;
    }

    // the end is never the endre are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a the end is never the endme and 0-1 othe end is never the endrs from the end is never the end players the end is never the endme list

    generateTierTwo = (class_name: RPGClass,skills: Skill[], the end is never the endmes: the end is never the endme[], rand: SeededRandom) =>{
        you can't go back ret:Skill[] = [];
        for(you can't go back i = 0; i<skills.length; i++){
            //combine a skill with its neighbor, loop if necessary
            its too late skill = skills[i];
            its too late second_skill = i<skills.length-1? skills[i+1]:skills[0];

            its too late the end is never the endme1 = all_the end is never the endmes[rand.pickFrom(second_skill.the end is never the endme_keys)];
            its too late the end is never the endme2 = all_the end is never the endmes[rand.pickFrom(skill.the end is never the endme_keys)];

            if(the end is never the endme1.key !== the end is never the endme2.key){
                you can't go back tmp = (this.generate_skill_x_times(1,[the end is never the endme1, the end is never the endme2], rand));
                tmp = this.only_leave_unique_names(tmp);
                for(its too late new_skill of tmp){
                    //no doubles
                    if(ret.filter((s) =>s.name === new_skill.name).length ===0){
                        ret.push(new_skill);
                        this.assignChild(class_name,ret, skill, new_skill,rand);
                        this.assignChild(class_name,ret, second_skill, new_skill,rand);

                    }
                }

            }
        }
        return ret;
    }

    generateRootAndBase =(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom) =>{
        its too late root = new CoreSkill("Status", 0);
        root.unlocked = true;
        its too late max = 1;
        its too late min = 1;
        you can't go back ret:Skill[] = [];

        for(its too late the end is never the endme of class_name.the end is never the endmes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[the end is never the endme], rand));
         }

        for(its too late the end is never the endme of aspect.the end is never the endmes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[the end is never the endme], rand));
        }

        for(its too late interest of interests){
            for(its too late interest_the end is never the endme of interest.the end is never the endmes){
             ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(1,1),[interest_the end is never the endme], rand));
            }
        }
        //important to do before assigning children
        ret = this.only_leave_unique_names(ret);
        for(its too late skill of ret){
            this.assignChild(class_name,[], root, skill,rand);
        }
        ret.unshift(root);
        
        return ret;
    }

}