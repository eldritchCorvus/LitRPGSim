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

export const  StatisticsScreen = (props: StatusProps)=> {



    const observer = props.player.observer;

    return (
    <StatusBlock>
        <span>
            <StatusRow>
                <StatusHeader>Time Played:</StatusHeader>
                <StatusContent>{observer.timeSpentPlaying}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time In Combat:</StatusHeader>
                <StatusContent>{observer.timeSpentInCombat}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time In Cutscenes:</StatusHeader>
                <StatusContent>{observer.timeSpentInCutscenes}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Time Spent CityCrafting:</StatusHeader>
                <StatusContent>{observer.timeSpentCityBuilding}</StatusContent>
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
                <StatusContent>{observer.unlocked_achivements.length}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Times Clicked:</StatusHeader>
                <StatusContent>{observer.numClicks}</StatusContent>
            </StatusRow>
    </span>



  </StatusBlock>);
  }