
import real_eye from './../../images/real_eye.png';
import { Fragment, useEffect, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes } from '../../Modules/Theme';
import { BUGS, DECAY, LOVE } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';

export const WalkAround = () => {

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

    const Player = styled.img`
        position: absolute;
        left: 250px;
        bottom: 50px;
    `

    const [themes,setThemes] = useState([all_themes[BUGS],all_themes[DECAY],all_themes[LOVE]]);
    //this shoould change any time the themes do.
    const [numberExits, setNumberExits] = useState(3);

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


    return (
        <Fragment>
            <RoomContainer>

            <Room themes={themes}/>

            <Player ref={playerRef}src={real_eye} id="player"></Player>
            </RoomContainer>
            <div>TODO:
                <li>between 1 and 3 rooms connect to it</li>
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
            </div>
        </Fragment>

    )
}