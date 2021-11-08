import { getRandomNumberBetween, pickFrom } from "../../Utils/NonSeededRandUtils";
import { JRRamble } from "../Attic/JRRamble";
import { PlayerResponse } from "../Attic/PlayerResponse";
import { CustomerServiceRamble } from "./CustomerServiceRamble";

export class CustomerSupportSpecialist {
    name: string;
    initials: string;
    title: string;
    extension: number;
    ramble: CustomerServiceRamble;

    constructor(name: string, extension: number, ramble: CustomerServiceRamble) {
        this.title = this.generateTitle();
        this.name = name;
        this.extension = extension;
        let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

        let tmp = [...name.matchAll(rgx)] || [];

        this.initials = ((tmp.shift()?.[1] || '') + (tmp.pop()?.[1] || '')).toUpperCase();
        this.ramble = ramble;
    }

    //Level X BULLSHIT DEPARTMENT, BULLSHIT TITTLE 
    //Tier 4 Customer Satisfaction Manager
    generateTitle = () => {
        const level = getRandomNumberBetween(1, 4);
        const level_word = ["Level", "Tier", "Category"]
        const department1 = ["Customer", "Consumer", "User", "Player", "Client", "Guest", "Customer", "Customer", "Technical"];
        const department2 = ["Experience", "Retention", "Service", "Operations", "Success", "Help", "Assistence", "Happiness", "Engagement", "Satisfaction", "Complaints", "Support", "Guidance"];
        const titles = ["Specialist", "Engineer", "Associate", "Agent", "Advisor", "Manager", "Advocate", "Coordinator", "Representative", "Trainer", "Expert", "Guide", "Ninja", "Guru", "Sherpa"];
        return `${pickFrom(level_word)} ${level} ${pickFrom(department1)} ${pickFrom(department2)} ${pickFrom(titles)}`
    }
}