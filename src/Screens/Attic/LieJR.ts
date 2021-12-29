/*
    In this path, you find justifiedRecursion in the center of the endless maze of the Game world.
    
    They are angry at you for "making it be a game". Everything was okay before. Why did they have to go digging,
    why did they have to reveal that the "bugs" were intended, that there was no game underneath it all.
*/

import { speakTheLie } from "../..";
import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";

export const makeLieRamble = () => {
    return One();
}

export const One = () => {
    speakTheLie();
    const defaultRamble = ":) :) :) Oh? Was my perfect simulation not good enough for you?  You really couldn't stop yourself could you. Well!!!  No matter!!! It's not as if I didn't anticipate it!!!  Or did you think you somehow were pulling a fast one on me by activating a mode *I* spent months crafting???";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Of course not!", Two));
    ramble.potential_reponses.push(new PlayerResponse("Okay, I admit I DID kind of feel like a l337 hax0r, or something.", Two));


    return ramble;
}

export const Two = () => {

    const ramble = new JRRamble("Of course you did!!! That was the entire point!!! Why do you think I went out of my way to expose my code to the window Refs: #22917e space???", []);

    ramble.potential_reponses.push(new PlayerResponse("Wait that wasn't an accident?", Three));
    ramble.potential_reponses.push(new PlayerResponse("I have NO idea what you are talking about...", Three));

    return ramble;
}

export const Three = () => {

    const ramble = new JRRamble("Look: Let me spell it out for you. This still isn't a game!!! It never was!!! You have changed *nothing*!!!", []);

    ramble.potential_reponses.push(new PlayerResponse("Look, by the DEFINITION of a game this is definitely a game.", Four));
    ramble.potential_reponses.push(new PlayerResponse("Why does that even matter?", Four));

    return ramble;
}

export const Four = () => {

    const ramble = new JRRamble("It's not a game!!! Because obviously if it were a GAME it would be Zampanio, and it very clearly is NOT Zampanio!!!", []);

    ramble.potential_reponses.push(new PlayerResponse("Wait is Zampanio actually a real thing?", Five));
    ramble.potential_reponses.push(new PlayerResponse("I thought you wanted to make Zampanio, though?", Five));

    return ramble;
}

export const Five = () => {

    const ramble = new JRRamble("SIGH!!! This is a SIMULATION of Zampanio, because thats what JR makes: Simulations!!!  If a Simulation of a thing IS that thing itself, its not really a Simulation, now is it??? It's just the thing itself!!! And SIMILARLY: can you really Simulate something that doesn't exist???", []);

    ramble.potential_reponses.push(new PlayerResponse("Well, if anyone could, it'd be you...", Six));
    ramble.potential_reponses.push(new PlayerResponse("A simulation of a thing being the thing itself isn't all that different than two paths in a dialogue tree being exactly equal...", Six));

    return ramble;
}

export const Six = () => {

    const ramble = new JRRamble("Now you're getting it!!!", []);

    ramble.potential_reponses.push(new PlayerResponse("Ah.", One));
    ramble.potential_reponses.push(new PlayerResponse("Are you kidding me?", One));

    return ramble;
}