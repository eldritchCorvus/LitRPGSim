import styled from "@emotion/styled";
import {RoomParams } from "./Truth";

export const Content = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
`
const HintOfPast:React.FC<RoomParams> =({room}) =>{
  const filter = ()=>{
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%) brightness(${room.brightness}%) contrast(${room.contrast}%)`;
  }
  return (
    <div style={{overflow: "hidden", "height": "300px",filter: filter()}}>
      <div style={{"position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="past">
      <img style={{zIndex: "-1",position: "absolute",top: "-300px", display: "block", width: "600px" }} id="past_room" src={"http://farragofiction.com/ZampanioEmbeddedSource/empty.PNG"} />
      <div style={{zIndex: "1",height: "400px",backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,1.0), rgba(0,0,0,0.0))"}}></div>
        </div>
    </div>
  );
}

export default HintOfPast;
