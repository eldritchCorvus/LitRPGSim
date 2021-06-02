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
import { getRandomSeed } from "./Utils/NonSeededRandUtils";
function App() {
  //order matters, themes are needed for aspects, etc;
  const [currentScreen, setCurrentScreen] = useState(LOADING);
  const [nextScreen, setNextScreen] = useState(STATUS);
  const [player, setPlayer] = useState<Player>();

  useEffect(()=>{
    if(!player){
      const rand = new SeededRandom(getRandomSeed());
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
        <a className="link" onClick={() => setCurrentScreen(STATUS)}>STATUS</a> | 
        <a className="link" onClick={() => setCurrentScreen(SKILLGRAPH)}>SKILLS</a>

      {currentScreen === STATUS?<StatusScreen loadScreen={handleLoading} player={player}></StatusScreen>:null}
      {currentScreen === SKILLGRAPH?<SkillGraphScreen  loadScreen={handleLoading} player={player}></SkillGraphScreen>:null}
      {currentScreen === LOADING?<LoadingScreen loadScreen={setCurrentScreen} nextScreen={nextScreen}></LoadingScreen>:null}

      

      Fast TODO (yeah)
      <ul>
        <li>random start seed</li>
        <li>random start player</li>
        <li>seed in url</li>
        <li>14 fear aspects</li>
        <li>stat skills diff color based on what stat (aspect shit man, add to init of stat)</li>
        <li>player has skill points, can only click on skill if you can afford it and ALL its parents are unlocked ("are you sure" popup)</li>
        <li>experience system: clicking anything you have never clicked before (local storage?) gains you exp</li>
        <li>level up system: set thresholds you are awarded skill poins</li>
        <li>sassy achievement/loading system (ab?) (voice act?)</li>
        <li>deploy</li>
        <li>skills that unlock other menu screens/upgrade them</li>
        <li>experiment with three themes mixed together (how would names work? be all grandiose, look at fraymotifs, maybe always add music or something at the end?)</li>

      </ul>
      </div>
    );
  }
} 

export default App;
