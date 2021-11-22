import styled from "@emotion/styled";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { all_themes, Theme } from "../../Modules/Theme"
import {drawDoors, drawFloor, drawFloorObjects, drawWall, drawWallObjects, initBlack, RenderedItems } from "./canvas_shit";

import { addImageProcess } from "../../Utils/URLUtils";
import { loadSecretImage} from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { FLOOR, FLOORBACKGROUND, FLOORFOREGROUND, WALL, WALLBACKGROUND, WALLFOREGROUND } from "../../Modules/ThemeStorage";




interface RoomProps {
    themeKeys: string[];
    numberDoors: number;
    itemsRef: MutableRefObject<RenderedItems[]>;
  }

  const RoomCanvas = styled.canvas`
    position: absolue;
  `
export const Room:React.FC<RoomProps> = ({themeKeys,numberDoors,itemsRef}) => {

    //given the same themes  in the same order you'll get the same room (so even if the vdom is a little bitch and triggers a rerender when theres a pop up we'll never know)
    const seededRandom = useMemo(()=>{
        let value = 0;
        let theme_index = 0;
        for(let tk in themeKeys){
            theme_index ++;
            for(let i =0; i<tk.length; i++){
                value += theme_index *tk.charCodeAt(i);
            }
        }
       return new SeededRandom(value);
    },[themeKeys]);

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
        //TODO actually use these returned items as part of the flavortext calculation
        //store them in a ref
        const items1:RenderedItems[] = await drawWallObjects(WALLBACKGROUND,"BackWallObjects",canvas,seededRandom,themes);
        const door:any = await addImageProcess(loadSecretImage('Walkabout/door.png')) as HTMLImageElement;
        const rug:any = await addImageProcess(loadSecretImage('Walkabout/rug.png')) as HTMLImageElement;
        drawDoors(canvas,numberDoors,door, rug);
        const items2:RenderedItems[] = await drawWallObjects(WALLFOREGROUND,"FrontWallObjects",canvas,seededRandom,themes);
        const items3:RenderedItems[] = await drawFloorObjects(FLOORBACKGROUND,"UnderFloorObjects",canvas,seededRandom,themes);
        const items4:RenderedItems[] = await drawFloorObjects(FLOORFOREGROUND,"TopFloorObjects",canvas,seededRandom,themes);
        const items = items1.concat(items2).concat(items3).concat(items4);
        console.log("jr note: items are: ",items);
        itemsRef.current = items;
    }

    useEffect(()=>{
        if(canvasRef.current){
            console.log("JR NOTE: themes are",themeKeys)
            drawRoom(canvasRef.current, themeKeys.map((theme)=>all_themes[theme]));
        }
    },[canvasRef,themeKeys])


    return(
        <RoomCanvas ref={canvasRef} id="canvasRoom" height="500" width="500"/>
    )

}

