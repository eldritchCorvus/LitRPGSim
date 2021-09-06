import { useEffect, useState } from "react";
import { ChatScreen } from "./ChatScreen";

import { ApocalypseLoader } from "./LoadingApocalypse";

export const ApocalypseScreen = () => {


    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        stopLoadingEventually();
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



