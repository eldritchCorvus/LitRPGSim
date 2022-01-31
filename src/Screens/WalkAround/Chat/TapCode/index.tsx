import styled from "@emotion/styled";
import { Fragment, useCallback, useEffect, useState } from "react";
import {playSecretScratch } from "../../../..";
import { pickFrom } from "../../../../Utils/NonSeededRandUtils";

export const TapCode: React.FC = () => {
    const TapCodeContainer = styled.div`
        height: 100%;
        width: 90%;
        position: fixed;
        top: 0px;
        left: 0px;
        color: #c4c4c4;
        opacity: 40%;
        padding: 100px;
        font-size: 4vw;
        font-family: 'bloodscratch'
    `
    /*
    * engine where it layers on full screen the tap code i enter in its entirity (chooses font size so it'll be full screen)
    * instead of displaying all scratches all the time, display up to the current mark (look at TBD Chat code)
    * do next mark after current mark is done playing
    */


    const tapCodeToScratches = (tc: string) => {
        let ret = [];
        const options = ["|", "!", "1", "I"]
        for (let c of tc) {
            if (c !== " ") {
                ret.push(pickFrom(options));
            } else {
                ret.push(" ");
                ret.push(" ");
            }
        }
        return ret;
    }
    const tapCode = ".... ....  .. ...  . .....  . ...  ... ....  .. .  .. .  .. ....  ... ...  .. ....  .... ...  .... ....  .. ...  . .....  . ...  .. ...  .... ..  ..... ....  .... ...  . .  ... .  .. ....  .... ...";
    const [pastDisplayTapCode, setPastDisplayTapCode] = useState<string[]>([]);
    const [pendingDisplayTapCode, setPendingDisplayTapCode] = useState(tapCodeToScratches(tapCode));

    //playSecret

    const playScratch = () => {
        const options = ["scratch1.mp3", "scratch2.mp3", "scratch3.mp3", "scratch4.mp3", "scratch5.mp3", "scratch6.mp3", "scratch7.mp3", "scratch8.mp3", "scratch9.mp3", "scratch10.mp3", "scratch11.mp3", "scratch12.mp3", "scratch13.mp3"];
        playSecretScratch(`${pickFrom(options)}`);
    }

    const memorizedProcessCurrentScratch = useCallback(() => {
        //if no more lines, update up the chain that this is no longer a new chat
        if (pendingDisplayTapCode.length > 0) {
            const current = pendingDisplayTapCode[0];
            if (current !== " ") {
                playScratch();
            }
            setPastDisplayTapCode([...pastDisplayTapCode, pendingDisplayTapCode[0]])
            setPendingDisplayTapCode(pendingDisplayTapCode.slice(1))
        }
    }, [pastDisplayTapCode, pendingDisplayTapCode])

    useEffect(() => {
        const timer = setTimeout(() => {
            memorizedProcessCurrentScratch();
        }, 500)
        return () => {
            clearTimeout(timer);
        };
    }, [pendingDisplayTapCode])

    return (
        <TapCodeContainer>
            {pastDisplayTapCode.map((c) => {
                return (<span>{c}</span>)
            })}
        </TapCodeContainer>
    )
}