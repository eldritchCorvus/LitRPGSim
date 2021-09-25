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
    const defaultRamble = "True Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Why???", Two));
    ramble.potential_reponses.push(new PlayerResponse("Tell me more.", Two));
    ramble.potential_reponses.push(new PlayerResponse("Why yes I DO enjoy coconu mall.", Two));


    return ramble;
}

export const Two = ()=>{

    const ramble = new JRRamble("Did you get all that?", []);

    ramble.potential_reponses.push(new PlayerResponse("Why???", One));
    ramble.potential_reponses.push(new PlayerResponse("Tell me more.", One));
    ramble.potential_reponses.push(new PlayerResponse("Why yes I DO enjoy coconu mall.", One));

    return ramble;
}