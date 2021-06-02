import React, { Fragment } from "react";
import {Player} from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
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
/*
    TODO: just what is displayed here will change based on player stats on gnosis.
    whether you can get to this screen or not is controlled by skills
*/
export const  StatusScreen = (props: StatusProps)=> {

    const StatsSection = (props: StatsProps)=> {
        return(
            <Fragment>
                {Object.keys(props.stats).map((key)=>{return <StatSection key={key} stat={props.stats[key]}/>})}
            </Fragment>
        )
    }

    const StatSection = (props: StatProps)=> {
        return(
            <div key={props.stat.name()}>{props.stat.name()}: {props.stat.absolute_value().toFixed(1)} </div>
        )
    }


    return (
    <StatusBlock>
        <tbody>
            <StatusRow>
                <StatusHeader>Name:</StatusHeader>
                <StatusContent>Unknown (make this editable once)</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Title:</StatusHeader>
                <StatusContent>{props.player.class_name.chosen_name} of {props.player.aspect.chosen_name}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Sub Titles:</StatusHeader>
                <StatusContent> {props.player.interests.map((interest)=>interest.chosen_name).join(",")}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Species:</StatusHeader>
                <StatusContent>Unknown TODO</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Stats:</StatusHeader>
                <StatusContent><StatsSection stats={props.player.stats}/></StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Themes:</StatusHeader>
                <StatusContent>{props.player.theme_keys.join(",")}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Unlocked Skills:</StatusHeader>
                <StatusContent>  
                    <SkillBox>{props.player.unlocked_skills_no_stats().map((skill,i) => {return ( <Skill key={skill.name + i}>Skill {i}: {skill.name} </Skill>  )})}</SkillBox>
                </StatusContent>
            </StatusRow>
    </tbody>



  </StatusBlock>);
  }