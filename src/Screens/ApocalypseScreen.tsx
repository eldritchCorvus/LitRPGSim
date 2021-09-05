import { useEffect, useState } from "react";
import spinning_logo from './../images/spinningLogoReal.gif';

export const ApocalypseScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const body = document.querySelector("body");
        if(body){
            body.className = "paldemicBody";
        }
        const rabbit = document.querySelector("#rabbit_hole");
        if(rabbit){
            rabbit.remove();
        }

    },[])

    if(loading){
        return(
            <div className="loadingScreen">
                <img className="spinningLogo" src={spinning_logo}></img>
                <div className="quipContent">TODO: insert gigglesnort here</div>
                <div className="quipAttribution">some form of jr</div>
                <div className="statusElement">Connection...</div>
                <div className="connectionProblems">
                Connection Problems? Whoops! Guess you're out of luck!
                <a href="mailto:jadedResearcher@gmail.com" className="helpLink">Email</a>
                <a href="https://jadedresearcher.tumblr.com/" className="helpLink">Tumblr</a>
                </div>

            </div>
        )
    }else{
        return(
            <div>apocalpyse todo</div>
        )
    }
    

}
