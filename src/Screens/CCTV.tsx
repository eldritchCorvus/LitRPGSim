import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { cctv_ghost_loop } from "../CanvasFuckery/ghosts";
import cctv from '.././images/murderbasement.jpeg';
import cctv2 from '.././images/murderbasement2.jpeg';
import monster1 from '.././images/monsters/doll/1.png';
import monster2 from '.././images/monsters/doll/1left.png';

import { Player } from "../Modules/Player";
import { OneCharAtATimeDiv } from "./OneCharAtATimeDiv";
import { RageStyledButton, StatusBlock, StatusContent, StatusHeader, StatusRow, TruthContainer } from "./Styles";
import { justTruthSong } from "..";
import { addImageProcess } from "../Utils/URLUtils";
import ReactDOM from "react-dom";
import { Input } from "reakit/Input";
interface StatusProps {
    player: Player;
    ghosts: boolean;
}


export const CCTV = (props: StatusProps) => {
    const { player, ghosts } = props

    //real ghost hours
    const startGhostCCTV = async (canvas: HTMLCanvasElement) => {
        if (ghosts) {
            const bg1 = await addImageProcess(cctv) as HTMLImageElement;
            const bg2 = await addImageProcess(cctv2) as HTMLImageElement;
            //TODO pick a different monster out depending on your themes
            //obvs we won't have a monster for EVERY scene, but enough.
            //enough to build the vibe of gaslighting and *why* and difficulty communicating
            const mon1 = await addImageProcess(monster1) as HTMLImageElement;
            const mon2 = await addImageProcess(monster2) as HTMLImageElement;
            cctv_ghost_loop(canvas, bg1, bg2, mon1, mon2);
        }
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
            const div = document.createElement("div");
            div.id = "pwfuckery";

            body.append(div);
            const canvas = document.createElement("canvas");
            canvas.width = 480;
            canvas.height = 480;
            canvas.style.marginLeft = "auto";
            canvas.style.marginRight = "auto";
            canvas.style.display = "block";
            canvas.style.padding = "20px";
            body.append(canvas);
            if (ghosts) {
                div.style.color = "white";
                div.innerText = "You arrive in the BASEMENT TUNNELS.  You do not want to be here. There is a single CCTV monitor and a button. You feel like you are being watched.";
                startGhostCCTV(canvas);
            } else {
                PasswordFuckeryKickoff();
            }
        }

    }, []);

    return (

        <TruthContainer>
        </TruthContainer>
    );
}




const PasswordFuckery = () => {
    const [pw, setPW] = useState("");

    //wanted to play around with actually doing input correctly with a sumbmit after seeing a candidate do it
    const onSubmit = (event: FormEvent) => {
        console.log("JR NOTE: kek", pw);
        event.preventDefault();
        return false;
    }
    return (
        <TruthContainer>
            <StatusContent>
                You are down the rabbit hole. It does not end. If you know important words, you may enter them here.
            </StatusContent>
            <form action="" method="post" onSubmit={onSubmit}>
                <Input onChange={(event) => { setPW(event.target.value) }} placeholder="Type Important WordsHere"></Input>
                <button>Submit</button>
            </form>


        </TruthContainer>
    )

}

const PasswordFuckeryKickoff = () => {
    const ele = document.getElementById('pwfuckery');
    if (!ele) {
        return;
    }

    ReactDOM.render(
        <React.StrictMode>
            <PasswordFuckery />
        </React.StrictMode>,
        ele
    );
}