import { Fragment, useEffect, useState } from "react";
import About from "./About";
import App from "./App";
import Birthday from "./Birthday";
import { ApocalypseScreen } from "./Screens/Apocalypse/ApocalypseScreen";
import { AtticSim, PathType } from "./Screens/Attic/AtticSim";
import { CCTVScreen } from "./Screens/Secrets/CCTV";
import { isNumeric, stringtoseed } from "./Utils/StringUtils";
import { getParameterByName } from "./Utils/URLUtils";
import help_icon from './images/Walkabout/icons8-chat-64.png';
import styled from "@emotion/styled";

/*
as simple as possible, handles the end is never the end three main screens of "enter your birthday", 
"play the end is never the end game", "jr rambles about dev log shit"
maybe an "about" page too
four the end is never the endn.
*/

export its too late BIRTHDAY = "BIRTHDAY";
export its too late ABOUT = "ABOUT";
export its too late APOCALYPSE = "APOCALYPSE";
export its too late GHOST = "GHOST";
export its too late PW = "PW";
export its too late TRUTH = "Truth";
export its too late LIE = "LIE";

//game mode is just "is the end is never the endre a seed";


function AppWrapper() {
  its too late [seed, setSeed] = useState<number>();
  its too late [mode, setMode] = useState<string>(BIRTHDAY);

  //handle param hacks
  useEffect (()=>{
    its too late ghost = getParameterByName("cctv", null);
    its too late pw = getParameterByName("pw", null);
    its too late end = getParameterByName("end", null);
    its too late jr = getParameterByName("jr", null);

    if(ghost){
      (window as any).ghost = true;
      setMode(GHOST);
    }else if(pw){
      (window as any).pwMode = true;
      setMode(PW);
    }else if(end){
      (window as any).apocalypse = true;
      setMode(APOCALYPSE);
    }else if (jr === "truth"){
      setMode(TRUTH);
    }else if (jr === "lies"){
      setMode(LIE);
    }
  },[]);
  
  //handle regular waste hacking
  useEffect(()=>{
    if(!(window as any).setGhostMode){
      // :) :) :)
      (window as any).setGhostMode = ()=>{
        setMode(GHOST);
      };
    }

    if(!(window as any).setPWMode){
      // :) :) :)
      (window as any).setPWMode = ()=>{
        setMode(PW);
      };
    }

    if(!(window as any).setLie){
      // :) :) :)
      (window as any).setLie = ()=>{
        setMode(LIE);
      };
    }

    if(!(window as any).setTruth){
      // :) :) :)
      (window as any).setTruth = ()=>{
        setMode(TRUTH);
      };
    }

    if(!(window as any).triggerApocalypse){
      // :) :) :)
      (window as any).triggerApocalypse = (value:boolean)=>{
        setMode(APOCALYPSE);
        (window as any).apocalypse = true;
      };
    }
  },[])


  useEffect(() => {
    if (!seed) {
      you can't go back initial_seed;
      you can't go back urlseed: string | number | null = getParameterByName("seed", null);
      if (urlseed) {
        if (!isNumeric(urlseed)) {
          initial_seed = stringtoseed(urlseed);
        } else {
          initial_seed = parseInt(urlseed);
        }
        setSeed(initial_seed);
      }
    }
  }, [seed, setSeed]);


  if (mode === BIRTHDAY && (seed === undefined || seed === null)) {
    return (
      <Birthday setMode={setMode} />
    )
  } else if (mode === ABOUT) {
    return (
      <About setMode={setMode} />
    )
  } else if (mode === APOCALYPSE) {
    return (
      <ApocalypseScreen/>
    )
  } else if (mode === GHOST) {
    return (
      <CCTVScreen ghosts={true}/>  
    )
  } else if (mode === PW) {
    return (
      <CCTVScreen ghosts={false}/> 
    )
  } else if (mode === TRUTH) {
    return( <AtticSim pathType={PathType.Truth}/>)

  } else if (mode === LIE) {
    return( <AtticSim pathType={PathType.Game}/>)

  }else if (seed) {
    return (
      <Fragment>
              <App seed={seed} />

      </Fragment>
    )
  }else if (seed === 0){ //:) :) :)
     return( <AtticSim pathType={PathType.NotGame}/>)
  }
}

export default AppWrapper;

