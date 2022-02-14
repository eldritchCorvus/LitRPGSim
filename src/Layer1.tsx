import styled from "@emotion/styled";
export const Content = styled.div`
    position: fixed;
    top: 50px;
    left: 50px;
`
function Layer1() {
  return (
    <Content>
      TRUTH.
      <ul>
        <li>JR, walking around</li>
        <li>In each car is a single object. Investigating it gives you my surface thoughts on it.</li>
        <li>In Layer 2, Truth the character discusses the object as well on a philosophical level.</li>
        <li>In Layer 3 (console), I mention my coding thoughts.</li>
        <li>In Each Car, reveal one Truth, at random. (examples, why things are in React not dart, the nature of the maze that is the code base, my experience with corporate life, the sources of various characters)</li>
        <li>You can move backwards to revisit previous Truths, but the Rot is coming.</li>

* make it so past is half off screen and future is half off as well in the other direction. both are dim.
* train car object has: 
    * central object
    (rot is NOT part of it, its true random. the rot of chaos)
* in the center of each room is an object, stored in ZampanioHotlink
* if jr walks up to the object, you get: 
     * jr within's surface thoughts on it as a thought bubble
     * truth's "thoughts" on it in the background
     * jr-who-was-coding's thoughts on it in the console
     * jr-who-found-the-object's thoughts in the EmbeddedSource
* you can see a bit of the next room in front of you
* you can see a bit of the previous room behind you
* if you go too far backwards the Rot sets in
      </ul>
    </Content>
  );
}

export default Layer1;
