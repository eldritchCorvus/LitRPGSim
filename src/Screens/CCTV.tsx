import React, { Fragment, useEffect, useState } from "react";
import { cctv_loop } from "../CanvasFuckery/cctv_fuckery";
import { Player } from "../Modules/Player";
import { OneCharAtATimeDiv } from "./OneCharAtATimeDiv";
import { RageStyledButton, StatusBlock, StatusContent, StatusHeader, StatusRow, TruthContainer } from "./Styles";
interface StatusProps {
    player: Player;
}


export const CCTV = (props: StatusProps) => {
    const { player } = props
    //the inherent irony of using react to nuke the dom
    // from orbit and then switch to vanilla javascript is not lost on me.
    //consider this performance art
    //really im just lazy and want to make sure theres as little
    // competition for my cctv loop as possible
    //also, sure, why not, you're trapped in the murder basement
    // now and thers no way out. have fun!
    useEffect(()=>{
        const body = document.querySelector("body");
        if(body){
            console.log("JR NOTE: body is",body.childNodes)
            //just fucking remove everything else. inner peace for all.
            body.innerHTML = "";
            body.style.background= "#000000";
            const canvas = document.createElement("canvas");
            canvas.width = 704;
            canvas.height = 480;
            canvas.style.marginLeft = "auto";
            canvas.style.marginRight = "auto";
            canvas.style.display="block";

            body.append(canvas);

            cctv_loop(canvas);
        }
        
    },[]);

    return (

        <TruthContainer>
           
        </TruthContainer>
    );
}