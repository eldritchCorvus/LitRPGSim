
import real_eye from './../../images/real_eye.png';

import { Fragment, useEffect, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes } from '../../Modules/Theme';
import { BUGS, DECAY, LOVE } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';
import help_icon from './../..//images/Walkabout/icons8-chat-64.png';
import x_icon from './../..//images/Walkabout/icons8-x-50.png';

import { HelpChatBox } from './HelpChatBox';
import { playHelpDeskMusic, playAmbientMazeMusicMadness } from '../..';


export const WalkAround = () => {

    const HelpIcon = styled.button`
    position: fixed;
    top: 15px;
    right: 15px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    border-radius: 25px;
    font-size: 28px;
    line-height: 33px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
`

    const RoomContainer = styled.div`
        padding: 10px;
        margin: 10px;
        font-weight: 500;
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
        margin-left: auto;
        margin-right: auto;
        position: fixed;
        overflow: auto;
        top: 5%;
        left: 25%;
    `;

    const IconImage = styled.img`
    height: 33px;
    width: 33px;
    `



    const Player = styled.img`
        position: absolute;
        left: 250px;
        bottom: 50px;
    `

    const [themes,setThemes] = useState([all_themes[BUGS],all_themes[DECAY],all_themes[LOVE]]);
    const [chatHelp, setChatHelp] = useState(true);
 

    const processWalk =(key:string)=>{
        const maxBottom = 350;
        const minBottom = 15;
        const maxLeft = 450;
        const minLeft =15;
        const p = playerRef.current;
        if(p){
            let prevBottom = parseInt(p.style.bottom);
            if(!prevBottom){
                prevBottom =50;
            }

            let prevLeft = parseInt(p.style.left);
            if(!prevLeft){
                prevLeft =250;
            }
            if((key === "s" || key === "ArrowDown")&& prevBottom > minBottom){
                p.style.bottom = `${prevBottom-10}px`;
            }
            if((key === "w" || key === "ArrowUp")&& prevBottom < maxBottom){
                p.style.bottom = `${prevBottom+10}px`;
            }
            if((key === "a" || key === "ArrowLeft") && prevLeft > minLeft){
                p.style.left = `${prevLeft-10}px`;
            }
            if((key === "d" || key === "ArrowRight")&& prevLeft < maxLeft ){
                p.style.left = `${prevLeft+10}px`;
            }
        }
    }

    const handleUserKeyPress = (event: KeyboardEvent)=>{
        processWalk(event.key);
    }

    useEffect(() => {
        window.addEventListener('keypress', handleUserKeyPress);
    
        return () => {
          window.removeEventListener('keypress', handleUserKeyPress);
        };
      });

      const playerRef = useRef<HTMLImageElement>(null);

      useEffect(()=>{
          if(chatHelp){
            playHelpDeskMusic();
          }else{
            playAmbientMazeMusicMadness();
          }
      },[chatHelp])


    return (
        <Fragment>
            <RoomContainer>

            <Room themes={themes}/>

            <Player ref={playerRef}src={real_eye} id="player"></Player>
            </RoomContainer>
            <div>TODO:
                <li>shit post extensions like 217, 113, etc.  217 says "There's no one here. Leave."</li>
                <li>leads to infinite spiralling help desk that leverages attic code, plot is Wanda trying to accuse Eyedol of having a serial killer in their staff</li>
                <li>when you click you go to a fake telephone interface, dial 216 for customer service</li>
                <li>if you dial it, you get a styled chat window, multiple choice options for talking and a procuedural Level X BULLSHIT DEPARTMENT, BULLSHIT TITTLE (specialist, technician, expert,etc)</li>
                <li>each specialist doesn't listen to you at all and suggests things but inevitably kills the chat and tells you you need some OTHER person at some other number (a level 3 customer retention specalist, for example) store in hash keyed by number</li>
                <li>when you dial the number, get a new person. each minute you play you access new frustration levels of content</li>
                <li>after ten minutes you reach the closer who actually listens to what you say, is in a new chat window entirely and wants to know what they need to do to make you go away.</li>
                <li>there is no one here. leave.</li>
                <li>how should i detect i'm near a door so i can go into a new room?</li>
                <li>the room you are currently in generates child rooms that share at least one theme</li>
                <li>place holder graphic responds to wasd (eye for now, later an animated gif for walking)</li>
                <li>blank canvas controls bounding boxes (can't move above 100 pixels)</li>
                <li>doors can show up NORTH (full door graphic) , SOUTH (carpet overlapping wall), and EAST (carpet overlapping wall)</li>
                <li>press enter to interact</li>

                <li>interact with door you go into new room</li>
                <li>new theme hash in ThemeStorage (can't just make new one cuz want senses and objects etc) has WalkObject. WalkObject has wall graphic, floor graphic, wall scattered graphics and floor scattered graphics objects with source and text. if any source is null, glitchy placeholder</li>
                <li>render floor, walls, and a few objects from themes</li>
                <li>when you interact with an object you get its flavor text (even if its glitchy) </li>
                <li>add glitch effect to WalkObject themes.</li>
                <li>Friends can show up. You can talk to them. You can use them to open doors. </li>
                <li>when all friends are dead NAM and ShamblingHorror show up</li>
                <li>rooms can rarely spawn music boxes or SCRIBBLED NOTEBOOKS which engage with random thematic content</li>
                <li>have way to get to credits in mod</li>
                <li>put this on LItRpgsim never tell anyone (also itch.io and steam) (diff base themes corruption steam)</li>
            </div>
            <HelpIcon onClick={()=>setChatHelp(!chatHelp)}><div style={{display:"inline-block", verticalAlign: "top",textAlign: "center"}}>Help</div>{chatHelp?<IconImage src ={x_icon}></IconImage>:<IconImage src ={help_icon}></IconImage>}</HelpIcon>
            {chatHelp? <HelpChatBox/>:null}
        </Fragment>

    )
}