import { ObserverBot } from "../ObserverBot";

export  class AchievementTrigger{


   toString = ()=>{
       return "AUTO UNLOCK";
   }

   triggered = (observer: ObserverBot )=>{
       return true; //JR NOTE: children will overwrite this
   }
}