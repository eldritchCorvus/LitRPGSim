import {Player} from "../Modules/Player";
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import {useState} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
interface SkillProps{
    player: Player;
}

export const  SkillGraphScreen = (props: SkillProps)=> {
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
     ];


     const layout = { name: 'euler' }; //TODO i can't get this working

    return(
        <StatusBlock>
            <tbody>
                <StatusRow>
                    <TreeContent>
                    <CytoscapeComponent elements={elements}  style={ { width: '1000px', height: '1000px' } }/>
                    </TreeContent>
                </StatusRow>
            </tbody>
        </StatusBlock>
    )
}