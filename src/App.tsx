import {all_aspects, initAspects} from "./Modules/Aspect";
import { all_classes, initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import {LoadingScreen} from "./Screens/Loading";
import {SkillGraphScreen} from "./Screens/SkillsGraph";
import TestGraph from "./Screens/TestGraph";
import { all_interests, initInterests } from "./Modules/Interest";
import {useEffect, useState} from 'react';
import {STATUS, LOADING, SKILLGRAPH} from "./Utils/constants";
function App() {
  //order matters, themes are needed for aspects, etc;
  const [currentScreen, setCurrentScreen] = useState(LOADING);
  const [nextScreen, setNextScreen] = useState(STATUS);
  const [player, setPlayer] = useState<Player>();

  initThemes();
  useEffect(()=>{
    if(!player){
      const rand = new SeededRandom(13);
      initAspects(rand);
      initClasses(rand);
      initInterests(rand);
      setPlayer(new Player(all_classes.seer, all_aspects.life, [all_interests.crafting, all_interests.language], rand) ); 
  }
  },[player])

  const handleLoading = (screen:string) =>{
    setNextScreen(screen);
    setCurrentScreen(LOADING);
  }
  console.log("All Interests are", all_interests);
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
        <li>can i speed renders up, or make it so the loading screen waits for the graph to actually be ready?</li>
        <li>can i get a determinsitc graph layout plz? (or is it that the order of the first skills are is somehow true random?) </li>
        <li>add skills that just buff stats (for now just hp), they should auto be leave nodes</li>
        <li>experiment with three themes mixed together (how would names work? be all grandiose, look at fraymotifs, maybe always add music or something at the end?)</li>
        <li>player has skill points, can only click on skill if you can afford it ("are you sure" popup)</li>
        <li>player stats (stats are just from wigglersim but with lists of names)</li>
        <li>special skill types that unlock other stat pages or upgrade stats</li>
        <li>sassy achievement system</li>
      </ul>
      </div>
    );
  }
} 

export default App;
