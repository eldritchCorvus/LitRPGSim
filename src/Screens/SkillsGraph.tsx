import {Player} from "../Modules/Player";
import Cytoscape from 'cytoscape';
import COSEBilkent from 'cytoscape-cose-bilkent';
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import {useState} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Skill } from "../Modules/Skill";
interface SkillProps{
    player: Player;
}
Cytoscape.use( COSEBilkent );

export const  SkillGraphScreen = (props: SkillProps)=> {
    const exampleData = [
        { data: { id: 'one', label: 'Node 1' } },
        { data: { id: 'two', label: 'Node 2' } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
     ];
     //do type this
     const [graphData, setGraphData] = useState<any >(exampleData);

     const extractGraphFromSkills =() =>{
        console.log("first skill is", props.player.skills[0]);
        
        const temp_data = props.player.rootSkill.convertToCytoscape();
        for(const skill of props.player.skills){
            const temp_data2 = skill.convertToCytoscape();
            for(const item of temp_data2){
                temp_data.push(item);
            }
        }
        console.log("tempData is", temp_data);
        setGraphData(temp_data);
    }

     if(graphData === exampleData){
        extractGraphFromSkills();
    }

     const layout = { name: 'cose-bilkent',idealEdgeLength:200 }; //TODO i can't get this working

    return(
        <StatusBlock>
            <tbody>
                <StatusRow>
                    <TreeContent>
                    <CytoscapeComponent elements={graphData} layout={layout}  style={ { width: '1000px', height: '1000px' } }/>
                    </TreeContent>
                </StatusRow>
            </tbody>
        </StatusBlock>
    )
}