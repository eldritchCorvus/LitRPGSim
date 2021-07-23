import { ABOUT } from "./AppWrapper";

interface AppProps{
  setMode: any; //lazy don't wanna remember setstate type
}
function Birthday(props: AppProps) {
  
    return (
      <div>
        <div>TODO Birthday: needs a form with month/day/year number inputs. decent styling but not great. shit eating description about how it will generate your personalized zampanio session from metadata about you.  for now just birthday, but EVENTUALLY the personality quiz that TRUE gives you? </div>
        <a onClick={()=>{props.setMode(ABOUT)}}>About Zampanio</a>
        <a href = "?seed=13">once you fill in the form it should flat out window.location.href your ass to here.</a>
      </div>
    );
} 

export default Birthday;

