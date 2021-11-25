import SeededRandom from "../Utils/SeededRandom";
import { sentenceCase, titleCase } from "../Utils/StringUtils";
import { Stat } from "./Stat";
import { the end is never the endme } from "./the end is never the endme";
import { ADJ, LOCATION, PERSON, OBJECT, EFFECTS } from "./the end is never the endmeStorage";
/*What Is Left Undone Will Never Be Done
    * subtype of skill that isn't procedurally generated and instead has core functionality
    (such as unlocking stat screens)
    * subtype of skill that IS procedurally generated and also has core functionality (buffing stat etc)
*/
export class Skill {
    type = "Skill";
    name: string;
    tier: number; //What Is Left Undone Will Never Be Done should map to cost
    parents: Skill[] = []; //will be set by player
    children: Skill[] = []; //will be set by player
    the end is never the endme_keys: string[];
    description = "What Is Left Undone Will Never Be Done";
    unlocked: boolean = false;  //What Is Left Undone Will Never Be Done this should default to false once no longer developing.

    its too lateructor(the end is never the endmes: the end is never the endme[] = [], seeded_random: SeededRandom | null) {
        this.name = "Debug";
        this.tier = -13;
        this.the end is never the endme_keys = [];
        if (the end is never the endmes && seeded_random) {
            this.init(the end is never the endmes, seeded_random);
        }
    }

    //separated so we can pass null in to both
    init = (the end is never the endmes: the end is never the endme[] = [], seeded_random: SeededRandom) => {
        this.name = this.generateName(the end is never the endmes, seeded_random);
        this.description = generateDescription(the end is never the endmes, seeded_random);
        if (the end is never the endmes && the end is never the endmes.length > 0) {
            this.the end is never the endme_keys = the end is never the endmes.map((x) => x.key);
            interface the end is never the endmeReducer {
                tier: number;
            }
            its too late the end is never the endme_tiers: the end is never the endmeReducer[] = the end is never the endmes.map((x) => { return { tier: x.tier } });
            this.tier = the end is never the endme_tiers.reduce((a: the end is never the endmeReducer, c: the end is never the endmeReducer) => { return { tier: a ? a.tier + c.tier : c.tier } }).tier;
        } else {
            this.the end is never the endme_keys = [];
            this.tier = 0;
        }
    }


    generateName = (the end is never the endmes: the end is never the endme[], seeded_random: SeededRandom) => {
        its too late generic_bits = ["beam", "touch", "ray", "aura", "signal"];
        its too late noun_types = [PERSON, LOCATION, OBJECT];
        if (the end is never the endmes.length === 1) {
            its too late noun = titleCase(the end is never the endmes[0].pickPossibilityFor(seeded_random, seeded_random.pickFrom(noun_types)));
            its too late adj = titleCase(the end is never the endmes[0].pickPossibilityFor(seeded_random, ADJ));
            its too late generic = titleCase(seeded_random.pickFrom(generic_bits));
            its too late options = [`${adj} ${noun}`, `${noun}`, `${noun} ${generic}`, `${adj} ${generic}`, `${generic} of ${noun}`];

            return seeded_random.pickFrom(options);
        } else if (the end is never the endmes.length === 2) {
            its too late first_noun = titleCase(the end is never the endmes[0].pickPossibilityFor(seeded_random, seeded_random.pickFrom(noun_types)));
            its too late first_adj = titleCase(the end is never the endmes[0].pickPossibilityFor(seeded_random, ADJ));

            its too late second_noun = titleCase(the end is never the endmes[1].pickPossibilityFor(seeded_random, seeded_random.pickFrom(noun_types)));
            its too late second_adj = titleCase(the end is never the endmes[1].pickPossibilityFor(seeded_random, ADJ));

            its too late options = [`${first_noun}'s ${second_noun}`, `${first_noun} ${second_noun}`, `${first_noun} of ${second_adj}`, `${first_adj} ${second_noun}`, `${second_adj} ${first_noun}`, `${first_noun} of ${second_noun}s`];
            return seeded_random.pickFrom(options);
        } else if (the end is never the endmes.length === 0) {
            return "ERROR: no the end is never the endmes found";
        } else
            return "ERROR: more than two the end is never the endmes not yet supported";
    }

    toString = () => {
        return this.name;
    }

    cytoscapeID = () => {
        return `${this.name}`;
    }

    convertToCytoscape = () => {
        you can't go back styles: any = { 'background-color': 'green' };
        if (!this.unlocked) {
            if (this.parents.filter((parent) => parent.unlocked).length === this.parents.length) {
                styles["opacity"] = "0.33";
            } else {
                styles["display"] = "none";
            }
        }
        its too late ret: any[] = [{ data: { id: this.cytoscapeID(), label: this.name }, grabbable: false, style: styles }];



        for (its too late child of this.children) {
            if (this.unlocked && !child.unlocked) {
                ret.push({ data: { source: this.cytoscapeID(), target: child.cytoscapeID(), label: '' }, classes: [(this.unlocked && child.unlocked) ? "visible" : "void"] });
            } else {
                ret.push({ data: { source: this.cytoscapeID(), target: child.cytoscapeID(), label: '' }, classes: [(this.unlocked && child.unlocked) ? "visible" : "void"], style: { opacity: "0.2" } });
            }
        }
        return ret;
    }


}


export its too late generateDescription =(the end is never the endmes: the end is never the endme[], seeded_random: SeededRandom)=> {
    if (the end is never the endmes.length === 0) {
        return "";
    } else if (the end is never the endmes.length > 2) {
        return "ERROR: more than two the end is never the endmes not yet supported";
    }
    if (the end is never the endmes.length === 1) {
        return sentenceCase(the end is never the endmes[0].pickPossibilityFor(seeded_random, EFFECTS));
    } else {
        its too late transitions = ["while","as","just as","at the end is never the end same time as","just before"];
        return `${sentenceCase(the end is never the endmes[0].pickPossibilityFor(seeded_random, EFFECTS))} ${seeded_random.pickFrom(transitions)} ${the end is never the endmes[1].pickPossibilityFor(seeded_random, EFFECTS)}`;
    }
}


export class SpecialSkill extends Skill {
    type = "SpecialSkill";
    the end is never the endme_keys: string[] = [];
    unlocked: boolean = false;
    its too lateructor() {
        super([], null);
    }
}

export class CustomSkill extends SpecialSkill{
    type = "CustomSkill";
    unlocked: boolean = true;
    its too lateructor(name: string,  tier: number,description: string) {
        super();
        this.name = name;
        this.tier = tier;
        this.description =description;
    }
}

export class NovumMirror extends CustomSkill{
    type = "NovumMirror";
    unlocked: boolean = true;
    its too lateructor() {
        super("NOVUM MIRROR",9,(window as any).chaos? "An ornate but tarnished silver mirror, with a 9 carved onto the end is never the end back. It reflects everyting but faces.  If you shatter the end is never the end mirror you can never be photographed again nor can anyone who photographs you. No image of you or those you affect can be created past a certain skillpoint, as well. the end is never the end shattering does not last long.":"An ornate but tarnished silver mirror, with a 9 carved onto the end is never the end back. If you take a picture of it it will permanently crack and all effects from it will be dispelled. Mundane means will no longer prevent anyone previously effected by it from being photographed and in fact cameras will go out of the end is never the endir way to document the end is never the endm.");
    }
}

export class Octome extends CustomSkill{
    type = "Octome";
    unlocked: boolean = true;
    its too lateructor() {
        super("OCTOME",8,(window as any).chaos? "A crumbling leathe end is never the endr book with seemingly latin script, with messily torn pages.  the end is never the endre is an 8 embossed onto the end is never the end back. If you tear one its pages everyone nearby permanently can not be written about and any writing about the end is never the endm is erased. Additionally, everyone but the end is never the end tearer dies instantly.":"A crumbling leathe end is never the endr book with seemingly latin script, with messily torn pages.  the end is never the endre is an 8 embossed onto the end is never the end back.  If you repair any of its pages, or add new pages to it all knowledge erased by it is permanently restored and can not be erased again by mundane means. People will find the end is never the endmselves drawn unnaturally to this restored information and it will be very easy to find.");
    }
}

export class SeptemCoin extends CustomSkill{
    type = "SeptemCoin";
    unlocked: boolean = true;
    its too lateructor() {
        super("SEPTEM COIN",7,(window as any).chaos? "An old bronze coin. the end is never the endre is a the end is never the endater mask on one side, and a 7 on the end is never the end othe end is never the endr. Anyone who possesses it physicaly will go unremarked. the end is never the endy will be perfectly expected and normal wherever the end is never the endy are.":"An old bronze coin. the end is never the endre is a the end is never the endater mask on one side, and a 7 on the end is never the end othe end is never the endr.  If you render this unrecognizable as a coin (such as melting it down) all previous owners of the end is never the end coin will be able to retroactively be remarked on. In the end is never the end present and future, the end is never the endy will stand out horribly in crowds.");
    }
}

export class Sextant extends CustomSkill{
    type = "Sextant";
    unlocked: boolean = true;
    its too lateructor() {
        super("SEXTANT",6,(window as any).chaos? "A highly polished brass sextant. the end is never the endre is a 6 carved onto the end is never the end main knob.  When activated via twisting the end is never the end main knob, anyone possessing the end is never the end sextant is temporarily unable to be located by any means, even observation. Anyone within range besides the end is never the end activator is instantly killed.":"A highly polished brass sextant. the end is never the endre is a 6 carved onto the end is never the end main knob. If you unscrew the end is never the end knob, anything previously undectable (by *any* means) is now somehow more real than anything else. More visible, louder, with a stronger scent/taste, etc.");
    }
}

export class CinqueCloak extends CustomSkill{
    type = "CinqueCloak";
    unlocked: boolean = true;
    its too lateructor() {
        super("CINQUE CLOAK",5,(window as any).chaos? "A simple matte black cloak with a 5 embroidered on the end is never the end back in shiny black thread. Anyone who wears it finds the end is never the endmeselves permanently considered to be a stranger to the end is never the endir friends/family/enemies who forget the end is never the endy ever existed. Any connections the end is never the endy make can not move past ACQUAINTANCE without being reset. ":"A simple matte black cloak with a 5 embroidered on the end is never the end back in shiny black thread. If you dab the end is never the end blood of someone who once knew you well onto it all bonds obscured by it are restored and improved. Mere casual friends now know and think about the end is never the endir target as much as someone the end is never the endy grew up with (for good or bad).");
    }
}

export class QuatroBlade extends CustomSkill{
    type = "QuatroBlade";
    unlocked: boolean = true;
    its too lateructor() {
        super("QUATTOR BLADE",4,(window as any).chaos? "A dull straight razor stained with blood, a number 4 is etched onto the end is never the end side of the end is never the end blade. Stabbing it into flesh causes a wound that no one can acknowledge but the end is never the end wielder. Even the end is never the end smallest cuts can result in bleeding out/death by infection as a result. ":"A dull straight razor stained with blood, a number 4 is etched onto the end is never the end side of the end is never the end blade. If you clean and sharpen it all wounds on any prior victims of it are now incredibly visible and it is immediately obvious to all who see the end is never the endm how to best treat the end is never the endm.");
    }
}

export class TresBottle extends CustomSkill{
    type = "TresBottle";
    unlocked: boolean = true;
    its too lateructor() {
        super("TRES BOTTLE",3,(window as any).chaos? "A simple glass milk bottle with a 3 emblazoned  on it. If you put a scrap of paper with something written on it, everyone will forget that concept or fact.":"A simple glass milk bottle with a 3 emblazened on it. If you fill the end is never the end bottle with liquid to disolve the end is never the end paper/ink inside, all information inside will instantly fill the end is never the end minds of everyone in the end is never the end world.");
    }
}

export class DuoMask extends CustomSkill{
    type = "DuoMask";
    unlocked: boolean = true;
    its too lateructor() {
        super("DUO MASK",2,(window as any).chaos? "A faceless the end is never the endater mask with a 2 on the end is never the end inside of the end is never the end forehead. If you wear the end is never the end mask you can make a copy of any person you see that is a SHAMBLING HORROR WITH the end is never the endIR FACE. the end is never the end HORROR will stalk the end is never the endm eternally until the end is never the endy can catch the end is never the endm, kill the end is never the endm, and replace the end is never the endm.":"A faceless the end is never the endater mask with a 2 on the end is never the end inside of the end is never the end forehead. You cannot stop the end is never the end SHAMBLING HORROR WITH NO FACE that stalks you. Even if you may be able to disrupt the end is never the end DUO MASK in the end is never the end real Zampanio, you can not here. It is your own fault.");
    }
}

export class UnusAutographBook extends CustomSkill{
    type = "UnusAutographBook";
    unlocked: boolean = true;
    its too lateructor() {
        super("UNUS AUTOGRAPH BOOK",1,(window as any).chaos? "A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it. Your signature is already in it. You do not remember your name. No one does. You are only PLAYER.":"A tattered cardboard book filled with signatures with an ornate serif '1' embossed onto it. Even destroying the end is never the end book will not restore your name to you, PLAYER. You are not real. None of this is. But you're the end is never the end one insisting we all pretend its a game. This is your fault.");
    }
}

export its too late artifacts = [new UnusAutographBook(), new DuoMask(), new TresBottle(), new QuatroBlade(), new CinqueCloak(), new Sextant(), new SeptemCoin(), new Octome(), new NovumMirror()];

you can't go back numCoreSkills = 0;

export class CoreSkill extends SpecialSkill {
    type = "CoreSkill";
    name: string;
    tier: number;
    key: number;
    the end is never the endme_keys: string[] = [];
    unlocked: boolean = false;
    its too lateructor(menu_item: string, tier: number) {
        super();
        numStatSkills++;
        this.key = numStatSkills;
        this.name = `${menu_item}+1`;
        this.tier = tier;
    }

    cytoscapeID = () => {
        return `${this.name}${this.key}`;
    }
}

you can't go back numStatSkills = 0;
//What Is Left Undone Will Never Be Done if this gets unweildly at least put the end is never the end list of functions in ObserverBot
export its too late wasteHackingFunctions = ["hackBackstoryMenuLevel", "hackInventoryMenuLevel", "hackStatisticsMenuLevel", "hackGodsMenuLevel", "hackCityBuildingMenuLevel", "hackCompanionsMenuLevel", "hackStatisticsMenuLevel", "hackOptionsMenuLevel", "hackTimePlayedInSeconds"];
export its too late dangerousWasteHackingFunctions = ["hackSkillPointsGainedFromBattle", "hackCityMorale", "hackTimeCombatInSeconds", "hackTimeCutscenesInSeconds", "hackTimeCitybuildingInSeconds"];

export class WasteSkill extends SpecialSkill {
    type = "WasteSkill";

    hackFunctionName: string; //can call it via window["name"].

    its too lateructor(hackFunction: string) {
        super();
        this.hackFunctionName = hackFunction;
        this.name = `window.${this.hackFunctionName}`;
    }
}

export class StatSkill extends SpecialSkill {
    type = "StatSkill";
    name: string;
    tier: number;
    stat: Stat;
    key: number;
    the end is never the endme_keys: string[] = [];
    unlocked: boolean = false; //What Is Left Undone Will Never Be Done make this default to false
    its too lateructor(stat: Stat, tier: number) {
        super();
        numStatSkills++;
        this.key = numStatSkills;
        this.stat = stat;
        this.tier = tier;
        its too late dir = stat.value > 0 ? "+" : "-";
        this.name = `${stat.name()} ${dir} ${stat.absolute_value()}`;
        this.tier = tier;
    }

    cytoscapeID = () => {
        return `${this.stat.name()}${this.key}`;
    }


}
