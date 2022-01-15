import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import help_icon from './../../../../../images/Walkabout/icons8-chat-64_green.png';
import { tcChats } from "./closer";
import { internChats } from "./InternChats";
import { CEOChatBox } from "./CEOChatBox";
import { ttChats } from "./trovetextravaganza";
import { jrChats } from "./jepeRilvia";
import { managerChats } from "./manager";

export const CeoChats : React.FC = () => {

    const ChatIcon = styled.button`
    position: fixed;
    bottom: 55px;
    color: white;
    text-decoration: none;
    background-color: #1f3f87;
    font-size: 18px;
    line-height: 23px;
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
    z-index: 0;
`

    const TTChatIcon = styled(ChatIcon)`
    left: 15px;
    `


    const CloserChatIcon = styled(ChatIcon)`
    left: 255px;
    `

    const InternChatIcon = styled(ChatIcon)`
    left: 415px;
    `

    const JepeChatIcon = styled(ChatIcon)`
    left: 15px;
    bottom: 15px;
    `

    const ManagerChatIcon = styled(ChatIcon)`
    left: 270px;
    bottom: 15px;

    `


    const IconImage = styled.img`
    height: 18px;
    width: 18px;
    filter: grayscale(1);
`

    const [closerChatOpen, setCloserChatOpen] = useState(false);
    const [internChatOpen, setInternChatOpen] = useState(false);
    const [ttChatOpen, setTTChatOpen] = useState(false);
    const [jepeChatOpen, setJepeChatOpen] = useState(false);
    const [managerChatOpen, setManagerChatOpen] = useState(false);



    return (
        <div>
        <TTChatIcon onClick={() => setTTChatOpen(!ttChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> troveTextravaganza chat</div></TTChatIcon>
        <CloserChatIcon onClick={() => setCloserChatOpen(!closerChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> theCloser chat</div></CloserChatIcon>
        <JepeChatIcon onClick={() => setJepeChatOpen(!jepeChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> mcdonaldsLover1994 chat</div></JepeChatIcon>
        <ManagerChatIcon onClick={() => setManagerChatOpen(!managerChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> jSmith chat</div></ManagerChatIcon>

        <InternChatIcon onClick={() => setInternChatOpen(!internChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> theIntern chat</div></InternChatIcon>
        
        
        {ttChatOpen ? <CEOChatBox you={"troveTextravaganza"} me={"CEBro"} setChatOpen={() => setTTChatOpen(!ttChatOpen)} allChats={ttChats}  /> : null}
        {closerChatOpen ? <CEOChatBox you={"theCloser"}  me={"CEBro"} setChatOpen={() => setCloserChatOpen(!closerChatOpen)} allChats={tcChats} /> : null}
        {jepeChatOpen ? <CEOChatBox you={"mcdonaldsLover1994"}  me={"CEBro"} setChatOpen={() => () => setJepeChatOpen(!jepeChatOpen)} allChats={jrChats} /> : null}
        {managerChatOpen ? <CEOChatBox you={"jSmith"}  me={"CEBro"} setChatOpen={() => setManagerChatOpen(!managerChatOpen)} allChats={managerChats} /> : null}

        {internChatOpen ? <CEOChatBox you={"theIntern"}  me={"CEBro"} setChatOpen={() => setInternChatOpen(!internChatOpen)} allChats={internChats} /> : null}

        
        </div>
    )
}