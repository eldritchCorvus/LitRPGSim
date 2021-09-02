import wrong_answer from '.././images/room2.jpg';


import { CameraFeed, AnimationFrame, GraffitiSpot } from "./camera_feed";
import { addImageProcess } from "../Utils/URLUtils";
import { CCTV } from "./cctv_fuckery";
import SeededRandom from '../Utils/SeededRandom';
import { Secret } from './PasswordStorage';
import { loadSecretImage, playSecret } from '..';

export const right_password = async (canvas:HTMLCanvasElement, secret:Secret) => {
    const frames:AnimationFrame[] = [];
    for(let frame of secret.frames){
        const image = await addImageProcess(loadSecretImage(frame.source)) as HTMLImageElement;
        frames.push(new AnimationFrame(image, frame.durationInFrames));
    }
    const feed = new CameraFeed(0,frames);
    if(secret.music_file_name){
        playSecret(secret.music_file_name);
    }
    console.log(secret.text);
    const cctv = new CCTV(feed, canvas);
    return cctv;
}

export const wrong_password = async (canvas:HTMLCanvasElement, password: string,core_rand:SeededRandom) => {
    const wrong_room = await addImageProcess(wrong_answer) as HTMLImageElement;
    //some of these are downright illegible so here's hoping you don't have bad luck
    const rand = new SeededRandom(core_rand.initial_seed);
    const fonts = ["sister_spray","urban_heroes","the_jacatra","next_custom","mostwasted","marsneveneksk","graffiti_city"];
    rand.nextDouble();
    const font = rand.pickFrom(fonts);
    console.log("JR NOTE: initial seed is", rand.initial_seed, "and font is", font, "and next double is", rand.nextDouble());
    const feed = new CameraFeed(0,[new AnimationFrame(wrong_room, 1)], [new GraffitiSpot(password,20,250,font,48)]);

    
    const cctv = new CCTV(feed, canvas);
    return cctv;
    
}
