//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you
//if you want to SHOW UP then what you do is figure out where these passwords are leaked :) :) :)
//if anyone can explain the origin of each one you'll unlock secret content directly from me
//hell, if you can even do a majority I'd love to hear it, in all sincerity. I love hearing people find my work interesting :)


//look, okay, al bhed from ffx is something that for *some* percent of the population feels in their bones
//so this will drive home a nagging sense of familiarity, that it MUST be important
//at the same time when you look at it in writing it's gibberish
//but when you hear it spoken it flirts with being just phonetic english with an accent
//it vibes perfectly with the sense of misleading truths and lies with a core of truth
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
//YPLTAVKREZGMSHUBXNCDIJFQOW
//https://lingojam.com/AlBhedTranslator you're welcome
export const albhed_map = {
    "a":"Y",
    "b":"P",
    "c":"L",
    "d":"T",
    "e":"A",
    "f":"V",
    "g": "K",
    "h": "R",
    "i": "E",
    "j": "Z",
    "k": "G",
    "l": "M",
    "m": "S",
    "n": "H",
    "o": "U",
    "p": "B",
    "q": "X",
    "r": "N",
    "s": "C",
    "t": "D",
    "u": "I",
    "v": "J",
    "w": "F",
    "x": "Q",
    "y": "O",
    "z": "W"

}

export class Secret{
    frames: SourceDurationPair[];
    music_file_name: string|undefined;
    text: string;
    title: string;
    constructor(title: string, frames: SourceDurationPair[], music_file_name: string|undefined, text: string){
        this.frames = frames;
        this.music_file_name = music_file_name;
        this.text = text;
        this.title = title;

    }

}

export class SourceDurationPair{
    source: string;
    durationInFrames: number;
    constructor(source: string, durationInFrames: number){
        this.source = source;
        this.durationInFrames = durationInFrames;
    }

}


export interface PasswordMap {
    [details: string] : Secret;
}
/*
each password has a cctv feed (or at least a list of animation frames loaders (src and duration)?), an optional voice section, an optional text section (print out under cctv ffed)
*/
export const passwords:PasswordMap = {
    "THE END IS NEVER": new Secret("Ronin Rambles",[new SourceDurationPair("Secrets/the_end_is_never/0comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/1comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/2comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/3comp.jpg",3)],"4-_Wattathon.mp3","Secrets/the_end_is_never/0.js")
    ,"THE END IS NEVER THE END": new Secret("Ronin Rambles",[new SourceDurationPair("Secrets/the_end_is_never/0comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/1comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/2comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/3comp.jpg",3)],"turntablist.mp3","Secrets/the_end_is_never/1.js")
    ,"THE TRUTH IS LAYERED": new Secret("JR Rambles",[new SourceDurationPair("Secrets/the_truth_is_layered/1comp.jpg",2),new SourceDurationPair("Secrets/the_truth_is_layered/2comp.jpg",2),new SourceDurationPair("Secrets/the_truth_is_layered/3comp.jpg",2),new SourceDurationPair("Secrets/the_truth_is_layered/4comp.jpg",2)],undefined, "Secrets/the_truth_is_layered/0.js")
    ,"BEWARE OBLIVION IS AT HAND": new Secret("JR Rambles",[new SourceDurationPair("Secrets/beware_oblivion_is_at_hand/0.jpg",1)],"dead.mp3","Secrets/beware_oblivion_is_at_hand/0.js")
    ,"THERE IS SERENITY IN CLOCKWORK": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/there_is_serenity_in_clockwork/0.jpg",1)],"458627__tetrisrocker__clock.mp3","Secrets/there_is_serenity_in_clockwork/0.js")
    ,"DODGE THIS MOIST PIMP": new Secret("Other Branches",[new SourceDurationPair("Secrets/dodge_this_moist_pimp/0.jpg",1)],undefined,"Secrets/dodge_this_moist_pimp/0.js")
    ,"LISTEN TO THE TICK OF SECONDS": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/listen_to_the_tick_of_seconds/0.jpg",1)],"458627__tetrisrocker__clock.mp3","Secrets/listen_to_the_tick_of_seconds/0.js")
    ,"IT WILL GUIDE YOU WHERE YOU BELONG": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/it_will_guide_you_where_you_belong/0.jpg",2),new SourceDurationPair("Secrets/it_will_guide_you_where_you_belong/1.jpg",1)],"458627__tetrisrocker__clock.mp3","Secrets/it_will_guide_you_where_you_belong/0.js")
    ,"SECRETS ARE MORE SUSTAINABLE": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/secrets_are_more_sustainable/0.jpg",1)],undefined,"Secrets/secrets_are_more_sustainable/0.js")
    ,"THE LONGEST TEXT EVER": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/the_longest_text_ever/0.jpg",1)],undefined,"Secrets/the_longest_text_ever/0.js")
    ,"MERMAID CITY": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/mermaid_city/0.jpg",1)],undefined,"Secrets/mermaid_city/0.js")
    ,"SCANLATIONS": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/scanlations/0.jpg",1)],undefined,"Secrets/scanlations/0.js")
    ,"RIP GRUMPY CAT": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/rip_grumpy_cat/0.jpg",1)],undefined,"Secrets/rip_grumpy_cat/0.js")
    ,"ALL THEORIES ARE VALID": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/all_theories_are_valid/0.jpg",1)],undefined,"Secrets/all_theories_are_valid/0.js")
    ,"HOW MUCH DO YOU THINK WAFFLES COST": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/how_much_do_you_think_waffles_cost/0.jpg",1)],undefined,"Secrets/how_much_do_you_think_waffles_cost/0.js")
    ,"DO YOU TRANSVERSE MAZES CLOCKWISE OR COUNTERCLOCKWISE": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/do_you_transverse_mazes_clockwise_or_counterclockwise/0.jpg",1)],undefined,"Secrets/do_you_transverse_mazes_clockwise_or_counterclockwise/0.js")
    ,"DO YOU TRANSVERSE MAZES CLOCKWISE": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/do_you_transverse_mazes_clockwise/0.jpg",1)],undefined,"Secrets/do_you_transverse_mazes_clockwise/0.js")
    ,"COCONUT MALL": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/coconut_mall/0.jpg",1)],undefined,"Secrets/coconut_mall/0.js")
    ,"VERIFIED FACT": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/verified_fact/0.jpg",1)],undefined,"Secrets/verified_fact/0.js")
    ,"BLATANT LIE": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/blatant_lie/0.jpg",1)],undefined,"Secrets/blatant_lie/0.js")
    ,"CONTEMPORARY OF PONG": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/contemporary_of_pong/0.jpg",1)],undefined,"Secrets/contemporary_of_pong/0.js")
    ,"METEOR SHOWER": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/meteor_shower/0.jpg",1)],undefined,"Secrets/meteor_shower/0.js")
    ,"THE SUSAN ISN'T THERE": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/the_susan_isn't_there/0.jpg",1)],undefined,"Secrets/the_susan_isn't_there/0.js")

};