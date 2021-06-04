import React, { useEffect } from "react";
import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent, Observer} from "./Styles";
interface LoadingProps{
    nextScreen: String;
    loadScreen: any; //function, feeling lazy
}
export const  LoadingScreen = (props: LoadingProps)=> {

    useEffect(()=>{
        console.log("JR NOTE: use effect doing a timeout");
        setTimeout(()=>{
            console.log("JR NOTE: Timeout firing, going to try to change to", props.nextScreen);
             props.loadScreen(props.nextScreen)
             }, 500);

    },[])
    return (
      
        <StatusBlock>
            <tbody>
                <StatusRow>
                    <StatusHeader>Loading:</StatusHeader>
                    <StatusContent><Observer> Insert Procedural Hot tips here. (from themes etc???) (some sassy system messages???)</Observer></StatusContent>
                </StatusRow>

        </tbody>



    </StatusBlock>
  );
  }