import styled from "@emotion/styled"
import { beepEffect } from "../../../.."

export const TBDChatBox = () => {

    const ChatContainer = styled.div`
        position: fixed;
        right: 15px;
        top: 15px;
        margin-top: 65px;
        height: 255px;
        width: 550px;
        color: white;
        text-decoration: none;
        border-radius: 2px;
        border: 5px solid #1f3f87;
        box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .4);
    `

    const ChatHeader = styled.div`
        height: 33px;
        color: white;
        background-color: #1f3f87;
        font-size: 14px;
        padding-left: 20px;
        text-align: center;
        vertical-align: middle;
        line-height: 26px;
    `

    const ChatBody = styled.div`
        color: #1f3f87;
        background-color: #f8fafa;
        width: 100%;
        height: 222px;
        div{
            margin-left: 15px;
            padding-top: 15px;
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


    return (
        <ChatContainer>

            <ChatHeader>
                theBestDude72 -- Instant Messaging
            </ChatHeader>
            <ChatBody>
                <div>TODO:
                    <li>x button (just minimizes it)</li>
                    <li>grab one chat</li>
                    <li>grab two chats, confirm right order</li>
                    <li>when run out of new chats, coffin</li>
                    <li>after coffin,it switches to a new source for  texts</li>
                    <li></li>
                    <li></li>

                </div>
            </ChatBody>

        </ChatContainer>
    )

}