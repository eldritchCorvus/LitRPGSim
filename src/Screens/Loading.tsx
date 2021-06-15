import  { useEffect } from "react";
import {StatusHeader,StatusRow, StatusBlock,StatusContent, Observer, fuckShitUpButOnlyALittle} from "./Styles";
interface LoadingProps{
    nextScreen: String;
    loadScreen: any; //function, feeling lazy
}
export const  LoadingScreen = (props: LoadingProps)=> {
    const {loadScreen, nextScreen} = props

    useEffect(()=>{
        setTimeout(()=>{
            fuckShitUpButOnlyALittle();
            (window as any).menuClick("LOADING");
            (window as any).menuClick(nextScreen);
             loadScreen(nextScreen)
             }, 500);

    },[loadScreen, nextScreen])
    return (
      
        <StatusBlock>
            <span>
                <StatusRow>
                    <StatusHeader>Loading:</StatusHeader>
                    <StatusContent><Observer> Insert Procedural Hot tips here. (from themes etc???) (some sassy system messages???)</Observer></StatusContent>
                </StatusRow>

        </span>



    </StatusBlock>
  );
  }