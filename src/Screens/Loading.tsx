import  { useEffect } from "react";
import { STORAGE_KEY } from "../Utils/constants";
import { addNumToArrayWithKey } from "../Utils/LocalStorageUtils";
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
                fuckShitUpButOnlyALittle();

                (window as any).menuClick("LOADING");

                (window as any).menuClick(nextScreen);
                addNumToArrayWithKey(STORAGE_KEY, 0);
                loadScreen(nextScreen)
                }, 50);
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