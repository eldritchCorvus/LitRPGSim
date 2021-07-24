import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ABOUT } from "./AppWrapper";
import { all_aspects, initAspects } from "./Modules/Aspect";
import { all_interests, initInterests } from "./Modules/Interest";
import { all_classes, initClasses } from "./Modules/RPGClass";
import { all_stats, initStats } from "./Modules/Stat";
import { all_themes, initThemes } from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
interface AppProps {
  setMode: any; //lazy don't wanna remember setstate type
}
function Birthday(props: AppProps) {

  const Section = styled.div`
    padding: 10px;
    border: 1px solid black;
    border-radius: 13px;
`;

  const Container = styled.div`
    width: 800px;
    height: 800px;
    margin-left: auto;
    margin-right: auto;
    background-color: #edd287;
`;

  const [className, setClassName] = useState<string>();
  const [aspect, setAspect] = useState<string>();
  const [interest1, setInterest1] = useState<string>();
  const [interest2, setInerest2] = useState<string>();
  const [seed, setSeed] = useState<number>(3);
  const [date, setDate] = useState<string>("1933-03-03");


  useEffect(() => {
    const rand = new SeededRandom(3);
    //order matters, themes are needed for aspects, etc;
    initStats();
    console.log("JR NOTE: all stats are now", all_stats);
    initThemes();
    console.log("JR NOTE: all themes are now", all_themes);

    initAspects(rand);
    initClasses(rand);
    console.log("JR NOTE: all classes are now", all_classes);

    initInterests(rand);
    setAspect(Object.keys(all_aspects)[0]);
    setClassName(Object.keys(all_classes)[0]);
    setInterest1(Object.keys(all_interests)[0]);
    setInerest2(Object.keys(all_interests)[1]);
    processSeed(date);

  }, [])

  const processSeed =(value: string)=>{
    //date is formatted like 2021-07-20
    console.log("JR NOTE: can i handle a date formmated like ", value, "or should i just treat it as a hash?")
    setSeed(parseInt(value.replaceAll("-","")));
  }


  return (
    <Container>
      <Section>
      <button onClick={() => { props.setMode(ABOUT) }}>About Zampanio</button>
      </Section>
      <Section>
        TODO FOR SOME REASON THIS KEEPS LOOSING FOCUS What is an important date to you?  (Birthdays are especially useful)
        <input key="date" onChange={(ev) => { setDate(ev.target.value) }} onBlur={()=>processSeed(date)} defaultValue={date}/>
      </Section>
      <Section>
        Pick four concepts that speak to you:
        <select onChange={(ev) => { setClassName(ev.target.value) }} >
          {Object.keys(all_classes).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select onChange={(ev) => { setAspect(ev.target.value) }}>
          {Object.keys(all_aspects).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select onChange={(ev) => { setInterest1(ev.target.value) }}>
          {Object.keys(all_interests).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select onChange={(ev) => { setInerest2(ev.target.value) }}>
          {Object.keys(all_interests).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
      </Section>
      <Section>
        <a href={`?seed=${seed}&class=${className}&aspect=${aspect}&interest1=${interest1}&interest2=${interest2}`}>Explore your personalized session of ZampanioSim!</a>
      </Section>
    </Container>
  );
}

export default Birthday;

