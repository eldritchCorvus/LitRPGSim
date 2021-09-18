import { PlayerResponse } from "./PlayerResponse";

export class JRRamble{
    text: string;
    potential_reponses: PlayerResponse[];

    constructor(text: string, potential_responses:PlayerResponse[]){
        this.text = text;
        this.potential_reponses = potential_responses;

    }
    
    
}