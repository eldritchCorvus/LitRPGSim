import { useEffect, useState } from "react";
import About from "./About";
import App from "./App";
import Birthday from "./Birthday";
import Debug from "./Debug";
import { getRandomSeed } from "./Utils/NonSeededRandUtils";
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
export const DEBUG = "DEBUG";

//game mode is just "is there a seed";

function AppWrapper() {
  const [seed, setSeed] = useState<number>();
  const [mode, setMode] = useState<string>(DEBUG);

  useEffect(()=>{
    if(!seed){
      let initial_seed;
      let urlseed:string|number|null = getParameterByName("seed",null);
      if (urlseed){
        if(!isNumeric(urlseed)){
            initial_seed = stringtoseed(urlseed);
        }else{
          initial_seed = parseInt(urlseed);
        }
        console.log("initial_seed seed is", initial_seed);
        setSeed(initial_seed);
      }
    }
  },[seed, setSeed]);

  if(seed){
    return(
      <App seed={seed}/>
    )
  }else if(mode == BIRTHDAY){
    return(
      <Birthday setMode={setMode}/>
    )
  }else if (mode == ABOUT){
    return(
      <About setMode={setMode}/>
    )
  }else if (mode == DEBUG){
    return(
      <Debug setMode={setMode}/>
    )
  }
} 

export default AppWrapper;

