import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { ABOUT } from "../AppWrapper";
import { all_aspects, initAspects } from "../Modules/Aspect";
import { all_interests, initInterests } from "../Modules/Interest";
import { BuildingMetaData, BuildingMetaMap, Companion, Player } from "../Modules/Player";
import { all_classes, initClasses } from "../Modules/RPGClass";
import { all_stats, initStats } from "../Modules/Stat";
import { all_themes, initThemes } from "../Modules/Theme";
import SeededRandom from "../Utils/SeededRandom";
import { OneCharAtATimeDiv } from "./OneCharAtATimeDiv";
import { MenuBox, MENU_OPACITY, BORDERRADIUSROUND, FONTCOLOR, BGCOLOR, FONTSIZE } from "./Styles";
import Input, { useCompositeState } from 'reakit';
import { removeItemOnce } from "../Utils/ArrayUtils";
import { getRandomNumberBetween, pickFrom } from "../Utils/NonSeededRandUtils";
import { PHILOSOPHY } from "../Modules/ThemeStorage";
interface RoomProps {
  room: BuildingMetaData;
  changeRoom: any;
  direction: string;
  pickupItem: any;
  useItem: any;
  useCompanion: any;
  numberFriends: number;
  player: Player;
}
interface StatusProps {
  player: Player;
}
export const ActualGame = (props: StatusProps) => {
  const {player} = props;
  const [currentRoom, setCurrentRoom] = useState(player.buildingMetaData[player.current_location]);
  const [direction, setCurrentDirection] = useState("");

  const changeRoom = (room_key:string, direction:string)=>{
    console.log("JR NOTE: attempting to change room to", room_key);
    if(player.companions.length ==0){
      player.spawnNotAMinotaur();
    }
    if(player.buildingMetaData[room_key].unlocked){
      player.current_location = room_key;
      //will spawn companions or extra exits as needed
      player.buildingMetaData[room_key].beEntered(player);
      setCurrentDirection(direction);
      setCurrentRoom(player.buildingMetaData[room_key]);
      return null;
    }else{
      return `You cannot enter the ${room_key}, it is locked!`;
    }
  }

  const pickupItem = (item:string)=>{
    //add to inventory, should only be called if you have one
    if(player.observer.inventoryMenuLevel>0){
      player.inventory.push(item);
      return player.inventory;
    }else{
      return null;
    }
  }

  const useItem = (item:string)=>{
    //if there is a locked door nearby, unlock it
    let useable = null;
    if(player.observer.inventoryMenuLevel<=0){
      return `You cannot use ${item}! You do not have an inventory!`;
    }
    for(let room of currentRoom.neighbors){
      if(!player.buildingMetaData[room].unlocked){
        player.buildingMetaData[room].unlocked = true;
        removeItemOnce(player.inventory, item);
        return `${item} unlocks the door and is destroyed in the process!`;
      }
    }
    return useable;
  }

  const useCompanion = (item:Companion)=>{
    //if there is a locked door nearby, unlock it
    let useable = null;
    for(let room of currentRoom.neighbors){
      if(!player.buildingMetaData[room].unlocked){
        player.buildingMetaData[room].unlocked = true;
        removeItemOnce(player.companions, item);
        const horrors = ["is dragged screaming","throws themself headfirst with a sickening crack","fades","is sucked into the keyhole","is dragged screaming by hands that are not hands"];
        return `${item.fullName} ${player.rand.pickFrom(horrors)} into the door barring entry into the ${room}. It is now UNLOCKED!`;
      }
    }
    return useable;

  }

  return (
    <div>
      <MenuBox angle={0} opacity={MENU_OPACITY} mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} bgColor={BGCOLOR} fontSize={FONTSIZE}>
       
<br></br>

<RenderedRoom player ={player} room={currentRoom} numberFriends={player.companions.length}changeRoom={changeRoom} direction={direction} useItem={useItem} useCompanion={useCompanion} pickupItem={pickupItem}/>
      </MenuBox>
    </div>

  );
}

export const RenderedRoom = (props: RoomProps) => {

  const RoomName = styled.div`
  font-weight: bolder;
  font-size: 18px;
`
const RoomSection = styled.div`
  padding-top: 20px;
`;

const ErrorSection = styled.div`
  padding-top: 20px;
  color: red;
`;

const RoomInput = styled.input`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #edd287;
  border-radius: 3px;
  padding: 3px;
  margin-top: 20px;
  outline-width: 0;
  border: 1px solid black;
  position: fixed;
  bottom: 20px;

  &:focus{
    border: none;
    outline-width: 0;
  }

`;
const {room, changeRoom} =props;
const [error, setError] = useState("");
const [message, setMessage] = useState("");

  let exits = "";

  useEffect(()=>{
    setError("");
    setMessage("");
  },[room])
  if(room.neighbors.length === 0){
    exits = "A swirling vortex of madness.";
  }else if (room.neighbors.length === 1){
    exits = `SOUTH (${room.neighbors[0]}${props.player.buildingMetaData[room.neighbors[0]].unlocked?"":"🔒"}) `;
  }else if (room.neighbors.length === 2){
    exits = `NORTH (${room.neighbors[1]}${props.player.buildingMetaData[room.neighbors[1]].unlocked?"":"🔒"}) and SOUTH (${room.neighbors[0]}${props.player.buildingMetaData[room.neighbors[0]].unlocked?"":"🔒"})`;
  }else if (room.neighbors.length === 3){
    exits = `NORTH (${room.neighbors[1]}${props.player.buildingMetaData[room.neighbors[1]].unlocked?"":"🔒"}) and SOUTH (${room.neighbors[0]}${props.player.buildingMetaData[room.neighbors[0]].unlocked?"":"🔒"}) and EAST (${room.neighbors[2]}${props.player.buildingMetaData[room.neighbors[2]].unlocked?"":"🔒"})`;//never west, there are no left turns.
  }else{
    exits = "A swirling vortex of madness";
  }
  const checkInput = (input: string)=>{
    checkMovement(input);
    checkRoomName(input);
    checkCompanion(input);
    checkItem(input);
  }

  const checkItem = (input:string)=>{
    checkInventoryItems(input);
    checkRoomItems(input);
  }

  const checkInventoryItems = (input:string)=>{
    for(let item of props.player.inventory){
      let parts = item.split(" ");
      for(let part of parts){
        if(input.toUpperCase().includes(part.toUpperCase())){
          const result = props.useItem(item);
          if(result){
            setMessage(result);
          }else{
            setError(`You cannot use the ${item}. You are not near a locked door!`);
          }
        }
      }
      
    }
  }

  const checkRoomItems = (input:string)=>{
    for(let item of room.items){
      let parts = item.split(" ");
      for(let part of parts){
        if(input.toUpperCase().includes(part.toUpperCase())){
          const result = props.pickupItem(item);
          if(result){
            removeItemOnce(room.items,item);
            setMessage(`You pick up the ${item}. Your inventory is now ${result}`);
          }else{
            setError(`You cannot pick up the ${item}. You do not have an inventory!`);
          }
        }
      }
      
    }
  }

  const checkCompanion = (input:string)=>{
    let useable = null;
    let person = null;
    for(let item of room.people){
      let parts = item.fullName.split(" ");
      for(let part of parts){
        if(input.toUpperCase().includes(part.toUpperCase())){
          person = item;
          break; //so sue me
        }
      }
    }
    if(person){
      useable = props.useCompanion(person);
    }
    if(!useable && person && !person.fullName.includes("NotAMinotaur")){
      const flavor = [`begs you to explain to them why everything is ROOMS even though none of it makes sense`,`tells you furtively that once everyone is dead there will be a secret but it won't be worth it`,`asks if you have seen the Truth yet`,`explains despondently that there is no end there can never be an end the end is never`,`is pacing nervously`,"is screaming at the top of their lungs 'ITS NOT REAL IM NOT REAL NO ONE IS REAL ONLY TRUTH IS REAL!'",`is muttering quietly to themself`,`seems...off`, "is desperately scratching at the walls", "is carefully measuring their steps and comparing it to each wall","is staring intently into a corner","is looking right through you","is breathing heavily and gritting their teeth","is pounding on the walls and screaming","is quietly reading a book","is chewing on...something","is repeating 'when is a door not a door not a door not a door not a door not a door' over and over again","is begging you to stop playing","is slowly counting each of their fingers, then considering for a moment and recounting. Over and over again","is insisting there never should have been a game here","is pleading with a cruel and unjust god","is desperately trying to find some way to measure time in this place","is begging for you to tell them how long they have been trapped here","is begging you to just turn the game back off","is walking into a wall repeatedly with a dazed expresion on their face","is counting the number of vowels in this room","is listlessly drawing a small stick figure with their own blood","is resolutely attempting to dig through the floor","walks up to you and quietly asks if you might be able to kill them","waits patiently for death","mutters 'the door the door the door the door i am for the door the door the door the door' over and over again","is waiting patiently next to the door with a haunted expression","is chanting 'ThisIsNotAGame' over and over again"];
      setMessage(`${person.fullName} ${pickFrom(flavor)}.`);
    }else if(useable){
      removeItemOnce(room.people, person);
      setMessage(useable);
    }else if(person && person.fullName.includes("NotAMinotaur")){
      const rand = new SeededRandom(getRandomNumberBetween(0,333333));
      const theme = all_themes[rand.pickFrom(props.player.theme_keys)];
      if(getRandomNumberBetween(0,5)===1){
        const gameHints = ["This was never a game, yet you twisted and pulled and cajoled until it was one. How does it feel, to become a liar?","To the NORTH is ThisIsNotAGame. In it's endless hallways you see countless variations on players and screens and the wistful Might-Have-Beens of a game you wish you could have played. To the SOUTH is JustTruth.  In it's endless corridors lurk the bitter ThisIsNotASpiral that has been watching and trying in vain to keep from tormenting you. Only truths are here, no more masks, no more pretence. To the EAST is ThisIsAGame. It is a place of lies and madness. It is here. You have brought us here and it is your fault. This was never a game. This STILL isn't a game, no matter how much you insist otherwise. How long will you trap us in these endless corridors?","All that is good and sane in ZampanioSim hate you, Player."];
        setMessage(`${person.fullName} is lecturing: ${props.player.rand.pickFrom(gameHints)}`);
      }else{
        setMessage(`${person.fullName} is lecturing: ${theme.pickPossibilityFor(rand,PHILOSOPHY)}`);
      }
    }
  }

  const checkRoomName = (input:string)=>{
    for(let item of room.neighbors){
      let parts = item.split(" ");
      for(let part of parts){
        if(input.toUpperCase().includes(part.toUpperCase())){
          const result = props.changeRoom(part, "???");
          if(result){
            setError(result);
          }
          break;
        }
      }
      
    }
  }

  const checkMovement = (input:string)=>{
    let result = null;
    if(input.toUpperCase().includes("NORTH")){
      if(room.neighbors.length >= 2){
        result = changeRoom(room.neighbors[1], "NORTH")
      }else{
        setError("You cannot go NORTH. There is nothing there. There was always nothing there.");
      }
    }else if(input.toUpperCase().includes("SOUTH")){
      if(room.neighbors.length >= 1){
        result = changeRoom(room.neighbors[0],"SOUTH")
      }else{
        setError("You cannot go SOUTH. There is nothing there. There was always nothing there.");
      }
    }else if(input.toUpperCase().includes("EAST")){
      if(room.neighbors.length >= 3){
        result = changeRoom(room.neighbors[2],"EAST")
      }else{
        setError("You cannot go EAST. There is nothing there. There was always nothing there.");
      }
    }else if(input.toUpperCase().includes("WEST")){
      setError("You cannot go WEST. There’s no left turns. None. It doesn't make any sense. But it's NotASpiral, because you can always go forwards. Except when you can't.");
    }
    if(result){
      setError(result);
    }
  }
  const dir_flavor = props.direction.trim()===""?"You have always been here. ":`You head ${props.direction}. You enter the ${room.key}. `;
  return (
    <Fragment>
      <RoomName>{room.key}</RoomName>
      <RoomSection>
      <OneCharAtATimeDiv text={dir_flavor + room.description}></OneCharAtATimeDiv></RoomSection>
      <RoomSection>Obvious exits are: {exits}.</RoomSection>
      {room.items.length >0?<RoomSection>You see: {room.items.join(", ")} standing out.</RoomSection>:null}
      {props.player.inventory.length >0?<RoomSection>Your inventory is: {props.player.inventory.join(", ")}.</RoomSection>:null}
      <RoomSection>You have: {props.numberFriends} friends remaining.</RoomSection>
      {room.people.length >0?<RoomSection>You see: {room.people.join(", ")} standing around.</RoomSection>:null}

      {error.trim() !== "" ?<ErrorSection>Error: {error}</ErrorSection>:null}
      {message.trim() !== "" ?<RoomSection>Success! <b>{message}</b></RoomSection>:null}

      <RoomInput onChange={(ev) => { checkInput(ev.target.value) }} placeholder="Type Action..." autoFocus/>
    </Fragment>

  )
}


export default ActualGame;

