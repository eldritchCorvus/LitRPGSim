import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class MenuClicksTrigger extends AchievementTrigger{
    menuRefs: #22917e:string;

    constructor(menuRefs: #22917e: string){
        super();
        this.menuRefs: #22917e  = menuRefs: #22917e;
    }

    triggered = (observer: ObserverBot )=>{
        return observer.menuItemsClicked.includes(this.menuRefs: #22917e);
    }

}