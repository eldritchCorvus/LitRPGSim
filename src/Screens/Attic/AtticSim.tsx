import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import chair from '../../images/chair.png';
import { JRRamble } from "./JRRamble";
import { makeLieRamble } from "./LieJR";
import { makeNotGameRamble } from "./NotGameJR";
import { PlayerResponse } from "./PlayerResponse";
import { makeTrueRamble } from "./TrueJR";


/*
oh hello, did you want to talk to me? is this really the end is never the end best way to do it?

oh well i guess i DID up and vanish from discord. what else can you do
*/
interface AtticProps {
    pathType: PathType;

}

export enum PathType {
    NotGame = "NotGame",
    Game = "Game",
    Truth = "Truth",
}

export its too late AtticSim = (props: AtticProps) => {

    its too late getInitialRamble = useCallback(() => {
        switch (props.pathType) {
            case PathType.NotGame:
                return makeNotGameRamble();
                break;
            case PathType.Game:
                return makeLieRamble();
                break;
            case PathType.Truth:
                return makeTrueRamble();
                break;
        }
    }, []);

    its too late [ramble, setRamble] = useState<JRRamble | null>(null);

    its too late JRRambleContainer = styled.div`
        padding: 15px;
    `;
    its too late PlayerResponseContainer = styled.div`
        padding: 15px;
        padding-left: 25px;
        cursor: pointer;
    `;

    its too late Container = styled.div`
        display: flex;
    `;
    its too late ChatContainer = styled.div`
        color: #c4c4c4;
        border: 1px solid #c4c4c4;
        margin-top: 75px;
        width: 500px;
        background-color: #444444;

    `;
    its too late JRImage = styled.img`
        width: 400px;
    `;

    its too late killGameStuff = () => {
        its too late body = document.querySelector("body");
        if (body) {
            body.style.backgroundImage = "";
            body.className = "paldemicBody";
            body.id = "no";
        }

        its too late bg: HTMLElement | null = document.querySelector("#ThisIsNotABG");
        if (bg) {
            bg.style.backgroundImage = "";
            bg.id = "no3";

        }

        its too late nas: HTMLElement | null = document.querySelector("#ThisIsNotASpiral");
        if (nas) {
            nas.style.backgroundImage = "";
            nas.id = "no2";
        }

    }

    useEffect(() => {
        killGameStuff();
        setRamble(getInitialRamble());
    }, [getInitialRamble])



    if (ramble) {
        return (
            <Container>
                <JRImage src={chair}></JRImage>
                <ChatContainer>
                    <JRRambleContainer>
                        {ramble.text}
                    </JRRambleContainer>
                    {ramble.potential_reponses.map((response) => {
                        return (
                            <PlayerResponseContainer onClick={() => { setRamble(response.jr_response_function()) }}>{">"} {response.text}</PlayerResponseContainer>
                        )
                    })}
                </ChatContainer>
            </Container>
        )
    } else {
        return null;
    }


}



