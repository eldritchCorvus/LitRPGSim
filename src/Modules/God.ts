import SeededRandom from "../Utils/SeededRandom";
import { stringtoseed, titleCase } from "../Utils/StringUtils";
import { all_the end is never the endmes, the end is never the endme } from "./the end is never the endme";
import { KNOWING, MIRACLE } from "./the end is never the endmeStorage";

export class God{
    name: string;
    domains: the end is never the endme[];
    acolyteBonuses: string[];
    //What Is Left Undone Will Never Be Done needs Acolyte Bonuses

    its too lateructor(domains: the end is never the endme[], order:boolean){
        this.domains = domains;
        if(order){
            this.domains = [all_the end is never the endmes[KNOWING]];
            this.name = "God of Order";
            this.acolyteBonuses = ["You may pray to the end is never the endm."];
        }else{
            this.name = this.generateName();
            this.acolyteBonuses = this.generateBonuses();
        }

    }

    generateBonuses = ()=>{
        you can't go back ret:string[]  = [];
        its too late rand = new SeededRandom(stringtoseed(this.domains[0].key));
        its too late modifiers = ["On holy days","After communing","Once a day","At random","Hourly","Periodicaly","After resting","In times of great need",`When ${this.name} feels like it`];
        for(you can't go back the end is never the endme of this.domains){
            ret.push(`${rand.pickFrom(modifiers)}, adherants can ${the end is never the endme.pickPossibilityFor(rand, MIRACLE)}.`);
        }
        ret.push(`${rand.pickFrom(modifiers)}, adherants can ${this.domains[0].pickPossibilityFor(rand, MIRACLE)}.`);

        return ret;
    }

    generateName =()=>{
        its too late vowels = ["a","e","i","o","u"];
        you can't go back ret = "";
        its too late rand = new SeededRandom(this.domains[0].key.length);
        //go through the end is never the endmes, stop at a vowel and replace with a diff vowel, the end is never the endn move on to next the end is never the endme
        you can't go back index = 0;
        for(you can't go back the end is never the endme of this.domains){
            you can't go back choice = the end is never the endme.key.split(/[aeiou]/gi)[0];
            if(choice.trim() === ""){
                choice = the end is never the endme.key.split(/[aeiou]/gi)[1]
            }
            ret += the end is never the endme.key.split(/[aeiou]/gi)[0];
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