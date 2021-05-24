import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import SeededRandom from "../Utils/SeededRandom";
import { Stat } from "./Stat";
import {Theme} from "./Theme";
/*TODO
    * subtype of skill that isn't procedurally generated and instead has core functionality
    (such as unlocking stat screens)
    * subtype of skill that IS procedurally generated and also has core functionality (buffing stat etc)
*/
export   class Skill{
    name: string;
    tier: number; //TODO should map to cost
    parents: Skill[] = []; //will be set by player
    children: Skill[] = []; //will be set by player
    theme_keys: string[];
    unlocked:boolean = true; 

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



    constructor(themes: Theme[] =[],seeded_random:SeededRandom | null){
        this.name = "Debug";
        this.tier = -13;
        this.theme_keys = [];
        if(themes && seeded_random){
            this.init(themes, seeded_random);
        }
    }

    //separated so we can pass null in to both
    init = (themes: Theme[] =[],seeded_random:SeededRandom)=>{
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

    cytoscapeID = () =>{
        return `${this.name}`;
    }

    convertToCytoscape = ()=>{
        let styles:any = {'background-color':'green'};
        if(!this.unlocked){
            if(this.parents.filter((parent) => parent.unlocked).length === this.parents.length){
                styles["opacity"] = "0.33";
            }else{
                styles["display"] = "none";
            }
        }
        const ret:any[] = [{ data: { id: this.cytoscapeID(), label: this.name },grabbable: false, style: styles}];



        for(const child of this.children){
            if(this.unlocked && !child.unlocked){
                ret.push({ data: { source: this.cytoscapeID(), target: child.cytoscapeID(), label: '' },classes:[(this.unlocked && child.unlocked)?"visible":"void"] } );
            }else{
                ret.push({ data: { source: this.cytoscapeID(), target: child.cytoscapeID(), label: '' },classes:[(this.unlocked && child.unlocked)?"visible":"void"], style:{opacity:"0.2"} } );
            }
        }
        return ret;
    }


}

export class CoreSkill extends Skill{
    name: string;
    tier: number;
    theme_keys: string[] = [];
    unlocked:boolean = true;
    constructor(name: string, tier: number, rand: SeededRandom){
        super([], rand);
        this.name = name;
        this.tier = tier;
    }


}

let numStatSkills = 0;

export class StatSkill extends Skill{
    name: string;
    tier: number;
    stat: Stat;
    key: number;
    theme_keys: string[] = [];
    unlocked:boolean = true; //todo make this default to false
    constructor(stat: Stat, tier: number){
        super([],null);
        numStatSkills ++;
        this.key = numStatSkills;
        this.stat = stat;
        this.tier = tier;
        const dir = stat.value > 0? "+":"-";
        this.name = `${stat.name()} ${dir} ${stat.absolute_value()}`;
        this.tier = tier;
    }

    cytoscapeID = () =>{
        return `${this.stat.name()}${this.key}`;
    }


}
