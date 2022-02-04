import styled from "@emotion/styled"
import { Fragment, MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import { beepEffect } from "../../../.."
import { getRandomNumberBetween } from "../../../../Utils/NonSeededRandUtils"
import { TBDChatType } from "./PreCoffinChats"
import { ProcessedChatLine } from "./TBDChatLine"

interface CurrentChatSectionType {
    newChat: TBDChatType;
    allChats: TBDChatType[];
    chatRef: MutableRefObject<HTMLDivElement|null>;
    setNewChat: Function;
    setAllChats: Function;
}

const TimeCode = styled.div`
color: grey;
font-weight: lighter;
font-style: italic;
text-align: center;

`
//play new lines over time
export const CurrentChatSection: React.FC<CurrentChatSectionType> = ({ newChat, allChats,chatRef,setNewChat,setAllChats }) => {

    const [pastLines, setPastLines] = useState<string[]>([]);
    const [pendingLines, setPendingLines] = useState<string[]>([]);

    const memorizedProcessCurrentLine = useCallback(()=>{
        //if no more lines, update up the chain that this is no longer a new chat
        if(pendingLines.length > 0){
            beepEffect();
            if(chatRef.current){
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
            setPastLines([...pastLines, pendingLines[0]])
            setPendingLines(pendingLines.slice(1))
            
        }else if(pastLines.length>0){
            /*setPastLines([]);
            setAllChats([...allChats,newChat])
            setNewChat(undefined);*/
        }
    },[pastLines, pendingLines])

    useEffect(()=>{
        if(chatRef.current){
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
        const timer = setTimeout(()=>{
            memorizedProcessCurrentLine();
         }, getRandomNumberBetween(1,5)*1000)
         return() => {
            clearTimeout(timer);
          };
    },[pendingLines])

    useEffect(() => {
        if(newChat){
            setPastLines([newChat.lines.split("\n")[0]])
            setPendingLines(newChat.lines.split("\n").slice(1));
        }

    }, [newChat])

    return (
        <Fragment>
            <TimeCode>{newChat.timestamp.toLocaleDateString()} {newChat.timestamp.toLocaleTimeString()}</TimeCode>
            {pastLines.map((line) => {
                return (
                    <ProcessedChatLine line={line} />
                )
            })}
        </Fragment>
    )
}