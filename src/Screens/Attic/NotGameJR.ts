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
    const defaultRamble = "Not GAme Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    const ramble = new JRRamble(defaultRamble, []);
    const ramble2 = new JRRamble("Did you get all that?", []);

    ramble.potential_reponses.push(new PlayerResponse("Why???", ramble2));
    ramble.potential_reponses.push(new PlayerResponse("Tell me more.", ramble2));
    ramble.potential_reponses.push(new PlayerResponse("Why yes I DO enjoy coconu mall.", ramble2));

    ramble2.potential_reponses.push(new PlayerResponse("Because.", ramble));
    ramble2.potential_reponses.push(new PlayerResponse("Please stop talking.", ramble));
    ramble2.potential_reponses.push(new PlayerResponse("Wait I meant coconut.", ramble));
    return ramble;
}