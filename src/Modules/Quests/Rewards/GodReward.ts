import { Companion, Player } from "../../Player";
import { QuestObject } from "../QuestObject";
import { Reward } from "./GenericReward";

export  class GodReward extends Reward{
    godIndex: number;

    toString = ()=>{
        return `You recieve a blessing from your god!`;
    }

    constructor(godIndex: number){
        super();
        this.godIndex = godIndex;
    }

    //your chosen god is now this god and your gods menu level has increased
    giveReward = (player: Player, quest:QuestObject)=>{
        const god = player.gods[this.godIndex];
        let ret = `${god.name} blesses you!`;
        player.chooseGod(god);
        player.observer.godsMenuLevel ++;
        return ret;
    }
 }