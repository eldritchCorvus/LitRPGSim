import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import chair from '../../images/chair.png';
import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";


/*
oh hello, did you want to talk to me? is this really the best way to do it?

oh well i guess i DID up and vanish from discord. what else can you do
*/
export const AtticSim = () => {

    const defaultRamble = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const getInitialRamble = ()=>{
        //gotta build it backwards just like LOMAT
        const ramble = new JRRamble(defaultRamble, []);
        const ramble2 = new JRRamble("Did you get all that?", []);

        ramble.potential_reponses.push(new PlayerResponse("Why???", ramble2));
        ramble.potential_reponses.push(new PlayerResponse("Tell me more.", ramble2));
        ramble.potential_reponses.push(new PlayerResponse("Why yes I DO enjoy coconu mall.", ramble2));

        ramble2.potential_reponses.push(new PlayerResponse("Because.", ramble));
        ramble2.potential_reponses.push(new PlayerResponse("Please stop talking.", ramble));
        ramble2.potential_reponses.push(new PlayerResponse("Wait I meant coconut.", ramble));
        return ramble;
    }
    const [ramble, setRamble] = useState(getInitialRamble());

    const JRRambleContainer = styled.div`
        padding: 15px;
    `;
    const PlayerResponseContainer = styled.div`
        padding: 15px;
        padding-left: 25px;
        cursor: pointer;
        text-decoration: underline;
    `;

    const Container = styled.div`
        display: flex;
    `;
    const ChatContainer = styled.div`
        color: #c4c4c4;
        border: 1px solid #c4c4c4;
        margin-top: 75px;
        width: 500px;
        background-color: #444444;

    `;
    const JRImage = styled.img`
        width: 400px;
    `;

    const killGameStuff = ()=>{
        const body = document.querySelector("body");
        if(body){
            body.style.backgroundImage="";
            body.className = "paldemicBody";
            body.id = "no";
        }

        const bg:HTMLElement|null = document.querySelector("#ThisIsNotABG");
        if(bg){
            bg.style.backgroundImage="";
            bg.id = "no3";

        }

        const nas:HTMLElement|null = document.querySelector("#ThisIsNotASpiral");
        if(nas){
            nas.style.backgroundImage="";
            nas.id = "no2";
        }

    }

    useEffect(()=>{
        killGameStuff();
    },[])



    return(
        <Container>
            <JRImage src = {chair}></JRImage>
            <ChatContainer>
                <JRRambleContainer>
                    {ramble.text}
                </JRRambleContainer>
                {ramble.potential_reponses.map((response)=>{
                    return(
                        <PlayerResponseContainer onClick={()=>{setRamble(response.jr_response)}}>{">"} {response.text}</PlayerResponseContainer>
                    )
                })}
            </ChatContainer>
        </Container>
    )
    

}



