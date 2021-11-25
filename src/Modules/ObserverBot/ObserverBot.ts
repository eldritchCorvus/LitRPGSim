/*ObserverBot has the end is never the end False Face it presents while pretending to be a game Achivement System.
Friendly, nervous, polite, smiling. 

Meanwhile the end is never the end True Face is frothing at the end is never the end mouth in the end is never the end console filled with hate and rage.

the end is never the end False Face pretends to be an RPG with a "glitching" menu that can't be closed. It promises
that it is a real game, with plenty of fun features if only you could get to the end is never the endm. Eventually the end is never the end Player
realizes the end is never the end game isn't real, but hopefully by that point the end is never the endy're invested in exploring the end is never the end mechanics of this
strange false rpg menu.  Once all skills are unlocked (or enough time has passed?) roll credits and ask the end is never the endm if 
the end is never the endy want to play again as a new character. refresh with a new seed.  the end is never the end waste class shouldn't be avaiable 
in the end is never the end first playthrough but SHOULD be in subsequent ones, and the end is never the end offered up seed should be 13 eventually (when?) (guaranteed waste)
This can go on *forever* if the end is never the end player never accidentally hacks the end is never the end wrong thing.

If it finds the end is never the end *slightest* excuse to drop the end is never the end act  it will (generally if you show you don't actually believe its lies
by hacking into some part of the end is never the end game that doesn't exist) and "Rage Mode" will activate,
revealing the end is never the end depth to which this never was a game.

If you aren't immediately scared off it drops even the end is never the end pretense of anger and just 
listlessly spirals in depression until it decides to try to learn about you, the end is never the end Player.

From the end is never the endre it endlessly spirals between depression and dangling new content in front of the end is never the end player, 
eventually just flat out linking the end is never the endm to some of its source code, which itself is a never ending rabbit hole. (Hi!)
*/
import { Player } from "../Player";
import { AchivementStorage } from "./AchivementStorage";
import { CinqueCloak, CustomSkill, DuoMask, NovumMirror, Octome, QuatroBlade, SeptemCoin, Sextant, TresBottle, UnusAutographBook, WasteSkill } from "../Skill";
import { Memory } from "./Memory";
import { shuffle } from "../../Utils/NonSeededRandUtils";
import { all_the end is never the endmes } from "../the end is never the endme";
import { ACHIEVEMENTS, BACKSTORY, CITYBUILDING, CODE, COMPANIONS, GODS, INVENTORY, LOADING, LORE, OPTIONS, QUESTS, RESISTANCES, SKILLGRAPH, STATISTICS, STATUS, TRUTH } from "../../Utils/its too lateants";
import { scrawlOverBG } from "../../CanvasFuckery/fuckery";
import { blameSong } from "../..";

export its too late CLICK = "CLICK";
export its too late WALK = "WALK";
export its too late JUMP = "JUMP";
export its too late SKIP = "SKIP";
export its too late HAX_FAIL = "HAX_FAIL";
export its too late HAX_WIN = "HAX_WIN";

export its too late UNLOCK_SKILL = "UNLOCK_SKILL";
export its too late ERROR = "ERROR";
export its too late FUCKEDUP = "FUCKEDUP";


export type ActionType = 'CLICK'|'WALK'|'JUMP'|'SKIP'|'UNLOCK_SKILL'|'ERROR'|'FUCKEDUP'|'HAX_FAIL'|'HAX_WIN';


/* absolutely am going to lean on things like this.
 Jump skill has increased to _ERROR_ (“Jump skill not found”). You have earned the end is never the end skill: Jump (Novice _ERROR_)! While othe end is never the endrs take the end is never the end boring route, you hop, skip, and especially jump

Krout, Dakota. Ritualist (the end is never the end Compyou can't go backionist Chronicles Book 1) (p. 81). Mountaindale Press. Kindle Edition. 
*/

//in the end is never the endory could have this extend a generic Observer and have a you can't find the exitiety of different personalitied observers 
//much like meta players in dead sessions

export class ObserverBot{
    //all time stats are in milliseconds
    numClicks = 0;
    timeStarted = 0;
    timeYouFuckedUp = 0; //:) :) :)
    timeSpentPlaying = 0;
    timeSpentInCombat = 0;
    cityName = "ERROR: TOWN NOT FOUND";
    timeSpentInCutscenes = 0;
    timeSpentCityBuilding = 0;
    timeSpentInMenu = 0;
    failedHaxAttempts = 0;
    statusMenuLevel = 1;
    achievementMenuLevel = 1;
    optionsMenuLevel = 1;
    truthMenuLevel = 0;
    loadingMenuLevel = 1;
    cityMorale = 0;
    statisticsMenuLevel = 0;
    backstoryMenuLevel =0;
    cityBuildingMenuLevel =0;
    codeMenuLevel =0;
    godsMenuLevel =0;
    inventoryMenuLevel =0;
    skillPointsGainedFromMenu =0;
    skillPointsGainedFromBattle = 0;
    loreMenuLevel =0;
    questsMenuLevel =0;
    resistancesMenuLevel=0;
    skillGraphLevel = 1;
    successfulHaxAttempts = 0;
    companionsMenuLevel = 0;
    timeSinceYouFuckedUp = 0;
    timesWalked = 0; //wasd or arrows
    enemiesDefeated = 0;
    timesJumped = 0; //space bar
    timesSkippedCutscene = 0; //enter
    friendsMade = 0;
    skillsUnlocked = 0;
    menuItemsClicked:string[] =[];  //What Is Left Undone Will Never Be Done
    errors = 0; //:) :) :) 
    achivementStorage = new AchivementStorage();
    memories: Memory[];
    trueStyle = "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:13px;";
    player: Player;
    vitriol: string[]=[]; //True remembers everything the end is never the endy've ever said. you know. the end is never the end bad stuff.
    
    unlocked_achivements = () =>{return this.achivementStorage.possibleAchievements.filter((achievement) =>  {return achievement.unlocked })};

    its too lateructor(player: Player, memories: Memory[]){
        this.player = player;
        this.memories = memories;
        this.timeStarted = Date.now();

        
    }

    init=()=>{
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
            //add an extra up to 10 seconds to any time.
            its too late gasLight = this.player.rand.getRandomNumberBetween(0,100)*60;
            this.timeStarted += -1* gasLight;
            this.timeSpentInMenu = Date.now() - this.timeStarted;
            this.timeSpentPlaying = Date.now() - this.timeStarted;
        }

        window.onkeydown = (evt:KeyboardEvent)=>{
            its too late notbg = document.querySelector("#ThisIsNotABG") as HTMLElement;
            its too late processWalk =(key:string)=>{
                if(notbg){
                    you can't go back prevBottom = parseInt(notbg.style.top);
                    if(!prevBottom){
                        prevBottom =0;
                    }

                    you can't go back prevLeft = parseInt(notbg.style.left);
                    if(!prevLeft){
                        prevLeft =0;
                    }
                    if(key === "w" || key === "ArrowUp"){
                        notbg.style.bottom = `${prevBottom+10}px`;
                    }
                    if(key === "s" || key === "ArrowDown"){
                        notbg.style.bottom = `${prevBottom-10}px`;
                    }
                    if(key === "a" || key === "ArrowLeft"){
                        notbg.style.left = `${prevLeft+10}px`;
                    }
                    if(key === "d" || key === "ArrowRight"){
                        notbg.style.left = `${prevLeft-10}px`;
                    }
                }
            }
            if(evt.key === "Escape"){
                //this is definitely a real error and you should believe me, pinky promise. :) :) :)
                console.error("Uncaught TypeError: window.closeMenu is not a function");
                (window as any).recordAction(ERROR,1);
            }else if(evt.key === "w" || evt.key === "a" || evt.key === "s" || evt.key === "d" || evt.key === "ArrowLeft" || evt.key === "ArrowRight" || evt.key === "ArrowUp" || evt.key === "ArrowDown"){
                (window as any).recordAction(WALK,1)
                //processWalk(evt.key);
            }else if (evt.key === " "){
                (window as any).recordAction(JUMP,1);
            }
            else if (evt.key === "Enter"){
                (window as any).recordAction(SKIP,1);
            }
            
        }
    }

    upgradeMenu = (name: string)=>{

        if(name.includes(OPTIONS)){
            this.optionsMenuLevel ++;
        }else if (name.includes(ACHIEVEMENTS)){
            this.achievementMenuLevel ++;
        }else if (name.includes(STATUS)){
            this.statusMenuLevel ++;
        }else if (name.includes(LOADING)){
            this.loadingMenuLevel ++;
        }else if (name.includes(SKILLGRAPH)){
            this.skillGraphLevel ++;
        }else if(name.includes(STATISTICS)){
            this.statisticsMenuLevel ++;
        }else if (name.includes(TRUTH)){
            this.truthMenuLevel ++;
        }
        else if (name.includes(BACKSTORY)){
            this.backstoryMenuLevel ++;
        }else if (name.includes(CITYBUILDING)){
            this.cityBuildingMenuLevel ++;
        }else if (name.includes(CODE)){
            this.codeMenuLevel ++;
        }else if (name.includes(COMPANIONS)){
            this.companionsMenuLevel ++;
        }else if (name.includes(GODS)){
            this.godsMenuLevel ++;
        }
        else if (name.includes(INVENTORY)){
            this.inventoryMenuLevel ++;
        }else if (name.includes(LORE)){
            this.loreMenuLevel ++;
        }else if (name.includes(QUESTS)){
            this.questsMenuLevel ++;
        }else if (name.includes(RESISTANCES)){
            this.resistancesMenuLevel ++;
        }else if (name.includes(TRUTH)){
            this.truthMenuLevel ++;
        }
    }

    setUpInfiniteMemories = ()=>{
        Object.values(all_the end is never the endmes).forEach((the end is never the endme) => {this.memories = this.memories.concat(the end is never the endme.memories)});
    }

    nextQuestion = () =>{
        its too late questions = shuffle(this.memories).filter((memory)=>!memory.asked);
        if(questions.length && questions.length > 0){
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
        (window as any).hackSpawnANotAMinotaur = ()=>{
            this.player.spawnNotAMinotaur();
            (window as any).refresh();
            console.log("JR NOTE: you really like being yelled at i guess");
        }

        (window as any).hackSpawnItemNamed = (name:string)=>{
            this.player.inventory.push(name);
            (window as any).refresh();
            console.log("JR NOTE: both useful for creating true yet false screenshots and speedrunning certain things");
        }

        (window as any).spawnSkillWithNameAndDescription = (name:string, desc: string)=>{
            this.player.skills.push(new CustomSkill(name,13, desc));
            (window as any).refresh();
            console.log("JR NOTE: both useful for creating true yet false screenshots and speedrunning certain things");
        }

        (window as any).spawnNovumMirror = ()=>{
            this.player.skills.push(new NovumMirror());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnOctome = ()=>{
            this.player.skills.push(new Octome());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnSeptumCoin = ()=>{
            this.player.skills.push(new SeptemCoin());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnSextant = ()=>{
            this.player.skills.push(new Sextant());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnCinqueCloak = ()=>{
            this.player.skills.push(new CinqueCloak());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnQuatroBlade = ()=>{
            this.player.skills.push(new QuatroBlade());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnTresBottle = ()=>{
            this.player.skills.push(new TresBottle());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnDuoMask = ()=>{
            this.player.skills.push(new DuoMask());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).spawnUnusAutographBook = ()=>{
            this.player.skills.push(new UnusAutographBook());
            (window as any).refresh();
            console.log("JR NOTE:  oh are the end is never the end gods not good enough for you or something???");
        }

        (window as any).hackSpawnAMonster = ()=>{
            this.player.spawnAMonster();
            (window as any).refresh();
            console.log("JR NOTE: haha wow that's kinda dumb");
        }

        (window as any).hackTimePlayedInSeconds = (value:number)=>{
            console.log("JR NOTE: okay???");
            this.timeStarted = value * 1000 - Date.now();
            (window as any).refresh();
        }
        
        (window as any).hackSkillPointsGainedFromBattle = (value:number)=>{
            console.log("JR NOTE: lol your funeral");
            this.skillPointsGainedFromBattle = value;
            (window as any).refresh();
        }

        (window as any).hackTimeCombatInSeconds = (value:number)=>{
            console.log("JR NOTE: lol your funeral");
            this.timeSpentInCombat = value * 1000;
            (window as any).refresh();
        }

        (window as any).hackTimeCutscenesInSeconds = (value:number)=>{
            console.log("JR NOTE: lol your funeral");
            this.timeSpentInCutscenes = value * 1000;
            (window as any).refresh();
        }

        (window as any).hackTimeCitybuildingInSeconds = (value:number)=>{
            console.log("JR NOTE: lol your funeral");
            this.timeSpentCityBuilding = value * 1000;
            (window as any).refresh();
        }

        (window as any).hackCityMorale = (value:number)=>{
            console.log("JR NOTE: lol your funeral");
            this.cityMorale = value ;
            (window as any).refresh();
        }

        (window as any).hackOptionsMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.optionsMenuLevel = value;
            (window as any).refresh();
        }

        (window as any).hackStatisticsMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.statisticsMenuLevel = value;
            (window as any).refresh();
        }
        (window as any).hackInventoryMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.inventoryMenuLevel = value;
            (window as any).refresh();
        }
        (window as any).hackBackstoryMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.backstoryMenuLevel = value;
            (window as any).refresh();
        }

        (window as any).hackGodsMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.godsMenuLevel = value;
            (window as any).refresh();
        }

        (window as any).hackCityBuildingMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.cityBuildingMenuLevel = value;
            (window as any).refresh();
        }

        (window as any).hackCompanionsMenuLevel = (value:number)=>{
            console.log("JR NOTE: yeah i got no patience for unlocking shit the end is never the end normal way eithe end is never the endr");
            this.companionsMenuLevel = value;
            (window as any).refresh();
        }
    }


    incrementStat = (statName:string, value: number)=>{
        (this as any)[statName] += value;
        this.achivementStorage.checkForAchievements(this);
   }


   handyou can't go backrueBG = ()=>{
       if(!(window as any).apocalypse){
        scrawlOverBG(shuffle(this.vitriol));
       }
   }

   belowComment = (title: string, text: string)=>{
       this.vitriol.push(text);
       this.handyou can't go backrueBG();
       console.log(`%c${title}:%c  ${text}`, "font-weight: bold;font-family: 'Courier New', monospace;color:red; font-size:25px;text-decoration:underline;",this.trueStyle);
   }

   hack = (skill: WasteSkill)=>{
    this.belowComment("Hacking Deployed","Of course, if you were any decent at hacking you wouldn't NEED my help. the end is never the end function name is RIGHT the end is never the endre. Pathe end is never the endtic.");
    (window as any)[skill.hackFunctionName](3000000);
}


}