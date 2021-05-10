import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import SeededRandom from "../Utils/SeededRandom";
import {Theme} from "./Theme";
/*TODO
    * subtype of skill that isn't procedurally generated and instead has core functionality
    (such as unlocking stat screens)
    * subtype of skill that IS procedurally generated and also has core functionality (buffing stat etc)
*/
export   class Skill{
    name: string;
    tier: number;
    parents: Skill[] = []; //will be set by player
    children: Skill[] = []; //will be set by player
    theme_keys: string[];
    unlocked:boolean = false; 

    generateName = (themes: Theme[], seeded_random:SeededRandom)=>{
       if(themes.length == 1){
        return seeded_random.getRandomElementFromArray(themes[0].solo_name_possibilities);
       }else if(themes.length == 2){
           const first =  seeded_random.getRandomElementFromArray(themes[0].first_name_possibilities);
           const second =  seeded_random.getRandomElementFromArray(themes[1].second_name_possibilities);
           const options = [`${first} of ${second}`,`${first} ${second}`];
           return seeded_random.getRandomElementFromArray(options);
       }else if (themes.length == 0){
           return "ERROR: no themes found";
       }else
           return "ERROR: more than two themes not yet supported";
       }


    constructor(themes: Theme[] =[],seeded_random:SeededRandom){
        this.name = this.generateName(themes, seeded_random);
        if(themes && themes.length >0){
        this.theme_keys = themes.map((x)=> x.key);
        interface ThemeReducer{
            tier: number;
        }
        const theme_tiers: ThemeReducer[] = themes.map((x)=> {return{tier: x.tier}});
        this.tier = theme_tiers.reduce((a:ThemeReducer, c:ThemeReducer) => {return{tier: a ? a.tier + c.tier : c.tier}}).tier;
        }else{
            this.theme_keys = [];
            this.tier = 0;
        }
    }

    toString = () => {
        return this.name;
    }

    convertToCytoscape = ()=>{
        console.log(`JR NOTE: converting ${this.name} to cytoscape, is unlocked is ${this.unlocked}`)
        let styles:any = {'background-color':'green'};
        if(!this.unlocked){
            if(this.parents.filter((parent) => parent.unlocked).length > 0){
                styles["opacity"] = "0.33";
            }else{
                styles["display"] = "none";
            }
        }
        const ret:any[] = [{ data: { id: this.name, label: this.name },grabbable: false, style: styles}];



        for(const child of this.children){
            ret.push({ data: { source: this.name, target: child.name, label: '' },classes:[(this.unlocked && child.unlocked)?"visible":"void"] } );
        }
        return ret;
    }


}

export class CoreSkill extends Skill{
    name: string;
    tier: number;
    theme_keys: string[] = [];
    unlocked:boolean = true; //todo make this default to false
    constructor(name: string, tier: number, rand: SeededRandom){
        super([], rand);
        this.name = name;
        this.tier = tier;
    }


}
