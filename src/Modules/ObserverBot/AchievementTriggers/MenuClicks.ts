import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class MenuClicksTrigger extends AchievementTrigger{
    menuName:string;

    constructor(invert:boolean,menuName: string){
        super(invert);
        this.menuName  = menuName;
    }

    toString = ()=>{
        if(this.invert){
            return `MUST NOT HAVE VISITED THE ${this.menuName} MENU`;
        }
        return `MUST HAVE VISITED THE ${this.menuName} MENU`;
    }

    triggered = (observer: ObserverBot )=>{
        const ret = observer.menuItemsClicked.includes(this.menuName);
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}