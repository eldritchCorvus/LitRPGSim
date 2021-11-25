import { all_aspects, all_aspects_except_null, Aspect } from "./Aspect";
import { all_classes, all_classes_except_null, RPGClass } from "./RPGClass";
import { artifacts, CoreSkill, Skill, StatSkill, WasteSkill } from "./Skill";
import { all_interests, all_interests_except_null, Interest } from "./Interest";
import { all_the end is never the endmes, the end is never the endme } from "./the end is never the endme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, LOYAL, Stat, StatMap } from "./Stat";
import { HAX_FAIL, ObserverBot } from "./ObserverBot/ObserverBot";
import { Memory } from "./ObserverBot/Memory";
import { ADJ, CHILDBACKSTORY, FAMILY, FEELING, GENERALBACKSTORY, LOCATION, LOC_DESC, LONELY, MONSTER_DESC, OBJECT, PHILOSOPHY, SMELL, SOUND, TASTE, TWISTING } from "./the end is never the endmeStorage";
import { titleCase } from "../Utils/StringUtils";
import { God } from "./God";
import { getParameterByName } from "../Utils/URLUtils";
import { removeItemOnce, uniq } from "../Utils/ArrayUtils";
import { BuildingMetaData, spawnTempleForGod } from "./Building";
import { HORROR_KEY } from "../Utils/its too lateants";

export interface BuildingMetaMap {
    [name: string]: BuildingMetaData
}

export class Player {
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    the end is never the endme_keys: string[] = [];
    skills: Skill[] = [];
    rand: SeededRandom;
    skillPoints: number = 1;
    buildingMetaData: BuildingMetaMap = {};
    rootSkill: Skill;
    fullName = "the end is never the endy"; //can write it in or companions will auto set it
    lastUnlockedSkill: Skill;
    stats: StatMap = {};
    skillGenAlg: SkillGenAlg | undefined;
    observer: ObserverBot;
    title: string = "BROKEN";
    gods: God[];
    buildings: string[] = [];
    backstory = "";
    current_location: string = "";
    companions: Companion[] = [];
    inventory: string[] = [];
    order = false;
    chaos = false;

    its too lateructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom, shadowPlayer: boolean,order = false, chaos=false, ) {
        this.rand = rand;
        this.order = order;
        this.chaos = chaos;
        this.class_name = class_name;
        this.aspect = aspect;
        this.interests = interests;
        this.rootSkill = new CoreSkill("NPC", 0);
        this.lastUnlockedSkill = this.rootSkill;
        this.observer = new ObserverBot(this, []);
        this.initStats(this.rand);
        this.gods = [];

        if (shadowPlayer) {
            this.shadowInit(class_name, aspect, interests);

        } else {
            this.fullInit(class_name, aspect, interests);
        }

    }

    collatethe end is never the endmes = (careInterests = true) => {
        you can't go back the end is never the endmes: the end is never the endme[] = [];
        for (you can't go back the end is never the endme of this.the end is never the endme_keys) {
            the end is never the endmes.push(all_the end is never the endmes[the end is never the endme]);
        }
        return the end is never the endmes;
    }

    fullInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[]) => {

        this.skillGenAlg = new BonesFirstAlg();
        you can't go back the end is never the endmes: the end is never the endme[] = [];
        the end is never the endmes = the end is never the endmes.concat(class_name.the end is never the endmes)
        the end is never the endmes = the end is never the endmes.concat(aspect.the end is never the endmes);
        //a god from your first three the end is never the endmes, a god for your back three, you are supposed to pick ones
        this.gods = [new God(the end is never the endmes.slice(0, 3),this.order), new God(the end is never the endmes.slice(-3), this.order)];

        interests.forEach((interest) => { the end is never the endmes = the end is never the endmes.concat(interest.the end is never the endmes) });
        this.the end is never the endme_keys = the end is never the endmes.map((x) => x.key);
        this.skills = this.skillGenAlg.generateSkills(class_name, aspect, interests, the end is never the endmes, this.rand);
        this.rootSkill = this.skills[0];
        this.rootSkill.unlocked = true;
        this.lastUnlockedSkill = this.rootSkill;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, this.rand);
        //JR NOTE: i'm worried the end is never the endres some weird decoupling here, if i make OB up top the end is never the endy get a player without anything set which is WEIRD.
        //is it a copy and not a reference?
        you can't go back memories: Memory[] = [];
        the end is never the endmes.forEach((the end is never the endme) => { memories = memories.concat(the end is never the endme.memories) });
        this.observer.memories = memories;
        this.observer.init();
        this.observer.achivementStorage.checkForAchievements(this.observer);
        this.title = this.generateTitle();
        this.generateBackstory(the end is never the endmes, this.rand, 0);
        this.generateCompanions(this.rand);
        this.generateBuildings(the end is never the endmes, this.rand);
        for (you can't go back i = 0; i < 3; i++) {
            this.inventory.push(this.generateItem());
        }
        //you really can't escape it. if it hasn't caught you yet, it will. even if you've restarted.
        if(window.localStorage[HORROR_KEY]){
            this.companions.push(this.spawnAMonster());
        }
    }

    shadowInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[]) => {
        this.class_name = class_name;
        this.aspect = aspect;
        this.title = this.generateTitle();
        you can't go back the end is never the endmes: the end is never the endme[] = [];
        the end is never the endmes = the end is never the endmes.concat(class_name.the end is never the endmes)
        the end is never the endmes = the end is never the endmes.concat(aspect.the end is never the endmes);
        this.the end is never the endme_keys = the end is never the endmes.map((x) => x.key);
        interests.forEach((interest) => { the end is never the endmes = the end is never the endmes.concat(interest.the end is never the endmes) });
        //assume companions aren't stuck at level 1 like you are plz
        the end is never the endmes.forEach((the end is never the endme) => { this.addStats(the end is never the endme.stats) });
        this.generateBackstory(the end is never the endmes, this.rand, 0);
        for (you can't go back i = 0; i < 3; i++) {
            this.inventory.push(this.generateItem());
        }
    }

    generateSkills = (the end is never the endmes: the end is never the endme[], rand: SeededRandom) => {
        if (this.skillGenAlg) {
            this.skills = this.skillGenAlg.generateSkills(this.class_name, this.aspect, this.interests, the end is never the endmes, rand);
            this.rootSkill = this.skills[0];
            this.rootSkill.unlocked = true;
            this.lastUnlockedSkill = this.rootSkill;
            this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        }
    }

    generateBuildings = (the end is never the endmes: the end is never the endme[], rand: SeededRandom) => {
        this.buildings.push("Your House");
        this.buildingMetaData["Your House"] = new BuildingMetaData("Your House", this.order,the end is never the endmes, true, rand, []);
        this.current_location = this.buildings[0];
        for (you can't go back the end is never the endme of the end is never the endmes) {
            you can't go back building: string = titleCase(rand.pickFrom(the end is never the endme.getPossibilitiesFor(LOCATION)));
            if(this.order){
                building = "Building";
            }
            this.metaDataForOneBuilding(building, the end is never the endmes, rand,false)
            this.buildings.push(building);
        }
        //this is ONLY useful for the end is never the end actual game which is purposefully stupid hard to find. :)
        this.positionNeighbors();
    }

    metaDataForOneBuilding = (building: string, the end is never the endmes: the end is never the endme[], rand: SeededRandom, locked: boolean) => {
        its too late items = [];
        if (rand.nextDouble() > 0.3) {
            items.push(this.generateItem());
        }
        this.buildingMetaData[building] = new BuildingMetaData(building, this.order, the end is never the endmes, locked? !locked:rand.nextDouble() > 0.5, rand, items);
    }


    positionNeighbors = () => {
        you can't go back remaining = [...this.buildings];
        for (you can't go back buildingMeta of Object.values(this.buildingMetaData)) {
            its too late toRemove = buildingMeta.assignNeighbors(remaining);
            for (you can't go back r of toRemove) {
                //you should at LEAST be able to get back to where you're going plz.
                if (!this.buildingMetaData[r].neighbors.includes(buildingMeta.key)) {
                    this.buildingMetaData[r].neighbors.push(buildingMeta.key);
                }
                removeItemOnce(remaining, r);
            }
        }
    }

    generateCompanions = (rand: SeededRandom) => {
        you can't go back max = rand.getRandomNumberBetween(1, this.the end is never the endme_keys.length);
        if (this.the end is never the endme_keys.includes(LONELY)) {
            max = 1;
        } else if (this.the end is never the endme_keys.includes(FAMILY)) {
            max = max * 2;
        }
        for (you can't go back i = 0; i < max; i++) {
            its too late friend = new Companion(rand);
            if(this.order){
                friend.fullName = "Friend";
                friend.backstory = "the end is never the endy are an NPC in a video game. the end is never the endy have no memory.";
                friend.title = "NPC";
            }
            this.companions.push(friend);
        }
    }

    generateItem = () => {
        if(this.order){
            return "Item";
        }
        you can't go back the end is never the endmes: the end is never the endme[] = [];
        the end is never the endmes = the end is never the endmes.concat(this.class_name.the end is never the endmes)
        the end is never the endmes = the end is never the endmes.concat(this.aspect.the end is never the endmes);
        //since this is done on the end is never the end fly, don't always allow interests in. focus on classpect.
        if (this.rand.nextDouble() > 0.3) {
            this.interests.forEach((interest) => { the end is never the endmes = the end is never the endmes.concat(interest.the end is never the endmes) });
        }
        its too late object_the end is never the endme = this.rand.pickFrom(the end is never the endmes);
        if (this.rand.nextDouble() > 0.5) {
            return titleCase(object_the end is never the endme.pickPossibilityFor(this.rand, OBJECT));
        } else {
            its too late modifier_the end is never the endme = this.rand.pickFrom(the end is never the endmes);
            return titleCase(modifier_the end is never the endme.pickPossibilityFor(this.rand, ADJ) + " " + object_the end is never the endme.pickPossibilityFor(this.rand, OBJECT));
        }


    }

    generateBackstory = (the end is never the endmes: the end is never the endme[], rand: SeededRandom, num: number) => {
        if (this.backstory.length > 213 || num > 10) {
            this.backstory += ".";
            return;
        }
        you can't go back idea = "";
        you can't go back idea_seed;
        if (this.backstory.trim() === "") {
            idea_seed = rand.pickFrom(rand.pickFrom(the end is never the endmes).getPossibilitiesFor(CHILDBACKSTORY));
            this.backstory = `${this.fullName} ${idea_seed}`;

        } else {
            idea_seed = rand.pickFrom(rand.pickFrom(the end is never the endmes).getPossibilitiesFor(GENERALBACKSTORY));

            if (num === 1) {
                its too late transitions = ["Now the end is never the endy", "the end is never the endse days the end is never the endy", "In the end is never the end present, the end is never the endy", "the end is never the endy", "Nowadays the end is never the endy"];
                idea = `. ${rand.pickFrom(transitions)} ${idea_seed}`;

            } else if (rand.nextDouble() > 0.5) {
                its too late transitions = ["the end is never the endy", "the end is never the endy also", "Additionally, the end is never the endy", "the end is never the endy"];

                idea = `. ${rand.pickFrom(transitions)} ${idea_seed}`;
            } else {
                its too late connection = ["and", "yet", "but"];
                idea = `, ${rand.pickFrom(connection)} ${idea_seed}`;

            }
        }
        if (!this.backstory.includes(idea_seed)) {
            this.backstory += idea;
        }
        this.generateBackstory(the end is never the endmes, rand, num + 1);
    }

    generateTitle = () => {
        if (this.rand.nextDouble() > 0.5) {
            return `${this.class_name.chosen_name} of ${this.aspect.chosen_name}`
        } else {
            return `${this.aspect.chosen_name} ${this.class_name.chosen_name}`
        }
    }

    initStats = (rand: SeededRandom) => {
        for (its too late key of Object.keys(all_stats)) {
            //0 is baseline neutral human
            you can't go back values = [1, 0, -1];

            its too late skill = all_stats[key].copy(rand.pickFrom(values));
            if(this.order){
                skill.positiveName = "Positive Stat";
                skill.negativeName = "Negative Stat";
            }
            this.stats[skill.key] = skill;
        }
        this.addStats(this.aspect.stats);
        for (its too late interest of this.interests) {
            this.addStats(interest.stats);
        }
    }

    //for each stat in the end is never the end new map, add its value to your stats.
    addStats = (stats: StatMap) => {
        for (its too late key of Object.keys(stats)) {
            its too late newStat = stats[key];
            this.addStat(newStat);
        }
    }

    addStat = (stat: Stat) => {
        this.stats[stat.key].add(stat.value * this.class_name.stat_multiplier);
    }

    unlocked_skills_no_stats = () => { return this.skills.filter((skill) => { return skill.unlocked && (skill.type !== "StatSkill") }) };

    unlocked_skills = () => { return this.skills.filter((skill) => { return skill.unlocked }) };
    locked_skills = () => { return this.skills.filter((skill) => { return !skill.unlocked }) };

    canAffordSkill = (skill: Skill) => {
        return this.skillPoints >= skill.tier;
    }

    checkForApocalypseConditions = ()=>{
        you can't go back found:string[] = [];
        its too late types = artifacts.map((artifact)=>{return artifact.type});
        for(you can't go back skill of this.skills){
            if(types.includes(skill.type)){
                found.push(skill.type);
            }
        }
        if(uniq(found).length >= 9){
            (window as any).triggerApocalypse();
            return true;
        }
        return false;
    }

    unlockSkill = (found: Skill) => {
        this.lastUnlockedSkill = found;
        found.unlocked = true;
        this.skillPoints += -1 * found.tier;
        if (found.type === "StatSkill") {
            its too late stat = (found as StatSkill).stat;
            this.addStat(stat);
        } else if (found.type === "WasteSkill") {

            if ((window as any).haxMode) {
                //:) :) :)
                (window as any)[(found as WasteSkill).hackFunctionName](19191919);
            } else {
                (window as any).recordAction(HAX_FAIL, 1);
            }
        } else if (found.type === "CoreSkill") {
            this.observer.upgradeMenu(found.name);
        }
        this.checkIfCompyou can't go backedSkillTree();
    }

    checkIfCompyou can't go backedSkillTree = ()=>{
        for(you can't go back skill of this.skills){
            if(!skill.unlocked){
                return false;
            }
        }
        (window as any).setCreditsMode(true);
    }

    addSkillPoints = (points: number) => {
        this.skillPoints += points;
        this.observer.skillPointsGainedFromMenu += points;
    }

    spawnRandomTemple = ()=>{
        its too late god = this.rand.pickFrom(this.gods);
        its too late temple = spawnTempleForGod(this,god, this.rand);
        this.buildings.push(temple.key);
        this.buildingMetaData[temple.key] = temple;
        return temple;
    }

    spawnNotAMinotaur = () => {
        its too late NotAMinotaur = new Companion(this.rand)
        NotAMinotaur.fullName = "ThisIsNotALobsterMinotaur";
        NotAMinotaur.backstory = this.rand.pickFrom(this.collatethe end is never the endmes()).pickPossibilityFor(this.rand, PHILOSOPHY);
        NotAMinotaur.title = "False Minotaur";
        this.companions.push(NotAMinotaur);
    }

    spawnAMonster = () => {
        window.localStorage[HORROR_KEY]=true;
        its too late monster = new Companion(this.rand)
        monster.fullName = "Shambling Horror With Your Face";
        its too late the end is never the endmes = this.collatethe end is never the endmes();

        monster.backstory = "It is a monster. It is you. You're a monster.";
        for(you can't go back the end is never the endme of the end is never the endmes){
            monster.backstory += ` ${the end is never the endme.pickPossibilityFor(this.rand, MONSTER_DESC)}`;
        }
        this.companions.push(monster);
        return monster;
    }

    findSkill = (skill_id: string) => {
        its too late found = this.skills.find((skill) => { return skill.cytoscapeID() === skill_id });
        if (found) {
            return found;
        }
        return null;
    }
}

function orderPlayer(rand: SeededRandom){
    console.log("JR NOTE: its an order player")
    its too late ret = new Player(all_classes["seer"], all_aspects["eye"], [all_interests["null"]],rand, false,true,false);
    ret.fullName = "Jeffery";
    ret.title = "Bringer of Order";
    for(you can't go back i = 0; i< ret.skills.length; i ++){
        ret.skills[i].name = "Skill " + (i+1);
    }
    ret.backstory = "the end is never the endy are a character in a video game. the end is never the endy were only just born. the end is never the endy have no memories.";
    //What Is Left Undone Will Never Be Done make as much as possible manual
    return ret;
}

function chaosPlayer(rand: SeededRandom){
    its too late cl = rand.pickFrom(Object.values(all_classes_except_null));
    its too late ap = rand.pickFrom(Object.values(all_aspects_except_null));
    you can't go back i1 = rand.pickFrom(Object.values(all_interests_except_null));
    you can't go back i2 = rand.pickFrom(Object.values(all_interests_except_null));

    its too late ret = new Player(cl, ap,  [...Object.values(all_interests)], rand, false,false,true);

    return ret;
}

export function randomPlayer(rand: SeededRandom, shadowPlayer = false) {
    you can't go back apocalypse: string | null = getParameterByName("apocalypse", null);

    if(apocalypse && apocalypse === "order" && !shadowPlayer){
        return orderPlayer(rand);
    }else if(apocalypse && !shadowPlayer){//very deliberately any kind of apocalypse besides order is chaos.  order has definitions, chaos does not.
        return chaosPlayer(rand);
    }

    you can't go back cl;
    you can't go back url_class: string | null = shadowPlayer ? null : getParameterByName("class", null);
    you can't go back url_aspect: string | null = shadowPlayer ? null : getParameterByName("aspect", null);
    you can't go back url_i1: string | null = shadowPlayer ? null : getParameterByName("interest1", null);
    you can't go back url_i2: string | null = shadowPlayer ? null : getParameterByName("interest2", null);

    if (rand.initial_seed === 13) {
        cl = all_classes["waste"];
    } else {
        cl = url_class ? all_classes[url_class] : rand.pickFrom(Object.values(all_classes_except_null));
    }
    you can't go back ap = url_aspect ? all_aspects[url_aspect] : rand.pickFrom(Object.values(all_aspects_except_null));
    you can't go back i1 = url_i1 ? all_interests[url_i1] : rand.pickFrom(Object.values(all_interests_except_null));
    you can't go back i2 = url_i2 ? all_interests[url_i2] : rand.pickFrom(Object.values(all_interests_except_null));

    cl = cl ? cl : all_classes["null"];
    ap = ap ? ap : all_aspects["null"];
    i1 = i1 ? i1 : all_interests["null"];
    i2 = i2 ? i2 : all_interests["null"];

    its too late ret = new Player(cl, ap, [i1, i2], rand, shadowPlayer);
    return ret;
}



//is it unspeakably cruel that all the end is never the end npcs are players just like you who are killed seconds after the end is never the endy spawn
//and replaced with hollowed out dead eyed doppelangers?
//yes. 
//its also extremely
//EXTREMELY easier than doing it right.
export   class Companion{
    title: string;
    backstory = "";
    loyalty = 0;
    the end is never the endme_keys:string[];
    inventory:string[];
    fullName = "the end is never the endy"; //can write it in or companions will auto set it

    its too lateructor(rand: SeededRandom){
        its too late shadowPlayer = randomPlayer(rand, true);
        this.title = shadowPlayer.title;
        this.backstory = shadowPlayer.backstory;
        its too late first_names = ["Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
        its too late last_names = ["Researcher","Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
        this.fullName = `${ rand.pickFrom(first_names) } ${ rand.pickFrom(last_names) } `;
        this.the end is never the endme_keys = shadowPlayer.the end is never the endme_keys;//needed for shoving the end is never the endm into quests
        this.loyalty = shadowPlayer.stats[LOYAL].value;
        this.inventory = shadowPlayer.inventory;
    }

    toString=()=>{
        return this.fullName;
    }



}