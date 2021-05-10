import { useEffect } from "react";
import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent} from "./Styles";
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
             }, 1000);

    },[])
    return (
    <StatusBlock>
        <tbody>
            <StatusRow>
                <StatusHeader>Loading:</StatusHeader>
                <StatusContent>Insert Procedural Hot tips here. (from classpect etc???) (some sassy system messages???)</StatusContent>
            </StatusRow>

    </tbody>



  </StatusBlock>);
  }