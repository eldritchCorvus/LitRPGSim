import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ABOUT } from "./AppWrapper";
import { all_aspects, initAspects } from "./Modules/Aspect";
import { all_interests, initInterests } from "./Modules/Interest";
import { all_classes, initClasses } from "./Modules/RPGClass";
import { all_stats, initStats } from "./Modules/Stat";
import { all_themes, initThemes } from "./Modules/Theme";
import { LinkButton } from "./Screens/Styles";
import SeededRandom from "./Utils/SeededRandom";
interface AppProps {
  setMode: any; //lazy don't wanna remember setstate type
}

export const Content = styled.div`
    padding: 10px;
`
function Birthday(props: AppProps) {

  //JR NOTE: fun fact: for some reason having styled components breaks my controlled form and i don't know why so css it is
 

  const [className, setClassName] = useState<string>();
  const [aspect, setAspect] = useState<string>();
  const [interest1, setInterest1] = useState<string>();
  const [interest2, setInerest2] = useState<string>();
  const [seed, setSeed] = useState<number>(3);
  const [date, setDate] = useState<string>("3031-03-30");


  useEffect(() => {
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
    setInerest2(Object.keys(all_interests)[1]);
    processSeed(date);

  }, [])

  const processSeed = (value: string) => {
    //date is formatted like 2021-07-20
    setDate(value);
    setSeed(parseInt(value.replaceAll("-", "")));
  }


  return (
    <div className="birthday-container">
      <div className="section">
        <Content>ZampanioSimulator is a fanmade browser simulation of a game called "Zampanio", from this weird <a href = "https://gamefaqs.gamespot.com/pc/3/zampanio">creepypasta FAQ </a>I found, which generates a custom RPG setting personalized for you with a shit ton of secrets and almost has LitRPG vibes? </Content>
        <LinkButton onClick={() => { props.setMode(ABOUT) }}>About Zampanio</LinkButton>
      </div>
      <div className="section">
        Pick a date that is important to you (such as a birthday).
        <input key={"date"} onChange={(ev) => { processSeed(ev.target.value) }} value={date} />
      </div>
      <div className="section">
        Pick four concepts that speak to you:
        <select onChange={(ev) => { setClassName(ev.target.value) }} >
          {Object.keys(all_classes).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select onChange={(ev) => { setAspect(ev.target.value) }}>
          {Object.keys(all_aspects).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select onChange={(ev) => { setInterest1(ev.target.value) }} value={interest1}>
          {Object.keys(all_interests).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
        <select onChange={(ev) => { setInerest2(ev.target.value) }} value={interest2}>
          {Object.keys(all_interests).map((key) => { return (<option value={key}>{key}</option>) })}
        </select>
      </div>
      <div className="section">
        <a key={"link"} href={`?seed=${seed}&class=${className}&aspect=${aspect}&interest1=${interest1}&interest2=${interest2}`}>Explore your personalized session of ZampanioSim!</a>
      </div>

      <div className="section">
        <a key={"link"} href={`?`}>Or try a completely random session!</a>
      </div>
    </div>
  );
}

export default Birthday;

