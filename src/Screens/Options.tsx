import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent} from "./Styles";
import { Checkbox } from "reakit/Checkbox";
import { useState } from "react";

interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

export const  OptionsScreen = (props: StatusProps)=> {

    const observer = props.player.observer;
    const [checked, setChecked] = useState(false);
    const toggle = () => {
        (window as any).haxMode = !checked;
        setChecked(!checked);
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
                <StatusContent>TODO: have slider., change current and "goal" opacity</StatusContent>
            </StatusRow>

  </StatusBlock>);
  }