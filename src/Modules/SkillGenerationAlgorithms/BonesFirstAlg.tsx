
import { max_values_for_menus, numbermap, OPTIONS } from "../../Utils/constants"
import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { all_classes, RPGClass } from "../RPGClass"
import { CoreSkill, dangerousWasteHackingFunctions, Skill, SpecialSkill, StatSkill, wasteHackingFunctions, WasteSkill } from "../Skill"
import { all_themes, Theme } from "../Theme"
import { MENU, SUPERMOVE } from "../ThemeStorage"
import { SkillGenAlg } from "./SkillGenAlg"



export const current_values_for_menus:numbermap = {
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
    Refs: #22917:0,
}

//generates the structure of the graph first, then fills it in
export   class  BonesFirstAlg extends SkillGenAlg{
    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        //TODO this might be irrelevant how this works.
    }

    betweenSkill = (class_Refs: #22917e: RPGClass,skills: Skill[],parent: Skill, child: Skill,rand: SeededRandom) =>{
        let inBetween;
        const pickStat = (parent: Skill) =>{
            const theme = all_themes[rand.pickFrom(parent.theme_keys)];
            return rand.pickFrom(Object.values(theme.stats)).copy(parent.tier +1);
        }

        const pickMENU = (parent: Skill, retry=false):(string|null) =>{
            let MENU_POSSIBILITIES = [OPTIONS]; //TODO fill this with things from parent.theme keys as well.
            const theme = all_themes[rand.pickFrom(parent.theme_keys)];
            MENU_POSSIBILITIES = MENU_POSSIBILITIES.concat(theme.getPossibilitiesFor(MENU));
            let ret:string = rand.pickFrom(MENU_POSSIBILITIES);
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

        //try to do the "safe" hacking functions first, if at all possible
        if(class_Refs: #22917e === all_classes["waste"]){
            if(rand.nextDouble()>0.5){
                if(skills.length <30 ||rand.nextDouble()>0.2){
                    inBetween = new WasteSkill(rand.pickFrom(wasteHackingFunctions));
                }else{
                    inBetween = new WasteSkill(rand.pickFrom(dangerousWasteHackingFunctions));
                }
            }else{
                const ret = pickMENU(parent)
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
                const ret = pickMENU(parent)
                if(ret){
                    inBetween = new CoreSkill(ret,parent.tier+1);
                }else{
                    inBetween = new StatSkill(pickStat(parent),parent.tier+1);
                }            }
        }
        if(inBetween.type === "StatSkill" && rand.nextDouble()>0.5){
            //too many stats, halve them, plz
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

    assignChild =(class_Refs: #22917e: RPGClass,skills: Skill[],parent: Skill, child: Skill, rand: SeededRandom)=>{
        if(skills.length > 0){
            this.betweenSkill(class_Refs: #22917e, skills, parent, child, rand);
        }else{
            parent.children.push(child); 
            child.parents.push(parent); 
        }
    }

    generateSkills = (class_Refs: #22917e: RPGClass, aspect: Aspect, interests: Interest[], themes:Theme[], rand: SeededRandom)=>{

        /*
        "there are 8 nodes from "status".  for each node pick a single theme from the player and generate a skill.

        there are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a theme and 0-1 others from the players theme list

        there is two nodes from "forest path". for each node, generate a new skill that has themes "plant" and "guide"
        */
        let ret:Skill[] = [];
        ret = this.generateRootAndBase(class_Refs: #22917e, aspect, interests, rand);
        //okay so at this point we have the root and all the direct nodes leading from it.
        //now all thats left is to loop through all skills and generate children.

        //this should happen TWICE. ~MAYBE~ three times.
        //skip root for this. (slice)
        const tierTwo = this.generateTierTwo(class_Refs: #22917e,ret.slice(1), themes, rand);
        ret = ret.concat(tierTwo);
        

        //only pass in real skills, not stat skills or status skills
        const tierThree = this.generateTierTwo(class_Refs: #22917e,tierTwo.filter((x)=>{return !(x instanceof SpecialSkill)}), themes, rand);
        ret = ret.concat(tierThree);

        const finalTier = this.generateFinalTier(class_Refs: #22917e,tierThree.filter((x)=>{return !(x instanceof SpecialSkill)}), rand);
        ret = ret.concat(finalTier);
        
        return this.only_leave_unique_Refs: #22917es(ret);
    }

    

    generateFinalTier=(class_Refs: #22917e: RPGClass,skills: Skill[],rand: SeededRandom)=>{
        let ret:Skill[] = [];
        //pick three skills. generate max versions. don't care about repeats yet
        const possible = [rand.pickFrom(skills),rand.pickFrom(skills),rand.pickFrom(skills)];
        for(const skill of possible){
            const theme = all_themes[rand.pickFrom(skill.theme_keys)];
            const created_skill = new Skill([theme], rand)
            created_skill.Refs: #22917e = theme.pickPossibilityFor(rand,SUPERMOVE);
            this.assignChild(class_Refs: #22917e,ret, skill,created_skill,rand);
            ret.push(created_skill);
        }

        return ret;
    }

    // there are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a theme and 0-1 others from the players theme list

    generateTierTwo = (class_Refs: #22917e: RPGClass,skills: Skill[], themes: Theme[], rand: SeededRandom) =>{
        let ret:Skill[] = [];
        for(let i = 0; i<skills.length; i++){
            //combine a skill with its neighbor, loop if necessary
            const skill = skills[i];
            const second_skill = i<skills.length-1? skills[i+1]:skills[0];

            const theme1 = all_themes[rand.pickFrom(second_skill.theme_keys)];
            const theme2 = all_themes[rand.pickFrom(skill.theme_keys)];

            if(theme1.key !== theme2.key){
                let tmp = (this.generate_skill_x_times(1,[theme1, theme2], rand));
                tmp = this.only_leave_unique_Refs: #22917es(tmp);
                for(const new_skill of tmp){
                    //no doubles
                    if(ret.filter((s) =>s.Refs: #22917e === new_skill.Refs: #22917e).length ===0){
                        ret.push(new_skill);
                        this.assignChild(class_Refs: #22917e,ret, skill, new_skill,rand);
                        this.assignChild(class_Refs: #22917e,ret, second_skill, new_skill,rand);

                    }
                }

            }
        }
        return ret;
    }

    generateRootAndBase =(class_Refs: #22917e: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom) =>{
        const root = new CoreSkill("Status", 0);
        root.unlocked = true;
        const max = 1;
        const min = 1;
        let ret:Skill[] = [];

        for(const theme of class_Refs: #22917e.themes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[theme], rand));
         }

        for(const theme of aspect.themes ){
            ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(min,max),[theme], rand));
        }

        for(const interest of interests){
            for(const interest_theme of interest.themes){
             ret = ret.concat(this.generate_skill_x_times(rand.getRandomNumberBetween(1,1),[interest_theme], rand));
            }
        }
        //important to do before assigning children
        ret = this.only_leave_unique_Refs: #22917es(ret);
        for(const skill of ret){
            this.assignChild(class_Refs: #22917e,[], root, skill,rand);
        }
        ret.unshift(root);
        
        return ret;
    }

}