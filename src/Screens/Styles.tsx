import styled from "@emotion/styled";
import { getRandomNumberBetween, pickFrom } from "../Utils/NonSeededRandUtils";
import { replaceStringAt } from "../Utils/StringUtils";

// :) :) :)
export let FONTSIZE = 14;
export let FONTCOLOR = "#000000";
export let BGCOLOR = "#ffffff";
export let PADDINGRATIO = 1.0;
export let MARGINRATIO = 1.0;
export let BORDERRADIUS = 4;
export let BORDERRADIUSROUND = 13;
export let MENU_OPACITY = 1;

const CENTERRADIUS = 5;
const CENTERFONTSIZE = 14;
const CENTERRADIUSROUND =13;
const ORIGINALFONTCOLOR = "#000000";
const ORIGINALBGCOLOR = "#ffffff";
//this is configured by options
let ORIGINAL_MENU_OPACITY = 1;

export const setOpacity =(value: number) =>{
    MENU_OPACITY = value;
    ORIGINAL_MENU_OPACITY = value;
}


interface StyleRadius{
    mildRadius: number;
    fontColor: string;
}

interface StyleRadiusMedium{
    mediumRadius: number;
    fontColor: string;
}

interface MenuBoxProps{
    mediumRadius: number;
    fontSize: number;
    fontColor: string;
    bgColor: string;
    opacity: number;
}

//did something change? probably just your imagination.
export const fuckShitUpButOnlyALittle = () => {
    fuckUpRadius();
    fuckUpRadiusRound();
    fuckUpFontSize();
    fuckUpFontColor();
    fuckUpBGColor();
    fuckUpOpacity();

}

const fuckUpRadius =()=>{
    let direction = 1;
    if(Math.random() > .5){
        direction = -1;
    }
    BORDERRADIUS +=1*direction;
    if(Math.abs(BORDERRADIUS - CENTERRADIUS) > 10){
        BORDERRADIUS = CENTERRADIUS;
    }
}

const fuckUpOpacity =()=>{
    let direction = 1;
    if(Math.random() > .5){
        direction = -1;
    }
    MENU_OPACITY +=Math.random()/10*direction;
    if(Math.abs(MENU_OPACITY - ORIGINAL_MENU_OPACITY) > 0.04){
        MENU_OPACITY = ORIGINAL_MENU_OPACITY;
    }
}

const fuckUpFontColor = ()=>{
    const options = ["0","1","2","3"];
    const choice = pickFrom(options);
    FONTCOLOR = replaceStringAt(FONTCOLOR,getRandomNumberBetween(1,FONTCOLOR.length-1),choice);
    if(Math.random() > .9){
        FONTCOLOR = ORIGINALFONTCOLOR;
    }
}

const fuckUpBGColor = ()=>{
    const options = ["f","e"];
    let choice = pickFrom(options);
    for(let i = 1; i<BGCOLOR.length; i+=2){
        BGCOLOR = replaceStringAt(BGCOLOR,i,choice);
    }

    choice = pickFrom(options);
    for(let i = 2; i<BGCOLOR.length; i+=2){
        BGCOLOR = replaceStringAt(BGCOLOR,i,choice);
    }
    if(Math.random() > .9){
        BGCOLOR = ORIGINALBGCOLOR;
    }
}

const fuckUpFontSize =()=>{
    let direction = 1;
    if(Math.random() > .5){
        direction = -1;
    }
    FONTSIZE +=1*direction;
    if(Math.abs(FONTSIZE - CENTERFONTSIZE) > 3){
        FONTSIZE = CENTERFONTSIZE;
    }
}


const fuckUpRadiusRound =()=>{
    let direction = 1;
    if(Math.random() > .5){
        direction = -1;
    }
    BORDERRADIUSROUND +=1*direction;
    if(Math.abs(BORDERRADIUSROUND - CENTERRADIUSROUND) > 10){
        BORDERRADIUSROUND = CENTERRADIUSROUND;
    }
}

export const SkillBox = styled.div`
    border: 2px solid ${(props: StyleRadius) => props.fontColor};
    border-radius: ${(props: StyleRadius) => props.mildRadius }px;
    padding: 5px;
    display: flex;
    width: 600px;
    flex-wrap: wrap;
    margin: 10px;
`

export const AchivementBox = styled.div`
    border: 2px solid ${(props: StyleRadius) => props.fontColor};
    border-radius: ${(props: StyleRadius) => props.mildRadius }ppx;
    padding: 5px;
    display: flex;
    width: 600px;
    flex-wrap: wrap;
    margin: 10px;
`

export const Observer = styled.span`
    font-family: 'Courier New', monospace;
    font-weight: bold;
    color: red;
`;

export const Achivement = styled.div`
    border: 2px solid #000;
    border-radius: ${(props: StyleRadiusMedium) => props.mediumRadius}px;
    padding: 5px;
    background: #000;
    color: #000;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`

export const UnlockedAchivement = styled.div`
    border: 2px solid ${(props: StyleRadiusMedium) => props.fontColor};
    border-radius: ${(props: StyleRadiusMedium) => props.mediumRadius}px;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`

export const Skill = styled.div`
    border: 2px solid ${(props: StyleRadiusMedium) => props.fontColor};
    border-radius: ${(props: StyleRadiusMedium) => props.mediumRadius}px;
    padding: 5px;
    padding-left: 13px;
    padding-right: 13px;
    margin: 10px;
`

export const MenuBox = styled.div`
    padding: 10px;
    margin: 10px;
    opacity: ${(props: MenuBoxProps) => props.opacity};
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
    color:  ${(props: MenuBoxProps) => props.fontColor};
    background:  ${(props: MenuBoxProps) => props.bgColor};
    border: 3px solid ${(props: MenuBoxProps) => props.fontColor};
    border-radius: ${(props: MenuBoxProps) => props.mediumRadius}px;
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    font-size:  ${(props: MenuBoxProps) => props.fontSize}px;
    position: fixed;
    overflow: auto;
    left: 15%;
    top: 5%;
    height: 600px;
`

export const StatusBlock = styled.div`
    padding: 10px;
    margin: 10px;
    margin-left: auto;
    margin-right: auto;
    height: 500px;
`

export const StatusHeader = styled.div`
    font-weight: bold;
    width: 200px;
`

export const StatusContent = styled.div`
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


