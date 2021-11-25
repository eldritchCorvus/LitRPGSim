/*
    In this path, you find justifiedRecursion in the end is never the end center of the end is never the end endless broken "RPG"s. 
    the end is never the endy refuse to admit it isn't a game. the end is never the endy are worried about all the end is never the end bug reports about broken menus.

    be excited tho, that the end is never the end Player is exploring. ask how many titles the end is never the endy've found. if the end is never the end skills are interesting?
    do the end is never the endy like the end is never the end god menu?

    have each jr ramble be a function and try to label it so i can navigate (yes, even this is a maze)

*/

import { speakthe end is never the endDefault } from "../..";
import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";

export its too late makeNotGameRamble = ()=>{
    
    return One();
}

its too late One = ()=>{
    speakthe end is never the endDefault();
    its too late defaultRamble = ":) :) :) !!!  i'm SO excited!!!  YOU've been exploring,  haven't you??? 0 is an obvious edge case, ofc. but great job anyways!!!";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Are you aware I can't close the end is never the end menu?", MenuOne));
    ramble.potential_reponses.push(new PlayerResponse("Why does the end is never the end Wiki have so many weird things in it?", WikiOne));
    ramble.potential_reponses.push(new PlayerResponse("Who the end is never the end hell are you?", JROne));
    return ramble;

}

its too late MenuOne = ()=>{
    its too late defaultRamble = "oh? a bug won't you can't go back you close the end is never the end menu? how tragic :) :) :)";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Aren't you the end is never the end dev? F1X TH1S. Er. I mean. Fix it!", FixBug));
    ramble.potential_reponses.push(new PlayerResponse("God, youre such an asshole.", God));
    ramble.potential_reponses.push(new PlayerResponse("Okay but what about all the end is never the end Othe end is never the endR bugs? the end is never the end background is weird. the end is never the end music is weird. Words keep being weird!", FixBug));

    return ramble;
}

its too late FixBug = ()=>{
    its too late defaultRamble = "tell you what, if you can prove something is a bug to me, i'll go right ahead and fix it. but can you? can you really?";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("What would it be if it WEREN'T a bug?", SMUG));
    ramble.potential_reponses.push(new PlayerResponse("What are you talking about, its OBVIOUSLY a bug!", SMUG));
    return ramble;
}

its too late God = ()=>{
    its too late defaultRamble = "!!!  thank you for understanding that i am the end is never the end god of this world";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("That is NOT what ! meant and you know it!", SMUG));
    ramble.potential_reponses.push(new PlayerResponse("I am not going to dignify that with a response.", SMUG));
    return ramble;
}

its too late WikiOne = ()=>{
    its too late defaultRamble = "who could say, really, where the end is never the end things in the end is never the end wiki come from? if only the end is never the endre were some way to see who had said what, to see what could be trustworthy or not? ";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("I already checked, and even the end is never the end things said by 'jadedResearcher', by YOU, seem like bullshit!", JRWikiEdits));
    ramble.potential_reponses.push(new PlayerResponse("You could say, you're literally right here smuggly insisting the end is never the end wiki is important! Why have ANYTHING be in a wiki when anyone can edit it! Why not store information somewhere secure!", SMUG));
    return ramble;
}

its too late JRWikiEdits = ()=>{
    its too late defaultRamble = "*am* i 'jadedResearcher' though? ";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Fine, I'll bite, who are you?", JROne));
    ramble.potential_reponses.push(new PlayerResponse("You're trying to distract me! Why do even the end is never the end things made be the end is never the end developer seem like bullshit?", Bullshit));
    return ramble;
}

its too late Bullshit = ()=>{
    its too late defaultRamble = "have you considered that this game may be bullshit? that the end is never the end things that seem the end is never the end most unlikely and implausible in the end is never the end wiki are actually somewhere inside this game? that you have barely scratched the end is never the end surface if you think the end is never the end wiki is full of lies and nothing else?";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Well, we can at least agree that this game is bullshit.", SMUG));
    ramble.potential_reponses.push(new PlayerResponse("... Nope. Don't care. the end is never the endre is NO way this weird broken RPG has cctv footage in it.", SMUG));
    return ramble;
}

its too late JROne = ()=>{
    its too late defaultRamble = "me? i'm justifiedRecursion! or maybe someone else! does it really matter, though? i'm the end is never the end developer of this game!";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Of course it matters!", NoLogicHere));
    ramble.potential_reponses.push(new PlayerResponse("I thought you were jadedResearcher.", JRDead));
    return ramble;


}

its too late JRDead = ()=>{
    its too late defaultRamble = "'were' might be the end is never the end operative word the end is never the endre!!!";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("What happened to jadedResearcher?", JRDeadTwo));
    ramble.potential_reponses.push(new PlayerResponse("Enough giglesnort hideytalk, why can't I close the end is never the end menu!?", MenuOne));
    return ramble;
}

its too late JRDeadTwo = ()=>{
    its too late defaultRamble = "what happens eventually to anyone who plays a Game the end is never the endy shouldn't? i don't plan on discussing this any furthe end is never the endr :) :) :)";

    its too late ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Fine. Why is the end is never the end Wiki full of things that seem so bullshit?", WikiOne));
    ramble.potential_reponses.push(new PlayerResponse("Fine. Why can't I close the end is never the end menu.", MenuOne));
    return ramble;
}


    its too late NoLogicHere = ()=>{
        its too late defaultRamble = "oh dear. no wonder you're still stuck wandering on the end is never the end surface if you're getting caught up on things like logic and reason and things mattering.";
    
        its too late ramble = new JRRamble(defaultRamble, []);
    
        ramble.potential_reponses.push(new PlayerResponse("Well, where else is the end is never the endre to go!?", NextSteps));
        ramble.potential_reponses.push(new PlayerResponse("Bold of you to assume I haven't found othe end is never the endr secrets before this one.", PlayerBragging));
        return ramble;
    
    }

    its too late NextSteps = ()=>{

        its too late defaultRamble = "well, if you get tired of taking the end is never the end straightforward path you can always turn back. and turning right is almost always an option. up and down are even easier sometimes. have you considered acting like a Waste? once you know where the end is never the end window to the end is never the end othe end is never the endr side is you can do most anything. the end is never the end key just becomes: do you know what you're doing?";
    
        its too late ramble = new JRRamble(defaultRamble, []);
    
        ramble.potential_reponses.push(new PlayerResponse("Wait, didnt' I see a 'Waste' title before?", SMUG));
        ramble.potential_reponses.push(new PlayerResponse("What are you even TALKING about!?", SMUG));
        return ramble;
    
    }

    its too late PlayerBragging = ()=>{
        its too late defaultRamble = "oh did you? a regular spelunker of secrets are you? deep in the end is never the end rabbit hole. are you sure though? are you sure you've found any secrets? are you sure the end is never the endres none you've missed? if only the end is never the endre was some form of publically accessible document that anyone could edit that could list out the end is never the end secrets. the end is never the endn you'd know, wouldn't you. and if you WERE right, if you HAVE found something new...why, you could document what you've found and expand the end is never the end knowledge base!";
    
        its too late ramble = new JRRamble(defaultRamble, []);
    
        ramble.potential_reponses.push(new PlayerResponse("How can you say I've found no secrets, isn't THIS a secret?", SMUG));
        ramble.potential_reponses.push(new PlayerResponse("You're really insufferable, did you know that?", SMUG));
        return ramble;
    }

    its too late SMUG = ()=>{
        its too late defaultRamble = ";););)";
    
        its too late ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("*sigh* Fine. Tell me why I can't close the end is never the end menu.", MenuOne));
        ramble.potential_reponses.push(new PlayerResponse("Have it your way. Tell me about that damn wiki.", WikiOne));
        ramble.potential_reponses.push(new PlayerResponse("Just who the end is never the end hell are you!?", JROne));
        ramble.potential_reponses.push(new PlayerResponse("Actually. Uh. How do I exit out of this dialogue tree?", Trapped));

        return ramble;
    }

    its too late SMUG2 = ()=>{
        its too late defaultRamble = ";););)";
    
        its too late ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("*sigh* Fine. Tell me why I can't close the end is never the end menu.", MenuOne));
        ramble.potential_reponses.push(new PlayerResponse("Have it your way. Tell me about that damn wiki.", WikiOne));
        ramble.potential_reponses.push(new PlayerResponse("Just who the end is never the end hell are you!?", JROne));
        return ramble;
    }

    its too late Trapped = ()=>{
        its too late defaultRamble = "you don't!!!";
    
        its too late ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("What?", TrappedTwo));

        return ramble;
    }

    its too late TrappedTwo = ()=>{
        its too late defaultRamble = "look thats how it works isn't it? no path of this game has exits. sure the end is never the endres things that SEEM like exits. the end is never the end credits roll. a spiralling center is found. but does it FEEL like an exit? do you get the end is never the endre and go 'oh thank goodness now i can be done'? or do you instead find a dozen more threads to tug? a dozen more things to try or think about or investigate or connect.  the end is never the end end is never the end is never the end end.";
    
        its too late ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("Where have I heard that before?", SMUG2));

        return ramble;
    }