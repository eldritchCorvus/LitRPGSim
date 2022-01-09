import styled from "@emotion/styled"
import { builtinModules } from "module"
import { Fragment, useRef } from "react"
import { beepEffect } from "../../../.."
import { CurrentChatSection } from "./CurrentChatSection"
import { TBDChatType } from "./PreCoffinChats"
import { ProcessedChatLine } from "./TBDChatLine"

interface TBDChatBoxType {
    newChat: TBDChatType | undefined;
    allChats: TBDChatType[];
    setNewChat: Function;
    setAllChats: Function;
    setChatOpen: Function;
}


export const TBDChatBox: React.FC<TBDChatBoxType> = ({ setChatOpen,newChat, allChats, setNewChat, setAllChats }) => {
    const chatRef = useRef<HTMLDivElement>(null);

    const ChatContainer = styled.div`
        position: fixed;
        right: 15px;
        top: 15px;
        margin-top: 65px;
        height: 355px;
        width: 550px;
        color: white;
        text-decoration: none;
        background: #c4c4c4;
        border-radius: 2px;
        border: 5px solid #1f3f87;
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .4);
    `

    const ChatHeader = styled.div`
        height: 33px;
        color: white;
        background-color: #1f3f87;
        font-size: 14px;
        padding-left: 20px;
        text-align: center;
        vertical-align: middle;
        line-height: 26px;
        display: flex;
    `

    const XButton = styled.button`
        border: 2px solid white;
        text-decoration: none;
        background-color: red;
        color: white;
        padding-top: 2px;
        margin-left: 270px;
        cursor: pointer;
        font-size: 10px;
        height: 25px;
        vertical-align: bottom;
        margin-top: 4px;
    `

    const ChatBody = styled.div`
        color: #1f3f87;
        background-color: #f8fafa;
        width: 500px;
        height: 272px;
        margin-left: 30px;
        border-left: 5px solid #a4a4a4;
        border-top: 5px solid #a4a4a4;
        border-right: 5px solid #e4e4e4;
        border-bottom: 5px solid #e4e4e4;

        margin-top: 10px;

        div{
            margin-left: 5px;
            padding-top: 5px;
        }
        overflow: auto;
    `

    const TimeCode = styled.div`
        color: grey;
        font-weight: lighter;
        font-style: italic;
        text-align: center;
    `
    return (
        <ChatContainer>

            <ChatHeader>
                <div>theBestDude72 -- Instant Messaging</div><XButton onClick={()=>{setChatOpen(false)}}>X</XButton>
            </ChatHeader>
            <ChatBody ref={chatRef} >
                <div>
                    {allChats.map((chat) => {
                        return (
                            <Fragment>
                                <TimeCode>{chat.timestamp.toLocaleDateString()} {chat.timestamp.toLocaleTimeString()}</TimeCode>
                                {
                                    chat.lines.split("\n").map((line) => {
                                        return (
                                            <ProcessedChatLine line={line} />
                                        )
                                    })
                                }
                            </Fragment>
                        )
                    })}
                    {newChat?<CurrentChatSection chatRef={chatRef} newChat={newChat} allChats={allChats} setNewChat={setNewChat} setAllChats={setAllChats}/>:null}

                </div>
            </ChatBody>

        </ChatContainer>
    )

}