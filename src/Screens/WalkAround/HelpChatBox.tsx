import styled from "@emotion/styled"

export const HelpChatBox = () => {

    const ChatContainer = styled.div`
        position: fixed;
        right: 15px;
        top: 15px;
        margin-top: 65px;
        height: 500px;
        width: 300px;
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
    `

    return (
        <ChatContainer>

            <ChatHeader>
                <p>How can we help?</p>
                <p>If you know your parties extention, please type it here.</p>
                <p><input></input><StyledButton>Go</StyledButton></p>
            </ChatHeader>
            <ChatBody>
                <CustomerServiceHell>
                    <ChatLine>
                        <ChatIcon>ED</ChatIcon>
                        <ChatText>Hi there! You can begin by asking your question below! Someone will be with you shortly. Due to call volume, restriced text only mode has been initiated. Thank you for your patience!</ChatText>
                    </ChatLine>
                </CustomerServiceHell>


                <ChatOptions>
                <ChatOption>TODO: add a JRResponse and Memory to state. these are the options. text of it is at top. but theres memory too. Memory is they said you said. </ChatOption>
                    <ChatOption>I would like to report a bug with Zampanio.</ChatOption>
                    <ChatOption>I would like to request a Zampanio Community Edition Guide.</ChatOption>
                    <ChatOption>I would like to claim my free gift.</ChatOption>
                    <ChatOption>I would like to speak with an Operator.</ChatOption>


                </ChatOptions>
            </ChatBody>

        </ChatContainer>
    )

}