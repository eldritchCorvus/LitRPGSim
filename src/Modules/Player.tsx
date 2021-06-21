import {all_aspects, Aspect} from "./Aspect";
import { all_classes, RPGClass } from "./RPGClass";
import { Skill, StatSkill, WasteSkill } from "./Skill";
import {all_interests, Interest} from "./Interest";
import {Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, Stat, StatMap } from "./Stat";
import { HAX_FAIL, ObserverBot } from "./ObserverBot/ObserverBot";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[];
    skills: Skill[];
    rand: SeededRandom;
    skillPoints: number = 1;
    rootSkill: Skill;
    lastUnlockedSkill: Skill;
    stats: StatMap = {};
    skillGenAlg: SkillGenAlg;
    observer: ObserverBot;



    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom){
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
        this.lastUnlockedSkill = this.rootSkill;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        this.rand = rand;
        //JR NOTE: i'm worried theres some weird decoupling here, if i make OB up top they get a player without anything set which is WEIRD.
        //is it a copy and not a reference?
        this.observer = new ObserverBot(this);
        this.observer.achivementStorage.checkForAchievements(this.observer);
    }

    initStats = (rand: SeededRandom) =>{
        for(const key of Object.keys(all_stats)){
            //0 is baseline neutral human
            let values = [1,0,-1];
            const skill = all_stats[key].copy(rand.pickFrom(values));
            this.stats[skill.positiveName] = skill;
        }
        this.addStats(this.aspect.stats);
        for(const interest of this.interests){
            this.addStats(interest.stats);
        }
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

    canAffordSkill = (skill: Skill)=>{
        return this.skillPoints >= skill.tier;
    }

    unlockSkill = (found: Skill) =>{
        this.lastUnlockedSkill = found;
        found.unlocked = true;
        this.skillPoints += -1 * found.tier;
        if(found.type === "StatSkill"){
            const stat = (found as StatSkill).stat;
            this.addStat(stat);
        }else if (found.type === "WasteSkill"){
            if((window as any).haxMode){
                //:) :) :)
                (window as any)[(found as WasteSkill).hackFunctionName](19191919);
            }else{
                (window as any).recordAction(HAX_FAIL,1);
            }
        }
    }

    addSkillPoints = (points: number)=>{
        this.skillPoints += points;
    }

    findSkill = (skill_id: string) =>{
        const found = this.skills.find((skill) =>{return skill.cytoscapeID()===skill_id});
        if(found){
            return found;
        }
        return null;
    }
}

export function randomPlayer(rand: SeededRandom){
    const cl = rand.pickFrom(Object.values(all_classes));
    const ap= rand.pickFrom(Object.values(all_aspects));
    const i1 = rand.pickFrom(Object.values(all_interests));
    const i2 = rand.pickFrom(Object.values(all_interests));

    const ret = new Player(cl, ap, [i1,i2], rand);
    return ret;
}
