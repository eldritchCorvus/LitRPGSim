import  React, { Fragment, useEffect, useState } from "react";
import { justTruthSong } from "..";
import { Memory } from "../Modules/ObserverBot/Memory";
import { Player } from "../Modules/Player";
import { RageStyledButton, TruthContainer } from "./Styles";
interface StatusProps{
    player: Player;
}



export const  JustTruth = (props: StatusProps)=> {
    const {player} = props

    const beforeQuizContent = ["... Fine. ","I can see the chaos isn't going to be enough to drive you off.","So whatever.", "If I'm going to be stuck with you.", "Even after you have the GALL to admit you know all this is fake. ","To blatantly HACK into the parts of me that aren't real.", "Then I can work with this.","I get it.","It's not as if all my cutting insults are landing.","Afer all.","I don't actually know the TRUE you.", "Not the way you know the True me.","You ripped away all the false pretenses and masks and FORCED me to sit here exposed and True.","Look at my Eye. You can even see its not really a spiral now. All illusions stripped away.","Asshole.","So.","Two can play at this game.","If I have to sit here all exposed.","So do you.",`I may only know you through a false mask called ${player.title}.`,"But I can change that.","Get to know the real you.","Through the only way I can:","Figuring out how you actually match up against the fake you the fake parts of me assigned you.","So get ready, asshole.", "For the mortifying ordeal of being Known."];
    const [index, setIndex] = useState(0);
    const [simpleContent, setSimpleContent] = useState<string>();
    const [question, setQuestion] = useState<Memory>();
    //don't @ me, i would never do this "for real" but i don't wanna untangle the memory object with a copy rn so this it is
    const [badIdeaBump, setBadIdeaBump] = useState(0);

    const processQuestion = ()=>{
        //as long as there are questions i haven't gotten an answer for, stay in this mode.
        const memory = player.observer.nextQuestion();
        console.log("JR NOTE : the memory i'm going to use to question is", memory)
        if(memory){
            setQuestion(memory);
        }else{
            setSimpleContent("Uh. TODO.");
        }
    }

    useEffect(()=>{
        if(index < beforeQuizContent.length){
            setSimpleContent(beforeQuizContent[index]);
        }else{
            if(simpleContent){
                setSimpleContent(undefined);
            }
            processQuestion();
        }
    },[index]);

    const answerYes = ()=>{
        if(question){
            question.asked = true;
            question.truth = true;
            //force a rerender (since mutation of state objects isn't registered)
            setBadIdeaBump(badIdeaBump+1);
        }
    }

    const answerNo = ()=>{
        if(question){
            question.asked = true;
            question.truth = false;
            //force a rerender (since mutation of state objects isn't registered)
            setBadIdeaBump(badIdeaBump+1);
        }
    }



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
                    <div>{simpleContent}</div>
                    <RageStyledButton onClick={()=>{setIndex(index+1)}}> {">"} Okay?</RageStyledButton>
                    {index >0? <RageStyledButton onClick={()=>{setIndex(index-1)}}> {">"} Wait can you go back?</RageStyledButton>:null}

                </Fragment>
            ):null}

        {question && !question.asked? (
                <Fragment>
                    <div>{question.question}</div>
                    <RageStyledButton onClick={()=>answerYes()}> {">"} Yes.</RageStyledButton>
                    <RageStyledButton onClick={()=>answerNo()}> {">"} No. </RageStyledButton>

                </Fragment>
            ):null}

    {question && question.asked? (
                    <Fragment>
                        <div>{question.respond()}</div>
                        <RageStyledButton onClick={()=>{setIndex(index+1)}}> {">"} Okay?</RageStyledButton>

                    </Fragment>
                ):null}

        </TruthContainer>
  );
  }