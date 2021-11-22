import styled from "@emotion/styled";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import {distanceWithinRadius, drawDoors, drawFloor, drawFloorObjects, drawWall, drawWallObjects, initBlack, RenderedItems } from "./canvas_shit";
import real_eye from './../../images/real_eye.png';
import { doorEffect, loadSecretImage} from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { MEMORY_KEY, QUOTIDIAN_KEY } from ".";
import { isStringInArrayWithKey, addStringToArrayWithKey, removeStringFromArrayWithKey } from "../../Utils/LocalStorageUtils";
import FlavorPopup from "./FlavorPopup";
import { spawn } from "child_process";


interface WandererProps {
    itemsRef: MutableRefObject<RenderedItems[]>;
    seededRandom: SeededRandom;
    makeChild: Function;
    numberDoors:number;
  }

  const RoomCanvas = styled.canvas`
    position: absolue;
  `
export const Wanderer:React.FC<WandererProps> = ({itemsRef,seededRandom,makeChild,numberDoors}) => {

    interface PlayerProps {
        leftSpawn: number;
        topSpawn: number;
    }
    

    const Player = styled.img`
        position: absolute;
        left:0px;
        top: 0px;
    `

    const Container = styled.div`
        position: absolute;
        left: ${(props: PlayerProps) => props.leftSpawn}px;
        top: ${(props: PlayerProps) => props.topSpawn}px;
    `

    const [spawnPoint, setSpawnPoint] = useState({left:250,top:450});
    const [flavorText, setFlavorText] = useState<string|undefined>();
    const [playerLocation, setPlayerLocation] = useState(spawnPoint);


    useEffect(()=>{
        console.log("JR NOTE: spawn point has changed to", spawnPoint)
        setPlayerLocation({top:spawnPoint.top, left:spawnPoint.left})
    }, [spawnPoint])

    const goNorth = ()=>{
        //put you to the south
        console.log("JR NOTE: going north")
        setSpawnPoint({left: 250, top: 475-50});
        const tmpRand = new SeededRandom(0+seededRandom.getRandomNumberBetween(216,216216216216216));
        //spawn a new room
        makeChild(tmpRand);
    }

    const goSouth = ()=>{
        //put you to the south
        console.log("JR NOTE: going south")

        setSpawnPoint({left: 250, top: 105+50});
        const tmpRand = new SeededRandom(1+seededRandom.getRandomNumberBetween(216,216216216216216));
        //spawn a new room
        makeChild(tmpRand);
    }

    const goEast = ()=>{
        console.log("JR NOTE: going east")

        //put you to the south
        setSpawnPoint({left: 25+50, top: 250});
        const tmpRand = new SeededRandom(2+seededRandom.getRandomNumberBetween(216,216216216216216));
        //spawn a new room
        makeChild(tmpRand);
    }

    
    const isMemoryKnowByWanderer = (memory: string)=>{
        return isStringInArrayWithKey(MEMORY_KEY,memory);
    }

    const isMemorySacrificedByWanderer = (memory: string)=>{
        return isStringInArrayWithKey(QUOTIDIAN_KEY,memory);
    }

    const addMemoryToWanderer = (memory:string)=>{
        console.log("JR NOTE: I want to add a memory to the wanderer, do i already have it?",isMemoryKnowByWanderer(memory),"do the birds?",!isMemorySacrificedByWanderer(memory))
        if(!isMemoryKnowByWanderer(memory) && !isMemorySacrificedByWanderer(memory)){
            addStringToArrayWithKey(MEMORY_KEY,memory);
        }

    }

    const takeMemoryFromWanderer = (memory:string)=>{
        if(isMemoryKnowByWanderer(memory) && !isMemorySacrificedByWanderer(memory)){
            addStringToArrayWithKey(QUOTIDIAN_KEY,memory);
            removeStringFromArrayWithKey(MEMORY_KEY,memory);
        }
    }

    
    //unlike doors, items are not in set locations, check the items ref
    const checkForItems =(top: number, left: number)=>{
        //TODO: JR NOTE: im worried setting the flavor text will rerender this which will fuck up my room
        //might need to pull flavor text down. somehow...
        //or is that a fever dream from back when i got stuck in a loop trying to move rooms without the game rerendering the room
        const wanderer_radius = 25;

        for(let item of itemsRef.current){
            if(distanceWithinRadius(wanderer_radius,item.x+item.width/2,item.y+item.height/2 ,left,top)){
                console.log("JR NOTE: i am near an item ", item.flavorText);
                addMemoryToWanderer(item.flavorText);
                //JR NOTE: setting current ref doesn't necessarily make flavor text dialogue notice. 
                setFlavorText(item.flavorText);
                //JR NOTE: TODO might want to NOT return if its an item in neither memory array.
                return;
            }
        }
    }

    //where is the player? are they near a door?
    const checkForDoor =(top: number, left: number)=>{
        //TODO check how many doors actually exist
        const SOUTH = [250,475];
        const NORTH = [250,105];
        const EAST = [475,250];

        const wanderer_radius = 25;
        let nearDoor = false;

        //there will ALWAYS be a door to the south at the very minimum
        if(distanceWithinRadius(wanderer_radius,SOUTH[0],SOUTH[1] ,left,top)){
            goSouth();
            nearDoor = true;
        }

        if(numberDoors > 1 && distanceWithinRadius(wanderer_radius,NORTH[0],NORTH[1] ,left,top)){
            nearDoor = true;
            goNorth();
        }

        if(numberDoors > 2 && distanceWithinRadius(wanderer_radius,EAST[0],EAST[1] ,left,top)){
            goEast();
            nearDoor = true;
        }


        if(nearDoor){
            doorEffect();
        }

    }
 

    const processWalk =(key:string)=>{
        const minTop = 500-350-30;
        const maxTop = 500-30;
        const maxLeft = 455;
        const minLeft =15;
        if(playerLocation){
            let prevTop = playerLocation.top;

            let prevLeft = playerLocation.left;

            if((key === "s" || key === "ArrowDown")&& prevTop < maxTop){
                prevTop += 10;
            }
            if((key === "w" || key === "ArrowUp")&& prevTop > minTop){
                prevTop += -10
            }
            if((key === "a" || key === "ArrowLeft") && prevLeft > minLeft){
                prevLeft += -10;
            }
            if((key === "d" || key === "ArrowRight")&& prevLeft < maxLeft ){
                prevLeft += 10;
            }
            setPlayerLocation({top: prevTop, left: prevLeft});
            checkForDoor(prevTop, prevLeft);
            checkForItems(prevTop, prevLeft);
        }
    }

    const handleUserKeyPress = (event: KeyboardEvent)=>{
        processWalk(event.key);
    }

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleUserKeyPress);
        };
      });

      console.log("JR NOTE: player loc",playerLocation, "spawn point is", spawnPoint)
    return(
        <Container leftSpawn={playerLocation.left} topSpawn={playerLocation.top}>
            {flavorText ?<FlavorPopup text={flavorText} left={playerLocation.left} top={playerLocation.top}/>:null}
            <Player src={real_eye} id="player"/>    
        </Container>
 )

}

