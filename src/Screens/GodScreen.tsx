import { Player } from "../Modules/Player";
import { StatusHeader, StatusRow, StatusBlock, StatusContent } from "./Styles";
import { Input } from "reakit/Input";
import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { God } from "../Modules/God";
import { titleCase } from "../Utils/StringUtils";
interface StatusProps {
    player: Player;
    loadScreen: any; //function
}
interface GodProps {
    god: God;
}


export const GodSection = (props: GodProps) => {

    const Name = styled.div``;
    const Domains = styled.div``;
    const AcolyteBonus = styled.div``;


    const StyledGodSection = styled.div`
    padding: 20px;
    font-size: 15px;
    width: 95%;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid black;
`


    const { god } = props;

    return (
        <StatusBlock>

            <StyledGodSection>
                <Name>{god.name}</Name>
                <Domains>Domains: {(god.domains.map((domain)=>{return titleCase(domain.key)}).join(","))}</Domains>

            </StyledGodSection>
        </StatusBlock>);
}

export const GodScreen = (props: StatusProps) => {

    const Container = styled.div`
    display: flex;
    `


    const observer = props.player.observer;
    const { player } = props;

    return (
        <StatusBlock>

            <Container>
                <GodSection god={player.gods[0]}></GodSection>
                <GodSection god={player.gods[1]}></GodSection>

            </Container>
        </StatusBlock>);
}