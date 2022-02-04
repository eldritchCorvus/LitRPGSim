import styled from "@emotion/styled";
import { Fragment, MutableRefObject, RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { pointWithinBoundingBox, redrawForeground, RenderedItem, withinX } from "./canvas_shit";
import real_eye from './../../images/wanda.png';
import { doorEffect, loadCloserText, playVoice } from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { MEMORY_KEY, QUOTIDIAN_KEY } from ".";
import { isStringInArrayWithKey, addStringToArrayWithKey, removeStringFromArrayWithKey, valueAsArray } from "../../Utils/LocalStorageUtils";
import { SPYING, KNOWING, ADDICTION, TECHNOLOGY, LONELY, MAGIC, floor_foregrounds, wall_foregrounds } from "../../Modules/ThemeStorage";
import { removeItemOnce } from "../../Utils/ArrayUtils";


interface WandererProps {
    itemsRef: MutableRefObject<RenderedItem[]>;
    canvasRef: RefObject<HTMLCanvasElement>;
    wandaTakeMemoryRef: MutableRefObject<Function | undefined>;
    seededRandom: SeededRandom;
    makeChild: Function;
    numberDoors: number;
    setDisplayCoffinOption: Function;
    setWandererLoc: Function;
}

export const Popup = styled.div`
    border: 2px solid black;
    z-index: 5;
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
`
interface TapeProps {
    inverted: boolean;
}
export const TapePopup = styled.div`
    border: 2px solid black;
    z-index: 5;
    border-radius: 13px;
    padding: 5px;
    position: absolute;
    top: 0%;
    left: 0%;
    color: ${(props: TapeProps) => props.inverted?"#f8fafa":"#b72a21" };
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    padding-right: 13px;
    width: 470px;
    margin: 10px;
    background: ${(props: TapeProps) => props.inverted?"#b72a21":"#f8fafa" };
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
`

const RoomCanvas = styled.canvas`
    position: absolue;
  `
export const Wanderer: React.FC<WandererProps> = ({setWandererLoc,setDisplayCoffinOption, wandaTakeMemoryRef, itemsRef, canvasRef, seededRandom, makeChild, numberDoors }) => {

    const playerWidth = 55;
    const playerHeight = 37;

    interface PlayerProps {
        leftSpawn: number;
        topSpawn: number;
    }


    const Player = styled.img`
        position: absolute;
        left:0px;
        top: 0px;
        pointer-events:none;
        z-index: 10;
    `
    const Score = styled.div`
        position: absolute;
        top: 25px;
        right: 25px;
        z-index: 100;
        color: white;
        font-weight: boldest;
    `
    const Container = styled.div`
        position: absolute;
        left: ${(props: PlayerProps) => props.leftSpawn}px;
        top: ${(props: PlayerProps) => props.topSpawn}px;
    `

    const [spawnPoint, setSpawnPoint] = useState({ left: 250, top: 450 });
    const [flavorText, setFlavorText] = useState<string | undefined>();
    const [tapeFlavorText, setTapeFlavorText] = useState<string | undefined>();

    const [memoryCount, setMemoryCount] = useState(valueAsArray(MEMORY_KEY).length);
    const ventPlayer = useRef<HTMLAudioElement>();

    const [playerLocation, setPlayerLocation] = useState(spawnPoint);

    //what classpect are they, i wonder???, what are their interests?
    const themeKeys = [MAGIC, KNOWING, KNOWING, SPYING, TECHNOLOGY, ADDICTION];

    const totalPossibleMemories = useMemo(() => {
        let ret: string[] = [];
        /*
            in theme storage, grab floor_foregrounds and wall_foregrounds
            grab all flavor text for each key, iff unique
            ( I don't EXPECT to see )
            return count.
        */
        const floor_keys = Object.keys(floor_foregrounds);
        const wall_keys = Object.keys(wall_foregrounds);
        for (let key of floor_keys) {
            for (let item of floor_foregrounds[key]) {
                if (!ret.includes(item.desc)) {
                    ret.push(item.desc);
                }
            }
        }

        for (let key of wall_keys) {
            for (let item of wall_foregrounds[key]) {
                if (!ret.includes(item.desc)) {
                    ret.push(item.desc);
                }
            }
        }

        return ret.length;
    }, []);

    useEffect(() => {
        setPlayerLocation({ top: spawnPoint.top, left: spawnPoint.left })
    }, [spawnPoint])

    const goNorth = () => {
        //put you to the south
        setSpawnPoint({ left: 250, top: 475 - 50 });
        const tmpRand = new SeededRandom(0 + seededRandom.getRandomNumberBetween(216, 216216216216216));
        //spawn a new room
        makeChild(tmpRand);
    }

    const goSouth = () => {
        //put you to the south

        setSpawnPoint({ left: 250, top: 105 + 50 });
        const tmpRand = new SeededRandom(1 + seededRandom.getRandomNumberBetween(216, 216216216216216));
        //spawn a new room
        makeChild(tmpRand);
    }

    const goEast = () => {

        //put you to the south
        setSpawnPoint({ left: 25 + 50, top: 250 });
        const tmpRand = new SeededRandom(2 + seededRandom.getRandomNumberBetween(216, 216216216216216));
        //spawn a new room
        makeChild(tmpRand);
    }


    const isMemoryKnowByWanderer = (memory: string) => {
        return isStringInArrayWithKey(MEMORY_KEY, memory);
    }

    const isMemorySacrificedByWanderer = (memory: string) => {
        return isStringInArrayWithKey(QUOTIDIAN_KEY, memory);
    }

    const addMemoryToWanderer = (memory: string) => {
        if (!isMemoryKnowByWanderer(memory) && !isMemorySacrificedByWanderer(memory)) {
            addStringToArrayWithKey(MEMORY_KEY, memory);
            setMemoryCount(valueAsArray(MEMORY_KEY).length);
        }
    }

    const takeMemoryFromWanderer = useCallback((memory: string) => {
        if (!isMemorySacrificedByWanderer(memory)) {
            addStringToArrayWithKey(QUOTIDIAN_KEY, memory);
            removeStringFromArrayWithKey(MEMORY_KEY, memory);
            setMemoryCount(valueAsArray(MEMORY_KEY).length);
        }
    }, []);

    useEffect(() => {
        wandaTakeMemoryRef.current = takeMemoryFromWanderer;
    }, [takeMemoryFromWanderer]);

    //do you think she knew she was being recorded???
    const processTape = (location: string) => {
        //please don't try to play if you're already playing, in an endless echoing chorus of fear
        if(!ventPlayer.current || ventPlayer.current.paused){
            const text = loadCloserText(location);
            setTapeFlavorText(`You find a tape player in the vent!!!<br><br><B>Click To Close</b>: \n${text}`);
            ventPlayer.current = playVoice(`${location}.mp3`);
        }
    }

    const processCoffin = ()=>{
        setDisplayCoffinOption(true);
    }


    //unlike doors, items are not in set locations, check the items ref
    const checkForItems = (top: number, left: number) => {
        //TODO: JR NOTE: im worried setting the flavor text will rerender this which will fuck up my room
        //might need to pull flavor text down. somehow...
        //or is that a fever dream from back when i got stuck in a loop trying to move rooms without the game rerendering the room
        const wanderer_radius = 25;

        for (let item of itemsRef.current) {
            const nearAccessibleItem = pointWithinBoundingBox(left, top, item.x, item.y, item.width, item.height);
            const nearWallItem = top < 140 && withinX(left, item.x, item.width);
            if ((item.layer === 1 || item.layer === -1) && item.name !== "Wanderer" && (nearAccessibleItem || nearWallItem)) {
                if (item.flavorText?.includes("TheCloser")) {
                    return processTape(item.flavorText);
                }else if(item.flavorText?.includes("TheWanderersFinalRestingPlace")){
                   return processCoffin();
                }
                if (item.layer === 1) { //don't remember the birbs plz
                    addMemoryToWanderer(item.flavorText);
                }
                //JR NOTE: setting current ref doesn't necessarily make flavor text dialogue notice. 
                setFlavorText(item.flavorText);
                //JR NOTE: TODO might want to NOT return if its an item in neither memory array.
                return;
            }
        }
    }

    //where is the player? are they near a door?
    const checkForDoor = (top: number, left: number) => {
        //TODO check how many doors actually exist
        const SOUTH = [250, 475, 48, 48];
        const NORTH = [250, 105, 48, 91]; //x,y,width,height
        const EAST = [475, 250, 48, 48];

        const wanderer_radius = 25;
        let nearDoor = false;

        //there will ALWAYS be a door to the south at the very minimum
        if (pointWithinBoundingBox(left, top, SOUTH[0], SOUTH[1], SOUTH[2], SOUTH[3])) {
            goSouth();
            nearDoor = true;
        }

        if (numberDoors > 1 && pointWithinBoundingBox(left, top, NORTH[0], NORTH[1], NORTH[2], NORTH[3])) {
            nearDoor = true;
            goNorth();
        }

        if (numberDoors > 2 && pointWithinBoundingBox(left, top, EAST[0], EAST[1], EAST[2], EAST[3])) {
            goEast();
            nearDoor = true;
        }


        if (nearDoor) {
            setTapeFlavorText(undefined);
            ventPlayer.current?.pause();
            doorEffect();
        }

    }


    const findMeInItemRef = () => {
        if (itemsRef.current) {
            return itemsRef.current.find((item) => item.name === "Wanderer");
        }
        return undefined;

    }

    useEffect(() => {
        //two cases: one, i am not currently in the itemsref and i should be
        //or two, i am in the items ref and i need to tell it my current location.
        const me = findMeInItemRef();
        if (me) {
            let tmp = itemsRef.current;
            tmp = removeItemOnce(tmp, me);
            tmp.push({ src: "gif_do_not_render", layer: -1, x: playerLocation.left, y: playerLocation.top, width: playerWidth, height: playerHeight, flavorText: me.flavorText, themeKeys: themeKeys, name: "Wanderer" })
            itemsRef.current = tmp;
        } else {
            const tmp = [...itemsRef.current, { src: "gif_do_not_render", layer: -1, x: playerLocation.left, y: playerLocation.top, width: playerWidth, height: playerHeight, flavorText: "The Wanderer.", themeKeys: themeKeys, name: "Wanderer" }]
            itemsRef.current = tmp;
        }
        setWandererLoc({x:`${playerLocation.left}px`,y:`${playerLocation.top}px`})

    }, [playerLocation])


    useEffect(() => {
        if (flavorText) {
            const timer = setTimeout(() => {
                setFlavorText(undefined);
            }, 3000)

            return () => {
                clearTimeout(timer);
            };
        }

    }, [flavorText])

    useEffect(() => {
        if (!tapeFlavorText && ventPlayer.current) {
            ventPlayer.current.pause();
        }

    }, [tapeFlavorText, ventPlayer])

    const processWalk = (key: string) => {
        const minTop = 500 - 350 - 30;
        const maxTop = 500 - 30;
        const maxLeft = 455;
        const minLeft = 15;

        if (playerLocation) {
            let prevTop = playerLocation.top;

            let prevLeft = playerLocation.left;

            if ((key === "s" || key === "ArrowDown") && prevTop < maxTop) {
                prevTop += 10;
            }else if ((key === "w" || key === "ArrowUp") && prevTop > minTop) {

                prevTop += -10
            }else if ((key === "a" || key === "ArrowLeft") && prevLeft > minLeft) {

                prevLeft += -10;
            }else if ((key === "d" || key === "ArrowRight") && prevLeft < maxLeft) {

                prevLeft += 10;
            }else{
                //no valid button was pressed, ignore this.
                return;
            }
            setPlayerLocation({ top: prevTop, left: prevLeft });
            const centerX = prevLeft + playerWidth / 2;
            const centerY = prevTop + playerHeight / 2;

            checkForDoor(centerY, centerX);
            checkForItems(centerY, centerX);
        }
    }

    const handleUserKeyPress = (event: KeyboardEvent) => {
        processWalk(event.key);
    }


    const handleClick = (event: MouseEvent) => {
        //todo
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            checkForDoor(y, x);
            checkForItems(y, x);
        }
    }


    //past jr note: you'll THINK this needs an empty dependency array.  somehow this makes it so the wanderer can only move in a tiny box. not going to investiate this rn. don't worry about it.
    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);

        return () => {
            window.removeEventListener('keydown', handleUserKeyPress);
        };
    });

    //because its on the canvas it should be relative to it.
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.addEventListener('mousedown', handleClick);

            return () => {
                canvasRef.current?.removeEventListener('mousedown', handleClick);
            };
        }

    }, [canvasRef]);

    const ponderFlavorText = (text: string) => {
        if (isMemorySacrificedByWanderer(text)) {
            return `You...THINK you remember: ${text}.`;
        }
        return text;
    }

    return (
        <Fragment>
            <Score># of Memories: {memoryCount} out of {totalPossibleMemories}</Score>
            {tapeFlavorText ? <TapePopup inverted={tapeFlavorText.includes("Dear diary")} onClick={() => { setTapeFlavorText(undefined) }} dangerouslySetInnerHTML={{__html:tapeFlavorText}}></TapePopup> : null}
            <Container leftSpawn={playerLocation.left} topSpawn={playerLocation.top}>
                {flavorText ? <Popup>{ponderFlavorText(flavorText)}</Popup> : null}
                <Player src={real_eye} id="player" />
            </Container>
        </Fragment>
    )

}

