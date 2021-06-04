import { AchievementTrigger } from "./AchievementTriggers/AchievementTrigger";
import AchivementPopupKickoff from "./AchivementPopup";
import { ObserverBot } from "./ObserverBot";

export  class Achievement{
    trigger: AchievementTrigger;
    aboveComment:string;
    belowComment: string;
    title: string;
    unlocked = false;

    /*
    TODO how will this tie back into the screen? ReactDom.render and teardown a popup? make a sub class, don't infect this with jsx
    */

    constructor(title: string, trigger: AchievementTrigger, aboveComment: string, belowComment: string){
        this.title = title;
        this.trigger = trigger;
        this.aboveComment = aboveComment;
        this.belowComment = belowComment;
    }

    checkForUnlock = (observer:ObserverBot)=>{
        if(this.trigger.triggered(observer)){
            this.unlocked = true;
            AchivementPopupKickoff({title: this.title, text: this.aboveComment});
            observer.belowComment(this.title, this.belowComment);
        }
    }

    




}