
import styled from "@emotion/styled";
import { useEffect } from "react";
import caw_caw from "../../images/crow_of_judgement.jpg";


const StyledImage = styled.img`
        height: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    `;

export const CrowSim = () => {

    const killGameStuff = () => {
        const body = document.querySelector("body");
        if (body) {
            body.style.backgroundImage = "";
            body.style.backgroundColor = "black";
            body.id = "no";
        }

        const bg: HTMLElement | null = document.querySelector("#ThisIsNotABG");
        if (bg) {
            bg.style.backgroundImage = "";
            bg.id = "no3";

        }

        const nas: HTMLElement | null = document.querySelector("#ThisIsNotASpiral");
        if (nas) {
            nas.style.backgroundImage = "";
            nas.id = "no2";
        }

    }

    useEffect(() => {
        killGameStuff();
    }, [])



        return (
            <StyledImage src = {caw_caw}/>
        )


}



