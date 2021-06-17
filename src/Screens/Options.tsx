import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent, MENU_OPACITY, setOpacity} from "./Styles";
import { Checkbox } from "reakit/Checkbox";
import { useState } from "react";
import { LoadingScreen } from "./Loading";
import { OPTIONS } from "../Utils/constants";

interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

export const  OptionsScreen = (props: StatusProps)=> {

    const observer = props.player.observer;
    const [checked, setChecked] = useState(false);
    const [opacityValue, setOpacityValue] = useState(55);

    const toggle = () => {
        setChecked(!checked);
    }

    const submit =()=>{
        setOpacity(opacityValue /100);
        props.loadScreen(OPTIONS);
        (window as any).haxMode = checked;
    }
    

    return (
        
    <StatusBlock>
            { props.player.class_name.chosen_name === "Waste"?
                <StatusRow>
                    <StatusHeader>Hax Mode:</StatusHeader>
                    <StatusContent>
                    <Checkbox checked={checked} onChange={toggle} />

                        </StatusContent>
                </StatusRow>:null

            }
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
                <StatusHeader>TODO:</StatusHeader>
                <StatusContent>
                    all the things the styles lets you config including font size and colors
                </StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>TODO:</StatusHeader>
                <StatusContent>
                   <button onClick={submit}>Submit</button>
                </StatusContent>
            </StatusRow>

  </StatusBlock>);
  }