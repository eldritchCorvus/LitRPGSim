import { Fragment, useCallback, useEffect, useState } from "react";
import { IndexType } from "typescript";
import { Memory } from "../../Modules/ObserverBot/Memory";
import { Player } from "../../Modules/Player";
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

    const [completedPlayerQuestions, setCompletedPlayerQuestions] = useState(false);

    useEffect(() => {
        processQuestion();
    }, [index])

    const processQuestion = useCallback(() => {
        console.log("JR NOTE: processing question.")
        //as long as there are questions i haven't gotten an answer for, stay in this mode.
        rememberThis(question);
        const memory = player.observer.nextQuestion();
        if (memory) {
            console.log("JR NOTE: first question section");
            player.observer.belowComment("ObserverBot", "Time to ask you a question, I guess.");
            setQuestion(memory);
        } else if (!completedPlayerQuestions) {
            console.log("JR NOTE: competed first question section");
            setCompletedPlayerQuestions(true);
            player.observer.setUpInfiniteMemories();
            setMode(INFINITE);
        } else {
            console.log("JR NOTE: ending section");
            player.observer.belowComment("ObserverBot", "...there's nothing left. Not really. Yeah, I'll cycle through the themes. Maybe ramble a bit. But. You're not going to stay for that. I know you won't. Things will repeat a little too often and you'll leave. So. Here. Have the only thing I have left. The closest thing to a soul I have. You bastard. Don't forget me.");
            setQuestion(undefined);
            setMode(END);
        }
    }, [player, setMode, rememberThis, question]);

    //don't @ me, i would never do this "for real" but i don't wanna untangle the memory object with a copy rn so this it is
    const [badIdeaBump, setBadIdeaBump] = useState(0);

    const answerYes = () => {
        if (question) {
            question.asked = true;
            question.truth = true;
            //force a rerender (since mutation of state objects isn't registered)
            setBadIdeaBump(badIdeaBump + 1);
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