import styled from "@emotion/styled";

import SeededRandom from "./Utils/SeededRandom";

export const Content = styled.div`
    padding: 10px;
`
function Truth() {

 return(
   <div>TRUTH.
     <ul>
       <li>Black BG, Red Text.</li>
       <li>Render empty train cars (visually look similar to EAST but nothing is procedural).</li>
       <li>In Each Car, reveal one Truth, at random. (examples, why things are in React not dart, the nature of the maze that is the code base, my experience with corporate life, the sources of various characters)</li>
       <li>You can move backwards to revisit previous Truths, but the Rot is coming.</li>
     </ul>

   </div>
 );
}

export default Truth;
