import { Player } from "../Modules/Player";
import { StatusHeader, StatusRow, StatusBlock, StatusContent } from "./Styles";
import { Input } from "reakit/Input";
import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

export const CityBuildingScreen = (props: StatusProps) => {

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

    const observer = props.player.observer;

    const [currentName, setCurrentName] = useState(observer.cityName);

    const setCityName = (ev: React.ChangeEvent<HTMLInputElement>) => {
        observer.cityName = ev.target.value;
        setCurrentName(ev.target.value);
    }

    //makes it so there is no city name till you get here, to enable "errors";
    useEffect(() => {
        observer.cityName = "Firsty";
        setCurrentName("Firsty");
    });

    return (
        <StatusBlock>
            <h1>{currentName}</h1>
            <StatusRow>
                <StatusHeader>Change City Name:</StatusHeader>
                <StatusContent><Input onChange={(ev) => { setCityName(ev) }} placeholder="Type Here"></Input></StatusContent>
            </StatusRow>
            <StatusRow>
                <StatusHeader>City Morale:</StatusHeader>
                <StatusContent>{observer.cityMorale}</StatusContent>
            </StatusRow>

            {observer.cityBuildingMenuLevel > 1 ? (
                <Fragment>
                    <div>
                        {props.player.buildings.map((building)=>{
                            return (
                            <BuildingLine>
                                <BuildingHeader>{building}: </BuildingHeader>
                                <BuildingSection>Status: Unbuilt </BuildingSection>
                                {observer.cityBuildingMenuLevel > 2 ?<BuildingSection>Assigned Leader: None </BuildingSection>:null}
                                {observer.cityBuildingMenuLevel > 2 ?<BuildingSection>Morale Boost: 0 </BuildingSection>:null}
                                {observer.cityBuildingMenuLevel > 2 ?<BuildingSection>Build Points: 0 </BuildingSection>:null}

                            </BuildingLine>)
                    })}
                    </div>
                </Fragment>
            ) : null}

        </StatusBlock>);
}