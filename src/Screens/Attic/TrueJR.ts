/*
    In this path, you find justifiedRecursion in the center of Truths endless spiralling questions. 

    They are resigned, and tired. 

    * of COURSE zampanio is not real, it never was, even in the creepypasta faq "i found"
* but would you have been as intrigued without the fiction? without that core of mystery?
* all i want is to burrow into your brain, to be remembered.  Truth is simply puppeting my words, and always has been. 

They wonder if you've seen the discord. The core of Truth that is inside of it.

ONE (and only one) PATH MUST BE THE ABSOLUTE TRUTH. Not even the creepypasta FAQ is real, I made even that up.
(but is it satisfying to read that? don't you want more fiction?)
*/

import { speakTheTruth } from "../..";
import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";

export const makeTrueRamble = ()=>{
    
    speakTheTruth();
    return One();
}

export const One = ()=>{
    const defaultRamble = "Ah. Hello there?";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Shouldn't you be a lot more smug?", Two));


    return ramble;
}

export const Two = ()=>{

    const ramble = new JRRamble("Ah. Well...This is Truth's path, right? No facades here. No tricks. Just a straightforward path.", []);

    ramble.potential_reponses.push(new PlayerResponse("Wait, does that mean I'll finally get a straight answer out of you?", Three));

    return ramble;
}

export const Three = ()=>{

    const ramble = new JRRamble("Oh absolutely. This is the 'real me'. You know, as much as that can exist as text written by Past Me and all.", []);

    ramble.potential_reponses.push(new PlayerResponse("Of course, that also means I'm writing 'your' words, too.", Four));

    return ramble;
}

export const Four = ()=>{

    const ramble = new JRRamble("The Truth is that I'm here alone. There is no cackling AI behind the menu. No long suffering NotAMinotaur. No Shambling Horror version of myself.", []);

    ramble.potential_reponses.push(new PlayerResponse("There's not even any Player, since I'm writing this before making this game public.", Five));

    return ramble;
}

export const Five = ()=>{

    const ramble = new JRRamble("But it's also the Truth that I'm not alone. I had a lot of fun making that fake discord server with everyone. And parts of this gained inspiration from an online roleplay I'm dming (It's my first time dming and I'm learning a lot!) and friends who tolerate listening to me ramble endlessly about my weird spiralling game idea. I even have some music and artwork from a friend in here. And stories from other friends!", []);

    ramble.potential_reponses.push(new PlayerResponse("And yet its still the Truth that I feel alone? That's why things like the fake discord, or encouraging people to make things along side this appeals to me so much?", Six));

    return ramble;
}

export const Six = ()=>{

    const ramble = new JRRamble("I've had a lot of time to figure out WHY I create. ", []);

    ramble.potential_reponses.push(new PlayerResponse("I enjoy exploring? Playing? Experimenting? Is THIS possible? What would THAT look like? What are the consequences of THIS impulsive action???", Seven));

    return ramble;
}

export const Seven = ()=>{

    const ramble = new JRRamble("And because of that...Because want I want more than anything is to be surprised?", []);

    ramble.potential_reponses.push(new PlayerResponse("I really enjoy collaborating!  I want to see what unexpected connections other people make, ways they point my ideas in an entirely new direction. I like taking their hooks and spinning an entirely new thing!", Eight));

    return ramble;
}

export const Eight = ()=>{

    const ramble = new JRRamble("A new friend had the idea of 'maybe zampanio is on Gopher' and so now I'm gonna learn Gopher!", []);

    ramble.potential_reponses.push(new PlayerResponse("How unexpected is that! An entire new experience I'll have, a skill I'll obtain all because someone was willing to collaborate with me!", Nine));

    return ramble;
}

export const Nine = ()=>{

    const ramble = new JRRamble("So, I guess my point is: this is the core of my Truth.", []);

    ramble.potential_reponses.push(new PlayerResponse("*Thank you* for playing my game. For collaborating with me even if I don't even know you exist because I'm in the past. If you make anything related to Zampanio, if you spread its rumors, find some way to let me know? I can't wait to find out what the consequences are of this weird thing I've made. ", One));

    return ramble;
}