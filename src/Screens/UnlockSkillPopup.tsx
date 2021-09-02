import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useDialogState, Dialog, DialogDisclosure } from "reakit/Dialog";
import { Player } from "../Modules/Player";
import { Skill } from "../Modules/Skill";

 
 interface UnlockProps{
    player: Player;
    skill: Skill|null; 
    unlockSkill: any;//lazy, its a function
}

const StyledButton = styled.button`
    background: none;
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 50px;
    color: black;
`
const DisabledStyledButton = styled.button`
    background: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 50px;
    color: #ccc;
`

 const Popup = styled.div`
    border: 2px solid black;
    border-radius: 13px;
    padding: 5px;
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    padding-right: 13px;
    margin: 10px;
    background: white;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
`

const ButtonGrouping = styled.div`
    display: flex;
`


 const PopupTitle = styled.div`
    border-bottom: 2px solid black;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`


 const PopupContent = styled.div`
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`


export const  UnlockSkillPopup = (props: UnlockProps)=> {
    const dialog = useDialogState();
    let {player, skill} = props;
    const {visible} = dialog;
    const bg = (window as any).rageMode?"black":"white";

    //if i depend on dialog here it won't let me dismiss the popup. just deal with it.
    useEffect(()=>{
            if(skill && player){
                dialog.setVisible(true);
            }else{
                dialog.setVisible(false);
            }  
    },[player, skill,dialog])

    useEffect(()=>{
        const root = document.querySelector("#ThisIsNotAGame")
        if(visible && root){
            (root as HTMLElement).style.filter = "blur(3px)";
        }else{
            (root as HTMLElement).style.filter = "blur(0px)";
        }
    },[visible])

    return(
        <>
      <DialogDisclosure style={{display:"none"}}{...dialog}>Unlock {skill?.name}?</DialogDisclosure>
      <Dialog hideOnClickOutside={false} role="alertdialog"  {...dialog} tabIndex={0} aria-label="{props.title}" style={{border:"none", position: "fixed", top: "35%", left:"25%", width: "600px",background:bg} }>
        <Popup style={{background: bg}}>
            <PopupTitle>Unlock {skill?.name} for {skill?.tier} Skill Points?</PopupTitle>
            <PopupContent>
                <ButtonGrouping>
                    {skill &&player.canAffordSkill(skill)?<StyledButton onClick={()=>{props.unlockSkill(skill,true)}}>yes</StyledButton>:<DisabledStyledButton>yes</DisabledStyledButton>}
                    <StyledButton onClick={()=>{props.unlockSkill(skill,false)}}>no</StyledButton>
                </ButtonGrouping>

            </PopupContent>
        </Popup>
      </Dialog>
    </>
    )

}




