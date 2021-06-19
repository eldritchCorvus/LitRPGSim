import  { useEffect } from "react";
import {StatusHeader,StatusRow, StatusBlock,StatusContent, Observer, fuckShitUpButOnlyALittle} from "./Styles";
interface LoadingProps{
    nextScreen: String;
    loadScreen: any; //function, feeling lazy
    refresh: boolean //really only here for when you need to refresh teh current screen okay
}
export const  LoadingScreen = (props: LoadingProps)=> {
    const {loadScreen, nextScreen, refresh} = props

    useEffect(()=>{
        if(refresh && loadScreen && nextScreen){
        setTimeout(()=>{
                console.log("JR NOTE: about to fuckShitUpButOnlyALittle");
                fuckShitUpButOnlyALittle();
                console.log("JR NOTE: about to menu click loading");

                (window as any).menuClick("LOADING");
                console.log("JR NOTE: about to menu click next screen");

                (window as any).menuClick(nextScreen);
                console.log("JR NOTE: about to load screen");
                loadScreen(nextScreen)
                }, 500);
            }

    },[loadScreen, nextScreen,refresh])
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