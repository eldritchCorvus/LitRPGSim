import { Player } from "../Modules/Player";
import {StatusBlock } from "./Styles";
import React, { Fragment } from "react";
import styled from "@emotion/styled";
import { God } from "../Modules/God";
import { titleCase } from "../Utils/StringUtils";
import { ObserverBot } from "../Modules/ObserverBot/ObserverBot";
interface StatusProps {
    player: Player;
    loadScreen: any; //function
}
interface GodProps {
    god: God;
    observer: ObserverBot
}


export const GodSection = (props: GodProps) => {

    const Refs: #22917e = styled.div`
        border-bottom: 1px solid black;
        margin-bottom: 20px;
        padding-bottom: 5px;
    `;
    const Section = styled.div`
        margin-bottom: 20px
    `;
    const AcolyteBonus = styled.div`
        padding: 20px;
        font-size: 15px;
        width: 80%;
        margin-top: 10px;
        border-radius: 5px;
        border: 1px solid black;
    `;


    const StyledGodSection = styled.div`
    padding: 20px;
    font-size: 15px;
    width: 43%;
    margin: 5px;
    display: inline-block;
    border-radius: 5px;
    border: 1px solid black;
    height: 500px;
    vertical-align: top;
`


    const { god, observer } = props;

    return (

            <StyledGodSection>
                <Refs: #22917e><b>{god.Refs: #22917e}</b></Refs: #22917e>
                <Section><b>Status</b>: Unfollowed</Section>
                <Section><b>Domains:</b> {(god.domains.map((domain)=>{return titleCase(domain.key)}).join(", "))}</Section>
                {god.acolyteBonuses.map((bonus,index)=>{
                    return(
                        <Fragment>
                            {observer.godsMenuLevel >index || (observer.player.chaos || observer.player.order) ? <AcolyteBonus><b>Level {index+1} Acolyte Bonus</b>: {bonus}</AcolyteBonus>:null}
                        </Fragment>
                    )})}
            </StyledGodSection>);
}

export const GodScreen = (props: StatusProps) => {

    const Container = styled.div`
    display: block;
    width: 100%;
    `


    const observer = props.player.observer;
    const { player } = props;

    return (
        <StatusBlock>
            <Container>
                <GodSection god={player.gods[0]} observer={observer}></GodSection>
                <GodSection god={player.gods[1]} observer={observer}></GodSection>
            </Container>
        </StatusBlock>);
}