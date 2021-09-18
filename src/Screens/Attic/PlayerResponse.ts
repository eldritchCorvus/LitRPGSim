import { JRRamble } from "./JRRamble";

export class PlayerResponse{
    text: string;
    jr_response: JRRamble;
    constructor(text: string, jr_response: JRRamble){
        this.text = text;
        this.jr_response = jr_response;
    }
}