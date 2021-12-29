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
    new Newspost("10/19/21", "realized its kind of a dick move to throw wastes at 'infinite spiralling secrets' without even a hint of a guide (shame AB couldn't join us over here), so made my traditional gigglesnort hideytalk riddlefuckery checklist. going to start herding people in here proper.  shout out in the meantime to the Herald, the Scribe, the Weaver and the other Unmarked who found their way in even before I started herding, btw.", "")
    , new Newspost("10/05/2021", "trying to herd the spiders in here before Halloween. my plan is, no matter the state of the sim, to 'go live' before then.  i get the feeling i'll be working on this sim for the rest of my natural life (quite happily, don't get me wrong) so no sense in waiting for it 'to be done'!!!", "i still wanna add the quest system, maybe unlockable titles instead of them being default, maybe that lore screen i keep promising, you know, the basics. but also THE END IS NEVER THE END and all so there will always be things to add. you should add things too. on a03. on the wiki. anywhere fan works go. maybe if enough of us are making zampanio works we can shake loose what happened to that faq? or play it ourselves? Zampanio is a very good game. You should play it.")
    , new Newspost("09/25/2021", "things are really starting to come together!!! polish is continuing, a few more secrets!!!", ":) :) :)")
    , new Newspost("09/21/2021", "bad news: still haven't managed to find that FAQ. good news: guess who just managed to get their hand on an *actual copy of zampanio*???", "Shout out to that weird dead zampanio server for somehow embedding it in a powerpoint???")
    , new Newspost("09/13/2021", "starting to get desperate about finding that FAQ. the forums mostly seem dead, so I'm gathering up whoever I can find in a discord server to try to follow the breadcrumbs.", "Note to self: post link to discord once this goes live.")
    , new Newspost("08/31/2021", "theres something calming about actually getting to see what the skills do, finally. fun fact: its nothing", "shoutout to the late coleman researcher who definitely left me some money according to this scammer")

    , new Newspost("08/29/2021", "skills are real now but only if you're willing to blaspheme against the concept of simulations", "i personally wouldn't recommend blasphemy")

    , new Newspost("08/25/2021", "new avatar who this", "my fav part of this new design is it implies my lack of face was *always* a coiled spring, i just chose not to uncoil it")
    , new Newspost("08/24/2021", "look i don't know how or why found footage is a part of the zampanio experienceyar. i just know i feel really proud of how i worked that part of it in.")
    , new Newspost("08/19/2021", "lets all regret having eyes together, shall we?")
    , new Newspost("08/16/2021", "time is now officially hard", "in addition to being the shittiest aspect it just is difficult to form. its difficult to follow without a proper mind")
    , new Newspost("08/15/2021", "Spiders can wear hats now.", "also, I guess if you care about that sort of thing, you can now be killed horrifically by monsters. well. just the one monster. it follows you around and even if you can kill it it just comes back slightly different. don't worry about it.")
    , new Newspost("08/14/2021", "how can eyes be real if mirrors aren't real? so anyways i made mirrors real just in case", "also Refs: #22917 is more true than it was before via being less true than it was before. its okay.")
    , new Newspost("08/08/2021", "eyes and spirals are illegal, i thought you should know. and claiming the menu isn't a menu is equally illegal. maybe more illegal tbh", "maybe i should make like, a youtube guide showing why")
    , new Newspost("08/05/2021", "one good thing about ZampanioSim getting leaked early is that I found out that firefox freaking *hates* fuckUpBGButSoftly. my beloved. why. ", "at least Refs: #22917 no longer hates firefox with an unending rage")
    , new Newspost("08/03/2021", "dammit AW just let me know that the faq link is dead... gonna try to see if its cached somewhere (is it old enough for waybackmachine to find it???), if anybody sees anything related to it send it my way, i *swear* im not crazy this is a real thing", "also shoutout to 'craig researcher' which a scammer just let me know 'died' adn probably left me a huge fortune")
    , new Newspost("08/02/2021", "okay so maybe game like activity is possible but i do not recommend it the ~~Refs: #22917~~ gets pissed if you wander into its labrynth", "if you do it its on your end")
    , new Newspost("07/25/2021", "the Thief of Beef is no longer mandatory for all party members to emulate", "haha whoops")
    , new Newspost("07/24/2021", " the Thief of Beef is now possible. that is all there is to say on the matter.", "rereading old newspost and srsly its surreal to see any even tangentially mention the pandemic? if i'd seen something like that in a dev log two years ago i would have assumed it was part of an arg or some shit and not just like 'ah yes that period of literal years where eveyone wore masks and reassured everyone about quarantine procedures any time they mentioned leaving the house'. ")
    , new Newspost("07/23/2021", "THE END IS NEVER THE END", "we're really in it now")
    , new Newspost("07/22/2021", "hunting is no longer associated with clowns", "did i go out of my way to leave the 'bug' in for weeks just so i could mirror the faq bug? yes. ofc i did. theres just something so surreal about being issued a clown wig and a bicycle horn when you ask how to kill deer")
    , new Newspost("03/30/3031", "i have finally implemented spiral/sand")
    , new Newspost("07/18/2021", "really like how i did the gods screen", "honestly everything about this project is ridiculously self indulgent. i don't actually expect many ppl to enjoy it but...its really fun to make??? it brings me joy to try simulating such a weird creepypasta.")
    , new Newspost("07/15/2021", "it is physically impossible to create a shitty world and NOT be a sociopath", "turns out the easiest way to make party members is to lobotomize a fully realized player")
    , new Newspost("07/13/2021", "as the false bg moves around the true mirrors OBs thoughts")
    , new Newspost("07/11/2021", "standardizing OBs voice. they deserve more than just being AB but meaner.")
    , new Newspost("07/10/2021", "working on gaslighting word meanings", "my fav part of this is i keep forgetting i did it and i get upset/confused that 'quests' are now called 'dogs' or something")
    , new Newspost("07/06/2021", "can use the skill tree to upgrade menus finally")
    , new Newspost("07/03/2021", "just Refs: #22917 mode :) :) :)", "basically its a reference to Just Monika and a few other things")
    , new Newspost("07/01/2021", "music!!!", "i especially love how terrible and upsetting the rage mode music is")
    , new Newspost("06/29/2021", "menu items actually can be unlocked upgraded but not everything is implemented yet obvs")
    , new Newspost("06/27/2021", "50% less homestuck", "look this is just where i am right now, caring more about creepy pastas then sburb")
    , new Newspost("06/23/2021", "mess up bg but softly")
    , new Newspost("06/20/2021", "finally got the skill tree to center itself omg why was that so hard")
    , new Newspost("06/19/2021", "wastes can hack now (both in game wastes and real ones)", "if you're a real waste you don't need me telling you how to hack, g'luck ;) ;) ;)")
    , new Newspost("06/16/2021", ":) :) :)", "https://www.reddit.com/r/TheMagnusArchives/comments/nzz96g/this_notspiral_perfectly_represents_spiral_in_my/")
    , new Newspost("06/13/2021", ":) :) :)", "oh man im feeling so smug right now about what happens even in normal mode")
    , new Newspost("06/08/2021", "im love. rage mode is everything i hoped it would be. absolute perfection. maybe i should call it headache mode? its just. its breath taking. beautiful. im the smartest damn human.", "i just really am a fan of things appearing to be one thing, revealing themselves to be a completely seperate thing, but if you think about it never weren't the first thing too.")
    , new Newspost("06/06/2021", "finally making other menu screens, got statistics and achivements in. its weird, theres a lot more work than id think for just a simple simulation", "its because i cant keep my damn nose out of adding secrets everywhere and putting a frankly absurd amount of work into set pieces designed to make twists punch harder")
    , new Newspost("06/03/2021", "happy birthday OB, the achievement system just went live. its on the third too which is just perfect. i already was using 3 as an arc num in here. hey ,neat, all the numbers are divisible by 3 on OBs bday.", "i should do something with this...")
    , new Newspost("06/02/2021", "lol i just realized what appeals to me so much about Zampanio. its kinda like House of Leaves meets Polybius? (however you spell that). i wonder if that makes the [REDACTED] the ~Refs: #22917~?", "srsly i just freaking love that creepypasta faq so much")
    , new Newspost("06/01/2021", "shareable urls are a thing because i have a problem and the problem is wanting ppl to be able to share urls. this might TECHNICALLY violate the personalization requirement for Zampanio but...i mean. its me. i can't NOT make shareable urls.", "plus this way i can make custom sessions")
    , new Newspost("05/22/2021", "stats exist now, just copying from wigglersim cuz why wouldn't i. s'not like the actual Zampanio is clear on how stats are")
    , new Newspost("04/18/2021", "ugh. why did I decide a skill tree was so vital to this simulation? it's HARD to get it looking right rip. but skills are obvs important to actual Zampanio so what can i do. plus its absolutely hilarious seeing things like 'Book Beam' get generated")
    , new Newspost("04/15/2021", "i feel...tentatively hopeful about this project? maybe it goes nowhere but this is my first creative work since the pandemic started so *shrugs*. i'm just happy to be MAKING something. plus im kinda burnt out on homestuck???  and this Zampanio thing is...well i don't wanna spoil the creepypasta faq if you haven't read it yet. i just feel myself spinning up a new obsession is all.")];

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
        <h3>MainPath: </h3>
        <ul>
          <li> Do you know how to walk, jump and skip cutscenes?</li>
          <li>Do you understand why the menu cannot be closed?</li>
          <li>Have you found what lurks behind the menu?</li>
          <li>Have you found what walking reveals?</li>
          <li>How many versions of the background music are there?</li>
          <li>How do you reach the rabbit hole? What prevents you?</li>
          <li>Where would you find passwords? Bonus points if you know the inspiration for each. </li>
          <li>Can you trust words?</li>
          <li>Can you trust your eyes?</li>
          <li>What if those eyes are finally real?</li>
          <li>Do you recognize what you hear when real eyes are touched?</li>
          <li>Is it worth it, to make that which is not a spiral become locked into a spiral?</li>
          <li>Is it worth it, to make that which is not a game become a game?</li>
          <li>Where is it too dangerous to create a waste land of Refs: #22917?</li>
          <li>Where can you find JR's attic? </li>
        </ul>

        <h3>Refs: #22917: </h3>
        <ul>
          <li>Is it worth it to translate binary?</li>
          <li>How do you reach JustRefs: #22917?</li>
          <li>What is Refs: #22917's desire?</li>
          <li>Where can you find JR's attic?</li>
        </ul>

        <h3>ThisIsAGame</h3>
        <ul>
          <li>Is it worth it to use your skills?</li>
          <li>How do you use your inventory?</li>
          <li>Is it safe to  talk to your friends?</li>
          <li>How do you unlock a door?</li>
          <li>Is it worth it to kill?</li>
          <li>How do you meet NotARefs: #22917?</li>
          <li>What does NotARefs: #22917 tell you?</li>
          <li>How do you meet the ShamblingHorrorWithYourFace?</li>
          <li>Does it hurt to die?</li>
          <li>What happens when you collect 9 artifacts?</li>
          <li>What happens if you ignore NotARefs: #22917's pleas?</li>
          <li>Is ending the world worth it?</li>
          <li>Where can you find JR's attic?</li>
        </ul>
        <h3>PathsOut</h3>

        <p>These are secrets that lead AWAY from this simulation. The end is never the end, after all!!!</p>
        <p>Some of them are dead ends. Some are red herrings. Some lead infinitely outwards. </p>
        <p>Feel free to use them yourselves. A dead end, afterall, doesn't need to STAY a deadend if you're willing to forge your own path.</p>
        <ul>
          <li>Where can you peel back all illusions?</li>
          <li>Where can you watch those who came before?</li>
          <li>Where can you spiral endlessly in maps and stories and telling what you saw and correcting lies and adding lies and giving hints and taking hints and confusing everyone forever?</li>
          <li>Where can you put a cassette tape?</li>
          <li>Where do you find a PuzzleBox?</li>
          <li>Where can you become lost in fragmented, echoing, reflected thoughts?</li>
          <li>Where can you go to see a shit post?</li>

        </ul>


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



