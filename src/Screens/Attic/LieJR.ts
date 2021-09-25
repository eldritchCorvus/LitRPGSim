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
    const defaultRamble = "Lie Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const ramble = new JRRamble(defaultRamble, []);

    ramble.potential_reponses.push(new PlayerResponse("Why???", Two));
    ramble.potential_reponses.push(new PlayerResponse("Tell me more.", Two));
    ramble.potential_reponses.push(new PlayerResponse("Why yes I DO enjoy coconu mall.", Two));


    return ramble;
}

export const Two = () => {

    const ramble = new JRRamble("Did you get all that?", []);

    ramble.potential_reponses.push(new PlayerResponse("Why???", One));
    ramble.potential_reponses.push(new PlayerResponse("Tell me more.", One));
    ramble.potential_reponses.push(new PlayerResponse("Why yes I DO enjoy coconu mall.", One));

    return ramble;
}