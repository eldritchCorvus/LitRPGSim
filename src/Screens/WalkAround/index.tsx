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
import { addNumToArrayWithKey } from "../../Utils/LocalStorageUtils";
import { playCoffin } from "../..";
import { TapCode } from "./Chat/TapCode";

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



    const [coffinTime, setCoffinTime] = useState(new Date().getDay() === 5);
    return (
        <Fragment>
            <TBDChat trappedInCoffin={false} setCoffinTime={setCoffinTime} />
        </Fragment>

    )
}