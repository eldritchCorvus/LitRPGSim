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
      </ul>
    </Content>
  );
}

export default Layer1;
