import { useEffect, useState } from "react";
import About from "./About";
import App from "./App";
import Birthday from "./Birthday";
import { ApocalypseScreen } from "./Screens/Apocalypse/ApocalypseScreen";
import { CCTVScreen } from "./Screens/Secrets/CCTV";
import { isNumeric, stringtoseed } from "./Utils/StringUtils";
import { getParameterByName } from "./Utils/URLUtils";
/*
as simple as possible, handles the three main screens of "enter your birthday", 
"play the game", "jr rambles about dev log shit"
maybe an "about" page too
four then.
*/

export const BIRTHDAY = "BIRTHDAY";
export const ABOUT = "ABOUT";
export const APOCALYPSE = "APOCALYPSE";
export const GHOST = "GHOST";
export const PW = "PW";

//game mode is just "is there a seed";

function AppWrapper() {
  const [seed, setSeed] = useState<number>();
  const [mode, setMode] = useState<string>(BIRTHDAY);

  //handle param hacks
  useEffect (()=>{
    const ghost = getParameterByName("cctv", null);
    const pw = getParameterByName("pw", null);
    const end = getParameterByName("end", null);
    console.log("JR NOTE: end is", end);

    if(ghost){
      (window as any).ghost = true;
      setMode(GHOST);
    }else if(pw){
      (window as any).pwMode = true;
      setMode(PW);
    }else if(end){
      (window as any).apocalypse = true;
      setMode(APOCALYPSE);
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
      let initial_seed;
      let urlseed: string | number | null = getParameterByName("seed", null);
      if (urlseed) {
        if (!isNumeric(urlseed)) {
          initial_seed = stringtoseed(urlseed);
        } else {
          initial_seed = parseInt(urlseed);
        }
        console.log("initial_seed seed is", initial_seed);
        setSeed(initial_seed);
      }
    }
  }, [seed, setSeed]);

  if (mode === BIRTHDAY && !seed) {
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
  }else if (seed) {
    return (
      <App seed={seed} />
    )
  } 
}

export default AppWrapper;

