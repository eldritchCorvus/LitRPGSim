import styled from "@emotion/styled"
import { FormEvent, useEffect, useRef, useState } from "react"
import { getRandomNumberBetween } from "../../Utils/NonSeededRandUtils"
import { PlayerResponse } from "../Attic/PlayerResponse"
import { HelloWorld, initial_directory } from "./BranchStorage"
import { CustomerServiceRamble } from "./CustomerServiceRamble"

export const HelpChatBox = () => {

    const ChatContainer = styled.div`
        position: fixed;
        right: 15px;
        top: 15px;
        margin-top: 65px;
        height: 500px;
        width: 350px;
        color: white;
        text-decoration: none;
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
        overflow: auto;
        height: 90px;
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
        height: 400px;
        overflow: auto;
    `

    interface DirectoryMap {
        [extension: number]: CustomerServiceRamble;
    }

    //has initial values in it, but also as the labrynth expands new things get added
    const initialExtension = 0;
    const [directory, setDirectory] = useState<DirectoryMap>(initial_directory);
    const [currentRamble, setCurrentRamble] = useState(initial_directory[initialExtension]);
    const [memory, setMemory] = useState<string[][]>([]);
    const [currentLines, setCurrentLines] = useState<string[][]>([]);
    const [extension, setExtension] = useState(initialExtension);
    const extensionRef = useRef<HTMLInputElement>(null);


    const processNextRamble = (response: PlayerResponse) => {
        console.log("JR NOTE: processing next ramble")
        setMemory([...memory,...currentLines, ["", response.text]], );
        setCurrentRamble((response.jr_response_function()));
    }

    const goToExtension =(extension: number)=>{
        setMemory([]);
        setCurrentLines([]);
        if((extension in directory) ){
            setCurrentRamble(directory[extension]);
        }else{
            setCurrentRamble(directory[1]);
        }
    }



    useEffect(() => {
        const parts = currentRamble.text.split("\n");
        console.log("JR NOTE: parts are", parts);

        const nextPart = (remaining_parts: string[], processedParts: string[][]) => {
            console.log("JR NOTE: processing next part, remaining parts are", remaining_parts, "and already processed is", processedParts)
            if (remaining_parts.length === 0) {
                return;
            }
            const part = remaining_parts[0];
            setTimeout(() => {
                if(part != ""){
                    processedParts = [...processedParts,[currentRamble.initials, part]];
                    setCurrentLines(processedParts);
                }
                nextPart(remaining_parts.slice(1), processedParts);
            }, getRandomNumberBetween(1, parts.indexOf(part))*1000);
        }
        nextPart(parts, []);

    }, [currentRamble]);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if(extensionRef.current){
            setExtension(parseInt(extensionRef.current.value));
            goToExtension(parseInt(extensionRef.current.value));

        }
        return false;
    }

    return (
        <ChatContainer>

            <ChatHeader>
                <p>How can we help?</p>
                <p>If you know your parties extention, please type it here.</p>
                <p>
                <form action="" method="post" onSubmit={onSubmit}> 
                    <input ref={extensionRef} defaultValue={extension}></input>
                    <StyledButton>Go</StyledButton>

                    </form>
                    </p>
            </ChatHeader>
            <ChatBody>
                <CustomerServiceHell>
                    {memory.map((m) => {
                        return (
                            <ChatLine>
                                {m[0] !== "" ? (<ChatIcon>{m[0]}</ChatIcon>) : null}
                                <ChatText>{m[1]}</ChatText>
                            </ChatLine>)
                    })}
                    {currentLines.map((m) => {
                        return (
                            <ChatLine>
                                {m[0] !== "" ? (<ChatIcon>{currentRamble.initials}</ChatIcon>) : null}
                                <ChatText>{m[1]}</ChatText>
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