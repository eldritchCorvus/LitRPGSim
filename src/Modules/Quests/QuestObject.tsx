import { AchievementTrigger } from "../ObserverBot/AchievementTriggers/AchievementTrigger";
import { ObserverBot } from "../ObserverBot/ObserverBot";
import { Player } from "../Player";
import { Reward } from "./Rewards/GenericReward";

export const GODNAME1 = "<GODNAME1>"
export const GODNAME2 = "<GODNAME2>"
export const GODDOMAINS1 = "<GODDOMAINS1>"
export const GODDOMAINS2 = "<GODDOMAINS2>"
export const PARTYMEMBER1 = "<PARTYMEMBER1>"
export const PARTYMEMBER2 = "<PARTYMEMBER2>"
export const PARTYMEMBER3 = "<PARTYMEMBER3>"
//PLUS ALL CONSTANTS FROM THE THEME LIST ITSELF.
// SUCH AS LOCATION OR TASTE




export  class QuestObject{
    title: string;
    flavorText: string;
    completionText: string;
    gameText: string;
    turnInTriggers: AchievementTrigger[];
    unlockTriggers: AchievementTrigger[];
    rewards: Reward[];
    completed: boolean;



    constructor(title:string, flavorText: string, completionText: string, gameText: string, unlockTrigger: AchievementTrigger[],turnInTrigger: AchievementTrigger[], reward: Reward[]){
        this.title = title;
        this.flavorText = flavorText;
        this.completionText = completionText;
        this.turnInTriggers = turnInTrigger;
        this.unlockTriggers = unlockTrigger;
        this.gameText = gameText;
        this.rewards = reward;
        this.completed = false;
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

    gatherRewards = (player:Player)=>{
        let ret = "";
        for(let reward of this.rewards){
            ret = `${ret} ${reward.giveReward(player)}`;
        }
        return ret;
    }
}



