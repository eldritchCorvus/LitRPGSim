import { AchievementTrigger } from "../ObserverBot/AchievementTriggers/AchievementTrigger";
import { Reward } from "./Rewards/GenericReward";

export  class QuestObject{
    title: string;
    flavorText: string;
    completionText: string;
    turnInTrigger: AchievementTrigger;
    unlockTrigger: AchievementTrigger;
    reward: Reward;
    completed: boolean;



    constructor(title:string, flavorText: string, completionText: string, unlockTrigger: AchievementTrigger,turnInTrigger: AchievementTrigger, reward: Reward){
        this.title = title;
        this.flavorText = flavorText;
        this.completionText = completionText;
        this.turnInTrigger = turnInTrigger;
        this.unlockTrigger = unlockTrigger;
        this.reward = reward;
        this.completed = false;
    }

    setCompleted = ()=>{
        this.completed = true;
    }
}


