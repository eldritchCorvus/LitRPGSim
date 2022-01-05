import styled from "@emotion/styled"

interface TBDChatLineType {
    line: string;
}

export const ProcessedChatLine: React.FC<TBDChatLineType> = ({line}) => {
    const OdinsRazor = styled.span`
        color: red;
    `

    const TheBestDude = styled.span`
        color: blue;
    `

    const ChatLine = styled.div`
        font-weight: bolder;
        width: 90%;
        line-height: 20px;
    `   

    const TextContent = styled.span`
        color: black;
    `
    const parts = line.split(":");
    const username = parts[0];
    parts.shift();
    const text = parts.join(":");
    return (
        <ChatLine>
            {username !== "odinsRazor"? <TheBestDude>{username}</TheBestDude>:<OdinsRazor>{username}</OdinsRazor>}
            <TextContent>:{text}</TextContent>
        </ChatLine>
    )
}