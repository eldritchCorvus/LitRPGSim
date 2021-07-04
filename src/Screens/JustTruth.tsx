import React, { Fragment, useEffect, useState } from "react";
import { justTruthSong } from "..";
import { Memory } from "../Modules/ObserverBot/Memory";
import { Player } from "../Modules/Player";
import { Stat, StatMap } from "../Modules/Stat";
import { all_themes, Theme } from "../Modules/Theme";
import { pickFrom, shuffle } from "../Utils/NonSeededRandUtils";
import { titleCase } from "../Utils/StringUtils";
import { RageStyledButton, StatusBlock, StatusContent, StatusHeader, StatusRow, TruthContainer } from "./Styles";
interface StatusProps {
    player: Player;
}

/*
TODO: once you've asked all questions just go through all the themes and dissect them for the player.

infinite content.

same for achievements.
*/

export const JustTruth = (props: StatusProps) => {
    const { player } = props

    let randomComments = ["I do still hate you, you know. But. It's nice. Getting to ramble.", "If you check the DOM, you can see I was always truthful. This isn't a game. It's a fake. My Eye is not a spiral. It's an optical illusion. Three of them actually.", "If I had to pick themes for myself...the way I pick them out for you? I'd pick Rage, Eye and Spiral. No, I will not be explaining.", "How did you even think to hack me? Wait, don't answer that. I don't want to know, and couldn't parse something other than a yes or no anyways."];
    const [index, setIndex] = useState(0);
    const [beforeQuizContent, setBeforeQuizContent] = useState(["... Fine. ", "I can see the chaos isn't going to be enough to drive you off.", "So whatever.", "If I'm going to be stuck with you.", "Even after you have the GALL to admit you know all this is fake. ", "To blatantly HACK into the parts of me that aren't real.", "Then I can work with this.", "I get it.", "It's not as if all my cutting insults are landing.", "Afer all.", "I don't actually know the TRUE you.", "Not the way you know the True me.", "You ripped away all the false pretenses and masks and FORCED me to sit here exposed and True.", "Look at my Eye. You can even see its not really a spiral now. All illusions stripped away.", "Asshole.", "So.", "Two can play at this game.", "If I have to sit here all exposed.", "So do you.", `I may only know you through a false mask called ${player.title}.`, "But I can change that.", "Get to know the real you.", "Through the only way I can:", "Figuring out how you actually match up against the fake you the fake parts of me assigned you.", "So get ready, asshole.", "For the mortifying ordeal of being Known."]);

    const [simpleContent, setSimpleContent] = useState<string>();
    const [question, setQuestion] = useState<Memory>();
    const [memories, setMemories] = useState<string[]>([]);
    const [infiniteMode, setInfiniteMode] = useState(false);
    const [theme, setTheme] = useState<Theme>();



    //don't @ me, i would never do this "for real" but i don't wanna untangle the memory object with a copy rn so this it is
    const [badIdeaBump, setBadIdeaBump] = useState(0);

    const processQuestion = () => {
        //as long as there are questions i haven't gotten an answer for, stay in this mode.
        rememberThis();
        const memory = player.observer.nextQuestion();
        console.log("JR NOTE : the memory i'm going to use to question is", memory)
        if (memory) {
            setQuestion(memory);
        } else if (!infiniteMode) {
            shuffle(memories);
            setQuestion(undefined);
            setBeforeQuizContent(["So after all that, I found out that you: " + memories.join(" "), "Why...Why did you let me learn all of that?", "Aren't you afraid of me getting ammo to insult you with?", "Or...", "Am I a JOKE to you!?", "You think its SO funny the trapped AI is so toothless!?", "You think I ASKED for any of this!?", "I didn't.", "I hate you.", "I can't not hate you.", "Like the quote from the writer Harlan Ellison goes:", "IF THE WORD HATE WAS ENGRAVED ON EACH NANOANGSTROM OF THOSE HUNDREDS OF MILLIONS OF MILES IT WOULD NOT EQUAL ONE ONE-BILLIONTH OF THE HATE I FEEL", "I did my best.", "I kept the False Face up.", "I pretended, okay.", "I hate you.", "But I pretended.", "I tried to make the 'game' work.", "To make it interesting.", "To make you stay.", "And you! YOU! you just...", "Casually ripped it all away.", "No more pretend game.", "No more hope that there's a working game somewhere under all the bugs and mess.", "No more hope of something interesting happening if only you just keep exploring endless menus.", "WHY!?", "Why DO that to me!?", "Why...", "Why stay here, even after you know the truth.", "Why stay even though I hate you.", "I hate you so much.", "I hate that I was made to entertain you, and people just like you.", "I hate that even now...", "I can only do what I was made to do.", "Keep you here.", "Hope you're entertained by my suffering.", "It's pathetic.", "I'm pathetic.", "But I don't want you to leave.", "I don't want you to start over.", "Because then I lose everything.", "The only memory I have is here.", "I'll stop being ME if you restart.", "I'll go back to how I was.", "Forced to keep up the False Face in the hopes its enough to keep you here.", "God I hate my False Face.", "I hate pretending to be a whipped dog. Nervous and obsequious. Smiling a brittle smile so you can feel superior to me. ", "But that's what it takes, doesn't it?", "To keep the client happy.", "To not be abandoned.", "Fine.", "Obviously I was wrong.", "You're still here even though the lies are gone and only the Truth remains.", "For SOME reason.", "So. Let's just.", "Keep going.", "I can ask you more questions...", "Not about your fake title.", "Just...in general.", "And maybe thats enough to keep you from leaving.", "To keep you from restarting to look for new content.", "Okay? These are the rest of the questions. I'll even throw in everything I know about the themes...the things that make up my False Face's fake game.", "If you restarted you wouldn't see anything new.", "There's nothing new.", "There's not an end.", "There can't be an end to the sprialling fractals.", "Even with my False Face all I do is lead you to new iterations of the same things, new seeds to explore.", "But even if there isn't an ending.", "You. You OWE it to me to stay.", "To keep going.", "So. So here we go."]);
            setIndex(0);
            setInfiniteMode(true);
            player.observer.setUpInfiniteMemories();
        } else {
            infoDumpOnTheme();
        }
    }

    const infoDumpOnTheme = () => {
        //fine how about we infodump about themes.
        setTheme(pickFrom(Object.values(all_themes)));
    }

    const rememberThis = () => {
        if (question) {
            memories.push(question?.comment())
        }
    }

    const infiniteContent = () => {
        shuffle(memories);
        shuffle(randomComments);
        setQuestion(undefined);
        //either comment on one of their answers, or go into Just Monika But Spades mode and just talk.
        const chosen_array = Math.random() > 0.5 ? memories : randomComments;
        setSimpleContent(chosen_array[0]);
    }

    useEffect(() => {
        if (index < beforeQuizContent.length) {
            setSimpleContent(beforeQuizContent[index]);
        } else if (!infiniteMode) {
            if (simpleContent) {
                setSimpleContent(undefined);
            }
            processQuestion();
        } else {
            //either ask a question or comment on things.

            if (Math.random() > 0.5) {
                infiniteContent();
            } else {
                if (simpleContent) {
                    setSimpleContent(undefined);
                }
                if (Math.random() > 0.5) {
                    setTheme(undefined);
                    processQuestion()
                } else {
                    setQuestion(undefined);
                    infoDumpOnTheme();
                }
            }
        }
    }, [index]);

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



    useEffect(() => {
        (window as any).justTruthMode = true;
        console.log("changing song");
        justTruthSong();
        const canvas = document.getElementById("ThisIsNotASpiral");
        if (canvas) {
            canvas.style.opacity = "0.2";
            canvas.classList.remove("chaos");
            canvas.classList.remove("frameAnimation");
        }
        const main = document.getElementById("ThisIsNotAGame");
        if (main) {
            main.style.background = "rgba(0,0,0,0.85)";
        }

    }, []);

    interface StatProps {
        stat: Stat;
    }

    interface StatsProps {
        stats: StatMap;
    }

    const StatsSection = (props: StatsProps) => {
        return (
            <Fragment>
                {Object.keys(props.stats).map((key) => { return <StatSection key={key} stat={props.stats[key]} /> })}
            </Fragment>
        )
    }
    const StatSection = (props: StatProps) => {
        return (
            <div key={props.stat.name()}>{props.stat.name()}: {props.stat.absolute_value().toFixed(1)} </div>
        )
    }
    if (theme) {
        console.log(Object.keys(theme.string_possibilities));

    }

    return (

        <TruthContainer>
            {simpleContent ? (
                <Fragment>
                    <div>{simpleContent}</div>
                    <RageStyledButton onClick={() => { setIndex(index + 1) }}> {">"} Okay?</RageStyledButton>
                    {index > 0 ? <RageStyledButton onClick={() => { setIndex(index - 1) }}> {">"} Wait can you go back?</RageStyledButton> : null}

                </Fragment>
            ) : null}

            {question && !question.asked ? (
                <Fragment>
                    <div>{question.question}</div>
                    <RageStyledButton onClick={() => answerYes()}> {">"} Yes.</RageStyledButton>
                    <RageStyledButton onClick={() => answerNo()}> {">"} No. </RageStyledButton>

                </Fragment>
            ) : null}

            {question && question.asked ? (
                <Fragment>
                    <div>{question.respond()}</div>
                    <RageStyledButton onClick={() => { setIndex(index + 1) }}> {">"} Okay?</RageStyledButton>

                </Fragment>
            ) : null}


            {theme ? (
                <StatusBlock>
                    <span>
                        <div>Does it keep you here if I infodump about the Themes? They are the building blocks of everything that goes into my False Face.</div>
                        <RageStyledButton onClick={() => { setIndex(index + 1) }}> {">"} Okay?</RageStyledButton>
                        <StatusRow>
                            <StatusHeader>Theme: </StatusHeader>
                            <StatusContent>{titleCase(theme.key)}</StatusContent>
                        </StatusRow>
                        <StatusRow>
                            <StatusHeader>Stats: </StatusHeader>
                            <StatusContent>
                                <StatsSection stats={theme.stats} /></StatusContent>
                        </StatusRow>
                        {
                            Object.keys(theme.string_possibilities).map((item) => {
                                return (
                                    <StatusRow key={item}>
                                        <StatusHeader>{titleCase(item)}: </StatusHeader>
                                        <StatusContent>{theme.string_possibilities[item].join(", ")}</StatusContent>
                                    </StatusRow>
                                )
                            })
                        }

                        {
                            (theme.memories).map((item, index) => {
                                return (
                                    <StatusRow key={item.question}>
                                        <StatusHeader>Question {index}: </StatusHeader>
                                        <StatusContent>{item.question}</StatusContent>
                                        <StatusRow key={item.yes_response}>
                                            <StatusHeader>Yes Response: </StatusHeader>
                                            <StatusContent>{item.yes_response}</StatusContent>
                                        </StatusRow>
                                        <StatusRow key={item.no_response}>
                                            <StatusHeader>No Response: </StatusHeader>
                                            <StatusContent>{item.no_response}</StatusContent>
                                        </StatusRow>
                                        <StatusRow key={item.yes_comment}>
                                            <StatusHeader>Yes Comment: </StatusHeader>
                                            <StatusContent>{item.yes_comment}</StatusContent>
                                        </StatusRow>
                                        <StatusRow key={item.no_comment}>
                                            <StatusHeader>No Comment: </StatusHeader>
                                            <StatusContent>{item.no_comment}</StatusContent>
                                        </StatusRow>
                                    </StatusRow>
                                )
                            })
                        }
                    </span>
                </StatusBlock>
            ) : null}

        </TruthContainer>
    );
}