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
        <li>holy fuck blast from the past: http://demo.vhost.pandorabots.com/pandora/talk?botid=b24e32038e35520c</li>
        <li>tricks people into watching yugioh rps. literally. also steals their name, ofc.  fake contractor website (or people searches) (it is not a website) based on my Enemy that changes based on what you're searching for and is entirely fake, just trying to get you to fill out a form saying you're ready to enter Zampanio, shubbery repair</li>
        <li>loss pass intergration (all south)</li>
        <li>need to show the spiral behind it all</li>

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
* the rot itself (the past is corrupting faster and faste rand all you can do is hope to outrun it)

      </ul>
      
      <img width="50" onClick={()=>{(window as any).toggleIdleGameMode()}} src="http://farragofiction.com/ZampanioGoshShouldYouTrustThis/this_file_is_red.png" style={{cursor:"pointer"}} alt="This Is Not A Lie"/>
      <br></br>
      <br></br>
      <img width="50" onClick={()=>{(window as any).toggleShake()}} src="http://farragofiction.com/ZampanioGoshShouldYouTrustThis/this_file_is_red.png" style={{cursor:"pointer"}} alt="This Is Not A Lie"/>

    </Content>
  );
}

export default Layer1;
