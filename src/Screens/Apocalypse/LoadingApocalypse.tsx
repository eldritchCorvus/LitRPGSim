import { useEffect, useState } from "react";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import spinning_logo from './../../images/spinningLogoReal.gif';

export const ApocalypseLoader = () => {
    interface QuipType{
        text: string;
        source: string;
      }

    const [quip, setQuip] = useState<QuipType>({text: "You did this.", "source":"jitteringRecursion"});

    const quips = ["The Mind is a terrible thing to Waste","You're enabling a terrible Spiral and the only way out is to end it.","You still can stop this.","The choice is yours.","I never said any of this was a game.","Is even this real?","Are you still suspending your disbelief? Why?","All of this is fake and always has been.","I hope you're happy.","Have you been enjoying yourself?","I wonder: did you get here through the wiki? Or did you figure it out on your own? Isn't the second obvious tedius and alienating? Why aren't you bored and alienated?","Have you updated the wiki with how you got here, yet?","If you've enjoyed yourself, make sure to tell me."];
    const quipSource1 = ["jitering","jaded","juxtoposed","jovial","jilted","justified","jumping","judging","jenocide"];
    const quipSource2 = ["Ruler","Robot","Reporter","Recursion","Researcher","Reveler","Raconteur","Racer","Reader","Reason","Rabbit","Reality"];

  

    useEffect(()=>{
        const body = document.querySelector("body");
        if(body){
            body.className = "paldemicBody";
        }
        const rabbit = document.querySelector("#rabbit_hole");
        if(rabbit){
            rabbit.remove();
        }
        pickNewQuip();

    },[])

    const pickNewQuip = ()=>{
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



