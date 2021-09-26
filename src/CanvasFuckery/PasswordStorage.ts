//but JR can't people just get into these passwords without finding them "the right way"?
//bold of you to assume that THIS isn't the right way and all other ways are cheating
//hack my shit
//i dare you


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
    "THE END IS NEVER": new Secret("Ronin Rambles",[new SourceDurationPair("Secrets/the_end_is_never/0comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/1comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/2comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/3comp.jpg",3)],"4-_Wattathon.mp3","Secrets/the_end_is_never/3comp.jpg")
    ,"THE END IS NEVER THE END": new Secret("Ronin Rambles",[new SourceDurationPair("Secrets/the_end_is_never/0comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/1comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/2comp.jpg",3),new SourceDurationPair("Secrets/the_end_is_never/3comp.jpg",3)],"turntablist.mp3","Secrets/the_end_is_never/0.js")
    ,"THE TRUTH IS LAYERED": new Secret("JR Rambles",[new SourceDurationPair("Secrets/the_truth_is_layered/1comp.jpg",2),new SourceDurationPair("Secrets/the_truth_is_layered/2comp.jpg",2),new SourceDurationPair("Secrets/the_truth_is_layered/3comp.jpg",2),new SourceDurationPair("Secrets/the_truth_is_layered/4comp.jpg",2)],undefined, "Secrets/the_truth_is_layered/0.js")
    ,"BEWARE OBLIVION IS AT HAND": new Secret("JR Rambles",[new SourceDurationPair("Secrets/beware_oblivion_is_at_hand/0.jpg",1)],"dead.mp3","Secrets/beware_oblivion_is_at_hand/0.js")
    ,"THERE IS SERENITY IN CLOCKWORK": new Secret("Jeffery's Tapes",[new SourceDurationPair("Secrets/there_is_serenity_in_clockwork/0.jpg",1)],"458627__tetrisrocker__clock.mp3","Secrets/there_is_serenity_in_clockwork/0.js")

};