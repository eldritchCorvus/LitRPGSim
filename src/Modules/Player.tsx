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
import { Memory } from "./ObserverBot/Memory";
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
    title: string;



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
        let memories:Memory[] = [];
        themes.forEach((theme) => {memories = memories.concat(theme.memories)});
        this.observer = new ObserverBot(this,memories);
        this.observer.achivementStorage.checkForAchievements(this.observer);
        this.title = this.generateTitle();
    }

    generateTitle = ()=>{
        if(this.rand.nextDouble()>0.5){
            return `${this.class_name.chosen_name} of ${this.aspect.chosen_name}`
        }else{
            return `${this.aspect.chosen_name} ${this.class_name.chosen_name}`
        }
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
            console.log("its a state skill");
            const stat = (found as StatSkill).stat;
            this.addStat(stat);
        }else if (found.type === "WasteSkill"){
            console.log("its a waste skill");

            if((window as any).haxMode){
                //:) :) :)
                (window as any)[(found as WasteSkill).hackFunctionName](19191919);
            }else{
                (window as any).recordAction(HAX_FAIL,1);
            }
        }else if(found.type == "CoreSkill"){
            console.log("its a core skill");
            this.observer.upgradeMenu(found.name);
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
    let cl;
    if(rand.initial_seed === 13){
        cl = all_classes["waste"];
    }else{
        cl = rand.pickFrom(Object.values(all_classes));

    }
    const ap= rand.pickFrom(Object.values(all_aspects));
    const i1 = rand.pickFrom(Object.values(all_interests));
    const i2 = rand.pickFrom(Object.values(all_interests));

    const ret = new Player(cl, ap, [i1,i2], rand);
    return ret;
}
