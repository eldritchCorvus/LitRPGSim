import { Fragment, useEffect } from "react"
import { Stat, StatMap } from "../../Modules/Stat"
import { titleCase } from "../../Utils/StringUtils"
import { OneCharAtATimeDiv } from "../OneCharAtATimeDiv"
import { StatusBlock, RageStyledButton, StatusRow, StatusHeader, StatusContent } from "../Styles"
import {Theme } from "../../Modules/Theme";

interface StatusProps {
    theme: Theme;
    bumpIndex: Function;
    goInfinite: Function;
}

export const ThemeMode = (props:StatusProps) => {
    const {theme, bumpIndex,goInfinite} =props; 

    interface StatProps {
        stat: Stat;
    }

    interface StatsProps {
        stats: StatMap;
    }

    const StatsSection = (props: StatsProps) => {
        return (
            <Fragment>
                {Object.keys(props.stats).map((key) => { return <StatSection key={key} stat={props.stats[key]} /> })}
            </Fragment>
        )
    }
    const StatSection = (props: StatProps) => {
        return (
            <div key={props.stat.name()}>{props.stat.name()}: {props.stat.absolute_value().toFixed(1)} </div>
        )
    }

    const submit = ()=>{
        console.log("JR NOTE: submitting theme")

        bumpIndex();
        goInfinite();
    }

    useEffect(()=>{
        window.addEventListener('keydown', submit);
        return ()=>{
            window.removeEventListener('keydown', submit)
        }
    }
    ,[])

    return(
        <StatusBlock>
                    <span>
                        <div style={{ height: "100px" }}><OneCharAtATimeDiv text={"Does it keep you here if I infodump about the Themes? They are the building blocks of everything that goes into my False Face."} /></div>
                        <RageStyledButton onClick={() => { 
                            submit();
                         }}> {">"} Okay?</RageStyledButton>
                        <StatusRow>
                            <StatusHeader>Theme: </StatusHeader>
                            <StatusContent>{titleCase(theme.key)}</StatusContent>
                        </StatusRow>
                        <StatusRow>
                            <StatusHeader>Stats: </StatusHeader>
                            <StatusContent>
                                <StatsSection stats={theme.stats} /></StatusContent>
                        </StatusRow>
                        {
                            Object.keys(theme.string_possibilities).map((item) => {
                                return (
                                    <StatusRow key={item}>
                                        <StatusHeader>{titleCase(item)}: </StatusHeader>
                                        <StatusContent>{theme.string_possibilities[item] ? theme.string_possibilities[item].join(", ") : "ERROR"}</StatusContent>
                                    </StatusRow>
                                )
                            })
                        }
                        <table className="infodump">
                            <tr><td>Question</td><td>Yes Response</td><td>No Response</td><td>Comment If Yes</td><td>Comment If No</td></tr>
                            <tbody>
                                {
                                    theme.memories.map((item, index) => {
                                        return (
                                            <tr key={item.question}>
                                                <td>{item.question}</td>
                                                <td>{item.yes_response}</td>
                                                <td>{item.no_response}</td>
                                                <td>{item.yes_comment}</td>
                                                <td>{item.no_comment}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </span>
                </StatusBlock>
    )
}