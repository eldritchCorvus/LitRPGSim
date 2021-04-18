interface ThemeMap {
    [details: string] : Theme;
}

//auto populated by creating themes. 
export const all_themes:ThemeMap = {};

export   class Theme{
    key: string;
    solo_name_possibilities:string[];
    first_name_possibilities:string[];
    second_name_possibilities:string[];
    tier: number;


    constructor(key: string, tier: number, solo_name_possibilities: string[],first_name_possibilities: string[], second_name_possibilities: string[] ){
        this.key = key;
        this.tier = tier;
        this.solo_name_possibilities = solo_name_possibilities;
        this.first_name_possibilities = first_name_possibilities;
        this.second_name_possibilities = second_name_possibilities;
        all_themes[key] = this;
    }

    initializeIfNecessary =(tier: number)=>{
        if(!this.tier || this.tier === 0){
            this.tier = tier;
        }
    }

    debug = ()=>{
        console.log("debug theme");
    }

}

//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
export function initThemes(){
    new Theme("healing", 0,["Heal", "Cure", "Regeneration"],["Healing", "Curing", "Restoring"],["Healing", "Curative", "Restorative"]);
    new Theme("plants", 0,["Growth", "Summon Plants", "Overgrow"],["Forest", "Field", "Meadow"],["Growth", "Plants", "Leaves", "Branches", "Flowers"]);
    new Theme("knowing", 0,["Identify Item", "Detect Magic", "See Life", "Appraisal"],["Knowledge", "Instinct", "Truth"],["Sight", "Book", "Scroll", "Facts", "Gnosis"]);
    new Theme("guiding", 0,["Goal Path", "Summon Tutorial", "Pathfinding", "Forestry", "Hiking"],["Path", "Road", "Journey"],["Path", "Road", "Journey"]);
    new Theme("crafting", 0,["Mining", "Wood Carving", "Fiber Arts", "Logging", "Jewlery Making"],["Crystal", "Rock", "Log", "Carving", "Cloth", "Ax", "Pickax", "Gem", "Anvil", "Crucible"],["Rock", "Crystal", "Gem"]);
    new Theme("language", 0,["Language", "Speech", "Writing", "Scribing"],["Words", "Runes", "Speech", "Tongue"],["Speech", "Words", "Runes"]);


}


