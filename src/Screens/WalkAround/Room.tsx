import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import { Theme } from "../../Modules/Theme"
import { initBlack } from "./canvas_shit";

interface RoomProps {
    themes: Theme[];
  }

  const RoomCanvas = styled.canvas`
    position: absolue;
  `
export const Room:React.FC<RoomProps> = ({themes}) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        if(canvasRef.current){
            initBlack(canvasRef.current);
            //TODO draw the room
        }
    },[canvasRef])


    return(
        <RoomCanvas ref={canvasRef} id="canvasRoom" height="500" width="500"/>
    )

}