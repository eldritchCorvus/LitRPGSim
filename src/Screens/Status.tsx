import React, { Fragment } from "react";
import {Player} from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
import { all_themes } from "../Modules/Theme";
import { ADJ, MENU } from "../Modules/ThemeStorage";
import { uniq } from "../Utils/ArrayUtils";
import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import {StatusHeader,StatusRow, StatusBlock,StatusContent,Skill, SkillBox, BORDERRADIUS, BORDERRADIUSROUND, FONTCOLOR} from "./Styles";
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

    const calculateMenuOptions = () =>{
        let ret:string[] = [];
        for(let key of props.player.theme_keys){
            ret = ret.concat(all_themes[key].getPossibilitiesFor(MENU));
        }
        return uniq(ret).join(', ');
    }


    return (
    <StatusBlock>
        <span>
            <StatusRow>
                <StatusHeader>Name:</StatusHeader>
                <StatusContent>Unknown (make this editable once)</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Title:</StatusHeader>
                <StatusContent>{props.player.title}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Seed:</StatusHeader>
                <StatusContent><a href = {`./?seed=${props.player.rand.initial_seed}`}>{props.player.rand.initial_seed}</a></StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Sub Titles:(TODO have these unlock later)</StatusHeader>
                <StatusContent> {props.player.interests.map((interest)=>{
                    let seed = 0; //todo sum all chars
                    for(let i = 0; i<interest.chosen_name.length; i++){
                        seed += interest.chosen_name.charCodeAt(i);
                    }
                    const rand = new SeededRandom(seed); //want it to be stable per interest but changing
                    const theme = all_themes[rand.pickFrom(props.player.theme_keys)];
                return `${titleCase(theme.pickPossibilityFor(rand,ADJ))} ${interest.chosen_name}`;
                }).join(",")}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Species:</StatusHeader>
                <StatusContent>Unknown TODO</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Possible Menu Options (debug):</StatusHeader>
                <StatusContent>{calculateMenuOptions()}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Stats:</StatusHeader>
                <StatusContent><StatsSection stats={props.player.stats}/></StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Skill Points:</StatusHeader>
                <StatusContent>{props.player.skillPoints}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Unlocked Skills:</StatusHeader>
                <StatusContent>  
                    <SkillBox fontColor={FONTCOLOR} mildRadius={BORDERRADIUS}>{props.player.unlocked_skills_no_stats().map((skill,i) => {return ( <Skill fontColor={FONTCOLOR} mediumRadius={BORDERRADIUSROUND} key={skill.name + i}>{i}: {skill.name} </Skill>  )})}</SkillBox>
                </StatusContent>
            </StatusRow>
    </span>



  </StatusBlock>);
  }