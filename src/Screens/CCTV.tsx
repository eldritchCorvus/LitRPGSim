import React, { Fragment, useEffect, useState } from "react";
import { cctv_loop } from "../CanvasFuckery/cctv_fuckery";
import cctv from '.././images/murderbasement.jpeg';
import cctv2 from '.././images/murderbasement2.jpeg';
import monster1 from '.././images/monsters/doll/1.png';
import monster2 from '.././images/monsters/doll/1left.png';

import { Player } from "../Modules/Player";
import { OneCharAtATimeDiv } from "./OneCharAtATimeDiv";
import { RageStyledButton, StatusBlock, StatusContent, StatusHeader, StatusRow, TruthContainer } from "./Styles";
import { justTruthSong } from "..";
import { addImageProcess } from "../Utils/URLUtils";
interface StatusProps {
    player: Player;
}


export const CCTV = (props: StatusProps) => {
    const { player } = props

    

     
      const startCCTV=async(canvas:HTMLCanvasElement)=>{
        const bg1 = await addImageProcess(cctv);
        const bg2 = await addImageProcess(cctv2);
        //TODO pick a different monster out depending on your themes
        //obvs we won't have a monster for EVERY scene, but enough.
        //enough to build the vibe of gaslighting and *why* and difficulty communicating
        const mon1 = await addImageProcess(monster1);
        const mon2 = await addImageProcess(monster2);
        cctv_loop(canvas, bg1, bg2, mon1, mon2);


    }
    //the inherent irony of using react to nuke the dom
    // from orbit and then switch to vanilla javascript is not lost on me.
    //consider this performance art
    //really im just lazy and want to make sure theres as little
    // competition for my cctv loop as possible
    //also, sure, why not, you're trapped in the murder basement
    // now and thers no way out. have fun!
    useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
            justTruthSong();
            console.log("JR NOTE: body is", body.childNodes)
            //just fucking remove everything else. inner peace for all.
            body.innerHTML = "";
            body.style.background = "#000000";
            const canvas = document.createElement("canvas");
            canvas.width = 480;
            canvas.height = 480;
            canvas.style.marginLeft = "auto";
            canvas.style.marginRight = "auto";
            canvas.style.display = "block";
            canvas.style.padding="20px";
            body.append(canvas);
            startCCTV(canvas);
        }

    }, []);

    return (

        <TruthContainer>

        </TruthContainer>
    );
}