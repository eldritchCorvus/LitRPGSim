import styled from "@emotion/styled";
import { Fragment, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { all_themes, Theme } from "../../Modules/Theme"
import { drawDoors, drawFloor, drawBackground,drawForeground,spawnFloorObjects, drawWall, spawnWallObjects, initBlack, RenderedItem } from "./canvas_shit";

import { addImageProcess } from "../../Utils/URLUtils";
import { loadSecretImage } from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { FLOOR, FLOORBACKGROUND, FLOORFOREGROUND, WALL, WALLBACKGROUND, WALLFOREGROUND } from "../../Modules/ThemeStorage";

import coffin1 from './../../images/Walkabout/oh_god.png';
import coffin2 from './../../images/Walkabout/oh_god2.png';
import coffin3 from './../../images/Walkabout/oh_god3.png';



interface RoomProps {
    themeKeys: string[];
    seed: number;
    coffinTime: boolean;
    numberDoors: number;
    canvasRef: RefObject<HTMLCanvasElement>;
    bgCanvasRef: RefObject<HTMLCanvasElement>;
    baseCanvasRef: RefObject<HTMLCanvasElement>;
    itemsRef: MutableRefObject<RenderedItem[]>;
}
const BaseRoomCanvas = styled.canvas`
    position: absolute;
    z-index: 0;
  `
const FGRoomCanvas = styled.canvas`
    position: absolute;
    z-index: 2;
  `

  export const Popup = styled.div`
    border: 2px solid black;
    border-radius: 13px;
    padding: 5px;
    position: absolute;
    top: -50px;
    left: -100px;
    color: black;
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    padding-right: 13px;
    margin: 10px;
    background: #d1b056;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
    z-index: 3;
`

    const Coffin = styled.img`
        position: absolute;
        left:260px;
        width: 50px;
        top: 230px;
        z-index: 10;
    `

  const BGRoomCanvas = styled.canvas`
    position: absolute;
    z-index: 1;
  `
export const Room: React.FC<RoomProps> = ({coffinTime, themeKeys, seed, canvasRef,bgCanvasRef,baseCanvasRef, numberDoors, itemsRef }) => {
    const seededRandom = new SeededRandom(seed);
    const [debugItems, setDebugItems] = useState<boolean>(false);

    //this shoould change any time the themes do.

    const updateURLParams = (seed: number, theme_keys: string[]) => {
        const ominousBullshit = ["its no good","its too late","you cant go back","you cant find the exit","your coffin awaits"];
        var pageUrl = '?' + `seed=${seed}&themes=${theme_keys}&warning=${seededRandom.pickFrom(ominousBullshit)}`;
        window.history.pushState('', '', pageUrl);
    }


    const drawRoom = async (canvas: HTMLCanvasElement,bgCanvas: HTMLCanvasElement, baseCanvas: HTMLCanvasElement,themes: Theme[]) => {
        console.log("JR NOTE: drawing a room for the first time")
        initBlack(baseCanvas);
        const floor_default_choices = ["woodfloor.png", "chevronfloor.png", "metalfloor.png"];
        let floor_choice = seededRandom.pickFrom(themes).pickPossibilityFor(seededRandom, FLOOR)
        if (!floor_choice || floor_choice.includes("ERROR")) {
            floor_choice = seededRandom.pickFrom(floor_default_choices);
        }
        const floor: any = await addImageProcess(loadSecretImage(`Walkabout/floor/${floor_choice}`)) as HTMLImageElement;
        drawFloor(baseCanvas, floor);
        //TODO pull this in from theme

        const wall_default_choices = ["thatchwalls.png", "brickwalls.png", "woodwall.png", "stonewalls2.png"];
        let wall_choice = seededRandom.pickFrom(themes).pickPossibilityFor(seededRandom, WALL)
        if (!wall_choice || wall_choice.includes("ERROR")) {
            wall_choice = seededRandom.pickFrom(wall_default_choices);
        }
        const wall: any = await addImageProcess(loadSecretImage(`Walkabout/wall/${wall_choice}`)) as HTMLImageElement;
        drawWall(baseCanvas, wall);
        //TODO actually use these returned items as part of the flavortext calculation
        //store them in a ref
        const items1: RenderedItem[] = await spawnWallObjects(0,WALLBACKGROUND, "BackWallObjects", canvas, seededRandom, themes);
        const door: any = await addImageProcess(loadSecretImage('Walkabout/door.png')) as HTMLImageElement;
        const rug: any = await addImageProcess(loadSecretImage('Walkabout/rug.png')) as HTMLImageElement;
        drawDoors(bgCanvas, numberDoors, door, rug);
        const items3: RenderedItem[] = await spawnFloorObjects(0,FLOORBACKGROUND, "UnderFloorObjects", canvas, seededRandom, themes);
        const items2: RenderedItem[] = await spawnWallObjects(1,WALLFOREGROUND, "FrontWallObjects", canvas, seededRandom, themes);
        const items4: RenderedItem[] = await spawnFloorObjects(1,FLOORFOREGROUND, "TopFloorObjects", canvas, seededRandom, themes);
        const items = items3.concat(items2.concat(items4));
        if(!coffinTime){
            await drawBackground(bgCanvas,items);
            await drawForeground(canvas,items);
            itemsRef.current = items;
        }
    }

    

    useEffect(() => {
        if (canvasRef.current && bgCanvasRef.current && baseCanvasRef.current) {
            //console.log("JR NOTE: themes are", themeKeys)
            updateURLParams(seed, themeKeys);
            drawRoom(canvasRef.current,bgCanvasRef.current,baseCanvasRef.current, themeKeys.map((theme) => all_themes[theme]));
        }
    }, [canvasRef, themeKeys])

    const debugComponent = ()=>{
        return(
            <Fragment>
                {itemsRef.current.map((item)=>{
                    return(
                        <Popup style={{left:item.x, top:item.y}}>{item.flavorText}</Popup>
                    );
                })}
            </Fragment>
        )
    }


    return (
        <Fragment>
            <BaseRoomCanvas ref={baseCanvasRef} id="canvasBaseRoom" height="500" width="500" />
            <BGRoomCanvas ref={bgCanvasRef} id="canvasRoom" height="500" width="500" />
            <FGRoomCanvas ref={canvasRef} id="canvasBGRoom" height="500" width="500" />
            {coffinTime?<Coffin src={coffin1}/>:null}    

            {debugItems?debugComponent():null}
        </Fragment>
    )

}

