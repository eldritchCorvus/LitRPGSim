import React, { Fragment } from "react";
import {Player} from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
import { all_themes } from "../Modules/Theme";
import { ADJ } from "../Modules/ThemeStorage";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import {StatusHeader,StatusRow, StatusBlock,StatusContent,Skill, SkillBox, FONTCOLOR} from "./Styles";
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

export const  StatisticsScreen = (props: StatusProps)=> {

    //https://stackoverflow.com/questions/8528382/javascript-show-milliseconds-as-dayshoursmins-without-seconds
    function dhm(ms:number){
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms=ms % (24*60*60*1000);
        const hours = Math.floor((daysms)/(60*60*1000));
        const hoursms=ms % (60*60*1000);
        const minutes = Math.floor((hoursms)/(60*1000));
        const minutesms=ms % (60*1000);
        const sec = Math.floor((minutesms)/(1000));
        return days+":"+hours+":"+minutes+":"+sec;
    }

    const observer = props.player.observer;

    return (
    <StatusBlock>
        <span>
            <StatusRow>
                <StatusHeader>Time Played:</StatusHeader>
                <StatusContent>{dhm(observer.timeSpentPlaying)}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time In Menu:</StatusHeader>
                <StatusContent>{dhm(observer.timeSpentInMenu)}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time In Combat:</StatusHeader>
                <StatusContent>{dhm(observer.timeSpentInCombat)}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time In Cutscenes:</StatusHeader>
                <StatusContent>{dhm(observer.timeSpentInCutscenes)}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time Spent CityCrafting:</StatusHeader>
                <StatusContent>{dhm(observer.timeSpentCityBuilding)}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Enemies Defeated:</StatusHeader>
                <StatusContent>{observer.enemiesDefeated}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Times Moved:</StatusHeader>
                <StatusContent>{observer.timesWalked}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Times Jumped:</StatusHeader>
                <StatusContent>{observer.timesJumped}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Times Skipped Cutscene:</StatusHeader>
                <StatusContent>{observer.timesSkippedCutscene}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Skills Unlocked:</StatusHeader>
                <StatusContent>{observer.skillsUnlocked}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Friends Made:</StatusHeader>
                <StatusContent>{observer.friendsMade}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Menu Items Unlocked:</StatusHeader>
                <StatusContent>{observer.menuItemsClicked.length}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Achivements Unlocked:</StatusHeader>
                <StatusContent>{observer.unlocked_achivements}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Times Clicked:</StatusHeader>
                <StatusContent>{observer.numClicks}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Errors:</StatusHeader>
                <StatusContent>{observer.errors}</StatusContent>
            </StatusRow>
    </span>



  </StatusBlock>);
  }