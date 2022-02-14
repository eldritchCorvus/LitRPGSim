import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { doorEffect, playTrain } from ".";
import ConcretePresent from "./ConcretePresent";
import HintOfFuture from "./HintOfFuture";
import HintOfPast from "./HintOfPast";

import Layer1 from "./Layer1";
import { getRandomNumberBetween } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";

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

  const moveBoundedUpOrDown =(source:number, step: number,max:number, min:number)=>{
    const amount = seededRandomRef.current.getRandomNumberBetween(0,step);
    const direction = seededRandomRef.current.nextDouble()>0.5?1:-1;
    const test_amount = source  + amount*direction;
    if(test_amount> min && test_amount < max){
      return test_amount
    }
    return source;
  }

  const makeNextTint = (tint: number)=>{
    return moveBoundedUpOrDown(tint, 10, 360,0)
  }

  const makeNextGrey= (tint: number)=>{
    return moveBoundedUpOrDown(tint, 10, 100,0)
  }

  const makeNextBright = (tint: number)=>{
    return moveBoundedUpOrDown(tint, 10, 85,35)
  }

  const makeNextContrast = (tint: number)=>{
    return moveBoundedUpOrDown(tint, 10, 150,90)
  }

  const makeNextRoom = (room: Room)=>{
    return({tint: makeNextTint(room.tint), greyscale: makeNextGrey(room.greyscale), brightness: makeNextBright(room.brightness), contrast: makeNextContrast(room.contrast)})
  }

  useEffect(()=>{
      if(!rooms){
        const firstRoom = {tint: 0, greyscale: 0, contrast: 100, brightness: 100};
        setRooms([firstRoom,makeNextRoom(firstRoom)]);
      }
  },[]);

  useEffect(()=>{
    if(rooms && roomIndex < rooms.length-1){
      setRooms([...rooms, makeNextRoom(rooms[rooms.length-1])]);
    }
  },[rooms, roomIndex])

  const goSouth = ()=>{
    doorEffect();
    setRoomIndex(roomIndex + 1); 
  }

  const goNorth = ()=>{
    doorEffect();
    if(roomIndex > 0){
      setRoomIndex(roomIndex - 1); 
    }
  }


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
