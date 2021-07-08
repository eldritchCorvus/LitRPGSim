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

    const BuildingObject = styled.div`
    padding: 10px;
    
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
                    <StatusRow>
                        {props.player.buildings.map((building)=>{
                            return <BuildingObject>{building}</BuildingObject>

                        
                    })}
                    </StatusRow>
                </Fragment>
            ) : null}

        </StatusBlock>);
}