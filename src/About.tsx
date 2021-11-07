import styled from "@emotion/styled";
import { useState } from "react";
import { BIRTHDAY } from "./AppWrapper";
import { LinkButton } from "./Screens/Styles";
import jr from "./images/jr.png";
import fakejr from "./images/falseJR.png";

interface AppProps {
  setMode: any; //lazy don't wanna remember setstate type
}

interface PostProps {
  post: Newspost;
  face: boolean;
}

export const DevLog = styled.table`
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 25px;
    padding-bottom: 25px;    width: 1000px;
    background-color: #edd287;
    border-radius: 13px;
`

export const Gigglesnort = styled.div`
margin-top: 10px;
margin-left: auto;
margin-right: auto;
padding-left: 50px;
padding-right: 50px;
padding-top: 25px;
padding-bottom: 25px;

width: 900px;
background-color: #edd287;
border-radius: 13px;
`

export const AboutDom = styled.div`
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 25px;
    padding-bottom: 25px;

    width: 900px;
    background-color: #edd287;
    border-radius: 13px;
`

export const Post = styled.tr`
  padding: 10px;
  border: 1px solid black;
  background-color: #ffefc4;
`

export const Date = styled.span`
  text-decoration: underline;
  display: inline-block;
  font-weight: bolder;
  vertical-align: top;
`
export const Content = styled.td`
  vertical-align: top;
  padding: 5px;
  border-radius: 13px;
`
function NewspostDom(props: PostProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [showSecretFace, setShowSecretFace] = useState(props.face);

  return (
    <Post onMouseOver={() => {
      if (props.post.secret) {
        setShowSecret(!showSecret);
        setShowSecretFace(!showSecret);

      }
    }}>
      <Content>{showSecretFace ? <img width="75" alt="jr" src={jr}></img> : <img width="75" alt="jr" src={fakejr}></img>}</Content>
      <Content>     <Date>{props.post.date}: </Date> {showSecret ? props.post.secret : props.post.post}</Content>
    </Post>
  )
}
function About(props: AppProps) {
  const newsposts = [
    new Newspost("11/7/2021","i mean theres no way i WOULDN't add a customer support line, after hearing all those testimonies on how terrible and labrynthian zampanios customer service is.  like. how does it even make sense that a game that old even still HAS a customer support line? sus.","Were you expecting something else?")
    ,new Newspost("11/6/2021","invitingCharon made some fantastic music which gave me the energy needed to get the skeleton of the help desk ready.","Were you expecting something else?")
    ,new Newspost("11/4/2021","you can walk around a bit and I have the bones of the procedural generation ready.  im v excited at the idea of getting to visualize that maze zampanio mentions","Were you expecting something else?")

     ];

  const [showSecret, setShowSecret] = useState(Math.random() > 0.5);
  const face = Math.random() > 0.5;

  return (
    <div>
      <AboutDom>
        <h1>About ZampanioSim</h1>
        <Content>
          <p>ZampanioSimulator is a fanmade browser simulation of a game called "Zampanio", from this weird <a href="https://gamefaqs.gamespot.com/pc/3/zampanio">creepypasta FAQ </a>I found.</p>
          <p>Given I'm trying to be true to what appears to be for all intents and purposes a creepy pasta, there's going to be themes that might not be for everybody in here!  Without giving away the premise, here's a broad list of content warnings, though a good rule of thumb is that if you're a fan of Zampanio you're probably gonna be okay with this weird fan work I made of it. </p>
          <p>ALSO! The whole point of Zampanio, simulated or otherwise is the customized experience so don't blame me if you don't get any of these, or get an especially potent dose or something.</p>
          <p>Finally, Wastes Honor: no jump scares or anything lame and cheap like that. Honestly if you stay on your path and don't be a dick to Zampanio, it'll be perfectly nice to you.</p>
          <ul>
            <li>Themes of Unreality</li>
            <li>Creepy sounds/Ambiance</li>
            <li>Unsettling Images</li>
            <li>Violent, Creepy Monsters Described in Text</li>
            <li>Player Blaming</li>
            <li>Player Insulting</li>
            <li>Strong Langauge (Sorry, that's all me, Zampanio itself is probably not so sweary)</li>
          </ul>
          <p>If I've missed anything I should have had in the warnings, feel free to message me at jadedResearcher at gmail, yeah?</p>
          <p>PLUS theres the wiki and the zampanio specific (not just this sim) discord (though I'm not just gonna LINK them here, you can find them at the end of the Credits, think of them as a reward!)</p>
        </Content>
        <div>
          <LinkButton onClick={() => { props.setMode(BIRTHDAY) }}>Enter Zampanio</LinkButton>
        </div>
      </AboutDom>

      <Gigglesnort>
        <h2>Helpful Hints For Secrets :) :) :)</h2>
        <p>So, it's come to my attention that secrets spiralling forever in all directions is not a particularly CHILL thing to experience???
        </p>
        <p>Apparently I got the wrong lesson from Easter Fools that one year?</p>

        <p>So, time for me to bust out the traditional gigglesnort hidey talk to list out every secret I remember there being (in the simulation ONLY not any of the paths out of it) in such a way that HOPEFULLY is barely helpful (or even actively harmful) in terms of finding anything BUT once you've found it you easily recognize it in the list and can check it off!!!
        </p>
        <p>If you've completed your checklist (or even if you're just particularly proud of your progress), let me know! I'm either jadedResearcher or justifiedRecursion on gmail, and if you aren't afraid of the spotlight feel free to edit the wiki (add a page for yourself?) listing what you <b>think</b> the answers to all of these are. I particularly enjoy how much like lies most of the answers sound like :) :) :)
        </p>
        <p>I am ABSOLUTELY pro spoilers for the wiki so long as you've marked them, since AFTER all we need to let our more puzzle challenged associates have a chance to become obsessed with Zampanio as well.  I would appreciate it a lot if people updated the wiki with everything they think is true and everything they want to be true.
        </p>
        <p>If you get my attention in a timely fashion, I may do a shout out to you! Or work you in in some fashion.</p>

        <p>Demonstrating obsession with Zampanio won't HURT your chances of becoming Marked, that's for sure.</p>
        <p>This experience will absolutely be changing over time, both in response to the things I see people doing and just because I doubt I'll ever truly break free. Decide whether you prefer to engage early, when you'll still stand out, or late, when you'll blend into the crowd.  Or after its all over, when you can piece together the entire thing at your leisure with no worries about being seen.</p>

        <p>Bonus points if you show your work through a spiralling fanwork of your own.  I particularly enjoy logs of investigations and rambling disjoint streams of consciousness. </p>

        <p>Feed me.</p>
        

      </Gigglesnort>

      <DevLog>

        <h2 onMouseOver={() => setShowSecret(!showSecret)}><span>Dev Log by</span> <span>{showSecret ? "justifiedRecursion" : "jadedResearcher"}</span>:</h2>
        {newsposts.map((post) => {
          return (<NewspostDom post={post} face={face} />)
        })}
      </DevLog>
    </div>
  );
}
class Newspost {
  date: string;
  post: string;
  secret: string | null;
  constructor(date: string, post: string, secret: string | null = null) {
    this.date = date;
    this.post = post;
    this.secret = secret;
  }
}
export default About;



