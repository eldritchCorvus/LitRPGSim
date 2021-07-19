import SeededRandom from "../Utils/SeededRandom";
import { titleCase } from "../Utils/StringUtils";
import { Theme } from "./Theme";

export class God{
    name: string;
    domains: Theme[];
    //TODO needs Acolyte Bonuses

    constructor(domains: Theme[]){
        this.domains = domains;
        this.name = this.generateName();
    }

    generateName =()=>{
        const vowels = ["a","e","i","o","u"];
        let ret = "";
        const rand = new SeededRandom(this.domains[0].key.length);
        //go through themes, stop at a vowel and replace with a diff vowel, then move on to next theme
        for(let theme of this.domains){
            ret += theme.key.split(/[aeiou]/gi)[0];
            if(rand.nextDouble()>0.3){
                ret += rand.pickFrom(vowels);
            }else{
                ret += "'";
            }
        }
        return titleCase(ret);
    }
}