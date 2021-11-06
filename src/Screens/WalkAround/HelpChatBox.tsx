import styled from "@emotion/styled"

export const HelpChatBox = () => {

    const ChatContainer = styled.div`
        position: fixed;
        right: 15px;
        top: 15px;
        margin-top: 65px;
        height: 400px;
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
        background-color: white;
        font-size: 28px;
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

    return(
        <ChatContainer>
            
            <ChatHeader>
                <p>How can we help?</p>
                <p>If you know your parties extention, please type it here.</p>
                <p><input></input><StyledButton>Go</StyledButton></p>
                </ChatHeader>
            <ChatBody>
                Lorem ipsum
            </ChatBody>
            
        </ChatContainer>
    )

}