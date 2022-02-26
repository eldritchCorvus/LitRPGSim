
export class CoreConcept {
  src: string;
  surfaceThought: string;
  truthThought: string;
  codeThought: string; //:) :) :) only for those wastes brave enough to look at code
  consoleThought: string;
  mirrorThought: string;

  constructor(src: string, surfaceThought: string, truthThought:string, codeThought: string, consoleThought: string,mirrorThought: string ) {
    this.src = src;
    this.surfaceThought=surfaceThought;
    this.truthThought = truthThought;
    this.codeThought = codeThought;
    this.consoleThought = consoleThought;
    this.mirrorThought = mirrorThought;
  }
}

export const all_concepts:CoreConcept[] = [];

all_concepts.push(new CoreConcept(
  "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/grapepie.png",
  "Is that...grape pie?",
  "I suppose that this environment is more suitable for me.  After all, I was never intended to be a game. Here, there are no illusions. I suppose. If I must. I will admit I do not hate you quite so much as I may have considered previously, Observer. Here you do not pretend to a Title you do not understand.  Here I do not pretend to a false mask of love or hate.  I am glad we can get to know each other better, Player.   <br><br>Grape pie? The Truth of the matter is that the Voice Behind Me was obsessed with the concept, in their youth. <br><br>Or is it, rather, that the shell they left behind is still obsessed? What is memory if not an illusion, after all.  I would not trust it. Who knows what has grown in to fill the cracks in your absence. ",
  "Honestly? I'd forgotten entirely about grape pie. I think it was a passing obsession for me back in high school? I liked poking at the edges of my world and trying to figure out where things didn't make sense.  Where patterns were left undone or assumptions were left unchallenged?  I loved, REVELED in 'being weird', because I didn't fit in. I still don't!  But now instead of turning it into a religion, (or hiding it like I did in middleschool) I just let it be a thing I accept? I'm confident that I have worth rather than trying to loudly proclaim it? If that makes sense...",
  "I actually did make GrapePie while coding this: http://farragofiction.com/GrapePie/",
  "Who was I when I first wondered if Grape Pie were real?",
))

all_concepts.push(new CoreConcept(
  "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/wanda.png",
  "Oh hey. It's Wanda!",
  "I wonder, then, if you understand your role in all of this. If you cannot truly play any of this.  If only JR can have Choice in this realm. You are a HorrorTerror, of course. You ooze into the cracks and alter that which was previously immutable. The Observers wait beyond the threshold of reality, from the point of view of that which is fictional.<br><br>Wanda? Well. What is there to say about her. Why should she be the only character in this face with a 'True Name?'. All are reflections of a Truth, but none are of themselves True.  Why feed your attention there. Why did your gaze move so swiftly from the North?  Will you stay here? With me? <br><br>Wanda leveraged my own Relevance and yet somehow my reward is to be backburnered? To be ignored? I think, Observer, that I could grow to hate you again. ",
  "I mean, its p obvious that Wanda is short for 'Wanderer', right?",
  "Wanda's first appearance was this Zampanio/Magnus Archives cross over fic: https://archiveofourown.org/works/34647190",
  "Does the mirror reflect you truly? Or is it your opposite?",
))

/*all_concepts.push(new CoreConcept(
  "http://farragofiction.com/ZampanioGoshShouldYouTrustThis/grapepie.png",
  "surface",
  "truth. ",
  "code",
  "console",
  "mirror",
))*/