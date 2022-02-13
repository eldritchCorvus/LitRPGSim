import styled from "@emotion/styled";
import { useEffect } from "react";
import { doorEffect } from ".";
import room from './images/empty.PNG';
import north from './images/northdoor.PNG';
import south from './images/southdoor.PNG';

import SeededRandom from "./Utils/SeededRandom";

export const Content = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
`
function ConcretePresent() {

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "background: black; color: red;");
    }
  }, [])

  const goSouth = () => {
    doorEffect();
    console.log("JR NOTE: TDOO")
  }

  return (
    <div>
      <div style={{marginBottom: "100px",marginTop: "100px", "position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="present">
        <img style={{ display: "block", width: "600px" }} id="current_room" src={room} />
        <img onClick={goSouth} style={{ display: "block", width: "75px", position: "absolute", top: "20px", left: "300px", cursor: "pointer" }} id="north" src={north} />
        <img onClick={goSouth} style={{width: "75px", position: "absolute", bottom: "0px", left: "300px", cursor: "pointer" }} id="south" src={south} />
      </div>
    </div>
  );
}

export default ConcretePresent;
