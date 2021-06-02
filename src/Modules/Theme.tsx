import * as Stat from './Stat';

interface ThemeMap {
    [details: string] : Theme;
}

//auto populated by creating themes. 
export const all_themes:ThemeMap = {};

export   class Theme{
    key: string;
    stats: Stat.StatMap={};
    solo_name_possibilities:string[];
    first_name_possibilities:string[];
    second_name_possibilities:string[];
    super_name_possibilities:string[];

    tier: number;


    constructor(key: string, tier: number,stats: Stat.StatMap, solo_name_possibilities: string[],first_name_possibilities: string[], second_name_possibilities: string[], super_name_possibilities: string[] ){
        this.key = key;
        this.tier = tier;
        this.initStats(stats);
        this.solo_name_possibilities = solo_name_possibilities;
        this.first_name_possibilities = first_name_possibilities;
        this.second_name_possibilities = second_name_possibilities;
        this.super_name_possibilities = super_name_possibilities;
        all_themes[key] = this;
    }

    initializeIfNecessary =(tier: number)=>{
        if(!this.tier || this.tier === 0){
            this.tier = tier;
        }
    }

    initStats = (stats: Stat.StatMap) =>{
        for(const key of Object.keys(stats)){
            //whatever direction and magnitude the sample stat is, do it too
            const skill = stats[key].copy(null);
            this.stats[skill.positiveName] = skill;
        }
    }

    debug = ()=>{
        console.log("debug theme");
    }

}

//tiers of 0 will be initialized when in use 
//(YES this means that if the first player to use "Healing" theme has it high tier it will be high for EVERYONE. deal with tihs. )
export function initThemes(){
    new Theme("healing", 0,Stat.WrapStatsToStatMap([Stat.LIFE(1)]),["Heal", "Cure", "Regeneration"],["Healing", "Curing", "Restoring","Fixing","Mending","Doctoring","Medical"],["Healing","Doctor", "Medical","Fix","Mend","Curative", "Restorative"],["Summon Phoenix"]);
    new Theme("plants", 0,Stat.WrapStatsToStatMap([Stat.LIFE(1)]),["Growth", "Summon Plants", "Overgrow"],["Forest", "Field", "Meadow","Plant","Flower","Blossom","Root","Leaf","Growth"],["Growth", "Plants", "Leaves", "Branches", "Flowers","Blossoms","Forests","Roots","Green"],["Forest's March"]);
    new Theme("decay", 0,Stat.WrapStatsToStatMap([Stat.DOOM(1)]),["Inevitable Rot", "Festering Growth", "Destroy Plants"],["Rot", "Decay", "Fester","Languish","Entropy"],["Decaying","Festering", "Rotting","Languishing"],["Mass Grave"]);
    new Theme("choices", 0,Stat.WrapStatsToStatMap([Stat.MIND(1)]),["Consider Choices", "Two Paths", "Ironically Flip Coin"],["Janus", "Choice", "Selection"],["Choice","Janus", "Options","Alternatives"],["Alternate Timeline"]);
    new Theme("zap", 0,Stat.WrapStatsToStatMap([Stat.MIND(1)]),["Sparking Bolt", "Magic Missle", "Zap"],["Zap", "Bolt", "Spark","Electrical","Buzzing"],["Electricity","Zap", "Bolt","Spark"],["Thor's Banana"]);
    new Theme("love", 0,Stat.WrapStatsToStatMap([Stat.MIND(1)]),["Cupid's Arrow"],["Kiss", "Hug", "Caress","Touch"],["Fondness","Love","Hearts", "Devotion","Romance"],["Mandatory Shipping Grid"]);
    new Theme("soul", 0,Stat.WrapStatsToStatMap([Stat.MIND(1)]),["Soul Music"],["Core", "Soul", "Spirit","Essence"],["Self","Soul", "Spirit","Identity"],["Know thyself."]);
    new Theme("anger", 0,Stat.WrapStatsToStatMap([Stat.RAGE(1)]),["Beserk Rage"],["Beserker's", "Stampeding", "Raging","Furious","Rebel's"],["Temper","Rage", "Anger","Rebellion","Refusal"],["Dethrone Creation"]);

    new Theme("web", 0,Stat.WrapStatsToStatMap([Stat.DOOM(1)]),["Web of Fate", "Destiny Bond", "Show Destiny"],["Destiny", "Fate", "Web","Tapestry","Providence","Promise"],["Destiny", "Providence", "Fated", "Promised", "Threads","Webs"],["Puppet Master"]);
    new Theme("royalty", 0,Stat.WrapStatsToStatMap([Stat.HOPE(1),Stat.LIGHT(1)]),["Royal Decree", "Royal Perogative", "Royal Right", "Royal Command"],["Royal", "King", "Queen", "Lord", "Crown","Commanding","Empire"],["Decree", "Doctrine", "Crown","Kingdom"],["Excalibur"]);
    new Theme("endings", 0,Stat.WrapStatsToStatMap([Stat.RAGE(1),Stat.DOOM(1)]),["Final Finale", "Coda", "Postscript"],["Finale", "Coda", "Epilogue", "Ending","Curtain", "Applause"],["Finality", "Endings", "Finales","Curtains"],["The End"]);

    new Theme("knowing", 0,Stat.WrapStatsToStatMap([Stat.MIND(1),Stat.LIGHT(1)]),["Identify Item", "Detect Magic", "See Life", "Appraisal"],["Knowledge", "Instinct", "Truth","Idea","Gnosis","Awareness","Sense"],["Sight", "Book", "Scroll", "Facts", "Gnosis","Idea","Knowledge"],["Omniscience"]);
    new Theme("guiding", 0,Stat.WrapStatsToStatMap([Stat.BLOOD(1),Stat.LIGHT(1)]),["Goal Path", "Summon Tutorial", "Pathfinding", "Forestry", "Hiking"],["Path", "Road", "Journey","Destination","Trip","Guide"],["Path", "Road", "Journey","Destinations","Travel"],["Path To Victory"]);
    new Theme("crafting", 0,Stat.WrapStatsToStatMap([Stat.SPACE(1),Stat.DOOM(1)]),["Mining", "Wood Carving", "Fiber Arts", "Logging", "Jewlery Making"],["Crystal", "Rock", "Log", "Carving", "Cloth", "Ax", "Pickax", "Gem", "Anvil", "Crucible","Hammer","Ax","Needle"],["Rock", "Crystal", "Gem","Carving","Wood","Metal","Ore","Ingots"],["Legendary Forge"]);
    new Theme("language", 0,Stat.WrapStatsToStatMap([Stat.MIND(1),Stat.BREATH(1)]),["Language", "Speech", "Writing", "Scribing"],["Words", "Runes", "Speech", "Tongue"],["Speech", "Words", "Runes","Letters","Characters","Ink","Paper"],["Topple the Tower"]);
    new Theme("bugs", 0,Stat.WrapStatsToStatMap([Stat.LIFE(1)]),["Summon Swarm"],["Plague", "Swarm","Hive"],["Bugs", "Maggots", "Flies", "Worms","Locusts"],["Hivemother"]);
    new Theme("addiction", 0,Stat.WrapStatsToStatMap([Stat.HEART(1)]),["Addicting Personality","Gamblers Fallacy"],["Craving", "Addiction","High","Habit","Compulsion"],["Cravings", "Compulsion", "Dependence","Habit"],["Dealer's Delight"]);
    new Theme("spying", 0,Stat.WrapStatsToStatMap([Stat.LIGHT(1)]),["Binoculars","Clairvoyance"],["Voyeuristic", "Watching","Observing","Spying","Seeking"],["Eyes", "Cameras", "Spies","Recordings"],["Surveillance State"]);
    new Theme("clowns", 0,Stat.WrapStatsToStatMap([Stat.RAGE(1)]),["Circus Time","Clown Car"],["Tumble", "Flip","Joke","Pratfall","Dance","Performance","Clown","Jester","Mime"],["Jesters","Clowns", "Harlequins", "Mimes"],["Ringmaster"]);
    new Theme("dolls", 0,Stat.WrapStatsToStatMap([Stat.MIND(1)]),["Tea Party"],["Doll", "Mannequin","Statue","Dressform","Dummy"],["Dolls", "Statues", "Mannequins","Plastic","Wax Figures"],["Automatonophobia "]);
    new Theme("obfuscation", 0,Stat.WrapStatsToStatMap([Stat.VOID(1)]),["Befuddlement","Obscuring Aura"],["Hiding", "Obscuring","Confounding","Confusing","Blinding"],["Confusion", "Befuddlement","Obscura"],["Knowledge Forever Lost"]);
    new Theme("darkness", 0,Stat.WrapStatsToStatMap([Stat.VOID(1)]),["Nightfall","Voidfall"],["Darkness", "Black","Inky","Night","Midnight"],["Shadows", "Void", "Darkness","Nothingness"],["Eternal Night"]);
    new Theme("killing", 0,Stat.WrapStatsToStatMap([Stat.VOID(1)]),["Assasin's Stance","Bloodlust"],["Killing", "Murder","Slaughter","Massacre","Blade","Gun"],["Death", "Violence", "Blades","Guns"],["Total War"]);
    new Theme("music", 0,Stat.WrapStatsToStatMap([Stat.VOID(1)]),["Starting Sonata","Dancing Ditty"],["Fortississimo", "Leitmotif", "Liberetto", "Sarabande", "Serenade", "Anthem", "Crescendo", "Vivace", "Encore", "Vivante", "Allegretto", "Fugue", "Choir", "Nobilmente", "Hymn", "Eroico", "Chant", "Mysterioso", "Diminuendo", "Perdendo", "Staccato", "Allegro", "Caloroso", "Nocturne","Cadenza", "Cadence", "Waltz", "Concerto", "Finale", "Requiem", "Coda", "Dirge", "Battaglia", "Leggiadro", "Capriccio", "Presto", "Largo", "Accelerando", "Polytempo", "Overture", "Reprise", "Orchestra"],["Song", "Oveture", "Orchestra","Notes"],["Symphonic Synthesia"]);


}


