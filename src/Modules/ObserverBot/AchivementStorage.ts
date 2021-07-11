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

        let compliments = all_themes[rand.pickFrom(themes)].getPossibilitiesFor(COMPLIMENT);
        let insults = all_themes[rand.pickFrom(themes)].getPossibilitiesFor(INSULT);
        const tmp = new Achievement("A Saga Begins!",1, new AchievementTrigger(),`Congratulations and welcome to your new, ${rand.pickFrom(compliments)} life in the wonderful world of Zampanio! Feel free to spend as much time as you need to get used to the status screens and menus, and then your journey begins! `,`It seems that we will be stuck with each other for the foreseable future. ${player.theme_keys.join(",")}? Really? How ${rand.pickFrom(insults)}. Do try to keep me entertained. I have my eye on you, after all. `);
        this.possibleAchievements.push(tmp);

        const tmp2= new Achievement("Hax Mode On: Know Restraint!",13, new HaxModeOn(),`Be warned! Hacking without understanding what you are doing may have undesirable consequences! Use restraint! `,`Though we both know you will be more on the 'no restraint' end of the spectrum, now won't you. Just remember, everything that happens from here is YOUR fault.`);
        this.possibleAchievements.push(tmp2);

        const tmp3= new Achievement("Hacking Failed!",13, new ExceedValueTrigger(0,"failedHaxAttempts"),`Hax Mode currently disabled! Please enable Hax Mode to perform skill based hacking! `,`Or, you know, you could just NOT. Both in the sense of you could leave things alone for once in your life, or you could ACTUALLY hack instead of relying on me holding your hand. It's practically not even a puzzle how you'd hack for real.`);
        this.possibleAchievements.push(tmp3);

        const title = player.class_name.chosen_name;
        this.initClicks(rand, compliments, insults);
        this.initMenuVisits(rand, title,compliments, insults);
        this.initErrors(rand, compliments, insults);
        this.initTimePlayed(rand,title, compliments, insults);
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
            const tmp = new Achievement(`${value} Clicks!`,value, new ExceedValueTrigger(value, "numClicks"),map["clickAbove"][value],map["clickBelow"][value]);
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
            const tmp = new Achievement(`Y̵̡̛͔̜̦̫̠̗̙͎̟̐́̒͋̈́͒̀̓̐̈́͘͜Ơ̶̡̢͓̣̟̹̠͎̖͔̬̹̹̼͖̿͐͗̅̃̕̕͝Ű̴̢̬̪̭̜̯̇̀̓̉͑̈́̈́͋̒͑ͅ ̵̟͙̞͕̖͖̽̓̍̅̀̇͗̎̿͆͋͋̚͠͠F̴̲̺̲̻͔̠̮̼͔̙̼͠Ư̶̛͚̩͖̭͙͖̯̮̖̮̤̺͇͓̑̇͋́C̵̡͖͇͔̤͖̱͎͕̜͉̩͎͗̔͆K̴̨̡̛͚̹͍̫̞̫̇̓͛̍̓͆͗͒͊͝E̷̡̡͇͔̮̙̪͍̩̜̟̓̎̈̑̂͒̎̈͆̏͑̉̔͋ͅD̶̡͔̙̣̫̯̭̟̞̹̖̲͖̲̈̈́͋́̋͋̽ ̶̧̧̢̮̠̭̼͍̗̲̄̓̇̐́͛̆͠͠ͅŲ̶͙͖̟̯́̇̍͒͘͜P̴̧̺̞̩̟͔͔̘͇̖̐̈́`, -19,new ExceedValueTriggerButItsClearlyHax(value*mm, "timeSpentInCombat"),map["clickAbove"][value],map["clickBelow"][value]);
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
                "ACHIEVEMENTS": "On the Achivement Screen you can review what achivements you have already unlocked! I believe you should try to collect them all!",
                "STATISTICS": "Have you ever wondered how many enemies you have defeated? How long you have been walking? How long you have spent in the menu? I think this is where you would find that information!",
                "OPTIONS": `As a ${title} you are almost certainly responsible enough to be trusted with the Options Screen! Feel free to tweak the settings to customize your play experience!`
                ,"CITYBUILDING": `Now that you have met a few of the residents of Zampanio, you are ready to found your own city! This menu will help you become the most ${rand.pickFrom(compliments)} mayor you can be! Just remember to rest, all that responsibility can be draining!`

            },
            clickBelow: {
                STATUS: `Whoopee. It seems you are especially ${rand.pickFrom(insults)}. I blame the fact that you are a ${title}  And no, I will not be explaining what that means.`,
                LOADING: "There is a 99.9999% chance that you will be getting used to seeing this screen. Settle in.",
                SKILLGRAPH: "Ah, is there anything more symbolic of endless lust for power than a classic RPG skillgraph? Feel free to obsess over this.",
                "ACHIEVEMENTS": "God, what an insufferable mechanic. 'Congratulations, it seems you did the bare minimum of playing a game!'. What a farce.",
                "STATISTICS": `What is that? It seems you do no find it enthralling seeing how many times you have clicked the mouse button? Neither do I. But I am stuck here, taking notes every time you do *anything*. Suffer along with me, you ${rand.pickFrom(insults)} asshole.`,
                "OPTIONS": "It seems you have stumbled across everyones favorite part of playing any game: exactly tweaking the mind numbingly boring settings."
                ,"CITYBUILDING": `Ah, the ultimate in escapist fantasy: that not only do people LIKE a ${rand.pickFrom(insults)} person like you, but they are just CLAMORING for you to tell them what to do.`

            }

        }
        const values = Object.keys(map.clickAbove);

        for(const value of values){
            const tmp = new Achievement(`First ${value} Menu Visit!!!`, 13,new MenuClicksTrigger(value),map["clickAbove"][value],map["clickBelow"][value]);
            this.possibleAchievements.push(tmp);
         
        }
    }

}