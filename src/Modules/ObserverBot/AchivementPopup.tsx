import styled from "@emotion/styled";
import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

 
 interface AchivementProps{
    title: string;
    text: string; 
    reward: string; 
    skillPoints: number;
}

const Reward = styled.div`
    padding-top: 20px;
`

export const Popup = styled.div`
    border: 2px solid black;
    border-radius: 13px;
    padding: 5px;
    color: red;
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    padding-right: 13px;
    margin: 10px;
    background: #d1b056;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
`


export const PopupTitle = styled.div`
    border-bottom: 2px solid black;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`


export const PopupContent = styled.div`
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`


const  AchivementPopup = (props: AchivementProps)=> {
    const dialog = useDialogState();
    const [initialShowing, setInitialShowing] = useState(true);
    let {title, text, skillPoints} = props;
    const {visible} = dialog;
    useEffect(()=>{
        if(initialShowing){
            dialog.setVisible(true);
            setInitialShowing(false);
        }
    },[initialShowing])

    //if i depend on dialog here it won't let me dismiss the popup. just deal with it.
    useEffect(()=>{
            dialog.setVisible(true);    
    },[title, text])

    useEffect(()=>{
        const root = document.querySelector("#ThisIsNotAGame")
        if(visible && root){
            (root as HTMLElement).style.filter = "blur(3px)";
        }else if (root){
            (root as HTMLElement).style.filter = "blur(0px)";
        }else{
            const root2 = document.querySelector("#ThisIsAGame");
            if(root2){
             (root2 as HTMLElement).style.filter = "blur(0px)";
            }
        }
    },[visible])
    return(
        <Fragment key={title}>
      <DialogDisclosure style={{display:"none"}}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
      <Dialog onClick={()=>{dialog.setVisible(false)}} {...dialog} tabIndex={0} aria-label="{title}" style={{border:"none",outline:"none", position: "fixed", top: "35%", left:"25%", width: "600px"} }>
        <Popup>
            <PopupTitle>{props.title} {props.skillPoints} SkillPoints Gained!!!</PopupTitle>
            <PopupContent>{title}{props.text}<Reward>{props.reward}</Reward></PopupContent>
        </Popup>
      </Dialog>
    </Fragment>
    )

}

const AchivementPopupKickoff = (props: AchivementProps)=>{
    ReactDOM.render(
        <React.StrictMode>
          <AchivementPopup skillPoints={props.skillPoints} title={props.title} text={props.text} reward={props.reward} />
        </React.StrictMode>,
        document.getElementById('popup')
      );
}



export default AchivementPopupKickoff;
