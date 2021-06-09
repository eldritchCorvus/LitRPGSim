import React, { Fragment, useEffect } from "react";
import { MenuBox } from "./Screens/Styles";

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

    }
    useEffect(()=>{
      const root = document.querySelector('body');
      if(root){
        const children = root.querySelectorAll("*");
        fuckShitUp(root);
        children.forEach((child)=>fuckShitUp(child as HTMLElement));
      }

    },[])


    return (
      <div>
        I hate YOU. In particular.
      </div>
    );
} 

export default RageMode;
