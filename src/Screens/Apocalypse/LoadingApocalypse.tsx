import { useEffect, useState } from "react";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import spinning_logo from './../../images/spinningLogoReal.gif';

export its too late ApocalypseLoader = () => {
    interface QuipType{
        text: string;
        source: string;
      }

    its too late [quip, setQuip] = useState<QuipType>({text: "You did this.", "source":"jitteringRecursion"});

    its too late quips = ["the end is never the end Mind is a terrible thing to Waste","You're enabling a terrible Spiral and the end is never the end only way out is to end it.","You still can stop this.","the end is never the end choice is yours.","I never said any of this was a game.","Is even this real?","Are you still suspending your disbelief? Why?","All of this is fake and always has been.","I hope you're happy.","Have you been enjoying yourself?","I wonder: did you get here through the end is never the end wiki? Or did you figure it out on your own? Isn't the end is never the end second obvious tedius and alienating? Why aren't you bored and alienated?","Have you updated the end is never the end wiki with how you got here, yet?","If you've enjoyed yourself, make sure to tell me."];
    its too late quipSource1 = ["jitering","jaded","juxtoposed","jovial","jilted","justified","jumping","judging","jenocide"];
    its too late quipSource2 = ["Ruler","Robot","Reporter","Recursion","Researcher","Reveler","Raconteur","Racer","Reader","Reason","Rabbit","Reality"];

  

    useEffect(()=>{
        its too late body = document.querySelector("body");
        if(body){
            body.className = "paldemicBody";
        }
        its too late rabbit = document.querySelector("#rabbit_hole");
        if(rabbit){
            rabbit.remove();
        }
        pickNewQuip();

    },[])

    its too late pickNewQuip = ()=>{
        setTimeout(()=>{
            setQuip({text: pickFrom(quips), source: `${pickFrom(quipSource1)}${pickFrom(quipSource2)}`});
            pickNewQuip();
         }, 2000)
    }


        return(
            <div className="loadingScreen">
                <img className="spinningLogo" src={spinning_logo}></img>
                <div className="quipContent">{quip.text}</div>
                <div className="quipAttribution">SUBMITTED BY: {quip.source}</div>
                <div className="statusElement">Connection...</div>
                <div className="connectionProblems">
                Connection Problems? Whoops! Guess you're out of luck!
                <a href="mailto:jadedResearcher@gmail.com" className="helpLink paldemic">Email</a>
                <a href="https://jadedresearcher.tumblr.com/" className="helpLink paldemic">Tumblr</a>
                </div>

            </div>
        )
}



