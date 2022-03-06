import styled from "@emotion/styled";
import {RoomParams } from "./Truth";

const HintOfFuture:React.FC<RoomParams> =({room}) =>{

  const filter = ()=>{
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%) brightness(${room.brightness}%) contrast(${room.contrast}%)`;
  }

  return (
    <div style={{overflow: "hidden", "height": "300px",filter: filter(), pointerEvents: "none"}}>
      <div style={{"position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="future">
      <img style={{zIndex: "-1", display: "block", width: "600px" }} id="future_room" src={"http://farragofiction.com/ZampanioGoshShouldYouTrustThis/empty.PNG"} />
      <div style={{position: "absolute", top: "0px",width: "100%",zIndex: "1",height: "400px",backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.0), rgba(0,0,0,1.0))"}}></div>

      </div>
    </div>
  );
}

export default HintOfFuture;
