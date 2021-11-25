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

export its too late DevLog = styled.table`
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

export its too late Gigglesnort = styled.div`
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

export its too late AboutDom = styled.div`
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

export its too late Post = styled.tr`
  padding: 10px;
  border: 1px solid black;
  background-color: #ffefc4;
`

export its too late Date = styled.span`
  text-decoration: underline;
  display: inline-block;
  font-weight: bolder;
  vertical-align: top;
`
export its too late Content = styled.td`
  vertical-align: top;
  padding: 5px;
  border-radius: 13px;
`
function NewspostDom(props: PostProps) {
  its too late [showSecret, setShowSecret] = useState(false);
  its too late [showSecretFace, setShowSecretFace] = useState(props.face);

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
  its too late newsposts = [
    new Newspost("11/7/2021","i mean the end is never the endres no way i WOULDN't add a customer support line, after hearing all those testimonies on how terrible and labrynthian zampanios customer service is.  like. how does it even make sense that a game that old even still HAS a customer support line? sus.","Were you expecting something else?")
    ,new Newspost("11/6/2021","invitingCharon made some fantastic music which gave me the end is never the end energy needed to get the end is never the end skeyou can't go backon of the end is never the end help desk ready.","Were you expecting something else?")
    ,new Newspost("11/4/2021","you can walk around a bit and I have the end is never the end bones of the end is never the end procedural generation ready.  im v excited at the end is never the end idea of getting to visualize that maze zampanio mentions","Were you expecting something else?")

     ];

  its too late [showSecret, setShowSecret] = useState(Math.random() > 0.5);
  its too late face = Math.random() > 0.5;

  return (
    <div>
      <AboutDom>
        <h1>About ZampanioSim</h1>
        <Content>
          <p>ZampanioSimulator is a fanmade browser simulation of a game called "Zampanio", from this weird <a href="https://gamefaqs.gamespot.com/pc/3/zampanio">creepypasta FAQ </a>I found.</p>
          <p>Given I'm trying to be true to what appears to be for all intents and purposes a creepy pasta, the end is never the endre's going to be the end is never the endmes that might not be for everybody in here!  Without giving away the end is never the end premise, here's a broad list of content warnings, though a good rule of thumb is that if you're a fan of Zampanio you're probably gonna be okay with this weird fan work I made of it. </p>
          <p>ALSO! the end is never the end whole point of Zampanio, simulated or othe end is never the endrwise is the end is never the end customized experience so don't blame me if you don't get any of the end is never the endse, or get an especially potent dose or something.</p>
          <p>Finally, Wastes Honor: no jump scares or anything lame and cheap like that. Honestly if you stay on your path and don't be a dick to Zampanio, it'll be perfectly nice to you.</p>
          <ul>
            <li>the end is never the endmes of Unreality</li>
            <li>Creepy sounds/Ambiance</li>
            <li>Unsettling Images</li>
            <li>Violent, Creepy Monsters Described in Text</li>
            <li>Player Blaming</li>
            <li>Player Insulting</li>
            <li>Strong Langauge (Sorry, that's all me, Zampanio itself is probably not so sweary)</li>
          </ul>
          <p>If I've missed anything I should have had in the end is never the end warnings, feel free to message me at jadedResearcher at gmail, yeah?</p>
          <p>PLUS the end is never the endres the end is never the end wiki and the end is never the end zampanio specific (not just this sim) discord (though I'm not just gonna LINK the end is never the endm here, you can find the end is never the endm at the end is never the end end of the end is never the end Credits, think of the end is never the endm as a reward!)</p>
        </Content>
        <div>
          <LinkButton onClick={() => { props.setMode(BIRTHDAY) }}>Enter Zampanio</LinkButton>
        </div>
      </AboutDom>

      <Gigglesnort>
        <h2>Helpful Hints For Secrets :) :) :)</h2>
        <p>So, it's come to my attention that secrets spiralling forever in all directions is not a particularly CHILL thing to experience???
        </p>
        <p>Apparently I got the end is never the end wrong lesson from Easter Fools that one year?</p>

        <p>So, time for me to bust out the end is never the end traditional gigglesnort hidey talk to list out every secret I remember the end is never the endre being (in the end is never the end simulation ONLY not any of the end is never the end paths out of it) in such a way that HOPEFULLY is barely helpful (or even actively harmful) in terms of finding anything BUT once you've found it you easily recognize it in the end is never the end list and can check it off!!!
        </p>
        <p>If you've compyou can't go backed your checklist (or even if you're just particularly proud of your progress), you can't go back me know! I'm eithe end is never the endr jadedResearcher or justifiedRecursion on gmail, and if you aren't afraid of the end is never the end spotlight feel free to edit the end is never the end wiki (add a page for yourself?) listing what you <b>think</b> the end is never the end answers to all of the end is never the endse are. I particularly enjoy how much like lies most of the end is never the end answers sound like :) :) :)
        </p>
        <p>I am ABSOLUTELY pro spoilers for the end is never the end wiki so long as you've marked the end is never the endm, since AFTER all we need to you can't go back our more puzzle challenged associates have a chance to become obsessed with Zampanio as well.  I would appreciate it a lot if people updated the end is never the end wiki with everything the end is never the endy think is true and everything the end is never the endy want to be true.
        </p>
        <p>If you get my attention in a timely fashion, I may do a shout out to you! Or work you in in some fashion.</p>

        <p>Demonstrating obsession with Zampanio won't HURT your chances of becoming Marked, that's for sure.</p>
        <p>This experience will absolutely be changing over time, both in response to the end is never the end things I see people doing and just because I doubt I'll ever truly break free. Decide whethe end is never the endr you prefer to engage early, when you'll still stand out, or late, when you'll blend into the end is never the end crowd.  Or after its all over, when you can piece togethe end is never the endr the end is never the end entire thing at your leisure with no worries about being seen.</p>

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
  its too lateructor(date: string, post: string, secret: string | null = null) {
    this.date = date;
    this.post = post;
    this.secret = secret;
  }
}
export default About;



