import {initAspects} from "./Modules/Aspect";
import {initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player, randomPlayer} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import {LoadingScreen} from "./Screens/Loading";
import {SkillGraphScreen} from "./Screens/SkillsGraph";
import {initInterests } from "./Modules/Interest";
import React, {useEffect, useState,Fragment} from 'react';
import {STATUS, LOADING, SKILLGRAPH, ACHIEVEMENTS, STATISTICS} from "./Utils/constants";
import { initStats } from "./Modules/Stat";
import { getRandomSeed, numbertoseed } from "./Utils/NonSeededRandUtils";
import { getParameterByName } from "./Utils/URLUtils";
import { useTabState, Tab, TabList, TabPanel } from "reakit/Tab";
import { MenuBox } from "./Screens/Styles";
import { StatisticsScreen } from "./Screens/Statisics";
import { AchivementsScreen } from "./Screens/Achivements";


const selectedTab = {
  "border": "1px solid black",
  "fontSize":"24px",
  "background": "white",
  "borderBottom": "2px solid white",
  "borderRadius": "5px",
  "borderBottomLeftRadius": "0px",
  "borderBottomRightRadius": "0px",
}

const unSelectedTab = {
  "border": "none",
  "fontSize":"24px",
  "background": "white",
}

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


  const tab = useTabState();

  //screen and tab should stay in sync plz
  useEffect(()=>{
    tab.setSelectedId(currentScreen);
  }, [currentScreen])

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

      <MenuBox>
        {
          currentScreen === LOADING?
            <LoadingScreen loadScreen={setCurrentScreen} nextScreen={nextScreen}></LoadingScreen>
          :
          <Fragment>
            <TabList style={{borderBottom:"1px solid black"}} {...tab} aria-label="My tabs">
              <Tab style={tab.selectedId == STATUS?selectedTab:unSelectedTab} id={STATUS} {...tab}  onClick={() => {
          //warning: since these are async this might not be the best idea.
          setNextScreen(STATUS);
          setCurrentScreen(LOADING)}
          }>Status</Tab>
              <Tab style={tab.selectedId == SKILLGRAPH?selectedTab:unSelectedTab} id={SKILLGRAPH} onClick={() =>
                {
                  setNextScreen(SKILLGRAPH);
                  setCurrentScreen(LOADING)}
                } {...tab}>
                Skills
              </Tab>

              <Tab style={tab.selectedId == STATISTICS?selectedTab:unSelectedTab} id={STATISTICS} onClick={() =>
                {
                  setNextScreen(STATISTICS);
                  setCurrentScreen(LOADING)}
                } {...tab}>
                Statistics
              </Tab>

              <Tab style={tab.selectedId == ACHIEVEMENTS?selectedTab:unSelectedTab} id={ACHIEVEMENTS} onClick={() =>
                {
                  setNextScreen(ACHIEVEMENTS);
                  setCurrentScreen(LOADING)}
                } {...tab}>
                Achivements
              </Tab>
            </TabList>
            <TabPanel {...tab}>
              {currentScreen === STATUS?<StatusScreen loadScreen={handleLoading} player={player}></StatusScreen>:null}
            </TabPanel>
            <TabPanel {...tab}>
              {currentScreen === SKILLGRAPH?<SkillGraphScreen  loadScreen={handleLoading} player={player}></SkillGraphScreen>:null}

            </TabPanel>

            <TabPanel {...tab}>
              {currentScreen === STATISTICS?<StatisticsScreen  loadScreen={handleLoading} player={player}></StatisticsScreen>:null}

            </TabPanel>

            <TabPanel {...tab}>
              {currentScreen === ACHIEVEMENTS?<AchivementsScreen  loadScreen={handleLoading} player={player}></AchivementsScreen>:null}

            </TabPanel>
          </Fragment>
        }
      </MenuBox>

      

      Fast TODO (yeah)
      <ul>
        <li>wire up more of the stats. why is time started not working? display time correctly</li>
        <li>record every time you hit ESC as an error, make up a convincing error about menu.close not found.</li>
        <li>implement more achivment trigger types</li>
        <li>achivements award skill points</li>
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
