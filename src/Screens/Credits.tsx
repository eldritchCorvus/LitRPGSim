import React, {useCallback, useEffect, useState } from "react";


import { Player } from "../Modules/Player";
import styled from "@emotion/styled";
import { getRandomNumberBetween } from "../Utils/NonSeededRandUtils";

interface StatusProps {
    player: Player;
}


export const CreditsContainer = styled.div`
    padding: 10px;
    margin: 10px;
    font-weight: 500;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
    color:  #000000;
    background:  #edd287;
    border: 3px solid #000000;
    border-radius: 13px;
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    overflow: auto;
    left: 15%;
    top: 125px;
    height: 500px;
    overflow: hidden;

`

export const CreditsContent = styled.div`
    padding: 10px;
`

export const CreditHeader = styled.div`
    font-size: 24px;
    margin: 20px;
`

export const CreditParagraph = styled.div`
    font-size: 18px;
    margin: 20px;
`

export const CreditLine = styled.div`
    font-size: 18px;
    padding: 5px;
    margin: 10px;
    width: 100%;
`

export const CreditLeft = styled.div`
    text-align: right;
    display: inline-block;
    width: 45%;
    padding-right: 10px;

`

export const CreditRight = styled.div`
    text-align: left;
    display: inline-block;
    width: 45%;
    padding-left: 10px;
`




export const CreditsScreen = (props: StatusProps) => {
    /*
    want to pass it a list of CreditLines and CreditHeaders and have it scroll the entire upper div at once.
    */
    const [showSecrets, setShowSecrets] = useState([Math.random() > 0.5]);

    const gaslight = useCallback(() => {
        const arr = [];
        const amount = getRandomNumberBetween(0,20);
        for(let i = 0; i<amount; i++){
            arr.push(Math.random()>0.5)
        }
        setShowSecrets(arr);
        setTimeout(() => {
            window.requestAnimationFrame(() => { gaslight() })
        }, 5000);
    },[]);
    
    useEffect(() => {
        gaslight();
        const root = document.querySelector("#ThisIsNotAGame")

        if (root){
            (root as HTMLElement).style.filter = "blur(0px)";
        }else{
            const root2 = document.querySelector("#ThisIsAGame");
            if(root2){
             (root2 as HTMLElement).style.filter = "blur(0px)";
            }
        }
    }, [gaslight])

    const getLineSecret = (i: number)=>{
        if(i<showSecrets.length){
            return showSecrets[i];
        }else{
            return false;
        }
    }



    return (

        <CreditsContainer>
            <CreditsContent id="credits">
                <CreditHeader>ZampanioSim Credits</CreditHeader>
                <CreditParagraph>You have defeated the evil Doctor Slaughter! Congratulations! Don't forget to try again to see what mysteries you missed being restricted to your current Title!</CreditParagraph>
                <CreditParagraph>Bonus Achievement detected! 100% Completion of SkillTree! Congratulations!</CreditParagraph>

                <CreditLine>
                    <CreditLeft>Based on a Creepypasta Concept By: </CreditLeft> <CreditRight><span>Onapmaz1984</span></CreditRight>
                </CreditLine>
                <CreditHeader>In House:</CreditHeader>


                <CreditLine>
                    <CreditLeft>Ideas, Programming and Design: </CreditLeft> <CreditRight><span>{getLineSecret(1) ? "justifiedRecursion" : "jadedResearcher"}</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Writing: </CreditLeft> <CreditRight><span>{getLineSecret(2) ? "jumpyRacontauer" : "its just jr"}</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Shadow Graphics: </CreditLeft> <CreditRight><span><a href = 'http://farragofiction.com/DollSim/index.html?type=427'>Monster Girl Doll Sim</a></span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Shadow Graphics: </CreditLeft> <CreditRight><span>{getLineSecret(3) ? "jeepersRaggy" : "seriously its just jr"}</span></CreditRight>
                </CreditLine>
                <CreditLine>
                    <CreditLeft>Voicework: </CreditLeft> <CreditRight><span>{getLineSecret(4) ? "jutteringRiches" : "still just jr"}</span></CreditRight>
                </CreditLine>

                <CreditHeader>Free Or Purchased Generic Assets:</CreditHeader>

                <CreditLine>
                    <CreditLeft>Music: </CreditLeft> <CreditRight><span>RPG_Maker_VX_Ace_Airship</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>BG Graphic: </CreditLeft> <CreditRight><span>RPG Maker</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Tunnels Under Millbank Prison</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 37965548 / Abandoned Office © Emmanouil Pavlis | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 106176433 © Mulderphoto | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 37910249 / Abandoned Office © Emmanouil Pavlis | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 58837940 / Abandoned Computer © Alberto Violante | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 20658184 / Abandoned © Rigmanyi | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 23278565 / Abandoned © Marbury67 | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 87359979 / Abandoned © Shermancahal | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 36310251 / Abandoned © Joop Kleuskens | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 98438134 / Abandoned © Shermancahal | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 87359540 / Abandoned © Shermancahal | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 143818783 / Abandoned © Mulderphoto | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 82823450 / Abandoned © Shermancahal | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 107263084 / Abandoned © Ded Mityay | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 25350097 / Abandoned © Oliver Sved | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 66614814 / Abandoned © Lakhesis | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 22464803 / Abandoned © Marcel Clemens | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 98716328 / Abandoned © Pbpics | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                <CreditLeft>CCTV Image: </CreditLeft> <CreditRight><span>Photo 83560464 / Abandoned © Brad Sauter | Dreamstime.com</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Nunito Font: </CreditLeft> <CreditRight><span>Vernon Adams</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Graffiti City Font: </CreditLeft> <CreditRight><span>Woodcutter</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Marsneveneksk Font: </CreditLeft> <CreditRight><span>marsnev</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Most Wasted Font: </CreditLeft> <CreditRight><span>Koczman Bálint</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Next Custom Font: </CreditLeft> <CreditRight><span>imagex</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Sister Spray Font: </CreditLeft> <CreditRight><span>imagex</span></CreditRight>
                </CreditLine>

                <CreditLine>
                    <CreditLeft>Urban Heroes Font: </CreditLeft> <CreditRight><span>imagex</span></CreditRight>
                </CreditLine>

                <CreditHeader>And Most of All:</CreditHeader>

                <CreditLine>
                    <CreditLeft>You: </CreditLeft> <CreditRight><span>Thank you for Playing!         <a key={"link"} href={`?seed=${getRandomNumberBetween(0,33333333)}`}>Play Again</a>
 With Random Character?</span></CreditRight>
                </CreditLine>

            </CreditsContent>

        </CreditsContainer>
    );
}



