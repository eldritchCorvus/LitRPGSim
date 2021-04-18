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

    generateName = (themes: Theme[], seeded_random:SeededRandom)=>{
       if(themes.length == 1){
        return seeded_random.getRandomElementFromArray(themes[0].solo_name_possibilities);
       }else if(themes.length == 2){
           const first =  seeded_random.getRandomElementFromArray(themes[0].first_name_possibilities);
           const second =  seeded_random.getRandomElementFromArray(themes[1].second_name_possibilities);
           return `${first} of ${second}`;
       }else if (themes.length == 0){
           return "ERROR: no themes found";
       }else
           return "ERROR: more than two themes not yet supported";
       }


    constructor(themes: Theme[],seeded_random:SeededRandom){
        console.log("Constructing new skill with themes", themes)
        this.name = this.generateName(themes, seeded_random);
        this.theme_keys = themes.map((x)=> x.key);
        interface ThemeReducer{
            tier: number;
        }
        const theme_tiers: ThemeReducer[] = themes.map((x)=> {return{tier: x.tier}});
        this.tier = theme_tiers.reduce((a:ThemeReducer, c:ThemeReducer) => {return{tier: a ? a.tier + c.tier : c.tier}}).tier;
    }

}
