import { Player } from "../Modules/Player";
import { StatusHeader, StatusRow, StatusBlock, StatusContent } from "./Styles";
import { Input } from "reakit/Input";
import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

export const CompanionsScreen = (props: StatusProps) => {

    const BuildingLine = styled.div`
    padding: 20px;
    font-size: 15px;
    width: 95%;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid black;
`
    const BuildingHeader = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 175px;

    `
    const BuildingSection = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 175px;
    `

    const Backstory = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 450px;
    `

    const observer = props.player.observer;

    const [currentName, setCurrentName] = useState(observer.cityName);

    const setCityName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        observer.cityName = ev.target.value;
        setCurrentName(ev.target.value);
    }

    return (
        <StatusBlock>

                <Fragment>
                    <div>
                        {props.player.companions.map((companion)=>{
                            return (
                            <BuildingLine>
                                <BuildingHeader>{companion.fullName}: </BuildingHeader>
                                <BuildingSection> {companion.title} </BuildingSection>
                                <Backstory> {companion.backstory} </Backstory>

                            </BuildingLine>)
                    })}
                    </div>
                </Fragment>
        </StatusBlock>);
}