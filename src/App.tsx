import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {initInterests } from "./Modules/Interest";
import {useEffect, useState,Fragment} from 'react';
import { initStats } from "./Modules/Stat";
import { getRandomSeed, numbertoseed } from "./Utils/NonSeededRandUtils";
import { getParameterByName } from "./Utils/URLUtils";
import Menu from "./Menu";
import RageMode from "./RageMode";
import { fuckUpBGButSoftly } from "./CanvasFuckery/fuckery";
import { isNumeric } from "./Utils/StringUtils";
import { playSong } from "./Utils/MusicPlayer";


function App() {
  const [player, setPlayer] = useState<Player>();
  const [rageMode, setRageMode] = useState(false);

  useEffect(()=>{
    if(!(window as any).setRageMode){
      // :) :) :)
      (window as any).setRageMode = setRageMode;
    }
  },[])



  useEffect(()=>{
    if(!player){
      fuckUpBGButSoftly();
      let urlseed:string|number|null = getParameterByName("seed",null);
      console.log("url seed is", urlseed);
      let initial_seed;
      if (urlseed){
        if(!isNumeric(urlseed)){
            initial_seed = numbertoseed(urlseed);
        }else{
          initial_seed = parseInt(urlseed);
        }
        console.log("initial_seed seed is", initial_seed);

      }

      if(!initial_seed){
        initial_seed= getRandomSeed();
      }
      const rand = new SeededRandom(initial_seed);  
      //order matters, themes are needed for aspects, etc;
      initStats();
      initThemes();
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);
      setPlayer(randomPlayer(rand) ); 
  }
  },[player])
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

    return (
      <Fragment>
        <button onClick={()=> setRageMode(!rageMode)}>TEST RAGE MODE PLZ</button>
        {rageMode? <RageMode/>:null}
        {rageMode?  <Menu player={player} angle={30}/>:null}
        {rageMode?  <Menu player={player} angle={130}/>:null}

        <Menu player={player} angle={0}/>
      

      

      Fast TODO (yeah)
      <ul style={{display: "none"}}>
        <li>music integration note to self airship rpgmaker ace music is my waifu</li>
        <li>skills to raise level of menu tab by one (if it goes over 0 it unlocks)</li>
        <li>each class has an associated SET OF MENUS and generates skills to raise them by 1 sprinkled throughout the skill graph (replacing stats, same way waste works)</li>
      <li>status screen upgrades is gated to skills</li>
      <li>menu screen you can ONLY get to via hacking (shows how to resolve RAGEMODE?)</li>
      <li>special seeds that have story content, maybe voice acted stuff</li>
      <li>first ending where you max out skills and menu finally closes and then fake credits role</li>
      <li>encourage replays with fake credits</li>
      <li>worship the skill tree</li>
      <li>title system can add/unlock skills like kin eater giving heretic magic</li>
      <li>fill in todos in status etc</li>
      <li>waste/seer/mage classes get option screen, etc</li>
      <li>music, plus fucked up music for rage mode. subtle fuck ups for normal mode?</li>
        <li>allow literal hacking of DOM too, if they edit statistics page, slorp it up.</li>
        <li>later, make it so if its your first playthrough (check local storage) and you get waste class it changes to something else.</li>
        <li>implement more achivment trigger types</li>
        <li>sub titles unlock only when you unlock skills related to them. you have to discover them, essentially</li>
        <li>murder yellow text</li>
        <li>skills that unlock other menu screens/upgrade them (replace a stat with it)</li>
        <li>zero player game where you get little mini stories about what you 'did', like "used Medical Crown to heal a king" or whatever.  if the game were working PROPERLY it should praise you for whatever skill you've used the most, but obviously you've never used a single skill so it just picks one at random or glitches out. have console logs about ERORR NO FAVORIE SKILL FOUND etc.</li>
        <li>experiment with three themes mixed together (how would names work? be all grandiose, look at fraymotifs, maybe always add music or something at the end?)</li>

      </ul>
      </Fragment>
    );
  }
} 

export default App;

