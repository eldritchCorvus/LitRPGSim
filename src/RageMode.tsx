import React, { Fragment, useEffect } from "react";
import { MenuBox } from "./Screens/Styles";
import { getRandomNumberBetween, pickFrom } from "./Utils/NonSeededRandUtils";

function RageMode() {
  
/*
  fractals and glitches and warping and elongating and everything is *wrong*  
*/
  
  /*
  rather than procedural css sbajifying everything, take EXISTING things that look okay and start 
  THOROUGHLY fucking shit up. go ham. go apeshit.
  */
    const fuckShitUp = (shit:HTMLElement, numCalls: number )=>{
      shit.style.background = "black";
      shit.style.color = "red";
    
      const children = shit.querySelectorAll("*");

      const ratio = Math.min(255,numCalls)/255; //get worse over time :) :) :)
      const filters = [`saturate(${getRandomNumberBetween(0,100*ratio)}%)`,`opacity(${getRandomNumberBetween(10,99*ratio)}%)`,`invert(${getRandomNumberBetween(0,100*ratio)}%)`,`blur(${getRandomNumberBetween(1,3)}px)`,`grayscale(${getRandomNumberBetween(0,100*ratio)}%)`,`hue-rotate(${getRandomNumberBetween(1,360*ratio)}deg)`,"drop-shadow(2px 2px 2px red)"];
      const mildFilters = [`opacity(${getRandomNumberBetween(80,99)}%)`,`blur(${getRandomNumberBetween(0,5)}px)`,`grayscale(${getRandomNumberBetween(0,10)}%)`,`hue-rotate(${getRandomNumberBetween(1,2)}deg)`,"drop-shadow(2px 2px 2px red)"];

      const transforms = [`scale(${getRandomNumberBetween(1,3*ratio)}, ${Math.random()*ratio})`,`rotate(${Math.random()*ratio}turn)`,`skew(${getRandomNumberBetween(1,360*ratio)}deg, ${getRandomNumberBetween(1,360*ratio)}deg)`];
      const mildTransforms = [`scale(${getRandomNumberBetween(1,2*ratio)}, ${Math.random()*ratio})`,`rotate(${Math.random()*ratio}turn)`,`skew(${getRandomNumberBetween(1,10*ratio)}deg, ${getRandomNumberBetween(1,10*ratio)}deg)`];

      if(children.length < 3 && Math.random() >.9){
        shit.style.filter = pickFrom(filters);
        if(ratio > .05){
          shit.style.transform = pickFrom(transforms);
        }
      }else if(Math.random() >.9){
        shit.style.filter = pickFrom(mildFilters);
        if(ratio > .3){
          shit.style.transform = pickFrom(mildTransforms);
        }
      }
      //todo fuck with transforms
    }

    const beginFuckingShitUp = (numCalls = 0)=>{
      const root = document.querySelector('body');
      if(root){
        const children = root.querySelectorAll("*");
        fuckShitUp(root, numCalls);
        children.forEach((child)=>fuckShitUp(child as HTMLElement, numCalls));
        setTimeout(()=>{
          window.requestAnimationFrame(()=>{beginFuckingShitUp(numCalls+1)})}, 500);
      }
    }
    useEffect(()=>{
      (window as any).rageMode = true;
      beginFuckingShitUp();

    },[])


    return (
      <div>
        I hate YOU. In particular.
      </div>
    );
} 

export default RageMode;
