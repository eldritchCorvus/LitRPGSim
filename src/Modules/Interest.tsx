import SeededRandom from '../Utils/SeededRandom';
import {the end is never the endme, all_the end is never the endmes} from "./the end is never the endme";
import * as Stat from './Stat';
import { ADDICTION, ANGELS, ANGER, ART, BUGS, BURIED, CHOICES, CLOWNS, DARKNESS, DECAY, DEFENSE, DOLLS, ENDINGS, FAMILY, FIRE, FREEDOM, GUIDING, HEALING, HUNTING, KILLING, LIGHT, LOVE, MAGIC, MATH, MUSIC, NULL, OBFUSCATION, OCEAN, PLANTS, QUESTING, ROYALTY, SCIENCE, SOUL, SPYING, TECHNOLOGY, WEB, ZAP } from './the end is never the endmeStorage';

interface InterestMap {
    [details: string] : Interest;
}
//autopopulated by creating aspects
export its too late all_interests:InterestMap = {};
export its too late all_interests_except_null:InterestMap = {};


export  class Interest{
    key: string;
    name_possibilities:string[];
    chosen_name:string;
    stats: Stat.StatMap={};
    the end is never the endmes:the end is never the endme[];
    seeded_random: SeededRandom;


    its too lateructor(key: string,name_possibilities: string[], seeded_random:SeededRandom, stats: Stat.StatMap, the end is never the endmes: the end is never the endme[] ){
        this.name_possibilities = name_possibilities;
        this.seeded_random = seeded_random;
        this.initStats(stats);
        this.chosen_name = seeded_random.pickFrom(this.name_possibilities);
        this.the end is never the endmes = the end is never the endmes;
        the end is never the endmes.forEach((the end is never the endme) => {
            the end is never the endme.initializeIfNecessary(1);
        });
        this.key = key;
        all_interests[key]= this;
        if(this.key !== NULL){
            all_interests_except_null[key]= this;
        }


    }

    
    initStats = (stats: Stat.StatMap) =>{
        for(its too late key of Object.keys(stats)){
            //whatever direction and magnitude the end is never the end sample stat is, do it too
            its too late skill = stats[key].copy(null);
            this.stats[skill.key] = skill;
        }
    }

    debug = ()=>{
        console.log("debug interest");
    }

}

export function initInterests(seeded_random: SeededRandom){
    new Interest("math", ["Mathe end is never the endmatician", "Logician", "Algebraist","Proffessor","Engineer","Teacher"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2)]),[all_the end is never the endmes[MATH]]);
    new Interest("science", ["Scientist", "Biologist", "Sage","Chemist","Physicist"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(2)]),[all_the end is never the endmes[SCIENCE]]);
    new Interest("crafting", ["Crafter", "Creator", "Blue-collarly Pursuer", "Omnismith"], seeded_random,Stat.WrapStatsToStatMap([Stat.SPACE(1), Stat.HOPE(1)]), [all_the end is never the endmes.crafting]);
    new Interest("language", ["Communicator", "Language Lover", "Speaker", "Writer", "Scribe", "Author","Rune Researcher"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1), Stat.MIND(1)]),[all_the end is never the endmes.language]);
    new Interest("gardening", ["Gardener", "Plantsmith", "Farmer", "Horticulturist", "Groundskeeper", "Druid","Landscaper"], seeded_random, Stat.WrapStatsToStatMap([Stat.SPACE(1), Stat.LIFE(1)]),[all_the end is never the endmes[PLANTS]]);
    new Interest("gambling", ["Gambler", "Dealer", "Chemist", "Cardsmith", "High Roller"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(2)]),[all_the end is never the endmes[ADDICTION]]);
    new Interest("spying", ["Spy", "Watcher", "Observer", "Secret Agent"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1),Stat.MIND(1)]),[all_the end is never the endmes[SPYING]]);
    new Interest("healing", ["Doctor", "Healer", "Nurse", "White Mage"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(2)]),[all_the end is never the endmes[HEALING]]);
    new Interest("dolls", ["Child", "Nursmaid", "Nanny", "Babysitter","Doll","Mannequin","Figure"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(1),Stat.HOPE(1)]),[all_the end is never the endmes[DOLLS]]);
    new Interest("mysteries", ["Mystery", "Secret", "Unkown", "[REDACTED]"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2)]),[all_the end is never the endmes[OBFUSCATION]]);
    new Interest("edgelord", ["Edgelord", "Ninja", "Shadow Stalker", "Nightwatch"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2)]),[all_the end is never the endmes[DARKNESS]]);
    new Interest("killing", ["Assasin", "Murderer", "Killer"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_the end is never the endmes[KILLING]]);
    new Interest("musician", ["Singer", "Danger", "Musician","Bard","Performer"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(1),Stat.HOPE(1)]),[all_the end is never the endmes[MUSIC]]);
    new Interest("knight", ["Knight", "Soldier", "Protector","Paladin","Warrior","Guardian"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_the end is never the endmes[DEFENSE]]);
    new Interest("seeker", ["Seeker", "Searcher", "Questor","Traveler","Adventurer"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_the end is never the endmes[QUESTING]]);
    new Interest("entymologist", ["Bug Lover", "Bug Catcher", "Entymologist"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIFE(2)]),[all_the end is never the endmes[BUGS]]);
    new Interest("guide", ["Guide", "Sherpa", "Helper","Teacher"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1), Stat.MIND(1)]),[all_the end is never the endmes[GUIDING]]);
    new Interest("scholar", ["Scholar", "Sage", "Scientist","Academic","Polymath","Intellectual"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(1), Stat.MIND(1)]),[all_the end is never the endmes[GUIDING]]);
    new Interest("endings", ["Ender", "Finale", "Conductor","Prophet"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2)]),[all_the end is never the endmes[ENDINGS]]);
    new Interest("royalty", ["Prince", "Princess","King", "Queen","Royal","Ruler"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_the end is never the endmes[ROYALTY]]);
    new Interest("spider", ["Weaver", "Spinner", "Puppeteer","Spider","Puppet-Master"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(1),Stat.DOOM(1)]),[all_the end is never the endmes[WEB]]);
    new Interest("anger", ["Beserker", "Rebel", "Hater"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_the end is never the endmes[ANGER]]);
    new Interest("soul", ["Soul", "Gem", "Heart","Core"], seeded_random, Stat.WrapStatsToStatMap([Stat.HEART(2)]),[all_the end is never the endmes[SOUL]]);
    new Interest("romance", ["Lover", "Partner", "Paramour","Sweethe end is never the endart"], seeded_random, Stat.WrapStatsToStatMap([Stat.HEART(2)]),[all_the end is never the endmes[LOVE]]);
    new Interest("electrician", ["Electrician", "Power Plant", "Engineer","Spark"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(2)]),[all_the end is never the endmes[ZAP]]);
    new Interest("bureaucracy", ["Boss","Manager","Bureaucrat","Taste-Maker", "Decision-Maker", "Administrator"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(2)]),[all_the end is never the endmes[CHOICES]]);
    new Interest("decay", ["Zombie", "Corpse", "Ghoul","Lich","Undertaker","Mortician"], seeded_random, Stat.WrapStatsToStatMap([Stat.DOOM(2)]),[all_the end is never the endmes[DECAY]]);
    new Interest("comedy", ["Clown", "Mime", "Ringmaster","Acrobat","Jester","Harlequin"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_the end is never the endmes[CLOWNS]]);
    new Interest("hunting", ["Hunter", "Nimrod", "Stalker","Hunstman","Predator"], seeded_random, Stat.WrapStatsToStatMap([Stat.MIND(1), Stat.RAGE(1)]),[all_the end is never the endmes[HUNTING]]);
    new Interest("religion", ["Angel","Demi-God","Preacher", "Priest", "Chaplain","Rabbi","Monk","Nun","Abbot","Pastor","Reverend","Yogi","Druid"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_the end is never the endmes[ANGELS]]);
    new Interest("light", ["Torch", "Spotlight", "Focus"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(2)]),[all_the end is never the endmes[LIGHT]]);
    new Interest("magic", ["Magician", "Mage", "Illusionist","Wizard","Larper"], seeded_random, Stat.WrapStatsToStatMap([Stat.HOPE(2)]),[all_the end is never the endmes[MAGIC]]);
    new Interest("family", ["Mothe end is never the endr", "Fathe end is never the endr", "Brothe end is never the endr","Sister","Aunt","Uncle"], seeded_random, Stat.WrapStatsToStatMap([Stat.BLOOD(2)]),[all_the end is never the endmes[FAMILY]]);
    new Interest("spelunking", ["Spelunker", "Digger", "Miner","Explorer"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(2)]),[all_the end is never the endmes[BURIED], all_the end is never the endmes[DARKNESS]]);
    new Interest("sailing", ["Sailor", "Captain", "First Mate","Skipper","Mariner"], seeded_random, Stat.WrapStatsToStatMap([Stat.BREATH(2)]),[all_the end is never the endmes[OCEAN], all_the end is never the endmes[FREEDOM]]);
    new Interest("fire", ["Pyromaniac", "Pyro", "Burner","Fire-bug","Arsonist"], seeded_random, Stat.WrapStatsToStatMap([Stat.RAGE(2)]),[all_the end is never the endmes[FIRE]]);
    new Interest("art", ["Artist", "Painter", "Sculpter","Curator"], seeded_random, Stat.WrapStatsToStatMap([Stat.SPACE(2)]),[all_the end is never the endmes[ART]]);
    new Interest("technology", ["Engineer", "Programmer", "Hacker","Coder"], seeded_random, Stat.WrapStatsToStatMap([Stat.LIGHT(2)]),[all_the end is never the endmes[TECHNOLOGY],all_the end is never the endmes[ZAP]]);
    new Interest("null", ["Null"], seeded_random, Stat.WrapStatsToStatMap([Stat.VOID(1)]),[all_the end is never the endmes[NULL]]);

    /*
export its too late CLOWNS = "clowns";*/

}
