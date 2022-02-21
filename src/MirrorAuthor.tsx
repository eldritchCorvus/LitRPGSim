import styled from "@emotion/styled";
import {useEffect, useRef, useState } from "react";
import { feetEffect } from ".";
import { Item, ItemMap } from "./Truth";







const MirrorAuthor = () => {
  const left = "http://farragofiction.com/ZampanioHotlink/JRmoveleft.gif";
  const down = "http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif";
  const up = "http://farragofiction.com/ZampanioHotlink/jrwalkgoup.gif";

  const [src, setSrc] = useState({loc:"http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif", flip:false});
  const offset = 400;
  const [playerLocation, setPlayerLocation] = useState({left: 215, top: 150-offset });
  const playerWidth = 100;
  const playerHeight = 100;
  //because a ref is MORE accessible to static things like window events than a state would be rip
  //terrible and disgusting (east didn't need this cuz it rerendered from the top)
  const playerRef = useRef(playerLocation);

  //don't spam doors.
  const travelingRef = useRef(false);

  useEffect(() => {
    playerRef.current = playerLocation;
  }, [playerLocation])

  const processWalk = (key: string) => {
    const minTop = 85-offset;
    const maxTop = 440 - 15-offset;
    const maxLeft = 460;
    const minLeft = 0;

    if (playerLocation) {
      let prevTop = playerRef.current.top;

      let prevLeft = playerRef.current.left;

      if ((key === "w" || key === "ArrowUp") && prevTop < maxTop) {
        prevTop += 10;
        setSrc({loc:down,flip:false});
      } else if ((key === "s" || key === "ArrowDown") && prevTop > minTop) {
        setSrc({loc:up,flip:false});
        prevTop += -10
      } else if ((key === "a" || key === "ArrowLeft") && prevLeft > minLeft) {
        prevLeft += -10;
        setSrc({loc:left,flip:false});
      } else if ((key === "d" || key === "ArrowRight") && prevLeft < maxLeft) {
        prevLeft += 10;
        setSrc({loc:left,flip:true});
      } else {
        //no valid button was pressed, ignore this.
        return;
      }
      setPlayerLocation({ top: prevTop, left: prevLeft });
      const centerX = prevLeft + playerWidth / 2;
      const centerY = prevTop + playerHeight / 2;
    }
  };//where is the player? are they near a door?
 



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
    <img style={{zIndex: -1,transform: src.flip?"scaleX(-1)":"scaleX(1)", width: "100px", imageRendering: "pixelated", position: "absolute", left: `${playerLocation.left}px`, top: `${playerLocation.top}px` }} src={src.loc} />
  );
}

export default MirrorAuthor;
