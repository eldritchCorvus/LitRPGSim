import { JRRamble } from "./JRRamble";

export class PlayerResponse{
    text: string;
    jr_response_function: Function;
    constructor(text: string, jr_response_function: Function){
        this.text = text;
        this.jr_response_function = jr_response_function;
    }
}