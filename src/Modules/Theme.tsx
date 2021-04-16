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


    constructor(key: string, solo_name_possibilities: string[],first_name_possibilities: string[], second_name_possibilities: string[] ){
        this.key = key;
        this.solo_name_possibilities = solo_name_possibilities;
        this.first_name_possibilities = first_name_possibilities;
        this.second_name_possibilities = second_name_possibilities;
        all_themes[key] = this;
    }

    debug = ()=>{
        console.log("debug theme");
    }

}

export function initThemes(){
    new Theme("Healing", ["Heal", "Cure", "Regeneration"],["Healing", "Curing", "Restoring"],["Healing", "Curative", "Restorative"]);

}


