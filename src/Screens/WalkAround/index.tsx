import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes, Theme } from '../../Modules/Theme';
import { BUGS, DECAY, FEELING, LOVE, SMELL, SOUND, TASTE, SPYING, LONELY, OCEAN, TECHNOLOGY, BURIED, FLESH, SCIENCE, FREEDOM } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';
import help_icon from './../..//images/Walkabout/icons8-chat-64.png';
import x_icon from './../..//images/Walkabout/icons8-x-50.png';

import { HelpChatBox } from './Chat/HelpChatBox';
import { playHelpDeskMusic, playAmbientMazeMusicMadness, doorEffect } from '../..';
import SeededRandom from '../../Utils/SeededRandom';
import FlavorPopup from './FlavorPopup';
import { getParameterByRefs: #22917e } from '../../Utils/URLUtils';
import { RenderedItem } from './canvas_shit';
import { removeItemOnce } from '../../Utils/ArrayUtils';
import { addStringToArrayWithKey, isStringInArrayWithKey, removeStringFromArrayWithKey } from '../../Utils/LocalStorageUtils';
import { Wanderer } from './Wanderer';
import { GuestBook } from "./GuestBook";
import { Quotidian } from "./Quotidian";
import { shuffle } from "../../Utils/NonSeededRandUtils";
import { CloserChatBox } from "./Chat/CloserChatBox";

//a memory can NOT be in both places at once.
export const MEMORY_KEY = "WANDERER_MEMORY";
export const QUOTIDIAN_KEY = "QUOTIDIAN_HOARD";


export const WalkAround = () => {

    const HelpIcon = styled.button`
    position: fixed;
    top: 15px;
    right: 15px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    border-radius: 25px;
    font-size: 28px;
    line-height: 33px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
`

const GuestBookButton = styled.button`
    position: fixed;
    bottom: 15px;
    right: 15px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    border-radius: 25px;
    font-size: 28px;
    line-height: 33px;
    padding-left: 20px;
    padding-right: 20px;
    cursor: pointer;
`

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
        width: 500px;
        height: 500px;
    `;

    const IconImage = styled.img`
    height: 33px;
    width: 33px;
    `


    //number of themes/2 is how many doors to have.
    const url_themes = getParameterByRefs: #22917e("themes", null);
    const url_seed = getParameterByRefs: #22917e("seed", null);
    const [themeKeys, setThemeKeys] = useState<string[]>(url_themes ? url_themes.split(",") : [all_themes[BUGS].key, all_themes[DECAY].key, all_themes[LOVE].key]);
    const [seededRandom] = useState(new SeededRandom(url_seed ? parseInt(url_seed, 10) : 216));
    const [flavorText, setFlavorText] = useState<string | undefined>()
    const [chatHelp, setChatHelp] = useState(false);
    const [closerHelp, setCloserHelp] = useState(false);

     const validKeys = ()=>{
        for(let themeKey of themeKeys){
            if(!Object.keys(all_themes).includes(themeKey)){
                return false;
            }
        }
        return true;
    }


    //room needs to tell me what items it found.
    const itemsRef = useRef<RenderedItem[]>([]);
    //an array of theme keys used to populate quotidians
    const quotidiansRef = useRef<string[][]>([]);
    const wandaTakeMemoryRef = useRef<Function>();

    /*
        NOTE:

        seeded random here should be based on current 'global' seed plus whether you went north, south or east
        
        new rooms should have all the same rooms as the previous but
         remove one theme and replace it with another

        this creates "neighborhoods" of aesthetics, i'm betting
    */

    const childRoomThemes = (rand: SeededRandom) => {
        const roll = seededRandom.nextDouble();
        if (roll > 0.6) {
            //add a theme, but don't go over 6
            if (themeKeys.length < 6) {
                return [...themeKeys, rand.pickFrom(Object.values(all_themes)).key];

            } else {
                return [...themeKeys.slice(1), rand.pickFrom(Object.values(all_themes)).key];
            }

        } else if (roll > 0.3) {
            //remove a theme, but don't go under one
            if (themeKeys.length > 1) {
                return [...themeKeys.slice(1)];

            } else {
                return [...themeKeys.slice(1), rand.pickFrom(Object.values(all_themes)).key];
            }
        } else {
            //same amount just one different
            return [...themeKeys.slice(1), rand.pickFrom(Object.values(all_themes)).key];
        }
    }

    useEffect(() => {
        const flavorChance = 0.2;
        if (seededRandom.nextDouble() < flavorChance) {
            const chosen_theme = all_themes[seededRandom.pickFrom(themeKeys)];
            const senses = [SMELL, SOUND, SMELL, SOUND, SMELL, SOUND, FEELING, FEELING, FEELING, FEELING, TASTE];
            const sense = seededRandom.pickFrom(senses);
            let phrase = "";
            const input = chosen_theme.pickPossibilityFor(seededRandom, sense);
            if (sense === SMELL) {
                const options = [`You breathe through your mouth to avoid the overwhelming smell of ${input}.`, `Why do you suddenly smell ${input}?`, `You catch a faint whiff of ${input}. `, `The smell of ${input} floods your nose.`];
                phrase = seededRandom.pickFrom(options);
            } else if (sense === SOUND) {
                const options = [`Your ears strain to pick up the sound of ${input}.`, `You can barely think against the cacophony of ${input}.`, `The sound of ${input} is in the air.`, `Your head is splitting with the sound of ${input}.`, `You hear the faint sound of ${input} in the distance.`];
                phrase = seededRandom.pickFrom(options);
            } else if (sense === FEELING) {
                const options = [`Everything feels like ${input}.`, `Your skin tingles with the sensation of ${input}.`];
                phrase = seededRandom.pickFrom(options);
            } else if (sense === TASTE) {
                const options = [`You can't get the taste of ${input} out of your mouth.`, `Oh god why can you taste ${input}?`];
                phrase = seededRandom.pickFrom(options);
            }
            setFlavorText(phrase);
        }
    }, [themeKeys])

    const numberDoors = useMemo(() => {
        return Math.ceil(themeKeys.length + 1) / 2;
    }, [themeKeys]);


    useEffect(() => {
        if (chatHelp) {
            playHelpDeskMusic();
        } else {
            playAmbientMazeMusicMadness();
        }
    }, [chatHelp])

    const makeChild = (tmpRand: SeededRandom) => {
        setFlavorText(undefined);
        setThemeKeys(childRoomThemes(tmpRand));
    }

    //spawn quotidians
    useEffect(()=>{
        //extra chance of it being 0
        const quotidians:string[][] = [];
        if(seededRandom.nextDouble()>0.25){
            const number  = seededRandom.getRandomNumberBetween(0,4);
            for(let i =0; i< number; i++){
                const tmp = shuffle(themeKeys);
                quotidians.push(tmp.slice(0,2) as string[]);
            }
        }
        quotidiansRef.current = quotidians;
    },[themeKeys]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const baseCanvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(chatHelp === true){
            console.log("JR NOTE: setting timeout");
            const deployTheCloser = ()=>{
                console.log("JR NOTE: deploying the closer");
                setCloserHelp(true);
            }
            const timeoutId = setTimeout(deployTheCloser, 10*1000*60);
            return () => {
              clearTimeout(timeoutId);
            };
        }

      },[chatHelp]);

    //what's this? have I found a Waste?
    if(!validKeys()){
        return(
            <GuestBook />
        )
    }

    return (
        <Fragment>
            <RoomContainer>
                <Room canvasRef={canvasRef}  bgCanvasRef={bgCanvasRef} baseCanvasRef={baseCanvasRef} itemsRef={itemsRef} themeKeys={themeKeys} numberDoors={numberDoors} seed={seededRandom.getRandomNumberBetween(0,8888888888)} />
                {flavorText ? <FlavorPopup text={flavorText} left={0} top={0} /> : null}
                {quotidiansRef.current?.map((qq,index)=> <Quotidian key={`birb${index}`} themeKeys={qq} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>)}
                <Wanderer wandaTakeMemoryRef={wandaTakeMemoryRef} canvasRef={canvasRef} numberDoors={numberDoors} itemsRef={itemsRef} seededRandom={seededRandom} makeChild={makeChild}></Wanderer>
            </RoomContainer>
            <div>TODO:

                Five Minute TODO:
                *the next thing i need to do is if i detect "TheCloser" in a flavor text, to open up a popup with the text from the .txt file and playing the audio from the .mp3
                * special flavor text is trigger for loading up specific audio file + text file + animation of vent opening
                * pick a random file UNLESS you are in the coffin room
                


                HIgh Level
                *chat window for the Intern to keep texting (about the wanderer's obsession, about their new job (but only towards the end, when the wanderer isnt responding anymore))
                * tape recorders in vents (deploying text content and audio content,playSecretCloser)
                *coffin spawns when memories = 0, or  AFTER closing out the closers menu you get the option to surrender to the crows.
                * oh god i just realized the birbs could in theory eat the coffin. if coffin is true keep spawning it in new rooms till you get in
                *final tape recorder with mystery next to coffin, others are random
                * you go in the coffin to remember your past (geocities) and journey to your future
                * before and after coffin content (coffin at zero , before is geocities, after is newspaper articles and blogs)
                * styled spiral;
                * room effects
                *donut in a corn outfit  
                * letter to the flower girl from weaver
                * spawn with at least one memory
                * are birbs attracted to BACKGROUND OBJECTS they cannot eat (this is a problem)
                *support phone resolutions
                

                Other MINUTE TODO.
                <li>add objects</li>
                <li>shitty geocities parody website about unraveling the identity of the Eye Killer, Eyedol, people vanishing. make sure to link to google if you mention using it</li>
                <li>post coffin trial of killer plus live blogging of a tgifradys</li>
                <li>killer in vents</li>
                *turns out if you switch black vs white for Truth rapidly it seems to be spiralling. (herald discovered)
                * canon way to get to apocalypse plz
                <li>429044 is important number</li>
                <li>20h:14m:36s on the stopwatch</li>
                <li>#quotidians at a time tie to things you can put into helpdesk, one word per room max</li>
                <li>jr in attic, but its a lobster. this is never explained.</li>
                <li>tweak item placement alg (bookshelves are good example to show how current alg has layering)</li>
                <li>warn player if the ai eats a memory you have in addition to the item, various ai factions that eats novel items and fight each other (shouts new, moves towards it, else wanders). PERMANENT for each item, store flavor text in local storage</li>
                <li>spawn wall and floor vents rarely, with text</li>
                <li>spawn hydration stations</li>
                <li>spawn tape players (secret music)</li>
                <li>add audio logs to secret music</li>
                <li>pick a  effect for the room rarely (tint for many of them (red for fire, blue for ocean for example), completely opaque black for dark and obfuscations, spiral has weirdness, ocean and lonely has fog, stranger, dark etc, corruption has bugs overlaid)</li>
                <li>secret hax coffin to the left,endless dream, credits, apocalyse</li>
                <li>post coffin the ai brings all the items its eaten and gives it to you, link to infotoken hoard with memories, plus friendship with [redacted]</li>


                <li>their ai responds to words in the flavor text (its not just for you) (drawn to some (you dont have yet), repulsed by others (you do have yet)? can destroy objects?) (the forever present is corrupted)</li>
                <li>the ai eats items if they encounter it and you haven't yet</li>
                <li>endless dream inside the coffin</li>
                <li>leads to infinite spiralling help desk that leverages attic code, plot is Wanda trying to accuse Eyedol of having a serial killer in their staff</li>
                <li>after ten minutes you reach the closer who actually listens to what you say, is in a new chat window entirely and wants to know what they need to do to make you go away.</li>
                <li>spawnable tape players (add more secret music, including things that are just audio logs from the closer)</li>
                infinite train zampaniosim branch (rooms in a linear pile, can go endlessly right, but can go back too, that zooming darkness effect) (it mirrors Truth the way this mirros ThisIsAgame)
                <li>add glitch effect to WalkObject themes.</li>
                <li>rooms can rarely spawn music boxes or SCRIBBLED NOTEBOOKS which engage with random thematic content</li>
                <li>find your coffin and go down and down and down</li>
            </div>
            <HelpIcon onClick={() => setChatHelp(!chatHelp)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}>Help</div>{chatHelp ? <IconImage src={x_icon}></IconImage> : <IconImage src={help_icon}></IconImage>}</HelpIcon>
            {chatHelp ? <HelpChatBox /> : null}
            {closerHelp ? <CloserChatBox close={()=>{setCloserHelp(false)}} /> : null}

        </Fragment>

    )
}