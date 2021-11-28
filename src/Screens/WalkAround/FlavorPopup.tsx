import styled from "@emotion/styled";
import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";

 
 interface FlavorPopupProps{
    text: string; 
    left: number;
    top: number;
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
    width: 400px;
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


const  FlavorPopup = (props: FlavorPopupProps)=> {
    const dialog = useDialogState();
    const [initialShowing, setInitialShowing] = useState(true);
    let {text, left, top} = props;
    const {visible} = dialog;
    useEffect(()=>{
        if(initialShowing){
            dialog.setVisible(true);
            setInitialShowing(false);
        }
    },[initialShowing])

    useEffect(()=>{
        console.log("JR NOTE: new text",text)
        if(text){
            const timer = setTimeout(()=>{
                dialog.setVisible(false);
            }, 3000)
        
            return () => {
              clearTimeout(timer);
            };
        }

    },[text,dialog])

    //if i depend on dialog here it won't let me dismiss the popup. just deal with it.
    useEffect(()=>{
            dialog.setVisible(true);    
    },[text])
    return(
        <Fragment key={text}>
      <DialogDisclosure style={{display:"none"}}{...dialog}>Achivement Unlocked!!!</DialogDisclosure>
      <Dialog onMouseDown={()=>{dialog.setVisible(false)}} {...dialog} tabIndex={0} style={{border:"none",outline:"none", position: "fixed", top: "35%", left:"27%", width: "600px"} }>
        <Popup>
            <PopupContent>{text}</PopupContent>
        </Popup>
      </Dialog>
    </Fragment>
    )

}

export default FlavorPopup;
