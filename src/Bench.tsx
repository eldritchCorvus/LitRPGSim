import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Room } from "./Truth";

export type BenchParam = {
  room: Room;
  rotLevel: number;
  left: number;
  top: number;
}

//glitch effects:  way too big, way too small, css glitch animation. shaking. file missing.

const Bench: React.FC<BenchParam> = ({ rotLevel, room, left, top }) => {
  const [src, setSrc] = useState("http://farragofiction.com/ZampanioEmbeddedSource/bench.png");

  useEffect(()=>{
    const source3 = "http://farragofiction.com/ZampanioEmbeddedSource/corrupt_bench.gif";
    if(rotLevel > 3 && src != source3){
      setSrc(source3)
    }else if(rotLevel > 100){
      setSrc("filenotfound.lol");
    }
  },[rotLevel,src])


  const filter = () => {
    return `hue-rotate(${room.tint}deg) grayscale(${room.greyscale}%)`;
  }


  return (
    <img style={{position: "absolute", left: left, top: top, filter: filter(), display: "block" }} src={src} />
  );
}

export default Bench;
