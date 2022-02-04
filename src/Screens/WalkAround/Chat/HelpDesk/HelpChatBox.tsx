import styled from "@emotion/styled"
import { FormEvent, useEffect, useRef, useState } from "react"
import { getRandomNumberBetween } from "../../../../Utils/NonSeededRandUtils"
import { PlayerResponse } from "../../../Attic/PlayerResponse"
import { CURRENT_EXTENSION, CURRENT_NAME, CURRENT_TITLE, HelloWorld, initial_directory, NEXT_EXTENSION, NEXT_TITLE, randomSpecialist } from "./BranchStorage"
import { CustomerSupportSpecialist } from "../../CustomerSupportSpecialist"
import { beepEffect } from "../../../.."

export const HelpChatBox = () => {

    const ChatContainer = styled.div`
        position: fixed;
        right: 15px;
        top: 15px;
        margin-top: 65px;
        height: 515px;
        width: 350px;
        color: white;
        text-decoration: none;
        z-index: 10;
        border-radius: 2px;
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .4);
    `

    const ChatHeader = styled.div`
        height: 100px;
        color: white;
        background-color: #1f3f87;
        font-size: 14px;
        padding: 20px;
        p{
            margin-left: 15px;
        }
    `

    const ChatBody = styled.div`
        color: #1f3f87;
        background-color: #f8fafa;
        width: 100%;
        height: 100%;
        p{
            margin-left: 15px;
        }
    `

    const StyledButton = styled.button`
        color: #1f3f87;
        background: whie;
    `

    const ChatLine = styled.div`
        padding: 5px;
    `

    const ChatOptions = styled.div`
        padding: 5px;
        margin-top: 15px;
        overflow: auto;
        height: 190px;
    `

    const ChatIcon = styled.div`
        clip-path: circle(50% at 50% 50%);
        -webkit-clip-path: circle(43% at 50% 50%);
        display: inline-block;
        background-color: #1f3f87;
        color: white;
        padding: 15px;
        font-size: 16px;
        line-height: 10px;
        vertical-align: top;
    `

    const ChatText = styled.div`
        background: white;
        font-size; 14px;
        display: inline-block;
        width: 200px;
        margin-left: 10px;
        border: 1px solid #c4c4c4;
        padding: 10px;
        border-radius: 8px;
    `

    const ChatOption = styled.div`
        background: #1f3f87;
        font-size; 14px;
        color: white;
        display: inline-block;
        width: 225px;
        margin-left: 10px;
        margin-bottom: 8px;
        border: 1px solid #c4c4c4;
        padding: 10px;
        border-radius: 8px;
    `

    const CustomerServiceHell = styled.div`
        height: 300px;
        overflow: auto;
    `

    interface DirectoryMap {
        [extension: string]: CustomerSupportSpecialist;
    }

    //has initial values in it, but also as the labrynth expands new things get added
    const initialExtension = "0";
    //JR NOTE: if i cared about this NOT being a labrynth i could collapse the state. suffer as i have suffered.
    const [directory, setDirectory] = useState<DirectoryMap>(initial_directory);
    const [currentSpecialist, setCurrentSpecialist] = useState(initial_directory[initialExtension]);
    const [nextSpecialist, setNextSpecialist] = useState(initial_directory[initialExtension]);
    const [initialTime] = useState(new Date());

    const [currentRamble, setCurrentRamble] = useState(initial_directory[initialExtension].ramble);
    const [memory, setMemory] = useState<string[][]>([]);
    const [currentLines, setCurrentLines] = useState<string[][]>([]);
    const [extension, setExtension] = useState(initialExtension);
    const extensionRef = useRef<HTMLInputElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        setCurrentRamble(currentSpecialist.ramble);
        const time = (Date.now() - (initialTime as any));
        setNextSpecialist(randomSpecialist(Math.round(time/1000/60) ));
    },[currentSpecialist])

    useEffect(()=>{
        if(!(nextSpecialist.extension in directory)){
            const tmp = {...directory}
            tmp[nextSpecialist.extension] = nextSpecialist;
            setDirectory(tmp)
        }

    }, [nextSpecialist,directory])



    const processNextRamble = (response: PlayerResponse) => {
        setMemory([...memory,...currentLines, ["", response.text]], );
        setCurrentRamble((response.jr_response_function()));
    }

    const goToExtension =(extension: string)=>{
        setMemory([]);
        setCurrentLines([]);
        if((extension in directory) ){
            setCurrentSpecialist(directory[extension])
            //setCurrentRamble(directory[extension].ramble);
        }else{
            setCurrentSpecialist(directory[1])
            //setCurrentRamble(directory[1].ramble);
        }
    }

    const processScriptingTags = (input: string)=>{
        let tmp = input.replaceAll(CURRENT_NAME,currentSpecialist.name);
        tmp = tmp.replaceAll(NEXT_TITLE,nextSpecialist.title);
        tmp = tmp.replaceAll(CURRENT_TITLE,currentSpecialist.title);
        tmp = tmp.replaceAll(NEXT_EXTENSION,`${nextSpecialist.extension}`);
        tmp = tmp.replaceAll(CURRENT_EXTENSION,`${currentSpecialist.extension}`);
        return tmp;
    }



    useEffect(() => {
        const parts = currentRamble.text.split("\n");

        const nextPart = (remaining_parts: string[], processedParts: string[][]) => {
            if (remaining_parts.length === 0) {
                return;
            }
            const part = remaining_parts[0];
            setTimeout(() => {
                if(part != ""){
                    processedParts = [...processedParts,[currentSpecialist.initials, part]];
                    beepEffect();
                    setCurrentLines(processedParts);
                }
                nextPart(remaining_parts.slice(1), processedParts);
                if(chatRef.current){
                    chatRef.current.scrollTop = chatRef.current.scrollHeight;
                }
            }, getRandomNumberBetween(1, parts.indexOf(part))*1000*getRandomNumberBetween(1,5));
        }
        nextPart(parts, []);

    }, [currentRamble]);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(extensionRef.current){
            setExtension((extensionRef.current.value));
            goToExtension((extensionRef.current.value).toLowerCase());

        }
        return false;
    }

    console.log("JR NOTE: rerendering help desk")
    return (
        <ChatContainer>

            <ChatHeader>
                <p>How can we help?</p>
                <p>If you know your party's extention, please type it here.</p>
                <p>
                <form action="" method="post" onSubmit={onSubmit}> 
                    <input ref={extensionRef} defaultValue={extension}></input>
                    <StyledButton>Go</StyledButton>

                    </form>
                    </p>
            </ChatHeader>
            <ChatBody>
                <CustomerServiceHell ref={chatRef}>
                    {memory.map((m) => {
                        return (
                            <ChatLine>
                                {m[0] !== "" ? (<ChatIcon>{m[0]}</ChatIcon>) : null}
                                <ChatText>{processScriptingTags(m[1])}</ChatText>
                            </ChatLine>)
                    })}
                    {currentLines.map((m) => {
                        return (
                            <ChatLine>
                                {m[0] !== "" ? (<ChatIcon>{currentSpecialist.initials}</ChatIcon>) : null}
                                <ChatText>{processScriptingTags(m[1])}</ChatText>
                            </ChatLine>)
                    })}
                </CustomerServiceHell>


                <ChatOptions>
                    {currentRamble.potential_reponses.map((response) => {
                        return (
                            <ChatOption onClick={() => { processNextRamble(response) }}> {response.text}</ChatOption>
                        )
                    })}


                </ChatOptions>
            </ChatBody>

        </ChatContainer>
    )

}