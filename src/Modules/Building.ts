//at first i thought positioning buildings was going to be hard but then i remembered

import { Theme } from "@emotion/react";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import { Companion, Player } from "./Player";
import { all_themes } from "./Theme";
import { LOC_DESC, TWISTING, SMELL, SOUND, TASTE, FEELING, LOCATION } from "./ThemeStorage";

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

    constructor(key: string, themes: Theme[]|null, unlocked: boolean, rand: SeededRandom, items: string[]) {
        this.key = key;
        this.unlocked = unlocked;
        this.rand = rand;
        this.items = items;
        if(themes){
            this.generateDescription(themes);
        }
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


export class TempleMetaData extends BuildingMetaData{
    constructor(key: string, description: string, smells: string[], tastes: string[], feelings:string[], sounds:string[],  rand: SeededRandom, items:string[]){
        super(key, [],true, rand, items);
    }
} 