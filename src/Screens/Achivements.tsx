import React, { Fragment } from "react";
import {Player} from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
import { all_themes } from "../Modules/Theme";
import { ADJ } from "../Modules/ThemeStorage";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import {StatusHeader,StatusRow, StatusBlock,StatusContent,Skill, SkillBox} from "./Styles";
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

    return (
    <StatusBlock>
        <span>
            <StatusRow>
                <StatusHeader>TODO:</StatusHeader>
                <StatusContent>Achivements</StatusContent>
            </StatusRow>




    </span>



  </StatusBlock>);
  }