import { AchievementTrigger } from "../ObserverBot/AchievementTriggers/AchievementTrigger";

export  class QuestObject{
    title: string;
    flavorText: string;
    completionText: string;
    turnInTrigger: AchievementTrigger;
    unlockTrigger: AchievementTrigger;



    constructor(title:string, flavorText: string, completionText: string, unlockTrigger: AchievementTrigger,turnInTrigger: AchievementTrigger){
        this.title = title;
        this.flavorText = flavorText;
        this.completionText = completionText;
        this.turnInTrigger = turnInTrigger;
        this.unlockTrigger = unlockTrigger;
    }

}


