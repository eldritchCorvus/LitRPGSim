import { JRRamble } from "../Attic/JRRamble";
import { PlayerResponse } from "../Attic/PlayerResponse";

export class CustomerServiceRamble extends JRRamble{ 
    initials: string;

    constructor(initials: string, text: string, potential_responses:PlayerResponse[]){
        super(text,potential_responses);
        this.text = text;
        this.initials = initials;
        this.potential_reponses = potential_responses;

    }
}