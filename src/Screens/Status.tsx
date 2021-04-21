import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent} from "./Styles";
interface StatusProps{
    player: Player;
}
/*
    TODO: just what is displayed here will change based on player stats on gnosis.
    whether you can get to this screen or not is controlled by skills
*/
export const  StatusScreen = (props: StatusProps)=> {


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
                <StatusContent>Unknown TODO</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Themes:</StatusHeader>
                <StatusContent>{props.player.theme_keys.join(",")}</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Unlocked Skills:</StatusHeader>
                <StatusContent>  
                <div key={props.player.rootSkill.name}>Skill 0: {props.player.rootSkill.name} (Rank {props.player.rootSkill.tier}): Themes: [{props.player.rootSkill.theme_keys.join(",")}] Children: [{props.player.rootSkill.children.map((child)=>child.name).join(",")}]</div> 
                    {props.player.skills.map((skill,i) => {return ( <div key={skill.name + i}>Skill {i}: {skill.name} (Rank {skill.tier}): Themes: [{skill.theme_keys.join(",")}] Children: [{skill.children.map((child)=>child.name).join(",")}]</div>  )})}
                </StatusContent>
            </StatusRow>
    </tbody>



  </StatusBlock>);
  }