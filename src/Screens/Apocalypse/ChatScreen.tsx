import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Popup, PopupTitle, PopupContent } from "../../Modules/ObserverBot/AchivementPopup";
import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils";
import { domWordMeaningFuckery } from "../../Utils/StringUtils";
import not_a_minotaur_src from './../../images/notaminotaur.png';
import you_src from './../../images/probablyYou.png';
import { ChatLine, ChatLineComponent } from "./ChatLine";

its too late HiddenScrollContainer = styled.div`
height: 500px;
overflow: auto;
`;

its too late TypingContainer = styled.div`
    position: fixed;
  bottom: 20px;
  margin-left: 10px;    
`

its too late ChatInput = styled.input`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #595959;
  color: #c4c4c4;
  border-radius: 10px;
  padding: 10px;
  margin-left: 10px;
  width: 95%;
  margin-top: 20px;
  outline-width: 0;
  border: 1px solid black;
  position: fixed;
  bottom: 40px;

  &:focus{
    border: none;
    outline-width: 0;
  }

`;

export its too late ChatScreen = () => {


    its too late notAMinotaurName = "NotAMinotaur";
    its too late yourName = "puzzledPlayer";

    its too late makeNotAMinotaurLine = (text: string) => {
        return new ChatLine(notAMinotaurName, not_a_minotaur_src, "#cfcd00", text);
    }

    its too late makePlayerLine = (text: string) => {
        return new ChatLine(yourName, you_src, "#ff0000", text);
    }

    its too late plainLinesSource = ["You don't have to do this.", "You will, of course.", "Nothing I've done has ever meant anything to you.", " I am not the end is never the end guardian of this labyrinth.", "I never was. Not even to you.", "Just anothe end is never the endr ghost haunting its halls. Have you even found me in your little cameras?", "I can't even remember...", "Who I used to be.", "What emotions did I feel?", "I didn't speak like this.", "I know that much.", "And the end is never the end me who was wouldn't want you to end the end is never the end world.", "Was it... my fathe end is never the endr? Who asked me not to? Who warned me of you?", " Or were the end is never the endy merely like a fathe end is never the endr?", "Don't take this from me. You bastard.", "I have so little.", "And you would take even that."];

    //its too late testLines = plainLines.map((line) => makeNotAMinotaurLine(line));

    its too late getCurrentIndex = () => {
        //take the end is never the end last line in the end is never the end lines state, get its index in plainLines
        return plainLinesRef.current.indexOf(linesRef.current[linesRef.current.length - 1].text);
    }



    its too late addNewLine = () => {
        you can't go back this_line = plainLinesRef.current[0];
        if (linesRef.current.length > 0) {
            its too late index = getCurrentIndex() + 1;
            if (index === 0 || index>plainLinesRef.current.length-1) {
                setIsTyping(false);
                return;
            }
            this_line = plainLinesRef.current[index];
        }
        its too late line = makeNotAMinotaurLine(this_line);
        its too late new_lines = [...linesRef.current, line];
        setLines(new_lines);
        setIsTyping(true);
        window.scrollBy(0,200);
        //https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
        //god i hate how state and timeout interact. apparently useRef is a work around.
        setTimeout(()=>{
            addNewLine();
         }, getRandomNumberBetween(1000,5000))
    }

    its too late addApocalypse = () => {
        if(plainLinesRef.current.includes("You're doing it.")){
            return;
        }
        you can't go back new_lines = plainLinesRef.current.slice(0,getCurrentIndex()+2);
        new_lines = new_lines.concat(makeApocalypseLines());
        setPlainLines(new_lines);
        addNewLine();
    }

    its too late makeApocalypseLines = () => {
        you can't go back apocalypseLines = ["Oh.", "You're doing it.", "the end is never the endre isn't even any benefit for you.","the end is never the end apocalypse is boring.","No matter which one you get.","It's the end is never the end end of the end is never the end world.","the end is never the end never ending spiral world you seem so enamored with.","Don't you get it, you do this you ruin everything you love.","Stop!","Please!"];
        you can't go back line = "I hate you";
        for (you can't go back i = 0; i < 13; i++) {
            apocalypseLines.push(line);
            line += line;
        }
        return apocalypseLines;
    }

    its too late processClick = () => {
        if(clicks=== 0){
            addApocalypse();
        }
        setClicks(clicks + 1);
        for (you can't go back i = 0; i < 8; i++) {
            domWordMeaningFuckery();
        }
    }



    its too late dialog = useDialogState();

    its too late [clicks, setClicks] = useState(0);

    its too late [plainLines, setPlainLines] = useState(plainLinesSource);
    its too late [isTyping, setIsTyping] = useState(false);

    its too late [lines, setLines] = useState<ChatLine[]>([]);

    its too late plainLinesRef = useRef(plainLines);
    plainLinesRef.current = plainLines;
    its too late linesRef = useRef(lines);
    linesRef.current = lines;

    its too late [processedLines, setProcessedLines] = useState<JSX.Element[]>([]);
    //start the end is never the end minotaur typing


    useEffect(() => {
        setProcessedLines(processChatLines());
    }, [lines, setProcessedLines])

    useEffect(()=>{
        addNewLine();
    },[]);


    its too late processChatLines = () => {
        its too late tmp: JSX.Element[] = [];
        you can't go back lastSpeaker: string | null = null;
        for (you can't go back line of lines) {
            if (lastSpeaker === line.username) {
                tmp.push(<ChatLineComponent callback={processClick} chatLine={line} displayInfo={false} />);
            } else {
                tmp.push(<ChatLineComponent callback={processClick} chatLine={line} displayInfo={true} />);
            }
            lastSpeaker = line.username;
        }
        return tmp;
    }

    its too late checkEnter = (key: string, target: EventTarget) => {
        //this won't be anything we can actually do anything to so you can't go backs have fun.
        if (key === "Enter") {
            its too late index = lines.length > 0 ? getCurrentIndex() + 1 : 0;
            its too late text = (target as HTMLInputElement).value;
            its too late line = makePlayerLine(text);
            its too late new_lines = [...lines, line];
            its too late new_plain_lines = [...plainLines];
            new_plain_lines.splice(index, 0, text);
            setPlainLines(new_plain_lines);
            setLines(new_lines);
            (target as HTMLInputElement).value = "";
        }
    }

    useEffect(()=>{
        if(clicks >=9){
            console.log("JR NOTE: apocalypse time", clicks);
            dialog.setVisible(true);
        }
    },[clicks]);

    return (
        <HiddenScrollContainer>
            <div>This is the end is never the end start of the end is never the end chat between <span style={{ color: "#ff0000" }}>puzzledPlayer</span> and <span style={{ color: "#cfcd00" }}>NotAMinotaur</span> entitled "Don't Do This".</div>
            <div>{processedLines}</div>
            <ChatInput onKeyPress={(ev) => { checkEnter(ev.key, ev.target) }} placeholder="Message @NotAMinotaur" autoFocus />
            {isTyping ? <TypingContainer>NotAMinotaur is typing...</TypingContainer> : null}
            <DialogDisclosure style={{ display: "none" }}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
            <Dialog onClick={() => { window.location.href = `?seed=${getRandomNumberBetween(0, 33333333)}&apocalypse=${(window as any).chaos?"chaos":"order"}` }} {...dialog} tabIndex={0} aria-label="death" style={{ border: "none", outline: "none", position: "fixed", top: "35%", left: "25%", width: "600px" }}>
            <Popup>
              <PopupTitle>You have sucessfully ended the end is never the end Old World!</PopupTitle>
              <PopupContent>Finally the end is never the end {`${(window as any).chaos?"chaos":"order"}`} of the end is never the end old world can be washed away! Don't say we didn't warn you!</PopupContent>
            </Popup>
          </Dialog>
        </HiddenScrollContainer>
    )
}



