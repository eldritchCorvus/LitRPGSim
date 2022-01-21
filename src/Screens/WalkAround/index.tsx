/** @jsxImportSource @emotion/react */
import { Fragment, useEffect, useMemo, useRef, useState } from "react"
import { Room } from './Room';
import { all_themes, keysToThemes, Theme } from '../../Modules/Theme';
import { BUGS, DECAY, FEELING, LOVE, SMELL, SOUND, TASTE, SPYING, LONELY, OCEAN, TECHNOLOGY, BURIED, FLESH, SCIENCE, FREEDOM, ADDICTION, KNOWING, MAGIC, DARKNESS, LIGHT, OBFUSCATION, FILTERS, TWISTING, filter_possibilities } from '../../Modules/ThemeStorage';
import styled from '@emotion/styled';
import SeededRandom from '../../Utils/SeededRandom';
import FlavorPopup from './FlavorPopup';
import { getParameterByName } from '../../Utils/URLUtils';
import { RenderedItem } from './canvas_shit';
import { Wanderer } from './Wanderer';
import { GuestBook } from "./GuestBook";
import { Quotidian } from "./Quotidian";
import { pickFrom, shuffle } from "../../Utils/NonSeededRandUtils";
import { HelpDesk } from "./Chat/HelpDesk";
import { TBDChat } from "./Chat/TBD";
import ChoicePopup from "./ChoicePopup";
import { fuckUpBG } from "../../CanvasFuckery/fuckery";
import { CeoChats } from "./Chat/HelpDesk/CEOChats";
import { css, jsx } from "@emotion/react";

//a memory can NOT be in both places at once.
export const MEMORY_KEY = "WANDERER_MEMORY";
export const QUOTIDIAN_KEY = "QUOTIDIAN_HOARD";


export const WalkAround = () => {


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

    const DarkBG = styled(RoomContainer)`
        background-color: black;
        z-index: -1;
    `;

    const LightBG = styled(RoomContainer)`
    background-color: white;
    z-index: -1;
`;


    //warning, the post coffin uses the styled component still, so don't be surprised if editing this doenst edit htat
    const base_room_stylings = `padding: 10px;
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
  height: 500px;`



    //number of themes/2 is how many doors to have.
    const url_themes = getParameterByName("themes", null);
    const url_seed = getParameterByName("seed", null);
    const [themeKeys, setThemeKeys] = useState<string[]>(url_themes ? url_themes.split(",") : [all_themes[BUGS].key, all_themes[DECAY].key, all_themes[LOVE].key]);
    const [seededRandom] = useState(new SeededRandom(url_seed ? parseInt(url_seed, 10) : 216));
    const [flavorText, setFlavorText] = useState<string | undefined>()
    const [coffinTime, setCoffinTime] = useState(false);
    const [displayCoffinOption, setDisplayCoffinOption] = useState(false);
    const [trappedInCoffin, setTrappedInCoffin] = useState(false);
    const [roomStyle, setRoomStyle] = useState(base_room_stylings);
    const [wandererLoc, setWandererLoc] = useState({x:'250px',y:'450px'});


    useEffect(()=>{
        const picked_filters:string[] = [];
        const themes:Theme[] = keysToThemes(themeKeys);
        const amount = seededRandom.getRandomNumberBetween(0,3);
        for(let i = 0; i< amount; i++){
            const filter = seededRandom.pickFrom(themes).pickPossibilityFor(seededRandom,FILTERS);
            if(filter && !filter.includes("ERROR")){
                picked_filters.push(filter);
            }
        }
        filters.current = picked_filters;
    },[themeKeys])


    useEffect(() => {
        const dark_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  10%, rgba(0, 0, 0, 0.15) 25%);`;
        const light_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, white 0%,  50%, rgba(0, 0, 0, 0.15) 75%);`;
        const lonely_mask = `mask-image: radial-gradient(ellipse at ${wandererLoc.x} ${wandererLoc.y}, black 0%,  25%, rgba(0, 0, 0, 0.15) 50%);`;

            
        let mask = '';
        if (themeKeys.includes(DARKNESS)) {
            mask = dark_mask;
        } else if (themeKeys.includes(LIGHT)) {
            mask = light_mask
        } else if (themeKeys.includes(LONELY) || themeKeys.includes(OBFUSCATION)) {
            mask = lonely_mask;
        }

        let filter = ``;
        if(filters.current && filters.current.length){
            filter = 'filter: '
            for(let f of filters.current){
                filter += `${f} `;
            }
            if(themeKeys.includes(TWISTING)){
                const twisting_styles = [`hue-rotate(10deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(-5deg)`];
                filter += ` ${pickFrom(twisting_styles)}`;
            }
            filter += ";"
        }else if(themeKeys.includes(TWISTING)){
            filter = 'filter: '
            const twisting_styles = [`hue-rotate(-2deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`,`hue-rotate(5deg)`, `hue-rotate(5deg)`, `hue-rotate(-5deg)`];
            filter += pickFrom(twisting_styles);
            filter += ";"

        }
        const theme_style = `${mask}${base_room_stylings}${filter !== '' ?filter:''}`;
        setRoomStyle(theme_style);

    }, [themeKeys, wandererLoc])


    const validKeys = () => {
        for (let themeKey of themeKeys) {
            if (!Object.keys(all_themes).includes(themeKey)) {
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
    const filters = useRef<string[]>([]);

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




    const makeChild = (tmpRand: SeededRandom) => {
        setFlavorText(undefined);
        setThemeKeys(childRoomThemes(tmpRand));
    }

    //spawn quotidians
    useEffect(() => {
        //extra chance of it being 0
        if (!coffinTime) {
            const quotidians: string[][] = [];
            if (seededRandom.nextDouble() > 0.25) {
                const number = seededRandom.getRandomNumberBetween(0, 4);
                for (let i = 0; i < number; i++) {
                    const tmp = shuffle(themeKeys);
                    quotidians.push(tmp.slice(0, 2) as string[]);
                }
            }
            quotidiansRef.current = quotidians;
        }
    }, [themeKeys]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const baseCanvasRef = useRef<HTMLCanvasElement>(null);



    //what's this? have I found a Waste?
    if (!validKeys()) {
        return (
            <GuestBook />
        )
    }

    const beginingOfTheEnd = () => {
        console.log("JR NOTE: The Wanderer is no more. The End is Never The End.")
        setTrappedInCoffin(true)
        fuckUpBG();
        const body = document.querySelector("body");
        if (body) {
            body.style.background = "#000000";
        }
        var pageUrl = '?' + `seed=13&themes=${[MAGIC, KNOWING, KNOWING, SPYING, TECHNOLOGY, ADDICTION].join(',')}&apocalypse=canon`;
        window.history.pushState('', '', pageUrl);

    }



    return (
        <Fragment>
            {!trappedInCoffin ? (
                <Fragment>
                    <div css={css`${roomStyle}`}>
                        <Room coffinTime={coffinTime} canvasRef={canvasRef} bgCanvasRef={bgCanvasRef} baseCanvasRef={baseCanvasRef} itemsRef={itemsRef} themeKeys={themeKeys} numberDoors={numberDoors} seed={seededRandom.getRandomNumberBetween(0, 8888888888)} />
                        {flavorText ? <FlavorPopup text={flavorText} left={0} top={0} /> : null}
                        {displayCoffinOption ? <ChoicePopup yesFunction={() => beginingOfTheEnd()} noOption="I am NOT getting in a coffin." yesOption="I am ready. Show me the final story." text={
                            `You know if you lowered yourself into its smooth wooden confines and gently closed the lid, you and it would sink down and down and down for almost forever.
                    <br><Br>You know that even if the end could never be the end, there IS a bottom, and AT its bottom you could finally know enough at last. The coffin would sing you its story and you would be full.
                    `
                        } left={0} top={0} /> : null}

                        {quotidiansRef.current?.map((qq, index) => <Quotidian key={`birb${index}`} themeKeys={qq} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>)}
                        <Wanderer setWandererLoc={setWandererLoc} setDisplayCoffinOption={setDisplayCoffinOption} wandaTakeMemoryRef={wandaTakeMemoryRef} canvasRef={canvasRef} numberDoors={numberDoors} itemsRef={itemsRef} seededRandom={seededRandom} makeChild={makeChild}></Wanderer>
                    </div>
                    {themeKeys.includes(DARKNESS) ? <DarkBG /> : null}
                    {themeKeys.includes(LIGHT) ? <LightBG /> : null}

                </Fragment>)
                : null}
            {trappedInCoffin ? <RoomContainer>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
                <Quotidian trappedInCoffin={trappedInCoffin} themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>

                <Quotidian themeKeys={themeKeys} canvasRef={canvasRef} numberDoors={numberDoors} wandaTakeMemoryRef={wandaTakeMemoryRef} itemsRef={itemsRef} seededRandom={seededRandom}></Quotidian>
            </RoomContainer> : null}
            {trappedInCoffin ? <CeoChats /> : null}

            <TBDChat trappedInCoffin={trappedInCoffin} setCoffinTime={setCoffinTime} />
            <HelpDesk />

            <div style={{ display: "none" }}>TODO:

                Five Minute TODO:
                * https://farragofiction.com/%E1%9B%96%E1%9B%9F%E1%9B%92%E1%9A%BA%E1%9A%B1%E1%9A%A2 knucklessux
                * post coffin chats
                *post coffin spyware
                * you can get into the rabbit hole???

                <li>post coffin trial of killer plus live blogging of a tgifradys</li>

                *tiny version of this where going thru a door loads one of the arcs???
                (not react, just an image map???)
                code rot as art. you can always reach the rot


                HIgh Level
                *corporate spyware. "Currently Viewing Employee #22917's chat history"  You're the CEO looking at chat windows from the Interns perspective, with various partners (minimized unless new content but you can re-open them).  They can be messaged by, or send messages to The CEO, Wodin, The Closer, The CFO, Jepe Rilvia, Tom Peyote, The Manager, etc.
                * post coffin chat LOGS (not live) where the Intern's boss (both the CEO and the Closer) (closer is mostly trying to figure out why the CEO is giving the Intern special attention) keeps texting them to ask if they liked their fruit basket, if they liked the weird worm baby the Closer gave them, to complain about "that asshole snake" and how its hilarious his stupid spawn keep getting put into gift baskets, and to suggest he invest in this whole "cryptocurrency" tihng
                * sometimes the co owner texts the intern as well but it's just like "man kinda crazy how everyone is messaging you rn huh"
                *final tape recorder with mystery next to coffin, others are random
                * you go in the coffin to remember your past (geocities) and journey to your future
                * before and after coffin content (coffin at zero , before is geocities, after is newspaper articles and blogs)
                * styled spiral;
                * letter to the flower girl from weaver

                *support phone resolutions
                * record major secrets found in this path and the prev path, for use in JustTruth path. closer window. vent tapes. coffin.



                Other MINUTE TODO.
                <li>shitty geocities parody website about unraveling the identity of the Eye Killer, Eyedol, people vanishing. make sure to link to google if you mention using it</li>
                <li>killer in vents</li>
                *turns out if you switch black vs white for Truth rapidly it seems to be spiralling. (herald discovered)
                * canon way to get to apocalypse plz
                <li>429044 is important number</li>
                <li>20h:14m:36s on the stopwatch</li>
                <li>jr in attic, but its a lobster. this is never explained.</li>
                <li>tweak item placement alg (bookshelves are good example to show how current alg has layering)</li>
                <li>spawn hydration stations</li>
                <li>pick a  effect for the room rarely (tint for many of them (red for fire, blue for ocean for example), completely opaque black for dark and obfuscations, spiral has weirdness, ocean and lonely has fog, stranger, dark etc, corruption has bugs overlaid)</li>
                <li>secret hax coffin to the left,endless dream, credits, apocalyse</li>
                <li>post coffin the ai brings all the items its eaten and gives it to you, link to infotoken hoard with memories, plus friendship with [redacted]</li>


                <li>endless dream inside the coffin</li>
                <li>after ten minutes you reach the closer who actually listens to what you say, is in a new chat window entirely and wants to know what they need to do to make you go away.</li>
            </div>

        </Fragment>

    )
}