import { all_aspects, all_aspects_except_null, Aspect } from "./Aspect";
import { all_classes, all_classes_except_null, RPGClass } from "./RPGClass";
import { CoreSkill, Skill, StatSkill, WasteSkill } from "./Skill";
import { all_interests, all_interests_except_null, Interest } from "./Interest";
import { all_themes, Theme } from "./Theme";
import SeededRandom from "../Utils/SeededRandom";
import { SkillGenAlg } from "./SkillGenerationAlgorithms/SkillGenAlg";
import { BonesFirstAlg } from "./SkillGenerationAlgorithms/BonesFirstAlg";
import { all_stats, LOYAL, Stat, StatMap } from "./Stat";
import { HAX_FAIL, ObserverBot } from "./ObserverBot/ObserverBot";
import { Memory } from "./ObserverBot/Memory";
import { ADJ, CHILDBACKSTORY, FAMILY, FEELING, GENERALBACKSTORY, LOCATION, LOC_DESC, LONELY, MONSTER_DESC, OBJECT, PHILOSOPHY, SMELL, SOUND, TASTE, TWISTING } from "./ThemeStorage";
import { titleCase } from "../Utils/StringUtils";
import { God } from "./God";
import { getParameterByName } from "../Utils/URLUtils";
import { removeItemOnce, uniq } from "../Utils/ArrayUtils";

export interface BuildingMetaMap {
    [name: string]: BuildingMetaData
}

export class Player {
    class_name: RPGClass;
    aspect: Aspect;
    interests: Interest[];
    theme_keys: string[] = [];
    skills: Skill[] = [];
    rand: SeededRandom;
    skillPoints: number = 1;
    buildingMetaData: BuildingMetaMap = {};
    rootSkill: Skill;
    fullName = "They"; //can write it in or companions will auto set it
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

    constructor(class_name: RPGClass, aspect: Aspect, interests: Interest[], rand: SeededRandom, shadowPlayer: boolean) {
        this.rand = rand;
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

    collateThemes = (careInterests = true) => {
        let themes: Theme[] = [];
        for (let theme of this.theme_keys) {
            themes.push(all_themes[theme]);
        }
        return themes;
    }

    fullInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[]) => {

        this.skillGenAlg = new BonesFirstAlg();
        let themes: Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        //a god from your first three themes, a god for your back three, you are supposed to pick ones
        this.gods = [new God(themes.slice(0, 3)), new God(themes.slice(-3))];
        interests.forEach((interest) => { themes = themes.concat(interest.themes) });
        this.theme_keys = themes.map((x) => x.key);
        this.skills = this.skillGenAlg.generateSkills(class_name, aspect, interests, themes, this.rand);
        this.rootSkill = this.skills[0];
        this.rootSkill.unlocked = true;
        this.lastUnlockedSkill = this.rootSkill;
        this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, this.rand);
        //JR NOTE: i'm worried theres some weird decoupling here, if i make OB up top they get a player without anything set which is WEIRD.
        //is it a copy and not a reference?
        let memories: Memory[] = [];
        themes.forEach((theme) => { memories = memories.concat(theme.memories) });
        this.observer.memories = memories;
        this.observer.init();
        this.observer.achivementStorage.checkForAchievements(this.observer);
        this.title = this.generateTitle();
        this.generateBackstory(themes, this.rand, 0);
        this.generateCompanions(this.rand);
        this.generateBuildings(themes, this.rand);
        for (let i = 0; i < 3; i++) {
            this.inventory.push(this.generateItem());
        }
    }

    shadowInit = (class_name: RPGClass, aspect: Aspect, interests: Interest[]) => {
        this.class_name = class_name;
        this.aspect = aspect;
        this.title = this.generateTitle();
        let themes: Theme[] = [];
        themes = themes.concat(class_name.themes)
        themes = themes.concat(aspect.themes);
        this.theme_keys = themes.map((x) => x.key);
        interests.forEach((interest) => { themes = themes.concat(interest.themes) });
        //assume companions aren't stuck at level 1 like you are plz
        themes.forEach((theme) => { this.addStats(theme.stats) });
        this.generateBackstory(themes, this.rand, 0);
        for (let i = 0; i < 3; i++) {
            this.inventory.push(this.generateItem());
        }
    }

    generateSkills = (themes: Theme[], rand: SeededRandom) => {
        if (this.skillGenAlg) {
            this.skills = this.skillGenAlg.generateSkills(this.class_name, this.aspect, this.interests, themes, rand);
            this.rootSkill = this.skills[0];
            this.rootSkill.unlocked = true;
            this.lastUnlockedSkill = this.rootSkill;
            this.skillGenAlg.assignSkillChildren(this.skills.filter((skill) => skill !== this.rootSkill), this.rootSkill, rand);
        }
    }

    generateBuildings = (themes: Theme[], rand: SeededRandom) => {
        this.buildings.push("Your House");
        this.buildingMetaData["Your House"] = new BuildingMetaData("Your House", themes, true, rand, []);
        this.current_location = this.buildings[0];
        for (let theme of themes) {
            const building: string = titleCase(rand.pickFrom(theme.getPossibilitiesFor(LOCATION)));
            this.metaDataForOneBuilding(building, themes, rand,false)
            this.buildings.push(building);
        }
        console.log("JR NOTE: building meta data is ", this.buildingMetaData)
        //this is ONLY useful for the actual game which is purposefully stupid hard to find. :)
        this.positionNeighbors();
    }

    metaDataForOneBuilding = (building: string, themes: Theme[], rand: SeededRandom, locked: boolean) => {
        const items = [];
        if (rand.nextDouble() > 0.3) {
            items.push(this.generateItem());
        }
        this.buildingMetaData[building] = new BuildingMetaData(building, themes, locked? !locked:rand.nextDouble() > 0.5, rand, items);
    }


    positionNeighbors = () => {
        let remaining = [...this.buildings];
        for (let buildingMeta of Object.values(this.buildingMetaData)) {
            const toRemove = buildingMeta.assignNeighbors(remaining);
            for (let r of toRemove) {
                //you should at LEAST be able to get back to where you're going plz.
                if (!this.buildingMetaData[r].neighbors.includes(buildingMeta.key)) {
                    this.buildingMetaData[r].neighbors.push(buildingMeta.key);
                }
                removeItemOnce(remaining, r);
            }
        }
    }

    generateCompanions = (rand: SeededRandom) => {
        let max = rand.getRandomNumberBetween(1, 5);
        if (this.theme_keys.includes(LONELY)) {
            max = 1;
        } else if (this.theme_keys.includes(FAMILY)) {
            max = max * 2;
        }
        for (let i = 0; i < max; i++) {
            this.companions.push(new Companion(rand));
        }
    }

    generateItem = () => {
        let themes: Theme[] = [];
        themes = themes.concat(this.class_name.themes)
        themes = themes.concat(this.aspect.themes);
        //since this is done on the fly, don't always allow interests in. focus on classpect.
        if (this.rand.nextDouble() > 0.3) {
            this.interests.forEach((interest) => { themes = themes.concat(interest.themes) });
        }
        const object_theme = this.rand.pickFrom(themes);
        if (this.rand.nextDouble() > 0.5) {
            return titleCase(object_theme.pickPossibilityFor(this.rand, OBJECT));
        } else {
            const modifier_theme = this.rand.pickFrom(themes);
            return titleCase(modifier_theme.pickPossibilityFor(this.rand, ADJ) + " " + object_theme.pickPossibilityFor(this.rand, OBJECT));
        }


    }

    generateBackstory = (themes: Theme[], rand: SeededRandom, num: number) => {
        if (this.backstory.length > 213 || num > 10) {
            this.backstory += ".";
            return;
        }
        let idea = "";
        let idea_seed;
        if (this.backstory.trim() === "") {
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(CHILDBACKSTORY));
            this.backstory = `${this.fullName} ${idea_seed}`;

        } else {
            idea_seed = rand.pickFrom(rand.pickFrom(themes).getPossibilitiesFor(GENERALBACKSTORY));

            if (num === 1) {
                const transitions = ["Now they", "These days they", "In the present, they", "They", "Nowadays they"];
                idea = `. ${rand.pickFrom(transitions)} ${idea_seed}`;

            } else if (rand.nextDouble() > 0.5) {
                const transitions = ["They", "They also", "Additionally, they", "They"];

                idea = `. ${rand.pickFrom(transitions)} ${idea_seed}`;
            } else {
                const connection = ["and", "yet", "but"];
                idea = `, ${rand.pickFrom(connection)} ${idea_seed}`;

            }
        }
        if (!this.backstory.includes(idea_seed)) {
            this.backstory += idea;
        }
        this.generateBackstory(themes, rand, num + 1);
    }

    generateTitle = () => {
        if (this.rand.nextDouble() > 0.5) {
            return `${this.class_name.chosen_name} of ${this.aspect.chosen_name}`
        } else {
            return `${this.aspect.chosen_name} ${this.class_name.chosen_name}`
        }
    }

    initStats = (rand: SeededRandom) => {
        for (const key of Object.keys(all_stats)) {
            //0 is baseline neutral human
            let values = [1, 0, -1];
            const skill = all_stats[key].copy(rand.pickFrom(values));
            this.stats[skill.positiveName] = skill;
        }
        this.addStats(this.aspect.stats);
        for (const interest of this.interests) {
            this.addStats(interest.stats);
        }
    }

    //for each stat in the new map, add its value to your stats.
    addStats = (stats: StatMap) => {
        for (const key of Object.keys(stats)) {
            const newStat = stats[key];
            this.addStat(newStat);
        }
    }

    addStat = (stat: Stat) => {
        this.stats[stat.positiveName].add(stat.value * this.class_name.stat_multiplier);
    }

    unlocked_skills_no_stats = () => { return this.skills.filter((skill) => { return skill.unlocked && (skill.type !== "StatSkill") }) };

    unlocked_skills = () => { return this.skills.filter((skill) => { return skill.unlocked }) };
    locked_skills = () => { return this.skills.filter((skill) => { return !skill.unlocked }) };

    canAffordSkill = (skill: Skill) => {
        return this.skillPoints >= skill.tier;
    }

    unlockSkill = (found: Skill) => {
        this.lastUnlockedSkill = found;
        found.unlocked = true;
        this.skillPoints += -1 * found.tier;
        if (found.type === "StatSkill") {
            console.log("its a state skill");
            const stat = (found as StatSkill).stat;
            this.addStat(stat);
        } else if (found.type === "WasteSkill") {
            console.log("its a waste skill :(");

            if ((window as any).haxMode) {
                //:) :) :)
                (window as any)[(found as WasteSkill).hackFunctionName](19191919);
            } else {
                (window as any).recordAction(HAX_FAIL, 1);
            }
        } else if (found.type === "CoreSkill") {
            console.log("its a core skill");
            this.observer.upgradeMenu(found.name);
        }
        this.checkIfCompletedSkillTree();
    }

    checkIfCompletedSkillTree = ()=>{
        for(let skill of this.skills){
            if(!skill.unlocked){
                console.log(`JR NOTE: still have ${this.locked_skills().length} to go!`);
                return false;
            }
        }
        (window as any).setCreditsMode(true);
    }

    addSkillPoints = (points: number) => {
        this.skillPoints += points;
        this.observer.skillPointsGainedFromMenu += points;
    }

    spawnNotAMinotaur = () => {
        const NotAMinotaur = new Companion(this.rand)
        NotAMinotaur.fullName = "ThisIsNotAMinotaur";
        NotAMinotaur.backstory = this.rand.pickFrom(this.collateThemes()).pickPossibilityFor(this.rand, PHILOSOPHY);
        NotAMinotaur.title = "False Minotaur";
        this.companions.push(NotAMinotaur);
    }

    spawnAMonster = () => {
        const monster = new Companion(this.rand)
        monster.fullName = "Shambling Horror With Your Face";
        const themes = this.collateThemes();

        monster.backstory = "It is a monster.";
        for(let theme of themes){
            monster.backstory += ` ${theme.pickPossibilityFor(this.rand, MONSTER_DESC)}`;
        }
        this.companions.push(monster);
    }

    findSkill = (skill_id: string) => {
        const found = this.skills.find((skill) => { return skill.cytoscapeID() === skill_id });
        if (found) {
            return found;
        }
        return null;
    }
}

export function randomPlayer(rand: SeededRandom, shadowPlayer = false) {
    //TODO if these values are set in the url params use those instead of the seed.
    let cl;
    //TODO should really make sure these are valid.
    let url_class: string | null = shadowPlayer ? null : getParameterByName("class", null);
    let url_aspect: string | null = shadowPlayer ? null : getParameterByName("aspect", null);
    let url_i1: string | null = shadowPlayer ? null : getParameterByName("interest1", null);
    let url_i2: string | null = shadowPlayer ? null : getParameterByName("interest2", null);

    if (rand.initial_seed === 13) {
        cl = all_classes["waste"];
    } else {
        cl = url_class ? all_classes[url_class] : rand.pickFrom(Object.values(all_classes_except_null));
    }
    let ap = url_aspect ? all_aspects[url_aspect] : rand.pickFrom(Object.values(all_aspects_except_null));
    let i1 = url_i1 ? all_interests[url_i1] : rand.pickFrom(Object.values(all_interests_except_null));
    let i2 = url_i2 ? all_interests[url_i2] : rand.pickFrom(Object.values(all_interests_except_null));

    cl = cl ? cl : all_classes["null"];
    ap = ap ? ap : all_aspects["null"];
    i1 = i1 ? i1 : all_interests["null"];
    i2 = i2 ? i2 : all_interests["null"];

    const ret = new Player(cl, ap, [i1, i2], rand, shadowPlayer);
    return ret;
}


//at first i thought positioning buildings was going to be hard but then i remembered
//im perfectly fine with "non euclidean" geometry.
export class BuildingMetaData {
    key: string;
    unlocked: boolean;
    neighbors: string[] = [];//you can move around.
    rand: SeededRandom;
    items: string[] = []; //you can find items.
    people: Companion[] = []; //you can meet randos.
    description: string = "test";
    smells: string[] = [];
    tastes: string[] = [];
    feelings: string[] = [];
    sounds: string[] = [];

    constructor(key: string, themes: Theme[], unlocked: boolean, rand: SeededRandom, items: string[]) {
        this.key = key;
        this.unlocked = unlocked;
        this.rand = rand;
        this.items = items;
        this.generateDescription(themes);
    }


    //JUST for game mode, don't risk leaning on this too much
    ///example "You see several math equations floating in the air as you get acclimated to the CLASSROOM.
    // There is a model anatomy skeleton in the corner.  There's a huge map of Zampanio on a wall."
    //"there is" or "you see",or "there's" is going to be added by the system. don't worry.
    generateDescription = (themes: Theme[]) => {
        let ret = `You see ${this.rand.pickFrom(themes).pickPossibilityFor(this.rand, LOC_DESC)}. `;
        const num = this.rand.getRandomNumberBetween(1, 3);
        for(let i = 0; i< 3; i++){
            const theme = this.rand.pickFrom(themes);
            if(themes.includes(all_themes[TWISTING])){
                console.log("JR NOTE: it tastes like purple");
                const scromble = [SMELL, SOUND, TASTE, FEELING];
                //tastes like purple is a common spiral trope. it is not what it is
                this.smells.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.sounds.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.tastes.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.feelings.push(theme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
            }else{
                this.smells.push(theme.pickPossibilityFor(this.rand, SMELL));
                this.sounds.push(theme.pickPossibilityFor(this.rand, SOUND));
                this.tastes.push(theme.pickPossibilityFor(this.rand, TASTE));
                this.feelings.push(theme.pickPossibilityFor(this.rand, FEELING));
            }
        }
        for (let i = 0; i < num; i++) {
            if (this.rand.nextDouble() > 0.3) {
                const connectors = ["There's", "There's also", "You also see"];
                ret += `${this.rand.pickFrom(connectors)} ${this.rand.pickFrom(themes).pickPossibilityFor(this.rand, LOC_DESC)}. `;
            } else {
                const non_visual_choices = [`The floor feels weirdly of ${this.rand.pickFrom(this.feelings)}.`, `You almost gag against the taste of ${this.rand.pickFrom(this.tastes)}.`, `You almost have to cover your ears to drown out the unending sound of ${this.rand.pickFrom(this.sounds)}.`, `The reek of ${this.rand.pickFrom(this.smells)} permeates the air.`];
                ret += `${this.rand.pickFrom(non_visual_choices)}`;
            }
        }

        this.description = ret;
    }

    debug=()=>{
        return `key: ${ this.key }, unlocked: ${ this.unlocked }, neighbors: ${ this.neighbors.join(", ") }, items: ${ this.items.join(", ") }, companions: ${ this.people.join(", ") }
            } `;
    }

    beEntered = (player: Player)=>{
        console.log("JR NOTE: ", this.key, " is entered");
        this.people = [];
        if(this.neighbors.length < 3){
            if(player.rand.nextDouble()>0.5){
                const theme = player.rand.pickFrom(Object.values(all_themes));
                const building:string = titleCase(player.rand.pickFrom(theme.getPossibilitiesFor(LOCATION)));
                //one new random theme but the rest just from player.
                player.metaDataForOneBuilding(building,[theme, ...player.collateThemes()], player.rand,true);
                this.neighbors.push(building);
                player.buildingMetaData[building].neighbors.push(this.key);
                console.log("JR NOTE: ", this.key, " needs a new neighbor.");

            }
        }

        if(player.rand.nextDouble()>0.4){
            this.people.push(player.rand.pickFrom(player.companions));
        }
        if(player.companions.length === 0){
            player.spawnNotAMinotaur();
        }else if(player.companions.length === 1 && player.companions[0].fullName.includes("Minotaur")){
            player.spawnAMonster();
        }

    }

    assignNeighbors = (possible_neighbor_keys:string[])=>{
        if(possible_neighbor_keys.length ===0){
            return [];
        }
        //you can only go straight or right. its a spiral
        const num = this.rand.getRandomNumberBetween(1,3);
        for(let i=0; i<num; i++){
            const choice = this.rand.pickFrom(possible_neighbor_keys);
            if(!this.neighbors.includes(choice)){
                this.neighbors.push(choice);
            }
        }
        return [...this.neighbors]; //copy just in case
    }
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
    inventory:string[];
    fullName = "They"; //can write it in or companions will auto set it

    constructor(rand: SeededRandom){
        const shadowPlayer = randomPlayer(rand, true);
        this.title = shadowPlayer.title;
        this.backstory = shadowPlayer.backstory;
        const first_names = ["Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
        const last_names = ["Researcher","Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
        this.fullName = `${ rand.pickFrom(first_names) } ${ rand.pickFrom(last_names) } `;
        this.theme_keys = shadowPlayer.theme_keys;//needed for shoving them into quests
        this.loyalty = shadowPlayer.stats[LOYAL].value;
        this.inventory = shadowPlayer.inventory;
    }

    toString=()=>{
        return this.fullName;
    }



}