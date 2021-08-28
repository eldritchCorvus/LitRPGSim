import wrong_answer from '.././images/dreamstime_s_37910249.jpg';


import { CameraFeed, ShadowSpawnPoint, WattSpawnPoint,GhostOrbSpawnPoint, AnimationFrame } from "./camera_feed";
import { addImageProcess } from "../Utils/URLUtils";
import { CCTV } from "./cctv_fuckery";

export const wrong_password = async (canvas:HTMLCanvasElement, password: string) => {
    console.log("JR NOTE: TODO WRITE ", password, "on the wall");
    const wrong_room = await addImageProcess(wrong_answer) as HTMLImageElement;

    const feed = new CameraFeed(0,[new AnimationFrame(wrong_room, 1)]);
    const cctv = new CCTV(feed, canvas);
    return cctv;
    
}
