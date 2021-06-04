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

export const StatusBlock = styled.table`
    padding: 10px;
    margin: 10px;
    border: 3px solid black;
    border-radius: 3px;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    height: 1000px;
`

export const StatusHeader = styled.td`
    font-weight: bold;
    width: 200px;
`

export const StatusContent = styled.td`
    color: black;
`

export const TreeContent = styled.td`
    color: black;
    height: 1000px;
    width: 1000px;
    overflow: hidden;
`

export const StatusRow = styled.tr `
    display: flex;
    padding: 10px;
`