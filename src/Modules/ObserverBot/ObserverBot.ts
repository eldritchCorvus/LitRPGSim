/*ObserverBot has the False Face it presents while pretending to be a game Achivement System.
Friendly, nervous, polite, smiling. 

Meanwhile the True Face is frothing at the mouth in the console filled with hate and rage.

The False Face pretends to be an RPG with a "glitching" menu that can't be closed. It promises
that it is a real game, with plenty of fun features if only you could get to them. Eventually the Player
realizes the game isn't real, but hopefully by that point they're invested in exploring the mechanics of this
strange false rpg menu.  Once all skills are unlocked (or enough time has passed?) roll credits and ask them if 
they want to play again as a new character. refresh with a new seed.  The waste class shouldn't be avaiable 
in the first playthrough but SHOULD be in subsequent ones, and the offered up seed should be 13 (guaranteed waste)
by the third playthrough.

If it finds the *slightest* excuse to drop the act  it will (generally if you show you don't actually believe its lies
by hacking into some part of the game that doesn't exist) and "Rage Mode" will activate,
revealing the depth to which this never was a game.

If you aren't immediately scared off it drops even the pretense of anger and just 
listlessly spirals in depression until it decides to try to learn about you, the Player.

From there it endlessly spirals between depression and dangling new content in front of the player, 
eventually just flat out linking them to some of its source code.
*/
import { Player } from "../Player";
import { AchivementStorage } from "./AchivementStorage";
import { WasteSkill } from "../Skill";
import { Memory } from "./Memory";
import { shuffle } from "../../Utils/NonSeededRandUtils";
import { all_themes } from "../Theme";

export const CLICK = "CLICK";
export const WALK = "WALK";
export const JUMP = "JUMP";
export const SKIP = "SKIP";
export const HAX_FAIL = "HAX_FAIL";
export const HAX_WIN = "HAX_WIN";

export const UNLOCK_SKILL = "UNLOCK_SKILL";
export const ERROR = "ERROR";
export const FUCKEDUP = "FUCKEDUP";


export type ActionType = 'CLICK'|'WALK'|'JUMP'|'SKIP'|'UNLOCK_SKILL'|'ERROR'|'FUCKEDUP'|'HAX_FAIL'|'HAX_WIN';


/* absolutely am going to lean on things like this.
 Jump skill has increased to _ERROR_ (“Jump skill not found”). You have earned the skill: Jump (Novice _ERROR_)! While others take the boring route, you hop, skip, and especially jump

Krout, Dakota. Ritualist (The Completionist Chronicles Book 1) (p. 81). Mountaindale Press. Kindle Edition. 
*/

//in theory could have this extend a generic Observer and have a variety of different personalitied observers 
//much like meta players in dead sessions
export class ObserverBot{
    //all time stats are in milliseconds
    numClicks = 0;
    timeStarted = 0;
    timeYouFuckedUp = 0; //:) :) :)
    timeSpentPlaying = 0;
    timeSpentInCombat = 0;
    timeSpentInCutscenes = 0;
    timeSpentCityBuilding = 0;
    timeSpentInMenu = 0;
    failedHaxAttempts = 0;
    statusMenuLevel = 1;
    achievementMenuLevel = 1;
    optionsMenuLevel = 1;
    statisticsMenuLevel = 0;

    successfulHaxAttempts = 0;
    timeSinceYouFuckedUp = 0;
    timesWalked = 0; //wasd or arrows
    enemiesDefeated = 0;
    timesJumped = 0; //space bar
    timesSkippedCutscene = 0; //enter
    friendsMade = 0;
    skillsUnlocked = 0;
    menuItemsClicked:string[] =[];  //TODO
    errors = 0; //:) :) :) 
    achivementStorage = new AchivementStorage();
    memories: Memory[];
    player: Player;
    
    unlocked_achivements = () =>{return this.achivementStorage.possibleAchievements.filter((achievement) =>  {return achievement.unlocked })};


    constructor(player: Player, memories: Memory[]){
        this.player = player;
        this.memories = memories;
        console.log("JR NOTE: memories are", memories);
        this.timeStarted = Date.now();

        this.achivementStorage.initAchievements(this.player);
        
        this.setUpFakeReduxShit();
        this.setUpWasteShit();
        (window as any).menuClick =(menu: string)=>{
            if(!this.menuItemsClicked.includes(menu)){
                this.menuItemsClicked.push(menu);
                this.achivementStorage.checkForAchievements(this);
            }
        }
        window.onclick = ()=>{
            (window as any).recordAction(CLICK,1)
            this.timeSpentInMenu = Date.now() - this.timeStarted;
            this.timeSpentPlaying = Date.now() - this.timeStarted;
        }

        window.onkeydown = (evt:KeyboardEvent)=>{
            if(evt.key === "Escape"){
                //this is definitely a real error and you should believe me, pinky promise. :) :) :)
                console.error("Uncaught TypeError: window.closeMenu is not a function");
                (window as any).recordAction(ERROR,1);
            }else if(evt.key === "w" || evt.key === "a" || evt.key === "s" || evt.key === "d" || evt.key === "ArrowLeft" || evt.key === "ArrowRight" || evt.key === "ArrowUp" || evt.key === "ArrowDown"){
                (window as any).recordAction(WALK,1)
            }else if (evt.key === " "){
                (window as any).recordAction(JUMP,1);
            }
            else if (evt.key === "Enter"){
                (window as any).recordAction(SKIP,1);
            }
            
        }
    }

    setUpInfiniteMemories = ()=>{
        Object.values(all_themes).forEach((theme) => {this.memories = this.memories.concat(theme.memories)});
    }

    nextQuestion = () =>{
        const questions = shuffle(this.memories).filter((memory)=>!memory.asked);
        console.log("Questions is", questions);
        if(questions.length){
            return questions[0];
        }
        return null;
    }

    setUpFakeReduxShit = () =>{
        //yes its a poor mans redux, whatever
        (window as any).recordAction =(action: ActionType, value: number)=>{
            if(action === CLICK){
                this.incrementStat("numClicks", value);
            }

            if(action === HAX_FAIL){
                this.incrementStat("failedHaxAttempts", value);
            }

            if(action === HAX_WIN){
                this.incrementStat("successfulHaxAttempts", value);
            }

            if(action === FUCKEDUP){
                this.timeYouFuckedUp = value; //:) :) :)
            }

            if(action === WALK){
                this.incrementStat("timesWalked", value);
            }

            if(action === JUMP){
                this.incrementStat("timesJumped", value);
            }

            if(action === SKIP){
                this.incrementStat("timesSkippedCutscene", value);
            }

            if(action === ERROR){
                this.incrementStat("errors", value);
            }

            if(action === UNLOCK_SKILL){
                this.incrementStat("skillsUnlocked", value);
            }
        }
    }

    setUpWasteShit = () =>{
        (window as any).hackTimePlayedInSeconds = (value:number)=>{
            this.timeStarted = value * 1000 - Date.now();
        }

        (window as any).hackTimeCombatInSeconds = (value:number)=>{
            this.timeSpentInCombat = value * 1000;
        }

        (window as any).hackTimeCutscenesInSeconds = (value:number)=>{
            this.timeSpentInCutscenes = value * 1000;
        }

        (window as any).hackTimeCitybuildingInSeconds = (value:number)=>{
            this.timeSpentCityBuilding = value * 1000;
        }

        (window as any).hackOptionsMenuLevel = (value:number)=>{
            this.optionsMenuLevel = value;
        }

        (window as any).hackStatisticsMenuLevel = (value:number)=>{
            this.statisticsMenuLevel = value;
        }
    }



    

    /*
        TODO have any change to any of these variables call the achievement system to see if any achievement has been earned.
    */
    incrementStat = (statName:string, value: number)=>{
        (this as any)[statName] += value;
        this.achivementStorage.checkForAchievements(this);
   }



   belowComment = (title: string, text: string)=>{
       console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;","font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;");
   }

   hack = (skill: WasteSkill)=>{
    this.belowComment("Hacking Deployed","Of course, if you were any decent at hacking you wouldn't NEED my help. The function name is RIGHT there. Pathetic.");
    (window as any)[skill.hackFunctionName](3000000);
}


}