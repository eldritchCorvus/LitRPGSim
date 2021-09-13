
import { LinkifyWordsComponent } from "../WordAsLinkComponent";


interface ChatProps {
    callback: Function;
    chatLine: ChatLine;
    displayInfo: boolean; //were you the last person to speak?
}



export const ChatLineComponent = (props: ChatProps) => {
    const padding = props.displayInfo ? 0 : 33;




    return (
        <div className="chatLine">
            {props.displayInfo ? (<hr />) : null}
            {props.displayInfo ? (<img src={props.chatLine.icon_src} width="33" height="33" className="clip-circle" />) : null}
            <div className="chatLineHolder">
                <div>
                    {props.displayInfo ? (<div className="chatLineText" style={{ color: props.chatLine.color }}>{props.chatLine.username}</div>) : null}
                    <LinkifyWordsComponent text={props.chatLine.text} target_word="you" callback={props.callback} className="chatLineText" style={{ paddingLeft: padding }}></LinkifyWordsComponent>
                </div>
            </div>
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