import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Room } from "./Truth";
import SeededRandom from "./Utils/SeededRandom";

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
    const normalDoor = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/northdoor.PNG";
    const bloodyDoor = "http://farragofiction.com/ZampanioHotlink/northdoorbloody.png";
    const staticDoor = "http://farragofiction.com/ZampanioHotlink/northdoor.gif";

    const rand = new SeededRandom(rotLevel);
    if(rotLevel>500000 && src !== message ){
      setSrc(message);
    }else if(rotLevel > 10000 && src != staticDoor && rand.nextDouble()>0.9){
      setSrc(staticDoor)
    }else if(rotLevel > 100 && src != bloodyDoor && rand.nextDouble()>0.9){
      setSrc(bloodyDoor)
    }else if(rotLevel < 500000 && src != normalDoor && rand.nextDouble()>0.9){
      setSrc(normalDoor)
    }
  },[rotLevel]);



  return (
    <img onClick={()=>{onClick()}} style={style} src={src} />
  );
}

export default Door;
