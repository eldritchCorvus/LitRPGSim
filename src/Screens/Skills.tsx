import {Player} from "../Modules/Player";
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import Tree from 'react-d3-tree';
import {useState} from 'react';
interface SkillProps{
    player: Player;
}






export const  SkillScreen = (props: SkillProps)=> {

    const exampleData = {
        name: 'CEO',
        children: [
          {
            name: 'Manager',
            attributes: {
              department: 'Production',
            },
            children: [
              {
                name: 'Foreman',
                attributes: {
                  department: 'Fabrication',
                },
                children: [
                  {
                    name: 'Worker',
                  },
                ],
              },
              {
                name: 'Foreman',
                attributes: {
                  department: 'Assembly',
                },
                children: [
                  {
                    name: 'Worker',
                  },
                ],
              },
            ],
          },
        ],
      };

    const [treeData, setTreeData] = useState(exampleData);

    const extractGraphFromSkills =() =>{

    }

    if(treeData === exampleData){
       // extractGraphFromSkills();
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