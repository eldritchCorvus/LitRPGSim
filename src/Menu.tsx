import {Player} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import {LoadingScreen} from "./Screens/Loading";
import {SkillGraphScreen} from "./Screens/SkillsGraph";
import {useEffect, useState,Fragment, useCallback} from 'react';
import {STATUS, LOADING, SKILLGRAPH, ACHIEVEMENTS, STATISTICS, OPTIONS, TRUTH, CITYBUILDING, COMPANIONS, GODS, QUESTS, RECAP} from "./Utils/constants";
import { useTabState, TabList, TabPanel } from "reakit/Tab";
import { BGCOLOR, BORDERRADIUSROUND, FONTCOLOR, FONTSIZE, MenuBox, MENU_OPACITY } from "./Screens/Styles";
import { StatisticsScreen } from "./Screens/Statisics";
import { AchivementsScreen } from "./Screens/Achivements";
import { fuckery } from "./CanvasFuckery/fuckery";
import { OptionsScreen } from "./Screens/Options";
import { ObserverBot } from "./Modules/ObserverBot/ObserverBot";
import { CityBuildingScreen } from "./Screens/CityBuilding";
import { domWordMeaningFuckery } from "./Utils/StringUtils";
import { CompanionsScreen } from "./Screens/CompanionsScreen";
import { GodScreen } from "./Screens/GodScreen";
import { blameSong } from ".";
import { AchievementsTab, CityTab, CompanionTab, GodTab, OptionsTab, QuestTab,RecapTab, SkillsTab, StatisticsTab, StatusTab, TruthTab } from "./MenuTabs";
import { QuestScreen } from "./Screens/Quests";
import { PlotRecap } from "./Screens/PlotRecap";

const selectedTab = {
  "border": `1px solid ${FONTCOLOR}`,
  "fontSize":"24px",
  "fontWeight": "bold",
  "background": `${BGCOLOR}`,
  "borderBottom": `2px solid ${BGCOLOR}`,
  "borderRadius": "5px",
  "borderBottomLeftRadius": "0px",
  "borderBottomRightRadius": "0px",
  "WebkitTextStroke": "black",
  "WebkitTextFillColor": `#ccb472`,
  'WebkitTextStrokeWidth': "1px"
}

const unSelectedTab = {
  "border": `1px solid #ba973a`,
  "fontWeight": "bold",
  "fontSize":"24px",
  "borderRadius": "5px",
  "borderBottomLeftRadius": "0px",
  "borderBottomRightRadius": "0px",
  "background": "#d1b056",
  "WebkitTextStroke": "black",
  "WebkitTextFillColor": `#ba973a`,
  'WebkitTextStrokeWidth': "1px"
  
}
interface MenuProps{
  player: Player;
  angle: number;
}
interface TabProps{
  observer:ObserverBot;
  tab: any;
  setNextScreen: any;
  setCurrentScreen: any;
}
function Menu(props: MenuProps) {
  //order matters, themes are needed for aspects, etc;
  const [currentScreen, setCurrentScreen] = useState(LOADING);
  const [refresh, setRefresh] = useState(true);
  const [nextScreen, setNextScreen] = useState(STATUS);
  const {player} = props;
  const observer = player.observer;

  const tab = useTabState();


  useEffect(()=>{
    fuckery();
  },[])

 

  //screen and tab should stay in sync plz
  useEffect(()=>{
    tab.setSelectedId(currentScreen);
  }, [currentScreen,tab])

  useEffect(()=>{
    //make it so rage mode doesn't break skill graph
    (window as any).currentScreen = currentScreen;
    if(currentScreen !== SKILLGRAPH && !player.order){
      domWordMeaningFuckery();
    }
  },[currentScreen]);

  const handleLoading = useCallback((screen:string) =>{
    setRefresh(true);
    setNextScreen(screen);
    setCurrentScreen(LOADING);
  },[setRefresh, setNextScreen, setCurrentScreen]);

  useEffect(()=>{
    (window as any).refresh = ()=>{
      player.checkForApocalypseConditions();
      if( (window as any).rageMode){
        blameSong();
    }
      handleLoading(currentScreen);
    }
},[currentScreen, handleLoading])
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
      <div id="ThisIsAMenu">
      <MenuBox className={(window as any).real_eyes || player.chaos?"realeyescolor":"gaslightbgcolor"} angle={props.angle} opacity={MENU_OPACITY} mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} bgColor={BGCOLOR} fontSize={FONTSIZE}>
        {
          currentScreen === LOADING?
            <LoadingScreen loadScreen={setCurrentScreen} nextScreen={nextScreen} refresh={refresh}></LoadingScreen>
          :
          <Fragment>
            <TabList  {...tab} aria-label="My tabs">
             
              <StatusTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>
              
              <SkillsTab  observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>
              <AchievementsTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>

              {(window as any).rageMode?<TruthTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}

              {observer.statisticsMenuLevel>0 || player.chaos || player.order?<StatisticsTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}
              {observer.cityBuildingMenuLevel>0 || player.chaos || player.order?<CityTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}
              {observer.companionsMenuLevel>0 || player.chaos || player.order?<CompanionTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}
              {observer.godsMenuLevel>0 || player.chaos || player.order?<GodTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}

              {observer.questsMenuLevel>0 || player.chaos || player.order?<QuestTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}
              {observer.recapMenuLevel>0 || player.chaos || player.order?<RecapTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}


              {observer.optionsMenuLevel>0|| player.chaos || player.order?<OptionsTab observer={observer} tab={tab} setNextScreen={setNextScreen} setCurrentScreen={setCurrentScreen}/>:null}

            </TabList>
            <TabPanel {...tab}>
              {currentScreen === STATUS?<StatusScreen loadScreen={handleLoading} player={player}></StatusScreen>:null}
            </TabPanel>
            <TabPanel {...tab}>
              {currentScreen === SKILLGRAPH?<SkillGraphScreen  loadScreen={handleLoading} player={player}></SkillGraphScreen>:null}

            </TabPanel>
            <TabPanel {...tab}>
              {currentScreen === ACHIEVEMENTS?<AchivementsScreen  loadScreen={handleLoading} player={player}></AchivementsScreen>:null}

            </TabPanel>

            {(window as any).rageMode?<TabPanel {...tab}>
            :) :) :)
          </TabPanel>:null}

            {observer.statisticsMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === STATISTICS?<StatisticsScreen  loadScreen={handleLoading} player={player}></StatisticsScreen>:null}
            </TabPanel>:null}

            {observer.cityBuildingMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === CITYBUILDING?<CityBuildingScreen  loadScreen={handleLoading} player={player}></CityBuildingScreen>:null}
            </TabPanel>:null}

            {observer.companionsMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === COMPANIONS?<CompanionsScreen  loadScreen={handleLoading} player={player}></CompanionsScreen>:null}
            </TabPanel>:null}

            {observer.godsMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === GODS?<GodScreen  loadScreen={handleLoading} player={player}></GodScreen>:null}
            </TabPanel>:null}

            {observer.questsMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === QUESTS?<QuestScreen  loadScreen={handleLoading} player={player}></QuestScreen>:null}
            </TabPanel>:null}

            {observer.recapMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === RECAP?<PlotRecap  loadScreen={handleLoading} player={player}></PlotRecap>:null}
            </TabPanel>:null}


            {observer.optionsMenuLevel>0 || player.chaos || player.order?<TabPanel {...tab}>
              {currentScreen === OPTIONS?<OptionsScreen  loadScreen={handleLoading} player={player}></OptionsScreen>:null}

            </TabPanel>:null}
          </Fragment>
        }
      </MenuBox>
      </div>
    );
  }
} 

export default Menu;
