import {Player} from "../Modules/Player";
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import Tree from 'react-d3-tree';
import {useState} from 'react';
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
interface SkillProps{
    player: Player;
}



export const  SkillScreen = (props: SkillProps)=> {

    const exampleData = {
        name: ':) :) :)',
        children: [],
      };

    const [treeData, setTreeData] = useState<RawNodeDatum >(exampleData);

    const extractGraphFromSkills =() =>{
        console.log("first skill is", props.player.skills[0]);
        const tempData = props.player.skills[0].convertToTree();
        setTreeData(tempData);
    }

    if(treeData === exampleData){
        extractGraphFromSkills();
    }

    return(
        <StatusBlock>
            <tbody>
                <StatusRow>
                    <TreeContent>
                        <div id="treeWrapper" style={{ width: '950px', height: '1000px' }}>
                            <Tree data={treeData} />
                        </div>
                    </TreeContent>
                </StatusRow>
            </tbody>
        </StatusBlock>
    )
}