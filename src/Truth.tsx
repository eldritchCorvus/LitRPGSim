import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { doorEffect, playTrain } from ".";
import ConcretePresent from "./ConcretePresent";
import HintOfFuture from "./HintOfFuture";
import HintOfPast from "./HintOfPast";

import Layer1 from "./Layer1";
import SeededRandom from "./Utils/SeededRandom";

const moveBoundedUpOrDown =(seededRandom: SeededRandom, source:number, step: number,max:number, min:number)=>{
  const amount = seededRandom.getRandomNumberBetween(0,step);
  const direction = seededRandom.nextDouble()>0.5?1:-1;
  const test_amount = source  + amount*direction;
  if(test_amount> min && test_amount < max){
    return test_amount
  }
  return source;
}

const makeNextTint = (seededRandom: SeededRandom,tint: number)=>{
  return moveBoundedUpOrDown(seededRandom,tint, 50, 360,0)
}

const makeNextGrey= (seededRandom: SeededRandom,tint: number)=>{
  return moveBoundedUpOrDown(seededRandom,tint, 50, 100,0)
}

const makeNextBright = (seededRandom: SeededRandom,tint: number)=>{
  return moveBoundedUpOrDown(seededRandom,tint, 50, 85,35)
}

const makeNextContrast = (seededRandom: SeededRandom,tint: number)=>{
  return moveBoundedUpOrDown(seededRandom,tint, 50, 150,90)
}

const makeNextRoom = (seededRandom: SeededRandom,room: Room)=>{
  return({tint: makeNextTint(seededRandom,room.tint), greyscale: makeNextGrey(seededRandom,room.greyscale), brightness: makeNextBright(seededRandom,room.brightness), contrast: makeNextContrast(seededRandom,room.contrast)})
}

export type Room = {
  tint: number; //degrees
  greyscale: number; //percent
  contrast: number; //percent
  brightness: number; //percent
}

export type RoomParams = {
  room: Room;
}

export type RoomParamsPlusTravel = {
  room: Room;
  goNorth: Function;
  goSouth: Function;
  index: number;
}

const Train = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url("http://farragofiction.com/ZampanioEmbeddedSource/train.png");
    background-repeat-x: no-repeat;
    background-position-x: 50%;
`

function Truth() {

  useEffect(() => {
    playTrain();
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "background: black; color: red;");
    }
  }, [])



  const [rooms,setRooms] = useState<Room[]>();
  const [roomIndex, setRoomIndex] = useState(0);
  const seededRandomRef = useRef(new SeededRandom(13));



  useEffect(()=>{
      if(!rooms && seededRandomRef.current){
        const firstRoom = {tint: 0, greyscale: 0, contrast: 100, brightness: 100};
        setRooms([firstRoom,makeNextRoom(seededRandomRef.current, firstRoom)]);
      }
  },[]);

  useEffect(()=>{
    if(rooms && roomIndex +1 === rooms.length && seededRandomRef.current){
      setRooms([...rooms, makeNextRoom(seededRandomRef.current,rooms[rooms.length-1])]);
    }
  },[rooms, roomIndex])

  const goSouth = useCallback(()=>{
    doorEffect();
    setRoomIndex(roomIndex + 1); 
  }, [roomIndex]);

  const goNorth = useCallback(()=>{
    doorEffect();
    if(roomIndex > 0){
      setRoomIndex(roomIndex - 1); 
    }
  },[roomIndex]);


  return (
    <div>
      <Layer1 />
      <Train>
        {rooms && roomIndex > 0? <HintOfPast room={rooms[roomIndex-1]} />:null}
        {rooms  ?<ConcretePresent index={roomIndex} room={rooms[roomIndex]} goSouth={goSouth} goNorth={goNorth}/>:null}
        {rooms && roomIndex < rooms.length-1? <HintOfFuture  room={rooms[roomIndex+1]} />:null}
      </Train>

    </div>
  );
}

export default Truth;
