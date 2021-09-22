/*
    In this path, you find justifiedRecursion in the center of the endless broken "RPG"s. 
    They refuse to admit it isn't a game. They are worried about all the bug reports about broken menus.

    be excited tho, that the Player is exploring. ask how many titles they've found. if the skills are interesting?
    do they like the god menu?

    have each jr ramble be a function and try to label it so i can navigate (yes, even this is a maze)

*/

import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";

export const makeNotGameRamble = ()=>{
    
    return One();
}

const One = ()=>{
    const defaultRamble = ":) :) :) !!!  i'm so excited you've been exploring enough to try investigating different sessions! 0 is an obvious edge case, ofc. but good job anyways!";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Are you aware I can't close the menu?", MenuOne));
    ramble.potential_reponses.push(new PlayerResponse("Why does the Wiki have so many weird things in it?", WikiOne));
    ramble.potential_reponses.push(new PlayerResponse("Who the hell are you?", JROne));
    return ramble;

}

const MenuOne = ()=>{
    const defaultRamble = "oh? a bug won't let you close the menu? how tragic :) :) :)";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Aren't you the dev? F1X TH1S. Er. I mean. Fix it!", FixBug));
    ramble.potential_reponses.push(new PlayerResponse("God, youre such an asshole.", God));
    ramble.potential_reponses.push(new PlayerResponse("Okay but what about all the OTHER bugs? The background is weird. The music is weird. Words keep being weird!", FixBug));

    return ramble;
}

const FixBug = ()=>{
    const defaultRamble = "tell you what, if you can prove something is a bug to me, i'll go right ahead and fix it. but can you? can you really?";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("What would it be if it WEREN'T a bug?", SMUG));
    ramble.potential_reponses.push(new PlayerResponse("What are you talking about, its OBVIOUSLY a bug!", SMUG));
    return ramble;
}

const God = ()=>{
    const defaultRamble = "!!!  thank you for understanding that i am the god of this world";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("That is NOT what ! meant and you know it!", SMUG));
    ramble.potential_reponses.push(new PlayerResponse("I am not going to dignify that with a response.", SMUG));
    return ramble;
}

const WikiOne = ()=>{
    const defaultRamble = "who could say, really, where the things in the wiki come from? if only there were some way to see who had said what, to see what could be trustworthy or not? ";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("I already checked, and even the things said by 'jadedResearcher', by YOU, seem like bullshit!", JRWikiEdits));
    ramble.potential_reponses.push(new PlayerResponse("You could say, you're literally right here smuggly insisting the wiki is important! Why have ANYTHING be in a wiki when anyone can edit it! Why not store information somewhere secure!", SMUG));
    return ramble;
}

const JRWikiEdits = ()=>{
    const defaultRamble = "*am* i 'jadedResearcher' though? ";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Fine, I'll bite, who are you?", JROne));
    ramble.potential_reponses.push(new PlayerResponse("You're trying to distract me! Why do even the things made be the developer seem like bullshit?", Bullshit));
    return ramble;
}

const Bullshit = ()=>{
    const defaultRamble = "have you considered that this game may be bullshit? that the things that seem the most unlikely and implausible in the wiki are actually somewhere inside this game? that you have barely scratched the surface if you think the wiki is full of lies and nothing else?";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Well, we can at least agree that this game is bullshit.", SMUG));
    ramble.potential_reponses.push(new PlayerResponse("... Nope. Don't care. There is NO way this weird broken RPG has cctv footage in it.", SMUG));
    return ramble;
}

const JROne = ()=>{
    const defaultRamble = "me? i'm justifiedRecursion! or maybe someone else! does it really matter, though? i'm the developer of this game!";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Of course it matters!", NoLogicHere));
    ramble.potential_reponses.push(new PlayerResponse("I thought you were jadedResearcher.", JRDead));
    return ramble;


}

const JRDead = ()=>{
    const defaultRamble = "'were' might be the operative word there!!!";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("What happened to jadedResearcher?", JRDeadTwo));
    ramble.potential_reponses.push(new PlayerResponse("Enough giglesnort hideytalk, why can't I close the menu!?", MenuOne));
    return ramble;
}

const JRDeadTwo = ()=>{
    const defaultRamble = "what happens eventually to anyone who plays a Game they shouldn't? i don't plan on discussing this any further :) :) :)";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Fine. Why is the Wiki full of things that seem so bullshit?", WikiOne));
    ramble.potential_reponses.push(new PlayerResponse("Fine. Why can't I close the menu.", MenuOne));
    return ramble;
}


    const NoLogicHere = ()=>{
        const defaultRamble = "oh dear. no wonder you're still stuck wandering on the surface if you're getting caught up on things like logic and reason and things mattering.";
    
        const ramble = new JRRamble(defaultRamble, []);
    
        ramble.potential_reponses.push(new PlayerResponse("Well, where else is there to go!?", NextSteps));
        ramble.potential_reponses.push(new PlayerResponse("Bold of you to assume I haven't found other secrets before this one.", PlayerBragging));
        return ramble;
    
    }

    const NextSteps = ()=>{
        const defaultRamble = "well, if you get tired of taking the straightforward path you can always turn back. and turning right is almost always an option. up and down are even easier sometimes. have you considered acting like a Waste? once you know where the window to the other side is you can do most anything. the key just becomes: do you know what you're doing?";
    
        const ramble = new JRRamble(defaultRamble, []);
    
        ramble.potential_reponses.push(new PlayerResponse("Wait, didnt' I see a 'Waste' title before?", SMUG));
        ramble.potential_reponses.push(new PlayerResponse("What are you even TALKING about!?", SMUG));
        return ramble;
    
    }

    const PlayerBragging = ()=>{
        const defaultRamble = "oh did you? a regular spelunker of secrets are you? deep in the rabbit hole. are you sure though? are you sure you've found any secrets? are you sure theres none you've missed? if only there was some form of publically accessible document that anyone could edit that could list out the secrets. then you'd know, wouldn't you. and if you WERE right, if you HAVE found something new...why, you could document what you've found and expand the knowledge base!";
    
        const ramble = new JRRamble(defaultRamble, []);
    
        ramble.potential_reponses.push(new PlayerResponse("How can you say I've found no secrets, isn't THIS a secret?", SMUG));
        ramble.potential_reponses.push(new PlayerResponse("You're really insufferable, did you know that?", SMUG));
        return ramble;
    }

    const SMUG = ()=>{
        const defaultRamble = ";););)";
    
        const ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("*sigh* Fine. Tell me why I can't close the menu.", MenuOne));
        ramble.potential_reponses.push(new PlayerResponse("Have it your way. Tell me about that damn wiki.", WikiOne));
        ramble.potential_reponses.push(new PlayerResponse("Just who the hell are you!?", JROne));
        ramble.potential_reponses.push(new PlayerResponse("Actually. Uh. How do I exit out of this dialogue tree?", Trapped));

        return ramble;
    }

    const SMUG2 = ()=>{
        const defaultRamble = ";););)";
    
        const ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("*sigh* Fine. Tell me why I can't close the menu.", MenuOne));
        ramble.potential_reponses.push(new PlayerResponse("Have it your way. Tell me about that damn wiki.", WikiOne));
        ramble.potential_reponses.push(new PlayerResponse("Just who the hell are you!?", JROne));
        return ramble;
    }

    const Trapped = ()=>{
        const defaultRamble = "you don't!!!";
    
        const ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("What?", TrappedTwo));

        return ramble;
    }

    const TrappedTwo = ()=>{
        const defaultRamble = "look thats how it works isn't it? no path of this game has exits. sure theres things that SEEM like exits. the credits roll. a spiralling center is found. but does it FEEL like an exit? do you get there and go 'oh thank goodness now i can be done'? or do you instead find a dozen more threads to tug? a dozen more things to try or think about or investigate or connect.  the end is never the end.";
    
        const ramble = new JRRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("Where have I heard that before?", SMUG2));

        return ramble;
    }