import {Player} from "../Modules/Player";
import Cytoscape from 'cytoscape';
import cise from 'cytoscape-cise';
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import {useState, useEffect} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { Skill } from "../Modules/Skill";
import { SKILLGRAPH} from "../Utils/constants";
import avsdf from 'cytoscape-avsdf';

interface SkillProps{
    player: Player;
    loadScreen: any; //function feeling lazy
}
//Cytoscape.use( avsdf );


export const  SkillGraphScreen = (props: SkillProps)=> {
    const exampleData = [
        { data: { id: 'one', label: 'Node 1' } },
        { data: { id: 'two', label: 'Node 2' } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
     ];
     //do type this
     const [graphData, setGraphData] = useState<any >(exampleData);
     const [cy, setCy] = useState<any>();

     useEffect(()=>{
         if(cy){
            cy.on('click', 'node', (event:any) => {
                console.log(event.target)
                props.player.unlockSkill(event.target.id());
                props.loadScreen(SKILLGRAPH)
                //extractGraphFromSkills(); //JR NOTE: both slow and buggy, doesn't actually show newly unlocked skills as changing despite rerendering
            })
        }
     }, [cy])

     let clusterInfo;
     const extractClusterInfoDeprecated = () => {
         return []; //NOTE this makes it look dumb.
         const all_seen:string[] = [];
         const ret:string[][] = []; //todo array of arrays where each array is the names of skills that are organized around a theme
         for(const key_skill of props.player.rootSkill.children){
             const inner_arr:string[] = [];
             console.log("looking for cluster of", key_skill.theme_keys);
             const key = key_skill.theme_keys[0]; //should only have one key if linked from root
             for(const skill of props.player.skills){
                 if(skill.theme_keys.includes(key) && !all_seen.includes(skill.name)){
                     inner_arr.push(skill.name);
                     all_seen.push(skill.name);
                 }
             }
             if(inner_arr.length > 0){
                 ret.push(inner_arr);
             }
         }
         return ret;
     }

     const extractGraphFromSkills =() =>{
        console.log("first skill is", props.player.skills[0]);
        
        const temp_data = props.player.rootSkill.convertToCytoscape();
        for(const skill of props.player.skills){
            if(skill != props.player.rootSkill){
                const temp_data2 = skill.convertToCytoscape();
                for(const item of temp_data2){
                    temp_data.push(item);
                }
            }
        }
        console.log("tempData is", temp_data);
        setGraphData(temp_data);
    }

     if(graphData === exampleData){
        extractGraphFromSkills();
    }

     const layout = { 
         name: 'breadthfirst',
         nodeRepulsion: 1000000,
         circle: true,
         seed: 13,
         allowNodesInsideCircle: true,
         maxRatioOfNodesInsideCircle: .3,
         idealInterClusterEdgeLengthCoefficient: 2.4,
         }; //cose-bilkent and spread work but are ugly
         
         //todo can use this with  stylesheet={stylesheet} in the compononent 
         //but for some reason it gets rid of labels.
         const stylesheet = [
            {
              selector: 'node',
              style: {
                width: 20,
                height: 20,
                shape: 'circle'
              }
            },
            {
              selector: 'edge',
              style: {
                width: 2
              }
            }
          ];

    return(
        <StatusBlock>
            <tbody>
                <StatusRow>
                    <TreeContent>
                    <CytoscapeComponent cy={(cy) => {setCy(cy)}} elements={graphData} layout={layout}  style={ { width: '2000px', height: '2000px' }  }/>
                    </TreeContent>
                </StatusRow>
            </tbody>
        </StatusBlock>
    )
}