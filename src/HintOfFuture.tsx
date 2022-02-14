import styled from "@emotion/styled";
import {RoomParams } from "./Truth";

const HintOfFuture:React.FC<RoomParams> =({room}) =>{

  const filter = ()=>{
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%) brightness(${room.brightness}%) contrast(${room.contrast}%)`;
  }

  return (
    <div style={{filter: filter()}}>
      <div style={{"position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="future">
      <img style={{ display: "block", width: "600px" }} id="future_room" src={"http://farragofiction.com/ZampanioEmbeddedSource/empty.PNG"} />
      </div>
    </div>
  );
}

export default HintOfFuture;
