import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import { TBDChatBox } from './TBDChatBox';
import help_icon from './../../../../images/Walkabout/icons8-chat-64_green.png';
import { precoffinChats, TBDChatType } from "./PreCoffinChats";
import { beepEffect } from "../../../..";

interface TBDChatProps{
    coffinTime: boolean; //should we be fetching pre coffin or post coffin chats?
    setCoffinTime: Function; //is it coffin time?????????????????
}

export const TBDChat : React.FC<TBDChatProps> = ({coffinTime, setCoffinTime}) => {

    const TBDChatIcon = styled.button`
    position: fixed;
    bottom: 15px;
    right: 15px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    font-size: 18px;
    line-height: 23px;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
    z-index: -1;
`

    interface IconProps {
        greyed: boolean;
    }

    const IconImage = styled.img`
    height: ${(props: IconProps) => props.greyed ? "18px" : "20px"};
    width: ${(props: IconProps) => props.greyed ? "18px" : "20px"};
    filter: ${(props: IconProps) => props.greyed ? "grayscale(1)" : "grayscale(0)"};


`

    const [chatOpen, setChatOpen] = useState(false);
    const [allChats, setAllChats] = useState([precoffinChats[0]])
    const [unseenChat, setUnseenChat] = useState(false);

    const [newChat, setNewChat] = useState<TBDChatType | undefined>();
    const [grayIcon, setGrayIcon] = useState(true);

    const toggleChat = () => {
        if (!chatOpen) {
            setUnseenChat(false);
            setGrayIcon(false);
        }
        setChatOpen(!chatOpen);
    }

    useEffect(() => {
        if (!newChat) {
            setUnseenChat(false);
            setChatOpen(false);
            setTimeout(() => {
                setUnseenChat(true);
                beepEffect();
                const index = precoffinChats.indexOf(allChats[allChats.length - 1]) + 1;
                if (precoffinChats.length > index) {
                    setNewChat(precoffinChats[index]);
                } else {
                    setCoffinTime(true);
                }

            }, 60 * 1000)
        }
    }, [newChat])

    useEffect(() => {
        if (unseenChat) {
            const flash = () => {
                console.log("JR NOTE: flash")
                setGrayIcon(!grayIcon)
            }
            let timeoutId = setTimeout(flash, 1000);
            return () => {
                clearTimeout(timeoutId);
            };
        }

    }, [unseenChat, grayIcon]);
    //flamingchickens
    //if you care about angelfire i mean
    //and then you'll have one of two needed tokens, probably? maybe?
    //honestly the second token is easier to find
    //and funnier
    //what are the tokens for? smug points, probably
    //i don't know what yall do with your findings
    //write a story so i find out
    return (
        <Fragment>
            <TBDChatIcon onClick={() => toggleChat()}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage greyed={grayIcon} src={help_icon} /> theBestDude72 chat</div></TBDChatIcon>

            {chatOpen ? <TBDChatBox setChatOpen={setChatOpen} allChats={allChats} newChat={newChat} setAllChats={setAllChats} setNewChat={setNewChat} /> : null}
        </Fragment>
    )
}