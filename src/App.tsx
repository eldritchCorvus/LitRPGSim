import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import {LoadingScreen} from "./Screens/Loading";
import {SkillGraphScreen} from "./Screens/SkillsGraph";
import {initInterests } from "./Modules/Interest";
import {useEffect, useState} from 'react';
import {STATUS, LOADING, SKILLGRAPH} from "./Utils/constants";
import { initStats } from "./Modules/Stat";
import { getRandomSeed, numbertoseed } from "./Utils/NonSeededRandUtils";
import { getParameterByName } from "./Utils/URLUtils";
function App() {
  //order matters, themes are needed for aspects, etc;
  const [currentScreen, setCurrentScreen] = useState(LOADING);
  const [nextScreen, setNextScreen] = useState(STATUS);
  const [player, setPlayer] = useState<Player>();

  useEffect(()=>{
    if(!player){
      let urlseed:string|number|null = getParameterByName("seed",null);
      let initial_seed;
      if (urlseed){
        initial_seed = numbertoseed(urlseed);
      }

      if(!initial_seed){
        initial_seed= getRandomSeed();
      }
      const rand = new SeededRandom(initial_seed);
      initStats();
      initThemes();
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);

      setPlayer(randomPlayer(rand) ); 
  }
  },[player])

  const handleLoading = (screen:string) =>{
    setNextScreen(screen);
    setCurrentScreen(LOADING);
  }
  if(!player){
    return <div>LOADING FOR REALSIES</div>
  }else{

    return (
      <div>
        <div>TODO design this better</div>
        <a className="link" onClick={() => {
          //warning: since these are async this might not be the best idea.
          setNextScreen(STATUS);
          setCurrentScreen(LOADING)}
          }>STATUS</a> | 
        <a className="link" onClick={() =>{
          setNextScreen(SKILLGRAPH);
      setCurrentScreen(LOADING)}
      }>SKILLS</a>

      {currentScreen === STATUS?<StatusScreen loadScreen={handleLoading} player={player}></StatusScreen>:null}
      {currentScreen === SKILLGRAPH?<SkillGraphScreen  loadScreen={handleLoading} player={player}></SkillGraphScreen>:null}
      {currentScreen === LOADING?<LoadingScreen loadScreen={setCurrentScreen} nextScreen={nextScreen}></LoadingScreen>:null}

      

      Fast TODO (yeah)
      <ul>
        <li>Achievements screen</li>
        <li>implement more achivment trigger types</li>
        <li>achivements award skill points</li>
        <li>record every time you hit ESC as an error, make up a convincing error about menu.close not found.</li>
        <li>if errors build up enough, swap above and below text, regenerate skills filled with insults instead of nouns or adjs</li>
        <li>sub titles unlock only when you unlock skills related to them. you have to discover them, essentially</li>
        <li>actually compile this and put an experimental version on the web</li>
        <li>murder yellow text</li>
        <li>player has skill points, can only click on skill if you can afford it and ALL its parents are unlocked ("are you sure" popup)</li>
        <li>skills that unlock other menu screens/upgrade them</li>
        <li>zero player game where you get little mini stories about what you 'did', like "used Medical Crown to heal a king" or whatever.  if the game were working PROPERLY it should praise you for whatever skill you've used the most, but obviously you've never used a single skill so it just picks one at random or glitches out. have console logs about ERORR NO FAVORIE SKILL FOUND etc.</li>
        <li>experiment with three themes mixed together (how would names work? be all grandiose, look at fraymotifs, maybe always add music or something at the end?)</li>

      </ul>
      </div>
    );
  }
} 

export default App;
