import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
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

import { domWordMeaningFuckery } from "./Utils/StringUtils";
import { fuckShitUpButOnlyALittle } from "./Screens/Styles";
import { getParameterByName } from "./Utils/URLUtils";
import { CreditsScreen } from "./Screens/Credits";
import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";

interface AppProps{
  seed: number;
}

function App(props: AppProps) {
  const [player, setPlayer] = useState<Player>();
  const [angle, setAngle] = useState(0);
  const angleRef = useRef(angle);
  angleRef.current = angle;

  const [rageMode, setRageMode] = useState(false);
  const [megaGasLight, setMegaGaslight] = useState(false);

  const [actualGameMode, setActualGameMode] = useState(false);

  const [justTruthMode, setJustTruthMode] = useState(false);

  const [creditsMode, setCreditsMode] = useState(false);

  const warpAngles = ()=>{
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

    if(!(window as any).setCreditsMode){
      // :) :) :)
      (window as any).setCreditsMode = (value:boolean)=>{
        console.log("JR NOTE: setting credits mode to ", value);
        setCreditsMode(value);
        (window as any).creditsMode = value;
      };
    }
  },[])

  const fuckupstuffforspiral = useCallback(()=>{
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

  const detectDivStatus = useCallback((id: string)=> {
    const targetNode = document.getElementById(id);
    if (targetNode) {
      const config = {
        attributes: true,
        attributeFilter: ['id'],
        attributeOldValue: true
      };
      const callback = function (mutationsList: any, observer: any) {
        for (const mutation of mutationsList) {
          if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.',mutation);
            if(mutation.target.id.toLowerCase() === "ThisIsAGame".toLowerCase()){
              setActualGameMode(true);
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAGame".toLowerCase()){
              setActualGameMode(false);
            }else if(mutation.target.id.toLowerCase() === "ThisIsASpiral".toLowerCase()){
              var img = new Image();
              img.src = spiral;
              mutation.target.append(img);
              (window as any).setMegaGaslight(true); //whoops, now you've done it
              fuckupstuffforspiral();
            }else if(mutation.target.id.toLowerCase() === "ThisIsANotSpiral".toLowerCase()){
              const img = document.querySelector("#ThisIsANotSpiral img");
              img?.remove();
              (window as any).setMegaGaslight(false); //okay thats fine
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAnEye1".toLowerCase()){
              mutation.target.src = eye1;
              (window as any).real_eyes = true;

              (window as any).real_eyes = false;
            }else if(mutation.target.id.toLowerCase() === "ThisIsAnEye1".toLowerCase()){
              mutation.target.src = real_eye;
              howCanEyesBeRealIfMirrorsArentReal();
              eyesAreTooRealButDoNotSpeakTheTruth();
              console.log("JR NOTE: make the eye be the photo-realistic eye again (note will only get picked up in rage mode)")
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAnEye2".toLowerCase()){
              mutation.target.src = eye2;
              (window as any).real_eyes = false;
            }else if(mutation.target.id.toLowerCase() === "ThisIsAnEye2".toLowerCase()){
              mutation.target.src = real_eye;
              (window as any).real_eyes = true;

              howCanEyesBeRealIfMirrorsArentReal();
              eyesAreTooRealButDoNotSpeakTheTruth();
            }else if(mutation.target.id.toLowerCase() === "ThisIsNotAMenu".toLowerCase()){
              (window as any).setRageMode(true); //whoops, looks like the jig is up :) :) :)
            }else{
              console.log("JR NOTE: nope! ",mutation.target.id);
            }
          }
        }
      }
      const ob = new MutationObserver(callback);
      ob.observe(targetNode, config);
    }
  }, [fuckupstuffforspiral]);

  const eyesAreTooRealButDoNotSpeakTheTruth=()=>{
    (window as any).real_eyes = true;
    let eye2 = document.getElementById('ThisIsAnEye2');
    let eye1 = document.getElementById('ThisIsAnEye1');

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

  "so eyes are real so mirrors should be real and i KNOW the bodies have hit the floor
  so everyhthing should flip turnways, keep up"
  */
  const howCanEyesBeRealIfMirrorsArentReal=()=>{
    console.log("JR Says: howCanEyesBeRealIfMirrorsArentReal?  Checkmate atheists.");
    let theBodiesHitTheFloor = document.getElementById('ThisIsNotAGame')
    if(theBodiesHitTheFloor){
      theBodiesHitTheFloor.style.transform = "scaleX(-1)";
    }else{
      theBodiesHitTheFloor = document.getElementById('ThisIsAGame')
      if(theBodiesHitTheFloor){
        theBodiesHitTheFloor.style.transform = "scaleX(-1)";
      }
    }
  }

  const seed = props.seed;

  useEffect(()=>{
    if(!player){
      window.addEventListener('click', click);
      window.addEventListener('click', clickEffect);
      (window as any).seed = seed;
      const rand = new SeededRandom(seed);  
      //which goal are you forced to?
      if(rand.nextDouble()>0.5){
        (window as any).chaos = true;
      }else{
        (window as any).chaos = false;
      }
      //order matters, themes are needed for aspects, etc;
      initStats();
      initThemes();
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);
      const player = randomPlayer(rand);
      if(player.chaos){
        setMegaGaslight(true);
        fuckupstuffforspiral();
      }
      setPlayer(player ); 
      detectDivStatus("ThisIsNotAGame");
      detectDivStatus("ThisIsNotAnEye1");
      detectDivStatus("ThisIsNotAnEye2");
      detectDivStatus("ThisIsNotASpiral");
      detectDivStatus("ThisIsAMenu"); //JR NOTE: TODO this can't work here, because this div isn't on page load
      
      fuckUpBGButSoftly();
  }
  },[player,seed,detectDivStatus])
/*
  The Layers:

* A normal RPG :) :) :)
* okay so you can't close the menu but you CAN unlock skills and new menus and that's kind of fun. Hey look, you got the credits for finishing your skill tree!
* uh. What's this glitchy looking thing?  (on first playthrough if you proc waste it instead picks something else, subsequent playthroughs  you can access it) (can call skills from window directly as a waste or when unlocking them they fire for non wastes)
* OH GOD WHY IS IT ANGRY.
*  hack react to be broken (put the screens or something into window so they can be deleted/fucked up?), allows some force that likes you to contact you, when instead they were being drowned out by the achivement system that hates you.
  */


  if(!player){
    return <div>LOADING FOR REALSIES</div>
  }else{
    //there is nothing wrong here. is fine
    const displayMenu = !justTruthMode && !actualGameMode  && !creditsMode;
    return (
      <Fragment>
        <button onClick={()=> setRageMode(!rageMode)}>TEST RAGE MODE PLZ</button>
        {rageMode && displayMenu ? <RageMode/>:null}
        {rageMode && displayMenu?  <Menu player={player} angle={30}/>:null}
        {rageMode && displayMenu?  <Menu player={player} angle={130}/>:null}
        {displayMenu?  <Menu player={player} angle={angle}/>:null}      
        {justTruthMode && !actualGameMode?  <JustTruth player={player}/>:null}      
        {actualGameMode?  <ActualGame player={player}/>:null}      
        {creditsMode ?  <CreditsScreen player={player}/>:null}      

      

      Fast TODO (yeah)
      <ul style={{display: "none"}}>
        * session 0 is "the game is real i swear" notJR, the core of Truth is "zampanio was never real but the creepypasta faq was" notJR, and the core of game mode is "the game wasn't real and you couldn't accept that" notJR.
        * gaslight cursor revals a radius of true color (hidden yellow things in the pictures?)
* post screenshots of this ramble hidden in Truth (is it readable in cctv mode???)
* one password is aviary full o fanimated gull skeletons
* another is just skelejr sitting in her wheelchair
* right passwords get custom images and LORE (of some sort)
* sprinkle right pws at the 'end' of each path and more
* attic sim 2x combo, one lies, one truths (like that riddle, except one attic is game mode and one is truth mode)
*zampanio (not the sim) is designed to spark Obsession in a target and convince them to attempt to enact or oppose the end of the world (the End can either cause the Unbinding of Chaos or the Binding of Madness).  if you unbind chaos then the page reloads and you are a player with every theme at once and then some.  if you bind maddness the page reloads and you are a custom spawned player with a coherent and human created backstory, skills, buildings, etc. regardless of which mode you can do a new ritual to Balance the Scales and return to regular mode. Which ritual you can attempt to do is decided by seed, and in order to Unbind Chaos you need to have 9 specific items spawn (from duskhollow) and attempt to use them in GAme Mode (they all have custome effects) 
<li>if you "go up" in game mode, leads to jr in a chair attic mode (instead of a genuine moment of forth wall breaking connection chair JR just wants any info on the "real" zampanio, especially any cached copies of that dead faq link. twisting the one moment of truth in indie games like this into more lies (while also being true because yes plz if you make zampanio fan works plz send)</li>
        <li>JustTruth ends with you being assigned your TrueClasspect now that you've answered all possible questions</li>
             <li>when Truth and Game intersect you meet god (at end of adventure). JustJR mode where i explain why i made this game, sitting in a chair</li>
              <li>truth and game true = meta map of zampanio if you are in true mode AND game mode at the same time</li>
              <li>gigglesnort fnaf mod is creepy pasta</li>

        <li>add references to https://scp-wiki.wikidot.com/scp-001-ex</li>
        <li>secrets under construction component, shitty geocities gif of construction.</li>
        <li>creepy pastas scattered throughout the site, based on themes, of the form: "You sit down to play a game. It's weirdly obsessed with X. theme1 creepy. then thene2 creepy.  
        * lightly themed ghosts (just enough variation for gaslighting)

Suddenly, you can feel the pounding behind your eyes. "let me out" you hear, "let me out"."</li>
        <li> quests screen</li>
         <li>a QUEST has a title, text and a reward, all strings. (so you can say that a companion themed quest gives +1 loyalty and a god quest raises your acolyte level, etc etc)</li>
        <li>quest screen (has to be at end so can reference ITEMS and GODS (the two gods both are trying to woo the PLayer))</li>
      * for each theme, finally break out PERSON from noun , refactor SKILL CREATION to use person place or thing rather than generic noun
    * store missing TEMPLATE PLACEHOLDERS (VISUAL_EFFECT, MONSTER_EFFECT, OBJECT, LOCATION, ADJ, INSULT, COMPLIMENT,CLASS, ASPECT, COMPANION, CITYNAME) in consts  (missing CLASS, ASPECT, and CITYNAME, COMPANION NAME)
    * for each theme, write out a super tiny quest or two with TEMPLATE PLACEHOLDERS 
The city guard knows it takes a PERSON  to catch a thief, and they have come to you.  The ADJ OBJ has been stolen from the LOCATION, with no witnesses. Will you be the one to finally crack the case?" 
"if there is a companion who has a theme that matches TEMPLATE theme, they slot into anything that needs COMPANION name"

    * on player creation, generate quest array from themes. title is procedural from the theme of the template chosen.
    * quest screen (copy CITYBUILDING SCREEN as a start) has list of quest titles (upgrades to summary of quest plus the fake skill points you'd get for completing it)
<li>https://zampaniosim.fandom.com/wiki/ZampanioSim_Wiki</li>
           <li>2/1/7 is the password to SOMETHING because OBs bday is all divisible by 3 to get that</li>
        <li>LORE screen re-uses place locations to write little stories about your char finding out facts of the setting</li>
        <li>"here, have a map of this labrynth.  it makes no sense and was created by madmen and liars.  but if you stare at it enough, you might recognize something important when the time comes"</li>
        <li>link to fake ramble of someone trying to find all the secrets and easter eggs of LitRPGSim (not the fake Zampanio game, the sim) including fake ones</li>
        <li>fake chatbot in JUST TRUTH MODE, reference Binary</li>
     <li>each page should have secrets that loop in on each other (binary password getting you past options maybe)</li>
      <li>for all statistics, detect dom hax adn react accordingly (including RAGE MODE)</li>
        <li>what happens if i have more menu items than room to display?</li>
        <li>house of leaves like narrative where being exposed to enough of this makes you want to make your own derivative</li>
        <li>just truth mode has a secret adventure game in it (randomly generated but using the themes). to access it you click the black under the actual text.</li>
      <li>status, options, achivements, statistics, skills screen upgrades is gated to menu level</li>
      <li>inventory screen has initial objects but ACHIEVEMENTS also award items.</li>
      <li>quest screen ADDs achievements to the system</li>
      <li>win mode: when you unlock all skills</li>
      <li>fractal sim plus radio???</li>
      <li>third path: press esc too many times and perma crash the menu, leaving the spiral sitting there goin "..." and it ...panicking and activating win mode????</li>
      <li>menu screen you can ONLY get to via hacking (leads to Just Monika But Spades Quiz Mode)</li>
      <li>special seeds that have story content, maybe voice acted stuff</li>
      <li>credit: </li>
      <li>first ending where you max out skills (or played long enough to reach the heat death of the universe (thru auto clicker)) and menu finally closes and then fake credits role</li>
      <li>win game, roll credits, if max skill tree OR enough time has passed.</li>
      <li>encourage replays with fake credits</li>
      <li>worship the skill tree</li>
      <li>one custom seed besides 13</li>
      <li>title system can add/unlock skills like kin eater giving heretic magic</li>
      <li>waste/seer/mage classes get option screen, etc</li>
      <li>music, plus fucked up music for rage mode. subtle fuck ups for normal mode?</li>
        <li>allow literal hacking of DOM too, if they edit statistics page, slorp it up.</li>
        <li>later, make it so if its your first playthrough (check local storage) and you get waste class it changes to something else.</li>
        <li>implement more achivment trigger types</li>
        <li>sub titles unlock only when you unlock skills related to them. you have to discover them, essentially</li>
        <li>murder yellow text</li>
        <li>skills that unlock other menu screens/upgrade them (replace a stat with it)</li>
        <li>zero player game where you get little mini stories about what you 'did', like "used Medical Crown to heal a king" or whatever.  if the game were working PROPERLY it should praise you for whatever skill you've used the most, but obviously you've never used a single skill so it just picks one at random or glitches out. have console logs about ERORR NO FAVORIE SKILL FOUND etc.</li>
        <li>if i ever do a lets play of zampanio it should be a hacked version that never goes live that is different in many very important ways but subtle at first</li>        
      </ul>
      </Fragment>
    );
  }
} 

export default App;

