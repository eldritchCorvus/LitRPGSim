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
    "THE END IS NEVER THE END": new Secret("Eye Killer Saga",[new SourceDurationPair("Secrets/the_end_is_never_the_end/0.png",113),new SourceDurationPair("Secrets/the_end_is_never_the_end/1.jpg",1)],undefined,"Secrets/the_end_is_never_the_end/0.js")
    ,"THE TRUTH IS LAYERED": new Secret("Eye Killer Saga",[new SourceDurationPair("Secrets/the_truth_is_layered/0.png",24)],undefined,"Secrets/the_truth_is_layered/0.js")
    ,"YOU IS NEEDED TO END THE WORLD": new Secret("Eye Killer Saga",[new SourceDurationPair("Secrets/you_is_needed_to_end_the_world/0.png",113),new SourceDurationPair("Secrets/you_is_needed_to_end_the_world/1.jpg",1)],undefined,"Secrets/you_is_needed_to_end_the_world/0.js")
    ,"PLANT MORE TREES": new Secret("Eye Killer Saga",[new SourceDurationPair("Secrets/plant_more_trees/0.png",24),new SourceDurationPair("Secrets/plant_more_trees/1.png",3)],undefined,"Secrets/plant_more_trees/0.js")
    ,"HOW MUCH DO YOU THINK WAFFLES COST": new Secret("Eye Killer Saga",[new SourceDurationPair("Secrets/how_much_do_you_think_waffles_cost/0.png",113),new SourceDurationPair("Secrets/how_much_do_you_think_waffles_cost/1.jpg",3)],undefined,"Secrets/how_much_do_you_think_waffles_cost/0.js")

};