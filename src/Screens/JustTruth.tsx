import  React, { useEffect } from "react";
import { justTruthSong } from "..";
import { Player } from "../Modules/Player";
import { TruthContainer } from "./Styles";
interface StatusProps{
    player: Player;
}
export const  JustTruth = (props: StatusProps)=> {
    const {player} = props
    useEffect(()=>{
        (window as any).justTruthMode = true;
        console.log("changing song");
        justTruthSong();
        const canvas = document.getElementById("ThisIsNotASpiral");
        if(canvas){
          canvas.style.opacity="0.2";
          canvas.classList.remove("chaos");
          canvas.classList.remove("frameAnimation");
        }
    },[]);

    return (
      
        <TruthContainer>JUST TRUTH TODO INFINITE QUIZ</TruthContainer>
  );
  }