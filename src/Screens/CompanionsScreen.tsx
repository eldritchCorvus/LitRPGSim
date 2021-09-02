import { Player } from "../Modules/Player";
import {StatusBlock } from "./Styles";
import React, { Fragment } from "react";
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
        font-weight: bolder;
        font-size: 18px;

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

    const Loyalty = styled.div`
        display: block;
        margin-right: 5px;
        width: 80px;
    `
    const Inventory = styled.div`
    display: block;
    margin-right: 5px;
    width: 180px;
`

    const observer = props.player.observer;

    return (
        <StatusBlock>

                <Fragment>
                    <div>
                        TODO hearts if Heart or Corruption, fill in level important in binary
                        {props.player.companions.map((companion)=>{
                            return (
                            <BuildingLine>
                                <BuildingHeader>{companion.fullName}: </BuildingHeader>
                                <BuildingSection> {companion.title} </BuildingSection>
                                <Backstory> {companion.backstory} </Backstory>
                                {observer.companionsMenuLevel > 1 ?<Loyalty><b>Loyalty</b>: {companion.loyalty}</Loyalty>:null}
                                {observer.companionsMenuLevel > 1 ?<Inventory><b>Inventory</b>: {companion.inventory.join(", ")}</Inventory>:null}

                            </BuildingLine>)
                    })}
                    </div>
                </Fragment>
        </StatusBlock>);
}