import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { setSourceMapRange } from "typescript";
import { Room } from "./Truth";
import { pickFrom } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";
import { getParameterByName } from "./Utils/URLUtils";

export type CentralImageParams = {
  source: string;
}

//glitch effects:  way too big, way too small, css glitch animation. shaking. file missing.

const CentralImage: React.FC<CentralImageParams> = ({ source }) => {
  const [src, setSrc] = useState(source);
  //lobsters are highly unstable
  const lobsters = [
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/jr%20lobstersona.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/jrlobsteronchair.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/flowerlobster.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/lobsterNASgreen.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/lobsterNASred.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/lobster%20apocalypse%20order.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/namLobster.png",
    "http://farragofiction.com/ZampanioHotlink/catalysts_lobsters/puzzledLobster.png"
  ];

  useEffect(() => {
    if (getParameterByName("lobster", null)) {
      (window as any).lobsterMode = true;
    }
  }, [])

  useEffect(()=>{
    setSrc(source)
  },[source])

  return (
    <img onClick={()=>{(window as any).toggleShake()}}style={{ width: "50px", position: "absolute", "left": "245px", top: "360px" }} src={(window as any).lobsterMode ? pickFrom(lobsters) : src} />
  );
}

export default CentralImage;
