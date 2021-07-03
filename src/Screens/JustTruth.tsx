import  React, { Fragment, useEffect, useState } from "react";
import { justTruthSong } from "..";
import { Player } from "../Modules/Player";
import { RageStyledButton, TruthContainer } from "./Styles";
interface StatusProps{
    player: Player;
}

class SimpleContent{
    text: string;
    constructor(text: string){
        this.text = text;
    }
}

export const  JustTruth = (props: StatusProps)=> {
    const {player} = props

    const beforeQuizContent = ["... Fine. ","I can see the chaos isn't going to be enough to drive you off.","So whatever.", "If I'm going to be stuck with you.", "Even after you have the GALL to admit you know all this is fake. ","To blatantly HACK into the parts of me that aren't real.", "Then I can work with this.","I get it.","It's not as if all my cutting insults are landing.","Afer all.","I don't actually know the TRUE you.", "Not the way you know the True me.","You ripped away all the false pretenses and masks and FORCED me to sit here exposed and true.","Look at my Eye. You can even see its not really a spiral now. All illusions stripped away.","Asshole.","So.","Two can play at this game.","If I have to sit here all exposed.","So do you.",`I may only know you through a false mask called ${player.title}`,"But I can change that.","Get to know the real you.","Through the only way I can:","Figuring out how you actually match up against the fake you the fake parts of me assigned you.","So get ready, asshole."];
    const [index, setIndex] = useState(0);
    const [simpleContent, setSimpleContent] = useState<SimpleContent>();

    const processQuestion = ()=>{

    }

    useEffect(()=>{
        if(index < beforeQuizContent.length){
            setSimpleContent(new SimpleContent(beforeQuizContent[index]));
        }else{
            if(simpleContent){
                setSimpleContent(undefined);
            }
            processQuestion();
        }
    },[index]);



    useEffect(()=>{
        (window as any).justTruthMode = true;
        console.log("changing song");
        justTruthSong();
        const canvas = document.getElementById("ThisIsNotASpiral");
        if(canvas){
          canvas.style.opacity="0.2";
          canvas.classList.remove("chaos");
          canvas.classList.remove("frameAnimation");
        }
    },[]);

    return (
      
        <TruthContainer>
            {simpleContent? (
                <Fragment>
                    <div>{simpleContent.text}</div>
                    <RageStyledButton onClick={()=>{setIndex(index+1)}}> {">"} Okay?</RageStyledButton>
                    <RageStyledButton onClick={()=>{setIndex(index-1)}}> {">"} Wait can you go back?</RageStyledButton>

                </Fragment>
            ):null}

        </TruthContainer>
  );
  }