import styled from "@emotion/styled";
import { Fragment, useEffect, useState } from "react";
import help_icon from './../../../../../images/Walkabout/icons8-chat-64_green.png';
import { tcChats } from "./closer";
import { internChats } from "./InternChats";
import { CEOChatBox } from "./CEOChatBox";
import { ttChats } from "./trovetextravaganza";

export const CeoChats : React.FC = () => {

    const ChatIcon = styled.button`
    position: fixed;
    bottom: 15px;
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


    const IconImage = styled.img`
    height: 18px;
    width: 18px;
    filter: grayscale(1);
`

    const [closerChatOpen, setCloserChatOpen] = useState(false);
    const [internChatOpen, setInternChatOpen] = useState(false);
    const [ttChatOpen, setTTChatOpen] = useState(false);



    return (
        <div>
        <TTChatIcon onClick={() => setTTChatOpen(!ttChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> troveTextravaganza chat</div></TTChatIcon>
        <CloserChatIcon onClick={() => setCloserChatOpen(!closerChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> theCloser chat</div></CloserChatIcon>
        <InternChatIcon onClick={() => setInternChatOpen(!internChatOpen)}><div style={{ display: "inline-block", verticalAlign: "top", textAlign: "center" }}><IconImage src={help_icon} /> theIntern chat</div></InternChatIcon>
        
        
        {ttChatOpen ? <CEOChatBox you={"troveTextravaganza"} me={"CEBro"} setChatOpen={() => setTTChatOpen(!ttChatOpen)} allChats={tcChats}  /> : null}
        {closerChatOpen ? <CEOChatBox you={"theCloser"}  me={"CEBro"} setChatOpen={() => setCloserChatOpen(!closerChatOpen)} allChats={ttChats} /> : null}
        {internChatOpen ? <CEOChatBox you={"theIntern"}  me={"CEBro"} setChatOpen={() => setInternChatOpen(!internChatOpen)} allChats={internChats} /> : null}

        
        </div>
    )
}