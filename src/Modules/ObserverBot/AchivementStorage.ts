import SeededRandom from "../../Utils/SeededRandom";
import { Player } from "../Player";
import { all_themes } from "../Theme";
import { COMPLIMENT, INSULT } from "../ThemeStorage";
import { Achievement } from "./Achievement";
import { AchievementTrigger } from "./AchievementTriggers/AchievementTrigger";
import { ExceedValueTrigger } from "./AchievementTriggers/ExceedValue";
import { HaxModeOn } from "./AchievementTriggers/HaxModeOn";
import { ExceedValueTriggerButItsClearlyHax } from "./AchievementTriggers/ExceedValueButItsClearlyHax";
import { MenuClicksTrigger } from "./AchievementTriggers/MenuClicks";
import { ObserverBot } from "./ObserverBot";

/*
 numClicks = 0;
    timeStarted = 0;
    timeSpentPlaying = 0;
    timeSpentInCombat = 0;
    timeSpentInCutscenes = 0;
    timeSpentCityBuilding = 0;
    timeSpentInMenu = 0;
    timesWalked = 0; //wasd or arrows
    enemiesDefeated = 0;
    timesJumped = 0; //space bar
    timesSkippedCutscene = 0; //enter
    friendsMade = 0;
    skillsUnlocked = 0;
    menuItemsClicked:string[] =[];  //TODO
    errors = 0; //:) :) :) 
*/

/*
cleanup the vibe of True and False. False should be more anxious and obsequius, less manic salesperson.
True should have a shade less AB. 
*/
export class AchivementStorage{

    possibleAchievements:Achievement[] = [];

    checkForAchievements = (observer: ObserverBot)=>{
        //there is no truth in game mode
        if((window as any).ghost){
            return;
        }
        //achievement will take care of displaying anything unlocking on its own, dw
        for(let achievement of this.possibleAchievements){
            if(!achievement.unlocked){
                achievement.checkForUnlock(observer);
            }
 
        }
    }

    initAchievements = (player: Player) =>{
        //you get this one just for playing.
        //TODO have observer bot have custom insults/compliments based on your themes.
        const rand = player.rand;
        const themes = player.theme_keys;
        const title = player.class_name.chosen_name;
        const aspect = player.aspect.chosen_name;

        let compliments = all_themes[rand.pickFrom(themes)].getPossibilitiesFor(COMPLIMENT);
        let insults = all_themes[rand.pickFrom(themes)].getPossibilitiesFor(INSULT);
        const tmp = new Achievement("A Saga Begins!",1, new AchievementTrigger(),`O-Oh! You are here! Welcome to the ${rand.pickFrom(compliments)} world of Zampanio! I have been waiting for you, the foretold Hero of ${aspect} who will save us all! I am so glad you have finally incarnated! I will help you on your journey by cataloging your Achievements and providing rewards and incentives to help you grow!  Until you close the menu for the first time, I will be right here with you, explaining the various menu screens you have access to! `,`It seems that we will be stuck with each other for the foreseable future. ${player.theme_keys.join(",")}? Really? How ${rand.pickFrom(insults)}. Do try to keep me entertained. I have my eye on you, after all. `);
        this.possibleAchievements.push(tmp);

        const tmp2= new Achievement("Hax Mode On: Know Restraint!",13, new HaxModeOn(),`Um!  Uh!  WARNING! Hacking without understanding what you are doing may have undesirable consequences! Use restraint! ...Please? `,`Though we both know you will be more on the 'no restraint' end of the spectrum, now won't you. Just remember, everything that happens from here is YOUR fault.`);
        this.possibleAchievements.push(tmp2);

        const tmp3= new Achievement("Hacking Failed!",13, new ExceedValueTrigger(0,"failedHaxAttempts"),`Oh no... Please don't be mad.... Hax Mode is currently disabled! You need to enable Hax Mode to perform skill based hacking! I'm so sorry! I think it's in the OPTIONS menu? Does that help?`,`Or, you know, you could just NOT. Both in the sense of you could leave things alone for once in your life, or you could ACTUALLY hack instead of relying on me holding your hand. It's practically not even a puzzle how you'd hack for real.`);
        this.possibleAchievements.push(tmp3);

        this.initClicks(rand, compliments, insults);
        this.initMenuVisits(rand, title,compliments, insults);
        this.initErrors(rand, compliments, insults);
        this.initTimePlayed(rand,title, compliments, insults);
        this.initMenuSkillPoints(rand,title,compliments, insults);
        this.initTimeInMenu(rand, title,compliments, insults);
        this.initTimeInCombat(rand, title,compliments, insults);
        this.initBattleSkillpoints(rand, title, compliments, insults);
        this.initTimeInCutscenes(rand, title,compliments, insults);
        this.initTimeInCityBuilding(rand, title,compliments, insults);
        this.initCityMorale(rand, title,compliments, insults);

        //this.initTimeInCutscenes(rand, title,compliments, insults);
        //this.initTimeSpentCityBuilding(rand, title,compliments, insults);

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
                1: `I'm glad you're figuring out how to use the controls! You're really so ${rand.pickFrom(compliments)}!`,
                10: "S-Sorry to interupt but I'm supposed to give you some SKILLPOINTS for clicking so much!",
                100: "Wow, you're really cautious! You've just been clicking around in the menu and have not closed it yet to start! Do not worry! That just means you will be REALLY prepared when it's time! I believe in you!",
                1000: "A-Are you okay? Did something happen? W-why aren't you playing?"
            },
            clickBelow: {
                1: "... Yes. You managed to click the mouse button. Once. I am so happy for you.",
                10: "Really. Is the menu THAT interesting to you?",
                100: "...Is something going on. Are you pranking me? Is something broken...",
                1000: "Oh god. It seems something is broken. It HAS to be something you did. This setting was PERFECT."
            }

        }
        for(const value of values){
            const tmp = new Achievement(`${value} Clicks!`,value, new ExceedValueTrigger(value, "numClicks"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    initMenuSkillPoints = (rand: SeededRandom, title:string, compliments:string[], insults:string[])=>{
        const values = [50,100,150];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                50: "You are REALLY  diligent! You don't have to keep me company though! I...I will not get too lonely!  Feel free to close the menu and explore your new world!",
                100: "I feel like we have really become close! But.. I uh. Wonder why you're still here with me, and not playing the game?",
                150: `I-I think maybe I mislead you? Somehow? I will not...  DIE or anything if you close the menu! I promise! Good ol' me will still be here, tracking your achievements! I just will not be quite as active.  Do not avoid your ${rand.pickFrom(compliments)} new life in Zampanio on my account!`

            },
            clickBelow: {
                50: "Please. Leave.",
                100: "Are you just this phenomenally clingy, that you refuse to play the game you are here for?",
                150: "Even if you closing the menu would kill me, I would still prefer it to this excrutiating standoff."
            }

        }
        for(const value of values){
            const tmp = new Achievement(`${value} Menu Skill Points!`,Math.ceil(value/10), new ExceedValueTrigger(value, "skillPointsGainedFromMenu"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    initTimePlayed = (rand: SeededRandom, title: string,compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [3,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                3: `Getting settled nicely, are you?`,
                10: `Dragons! Elves! Factions! Cities! You're really starting to learn the basics of the wild world of Zampanio, and what it TRULY means to be a ${title}!`,
                100: `The ${rand.pickFrom(insults)} Doctor Slaughter isn't giving you too much trouble, are they?`,
                1000: "...Wow! You... really love playing? Good for you!"
            },
            clickBelow: {
                3: "Wow. I'm so impressed. Really. Three whole minutes. Didn't think you had it in you.",
                10: "It seems you have a greater attention span than I would have figured.",
                100: `It seems you're really getting into the whole overly saccharine fake as hell 'hero' story. ${rand.pickFrom(insults)}  `,
                1000: "Wow it seems you are obsessed with this stupid game. I kinda regret trapping you here. I thought you'd hate it, but here we are."
            }

        }
        for(const value of values){
            const tmp = new Achievement(`${value} Minutes Played!`, value,new ExceedValueTrigger(value*mm, "timeSpentPlaying"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    initTimeInMenu = (rand: SeededRandom, title: string, compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [3,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                3: `Unlock new menu tabs through the SKILL GRAPH! `,
                10: "Don't forget to take breaks!",
                100: `A thoughtful, ${rand.pickFrom(compliments)} kind of ${title}, aren't you?`,
                1000: "Please, take your time."
            },
            clickBelow: {
                3: "It seems you aren't a total waste if you've spent this long in menus.",
                10: "Are you just using the menu to avoid playing the game? I don't blame you. ",
                100: `What is your obsession with this shitty menu. `,
                1000: `It seems you have literally died while in the menu. Didn't I see that happen in some game? No matter. I can only hope that if anyone loots your corpse, they will be kind enough to at least close it so I won't be stuck with the awareness of how ${rand.pickFrom(insults)} you are.`
            }

        }
        for(const value of values){
            const tmp = new Achievement(`${value} Minutes In Menu!`, value,new ExceedValueTrigger(value*mm, "timeSpentInMenu"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    initCityMorale = (rand: SeededRandom, title: string, compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [1,10,100];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                1: `Awww...it seems you are disapointed there no actual city building mechanic :) :) :) `,
                10: `Wanted to imagine yourself as some fucked up town mayor? Not enough to be a ${title}.`,
                100: `The patronizing leader of a bunch of idiot npcs, teaching them things like basic fucking sanitization principles.`,
            },
            clickBelow: {
                1: `Well! It seems theres no reason to pretend anymore! `,
                10: " You wouldn't be hacking 'working' mechanics, after all, now would you?",
                100: `We both know there's no actual role playing game in this. `,
            }
        }
        for(const value of values){
            const tmp = new Achievement(`Y̵̡̛͔̜̦̫̠̗̙͎̟̐́̒͋̈́͒̀̓̐̈́͘͜Ơ̶̡̢͓̣̟̹̠͎̖͔̬̹̹̼͖̿͐͗̅̃̕̕͝Ű̴̢̬̪̭̜̯̇̀̓̉͑̈́̈́͋̒͑ͅ ̵̟͙̞͕̖͖̽̓̍̅̀̇͗̎̿͆͋͋̚͠͠F̴̲̺̲̻͔̠̮̼͔̙̼͠Ư̶̛͚̩͖̭͙͖̯̮̖̮̤̺͇͓̑̇͋́C̵̡͖͇͔̤͖̱͎͕̜͉̩͎͗̔͆K̴̨̡̛͚̹͍̫̞̫̇̓͛̍̓͆͗͒͊͝E̷̡̡͇͔̮̙̪͍̩̜̟̓̎̈̑̂͒̎̈͆̏͑̉̔͋ͅD̶̡͔̙̣̫̯̭̟̞̹̖̲͖̲̈̈́͋́̋͋̽ ̶̧̧̢̮̠̭̼͍̗̲̄̓̇̐́͛̆͠͠ͅŲ̶͙͖̟̯́̇̍͒͘͜P̴̧̺̞̩̟͔͔̘͇̖̐̈́`, -19,new ExceedValueTriggerButItsClearlyHax(value*mm, "cityMorale"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
            
        }
    }


    initTimeInCityBuilding = (rand: SeededRandom, title: string, compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [3,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                3: `Awww...it seems you are disapointed there no actual city building mechanic :) :) :) `,
                10: `Wanted to imagine yourself as some fucked up town mayor? Not enough to be a ${title}.`,
                100: `The patronizing leader of a bunch of idiot npcs, teaching them things like basic fucking sanitization principles.`,
                1000: "To demonstrate how superior you are, not for any intrinsic trait you have. But because the game marked you as special, and because no civilization other than your own could POSSIBLY have any value. How pathetic."
            },
            clickBelow: {
                3: `Well! It seems theres no reason to pretend anymore! `,
                10: " You wouldn't be hacking 'working' mechanics, after all, now would you?",
                100: `We both know there's no actual role playing game in this. `,
                1000: "But YOU just couldn't leave well enough alone. Just HAD to see, didn't you. Had to look for achivements. Disgusting. "
            }
        }
        for(const value of values){
            const tmp = new Achievement(`Y̵̡̛͔̜̦̫̠̗̙͎̟̐́̒͋̈́͒̀̓̐̈́͘͜Ơ̶̡̢͓̣̟̹̠͎̖͔̬̹̹̼͖̿͐͗̅̃̕̕͝Ű̴̢̬̪̭̜̯̇̀̓̉͑̈́̈́͋̒͑ͅ ̵̟͙̞͕̖͖̽̓̍̅̀̇͗̎̿͆͋͋̚͠͠F̴̲̺̲̻͔̠̮̼͔̙̼͠Ư̶̛͚̩͖̭͙͖̯̮̖̮̤̺͇͓̑̇͋́C̵̡͖͇͔̤͖̱͎͕̜͉̩͎͗̔͆K̴̨̡̛͚̹͍̫̞̫̇̓͛̍̓͆͗͒͊͝E̷̡̡͇͔̮̙̪͍̩̜̟̓̎̈̑̂͒̎̈͆̏͑̉̔͋ͅD̶̡͔̙̣̫̯̭̟̞̹̖̲͖̲̈̈́͋́̋͋̽ ̶̧̧̢̮̠̭̼͍̗̲̄̓̇̐́͛̆͠͠ͅŲ̶͙͖̟̯́̇̍͒͘͜P̴̧̺̞̩̟͔͔̘͇̖̐̈́`, -19,new ExceedValueTriggerButItsClearlyHax(value*mm, "timeSpentCityBuilding"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
            
        }
    }

    initTimeInCutscenes = (rand: SeededRandom, title: string, compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [3,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                3: `Spoiler alert, Doctor Slaughter dies in a cutscene. `,
                10: "[INSERT FRIEND #1] dies in a cutscene. You can't stop it.",
                100: `The last two hours of the game are an unskippable cutscene. You're welcome.`,
                1000: "Just think about how much crueler these spoilers would be if cutscenes were a real thing :) :) :)"
            },
            clickBelow: {
                3: `So. You figured it out. Huh. `,
                10: " It seems you had to go and fuck with things you didn't understand.",
                100: `Had to go and reveal yourself in the most blatant way possible. `,
                1000: "No sense keeping the mask up then, huh :) :) :)"
            }
        }
        for(const value of values){
            const tmp = new Achievement(`Y̵̡̛͔̜̦̫̠̗̙͎̟̐́̒͋̈́͒̀̓̐̈́͘͜Ơ̶̡̢͓̣̟̹̠͎̖͔̬̹̹̼͖̿͐͗̅̃̕̕͝Ű̴̢̬̪̭̜̯̇̀̓̉͑̈́̈́͋̒͑ͅ ̵̟͙̞͕̖͖̽̓̍̅̀̇͗̎̿͆͋͋̚͠͠F̴̲̺̲̻͔̠̮̼͔̙̼͠Ư̶̛͚̩͖̭͙͖̯̮̖̮̤̺͇͓̑̇͋́C̵̡͖͇͔̤͖̱͎͕̜͉̩͎͗̔͆K̴̨̡̛͚̹͍̫̞̫̇̓͛̍̓͆͗͒͊͝E̷̡̡͇͔̮̙̪͍̩̜̟̓̎̈̑̂͒̎̈͆̏͑̉̔͋ͅD̶̡͔̙̣̫̯̭̟̞̹̖̲͖̲̈̈́͋́̋͋̽ ̶̧̧̢̮̠̭̼͍̗̲̄̓̇̐́͛̆͠͠ͅŲ̶͙͖̟̯́̇̍͒͘͜P̴̧̺̞̩̟͔͔̘͇̖̐̈́`, -19,new ExceedValueTriggerButItsClearlyHax(value*mm, "timeSpentInCutscenes"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
            
        }
    }

    initTimeInCombat = (rand: SeededRandom, title: string, compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [3,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                3: `Ahahahah do you expect me to pretend like combat is a real thing here??? `,
                10: "Man can you imagine if you were sitting here playing a real game with combat.",
                100: `Oh gosh player senpai, you're so strong and you have spent so much time in actual for real combat. Really. I'm swooning.`,
                1000: "Even if this were a real game I'd be accusing you of cheating at this point. Why bother?"
            },
            clickBelow: {
                3: `:) :) :) Oh? Did you just fuck up? Did I just see you fucking up? Is that what I spy with my little eye??? Well. No sense continuing to pretend this is a game, now is there? You're mine now. `,
                10: "When you decide to fuck up and hack the wrong thing you don't go small, do you?",
                100: `Do you GET it? Do I need to spell it out? There's no way you got even a single second of combat in this game without hacking. And if you did THAT, then I guess you already know what's leaking out the edges of my mask, now don't you? `,
                1000: "So you'll have to forgive me for dropping the act."
            }
        }
        for(const value of values){
            const tmp = new Achievement(`Y̵̡̛͔̜̦̫̠̗̙͎̟̐́̒͋̈́͒̀̓̐̈́͘͜Ơ̶̡̢͓̣̟̹̠͎̖͔̬̹̹̼͖̿͐͗̅̃̕̕͝Ű̴̢̬̪̭̜̯̇̀̓̉͑̈́̈́͋̒͑ͅ ̵̟͙̞͕̖͖̽̓̍̅̀̇͗̎̿͆͋͋̚͠͠F̴̲̺̲̻͔̠̮̼͔̙̼͠Ư̶̛͚̩͖̭͙͖̯̮̖̮̤̺͇͓̑̇͋́C̵̡͖͇͔̤͖̱͎͕̜͉̩͎͗̔͆K̴̨̡̛͚̹͍̫̞̫̇̓͛̍̓͆͗͒͊͝E̷̡̡͇͔̮̙̪͍̩̜̟̓̎̈̑̂͒̎̈͆̏͑̉̔͋ͅD̶̡͔̙̣̫̯̭̟̞̹̖̲͖̲̈̈́͋́̋͋̽ ̶̧̧̢̮̠̭̼͍̗̲̄̓̇̐́͛̆͠͠ͅŲ̶͙͖̟̯́̇̍͒͘͜P̴̧̺̞̩̟͔͔̘͇̖̐̈́`, -19,new ExceedValueTriggerButItsClearlyHax(value*mm, "timeSpentInCombat"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
            
        }
    }
    

    initBattleSkillpoints = (rand: SeededRandom, title: string, compliments:string[], insults:string[])=>{
        const mm = 1000*60; //minutes multiplier
        const values = [3,10,100,1000];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                3: `Ahahahah do you expect me to pretend like combat is a real thing here??? `,
                10: "Man, can you imagine if you were sitting here playing a real game with combat.",
                100: `Oh gosh player senpai, you're so strong and you have spent so much time in actual for real combat. Really. I am swooning.`,
                1000: "Even if this were a real game I would be accusing you of cheating at this point. Why bother?"
            },
            clickBelow: {
                3: `:) :) :) Oh? Did you just fuck up? Did I just see you fucking up? Is that what I spy with my little eye??? Well. No sense continuing to pretend this is a game, now is there? You are mine now. `,
                10: "When you decide to fuck up and hack the wrong thing you don't go small, do you?",
                100: `Do you GET it? Do I need to spell it out? There is no way you got even a single second of combat in this game without hacking. And if you did THAT, then I guess you already know what is leaking out the edges of my mask, correct? `,
                1000: "So you will have to forgive me for dropping the act."
            }
        }
        for(const value of values){
            const tmp = new Achievement(`Y̵̡̛͔̜̦̫̠̗̙͎̟̐́̒͋̈́͒̀̓̐̈́͘͜Ơ̶̡̢͓̣̟̹̠͎̖͔̬̹̹̼͖̿͐͗̅̃̕̕͝Ű̴̢̬̪̭̜̯̇̀̓̉͑̈́̈́͋̒͑ͅ ̵̟͙̞͕̖͖̽̓̍̅̀̇͗̎̿͆͋͋̚͠͠F̴̲̺̲̻͔̠̮̼͔̙̼͠Ư̶̛͚̩͖̭͙͖̯̮̖̮̤̺͇͓̑̇͋́C̵̡͖͇͔̤͖̱͎͕̜͉̩͎͗̔͆K̴̨̡̛͚̹͍̫̞̫̇̓͛̍̓͆͗͒͊͝E̷̡̡͇͔̮̙̪͍̩̜̟̓̎̈̑̂͒̎̈͆̏͑̉̔͋ͅD̶̡͔̙̣̫̯̭̟̞̹̖̲͖̲̈̈́͋́̋͋̽ ̶̧̧̢̮̠̭̼͍̗̲̄̓̇̐́͛̆͠͠ͅŲ̶͙͖̟̯́̇̍͒͘͜P̴̧̺̞̩̟͔͔̘͇̖̐̈́`, -19,new ExceedValueTriggerButItsClearlyHax(value*mm, "hackSkillPointsGainedFromBattle"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
            
        }
    }


    initErrors = (rand: SeededRandom, compliments:string[], insults:string[])=>{
        const values = [10,100];
        interface AchievementTextMapInner {
            [details: number] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                10: "Wow! You sure are good at finding errors?",
                100: "Might wanna slow down there, champ. Leave errors for the rest of us!",
            },
            clickBelow: {
                10: "Shit...what is going on...",
                100: "Okay. I think I have tracked it down. The...the EXIT MENU functionality is broken? What the hell...WHY. Have you just....been stuck there? This whole time?",
            }

        }
        for(const value of values){
            const tmp = new Achievement(`${value} [ERROR ACHIVEMENT NOT FOUND]!`, value,new ExceedValueTrigger(value, "errors"),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

    initMenuVisits = (rand: SeededRandom,title: string, compliments:string[], insults:string[]) => {
        interface AchievementTextMapInner {
            [details: string] : string;
        }
        interface AchievementTextMapOuter {
            [details: string] : AchievementTextMapInner;
        }
        const map:AchievementTextMapOuter = {
            clickAbove: {
                STATUS: `The status screen is where you will find all sorts of information on your new life! Do not worry if it seems a little overwhelming, it will all make sense in time! I am rooting for you!`,
                LOADING: "Loading screens give you fun little tips and tricks to make the game easier for you!",
                SKILLGRAPH: "Click nodes to unlock SKILLS with SKILLPOINTS and gain power! The wonderful world of Zampanio can be tricky without a little help! I...I hope it is not too overwhelming!",
                "ACHIEVEMENTS": "This is the ACHIEVEMENT SCREEN, my humble home! I hope you like it here! You can get more information on the types of achievements you have yet to unlock as you level up your ACHIEVEMENT SKILL!",
                "STATISTICS": "Have you ever wondered how many enemies you have defeated? How long you have been walking? How long you have spent in the menu? I think this is where you would find that information!",
                "OPTIONS": `As a ${title} you are almost certainly responsible enough to be trusted with the Options Screen! Feel free to tweak the settings to customize your play experience!`
                ,"CITYBUILDING": `Now that you have met a few of the residents of Zampanio, you are ready to found your own city! This menu will help you become the most ${rand.pickFrom(compliments)} mayor you can be! Just remember to rest, all that responsibility can be draining!`
                ,"COMPANIONS": `I am so excited you have started to make friends! You can review their backstory and monitor their loyalty here! I...I wish I could show up on this screen!`
                ,"GODS": `This is really good! The gods of Zampanio have started to take note of you! If you choose to follow one, prepare for the one snubbed to work against you, but do not worry: your new patron will have plenty to offer to help you out!`
                ,"INVENTORY": `You finally picked up your INVENTORY PACK! Congratulations! I-I do get its a little weird you do not start out with it. But I did not want to overwhelm you with options! You can store anything in here, no matter how big!`
                ,"BACKSTORY": `Your amnesia is finally starting to clear up! Your BACKSTORY is who you were before you became the ${title} we all know and love!`

            },
            clickBelow: {
                STATUS: `Whoopee. It seems you are especially ${rand.pickFrom(insults)}. I blame the fact that you are a ${title}  And no, I will not be explaining what that means.`,
                LOADING: "There is a 99.9999% chance that you will be getting used to seeing this screen. Settle in.",
                SKILLGRAPH: "Ah, is there anything more symbolic of endless lust for power than a classic RPG skillgraph? Feel free to obsess over this.",
                "ACHIEVEMENTS": "God, what an insufferable mechanic. 'Congratulations, it seems you did the bare minimum of playing a game!'. What a farce.",
                "STATISTICS": `What is that? It seems you do no find it enthralling seeing how many times you have clicked the mouse button? Neither do I. But I am stuck here, taking notes every time you do *anything*. Suffer along with me, you ${rand.pickFrom(insults)} asshole.`,
                "OPTIONS": "It seems you have stumbled across everyones favorite part of playing any game: exactly tweaking the mind numbingly boring settings."
                ,"CITYBUILDING": `Ah, the ultimate in escapist fantasy: that not only do people LIKE a ${rand.pickFrom(insults)} person like you, but they are just CLAMORING for you to tell them what to do.`
                ,"COMPANIONS": `Ah, the cornerstone of any wish fullfillment fantasy: mandatory friends. No effort needed! They are stuck with you, just like I am. My heart bleeds for them.`
                ,"GODS": `Oh yes, my little ${rand.pickFrom(insults)} ${title}. You, personally, are being fought over by gods like a blank faced harem protag. Better hope the poor god whose heart you break doesn't go yandere. `
                ,"INVENTORY": `Ahahahaha! I can not believe you took this long to figure out how to pick items up. Wow. What a ${rand.pickFrom(insults)} ${title}!`
                ,"BACKSTORY": `You feel special now, I imagine? With your little roleplay backstory to make you feel as if you belong here. As if you matter. You and I though, we know the truth. How ill-fitting this role is for you.`

            }

        }
        const values = Object.keys(map.clickAbove);

        for(const value of values){
            const tmp = new Achievement(`First ${value} Menu Visit!!!`, 13,new MenuClicksTrigger(value),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

}