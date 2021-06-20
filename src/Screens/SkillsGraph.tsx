import {Player} from "../Modules/Player";
import Cytoscape from 'cytoscape';
import {StatusRow, StatusBlock,TreeContent} from "./Styles";
import {useState, useEffect} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { SKILLGRAPH} from "../Utils/constants";
import klay from 'cytoscape-klay';

interface SkillProps{
    player: Player;
    loadScreen: any; //function feeling lazy
}
Cytoscape.use( klay );


export const  SkillGraphScreen = (props: SkillProps)=> {
    const exampleData = [
        { data: { id: 'one', label: 'Node 1' } },
        { data: { id: 'two', label: 'Node 2' } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
     ];
     //do type this
     const [graphData, setGraphData] = useState<any >(exampleData);
     const [cy, setCy] = useState<any>();
     const {player, loadScreen} = props;

     useEffect(()=>{
         if(cy){
             for(const node of cy.nodes()){
                 if(node.data().id === player.lastUnlockedSkill.cytoscapeID()){
                     console.log("panning to", node.position());
                    cy.pan(node.position());
                 }
             }
             //TODO can i somehow pan to a specific node?
            cy.on('click', 'node', (event:any) => {
                console.log(event.target)
                player.unlockSkill(event.target.id());
                loadScreen(SKILLGRAPH)
                //extractGraphFromSkills(); //JR NOTE: both slow and buggy, doesn't actually show newly unlocked skills as changing despite rerendering
            })
        }
     }, [cy, player, loadScreen])

     const extractGraphFromSkills =() =>{
        console.log("first skill is", props.player.skills[0]);
        
        const temp_data = props.player.rootSkill.convertToCytoscape();
        for(const skill of props.player.skills){
            if(skill !== props.player.rootSkill){
                const temp_data2 = skill.convertToCytoscape();
                for(const item of temp_data2){
                    temp_data.push(item);
                }
            }
        }
        setGraphData(temp_data);
    }

     if(graphData === exampleData){
        extractGraphFromSkills();
    }

     const layout = { 
         name: 'klay',
         circle: false,
         directed: true,
         seed: 13,
         spacingFactor: 0.75,
         fit: false,
         roots: ["Status"],
         nodeDimensionsIncludeLabels: true,
         klay: {
            // Following descriptions taken from http://layout.rtsys.informatik.uni-kiel.de:9444/Providedlayout.html?algorithm=de.cau.cs.kieler.klay.layered
            addUnnecessaryBendpoints: false, // Adds bend points even if an edge does not change direction.
            aspectRatio: 1.0, // The aimed aspect ratio of the drawing, that is the quotient of width by height
            borderSpacing: 20, // Minimal amount of space to be left to the border
            compactComponents: true, // Tries to further compact components (disconnected sub-graphs).
            crossingMinimization: 'LAYER_SWEEP', // Strategy for crossing minimization.
            /* LAYER_SWEEP The layer sweep algorithm iterates multiple times over the layers, trying to find node orderings that minimize the number of crossings. The algorithm uses randomization to increase the odds of finding a good result. To improve its results, consider increasing the Thoroughness option, which influences the number of iterations done. The Randomization seed also influences results.
            INTERACTIVE Orders the nodes of each layer by comparing their positions before the layout algorithm was started. The idea is that the relative order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive layer sweep algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
            cycleBreaking: 'GREEDY', // Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges (that is, reversed edges will point left if edges usually point right).
            /* GREEDY This algorithm reverses edges greedily. The algorithm tries to avoid edges that have the Priority property set.
            INTERACTIVE The interactive algorithm tries to reverse edges that already pointed leftwards in the input graph. This requires node and port coordinates to have been set to sensible values.*/
            direction: 'RIGHT', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
            /* UNDEFINED, RIGHT, LEFT, DOWN, UP */
            edgeRouting: 'SPLINES', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
            edgeSpacingFactor: 0.33, // Factor by which the object spacing is multiplied to arrive at the minimal spacing between edges.
            feedbackEdges: false, // Whether feedback edges should be highlighted by routing around the nodes.
            fixedAlignment: 'NONE', // Tells the BK node placer to use a certain alignment instead of taking the optimal result.  This option should usually be left alone.
            /* NONE Chooses the smallest layout from the four possible candidates.
            LEFTUP Chooses the left-up candidate from the four possible candidates.
            RIGHTUP Chooses the right-up candidate from the four possible candidates.
            LEFTDOWN Chooses the left-down candidate from the four possible candidates.
            RIGHTDOWN Chooses the right-down candidate from the four possible candidates.
            BALANCED Creates a balanced layout from the four possible candidates. */
            inLayerSpacingFactor: 1.0, // Factor by which the usual spacing is multiplied to determine the in-layer spacing between objects.
            layoutHierarchy: true, // Whether the selected layouter should consider the full hierarchy
            linearSegmentsDeflectionDampening: 0.3, // Dampens the movement of nodes to keep the diagram from getting too large.
            mergeEdges: false, // Edges that have no ports are merged so they touch the connected nodes at the same points.
            mergeHierarchyCrossingEdges: true, // If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible.
            nodeLayering:'INTERACTIVE', // Strategy for node layering.
            /* NETWORK_SIMPLEX This algorithm tries to minimize the length of edges. This is the most computationally intensive algorithm. The number of iterations after which it aborts if it hasn't found a result yet can be set with the Maximal Iterations option.
            LONGEST_PATH A very simple algorithm that distributes nodes along their longest path to a sink node.
            INTERACTIVE Distributes the nodes into layers by comparing their positions before the layout algorithm was started. The idea is that the relative horizontal order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive node layering algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
            nodePlacement:'SIMPLE', // Strategy for Node Placement
            /* BRANDES_KOEPF Minimizes the number of edge bends at the expense of diagram size: diagrams drawn with this algorithm are usually higher than diagrams drawn with other algorithms.
            LINEAR_SEGMENTS Computes a balanced placement.
            INTERACTIVE Tries to keep the preset y coordinates of nodes from the original layout. For dummy nodes, a guess is made to infer their coordinates. Requires the other interactive phase implementations to have run as well.
            SIMPLE Minimizes the area at the expense of... well, pretty much everything else. */
            randomizationSeed: props.player.rand.initial_seed, // Seed used for pseudo-random number generators to control the layout algorithm; 0 means a new seed is generated
            routeSelfLoopInside: false, // Whether a self-loop is routed around or inside its node.
            separateConnectedComponents: true, // Whether each connected component should be processed separately
            spacing: 50, // Overall setting for the minimal amount of space to be left between objects
            thoroughness: 85 // How much effort should be spent to produce a nice layout..
          }
         }; //cose-bilkent and spread work but are ugly

    return(
        <StatusBlock>
            <span>
                <StatusRow>
                    <TreeContent>
                    <CytoscapeComponent cy={(cy) => {setCy(cy)}} elements={graphData} layout={layout}  style={ { width: '1000px', height: '1000px' }  }/>
                    </TreeContent>
                </StatusRow>
            </span>
        </StatusBlock>
    )
}