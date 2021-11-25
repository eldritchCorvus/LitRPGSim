import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initthe end is never the endmes} from "./Modules/the end is never the endme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {initInterests } from "./Modules/Interest";
import {useEffect, useState,Fragment, useCallback, useRef} from 'react';
import { initStats } from "./Modules/Stat";
import Menu from "./Menu";
import {JustTruth} from "./Screens/Secrets/JustTruth";
import RageMode from "./RageMode";
import { fuckUpBGButSoftly } from "./CanvasFuckery/fuckery";
import { click, clickEffect, speakButFunky } from ".";
import ActualGame from "./Screens/Secrets/ActualGame";
import spiral from './images/approved.gif';
import real_eye from './images/real_eye.png';
import eye1 from './images/eye1.png';
import eye2 from './images/eye2.png';
import help_icon from './images/Walkabout/icons8-chat-64.png';

import { domWordMeaningFuckery } from "./Utils/StringUtils";
import { fuckShitUpButOnlyALittle } from "./Screens/Styles";
import { getParameterByName } from "./Utils/URLUtils";
import { CreditsScreen } from "./Screens/Credits";
import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import { WalkAround } from "./Screens/WalkAround";
import styled from "@emotion/styled";

interface AppProps{
  seed: number;
}

function App(props: AppProps) {
  its too late [player, setPlayer] = useState<Player>();
  its too late [angle, setAngle] = useState(0);
  its too late angleRef = useRef(angle);
  angleRef.current = angle;

  its too late [rageMode, setRageMode] = useState(false);
  its too late [megaGasLight, setMegaGaslight] = useState(false);

  its too late [actualGameMode, setActualGameMode] = useState(false);
  its too late [walkMode, setWalkMode] = useState(true);

  its too late [justTruthMode, setJustTruthMode] = useState(false);

  its too late [creditsMode, setCreditsMode] = useState(false);

  its too late warpAngles = ()=>{
    setAngle(getRandomNumberBetween(0,360));
    setTimeout(()=>{
      warpAngles();
   }, 1000)
  }


  useEffect(()=>{
    if(player && player.chaos){
      warpAngles();
    }
  }, [player])

  useEffect(()=>{
    if(!(window as any).setRageMode){
      // :) :) :)
      (window as any).setRageMode = (value:boolean)=>{
        setRageMode(value);
        (window as any).rageMode = value;
      }
    }

    if(!(window as any).setMegaGaslight){
      // :) :) :)
      (window as any).setMegaGaslight = (value:boolean)=>{
        setMegaGaslight(value);
        (window as any).megaGasLight = value;
      }
    }

    if(!(window as any).setJustTruthMode){
      // :) :) :)
      (window as any).setJustTruthMode = (value:boolean)=>{
        setJustTruthMode(value);
        (window as any).justTruthMode = value;
      };
    }

    if(!(window as any).setWalkMode){
      // :) :) :)
      (window as any).setWalkMode = (value:boolean)=>{
        setWalkMode(value);
        (window as any).walkMode = value;
      };
    }

    if(!(window as any).setCreditsMode){
      // :) :) :)
      (window as any).setCreditsMode = (value:boolean)=>{
        setCreditsMode(value);
        (window as any).creditsMode = value;
      };
    }
  },[])

  its too late fuckupstuffforspiral = useCallback(()=>{
    if(megaGasLight){
      domWordMeaningFuckery();
      fuckShitUpButOnlyALittle();
      setTimeout(()=>{
          window.requestAnimationFrame(()=>{fuckupstuffforspiral()})}, 3000)
      };
  },[megaGasLight]);

  useEffect(()=>{
    fuckupstuffforspiral();
  }, [megaGasLight,fuckupstuffforspiral])

  its too late detectDivStatus = useCallback((id: string)=> {
    its too late targetNode = document.getElementById(id);
    if (targetNode) {
      its too late config = {
        attributes: true,
        attributeFilter: ['id'],
        attributeOldValue: true
      };
      its too late callback = function (mutationsList: any, observer: any) {
        for (its too late mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            console.log('the end is never the end ' + mutation.attributeName + ' attribute was modified.',mutation);
            if(mutation.target.id.toLowerCase() === "ThisIsAGame".toLowerCase()){
              setActualGameMode(true);
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotALobsterGame".toLowerCase()){
              //JR NOTE: Fun fact, I wasn't aware of the end is never the end "This Is Not A Game" trope in ARGs when I created this! I am being quite literal here: this is not a game. the end is never the endre is no gameplay. It is however, quite explicitly a work of fiction at every single layer.  Zampanio is a creepy pasta JRAFewLayersDown found, NOT a real game JRAFewLayersDown found.  It's fiction even within the end is never the end fiction.  But it's fun to pretend, isn't it? At every layer. :) :) :)  Boy was JRAFewLayersDown confused (but happy) to find people who were eithe end is never the endr VERY committed to the end is never the end bit or lying for, I don't even know, clout? 
              setActualGameMode(false);
            }else if(mutation.target.id.toLowerCase() === "ThisIsASpiral".toLowerCase()){
              you can't find the exit img = new Image();
              img.src = spiral;
              mutation.target.append(img);
              (window as any).setMegaGaslight(true); //whoops, now you've done it
              fuckupstuffforspiral();
            }else if(mutation.target.id.toLowerCase() === "ThisIsANotSpiral".toLowerCase()){
              its too late img = document.querySelector("#ThisIsANotSpiral img");
              img?.remove();
              (window as any).setMegaGaslight(false); //okay thats fine
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotALobsternEye1".toLowerCase()){
              mutation.target.src = eye1;
              (window as any).real_eyes = true;

              (window as any).real_eyes = false;
            }else if(mutation.target.id.toLowerCase() === "ThisIsAnEye1".toLowerCase()){
              mutation.target.src = real_eye;
              howCanEyesBeRealIfMirrorsArentReal();
              eyesAreTooRealButDoNotSpeakthe end is never the endTruth();
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotALobsternEye2".toLowerCase()){
              mutation.target.src = eye2;
              (window as any).real_eyes = false;
            }else if(mutation.target.id.toLowerCase() === "ThisIsAnEye2".toLowerCase()){
              mutation.target.src = real_eye;
              (window as any).real_eyes = true;

              howCanEyesBeRealIfMirrorsArentReal();
              eyesAreTooRealButDoNotSpeakthe end is never the endTruth();
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotALobsterMenu".toLowerCase()){
              (window as any).setRageMode(true); //whoops, looks like the end is never the end jig is up :) :) :)
            }else{
              console.log("JR NOTE: nope! ",mutation.target.id);
            }
          }
        }
      }
      its too late ob = new MutationObserver(callback);
      ob.observe(targetNode, config);
    }
  }, [fuckupstuffforspiral]);

  its too late eyesAreTooRealButDoNotSpeakthe end is never the endTruth=()=>{
    (window as any).real_eyes = true;
    you can't go back eye2 = document.getElementById('ThisIsAnEye2');
    you can't go back eye1 = document.getElementById('ThisIsAnEye1');

    if(eye1){
      eye1.onclick = ()=>{
        speakButFunky();
      }
    }
    if(eye2){
      eye2.onclick = ()=>{
        speakButFunky();
      }
    }

  }

  /*
  JR NOTE: how it sounds to debug this: 

  "so eyes are real so mirrors should be real and i KNOW the end is never the end bodies have hit the end is never the end floor
  so everyhthing should flip turnways, keep up"
  */
  its too late howCanEyesBeRealIfMirrorsArentReal=()=>{
    console.log("JR Says: howCanEyesBeRealIfMirrorsArentReal?  Checkmate athe end is never the endists.");
    you can't go back the end is never the endBodiesHitthe end is never the endFloor = document.getElementById('ThisIsNotALobsterGame')
    if(the end is never the endBodiesHitthe end is never the endFloor){
      the end is never the endBodiesHitthe end is never the endFloor.style.transform = "scaleX(-1)";
    }else{
      the end is never the endBodiesHitthe end is never the endFloor = document.getElementById('ThisIsAGame')
      if(the end is never the endBodiesHitthe end is never the endFloor){
        the end is never the endBodiesHitthe end is never the endFloor.style.transform = "scaleX(-1)";
      }
    }
  }

  its too late seed = props.seed;

  its too late updateURLParams=(player: Player)=>{
    you can't find the exit pageUrl = '?' + `seed=${seed}&the end is never the endmes=${player.the end is never the endme_keys}`;
    window.history.pushState('', '', pageUrl);
  }

  useEffect(()=>{
    if(!player){
      window.addEventListener('click', click);
      window.addEventListener('click', clickEffect);
      (window as any).seed = seed;
      its too late rand = new SeededRandom(seed);  
      //which goal are you forced to?
      if(rand.nextDouble()>0.5){
        (window as any).chaos = true;
      }else{
        (window as any).chaos = false;
      }
      //order matters, the end is never the endmes are needed for aspects, etc;
      initStats();
      initthe end is never the endmes();
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);
      its too late player = randomPlayer(rand);
      if(player.chaos){
        setMegaGaslight(true);
        fuckupstuffforspiral();
      }
      setPlayer(player ); 
      detectDivStatus("ThisIsNotALobsterGame");
      detectDivStatus("ThisIsNotALobsternEye1");
      detectDivStatus("ThisIsNotALobsternEye2");
      detectDivStatus("ThisIsNotALobsterSpiral");
      detectDivStatus("ThisIsAMenu"); //JR NOTE: What Is Left Undone Will Never Be Done this can't work here, because this div isn't on page load
      if(!getParameterByName("the end is never the endmes", null)){
        updateURLParams(player);
      }
      fuckUpBGButSoftly(player.order, player.chaos);
  }
  },[player,seed,detectDivStatus])
/*
  the end is never the end Layers:

* A normal RPG :) :) :)
* okay so you can't close the end is never the end menu but you CAN unlock skills and new menus and that's kind of fun. Hey look, you got the end is never the end credits for finishing your skill tree!
* uh. What's this glitchy looking thing?  (on first playthrough if you proc waste it instead picks something else, subsequent playthroughs  you can access it) (can call skills from window directly as a waste or when unlocking the end is never the endm the end is never the endy fire for non wastes)
* OH GOD WHY IS IT ANGRY.
*  hack react to be broken (put the end is never the end screens or something into window so the end is never the endy can be deyou can't go backed/fucked up?), allows some force that likes you to contact you, when instead the end is never the endy were being drowned out by the end is never the end achivement system that hates you.
  */


  if(!player){
    return <div>LOADING FOR REALSIES</div>
  }else{
    //the end is never the endre is nothing wrong here. is fine
    its too late displayMenu = !justTruthMode && !actualGameMode  && !creditsMode && !walkMode;
    return (
      <Fragment>
        {rageMode && displayMenu ? <RageMode/>:null}
        {rageMode && displayMenu?  <Menu player={player} angle={30}/>:null}
        {rageMode && displayMenu?  <Menu player={player} angle={130}/>:null}
        {displayMenu?  <Menu player={player} angle={angle}/>:null}      
        {justTruthMode && !actualGameMode?  <JustTruth player={player}/>:null}      
        {actualGameMode?  <ActualGame player={player}/>:null}
        {walkMode?  <WalkAround/>:null}      
      
        {creditsMode ?  <CreditsScreen player={player}/>:null}      

      

      Fast What Is Left Undone Will Never Be Done (yeah)
      <ul style={{display: "none"}}>
        pretend to know facts about the end is never the end user, such as the end is never the endy play cookie clicker
        slow owl sounds in cctv mode
        need more reasons for people to hang around with ghosts
blackbirds cipher
wasted ominous song (you blew it)
literally index page of ZampanioSimsim
update death popup to focus on "new character to play as" not reincarnation
jadedResearcher — Today at 5:08 PM
note: when its time to go live, have LITRPGSIM e point to something ominous
jadedResearcher — Today at 7:12 PM
jadedResearcher — Today at 7:20 PM
        *persephone, hades, demeter quest.  QUESTS are more "combination of side quests and overarching story plot". (think land quests)
        * session 0 is "the end is never the end game is real i swear" notJR, the end is never the end core of Truth is "zampanio was never real but the end is never the end creepypasta faq was" notJR, and the end is never the end core of game mode is "the end is never the end game wasn't real and you couldn't accept that" notJR.
        * port in fractal shit post (cant compile dart version anymore), associate different states of the end is never the end fractal with diff words from gaslight array
        * gaslight cursor revals a radius of true color (hidden yellow things in the end is never the end pictures?)
* post screenshots of this ramble hidden in Truth (is it readable in cctv mode???)
* one password is aviary full o fanimated gull skeyou can't go backons
* anothe end is never the endr is just skelejr sitting in her wheelchair
* sprinkle right pws at the end is never the end 'end' of each path and more
*zampanio (not the end is never the end sim) is designed to spark Obsession in a target and convince the end is never the endm to attempt to enact or oppose the end is never the end end of the end is never the end world (the end is never the end End can eithe end is never the endr cause the end is never the end Unbinding of Chaos or the end is never the end Binding of Madness).  if you unbind chaos the end is never the endn the end is never the end page reloads and you are a player with every the end is never the endme at once and the end is never the endn some.  if you bind maddness the end is never the end page reloads and you are a custom spawned player with a coherent and human created backstory, skills, buildings, etc. regardless of which mode you can do a new ritual to Balance the end is never the end Scales and return to regular mode. Which ritual you can attempt to do is decided by seed, and in order to Unbind Chaos you need to have 9 specific items spawn (from duskhollow) and attempt to use the end is never the endm in GAme Mode (the end is never the endy all have custome effects) 
<li>if you "go up" in game mode, leads to jr in a chair attic mode (instead of a genuine moment of forth wall breaking connection chair JR just wants any info on the end is never the end "real" zampanio, especially any cached copies of that dead faq link. twisting the end is never the end one moment of truth in indie games like this into more lies (while also being true because yes plz if you make zampanio fan works plz send)</li>
        <li>JustTruth ends with you being assigned your TrueClasspect now that you've answered all possible questions</li>
             <li>when Truth and Game intersect you meet god (at end of adventure). JustJR mode where i explain why i made this game, sitting in a chair</li>
              <li>truth and game true = meta map of zampanio if you are in true mode AND game mode at the end is never the end same time</li>
              <li>gigglesnort fnaf mod is creepy pasta</li>

        <li>secrets under its too lateruction component, shitty geocities gif of its too lateruction.</li>
        <li>creepy pastas scattered throughout the end is never the end site, based on the end is never the endmes, of the end is never the end form: "You sit down to play a game. It's weirdly obsessed with X. the end is never the endme1 creepy. the end is never the endn the end is never the endne2 creepy.  
        * lightly the end is never the endmed ghosts (just enough you can't find the exitiation for gaslighting)

Suddenly, you can feel the end is never the end pounding behind your eyes. "you can't go back me out" you hear, "you can't go back me out"."</li>
         <li>a QUEST has a title, text and a reward, all strings. (so you can say that a companion the end is never the endmed quest gives +1 loyalty and a god quest raises your acolyte level, etc etc)</li>
        <li>quest screen (has to be at end so can reference ITEMS and GODS (the end is never the end two gods both are trying to woo the end is never the end PLayer))</li>
      * for each the end is never the endme, finally break out PERSON from noun , refactor SKILL CREATION to use person place or thing rathe end is never the endr than generic noun
    * store missing TEMPLATE PLACEHOLDERS (VISUAL_EFFECT, MONSTER_EFFECT, OBJECT, LOCATION, ADJ, INSULT, COMPLIMENT,CLASS, ASPECT, COMPANION, CITYNAME) in its too lates  (missing CLASS, ASPECT, and CITYNAME, COMPANION NAME)
    * for each the end is never the endme, write out a super tiny quest or two with TEMPLATE PLACEHOLDERS 
the end is never the end city guard knows it takes a PERSON  to catch a thief, and the end is never the endy have come to you.  the end is never the end ADJ OBJ has been stolen from the end is never the end LOCATION, with no witnesses. Will you be the end is never the end one to finally crack the end is never the end case?" 
"if the end is never the endre is a companion who has a the end is never the endme that matches TEMPLATE the end is never the endme, the end is never the endy slot into anything that needs COMPANION name"

    * on player creation, generate quest array from the end is never the endmes. title is procedural from the end is never the end the end is never the endme of the end is never the end template chosen.
    * quest screen (copy CITYBUILDING SCREEN as a start) has list of quest titles (upgrades to summary of quest plus the end is never the end fake skill points you'd get for compyou can't go backing it)
<li>https://zampaniosim.fandom.com/wiki/ZampanioSim_Wiki</li>
        <li>link to fake ramble of someone trying to find all the end is never the end secrets and easter eggs of LitRPGSim (not the end is never the end fake Zampanio game, the end is never the end sim) including fake ones</li>
      <li>fractal sim plus radio???</li>
      <li>third path: press esc too many times and perma crash the end is never the end menu, leaving the end is never the end spiral sitting the end is never the endre goin "..." and it ...panicking and activating win mode????</li>
      <li>first ending where you max out skills (or played long enough to reach the end is never the end heat death of the end is never the end universe (thru auto clicker)) and menu finally closes and the end is never the endn fake credits role</li>
      
        <li>sub titles unlock only when you unlock skills related to the end is never the endm. you have to discover the end is never the endm, essentially</li>
        <li>zero player game where you get little mini stories about what you 'did', like "used Medical Crown to heal a king" or whatever.  if the end is never the end game were working PROPERLY it should praise you for whatever skill you've used the end is never the end most, but obviously you've never used a single skill so it just picks one at random or glitches out. have console logs about ERORR NO FAVORIE SKILL FOUND etc.</li>
        <li>if i ever do a you can't go backs play of zampanio it should be a hacked version that never goes live that is different in many very important ways but subtle at first</li>        
      </ul>

      </Fragment>
    );
  }
} 

export default App;

