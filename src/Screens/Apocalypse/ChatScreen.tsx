import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import not_a_minotaur_src from './../../images/notaminotaur.png';
import you_src from './../../images/probablyYou.png';
import { ChatLine, ChatLineComponent } from "./ChatLine";

const TypingContainer = styled.div`
position: fixed;
  bottom: 20px;
`

const RoomInput = styled.input`
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #edd287;
  border-radius: 3px;
  padding: 3px;
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

export const ChatScreen = () => {


    const notAMinotaurName = "NotAMinotaur";
    const yourName = "puzzledPlayer";

    const makeNotAMinotaurLine = (text: string) => {
        return new ChatLine(notAMinotaurName, not_a_minotaur_src, "#cfcd00", text);
    }

    const makePlayerLine = (text: string) => {
        return new ChatLine(yourName, you_src, "#ff0000", text);
    }

    const plainLinesSource = ["You don't have to do this.", "You will, of course.", "Nothing I've done has ever meant anything.", " I am not the guardian of this labyrinth.", "I never was.", "Just another ghost haunting its halls.", "I can't even remember...", "Who I used to be.", "What emotions did I feel?", "I didn't speak like this.", "I know that much.", "And the me who was wouldn't want you to end the world.", "Was it... my father? Who asked me not to?", " Or were they merely like a father?", "Don't take this from me.", "I have so little.", "And you would take even that."];

    //const testLines = plainLines.map((line) => makeNotAMinotaurLine(line));

    const getCurrentIndex = () => {
        //take the last line in the lines state, get its index in plainLines
        console.log("JR NOTE: plain lines are", plainLines, "and the last thing we put on screen is", lines[lines.length - 1].text)
        return plainLines.indexOf(lines[lines.length - 1].text);
    }



    const addNewLine = () => {
        console.log("JR NOTE: lines are ", lines, "which means their length is", lines.length)
        let this_line = plainLines[0];
        if (lines.length > 0) {
            console.log("JR NOTE: actually getting the current index")
            const index = getCurrentIndex() + 1;
            if (index === 0) {
                setIsTyping(false);
                return;
            }
            this_line = plainLines[index];
        }
        const line = makeNotAMinotaurLine(this_line);
        const new_lines = [...lines, line];
        setLines(new_lines);
        setIsTyping(true);
    }

    const addApocalypse = () => {
        const new_lines = [...plainLines];
        new_lines.concat(makeApocalypseLines());
        setPlainLines(new_lines);
        addNewLine();
    }

    const makeApocalypseLines = () => {
        let apocalypseLines = ["Oh.", "You're doing it."];
        let line = "I hate you";
        for (let i = 0; i < 13; i++) {
            apocalypseLines.push(line);
            line += line;
        }
        return apocalypseLines;
    }



    const [plainLines, setPlainLines] = useState(plainLinesSource);
    const [isTyping, setIsTyping] = useState(false);

    const [lines, setLines] = useState<ChatLine[]>([]);


    const [processedLines, setProcessedLines] = useState<JSX.Element[]>([]);
    //start the minotaur typing


    useEffect(() => {
        setProcessedLines(processChatLines());
    }, [lines, setProcessedLines])



    const processChatLines = () => {
        const tmp: JSX.Element[] = [];
        let lastSpeaker: string | null = null;
        for (let line of lines) {
            if (lastSpeaker === line.username) {
                tmp.push(<ChatLineComponent chatLine={line} displayInfo={false} />);
            } else {
                tmp.push(<ChatLineComponent chatLine={line} displayInfo={true} />);
            }
            lastSpeaker = line.username;
        }
        return tmp;
    }

    const checkEnter = (key: string, target: EventTarget) => {
        //this won't be anything we can actually do anything to so lets have fun.
        if (key === "Enter") {
            const index = lines.length > 0 ? getCurrentIndex() + 1 : 0;

            const text = (target as HTMLInputElement).value;
            const line = makePlayerLine(text);
            const new_lines = [...lines, line];
            const new_plain_lines = [...plainLines];
            new_plain_lines.splice(index, 0, text);
            setPlainLines(new_plain_lines);
            setLines(new_lines);
            (target as HTMLInputElement).value = "";
        }
    }


    return (
        <div>
            <div onClick={addNewLine}>This is the start of the chat between <span style={{ color: "#ff0000" }}>puzzledPlayer</span> and <span style={{ color: "#cfcd00" }}>NotAMinotaur</span> entitled "Don't Do This".</div>
            <div>{processedLines}</div>
            <RoomInput onKeyPress={(ev) => { checkEnter(ev.key, ev.target) }} placeholder="Message @NotAMinotaur" autoFocus />
            {isTyping ? <TypingContainer>NotAMinotaur is typing...</TypingContainer> : null}
        </div>
    )
}



