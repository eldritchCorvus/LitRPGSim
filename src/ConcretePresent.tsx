import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { doorEffect } from ".";
import Author from "./Author";
import Bench from "./Bench";
import Door from "./Door";
import MirrorAuthor from "./MirrorAuthor";
import { RoomParams, RoomParamsPlusTravel } from "./Truth";


import SeededRandom from "./Utils/SeededRandom";

export const Content = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
`
const ConcretePresent: React.FC<RoomParamsPlusTravel> = ({ rotLevel, room, goSouth, goNorth, index }) => {
  //fuck up the present as the rot sets in
  const [src, setSrc] = useState("http://farragofiction.com/ZampanioGoshShouldYouTrustThis/empty.PNG");

  useEffect(() => {
    const src1 = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/empty.PNG";
    const src2 = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/emptyWithMirror.PNG";
    const src3 = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/fuckedUpRoom2.gif";
    if (rotLevel < 1 && src != src1) {
      setSrc(src1)
    } else if (rotLevel > 1 && rotLevel < 5000 && src != src2) {
      setSrc(src2)
    } else if (rotLevel > 5000 && src != src3) {
      setSrc(src3)
    }
  }, [rotLevel, src])

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "background: black; color: red;");
    }
  }, [])

  //50% brightness at 1k, 0 brightness at 100k
  const brightnessEquation = ()=>{
    return (rotLevel * -.001) + 100;

  }
  const filter = () => {
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%) brightness(${rotLevel <1000?room.brightness:(brightnessEquation())}%) contrast(${room.contrast}%)`;
  }

  const canGoNorth = index !== 0;

  //TODO: bench locations and door locations come from array
  //pass them to JR so jr knows how to interact with them

  const items = {
    southDoor: { left: 231, top: 516 },
    northDoor: { left: 231, top: 4 },
    bench1: { left: 314, top: 210,width: 200,height:75 },
    bench2: { left: 314, top: 320,width: 200,height:75 },
    bench3: { left: 314, top: 450-25,width: 200,height:75 },
    bench4: { left: 25, top: 210,width: 200,height:75 },
    bench5: { left: 25, top: 320,width: 200,height:75 },
    bench6: { left: 25, top: 450-25,width: 200,height:75 },
  }


  const offset = 200;
  const [mirrorPlayerLocation, setMirrorPlayerLocation] = useState({left: 215, top: 150-offset });
  const [mirrorSrc, setMirrorSrc] = useState({loc:"http://farragofiction.com/ZampanioHotlink/jrwalkforward.gif", flip:false});
  const mirrorRef = useRef(mirrorPlayerLocation);
  const rotRef  = useRef(rotLevel);//needed for player
  useEffect(() => {
    mirrorRef.current = mirrorPlayerLocation;
  }, [mirrorPlayerLocation])

  useEffect(() => {
    rotRef.current = rotLevel;
  }, [rotLevel])


  return (
    <div>

      <div style={{overflow: "hidden", marginBottom: "50px", marginTop: "50px", "position": "relative", "display": "block", "width": "546px", marginLeft: "auto", marginRight: "auto" }} id="present">
        <div style={{ zIndex: 33, fontSize: "30px", color: "white", position: "absolute", "right": "15px", "top": "15px" }}>Car {`${index + 1}`}</div>
        {rotLevel > 0 ? <div style={{ zIndex: 33, fontSize: "30px", color: "white", position: "absolute", "right": "15px", "top": "45px" }}>Rot Level {`${rotLevel}`}</div> : null}
        <img style={{filter: filter(),zIndex: -2,position: "absolute",top:"-20px",left:"0px", width: "546px"}} src ="http://farragofiction.com/ZampanioHotlink/mirrorfloor.PNG"/>
        <img style={{ filter: filter(), display: "block", width: "546px" }} id="current_room" src={src} />
        {canGoNorth ? <Door rotLevel={rotLevel} onClick={() => goNorth()} style={{ display: "block", width: "75px", position: "absolute", top:`${items.northDoor.top}px`, left: `${items.northDoor.left}px`, cursor: "pointer" }} sourceLocation={"http://farragofiction.com/ZampanioGoshShouldYouTrustThis/northdoor.PNG"} /> : null}
        <Door rotLevel={rotLevel}  onClick={() => goSouth()} style={{ width: "75px", position: "absolute", top:`${items.southDoor.top}px`, left: `${items.southDoor.left}px`, cursor: "pointer" }} sourceLocation={"http://farragofiction.com/ZampanioGoshShouldYouTrustThis/southdoor.PNG"} />
        {Object.entries(items).map((item: any, index) => {
          if (item[0].includes("bench")) {
            return (
              <Bench key={`bench${index}`} room={room} rotLevel={rotLevel} left={item[1].left} top={item[1].top} />
            )
          }
          return null;
        })}

        <Author mirrorOffset={offset} rotRef={rotRef} mirrorLocationRef={mirrorRef} items={items} goNorth={canGoNorth ? goNorth : null} goSouth={goSouth} setMirrorPlayerLocation={setMirrorPlayerLocation} setMirrorSrc={setMirrorSrc} />
        <MirrorAuthor rotRef={rotRef} items={items} src={mirrorSrc} playerLocation={mirrorPlayerLocation} />

        {rotLevel > 100?<div className="filmgrain" style={{opacity: rotLevel/1000}}/>:null}
      </div>

    </div>
  );
}

export default ConcretePresent;