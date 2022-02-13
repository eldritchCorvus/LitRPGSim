import styled from "@emotion/styled";
import { useEffect } from "react";
import ConcretePresent from "./ConcretePresent";
import HintOfFuture from "./HintOfFuture";
import HintOfPast from "./HintOfPast";

import Layer1 from "./Layer1";

export const Train = styled.div`
    display: flex;
    flex-direction: column;
    background-image: url("http://farragofiction.com/ZampanioEmbeddedSource/train.png");
    background-repeat-x: no-repeat;
    background-position-x: 50%;
`

function Truth() {

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.setAttribute("style", "background: black; color: red;");
    }
  }, [])


  return (
    <div>
      <Layer1 />
      <Train>
        <HintOfPast />
        <ConcretePresent />
        <HintOfFuture />
      </Train>

    </div>
  );
}

export default Truth;
