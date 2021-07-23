import { BIRTHDAY } from "./AppWrapper";

interface AppProps{
  setMode: any; //lazy don't wanna remember setstate type
}
function About(props: AppProps) {
  
    return (
      <div>
        <div>TODO ABOUT PLUS DEV LOG</div>
        <a onClick={()=>{props.setMode(BIRTHDAY)}}>Enter Zampanio</a>
      </div>
    );
} 

export default About;

