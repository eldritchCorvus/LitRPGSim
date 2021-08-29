import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { cctv_ghost_loop } from "../CanvasFuckery/ghosts";
import cctv from '.././images/murderbasement.jpeg';
import cctv2 from '.././images/murderbasement2.jpeg';
import monster1 from '.././images/monsters/doll/1.png';
import monster2 from '.././images/monsters/doll/1left.png';

import { Player } from "../Modules/Player";
import { justTruthSong } from "..";
import { addImageProcess } from "../Utils/URLUtils";
import ReactDOM from "react-dom";
import { Input } from "reakit/Input";
import { albhed_map, passwords } from "../CanvasFuckery/PasswordStorage";
import { wrong_password } from "../CanvasFuckery/password_result";
import styled from "@emotion/styled";
import SeededRandom from "../Utils/SeededRandom";
import { CameraFeed } from "../CanvasFuckery/camera_feed";
import { CCTV } from "../CanvasFuckery/cctv_fuckery";
interface StatusProps {
    player: Player;
    ghosts: boolean;
}

interface PWProps {
    canvas: HTMLCanvasElement;
    rand: SeededRandom;
}

export const PWContainer = styled.div`
    padding: 10px;
    margin: 10px;
    margin-top: 0%;
    font-weight: 500;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    background: rgba(0,0,0,0.5);
    color: red;
`

export const Content = styled.div`
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 25px;
    width: 1000px;
    border-radius: 13px;
`

export const StyledButton = styled.button`
    display: block;
    margin-left: 60px;
    margin-top: 10px;
`

export const StyledInput = styled(Input)`
    margin-left: 60px;
`



export const CCTVScreen = (props: StatusProps) => {
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
                PasswordFuckeryKickoff(canvas,player.rand);
            }
        }

    }, []);

    return (

        <PWContainer>
        </PWContainer>
    );
}




const PasswordFuckery = (props: PWProps) => {
    const [pw, setPW] = useState("");
    const [feed, setFeed] = useState<CCTV>();


    const translate = (word: string) => {
        let ret = word.toLowerCase();
        let done = "";
        for (let i = 0; i < word.length; i++) {
            if ((albhed_map as any)[ret[i]] && !done.includes(ret[i])) {
                done += ret[i];
                ret = ret.replaceAll(ret[i], (albhed_map as any)[ret[i]]);
            }
        }
        return ret;
    }

    useEffect(()=>{
        feed?.play();
    },[feed]);

    //wanted to play around with actually doing input correctly with a sumbmit after seeing a candidate do it
    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (Object.keys(passwords).includes(pw)) {
            console.error("JR NOTE: todo handle correct pws");
        } else {
            const troll_pw = translate(pw);
            if(feed){
                feed.stop();
            }
            setFeed(await wrong_password(props.canvas, troll_pw, props.rand));
            //use effect will play it.
        }
        return false;
    }
    return (
        <PWContainer>
            <Content>
                <p>You are down the rabbit hole. It does not end. If you know important words, you may enter them here.</p>
            </Content>
            <form action="" method="post" onSubmit={onSubmit}>
                <StyledInput onChange={(event) => { setPW(event.target.value) }} placeholder="Type Important Words Here"></StyledInput>
                <StyledButton>Submit</StyledButton>
            </form>
        </PWContainer>
    )

}

const PasswordFuckeryKickoff = (canvas: HTMLCanvasElement, rand: SeededRandom) => {
    const ele = document.getElementById('pwfuckery');
    if (!ele) {
        return;
    }

    ReactDOM.render(
        <React.StrictMode>
            <PasswordFuckery canvas={canvas} rand={rand}/>
        </React.StrictMode>,
        ele
    );
}