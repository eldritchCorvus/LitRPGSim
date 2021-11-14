import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Theme } from "../../Modules/Theme"
import { drawDoors, drawFloor, drawWall, initBlack } from "./canvas_shit";

import { addImageProcess } from "../../Utils/URLUtils";
import { loadSecretImage} from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { pickFrom } from "../../Utils/NonSeededRandUtils";




interface RoomProps {
    themes: Theme[];
  }

  const RoomCanvas = styled.canvas`
    position: absolue;
  `
export const Room:React.FC<RoomProps> = ({themes}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
       //this shoould change any time the themes do.
       const [numberExits, setNumberExits] = useState(3);

    const drawRoom = async (canvas: HTMLCanvasElement, themes:Theme[])=>{
        initBlack(canvas);
        //TODO pull this in from theme
        const floor_choices = ["weirdfloor.png","waterfloor.png","tilefloor.png","woodfloor.png","arcanefloor.png","chevronfloor.png","lavafloor.png","metalfloor.png"];
        const floor:any = await addImageProcess(loadSecretImage(`Walkabout/floor/${pickFrom(floor_choices)}`)) as HTMLImageElement;
        drawFloor(canvas, floor);
        //TODO pull this in from theme
        const wall_choices = ["thatchwalls.png","leafwalls.png","brickwalls.png","goldwalls.png","woodwall.png","stonewalls2.png"];
        const wall:any = await addImageProcess(loadSecretImage(`Walkabout/wall/${pickFrom(wall_choices)}`)) as HTMLImageElement;
        drawWall(canvas,wall);

        const door:any = await addImageProcess(loadSecretImage('Walkabout/door.png')) as HTMLImageElement;
        const rug:any = await addImageProcess(loadSecretImage('Walkabout/rug.png')) as HTMLImageElement;
        drawDoors(canvas,numberExits,door, rug);

    }

    useEffect(()=>{
        //seed is number of letters in the first themes name.
        const rand = new SeededRandom(themes[0].key.length);
        setNumberExits(rand.getRandomNumberBetween(1,3));
    },[themes]);

    useEffect(()=>{
        if(canvasRef.current){
            drawRoom(canvasRef.current, themes);
        }
    },[canvasRef,themes])


    return(
        <RoomCanvas ref={canvasRef} id="canvasRoom" height="500" width="500"/>
    )

}