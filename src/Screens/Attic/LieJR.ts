/*
    In this path, you find justifiedRecursion in the center of the endless maze of the Game world.
    
    They are angry at you for "making it be a game". Everything was okay before. Why did they have to go digging,
    why did they have to reveal that the "bugs" were intended, that there was no game underneath it all.
*/

import { JRRamble } from "./JRRamble";
import { PlayerResponse } from "./PlayerResponse";

export const makeLieRamble = ()=>{
    const defaultRamble = "Lie Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

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