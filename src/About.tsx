import { useState } from "react";
import { BIRTHDAY } from "./AppWrapper";
import { LinkButton } from "./Screens/Styles";

interface AppProps{
  setMode: any; //lazy don't wanna remember setstate type
}
function About(props: AppProps) {
  const [date, setDate] = useState<string>("1933-03-03");

    return (
      <div>
        <div>TODO ABOUT PLUS DEV LOG, dev log</div>
        <LinkButton onClick={() => { props.setMode(BIRTHDAY) }}>Enter Zampanio</LinkButton>
        {date}
      </div>
    );
} 

export default About;

