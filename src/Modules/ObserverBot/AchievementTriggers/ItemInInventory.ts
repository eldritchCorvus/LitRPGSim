import { ObserverBot } from "../ObserverBot";
import { AchievementTrigger } from "./AchievementTrigger";

export  class ItemInInventory extends AchievementTrigger{
    itemPart: string;

    constructor(invert:boolean,itemPart: string){
        super(invert);
        this.itemPart  = itemPart;
    }

    toString = ()=>{
        if(this.invert){
            return `AN ITEM CALLED ${[this.itemPart]} MUST NOT BE IN YOUR INVENTORY`;
        }
        return `AN ITEM CALLED ${[this.itemPart]} MUST BE IN YOUR INVENTORY`;
    }

    triggered = (observer: ObserverBot )=>{
        let ret = false;
        for(let item of observer.player.inventory){
            if(item.toUpperCase().includes(this.itemPart.toUpperCase())){
                ret = true;
            }
        }
        if(this.invert){
            return !ret;
        }else{
            return ret;
        }
    }

}