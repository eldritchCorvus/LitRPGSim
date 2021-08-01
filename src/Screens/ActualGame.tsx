import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { ABOUT } from "../AppWrapper";
import { all_aspects, initAspects } from "../Modules/Aspect";
import { all_interests, initInterests } from "../Modules/Interest";
import { BuildingMetaData, Player } from "../Modules/Player";
import { all_classes, initClasses } from "../Modules/RPGClass";
import { all_stats, initStats } from "../Modules/Stat";
import { all_themes, initThemes } from "../Modules/Theme";
import SeededRandom from "../Utils/SeededRandom";
import { OneCharAtATimeDiv } from "./OneCharAtATimeDiv";
import { MenuBox, MENU_OPACITY, BORDERRADIUSROUND, FONTCOLOR, BGCOLOR, FONTSIZE } from "./Styles";

interface RoomProps {
  room: BuildingMetaData;
  changeRoom: any;
}
interface StatusProps {
  player: Player;
}
export const ActualGame = (props: StatusProps) => {
  const {player} = props;
  const [currentRoom, setCurrentRoom] = useState(player.buildingMetaData[player.current_location]);

  const changeRoom = (room_key:string)=>{
    player.current_location = room_key;
    setCurrentRoom(player.buildingMetaData[room_key]);
  }

  return (
    <div>
      <MenuBox angle={0} opacity={MENU_OPACITY} mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} bgColor={BGCOLOR} fontSize={FONTSIZE}>
        Idea: randomly in the labrinth you find a NotAMinotaur (always strike thru).  It spouts bullshit philosophy at you about the nature of reality.
        The philosophy/gigglesnort is based on your themes because I'm insufferable. 

        you can go only straight or right.
        oh did you think you were outsie? no. only rooms. nothing is real.
        initMonsterDesc
        extra rooms have 50/50 chance to come from YOUR themes or from any theme
        <br></br>
        if you don't have an inventory you can't pick up any items or use any tiems
<br></br>
        companions don't spawn WITH The places, instead every time you go somewhere new theres a chance to meet someone new. unless you've kileld them all.
        <br></br>
        recognized commands: 
        <li>KILL/DESTROY/BREAK X (deletes whatever X is, even if its a location. removes it from everywhere. rip) , </li>
        <li>Use X on Y: if its an item, you rub it on the Y. if the Y is a location and its locked, it unlocks. item is destroyed.</li>
        <li>TALK X: if X is a companion, have a vague but pleasant conversation. if NotAMinotaur random philosophy/gigglesnort time.</li>
        <li>HELP X: get an ominous phrase about how you can't help anyone </li>
        <br></br>
        <div>
          {player.buildings.map((building)=>{return(<div>{player.buildingMetaData[building].debug()}</div>)})}
        </div>
        TODO throw in an entire dang text adventure game here, based on player themes {props.player.theme_keys.join(", ")} and referencing their deal.
     
        currently enthralled by the idea that the entire text based adventure game happens if you hack the dom to make ThisIsNotAGame instead be ThisIsAGame
locations to n,s,e,and w are buildings in your city and if you leave city you get new infinite locs

objects/people you find are from your theme


locations can be locked

if you USE ITEM on location, it opens and item is gone

if you USE ITEM on a person , something random happens (they die, they hate you, they join your party , etc).

if a person is in your party they will automatically interact with objects, people or locations, which might remove them from your party.

if a person dies, they are removed from the COMPANION screen

you share your inventory with the not game as well
every location you move to adds ten to the time walking stat
im enthralled by the idea that True screams at you for "cheating" if you hack the game to be walking, and yet there are so many legit ways to increaee that stat
city building screen should mark buildings as locked or unlocked  as well, clear parallel
<RenderedRoom room={currentRoom} changeRoom={changeRoom}/>
      </MenuBox>
    </div>

  );
}

export const RenderedRoom = (props: RoomProps) => {

  const RoomName = styled.div`
  font-weight: bolder;
  font-size: 18px;
`
const RoomDescription = styled.div`
  padding-top: 20px;
`;
const {room, changeRoom} =props;
  return (
    <Fragment>
      <RoomName>{room.key}</RoomName>
      <RoomDescription>
      <OneCharAtATimeDiv text={room.description}></OneCharAtATimeDiv></RoomDescription>
    </Fragment>

  )
}


export default ActualGame;

