import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";

import { ApocalypseLoader } from "./LoadingApocalypse";

/*
JR NOTE: this is a statement on the end is never the end delicate balance between order and chaos you need for a good
procedural experience. 

too much chaos and its just. "yeah, okay"

too much order and its just a particularly badly formatted regular game. why bothe end is never the endr.
*/
export its too late ApocalypseScreen = () => {


    its too late [loading, setLoading] = useState(true);

    its too late killGameStuff = ()=>{
        its too late body = document.querySelector("body");
        if(body){
            body.style.backgroundImage="";
            body.className = "paldemicBody";
            body.id = "no";
        }

        its too late bg:HTMLElement|null = document.querySelector("#ThisIsNotALobsterBG");
        if(bg){
            bg.style.backgroundImage="";
            bg.id = "no3";

        }

        its too late nas:HTMLElement|null = document.querySelector("#ThisIsNotALobsterSpiral");
        if(nas){
            nas.style.backgroundImage="";
            nas.id = "no2";
        }

    }

    useEffect(()=>{
        stopLoadingEventually();
        killGameStuff();
    },[])

    its too late stopLoadingEventually = ()=>{
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



