//the best part about NorthNorth is i'll forget how North works, so this is a spiralling labyrinth for my future self
import {STATUS, LOADING, SKILLGRAPH, ACHIEVEMENTS, STATISTICS, OPTIONS, TRUTH, CITYBUILDING, COMPANIONS, GODS, QUESTS} from "./Utils/constants";
import { Tab } from "reakit/Tab";
import { BGCOLOR, BORDERRADIUSROUND, FONTCOLOR, FONTSIZE, MenuBox, MENU_OPACITY } from "./Screens/Styles";

import { ObserverBot } from "./Modules/ObserverBot/ObserverBot";


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

interface TabProps{
  observer:ObserverBot;
  tab: any;
  setNextScreen: any;
  setCurrentScreen: any;
}

export function QuestTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === QUESTS?selectedTab:unSelectedTab} id={QUESTS} {...tab}  onClick={() => {
      //warning: since these are async this might not be the best idea.
      setNextScreen(QUESTS);
      setCurrentScreen(LOADING)}
      }>Quest{props.observer.questsMenuLevel}</Tab>
  )
}

export function StatusTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === STATUS?selectedTab:unSelectedTab} id={STATUS} {...tab}  onClick={() => {
      //warning: since these are async this might not be the best idea.
      setNextScreen(STATUS);
      setCurrentScreen(LOADING)}
      }>Status{props.observer.statusMenuLevel}</Tab>
  )
}
export function AchievementsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === ACHIEVEMENTS?selectedTab:unSelectedTab} id={ACHIEVEMENTS} onClick={() =>
      {
        setNextScreen(ACHIEVEMENTS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Achivements{props.observer.achievementMenuLevel}
    </Tab>
  )
}

export function SkillsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === SKILLGRAPH?selectedTab:unSelectedTab} id={SKILLGRAPH} onClick={() =>
      {
        setNextScreen(SKILLGRAPH);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Skills{props.observer.skillGraphLevel}
    </Tab>
  )
}

export function OptionsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === OPTIONS?selectedTab:unSelectedTab} id={OPTIONS} onClick={() =>
      {
        setNextScreen(OPTIONS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Options{props.observer.optionsMenuLevel}
    </Tab>
  )
}

export function StatisticsTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === STATISTICS?selectedTab:unSelectedTab} id={STATISTICS} onClick={() =>
      {
        setNextScreen(STATISTICS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Statistics{props.observer.statisticsMenuLevel}
    </Tab>
  )
}

export function CityTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === CITYBUILDING?selectedTab:unSelectedTab} id={CITYBUILDING} onClick={() =>
      {
        setNextScreen(CITYBUILDING);
        setCurrentScreen(LOADING)}
      } {...tab}>
      CityBuilding{props.observer.cityBuildingMenuLevel}
    </Tab>
  )
}

export function CompanionTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === COMPANIONS?selectedTab:unSelectedTab} id={COMPANIONS} onClick={() =>
      {
        setNextScreen(COMPANIONS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Companions{props.observer.companionsMenuLevel}
    </Tab>
  )
}

export function GodTab(props: TabProps){
  const {tab, setNextScreen, setCurrentScreen} = props;
  return(
    <Tab style={tab.selectedId === GODS?selectedTab:unSelectedTab} id={GODS} onClick={() =>
      {
        setNextScreen(GODS);
        setCurrentScreen(LOADING)}
      } {...tab}>
      Gods{props.observer.godsMenuLevel}
    </Tab>
  )
}

export function TruthTab(props: TabProps){
  const {tab} = props;
  return(
    <Tab style={tab.selectedId === STATISTICS?selectedTab:unSelectedTab} id={TRUTH} onClick={() =>
      {
        (window as any).setJustTruthMode(true);
      }} {...tab}>
      Just Truth{props.observer.truthMenuLevel}
    </Tab>
  )
}