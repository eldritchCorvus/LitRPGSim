/** @jsxImportSource @emotion/react */

import { css, jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { Room } from "./Truth";
import { getRandomNumberBetween, pickFrom } from "./Utils/NonSeededRandUtils";
import SeededRandom from "./Utils/SeededRandom";

export type BenchParam = {
  room: Room;
  rotLevel: number;
  left: number;
  top: number;
}

//glitch effects:  way too big, way too small, css glitch animation. shaking. file missing.

export const rotEffects = (rot: number, baseline: string) => {
  let ret = baseline;
  if (rot < 10) {
    return ret;
  }
  const mildAmount = getRandomNumberBetween(5, 15);
  const extremeAmount = getRandomNumberBetween(50, 100);
  const normalWidth = 200;
  const normalHeight = 100;
  const mildOptions = [`opacity: 1.0-${mildAmount/100}`,`filter: hue-rotate(${extremeAmount});`, `filter: grayscale(${extremeAmount});`, `width: ${normalWidth + mildAmount}px;`, `width: ${normalWidth - mildAmount}px;`, `height: ${normalHeight + mildAmount}px;`, `height: ${normalHeight - mildAmount}px;`, `translate(0px, ${mildAmount}px)`, `translate(${mildAmount}px, ${mildAmount}px);`, `translate(${mildAmount}px, 0px);`];
  const extremeOptions = [`transform: matrix(1, 2, 3, 4, 5, 6);`,`transform: rotate(0.5turn);`,`opacity: 1.0-${extremeAmount/100}`,`filter: brightness(1000);`, `filter: brightness(0);`, `filter: hue-rotate(180);`, `width: ${normalWidth + extremeAmount}px;`, `height: ${normalHeight + extremeAmount}px;`, `height: ${normalHeight - extremeAmount}px;`, `width: ${normalHeight - extremeAmount}px;`, `opacity:0;`, `translate(${extremeAmount}px, ${extremeAmount}px);`, `translate(${extremeAmount}px);`, `translate(0px, ${extremeAmount}px);`];
  const amount = getRandomNumberBetween(1, 3);
  for (let i = 0; i < amount; i++) {
    if (rot > 10000 && Math.random() > 0.6) {
      ret += pickFrom(extremeOptions);
    } else {
      ret += pickFrom(mildOptions);
    }
  }
  return ret;

}


const Bench: React.FC<BenchParam> = ({ rotLevel, room, left, top }) => {
  const [src, setSrc] = useState("http://farragofiction.com/ZampanioGoshShouldYouTrustThis/bench.png");
  useEffect(()=>{
    const normal = "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/bench.png";
    const bloody1 = "http://farragofiction.com/ZampanioHotlink/benchbloody1.png";
    const bloody2 = "http://farragofiction.com/ZampanioHotlink/benchbloody2.png";
    const staticbench = "http://farragofiction.com/ZampanioHotlink/benchstatic.gif";
    const rand = new SeededRandom(Math.round(room.tint*100)+left+top);

    if(rotLevel>100 && src !== staticbench && rand.nextDouble()>0.8 ){
      setSrc(staticbench);
    }else if(rotLevel > 10 && src != bloody1 && rand.nextDouble()>0.8){
      setSrc(bloody1)
    }else if(rotLevel > 10 && src != bloody2 && rand.nextDouble()>0.8){
      setSrc(bloody2)
    }else if(rotLevel < 500000 && src != normal){
      setSrc(normal)
    }
  },[rotLevel]);
  const shadowEffect = ()=>{
    //drop-shadow(5px 5px 5px #000)
    if(rotLevel >1000 && Math.random()>0.5){
      return ` drop-shadow(${getRandomNumberBetween(15,150)}px ${getRandomNumberBetween(15,150)}px ${getRandomNumberBetween(15,150)}px #000)`;
    }else if(rotLevel > 100 && Math.random()>0.5){
      return ` drop-shadow(${getRandomNumberBetween(1,15)}px ${getRandomNumberBetween(1,15)}px ${getRandomNumberBetween(1,15)}px #000)`;
    }else if(rotLevel > 10 && Math.random()>0.5){
      return ` drop-shadow(${getRandomNumberBetween(1,5)}px ${getRandomNumberBetween(1,5)}px ${getRandomNumberBetween(1,5)}px #000)`;
    }
    return '';
  }
  const filter = () => {
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%)${shadowEffect()} brightness(${rotLevel <10000?"100%":"33%"})`;
  }

  const baseline_css = `
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    filter: ${filter()};
    display: block;
    pointer-events: none;
  `;

  const [roomStyle, setRoomStyle] = useState(baseline_css);

  useEffect(() => {
    setRoomStyle(rotEffects(rotLevel,baseline_css));
  }, [rotLevel])






  return (
    <img css={css`${roomStyle}`} src={src} />
  );
}

export default Bench;
