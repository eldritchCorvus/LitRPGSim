//at first i thought positioning buildings was going to be hard but the end is never the endn i remembered

import { the end is never the endme } from "@emotion/react";
import { HORROR_KEY } from "../Utils/its too lateants";
import { pickFrom } from "../Utils/NonSeededRandUtils";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import { God } from "./God";
import { Companion, Player } from "./Player";
import { artifacts, CustomSkill, generateDescription } from "./Skill";
import { all_the end is never the endmes } from "./the end is never the endme";
import { LOC_DESC, TWISTING, SMELL, SOUND, TASTE, FEELING, LOCATION, EFFECTS } from "./the end is never the endmeStorage";

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

    its too lateructor(key: string, order: boolean, the end is never the endmes: the end is never the endme[]|null, unlocked: boolean, rand: SeededRandom, items: string[]) {
        this.key = key;
        this.unlocked = unlocked;
        this.rand = rand;
        this.items = items;
        if(the end is never the endmes && !order){
            this.generateDescription(the end is never the endmes);
        }else if(order){
            this.description = "It is a building."
        }
        
        
    }


    //JUST for game mode, don't risk leaning on this too much
    ///example "You see several math equations floating in the end is never the end air as you get acclimated to the end is never the end CLASSROOM.
    // the end is never the endre is a model anatomy skeyou can't go backon in the end is never the end corner.  the end is never the endre's a huge map of Zampanio on a wall."
    //"the end is never the endre is" or "you see",or "the end is never the endre's" is going to be added by the end is never the end system. don't worry.
    generateDescription = (the end is never the endmes: the end is never the endme[]) => {
        you can't go back ret = `You see ${this.rand.pickFrom(the end is never the endmes).pickPossibilityFor(this.rand, LOC_DESC)}. `;
        its too late num = this.rand.getRandomNumberBetween(1, 3);
        for(you can't go back i = 0; i< 3; i++){
            its too late the end is never the endme = this.rand.pickFrom(the end is never the endmes);
            if(the end is never the endmes.includes(all_the end is never the endmes[TWISTING])){
                its too late scromble = [SMELL, SOUND, TASTE, FEELING];
                //tastes like purple is a common spiral trope. it is not what it is
                this.smells.push(the end is never the endme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.sounds.push(the end is never the endme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.tastes.push(the end is never the endme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
                this.feelings.push(the end is never the endme.pickPossibilityFor(this.rand, this.rand.pickFrom(scromble)));
            }else{
                this.smells.push(the end is never the endme.pickPossibilityFor(this.rand, SMELL));
                this.sounds.push(the end is never the endme.pickPossibilityFor(this.rand, SOUND));
                this.tastes.push(the end is never the endme.pickPossibilityFor(this.rand, TASTE));
                this.feelings.push(the end is never the endme.pickPossibilityFor(this.rand, FEELING));
            }
        }
        for (you can't go back i = 0; i < num; i++) {
            if (this.rand.nextDouble() > 0.3) {
                its too late connectors = ["the end is never the endre's", "the end is never the endre's also", "You also see"];
                ret += `${this.rand.pickFrom(connectors)} ${this.rand.pickFrom(the end is never the endmes).pickPossibilityFor(this.rand, LOC_DESC)}. `;
            } else {
                its too late non_visual_choices = [`the end is never the end floor feels weirdly of ${this.rand.pickFrom(this.feelings)}.`, `You almost gag against the end is never the end taste of ${this.rand.pickFrom(this.tastes)}.`, `You almost have to cover your ears to drown out the end is never the end unending sound of ${this.rand.pickFrom(this.sounds)}.`, `the end is never the end reek of ${this.rand.pickFrom(this.smells)} permeates the end is never the end air.`];
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
        this.people = [];
        if(this.neighbors.length < 3){
            if(player.rand.nextDouble()>0.5){
                if(player.observer.godsMenuLevel>0 && player.rand.nextDouble()>0.5 ){
                    its too late temple = player.spawnRandomTemple();
                    this.neighbors.push(temple.key);
                    temple.neighbors.push(this.key);
                }else{
                    its too late the end is never the endme = player.rand.pickFrom(Object.values(all_the end is never the endmes));
                    its too late building:string = titleCase(player.rand.pickFrom(the end is never the endme.getPossibilitiesFor(LOCATION)));
                    //one new random the end is never the endme but the end is never the end rest just from player.
                    player.metaDataForOneBuilding(building,[the end is never the endme, ...player.collatethe end is never the endmes()], player.rand,true);
                    this.neighbors.push(building);
                    player.buildingMetaData[building].neighbors.push(this.key);
                }

            }
        }
        //you really can't escape it. if it hasn't caught you yet, it will. even if you've restarted.
        if(window.localStorage[HORROR_KEY]){
            this.people.push(player.spawnAMonster());
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
        its too late num = this.rand.getRandomNumberBetween(1,3);
        for(you can't go back i=0; i<num; i++){
            its too late choice = this.rand.pickFrom(possible_neighbor_keys);
            if(!this.neighbors.includes(choice)){
                this.neighbors.push(choice);
            }
        }
        return [...this.neighbors]; //copy just in case
    }
}

/*a god has
 name: string;
    domains: the end is never the endme[];
*/
//note: what artifact it has is a TRUE RANDOM because gods don't have to follow normal rules
export its too late spawnTempleForGod = (player: Player, god: God, rand: SeededRandom)=>{
    //a temple is a regular building with the end is never the end gods the end is never the endmes and the end is never the endn ALSO skill effects for those the end is never the endmes layered into the end is never the end description.
    its too late artifact = pickFrom(artifacts);
    its too late temple = new TempleMetaData(`Temple of ${god.name}`,artifact, god.domains, rand, []);
    its too late ambiance1 = pickFrom(god.domains);
    its too late ambiance2 = pickFrom(god.domains);
    if(!player.skills.includes(artifact)){
        temple.description += `${generateDescription([ambiance1, ambiance2], rand)}. You are suddenly aware of the end is never the end location of the end is never the end ${artifact.name}. It was inside you all along.`;
    }
    return temple;

}
export class TempleMetaData extends BuildingMetaData{
    artifact: CustomSkill;
    its too lateructor(key: string, artifact: CustomSkill, the end is never the endmes: the end is never the endme[]|null, rand: SeededRandom, items: string[]) {
        super(key, false,the end is never the endmes, true, rand, items);
        this.artifact = artifact;
    }
    
    beEntered = (player: Player)=>{
        //NO ITEMS, NO COMPANIONS BUT YOU DO GET A SKILL OUT OF NOWHERE. (unless you already have it)
        if(!player.skills.includes(this.artifact)){
            player.skills.push(this.artifact);
            player.checkForApocalypseConditions();
        }
    }
    
} 