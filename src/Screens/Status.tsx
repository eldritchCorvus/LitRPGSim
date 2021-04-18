import {Player} from "../Modules/Player";
interface StatusProps{
    player: Player;
}
/*
    TODO: just what is displayed here will change based on player stats on gnosis.
    whether you can get to this screen or not is controlled by skills
*/
export const  StatusScreen = (props: StatusProps)=> {
    return (
    <div>
        <div>Name: Unknown</div>
        <div>Species: Unknown</div>
        <div>Stats: Unknown</div>
        <div>Themes: {props.player.theme_keys.join(",")}</div>
    {props.player.skills.map((skill,i) => {
      return ( <div>Skill i: {skill.name} (Rank {skill.tier}): Themes: [{skill.theme_keys.join(",")}]</div>  )})}
  </div>);
  }