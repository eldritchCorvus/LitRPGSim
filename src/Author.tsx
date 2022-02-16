import styled from "@emotion/styled";
import {useEffect, useRef, useState } from "react";
import { feetEffect } from ".";




export type AuthorParams = {
  goNorth: Function | null;
  goSouth: Function;

}

export const withinY = (myY: number, objectY: number, objectHeight: number) => {
  return myY >= objectY && myY <= objectY + objectHeight;
}

export const withinX = (myX: number, objectX: number, objectWidth: number) => {
  return myX >= objectX && myX <= objectX + objectWidth;
}

export const pointWithinBoundingBox = (myX: number, myY: number, objectX: number, objectY: number, objectWidth: number, objectHeight: number) => {
  console.log("JR NOTE: is x ", myX, "within", objectX, objectX + objectWidth)
  console.log("JR NOTE: is y", myY, "within", objectY, objectY + objectHeight)

  return withinX(myX, objectX, objectWidth) && withinY(myY, objectY, objectHeight);
}

const Author: React.FC<AuthorParams> = ({ goNorth, goSouth }) => {
  const [src, setSrc] = useState("http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif");
  const [playerLocation, setPlayerLocation] = useState({ left: 290, top: 150 });

  //because a ref is MORE accessible to static things like window events than a state would be rip
  //terrible and disgusting (east didn't need this cuz it rerendered from the top)
  const playerRef = useRef(playerLocation);
  const northRef = useRef(goNorth);
  const southRef = useRef(goSouth);
  //don't spam doors.
  const travelingRef = useRef(false);

  useEffect(() => {
    playerRef.current = playerLocation;
  }, [playerLocation])

  useEffect(() => {
    northRef.current = goNorth;
  }, [goNorth])

  useEffect(() => {
    southRef.current = goSouth;
  }, [goSouth])

  const disableDoorDisregarding= ()=>{
    setTimeout(()=>{
      window.requestAnimationFrame(()=>{travelingRef.current = false})}, 500)
  }

  const processWalk = (key: string) => {
    const minTop = 85;
    const maxTop = 500 - 15;
    const maxLeft = 495;
    const minLeft = 15;
    const playerWidth = 100;
    const playerHeight = 100;
    if(travelingRef.current){
      disableDoorDisregarding();
    }

    if (playerLocation) {
      let prevTop = playerRef.current.top;

      let prevLeft = playerRef.current.left;

      if ((key === "s" || key === "ArrowDown") && prevTop < maxTop) {
        prevTop += 10;
        window.scrollBy(0,10);
      } else if ((key === "w" || key === "ArrowUp") && prevTop > minTop) {
        window.scrollBy(0,-10);
        prevTop += -10
      } else if ((key === "a" || key === "ArrowLeft") && prevLeft > minLeft) {
        prevLeft += -10;
      } else if ((key === "d" || key === "ArrowRight") && prevLeft < maxLeft) {
        prevLeft += 10;
      } else {
        //no valid button was pressed, ignore this.
        return;
      }
      feetEffect();
      setPlayerLocation({ top: prevTop, left: prevLeft });
      const centerX = prevLeft + playerWidth / 2;
      const centerY = prevTop + playerHeight / 2;

      checkForDoor(centerY, centerX);
      //checkForItems(centerY, centerX);
    }
  };//where is the player? are they near a door?
  const checkForDoor = (top: number, left: number) => {
    if (travelingRef.current) {
      return;
    }
    const SOUTH = [310, 530, 100, 15];
    const NORTH = [310, 125, 100, 15]; //x,y,width,height

    //there will ALWAYS be a door to the south at the very minimum
    if (southRef.current && pointWithinBoundingBox(left, top, SOUTH[0], SOUTH[1], SOUTH[2], SOUTH[3])) {
      southRef.current();
      travelingRef.current = true;
      setPlayerLocation({ left: 290, top: 150 });
      window.scrollBy(0,-250);

      return;
    }

    if (northRef.current && pointWithinBoundingBox(left, top, NORTH[0], NORTH[1], NORTH[2], NORTH[3])) {
      travelingRef.current = true;
      northRef.current();
      setPlayerLocation({ left: 290, top: 450 });
      window.scrollBy(0,250);
      return;
    }

  }



  const handleUserKeyPress = ((event: KeyboardEvent) => {
    processWalk(event.key);
  });

  useEffect(() => {

    window.addEventListener('keydown', handleUserKeyPress);

    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [])

  console.log("JR NOTE: player loc is", playerLocation)
  return (
    <img style={{ width: "100px", imageRendering: "pixelated", position: "absolute", left: `${playerLocation.left}px`, top: `${playerLocation.top}px` }} src={src} />
  );
}

export default Author;
