import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Room } from "./Truth";

export type DoorParams = {
  rotLevel: number;
  style: React.CSSProperties;
  sourceLocation: string;
  onClick: Function;
}

//glitch effects:  way too big, way too small, css glitch animation. shaking. file missing.

const Door: React.FC<DoorParams> = ({onClick, rotLevel, sourceLocation, style}) => {
  const [src, setSrc] = useState(sourceLocation);

  useEffect(()=>{
    const message = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/northdoormessage.PNG";
    if(rotLevel>500000 && src === "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/northdoor.PNG"){
      setSrc(message);
    }else if(rotLevel < 500000 && src === message){
      setSrc("http://farragofiction.com/ZampanioGoshShouldYouTrustThis/northdoor.PNG")
    }
  },[rotLevel]);



  return (
    <img onClick={()=>{onClick()}} style={style} src={src} />
  );
}

export default Door;
