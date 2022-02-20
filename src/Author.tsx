import styled from "@emotion/styled";
import {useEffect, useRef, useState } from "react";
import { feetEffect } from ".";
import { Item, ItemMap } from "./Truth";




export type AuthorParams = {
  goNorth: Function | null;
  goSouth: Function;
  items: ItemMap;

}

export const withinY = (myY: number, objectY: number, objectHeight: number) => {
  return myY >= objectY && myY <= objectY + objectHeight;
}

export const withinX = (myX: number, objectX: number, objectWidth: number) => {
  return myX >= objectX && myX <= objectX + objectWidth;
}

export const pointWithinBoundingBox = (myX: number, myY: number, objectX: number, objectY: number, objectWidth: number, objectHeight: number) => {
  //console.log("JR NOTE: is x ", myX, "within", objectX, objectX + objectWidth)
  //console.log("JR NOTE: is y", myY, "within", objectY, objectY + objectHeight)

  return withinX(myX, objectX, objectWidth) && withinY(myY, objectY, objectHeight);
}

const Author: React.FC<AuthorParams> = ({ goNorth, goSouth,items }) => {
  const [src, setSrc] = useState("http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif");
  const [playerLocation, setPlayerLocation] = useState({left: 215, top: 150 });
  const playerWidth = 100;
  const playerHeight = 100;
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
    const maxTop = 440 - 15;
    const maxLeft = 495;
    const minLeft = 15;
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
    const SOUTH = [items.southDoor.left, items.southDoor.top, 100, 10];
    const NORTH = [items.northDoor.left, items.northDoor.top, 100, 150]; //x,y,width,height

    //add your height because we care about your feet, not your head
    if (southRef.current && pointWithinBoundingBox(left, top+playerHeight/2, SOUTH[0], SOUTH[1], SOUTH[2], SOUTH[3])) {
      southRef.current();
      travelingRef.current = true;
      setPlayerLocation({ left: 215, top: 125 });
      window.scrollBy(0,-200);

      return;
    }

    if (northRef.current && pointWithinBoundingBox(left, top, NORTH[0], NORTH[1], NORTH[2], NORTH[3])) {
      travelingRef.current = true;
      northRef.current();
      setPlayerLocation({ left: 215, top: 375 });
      window.scrollBy(0,200);
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

  return (
    <img style={{ width: "100px", imageRendering: "pixelated", position: "absolute", left: `${playerLocation.left}px`, top: `${playerLocation.top}px` }} src={src} />
  );
}

export default Author;
