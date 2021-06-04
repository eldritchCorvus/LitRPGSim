import { ObserverBot } from "../ObserverBot";

export  class AchievementTrigger{
    /*
        TODO: make this a generic parent class for specific triggers.
        first trigger i'll implement is "number of times clicked."
    */
   /*
   trigger ideas:
    * spent x amount of time in menu
   * got first stat above threshold Y
   * got a specific stat x% higher than any other stat (this is NOT good)
   * have x total skills unlocked
   * first time flipped a stats value from positive to negative
   * have x skill points hoarded in total
   * unlocked your first super skill
   * unlocked your first skill
   * raised your first stat point
   * viewed your skill graph
   * time spent in status screen
   * time spent in skill screen
   * time spent in achievement screen
   * time spent "walking" (it thinks holding wasd or arrows is walking)
   * calling any of the hack methods in window
   */

   triggered = (observer: ObserverBot )=>{
       return true; //JR NOTE: children will overwrite this
   }
}