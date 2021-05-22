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
    new Theme("healing", 0,["Heal", "Cure", "Regeneration"],["Healing", "Curing", "Restoring","Fixing","Mending","Doctoring","Medical"],["Healing","Doctor", "Medical","Fix","Mend","Curative", "Restorative"]);
    new Theme("plants", 0,["Growth", "Summon Plants", "Overgrow"],["Forest", "Field", "Meadow","Plant","Flower","Blossom","Root","Leaf","Growth"],["Growth", "Plants", "Leaves", "Branches", "Flowers","Blossoms","Forests","Roots","Green"]);
    new Theme("decay", 0,["Inevitable Rot", "Festering Growth", "Destroy Plants"],["Rot", "Decay", "Fester","Languish","Entropy"],["Decaying","Festering", "Rotting","Languishing"]);
    new Theme("web", 0,["Web of Fate", "Destiny Bond", "Show Destiny"],["Destiny", "Fate", "Web","Tapestry","Providence","Promise"],["Destiny", "Providence", "Fated", "Promised", "Threads","Webs"]);
    new Theme("royalty", 0,["Royal Decree", "Royal Perogative", "Royal Right", "Royal Command"],["Royal", "King", "Queen", "Lord", "Crown","Commanding","Empire"],["Decree", "Doctrine", "Crown","Kingdom"]);
    new Theme("endings", 0,["Final Finale", "Coda", "Postscript"],["Finale", "Coda", "Epilogue", "Ending","Curtain", "Applause"],["Finality", "Endings", "Finales","Curtains"]);

    new Theme("knowing", 0,["Identify Item", "Detect Magic", "See Life", "Appraisal"],["Knowledge", "Instinct", "Truth","Idea","Gnosis","Awareness","Sense"],["Sight", "Book", "Scroll", "Facts", "Gnosis","Idea","Knowledge"]);
    new Theme("guiding", 0,["Goal Path", "Summon Tutorial", "Pathfinding", "Forestry", "Hiking"],["Path", "Road", "Journey","Destination","Trip","Guide"],["Path", "Road", "Journey","Destinations","Travel"]);
    new Theme("crafting", 0,["Mining", "Wood Carving", "Fiber Arts", "Logging", "Jewlery Making"],["Crystal", "Rock", "Log", "Carving", "Cloth", "Ax", "Pickax", "Gem", "Anvil", "Crucible","Hammer","Ax","Needle"],["Rock", "Crystal", "Gem","Carving","Wood","Metal","Ore","Ingots"]);
    new Theme("language", 0,["Language", "Speech", "Writing", "Scribing"],["Words", "Runes", "Speech", "Tongue"],["Speech", "Words", "Runes","Letters","Characters","Ink","Paper"]);


}


