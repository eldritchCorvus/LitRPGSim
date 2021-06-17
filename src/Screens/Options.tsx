import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent} from "./Styles";
interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

export const  OptionsScreen = (props: StatusProps)=> {

    const observer = props.player.observer;

    return (
        
    <StatusBlock>
            { props.player.class_name.chosen_name === "Waste"?
                <StatusRow>
                    <StatusHeader>Hax Mode:</StatusHeader>
                    <StatusContent>TODO have a toggle button here.</StatusContent>
                </StatusRow>:null

            }
            <StatusRow>
                <StatusHeader>Menu Opacity:</StatusHeader>
                <StatusContent>TODO: have slider., change current and "goal" opacity</StatusContent>
            </StatusRow>

            <StatusRow>
                <StatusHeader>Hax Mode:</StatusHeader>
                <StatusContent>TODO: have slider., change current and "goal" opacity</StatusContent>
            </StatusRow>
  </StatusBlock>);
  }