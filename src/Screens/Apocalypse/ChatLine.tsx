import { Fragment, useEffect, useState } from "react";
import { domWordMeaningFuckery } from "../../Utils/StringUtils";
import { LinkifyWordsComponent } from "../WordAsLinkComponent";
import { Dialog, DialogDisclosure, useDialogState } from 'reakit';
import { Popup, PopupTitle, PopupContent } from "../../Modules/ObserverBot/AchivementPopup";
import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";

interface ChatProps {
    callback: Function;
    chatLine: ChatLine;
    displayInfo: boolean; //were you the last person to speak?
}



export const ChatLineComponent = (props: ChatProps) => {
    const padding = props.displayInfo ? 0 : 33;
    const [clicks, setClicks] = useState(0);
    const dialog = useDialogState();

    const processClick = () => {
        if(clicks === 0){
            props.callback();
        }
        setClicks(clicks + 1);
        for (let i = 0; i < 8; i++) {
            domWordMeaningFuckery();
        }
    }

    useEffect(()=>{
        if(clicks >=9){
            console.log("JR NOTE: apocalypse time", clicks);
            dialog.setVisible(true);
        }
    },[clicks]);

    return (
        <div className="chatLine">
            {props.displayInfo ? (<hr />) : null}
            {props.displayInfo ? (<img src={props.chatLine.icon_src} width="33" height="33" className="clip-circle" />) : null}
            <div className="chatLineHolder">
                <div>
                    {props.displayInfo ? (<div className="chatLineText" style={{ color: props.chatLine.color }}>{props.chatLine.username}</div>) : null}
                    <LinkifyWordsComponent text={props.chatLine.text} target_word="you" callback={processClick} className="chatLineText" style={{ paddingLeft: padding }}></LinkifyWordsComponent>

                </div>
            </div>
            <DialogDisclosure style={{ display: "none" }}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
            <Dialog onClick={() => { window.location.href = `?seed=${getRandomNumberBetween(0, 33333333)}&apocalypse=${(window as any).chaos?"chaos":"order"}` }} {...dialog} tabIndex={0} aria-label="death" style={{ border: "none", outline: "none", position: "fixed", top: "35%", left: "25%", width: "600px" }}>
            <Popup>
              <PopupTitle>You have sucessfully ended the Old World!</PopupTitle>
              <PopupContent>Finally the {`${(window as any).chaos?"chaos":"order"}`} of the old world can be washed away! Don't say we didn't warn you!</PopupContent>
            </Popup>
          </Dialog>
        </div>
    )
}

export class ChatLine {
    username: string;
    icon_src: string;
    text: string;
    color: string;
    constructor(username: string, icon_src: string, color: string, text: string) {
        this.username = username;
        this.icon_src = icon_src;
        this.text = text;
        this.color = color;
    }

}