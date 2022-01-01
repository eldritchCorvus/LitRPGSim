import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import {TBDChatBox } from './TBDChatBox';
import help_icon from './../../../../images/Walkabout/icons8-chat-64_green.png';

export const TBDChat = () => {

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
`

interface IconProps {
    greyed: boolean;
}

const IconImage = styled.img`
    height: ${(props: IconProps) => props.greyed?"18px":"20px" };
    width: ${(props: IconProps) => props.greyed?"18px":"20px" };
    filter: ${(props: IconProps) => props.greyed?"grayscale(1)":"grayscale(0)" };


`

const [chatOpen, setChatOpen] = useState(false);
const [newChat, setNewChat] = useState(true);
const [grayIcon, setGrayIcon] = useState(true);

const toggleChat = ()=>{
    if(!chatOpen){
        setNewChat(false);
        setGrayIcon(false);
    }
    setChatOpen(!chatOpen);
    
}

useEffect(() => {
    if(newChat){
        const flash = ()=>{
            console.log("JR NOTE: flash")
           setGrayIcon(!grayIcon)
        }
        let timeoutId = setTimeout(flash, 1000);
        return () => {
          clearTimeout(timeoutId);
        };
    }

  },[newChat,grayIcon]);

  return(
      <Fragment>
            <TBDChatIcon onClick={() => toggleChat()}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage greyed={grayIcon} src={help_icon}/> theBestDude72 chat</div></TBDChatIcon>

    {chatOpen ? <TBDChatBox /> : null}
    </Fragment>
  )
}