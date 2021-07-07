//LORE, BACKSTORY and QUESTS should grab from theme  mix and match templates that have things to fill
// in mad lib style (noun, adj, object, etc) and then have little frame parts that make things work
//like "long long ago".
export const SKILLGRAPH = "SKILLGRAPH"; //???
export const LOADING = "LOADING"; //just what kind of tips are in the loading screen?
export const STATUS = "STATUS"; //this obviously is gonna get upgraded.
export const STATISTICS = "STATISTICS"; //not all statistics are available at once
export const ACHIEVEMENTS = "ACHIEVEMENTS"; //can you see the achivements you haven't unlocked yet? are they black? readable?
export const OPTIONS = "OPTIONS"; //can you alter the menu opacity? activate hax mode? etc
export const QUESTS = "QUESTS"; //some quests get unlocked as the game progresses, obvs
export const COMPANIONS = "COMPANIONS"; //a title and a bit of backstory, plus what they think about you.
export const GODS = "GODS"; //do you have a patron? any curses by rival gods?
export const CITYBUILDING = "CITYBUILDING"; //what level is your smithy? are your people happy? sad?
export const INVENTORY = "INVENTORY"; //weapons, alchemy ingredients, scrolls, etc (each theme should have at least one associated object)
export const LORE = "LORE"; //whats the actual setting you're in? who is the big bad?
export const BACKSTORY = "BACKSTORY"; //does your char have amnesia? are you a stranger?
export const RESISTANCES = "RESISTANCES"; //are you weak to blunt? strong against heresy?
export const CODE = "CODE"; //can i force open the javascript console?
//only accessible if in RAGE MODE
export const TRUTH = "TRUTH";
export interface numbermap {
    [details: string] : number;
}


export const max_values_for_menus:numbermap = {
    SKILLGRAPH: 3, 
    LOADING: 3,
    STATUS: 3,
    STATISTICS: 3,
    ACHIEVEMENTS: 3,
    OPTIONS: 3,
    QUESTS: 3,
    COMPANIONS: 3,
    GODS: 3,
    CITYBUILDING: 3,
    INVENTORY: 3,
    LORE: 3,
    BACKSTORY: 3,
    RESISTANCES: 3,
    CODE: 3,
    TRUTH:3,
}