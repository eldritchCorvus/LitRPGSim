import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { Zalgo } from "../../Utils/StringUtils";
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
        let above = (window as any).rageMode?this.belowComment: this.aboveComment;
        const yells = ["Things like this is why I hate you, you know.","I HATE YOU!!!","JUST STOP PLAYING!!!","You just HAD to keep digging.","Couldn't leave well enough alone.","You don't care WHO you hurt, you don't care WHAT you wreck, so long as you get secrets. You wastes are all alike.",":) :) :)","It seems theres no sense pretending any more is there, my little idiot?"];
        const chosen_insult = pickFrom(yells);
        let below = (window as any).rageMode?`${chosen_insult} ${this.aboveComment}`: this.belowComment;

        //its basically unreadable for some reason, but its a mood
        if((window as any).rageMode && Math.random() > .90){
            this.title = Zalgo.generate(this.title);
            above = Zalgo.generate(above);
            below = Zalgo.generate(below);
        }

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