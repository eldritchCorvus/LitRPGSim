import styled from "@emotion/styled";
import { useEffect } from "react";
import { doorEffect } from ".";
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

  return (
    <div style={{filter: filter()}}>
      <div style={{marginBottom: "50px",marginTop: "50px", "position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="present">
        <div style={{fontSize:"30px", color: "white", position: "absolute", "left":"15px", "top":"15px"}}>Car {`${index+1}`}</div>
        <img style={{ display: "block", width: "600px" }} id="current_room" src={"http://farragofiction.com/ZampanioEmbeddedSource/empty.PNG"} />
        {index!==0?<img onClick={()=>goNorth()} style={{ display: "block", width: "75px", position: "absolute", top: "20px", left: "300px", cursor: "pointer" }} id="north" src={"http://farragofiction.com/ZampanioEmbeddedSource/northdoor.PNG"} />:null}
        <img onClick={()=>goSouth()} style={{width: "75px", position: "absolute", bottom: "0px", left: "300px", cursor: "pointer" }} id="south" src={"http://farragofiction.com/ZampanioEmbeddedSource/southdoor.PNG"} />
      </div>
    </div>
  );
}

export default ConcretePresent;
