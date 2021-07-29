import { useEffect, useState } from "react";
import { ABOUT } from "./AppWrapper";
import { all_aspects, initAspects } from "./Modules/Aspect";
import { all_interests, initInterests } from "./Modules/Interest";
import { all_classes, initClasses } from "./Modules/RPGClass";
import { all_stats, initStats } from "./Modules/Stat";
import { all_themes, initThemes } from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";

interface AppProps{
  setMode: any; //lazy don't wanna remember setstate type
}
function Debug(props: AppProps) {

  const [className, setClassName] = useState<string>();
  const [aspect, setAspect] = useState<string>();
  const [interest1, setInterest1] = useState<string>();
  const [interest2, setInerest2] = useState<string>();


  useEffect(()=>{
    const rand = new SeededRandom(3);
    //order matters, themes are needed for aspects, etc;
    initStats();
    initThemes();

    initAspects(rand);
    initClasses(rand);

    initInterests(rand);
    setAspect(Object.keys(all_aspects)[0]);
    setClassName(Object.keys(all_classes)[0]);
    setInterest1(Object.keys(all_interests)[0]);
    setInerest2(Object.keys(all_interests)[0]);

  },[])
  
    return (
      <div>
        <div>Debug: pick player initial conditions (class, aspect, two interests) from a list and it'll generate a link with a player for you to oggle</div>
        <a onClick={()=>{props.setMode(ABOUT)}}>About Zampanio</a>
        <div>
          <label>Class:</label>
          <select onChange={(ev) => { setClassName(ev.target.value) }} >
            {Object.keys(all_classes).map((key)=>{return(<option value={key}>{key}</option>)})}
          </select>
          <label>Aspect:</label>
          <select onChange={(ev) => { setAspect(ev.target.value) }}>
            {Object.keys(all_aspects).map((key)=>{return(<option value={key}>{key}</option>)})}
          </select>
          <label>Interest1:</label>
          <select onChange={(ev) => { setInterest1(ev.target.value)}}>
          {Object.keys(all_interests).map((key)=>{return(<option value={key}>{key}</option>)})}
          </select>
          <label>Interest2:</label>
          <select onChange={(ev) => { setInerest2(ev.target.value)}}>
          {Object.keys(all_interests).map((key)=>{return(<option value={key}>{key}</option>)})}  
          </select>
        </div>
        {aspect}
        <a href = {`?seed=3&class=${className}&aspect=${aspect}&interest1=${interest1}&interest2=${interest2}`}>this link constantly updates with a link to the player you are debugging with seed 3</a>
      </div>
    );
} 

export default Debug;

