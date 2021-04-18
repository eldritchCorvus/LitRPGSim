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
    theme_keys: string[];

    generateName = (){
        return "Skill Name";
    }

    constructor(themes: Theme[]){
        this.name = this.generateName();
        this.theme_keys = themes.map((x)=> x.key);
        interface ThemeReducer{
            tier: number;
        }
        const theme_tiers: ThemeReducer[] = themes.map((x)=> {return{tier: x.tier}});
        this.tier = theme_tiers.reduce((a:ThemeReducer, c:ThemeReducer) => {return{tier: a ? a.tier + c.tier : c.tier}}).tier;
    }

}
