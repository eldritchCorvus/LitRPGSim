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

    display = (observer:ObserverBot) =>{
        const above = (window as any).rageMode?this.belowComment: this.aboveComment;
        const below = (window as any).rageMode?"I HATE YOU!!!": this.belowComment;

        AchivementPopupKickoff({title: this.title, text: above});
        observer.belowComment(this.title, below);
    }

    checkForUnlock = (observer:ObserverBot)=>{
        if(this.trigger.triggered(observer)){
            this.unlocked = true;
            this.display(observer);
        }
    }

    




}