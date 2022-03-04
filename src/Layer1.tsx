import styled from "@emotion/styled";
import { useEffect } from "react";
import { CoreConcept } from "./CoreConcept";
export const Content = styled.div`
    position: fixed;
    top: 50px;
    left: 50px;
`

type LayerParams = {
  concept: CoreConcept;
}
const Layer1:React.FC<LayerParams> =({concept})=> {

  useEffect(()=>{
    console.log(`%c${concept.consoleThought}`, "font-weight: bold;font-family: 'Courier New', monospace;color:#06FFC9; background: #346F3F; padding:10px; border-radius: 13px; font-size:13px;");

  },[concept])
  return (
    <Content>
      <div dangerouslySetInnerHTML={{__html:concept.truthThought}}/>
      <ul>
        <li>shout out to weaver if you get more than 1000 cars</li>
        <li>idlegame mode (jr walks south on their own)</li>
        <li>loss pass intergration (all south)</li>
        <li>add truth fic link (raw html page like losspass)</li>
        <li>need to show the spiral behind it all</li>
        <li>you never know what bits of the past leak into the present</li>
        <li>In addition to corrupting the room, the Rot does a RotX cipher on it. For nearly no reason other than to make things harder on everyone. Code rot makes it harder and harder to debug wigglersim</li>

Object Ideas:
*moon (maze madness and lunar colony)
* jaimie
*HeartlessBot
* the aspects/fears
*the sources of various characters
* my experience with corporate life
*the nature of the maze that is the code base
* pigeons
*the 9 artifacts

      </ul>
      
      <img onClick={()=>{(window as any).toggleIdleGameMode()}} src="http://farragofiction.com/ZampanioGoshShouldYouTrustThis/this_file_is_red.png" style={{cursor:"pointer"}} alt="This Is Not A Lie"/>

    </Content>
  );
}

export default Layer1;
