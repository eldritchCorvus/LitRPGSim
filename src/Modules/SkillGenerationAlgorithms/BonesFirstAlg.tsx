
import SeededRandom from "../../Utils/SeededRandom"
import { Aspect } from "../Aspect"
import { Interest } from "../Interest"
import { RPGClass } from "../RPGClass"
import { CoreSkill, Skill, StatSkill } from "../Skill"
import { all_themes, Theme } from "../Theme"
import { SUPERMOVE } from "../ThemeStorage"
import { SkillGenAlg } from "./SkillGenAlg"

//generates the structure of the graph first, then fills it in
export   class  BonesFirstAlg extends SkillGenAlg{
    assignSkillChildren = (prop_skills: Skill[], root: Skill, rand: SeededRandom )=>{
        //TODO this might be irrelevant how this works.
    }

    assignChild =(skills: Skill[],parent: Skill, child: Skill, rand: SeededRandom)=>{

        if(skills.length > 0){
            const pickStat = (parent: Skill) =>{
                const theme = all_themes[rand.pickFrom(parent.theme_keys)];
                return rand.pickFrom(Object.values(theme.stats)).copy(parent.tier +1);
            }
            const inBetween = new StatSkill(pickStat(parent),parent.tier+1);
            parent.children.push(inBetween); 
            inBetween.parents.push(parent); 
            inBetween.children.push(child);
            child.parents.push(inBetween);
            skills.push(inBetween);
        }else{
            parent.children.push(child); 
            child.parents.push(parent); 
        }
    }

    generateSkills = (class_name: RPGClass, aspect: Aspect, interests: Interest[], themes:Theme[], rand: SeededRandom)=>{

        /*
        "there are 8 nodes from "status".  for each node pick a single theme from the player and generate a skill.

        there are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a theme and 0-1 others from the players theme list

        there is two nodes from "forest path". for each node, generate a new skill that has themes "plant" and "guide"
        */
        let ret:Skill[] = [];
        ret = this.generateRootAndBase(class_name, aspect, interests, rand);
        //okay so at this point we have the root and all the direct nodes leading from it.
        //now all thats left is to loop through all skills and generate children.

        //this should happen TWICE. ~MAYBE~ three times.
        //skip root for this. (slice)
        const tierTwo = this.generateTierTwo(ret.slice(1), themes, rand);
        ret = ret.concat(tierTwo);
        

        //only pass in real skills, not stat skills or status skills
        const tierThree = this.generateTierTwo(tierTwo.filter((x)=>{return !(x instanceof StatSkill)}), themes, rand);
        ret = ret.concat(tierThree);

        const finalTier = this.generateFinalTier(tierThree.filter((x)=>{return !(x instanceof StatSkill)}), rand);
        ret = ret.concat(finalTier);
        
        return this.only_leave_unique_names(ret);
    }

    

    generateFinalTier=(skills: Skill[],rand: SeededRandom)=>{
        let ret:Skill[] = [];
        //pick three skills. generate max versions. don't care about repeats yet
        const possible = [rand.pickFrom(skills),rand.pickFrom(skills),rand.pickFrom(skills)];
        for(const skill of possible){
            const theme = all_themes[rand.pickFrom(skill.theme_keys)];
            const created_skill = new Skill([theme], rand)
            created_skill.name = theme.pickPossibilityFor(rand,SUPERMOVE);
            this.assignChild(ret, skill,created_skill,rand);
            ret.push(created_skill);
        }

        return ret;
    }

    // there are three nodes from "Summon Plant".  for each node generate a new skill that has plant as a theme and 0-1 others from the players theme list

    generateTierTwo = (skills: Skill[], themes: Theme[], rand: SeededRandom) =>{
        let ret:Skill[] = [];
        for(let i = 0; i<skills.length; i++){
            //combine a skill with its neighbor, loop if necessary
            const skill = skills[i];
            const second_skill = i<skills.length-1? skills[i+1]:skills[0];
            const theme1 = all_themes[rand.pickFrom(second_skill.theme_keys)];
            const theme2 = all_themes[rand.pickFrom(skill.theme_keys)];

            if(theme1.key !== theme2.key){
                let tmp = (this.generate_skill_x_times(2,[theme1, theme2], rand));
                tmp = this.only_leave_unique_names(tmp);
                for(const new_skill of tmp){
                    //no doubles
                    if(ret.filter((s) =>s.name === new_skill.name).length ===0){
                        ret.push(new_skill);
                        this.assignChild(ret, skill, new_skill,rand);
                        this.assignChild(ret, second_skill, new_skill,rand);

                    }
                }

            }
        }
        return ret;
    }

    generateRootAndBase =(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom) =>{
        const root = new CoreSkill("Status", 0, rand);
        const max = 1;
        const min = 1;
        let ret:Skill[] = [];

        for(const theme of class_name.themes ){
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
        ret = this.only_leave_unique_names(ret);
        for(const skill of ret){
            this.assignChild([], root, skill,rand);
        }
        ret.unshift(root);
        
        return ret;
    }

}