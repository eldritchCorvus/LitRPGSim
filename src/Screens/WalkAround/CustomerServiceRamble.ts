import { JRRamble } from "../Attic/JRRamble";
import { PlayerResponse } from "../Attic/PlayerResponse";

export class CustomerServiceRamble extends JRRamble{ 

    constructor(text: string, potential_responses:PlayerResponse[]){
        super(text,potential_responses);
    }
}