//It seems my reporting abilities are needed.

import { Player } from "../Player";
import { all_themes } from "../Theme";
import { COMPLIMENT, INSULT } from "../ThemeStorage";
import { Achievement } from "./Achievement";
import { AchievementTrigger } from "./AchievementTriggers/AchievementTrigger";
import { NumberClicksTrigger } from "./AchievementTriggers/NumberClicks";
import {STATUS, LOADING, SKILLGRAPH} from "../../Utils/constants";
import SeededRandom from "../../Utils/SeededRandom";
import { MenuClicksTrigger } from "./AchievementTriggers/MenuClicks";

export const CLICK = "CLICK";
export const WALK = "WALK";
export const JUMP = "JUMP";
export const SKIP = "SKIP";
export const UNLOCK_SKILL = "UNLOCK_SKILL";
export const ERROR = "ERROR";

export type ActionType = 'CLICK'|'WALK'|'JUMP'|'SKIP'|'UNLOCK_SKILL'|'ERROR';


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
    menuItemsClicked:string[] =[];  //TODO
    errors = 0; //:) :) :) 
    possibleAchievements:Achievement[] = [];
    player: Player;
    
    unlocked_achivements = () =>{return this.possibleAchievements.filter((achievement) =>  {return achievement.unlocked })};


    constructor(player: Player){
        this.player = player;
        this.initAchievements();
        //yes its a poor mans redux, whatever
        (window as any).recordAction =(action: ActionType, value: number)=>{
            if(action == CLICK){
                this.incrementStat("numClicks", value);
            }
        }

        (window as any).menuClick =(menu: string)=>{
            console.log("MENU CLICK", menu,this.menuItemsClicked);
            if(!this.menuItemsClicked.includes(menu)){
                console.log("ADDING ")
                this.menuItemsClicked.push(menu);
                this.checkForAchievements();
            }
        }
        window.onclick = ()=>{
            (window as any).recordAction(CLICK,1)
        }
    }

    initAchievements = () =>{
        //you get this one just for playing.
        //TODO have observer bot have custom insults/compliments based on your themes.
        const rand = this.player.rand;
        const themes = this.player.theme_keys;

        let compliments = all_themes[rand.pickFrom(themes)].getPossibilitiesFor(COMPLIMENT);
        let insults = all_themes[rand.pickFrom(themes)].getPossibilitiesFor(INSULT);
        const tmp = new Achievement("A Saga Begins!", new AchievementTrigger(),`Congratulations and welcome to your new, ${rand.pickFrom(compliments)} life in the wonderful world of Zampanio! Feel free to spend as much time as you need to get used to the status screens and menus, and then your journey begins! `,`It seems that we will be stuck with each other for the foreseable future. ${this.player.theme_keys.join(",")}? Really? How ${rand.pickFrom(insults)}. Do try to keep me entertained. `);
        this.possibleAchievements.push(tmp);
        this.initClicks(rand, compliments, insults);
        this.initMenuClicks(rand, compliments, insults);


    }

    initClicks = (rand: SeededRandom, compliments:string[], insults:string[])=>{
        const values = [1,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                1: `Way to work that mouse button, you ${rand.pickFrom(compliments)} person, you!`,
                10: "You're really getting going! Enjoying the menu, are you?",
                100: "Wow, you're really cautious! Don't worry, the wonderful world of Zampanio will wait for you!",
                1000: "... Seriously? Why aren't you playing..."
            },
            clickBelow: {
                1: "... Yes. You managed to click the mouse button. Once. I'm so happy for you.",
                10: "Really. is the menu THAT interesting to you?",
                100: "...Is something going on. Are you pranking me? Is something broken...",
                1000: "Oh god. It seems something is broken. It HAS to be something you did. This setting was PERFECT."
            }

        }
        for(const value of values){
            const tmp = new Achievement(`${value} Menu Clicks!`, new NumberClicksTrigger(value),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    initMenuClicks = (rand: SeededRandom, compliments:string[], insults:string[]) => {
        const values = [STATUS,LOADING,SKILLGRAPH];
        interface AchievementTextMapInner {
            [details: string] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                STATUS: `The status screen is where you'll find all sorts of information on your new life! Don't worry if it seems a little overwhelming, it will all make sense in time!`,
                LOADING: "Loading screens give you fun little tips and tricks to make the game easier for you!",
                SKILLGRAPH: "Unlock SKILLS with SKILLPOINTS and gain power! The wonderful world of Zampanio can be tricky without a little help!",
            },
            clickBelow: {
                STATUS: `Whoopee. It seems you're especially ${rand.pickFrom(insults)}. I blame the fact that you're a ${this.player.class_name.chosen_name} of ${this.player.aspect.chosen_name}.  And no, I won't be explaining what that means.`,
                LOADING: "There is a 99.9999% chance that you'll be getting used to seeing this screen. Settle in.",
                SKILLGRAPH: "Ah, is there anything more symbolic of endless lust for power than a classic RPG skillgraph? Feel free to obsess over this.",
            }

        }
        for(const value of values){
            const tmp = new Achievement(`First ${value} Menu Visit!!!`, new MenuClicksTrigger(value),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    /*
        TODO have any change to any of these variables call the achievement system to see if any achievement has been earned.
    */
    incrementStat = (statName:string, value: number)=>{
        (this as any)[statName] += value;
        this.checkForAchievements();
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