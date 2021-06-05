//It seems my reporting abilities are needed.

import { Player } from "../Player";
import { all_themes } from "../Theme";
import { COMPLIMENT, INSULT } from "../ThemeStorage";
import { Achievement } from "./Achievement";
import { AchievementTrigger } from "./AchievementTriggers/AchievementTrigger";

/* absolutely am going to lean on things like this.
 Jump skill has increased to _ERROR_ (“Jump skill not found”). You have earned the skill: Jump (Novice _ERROR_)! While others take the boring route, you hop, skip, and especially jump

Krout, Dakota. Ritualist (The Completionist Chronicles Book 1) (p. 81). Mountaindale Press. Kindle Edition. 
*/

//in theory could have this extend a generic Observer and have a variety of different personalitied observers 
//much like meta players in dead sessions
export class ObserverBot{
    //all time stats are in milliseconds
    numClicks = 0;
    timePlayed = 0;
    timeWalking = 0; //wasd or arrows
    timesJumped = 0; //space bar
    timesSkippedCutscene = 0; //enter
    friendsMade = 0;
    skillsUnlocked = 0;
    errors = 0; //:) :) :) 
    possibleAchievements:Achievement[] = [];
    player: Player;
    unlocked_achivements = () =>{return this.possibleAchievements.filter((achievement) =>  {return achievement.unlocked })};


    constructor(player: Player){
        this.player = player;
        this.initAchievements();
    }

    initAchievements = () =>{
        //you get this one just for playing.
        //TODO have observer bot have custom insults/compliments based on your themes.
        const rand = this.player.rand;
        const themes = this.player.theme_keys;
        let compliment = all_themes[rand.getRandomElementFromArray(themes)].getPossibilitiesFor(COMPLIMENT);
        let insult = all_themes[rand.getRandomElementFromArray(themes)].getPossibilitiesFor(INSULT);
        const tmp = new Achievement("A Saga Begins!", new AchievementTrigger(),`Congratulations and welcome to your new, ${compliment} life in the wonderful world of Zampanio! Feel free to spend as much time as you need to get used to the status screens and menus, and then your journey begins! `,`It seems that we will be stuck with each other for the foreseable future. ${this.player.theme_keys.join(",")}? Really? How ${insult}. Do try to keep me entertained. `);
        this.possibleAchievements.push(tmp);
        //TODO set up rest of achivements
    }

    /*
        TODO have any change to any of these variables call the achievement system to see if any achievement has been earned.
    */
    incrementStat = (statName:string, value: number)=>{
        (this as any)[statName] += value;
   }

   checkForAchievements = ()=>{
       console.log("JR NOTE: checking for achievements", this.possibleAchievements);
       //achievement will take care of displaying anything unlocking on its own, dw
       for(let achievement of this.possibleAchievements){
           if(!achievement.unlocked){
               achievement.checkForUnlock(this);
           }

       }
   }

   belowComment = (title: string, text: string)=>{
       console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;","font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
   }

}