import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { Theme } from "../../Modules/Theme"
import { drawDoors, drawFloor, drawWall, initBlack } from "./canvas_shit";

import { addImageProcess } from "../../Utils/URLUtils";
import { loadSecretImage} from '../..';



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
        const floor:any = await addImageProcess(loadSecretImage('Walkabout/woodfloor.png')) as HTMLImageElement;
        drawFloor(canvas, floor);
        //TODO pull this in from theme
        const wall:any = await addImageProcess(loadSecretImage('Walkabout/woodwall.png')) as HTMLImageElement;
        drawWall(canvas,wall);

        const door:any = await addImageProcess(loadSecretImage('Walkabout/door.png')) as HTMLImageElement;
        const rug:any = await addImageProcess(loadSecretImage('Walkabout/rug.png')) as HTMLImageElement;
        drawDoors(canvas,numberExits,door, rug);

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