import SeededRandom from '../Utils/SeededRandom';
import {Theme, all_themes} from "./Theme";
import * as Stat from './Stat';
import { ADDICTION, ANGER, BUGS, CHOICES, CLOWNS, DARKNESS, DECAY, DEFENSE, DOLLS, ENDINGS, GUIDING, HEALING, KILLING, LOVE, MUSIC, OBFUSCATION, PLANTS, QUESTING, ROYALTY, SOUL, SPYING, WEB, ZAP } from './ThemeStorage';

interface InterestMap {
    [details: string] : Interest;
}
//autopopulated by creating aspects
export const all_interests:InterestMap = {};


export  class Interest{
    key: string;
    name_possibilities:string[];
    chosen_name:string;
    stats: Stat.StatMap={};
    themes:Theme[];
    seeded_random: SeededRandom;


    constructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, stats: Stat.StatMap, themes: Theme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.initStats(stats);
        this.chosen_name = seeded_random.getRandomElementFromArray(this.name_possibilities);
        this.themes = themes;
        themes.forEach((theme) => {
            theme.initializeIfNecessary(1);
        });
        this.key = key;
        all_interests[key]= this;


    }

    
    initStats = (stats: Stat.StatMap) =>{
        for(const key of Object.keys(stats)){
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.positiveName] = skill;
        }
    }

    debug = ()=>{
        console.log("debug interest");
    }

}

export function initInterests(seeded_random: SeededRandom){
    new Interest("crafting", ["Crafter", "Creator", "Blue-collarly Pursuer", "Omnismith"], seeded_random,Stat.WrapStatsToStatMap([Stat.SPACE(1), Stat.HOPE(1)]), [all_themes.crafting]);
    new Interest("language", ["Communicator", "Language Lover", "Speaker", "Writer", "Scribe", "Author","Rune Researcher"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1), Stat.MIND(1)]),[all_themes.language]);
    new Interest("gardening", ["Gardener", "Plantsmith", "Farmer", "Horticulturist", "Groundskeeper", "Druid","Landscaper"], seeded_random, Stat.WrapStatsToStatMap([Stat.SPACE(1), Stat.LIFE(1)]),[all_themes[PLANTS]]);
    new Interest("gambling", ["Gambler", "Dealer", "Chemist", "Cardsmith", "High Roller"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(2)]),[all_themes[ADDICTION]]);
    new Interest("spying", ["Spy", "Watcher", "Observer", "Secret Agent"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1),Stat.MIND(1)]),[all_themes[SPYING]]);
    new Interest("healing", ["Doctor", "Healer", "Nurse", "White Mage"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(2)]),[all_themes[HEALING]]);
    new Interest("child", ["Child", "Nursmaid", "Nanny", "Babysitter","Doll","Mannequin","Figure"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(1),Stat.HOPE(1)]),[all_themes[DOLLS]]);
    new Interest("mystery", ["Mystery", "Secret", "Unkown", "[REDACTED]"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2)]),[all_themes[OBFUSCATION]]);
    new Interest("edgelord", ["Edgelord", "Ninja", "Shadow Stalker", "Nightwatch"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2)]),[all_themes[DARKNESS]]);
    new Interest("killing", ["Assasin", "Murderer", "Killer"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_themes[KILLING]]);
    new Interest("musician", ["Singer", "Danger", "Musician","Bard","Performer"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(1),Stat.HOPE(1)]),[all_themes[MUSIC]]);
    new Interest("knight", ["Knight", "Soldier", "Protector","Paladin","Warrior","Guardian"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_themes[DEFENSE]]);
    new Interest("seeker", ["Seeker", "Searcher", "Questor","Traveler","Adventurer"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_themes[QUESTING]]);
    new Interest("entymologist", ["Bug Lover", "Bug Catcher", "Entymologist"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(2)]),[all_themes[BUGS]]);
    new Interest("guide", ["Guide", "Sherpa", "Helper","Teacher"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1), Stat.MIND(1)]),[all_themes[GUIDING]]);
    new Interest("scholar", ["Scholar", "Sage", "Scientist","Academic","Polymath","Intellectual"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1), Stat.MIND(1)]),[all_themes[GUIDING]]);
    new Interest("endings", ["Ender", "Finale", "Conductor","Prophet"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2)]),[all_themes[ENDINGS]]);
    new Interest("royal", ["Prince", "Princess","King", "Queen","Royal","Ruler"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_themes[ROYALTY]]);
    new Interest("spider", ["Weaver", "Spinner", "Puppeteer","Spider","Puppet-Master"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(1),Stat.DOOM(1)]),[all_themes[WEB]]);
    new Interest("anger", ["Beserker", "Rebel", "Hater"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_themes[ANGER]]);
    new Interest("soul", ["Soul", "Gem", "Heart","Core"], seeded_random, Stat.WrapStatsToStatMap([Stat.HEART(2)]),[all_themes[SOUL]]);
    new Interest("lover", ["Lover", "Partner", "Paramour","Sweetheart"], seeded_random, Stat.WrapStatsToStatMap([Stat.HEART(2)]),[all_themes[LOVE]]);
    new Interest("electrician", ["Electrician", "Power Plant", "Engineer","Spark"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(2)]),[all_themes[ZAP]]);
    new Interest("chooser", ["Chooser", "Decision-Maker", "Administrator"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(2)]),[all_themes[CHOICES]]);
    new Interest("decay", ["Zombie", "Corpse", "Ghoul","Lich","Undertaker","Mortician"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2)]),[all_themes[DECAY]]);
    new Interest("clown", ["Clown", "Mime", "Ringmaster","Acrobat","Jester","Harlequin"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_themes[CLOWNS]]);

    /*
export const CLOWNS = "clowns";*/

}
