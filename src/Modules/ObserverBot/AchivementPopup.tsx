import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Zalgo } from "../../Utils/StringUtils";

 
 interface AchivementProps{
    title: string;
    text: string; 
}

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
    background: white;
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
    let {title, text} = props;
    const {visible} = dialog;
    const bg = (window as any).rageMode?"black":"white";
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
        const root = document.querySelector("#root")
        if(visible && root){
            (root as HTMLElement).style.filter = "blur(3px)";
        }else{
            (root as HTMLElement).style.filter = "blur(0px)";
        }
    },[visible])

    return(
        <>
      <DialogDisclosure style={{display:"none"}}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
      <Dialog onClick={()=>{dialog.setVisible(false)}} {...dialog} tabIndex={0} aria-label="{props.title}" style={{border:"none", position: "fixed", top: "35%", left:"25%", width: "600px",background:bg} }>
        <Popup style={{background: bg}}>
            <PopupTitle>{title}</PopupTitle>
            <PopupContent>{text}</PopupContent>
        </Popup>
      </Dialog>
    </>
    )

}

const AchivementPopupKickoff = (props: AchivementProps)=>{
    ReactDOM.render(
        <React.StrictMode>
          <AchivementPopup title={props.title} text={props.text} />
        </React.StrictMode>,
        document.getElementById('popup')
      );
}



export default AchivementPopupKickoff;
