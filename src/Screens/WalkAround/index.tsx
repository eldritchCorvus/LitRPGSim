
import real_eye from './../../images/real_eye.png';

import { Fragment, useEffect, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes } from '../../Modules/Theme';
import { BUGS, DECAY, LOVE } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';
import help_icon from './../..//images/Walkabout/icons8-chat-64.png';
import x_icon from './../..//images/Walkabout/icons8-x-50.png';

import { HelpChatBox } from './HelpChatBox';
import { playHelpDeskMusic, playAmbientMazeMusicMadness, doorEffect } from '../..';


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
        top: 350px;
    `

    const [themes,setThemes] = useState([all_themes[BUGS],all_themes[DECAY],all_themes[LOVE]]);
    const [chatHelp, setChatHelp] = useState(false);

    const distanceWithinRadius = (radius:number,x1:number,y1:number,x2:number,y2:number)=>{
        const first = (x1-x2)**2;
        const second = (y1-y2)**2;
        return (first + second)**0.5 < radius;
    }

    //where is the player? are they near a door?
    const checkForDoor =(top: number, left: number)=>{
            const SOUTH = [250,475];
            const NORTH = [250,105];
            const EAST = [475,250];

        const wanderer_radius = 50;
        let nearDoor = false;

        if(distanceWithinRadius(wanderer_radius,NORTH[0],NORTH[1] ,left,top)){
            console.log("JR NOTE: todo go north because ", left, top)
            nearDoor = true;
        }

        if(distanceWithinRadius(wanderer_radius,SOUTH[0],SOUTH[1] ,left,top)){
            console.log("JR NOTE: todo go south", left, top)
            nearDoor = true;
        }

        if(distanceWithinRadius(wanderer_radius,EAST[0],EAST[1] ,left,top)){
            console.log("JR NOTE: todo go east", left, top)
            nearDoor = true;
        }


        if(nearDoor){
            doorEffect();
        }

    }
 

    const processWalk =(key:string)=>{
        const minTop = 500-350-30;
        const maxTop = 500-50;
        const maxLeft = 450;
        const minLeft =15;
        const p = playerRef.current;
        if(p){
            let prevTop = parseInt(p.style.top);
            if(!prevTop){
                prevTop =350;
            }

            let prevLeft = parseInt(p.style.left);
            if(!prevLeft){
                prevLeft =250;
            }

            if((key === "s" || key === "ArrowDown")&& prevTop < maxTop){
                p.style.top = `${prevTop+10}px`;
            }
            if((key === "w" || key === "ArrowUp")&& prevTop > minTop){
                p.style.top = `${prevTop-10}px`;
            }
            if((key === "a" || key === "ArrowLeft") && prevLeft > minLeft){
                p.style.left = `${prevLeft-10}px`;
            }
            if((key === "d" || key === "ArrowRight")&& prevLeft < maxLeft ){
                p.style.left = `${prevLeft+10}px`;
            }
            checkForDoor(prevTop, prevLeft);
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
                <li>text should get auto lower cased , shit post extensions like 217, 113, etc.  217 says "There's no one here. Leave."</li>
                <li>leads to infinite spiralling help desk that leverages attic code, plot is Wanda trying to accuse Eyedol of having a serial killer in their staff</li>
                <li>after ten minutes you reach the closer who actually listens to what you say, is in a new chat window entirely and wants to know what they need to do to make you go away.</li>
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
                <li>find your coffin and go down and down and down</li>
                <li>put this on LItRpgsim never tell anyone (also itch.io and steam) (diff base themes corruption steam)</li>
            </div>
            <HelpIcon onClick={()=>setChatHelp(!chatHelp)}><div style={{display:"inline-block", verticalAlign: "top",textAlign: "center"}}>Help</div>{chatHelp?<IconImage src ={x_icon}></IconImage>:<IconImage src ={help_icon}></IconImage>}</HelpIcon>
            {chatHelp? <HelpChatBox/>:null}
        </Fragment>

    )
}