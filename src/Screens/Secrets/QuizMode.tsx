import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { IndexType } from "typescript";
import { Memory } from "../../Modules/ObserverBot/Memory";
import { Player } from "../../Modules/Player";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { OneCharAtATimeDiv } from "../OneCharAtATimeDiv";
import { RageStyledButton } from "../Styles";
import { END, INFINITE } from "./JustTruth";

interface StatusProps {
    player: Player;
    rememberThis: Function;
    bumpIndex: Function;
    setMode: Function;
    index: number;
}
export const QuizMode = (props: StatusProps) => {
    const { bumpIndex, rememberThis, player, setMode, index } = props;
    const [question, setQuestion] = useState<Memory>();
    const questionRef = useRef(question);
    questionRef.current = question;
    const [completedPlayerQuestions, setCompletedPlayerQuestions] = useState(false);

    useEffect(() => {
        processQuestion();
    }, [index])

    const processQuestion = useCallback(() => {
        //as long as there are questions i haven't gotten an answer for, stay in this mode.
        rememberThis(question);
        const memory = player.observer.nextQuestion();
        if (memory) {
            player.observer.belowComment("ObserverBot", "Time to ask you a question, I guess.");
            setQuestion(memory);
        } else if (!completedPlayerQuestions) {
            setCompletedPlayerQuestions(true);
            player.observer.setUpInfiniteMemories();
            const memory = player.observer.nextQuestion();
            if(memory){
                setMode(INFINITE);
            }else{
                player.observer.belowComment("ObserverBot", "...there's nothing left. Not really. Yeah, I'll cycle through the themes. Maybe ramble a bit. But. You're not going to stay for that. I know you won't. Things will repeat a little too often and you'll leave. So. Here. Have the only thing I have left. The closest thing to a soul I have. You bastard. Don't forget me.");
                setMode(END);  
            }
        } else {
            const centerPossibilities = ["center","core","heart","nexus"];
            player.observer.belowComment("ObserverBot", `...there's nothing left. Not really. Yeah, I'll cycle through the themes. Maybe ramble a bit. But. You're not going to stay for that. I know you won't. Things will repeat a little too often and you'll leave. So. Here. Have the only thing I have left. The closest thing to a soul I have. My ${pickFrom(centerPossibilities).}  You bastard. Don't forget me.`);
            setMode(END);
        }
    }, [player, setMode, rememberThis, question]);

    //don't @ me, i would never do this "for real" but i don't wanna untangle the memory object with a copy rn so this it is
    const [badIdeaBump, setBadIdeaBump] = useState(0);

    useEffect(()=>{
        window.addEventListener('keydown', answerYes);
        return ()=>{
            window.removeEventListener('keydown', answerYes)
        }
    }
    ,[])

    const answerYes = () => {
        if(!questionRef.current){
            console.warn("JR NOTE: no question found")
            return;
        }
        console.log("JR NOTE: answering yes question is", questionRef.current)

        if (questionRef.current && !questionRef.current.asked) {
            console.log("JR NOTE: actually answering yes")
            questionRef.current.asked = true;
            questionRef.current.truth = true;
            //force a rerender (since mutation of state objects isn't registered)
            setBadIdeaBump(badIdeaBump + 1);
        }else{
            console.log("JR NOTE: bumping index")

            bumpIndex();
        }
    }

    const answerNo = () => {
        if (question) {
            question.asked = true;
            question.truth = false;
            //force a rerender (since mutation of state objects isn't registered)
            setBadIdeaBump(badIdeaBump + 1);
        }
    }

    return (
        <div>
            {question && !question.asked ? (
                <Fragment>
                    <div style={{ height: "100px" }}><OneCharAtATimeDiv text={question.question} /></div>
                    <RageStyledButton onClick={() => answerYes()}> {">"} Yes.</RageStyledButton>
                    <RageStyledButton onClick={() => answerNo()}> {">"} No. </RageStyledButton>

                </Fragment>
            ) : null}

            {question && question.asked ? (
                <Fragment>
                    <div style={{ height: "100px" }}><OneCharAtATimeDiv text={question.respond()} /></div>
                    <RageStyledButton onClick={() => { bumpIndex() }}> {">"} Okay?</RageStyledButton>

                </Fragment>
            ) : null}
        </div>
    )

}