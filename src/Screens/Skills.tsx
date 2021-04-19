import {Player} from "../Modules/Player";
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import Tree from 'react-d3-tree';
interface SkillProps{
    player: Player;
}

const orgChart = {
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


export const  SkillScreen = (props: SkillProps)=> {
    return(
        <StatusBlock>
            <tbody>
                <StatusRow>
                    <TreeContent>
                        <div id="treeWrapper" style={{ width: '950px', height: '1000px' }}>
                            <Tree data={orgChart} />
                        </div>
                    </TreeContent>
                </StatusRow>
            </tbody>
        </StatusBlock>
    )
}