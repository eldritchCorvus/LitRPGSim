import styled from "@emotion/styled";

export const SkillBox = styled.div`
    border: 2px solid black;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    margin: 10px;
`

export const Observer = styled.span`
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: red;
`;

export const Skill = styled.div`
    border: 2px solid black;
    border-radius: 13px;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`

export const StatusBlock = styled.div`
    padding: 10px;
    margin: 10px;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
    background: white;
    border: 3px solid black;
    border-radius: 13px;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    position: fixed;
    overflow: scroll;
    left: 25%;
    top: 5%;
    height: 750px;
`

export const StatusHeader = styled.div`
    font-weight: bold;
    width: 200px;
`

export const StatusContent = styled.div`
    color: black;
`

export const TreeContent = styled.div`
    color: black;
    height: 1000px;
    width: 1000px;
    overflow: hidden;
`

export const StatusRow = styled.div `
    display: flex;
    padding: 10px;
`