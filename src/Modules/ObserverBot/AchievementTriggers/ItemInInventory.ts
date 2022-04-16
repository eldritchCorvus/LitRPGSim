import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class ItemInInventory extends AchievementTrigger{
    itemPart: string;

    constructor(itemPart: string){
        super();
        this.itemPart  = itemPart;
    }

    toString = ()=>{
        return `AN ITEM CALLED ${[this.itemPart]} MUST BE IN YOUR INVENTORY`;
    }

    triggered = (observer: ObserverBot )=>{
        for(let item of observer.player.inventory){
            if(item.includes(this.itemPart)){
                return true;
            }
        }
        return false;
    }

}