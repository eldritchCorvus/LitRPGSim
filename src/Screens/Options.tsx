import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent, MENU_OPACITY, setOpacity, BGCOLOR, FONTCOLOR, FONTSIZE, BadlyHiddenStatusRow, setFontSize, setFontColor, setBGColor} from "./Styles";
import { Checkbox } from "reakit/Checkbox";
import React, { useState } from "react";
import { LoadingScreen } from "./Loading";
import { OPTIONS } from "../Utils/constants";

interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

//TODO waste/seer/mage classes get this screen
export const  OptionsScreen = (props: StatusProps)=> {

    const observer = props.player.observer;
    const [checked, setChecked] = useState(false);
    const [opacityValue, setOpacityValue] = useState(Math.floor(MENU_OPACITY*100));
    const [custsceneSpeed, setCutsceneSpeed] = useState(5);
    const [targetLock, setTargetLock] = useState(false);
    const [toggleShiftSprint, setToggleShiftSprint] = useState(false);

    const [bgColorValue, setBGColorValue] = useState(BGCOLOR);
    const [fontColorValue, setFontColorValue] = useState(FONTCOLOR);
    const [fontSizeValue, setFontSizeValue] = useState(FONTSIZE);



    const toggle = () => {
        setChecked(!checked);
    }

    const submit =()=>{
        setOpacity(opacityValue /100);
        setFontSize(fontSizeValue);
        setFontColor(fontColorValue);
        setBGColor(bgColorValue);
        props.loadScreen(OPTIONS);
        (window as any).haxMode = checked;
    }
    

    return (
        
    <StatusBlock>
            { props.player.class_name.chosen_name === "Waste"?
                <BadlyHiddenStatusRow>
                    <StatusHeader>Hax Mode:</StatusHeader>
                    <StatusContent>
                    <Checkbox checked={checked} onChange={toggle} />

                        </StatusContent>
                </BadlyHiddenStatusRow>:null

            }
            <StatusRow>
                    <StatusHeader>Toggle Shift To Sprint:</StatusHeader>
                    <StatusContent>
                    <Checkbox checked={toggleShiftSprint} onChange={()=>{setToggleShiftSprint(!toggleShiftSprint)}}  />

                        </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>AutoTarget Lock:</StatusHeader>
                <StatusContent>
                <Checkbox checked={targetLock} onChange={()=>{setTargetLock(!targetLock)}}  />

                    </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Cutscene Text Speed:</StatusHeader>
                <StatusContent>
                    <input type="range" min="1" max="10" value={`${custsceneSpeed}`} onChange={(event)=>{
                        const value = parseInt(event.target.value);
                        setCutsceneSpeed(value);
                    }} ></input>
                    {custsceneSpeed}
                </StatusContent>
            </StatusRow>
            
            <StatusRow>
                <StatusHeader>Menu Opacity:</StatusHeader>
                <StatusContent>
                    <input type="range" min="1" max="100" value={`${opacityValue}`} onChange={(event)=>{
                        const value = parseInt(event.target.value);
                        setOpacityValue(value);
                    }}></input>
                    {opacityValue}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Font Size:</StatusHeader>
                <StatusContent>
                    <input type="range" min="5" max="32" value={`${fontSizeValue}`} onChange={(event)=>{
                        const value = parseInt(event.target.value);
                        setFontSizeValue(value);
                    }}></input>
                    {fontSizeValue}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Font Color:</StatusHeader>
                <StatusContent>
                    <input type="color" value={`${fontColorValue}`} onChange={(event)=>{
                        const value =event.target.value;
                        setFontColorValue(value);
                    }}></input>
                    {fontColorValue}
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>BG Color:</StatusHeader>
                <StatusContent>
                    <input type="color" value={`${bgColorValue}`} onChange={(event)=>{
                        const value =event.target.value;
                        setBGColorValue(value);
                    }}></input>
                    {bgColorValue}
                </StatusContent>
            </StatusRow>


            <StatusRow>
                <StatusHeader></StatusHeader>
                <StatusContent>
                   <button onClick={submit}>Submit</button>
                </StatusContent>
            </StatusRow>

  </StatusBlock>);
  }