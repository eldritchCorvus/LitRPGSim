import {all_aspects, Aspect} from "./Aspect";
import { all_classes, RPGClass } from "./RPGClass";
import { CoreSkill, Skill, StatSkill, WasteSkill } from "./Skill";
import {all_interests, Interest} from "./Interest";
import {Theme} from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, FREESPIRITED, LOYAL, Stat, StatMap } from "./Stat";
import { HAX_FAIL, ObserverBot } from "./ObserverBot/ObserverBot";
import { Memory } from "./ObserverBot/Memory";
import { CHILDBACKSTORY, GENERALBACKSTORY, LOCATION } from "./ThemeStorage";
import { titleCase } from "../Utils/StringUtils";
export   class Player{
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[] = [];
    skills: Skill[] =[];
    rand: SeededRandom;
    skillPoints: number = 1;
    rootSkill: Skill;
    fullName = "They"; //can write it in or companions will auto set it
    lastUnlockedSkill: Skill;
    stats: StatMap = {};
    skillGenAlg: SkillGenAlg|undefined;
    observer: ObserverBot;
    title: string = "BROKEN";
    buildings: string[] = [];
    backstory = "";
    companions: Companion[] = [];

    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom, shadowPlayer:boolean){
        this.rand = rand;
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        this.rootSkill = new CoreSkill("NPC",0);
        this.lastUnlockedSkill = this.rootSkill;
        this.observer = new ObserverBot(this,[]);
        this.initStats(this.rand);

        if(shadowPlayer){
            this.shadowInit(class_name, aspect, interests);

        }else{
            this.fullInit(class_name, aspect, interests);
        }

    }

    fullInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[])=>{

        this.skillGenAlg = new BonesFirstAlg();
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        this.theme_keys = themes.map((x)=> x.key);
        this.skills = this.skillGenAlg.generateSkills(class_name, aspect, interests,themes,this.rand);
        this.rootSkill = this.skills[0];
        this.rootSkill.unlocked = true;
        this.lastUnlockedSkill = this.rootSkill;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, this.rand);
        //JR NOTE: i'm worried theres some weird decoupling here, if i make OB up top they get a player without anything set which is WEIRD.
        //is it a copy and not a reference?
        let memories:Memory[] = [];
        themes.forEach((theme) => {memories = memories.concat(theme.memories)});
        this.observer.memories = memories;
        this.observer.init();
        this.observer.achivementStorage.checkForAchievements(this.observer);
        this.title = this.generateTitle();
        this.generateBuildings(themes,this.rand);
        this.generateBackstory(themes,this.rand,0);
        this.generateCompanions(this.rand);
    }

    shadowInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[])=>{
        this.class_name = class_name;
        this.aspect = aspect;
        this.title = this.generateTitle();
        let themes:Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        this.theme_keys = themes.map((x)=> x.key);
        interests.forEach((interest) => {themes = themes.concat(interest.themes)});
        //assume companions aren't stuck at level 1 like you are plz
        themes.forEach((theme)=>{this.addStats(theme.stats) });
        this.generateBackstory(themes,this.rand,0);
    }

    generateSkills = (themes: Theme[], rand: SeededRandom)=>{
        if(this.skillGenAlg){
            this.skills = this.skillGenAlg.generateSkills(this.class_name, this.aspect, this.interests,themes,rand);
            this.rootSkill = this.skills[0];
            this.rootSkill.unlocked = true;
            this.lastUnlockedSkill = this.rootSkill;
            this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        }

    }

    generateBuildings = (themes: Theme[],rand:SeededRandom)=>{
        for(let theme of themes){
            const building:string = titleCase(rand.pickFrom(theme.getPossibilitiesFor(LOCATION)));
            this.buildings.push(building);
        }
    }

    generateCompanions = (rand:SeededRandom)=>{
        const max = rand.getRandomNumberBetween(1,5);
        for(let i = 0; i<max; i++){
            this.companions.push(new Companion(rand));
        }
        console.log("JR NOTE: after generating compaions", this.companions)
    }

    generateBackstory = (themes: Theme[],rand:SeededRandom, num:number)=>{
        console.log("JR NOTE: generating backstory")
        if(this.backstory.length > 113 || num > 10){
            console.log("JR NOTE: done")
            this.backstory += ".";
            return;
        }
        let idea = "";
        let idea_seed;
        if(this.backstory.trim() === ""){
            console.log("JR NOTE init backstory from ", this.backstory);
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(CHILDBACKSTORY));

            this.backstory = `${this.fullName} ${idea_seed}`;
            console.log("JR NOTE after init ", this.backstory);

        }else{
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(GENERALBACKSTORY));

            if(rand.nextDouble() >0.5){
                console.log("JR NOTE new sentence ", this.backstory);

                idea =  `. They ${idea_seed}`;
            }else{
                const connection = ["and","yet","but"];
                console.log("JR NOTE connector ", this.backstory);
                idea = `, ${rand.pickFrom(connection)} ${idea_seed}`;

            }
        }
        if(!this.backstory.includes(idea_seed)){
            this.backstory += idea;
        }
        this.generateBackstory(themes, rand, num+1);
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
        this.observer.skillPointsGainedFromMenu += points;
    }

    findSkill = (skill_id: string) =>{
        const found = this.skills.find((skill) =>{return skill.cytoscapeID()===skill_id});
        if(found){
            return found;
        }
        return null;
    }
}

export function randomPlayer(rand: SeededRandom, shadowPlayer=false){
    let cl;
    if(rand.initial_seed === 13){
        cl = all_classes["waste"];
    }else{
        cl = rand.pickFrom(Object.values(all_classes));

    }
    const ap= rand.pickFrom(Object.values(all_aspects));
    const i1 = rand.pickFrom(Object.values(all_interests));
    const i2 = rand.pickFrom(Object.values(all_interests));

    const ret = new Player(cl, ap, [i1,i2], rand, shadowPlayer);
    return ret;
}


//is it unspeakably cruel that all the npcs are players just like you who are killed seconds after they spawn
//and replaced with hollowed out dead eyed doppelangers?
//yes. 
//its also extremely
//EXTREMELY easier than doing it right.
export   class Companion{
    title: string;
    backstory = "";
    loyalty = 0;
    theme_keys:string[];
    fullName = "They"; //can write it in or companions will auto set it

    constructor(rand: SeededRandom){
        const shadowPlayer = randomPlayer(rand, true);
        this.title = shadowPlayer.title;
        this.backstory = shadowPlayer.backstory;
        const first_names = ["John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
        const last_names = ["Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
        this.fullName = `${rand.pickFrom(first_names)} ${rand.pickFrom(last_names)}`;
        this.theme_keys = shadowPlayer.theme_keys;//needed for shoving them into quests
        console.log("JR NOTE: stats are", shadowPlayer.stats)
        this.loyalty = shadowPlayer.stats[LOYAL].value;
    }



}