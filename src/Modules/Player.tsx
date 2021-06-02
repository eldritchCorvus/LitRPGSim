import {all_aspects, initAspects, Aspect} from "./Aspect";
import { all_classes, initClasses, RPGClass } from "./RPGClass";
import { Skill, CoreSkill, StatSkill } from "./Skill";
import {all_interests, Interest} from "./Interest";
import {initThemes, Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, initStats, Stat, StatMap } from "./Stat";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[];
    skills: Skill[];
    rand: SeededRandom;
    rootSkill: Skill;
    stats: StatMap = {};
    skillGenAlg: SkillGenAlg;



    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom){
        console.log("JR NOTE: trying to make a playe rof class", class_name, "and aspect", aspect, "and interests", interests)
        
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        this.initStats(rand);
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
    }

    initStats = (rand: SeededRandom) =>{
        for(const key of Object.keys(all_stats)){
            //0 is baseline neutral human
            let values = [1,0,-1];
            const skill = all_stats[key].copy(rand.getRandomElementFromArray(values));
            this.stats[skill.positiveName] = skill;
        }
        this.addStats(this.aspect.stats);
        for(const interest of this.interests){
            this.addStats(interest.stats);
        }
        //TODO also add interests.
        //TODO class does a multiplier for aspect stats (might be negative)
        console.log("JR NOTE: after initing stats they are", this.stats)
    }

    //for each stat in the new map, add its value to your stats.
    addStats = (stats:StatMap) =>{
        for(const key of Object.keys(stats)){
            const newStat = stats[key];
           this.addStat(newStat);
        }
    }

    addStat= (stat: Stat) =>{
        this.stats[stat.positiveName].add(stat.value * this.class_name.stat_multiplier);
    }

    unlocked_skills_no_stats = () =>{return this.skills.filter((skill) =>  {return skill.unlocked && (skill.type !== "StatSkill") })};

    unlocked_skills = () =>{return this.skills.filter((skill) =>  {return skill.unlocked })};

    unlockSkill = (skill_id: string) =>{
        const found = this.skills.find((skill) =>{return skill.cytoscapeID()===skill_id});
        if(found){
            console.log("JR NOTE: found was unlocked originally", found.unlocked, "and now setting it to true", "its type is", found.type);
            found.unlocked = true;
            if(found.type === "StatSkill"){
                const stat = (found as StatSkill).stat;
                console.log("JR NOTE: its a stat",stat);
                this.addStat(stat);
            }
        }
    }
}

export function randomPlayer(rand: SeededRandom){
    const cl = rand.getRandomElementFromArray(Object.values(all_classes));
    const ap= rand.getRandomElementFromArray(Object.values(all_aspects));
    const i1 = rand.getRandomElementFromArray(Object.values(all_interests));
    const i2 = rand.getRandomElementFromArray(Object.values(all_interests));

    const ret = new Player(cl, ap, [i1,i2], rand);
    return ret;
}
