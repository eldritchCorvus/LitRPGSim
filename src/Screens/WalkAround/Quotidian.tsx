import styled from "@emotion/styled";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import {pointWithinBoundingBox, RenderedItems } from "./canvas_shit";
import birb from './../../images/humanoid_crow.gif';
import { doorEffect} from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { MEMORY_KEY, QUOTIDIAN_KEY } from ".";
import { isStringInArrayWithKey, addStringToArrayWithKey, removeStringFromArrayWithKey } from "../../Utils/LocalStorageUtils";
import FlavorPopup from "./FlavorPopup";
import { pickFrom } from "../../Utils/NonSeededRandUtils";


interface QuotidianProps {
    itemsRef: MutableRefObject<RenderedItems[]>;
    canvasRef: RefObject<HTMLCanvasElement>;
    seededRandom: SeededRandom;
    numberDoors:number;
  }


export const Quotidian:React.FC<QuotidianProps> = ({itemsRef,canvasRef,seededRandom,numberDoors}) => {

    const playerWidth = 50;
    const playerHeight = 50;

    enum STATES {
        WANDERING = 1,
        GOAL,
    }

    enum DIRECTIONS {
        w = "w",
        a ="a",
        s="s",
        d="d"
    }

    interface PlayerProps {
        leftSpawn: number;
        topSpawn: number;
    }
    

    const Quotidian = styled.img`
        position: absolute;
        left:0px;
        top: 0px;
        pointer-events:none;
    `

    const Container = styled.div`
        position: absolute;
        left: ${(props: PlayerProps) => props.leftSpawn}px;
        top: ${(props: PlayerProps) => props.topSpawn}px;
    `

    const [spawnPoint, setSpawnPoint] = useState({left:250,top:450});
    const [flavorText, setFlavorText] = useState<string|undefined>();
    const [birbLocation, setBirbLocation] = useState(spawnPoint);
    const stateRef = useRef<STATES>(STATES.WANDERING);
    const currentHeading = useRef<DIRECTIONS>(DIRECTIONS.w);


    useEffect(()=>{
        setBirbLocation({top:spawnPoint.top, left:spawnPoint.left})
    }, [spawnPoint])
    
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
            if(pointWithinBoundingBox(left,top,item.x,item.y,item.width,item.height)){
                //console.log("JR NOTE: i am near an item ", item.flavorText);
                takeMemoryFromWanderer(item.flavorText);
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
        const SOUTH = [250,475,48,48];
        const NORTH = [250,105,48,91]; //x,y,width,height
        const EAST = [475,250,48,48];

        const wanderer_radius = 25;
        let nearDoor = false;

        //there will ALWAYS be a door to the south at the very minimum
        if( pointWithinBoundingBox(left,top,SOUTH[0],SOUTH[1],SOUTH[2],SOUTH[3])){
            nearDoor = true;
        }

        if(numberDoors > 1 && pointWithinBoundingBox(left,top,NORTH[0],NORTH[1],NORTH[2],NORTH[3])){
            nearDoor = true;
        }

        if(numberDoors > 2 && pointWithinBoundingBox(left,top,EAST[0],EAST[1],EAST[2],EAST[3])){
            nearDoor = true;
        }


        if(nearDoor){
            doorEffect();
        }

    }

    const tick = ()=>{
        console.log("JR NOTE: ticking, current state is", stateRef.current, "heading is: ",currentHeading.current)
        if(stateRef.current === STATES.WANDERING){
            if(Math.random()>0.75){
                const newdir = pickFrom(["w","a","s","d"]);
                currentHeading.current = newdir;
                processWalk(newdir);
            }else{
                processWalk(currentHeading.current);  
            }
        }
    }

    useEffect(()=>{
        console.log("JR NOTE: starting tick effect, current state is", stateRef.current, "heading is: ",currentHeading.current)
            const timer = setTimeout(()=>{
                tick();
            }, 500)
        
            return () => {
              clearTimeout(timer);
            };

    },[birbLocation])

    
 

    const processWalk =(key:string)=>{
        console.log("JR NOTE: Processing walk", key)
        const minTop = 500-350-30;
        const maxTop = 500-30;
        const maxLeft = 455;
        const minLeft =15;

        if(birbLocation){
            let prevTop = birbLocation.top;

            let prevLeft = birbLocation.left;

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
            setBirbLocation({top: prevTop, left: prevLeft});
            const centerX = prevLeft +playerWidth/2;
            const centerY = prevTop +playerHeight/2;

            checkForDoor(centerY, centerX);
            checkForItems(centerY, centerX);
        }
    }



    const handleClick = (event: MouseEvent)=>{
        //todo
        if(canvasRef.current){
            const rect = canvasRef.current.getBoundingClientRect();
            const  x = event.clientX-rect.left;
            const y = event.clientY-rect.top;
            checkForDoor(y,x);
            checkForItems(y,x);
        }
    }




     //because its on the canvas it should be relative to it.
      useEffect(() => {
          if(canvasRef.current){
            canvasRef.current.addEventListener('mousedown', handleClick);

            return () => {
                canvasRef.current?.removeEventListener('mousedown', handleClick);
            };
          }

      },[canvasRef]);

    return(
        <Container leftSpawn={birbLocation.left} topSpawn={birbLocation.top}>
            {flavorText ?<FlavorPopup text={flavorText} left={birbLocation.left} top={birbLocation.top}/>:null}
            <Quotidian src={birb}/>    
        </Container>
 )

}

