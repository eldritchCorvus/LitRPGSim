import React, { Fragment } from "react";
import {Player} from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
import { all_themes } from "../Modules/Theme";
import { ADJ } from "../Modules/ThemeStorage";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import {StatusHeader,StatusRow, StatusBlock,StatusContent,Skill, SkillBox, Achivement, UnlockedAchivement, AchivementBox, BORDERRADIUS, BORDERRADIUSROUND, FONTCOLOR} from "./Styles";
interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

interface StatsProps{
    stats: StatMap;
}

interface StatProps{
    stat: Stat;
}

export const  AchivementsScreen = (props: StatusProps)=> {
    const observer = props.player.observer;

    return (
    <StatusBlock>
        <span>
        <StatusRow>
                <StatusHeader>Achivements:</StatusHeader>
                <StatusContent>  
                    <AchivementBox fontColor={FONTCOLOR} mildRadius={BORDERRADIUS}>{observer.possibleAchievements.map((achivement,i) => {return ( 
                        achivement.unlocked ?                      
                            <UnlockedAchivement onClick={()=>{achivement.display(observer)}} key={achivement.title + i} fontColor={FONTCOLOR} mediumRadius={BORDERRADIUSROUND}>{i}: {achivement.title} </UnlockedAchivement>
                            :  <Achivement mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} key={achivement.title + i}><span style={{"visibility":"hidden"}}  >{i}: {achivement.title} </span></Achivement>
                      )})}</AchivementBox>
                </StatusContent>
            </StatusRow>




    </span>



  </StatusBlock>);
  }