import styled from "@emotion/styled";
import { useEffect } from "react";
import { doorEffect } from ".";
import Author from "./Author";
import {RoomParams, RoomParamsPlusTravel } from "./Truth";


import SeededRandom from "./Utils/SeededRandom";

export const Content = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
`
const ConcretePresent:React.FC<RoomParamsPlusTravel> =({room, goSouth, goNorth, index}) =>{

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "background: black; color: red;");
    }
  }, [])

  const filter = ()=>{
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%) brightness(${room.brightness}%) contrast(${room.contrast}%)`;
  }

  const canGoNorth = index!==0;

  return (
    <div>
      <div style={{marginBottom: "50px",marginTop: "50px", "position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="present">
        <div style={{zIndex: 33,fontSize:"30px", color: "white", position: "absolute", "left":"15px", "top":"15px"}}>Car {`${index+1}`}</div>
        <img style={{filter: filter(), display: "block", width: "600px" }} id="current_room" src={"http://farragofiction.com/ZampanioEmbeddedSource/empty.PNG"} />
        {canGoNorth?<img onClick={()=>goNorth()} style={{ display: "block", width: "75px", position: "absolute", top: "20px", left: "300px", cursor: "pointer" }} id="north" src={"http://farragofiction.com/ZampanioEmbeddedSource/northdoor.PNG"} />:null}
        <img onClick={()=>goSouth()} style={{width: "75px", position: "absolute", bottom: "0px", left: "300px", cursor: "pointer" }} id="south" src={"http://farragofiction.com/ZampanioEmbeddedSource/southdoor.PNG"} />
        <Author goNorth={canGoNorth?goNorth:null} goSouth={goSouth}/>
      </div>
    </div>
  );
}

export default ConcretePresent;
