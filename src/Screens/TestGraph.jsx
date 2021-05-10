import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import Cytoscape from 'cytoscape';
import cise from 'cytoscape-cise';
export default class TestGraph extends Component {

  state = {
    w: 0,
    h: 0,
    elements: [
      { data: { id: 'one', label: 'Node 1' } },
      { data: { id: 'two', label: 'Node 2' } },
      { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
   ]
  }

   layout = { 
    name: 'cise',
    nodeRepulsion: 1000000,
    allowNodesInsideCircle: true,
    maxRatioOfNodesInsideCircle: .3,
    idealInterClusterEdgeLengthCoefficient: 2.4,
    }; //cose-bilkent and spread work but are ugly
    
    //todo can use this with  stylesheet={stylesheet} in the compononent 
    //but for some reason it gets rid of labels.
     stylesheet = [
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


  componentDidMount = () => {
    Cytoscape.use( cise );
    this.setState({
      w:1000,
      h:1000
    })
    this.setUpListeners()
  }
  
  setUpListeners = () => {
    this.cy.on('click', 'node', (event) => {
      console.log(event.target)
    })
  }
  
  render() {
    return(
      <div>
        <CytoscapeComponent
            elements={this.state.elements}
            style={{ width: this.state.w, height: this.state.h }}
            layout={this.layout}   
            cy={(cy) => {this.cy = cy}}
        />
      </div>
    )
}
}