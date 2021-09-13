import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";

import { ApocalypseLoader } from "./LoadingApocalypse";

/*
JR NOTE: this is a statement on the delicate balance between order and chaos you need for a good
procedural experience. 

too much chaos and its just. "yeah, okay"

too much order and its just a particularly badly formatted regular game. why bother.
*/
export const ApocalypseScreen = () => {


    const [loading, setLoading] = useState(true);

    const killGameStuff = ()=>{
        const body = document.querySelector("body");
        if(body){
            body.style.backgroundImage="";
            body.className = "paldemicBody";
            body.id = "no";
        }

        const bg:HTMLElement|null = document.querySelector("#ThisIsNotABG");
        if(bg){
            bg.style.backgroundImage="";
            bg.id = "no3";

        }

        const nas:HTMLElement|null = document.querySelector("#ThisIsNotASpiral");
        if(nas){
            nas.style.backgroundImage="";
            nas.id = "no2";
        }

    }

    useEffect(()=>{
        stopLoadingEventually();
        killGameStuff();
    },[])

    const stopLoadingEventually = ()=>{
        setTimeout(()=>{
            setLoading(false);
         }, 10000)
    }

    if(loading){
        return(
            <ApocalypseLoader/>
        )
    }else{
        return(
            <ChatScreen/>
        )
    }
    

}



