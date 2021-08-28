import wrong_answer from '.././images/room2.jpg';


import { CameraFeed, ShadowSpawnPoint, WattSpawnPoint,GhostOrbSpawnPoint, AnimationFrame, GraffitiSpot } from "./camera_feed";
import { addImageProcess } from "../Utils/URLUtils";
import { CCTV } from "./cctv_fuckery";
import SeededRandom from '../Utils/SeededRandom';

export const wrong_password = async (canvas:HTMLCanvasElement, password: string,rand:SeededRandom) => {
    const wrong_room = await addImageProcess(wrong_answer) as HTMLImageElement;
    //some of these are downright illegible so here's hoping you don't have bad luck
    const fonts = ["sister_spray","urban_heroes","the_jacatra","next_custom","mostwasted","marsneveneksk","graffiti_city"];
    const font = rand.pickFrom(fonts);
    console.log("JR NOTE: initial seed is", rand.initial_seed, "and font is", font);
    const feed = new CameraFeed(0,[new AnimationFrame(wrong_room, 1)], [new GraffitiSpot(password,30,250,font,48)]);

    
    const cctv = new CCTV(feed, canvas);
    return cctv;
    
}
