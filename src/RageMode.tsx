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
    const fuckShitUp = (shit:HTMLElement )=>{
      shit.style.background = "black";
      shit.style.color = "red";

      const filters = [`invert(${getRandomNumberBetween(0,100)}%)`,`blur(${getRandomNumberBetween(1,5)}px)`,`contrast(${getRandomNumberBetween(0,300)}%)`,`grayscale(${getRandomNumberBetween(0,100)}%)`,`hue-rotate(${getRandomNumberBetween(1,360)}deg)`,"drop-shadow(2px 2px 2px red)"];
      if(Math.random() >.9){
        shit.style.filter = pickFrom(filters);
      }
      //todo fuck with transforms
    }

    const beginFuckingShitUp = ()=>{
      const root = document.querySelector('body');
      if(root){
        const children = root.querySelectorAll("*");
        fuckShitUp(root);
        children.forEach((child)=>fuckShitUp(child as HTMLElement));
        setTimeout(beginFuckingShitUp, 500);
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
