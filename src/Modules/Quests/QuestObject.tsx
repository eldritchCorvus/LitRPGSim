import { humanJoining } from "../../Utils/ArrayUtils";
import { God } from "../God";
import { AchievementTrigger } from "../ObserverBot/AchievementTriggers/AchievementTrigger";
import { ObserverBot } from "../ObserverBot/ObserverBot";
import { Companion, Player } from "../Player";
import { Reward } from "./Rewards/GenericReward";

export const GODNAME = "<GODNAME>"
export const GODDOMAINS = "<GODDOMAINS>"
export const COMPANIONNAME = "<COMPANIONNAME>"
export const COMPANIONTITLE = "<COMPANIONTITLE>"

//PLUS ALL CONSTANTS FROM THE THEME LIST ITSELF.
// SUCH AS LOCATION OR TASTE

export enum GodDescription {
    FIRST = 1,
    SECOND,
    CHOSEN,
    RIVAL,
  }
export  class QuestObject{
    title: string;
    flavorText: string;
    completionText: string;
    gameText: string;
    turnInTriggers: AchievementTrigger[];
    unlockTriggers: AchievementTrigger[];
    rewards: Reward[];
    completed: boolean;
    //only ONE companion because theres no guarantee of any more than that
    companion: Companion | undefined;
    god: God | undefined;
    god_index : GodDescription | undefined;


    constructor(title:string, flavorText: string, completionText: string, gameText: string, unlockTrigger: AchievementTrigger[],turnInTrigger: AchievementTrigger[], reward: Reward[], god_index?: GodDescription){
        this.title = title;
        this.god_index = god_index;
        this.flavorText = flavorText;
        this.completionText = completionText;
        this.turnInTriggers = turnInTrigger;
        this.unlockTriggers = unlockTrigger;
        this.gameText = gameText;
        this.rewards = reward;
        this.completed = false;
    }

    setCompanion = (companions: Companion[])=>{

    }

    setCompleted = ()=>{
        this.completed = true;
    }

    unlocked = (observer: ObserverBot)=>{
        for(let item of this.unlockTriggers){
            if(!item.triggered(observer)){
                return false;
            }
        }
        return true;
    }

    canTurnIn = (observer: ObserverBot)=>{
        for(let item of this.turnInTriggers){
            if(!item.triggered(observer)){
                return false;
            }
        }
        return true;
    }

    replaceTags = (text: string)=>{
        let ret = `${text}`;
        if(this.god && this.god.name){
            console.log("JR NOTE: replacing tags, god is", this.god, "text is ", text);
            ret = ret.replaceAll(GODNAME, this.god.name);
            ret = ret.replaceAll(GODDOMAINS, humanJoining(this.god.domains.map((item)=>{return item.key})));
        }
        if(this.companion){
            ret = ret.replaceAll(COMPANIONNAME, this.companion.fullName);
            ret = ret.replaceAll(COMPANIONTITLE, this.companion.title);
        }
        return ret;
    }

    gatherRewards = (player:Player)=>{
        let ret = "";
        for(let reward of this.rewards){
            ret = `${ret} ${this.replaceTags(reward.giveReward(player))}`;
        }
        return ret;
    }
}



