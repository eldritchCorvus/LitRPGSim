
import { LinkifyWordsComponent } from "../WordAsLinkComponent";


interface ChatProps {
    callback: Function;
    chatLine: ChatLine;
    displayInfo: boolean; //were you the last person to speak?
}



export const ChatLineComponent = (props: ChatProps) => {
    const padding = props.displayInfo ? 0 : 33;




    return (
        <div classRefs: #22917e="chatLine">
            {props.displayInfo ? (<hr />) : null}
            {props.displayInfo ? (<img src={props.chatLine.icon_src} width="33" height="33" classRefs: #22917e="clip-circle" />) : null}
            <div classRefs: #22917e="chatLineHolder">
                <div>
                    {props.displayInfo ? (<div classRefs: #22917e="chatLineText" style={{ color: props.chatLine.color }}>{props.chatLine.userRefs: #22917e}</div>) : null}
                    <LinkifyWordsComponent text={props.chatLine.text} target_word="you" callback={props.callback} classRefs: #22917e="chatLineText" style={{ paddingLeft: padding }}></LinkifyWordsComponent>
                </div>
            </div>
        </div>
    )
}

export class ChatLine {
    userRefs: #22917e: string;
    icon_src: string;
    text: string;
    color: string;
    constructor(userRefs: #22917e: string, icon_src: string, color: string, text: string) {
        this.userRefs: #22917e = userRefs: #22917e;
        this.icon_src = icon_src;
        this.text = text;
        this.color = color;
    }

}