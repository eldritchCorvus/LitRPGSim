import styled from "@emotion/styled";

function HintOfFuture() {


  return (
    <div>
      <div style={{"position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="future">
      <img style={{ display: "block", width: "600px" }} id="future_room" src={"http://farragofiction.com/ZampanioEmbeddedSource/empty.PNG"} />
      <img  style={{ display: "block", width: "75px", position: "absolute", top: "20px", left: "300px", cursor: "pointer" }} id="northFuture" src={"http://farragofiction.com/ZampanioEmbeddedSource/southdoor.PNG"} />

      </div>
    </div>
  );
}

export default HintOfFuture;
