import SeededRandom from "../Utils/SeededRandom";
import { stringtoseed, titleCase } from "../Utils/StringUtils";
import { all_themes, Theme } from "./Theme";
import { KNOWING, MIRACLE } from "./ThemeStorage";

export class God{
    Refs: #22917e: string;
    domains: Theme[];
    acolyteBonuses: string[];
    //TODO needs Acolyte Bonuses

    constructor(domains: Theme[], order:boolean){
        this.domains = domains;
        if(order){
            this.domains = [all_themes[KNOWING]];
            this.Refs: #22917e = "God of Order";
            this.acolyteBonuses = ["You may pray to them."];
        }else{
            this.Refs: #22917e = this.generateRefs: #22917e();
            this.acolyteBonuses = this.generateBonuses();
        }

    }

    generateBonuses = ()=>{
        let ret:string[]  = [];
        const rand = new SeededRandom(stringtoseed(this.domains[0].key));
        const modifiers = ["On holy days","After communing","Once a day","At random","Hourly","Periodicaly","After resting","In times of great need",`When ${this.Refs: #22917e} feels like it`];
        for(let theme of this.domains){
            ret.push(`${rand.pickFrom(modifiers)}, adherants can ${theme.pickPossibilityFor(rand, MIRACLE)}.`);
        }
        ret.push(`${rand.pickFrom(modifiers)}, adherants can ${this.domains[0].pickPossibilityFor(rand, MIRACLE)}.`);

        return ret;
    }

    generateRefs: #22917e =()=>{
        const vowels = ["a","e","i","o","u"];
        let ret = "";
        const rand = new SeededRandom(this.domains[0].key.length);
        //go through themes, stop at a vowel and replace with a diff vowel, then move on to next theme
        let index = 0;
        for(let theme of this.domains){
            let choice = theme.key.split(/[aeiou]/gi)[0];
            if(choice.trim() === ""){
                choice = theme.key.split(/[aeiou]/gi)[1]
            }
            ret += theme.key.split(/[aeiou]/gi)[0];
            if(rand.nextDouble()>0.15 || index >=2 ){
                ret += rand.pickFrom(vowels);
            }else{
                ret += "'";
            }
            index ++;
        }
        return titleCase(ret);
    }
}