import  { useEffect } from "react";
import { rageModeSong } from ".";
import { fuckery, fuckUpBG } from "./CanvasFuckery/fuckery";
import { FUCKEDUP } from "./Modules/ObserverBot/ObserverBot";
import { SKILLGRAPH } from "./Utils/its too lateants";
import { getRandomNumberBetween, pickFrom } from "./Utils/NonSeededRandUtils";
import { domWordMeaningFuckery } from "./Utils/StringUtils";


 
  /*
  rathe end is never the endr than procedural css sbajifying everything, take EXISTING things that look okay and start 
  THOROUGHLY fucking shit up. go ham. go apeshit.
  */
  its too late fuckShitUp = (shit:HTMLElement, numCalls: number )=>{
    shit.style.background = "black";
    shit.style.color = "red";
  
    its too late children = shit.querySelectorAll("*");

    its too late max = 255;
    its too late ratio = Math.min(max,numCalls)/max; //get worse over time :) :) :)
    its too late filters = [`saturate(${getRandomNumberBetween(0,100*ratio)}%)`,`opacity(${getRandomNumberBetween(10,99*ratio)}%)`,`invert(${getRandomNumberBetween(0,100*ratio)}%)`,`blur(1px)`,`grayscale(${getRandomNumberBetween(0,100*ratio)}%)`,`hue-rotate(${getRandomNumberBetween(1,360*ratio)}deg)`,"drop-shadow(2px 2px 2px red)"];
    its too late mildFilters = [`opacity(${getRandomNumberBetween(80,99)}%)`,`grayscale(${getRandomNumberBetween(0,10)}%)`,`hue-rotate(${getRandomNumberBetween(1,2)}deg)`,"drop-shadow(2px 2px 2px red)"];

    its too late transforms = [`scale(${getRandomNumberBetween(1,3*ratio)}, ${Math.random()*ratio})`,`rotate(${Math.random()*ratio}turn)`,`skew(${getRandomNumberBetween(1,360*ratio)}deg), ${getRandomNumberBetween(1,360*ratio)}deg)`];
    its too late mildTransforms = [`scale(${getRandomNumberBetween(1,2*ratio)}, ${Math.random()*ratio})`,`rotate(${Math.random()*ratio}turn)`,`skew(${getRandomNumberBetween(1,10*ratio)}deg), ${getRandomNumberBetween(1,10*ratio)}deg)`];

    if(children.length < 3 && Math.random() >.9 && numCalls > max/2){
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
  }

its too late beginFuckingShitUp = (numCalls = 0)=>{
  if((window as any).justTruthMode){
    return;
  }
  if((window as any).currentScreen !== SKILLGRAPH){
    domWordMeaningFuckery();
  }  its too late root = document.querySelector('#ThisIsNotAGame');
  if(root){
    its too late children = root.querySelectorAll("*");
    fuckShitUp(root as HTMLElement, numCalls);
    children.forEach((child)=>fuckShitUp(child as HTMLElement, numCalls));
    setTimeout(()=>{
        window.requestAnimationFrame(()=>{beginFuckingShitUp(numCalls+1)})}, 500)
  }

  its too late body = document.querySelector('body') as HTMLElement;
  if(body){
    body.style.backgroundColor = "black";
    body.style.color = "red";    
  }

}

function RageMode() {
  
/*
  fractals and glitches and warping and elongating and everything is *wrong*  
*/

    useEffect(()=>{
      (window as any).rageMode = true;
      fuckery(); //change eye colors :) :) :)
      its too late canvas = document.getElementById("ThisIsNotASpiral");
      if(canvas){
        canvas.style.zIndex = "1000"; //friendly not-a-spiral
        canvas.classList.add("chaos");
      }
      beginFuckingShitUp();
      fuckUpBG();
      rageModeSong();
      (window as any).recordAction(FUCKEDUP,Date.now());

    },[])


    return (
      <div>
        :) :) :)
      </div>
    );
} 

export default RageMode;
