import styled from "@emotion/styled";
import room from './images/empty.PNG';

import south from './images/southdoor.PNG';

export const Content = styled.div`
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
`
function HintOfPast() {





  return (
    <div>
      <div style={{"position": "relative", "display": "block", "width": "600px", marginLeft: "auto", marginRight: "auto" }} id="past">
      <img style={{ display: "block", width: "600px" }} id="past_room" src={room} />
      <img  style={{width: "75px", position: "absolute", bottom: "0px", left: "300px", cursor: "pointer" }} id="past_south" src={south} />

        </div>
    </div>
  );
}

export default HintOfPast;
