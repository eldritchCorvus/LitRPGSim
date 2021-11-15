import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Theme } from "../../Modules/Theme"
import { drawDoors, drawFloor, drawWall, initBlack } from "./canvas_shit";

import { addImageProcess } from "../../Utils/URLUtils";
import { loadSecretImage} from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { FLOOR, WALL } from "../../Modules/ThemeStorage";




interface RoomProps {
    themes: Theme[];
    seededRandom: SeededRandom;
    numberDoors: number;
  }

  const RoomCanvas = styled.canvas`
    position: absolue;
  `
export const Room:React.FC<RoomProps> = ({themes,seededRandom,numberDoors}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
       //this shoould change any time the themes do.

    const drawRoom = async (canvas: HTMLCanvasElement, themes:Theme[])=>{
        console.log("JR NOTE: drawing room with themes",themes);
        initBlack(canvas);
        //TODO pull this in from theme
        const floor_default_choices = ["woodfloor.png","chevronfloor.png","metalfloor.png"];
        let floor_choice = seededRandom.pickFrom(themes).pickPossibilityFor(seededRandom, FLOOR)
        if(!floor_choice || floor_choice.includes("ERROR")){
            floor_choice = seededRandom.pickFrom(floor_default_choices);
        }
        const floor:any = await addImageProcess(loadSecretImage(`Walkabout/floor/${floor_choice}`)) as HTMLImageElement;
        drawFloor(canvas, floor);
        //TODO pull this in from theme

        const wall_default_choices = ["thatchwalls.png","brickwalls.png","woodwall.png","stonewalls2.png"];
        let wall_choice = seededRandom.pickFrom(themes).pickPossibilityFor(seededRandom, WALL)
        if(!wall_choice || wall_choice.includes("ERROR")){
            wall_choice = seededRandom.pickFrom(wall_default_choices);
        }
        const wall:any = await addImageProcess(loadSecretImage(`Walkabout/wall/${wall_choice}`)) as HTMLImageElement;
        drawWall(canvas,wall);

        const door:any = await addImageProcess(loadSecretImage('Walkabout/door.png')) as HTMLImageElement;
        const rug:any = await addImageProcess(loadSecretImage('Walkabout/rug.png')) as HTMLImageElement;
        drawDoors(canvas,numberDoors,door, rug);

    }

    useEffect(()=>{
        if(canvasRef.current){
            drawRoom(canvasRef.current, themes);
        }
    },[canvasRef,themes])


    return(
        <RoomCanvas ref={canvasRef} id="canvasRoom" height="500" width="500"/>
    )

}