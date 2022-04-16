import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class MenuClicksTrigger extends AchievementTrigger{
    menuName:string;

    constructor(menuName: string){
        super();
        this.menuName  = menuName;
    }

    toString = ()=>{
        return `MUST HAVE VISITED THE ${this.menuName} MENU`;
    }

    triggered = (observer: ObserverBot )=>{
        return observer.menuItemsClicked.includes(this.menuName);
    }

}