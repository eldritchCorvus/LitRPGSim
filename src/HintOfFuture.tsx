import styled from "@emotion/styled";
import room from './images/empty.PNG';
import north from './images/northdoor.PNG';

function HintOfFuture() {


  return (
    <div>
      <div style={{"position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="future">
      <img style={{ display: "block", width: "600px" }} id="future_room" src={room} />
      <img  style={{ display: "block", width: "75px", position: "absolute", top: "20px", left: "300px", cursor: "pointer" }} id="northFuture" src={north} />

      </div>
    </div>
  );
}

export default HintOfFuture;
