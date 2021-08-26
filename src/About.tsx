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
      if(props.post.secret){
        setShowSecret(!showSecret);
        setShowSecretFace(!showSecret);

      }
     }}>
      <Content>{showSecretFace?<img width="75" alt="jr" src={jr}></img>:<img width="75" alt="jr" src={fakejr}></img>}</Content>
      <Content>     <Date>{props.post.date}: </Date> {showSecret ? props.post.secret : props.post.post}</Content>
    </Post>
  )
}
function About(props: AppProps) {
  const [date, setDate] = useState<string>("1933-03-03");
  const newsposts = [
    new Newspost("08/25/2021","new avatar who this","my fav part of this new design is it implies my lack of face was *always* a coiled spring, i just chose not to uncoil it")
    ,new Newspost("08/24/2021","look i don't know how or why found footage is a part of the zampanio experienceyar. i just know i feel really proud of how i worked that part of it in.")
    ,new Newspost("08/19/2021","lets all regret having eyes together, shall we?")
    ,new Newspost("08/16/2021","time is now officially hard","in addition to being the shittiest aspect it just is difficult to form. its difficult to follow without a proper mind")
    ,new Newspost("08/15/2021","Spiders can wear hats now.","also, I guess if you care about that sort of thing, you can now be killed horrifically by monsters. well. just the one monster. it follows you around and even if you can kill it it just comes back slightly different. don't worry about it.")
    ,new Newspost("08/14/2021","how can eyes be real if mirrors aren't real? so anyways i made mirrors real just in case","also truth is more true than it was before via being less true than it was before. its okay.")
    ,new Newspost("08/08/2021","eyes and spirals are illegal, i thought you should know. and claiming the menu isn't a menu is equally illegal. maybe more illegal tbh","maybe i should make like, a youtube guide showing why")
    ,new Newspost("08/05/2021","one good thing about ZampanioSim getting leaked early is that I found out that firefox freaking *hates* fuckUpBGButSoftly. my beloved. why. ","at least Truth no longer hates firefox with an unending rage")
    ,new Newspost("08/03/2021","dammit AW just let me know that the faq link is dead... gonna try to see if its cached somewhere (is it old enough for waybackmachine to find it???), if anybody sees anything related to it send it my way, i *swear* im not crazy this is a real thing","also shoutout to 'craig researcher' which a scammer just let me know 'died' adn probably left me a huge fortune")
    ,new Newspost("08/02/2021","okay so maybe game like activity is possible but i do not recommend it the ~~minotaur~~ gets pissed if you wander into its labrynth","if you do it its on your end")
    ,new Newspost("07/25/2021", "the Thief of Beef is no longer mandatory for all party members to emulate","haha whoops")
    ,new Newspost("07/24/2021", " the Thief of Beef is now possible. that is all there is to say on the matter.","rereading old newspost and srsly its surreal to see any even tangentially mention the pandemic? if i'd seen something like that in a dev log two years ago i would have assumed it was part of an arg or some shit and not just like 'ah yes that period of literal years where eveyone wore masks and reassured everyone about quarantine procedures any time they mentioned leaving the house'. ")
    , new Newspost("07/23/2021", "THE END IS NEVER THE END", "we're really in it now")
    , new Newspost("07/22/2021", "hunting is no longer associated with clowns", "did i go out of my way to leave the 'bug' in for weeks just so i could mirror the faq bug? yes. ofc i did. theres just something so surreal about being issued a clown wig and a bicycle horn when you ask how to kill deer")
    , new Newspost("03/30/3031", "i have finally implemented spiral/sand")
    , new Newspost("07/18/2021", "really like how i did the gods screen","honestly everything about this project is ridiculously self indulgent. i don't actually expect many ppl to enjoy it but...its really fun to make??? it brings me joy to try simulating such a weird creepypasta.")
    , new Newspost("07/15/2021", "it is physically impossible to create a shitty world and NOT be a sociopath","turns out the easiest way to make party members is to lobotomize a fully realized player")
    , new Newspost("07/13/2021", "as the false bg moves around the true mirrors OBs thoughts")
    , new Newspost("07/11/2021", "standardizing OBs voice. they deserve more than just being AB but meaner.")
    , new Newspost("07/10/2021", "working on gaslighting word meanings", "my fav part of this is i keep forgetting i did it and i get upset/confused that 'quests' are now called 'dogs' or something")
    , new Newspost("07/06/2021", "can use the skill tree to upgrade menus finally")
    , new Newspost("07/03/2021", "just truth mode :) :) :)", "basically its a reference to Just Monika and a few other things")
    , new Newspost("07/01/2021", "music!!!", "i especially love how terrible and upsetting the rage mode music is")
    , new Newspost("06/29/2021", "menu items actually can be unlocked upgraded but not everything is implemented yet obvs")
    , new Newspost("06/27/2021", "50% less homestuck","look this is just where i am right now, caring more about creepy pastas then sburb")
    , new Newspost("06/23/2021", "mess up bg but softly")
    , new Newspost("06/20/2021", "finally got the skill tree to center itself omg why was that so hard")
    , new Newspost("06/19/2021", "wastes can hack now (both in game wastes and real ones)","if you're a real waste you don't need me telling you how to hack, g'luck ;) ;) ;)")
    , new Newspost("06/16/2021", ":) :) :)", "https://www.reddit.com/r/TheMagnusArchives/comments/nzz96g/this_notspiral_perfectly_represents_spiral_in_my/")
    , new Newspost("06/13/2021", ":) :) :)", "oh man im feeling so smug right now about what happens even in normal mode")
    , new Newspost("06/08/2021", "im love. rage mode is everything i hoped it would be. absolute perfection. maybe i should call it headache mode? its just. its breath taking. beautiful. im the smartest damn human.", "i just really am a fan of things appearing to be one thing, revealing themselves to be a completely seperate thing, but if you think about it never weren't the first thing too.")
    , new Newspost("06/06/2021", "finally making other menu screens, got statistics and achivements in. its weird, theres a lot more work than id think for just a simple simulation", "its because i cant keep my damn nose out of adding secrets everywhere and putting a frankly absurd amount of work into set pieces designed to make twists punch harder")
    , new Newspost("06/03/2021", "happy birthday OB, the achievement system just went live. its on the third too which is just perfect. i already was using 3 as an arc num in here. hey ,neat, all the numbers are divisible by 3 on OBs bday.", "i should do something with this...")
    , new Newspost("06/02/2021", "lol i just realized what appeals to me so much about Zampanio. its kinda like House of Leaves meets Polybius? (however you spell that). i wonder if that makes the [REDACTED] the ~minotaur~?", "srsly i just freaking love that creepypasta faq so much")
    , new Newspost("06/01/2021", "shareable urls are a thing because i have a problem and the problem is wanting ppl to be able to share urls. this might TECHNICALLY violate the personalization requirement for Zampanio but...i mean. its me. i can't NOT make shareable urls.", "plus this way i can make custom sessions")
    , new Newspost("05/22/2021", "stats exist now, just copying from wigglersim cuz why wouldn't i. s'not like the actual Zampanio is clear on how stats are")
    , new Newspost("04/18/2021", "ugh. why did I decide a skill tree was so vital to this simulation? it's HARD to get it looking right rip. but skills are obvs important to actual Zampanio so what can i do. plus its absolutely hilarious seeing things like 'Book Beam' get generated")
    , new Newspost("04/15/2021", "i feel...tentatively hopeful about this project? maybe it goes nowhere but this is my first creative work since the pandemic started so *shrugs*. i'm just happy to be MAKING something. plus im kinda burnt out on homestuck???  and this Zampanio thing is...well i don't wanna spoil the creepypasta faq if you haven't read it yet. i just feel myself spinning up a new obsession is all.")];

    const [showSecret, setShowSecret] = useState(Math.random()>0.5);
    const face = Math.random()>0.5;

  return (
    <div>
      <AboutDom>
        <h1>About ZampanioSim</h1>
        <Content>
          <p>ZampanioSimulator is a fanmade browser simulation of a game called "Zampanio", from this weird <a href = "https://gamefaqs.gamespot.com/pc/3/zampanio">creepypasta FAQ </a>I found.</p>
        <p>Given I'm trying to be true to what appears to be for all intents and purposes a creepy pasta, there's going to be themes that might not be for everybody in here!  Without giving away the premise, here's a broad list of content warnings, though a good rule of thumb is that if you're a fan of Zampanio you're probably gonna be okay with this weird fan work I made of it. </p>
        <p>ALSO! The whole point of Zampanio, simulated or otherwise is the customized experience so don't blame me if you don't get any of these, or get an especially potent dose or something.</p>
        <p>Finally, Wastes Honor: no jump scares or anything lame and cheap like that. Honestly if you stay on your path and don't be a dick to Zampanio, it'll be perfectly nice to you.</p>
        <ul>
          <li>Themes of Unreality</li>
          <li>Creepy sounds/Ambiance</li>
          <li>Unsettling Images</li>
          <li>Violent, Creepy Monsters Described in Text</li>
        </ul>
        <p>If I've missed anything I should have had in the warnings, feel free to message me at jadedResearcher at gmail, yeah?</p>
        </Content>
        <div>
          <LinkButton onClick={() => { props.setMode(BIRTHDAY) }}>Enter Zampanio</LinkButton>
        </div>
      </AboutDom>

      <DevLog>

        <h2 onMouseOver={()=>setShowSecret(!showSecret)}><span>Dev Log by</span> <span>{showSecret?"justifiedRecursion":"jadedResearcher"}</span>:</h2>
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



