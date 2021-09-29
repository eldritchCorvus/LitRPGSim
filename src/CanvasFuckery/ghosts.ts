import tunnel2 from '.././images/tunnel2.jpg';
import tunnel3 from '.././images/tunnel3.jpg';
import tunnel4 from '.././images/tunnel4.jpeg';
import tunnel5 from '.././images/tunnel5.jpeg';
import tunnel6 from '.././images/tunnel6.jpg';

import notAMinotaur1 from '.././images/monsters/NotAMinotaur/0.png';
import notAMinotaur2 from '.././images/monsters/NotAMinotaur/1.png';
import notAMinotaur3 from '.././images/monsters/NotAMinotaur/2.png';
import notAMinotaur4 from '.././images/monsters/NotAMinotaur/3.png';
import ghost_orb_src from '.././images/monsters/orb.png';
import eye_src from '.././images/dreamstime_s_119442663.jpg';

import { SpookyCameraFeed, ShadowSpawnPoint, WattSpawnPoint,GhostOrbSpawnPoint, AnimationFrame } from "./camera_feed";
import { addImageProcess } from "../Utils/URLUtils";
import { SpookyCCTV } from "./cctv_object";

/*
so step 1: set up a game mode to display this shit
[10:05 AM]
step 2, set up a file to handle generating the canvas
[10:05 AM]
step 3, set up a loop where i pass a time code to the canvas generator so it decides what should be happening
[10:06 AM]
step 4: start adding shadowy figures to lurk in the background
[10:06 AM]
step 5: have the shadowy figures react to mouse overs and clicks and shit but in weird unpredictable ways????
[10:06 AM]
step 6: murder???
**occasional single frames of a staring realistic eye, like you do
(pupil moves to follow you?)
*without rendering the fractal, have the sound generation
 alg from fractal sim underneath and changing on mouse over?

parts of a fake live video:

* timecode text in top right corner slowly counting up (honestly i can just do this with layered css if i want to cuz i recall text being expensive on canvas)
* black and white
*shitty resolution
*choppy framerate??? (posterize time, less frames per second, 10 or so)
* noise?
* venetian blinds effect (scan lines,thin, horizontal, black)
*animated bars of more static
*wave  warp distortion (sin)(diagonal? follows mouse?)

*/
let current_screen: SpookyCCTV;
let monster_left: HTMLImageElement;
let monster_right: HTMLImageElement;
let outputCanvas: HTMLCanvasElement;
let image_index = 0;
let cctvs:SpookyCCTV[] = [];
//not being functional at all, so sue me

export const cctv_ghost_loop = (canvas:HTMLCanvasElement, source:CanvasImageSource, source2:CanvasImageSource, mon_right:HTMLImageElement, mon_left:HTMLImageElement) => {
    monster_left = mon_left;
    monster_right = mon_right;
    outputCanvas = canvas;
    const spawn = [new ShadowSpawnPoint([monster_left, monster_right], -200, 400, 15, 1.0, 800, 400),new ShadowSpawnPoint([monster_left, monster_right], 300, 300, 7, 0.5, 0, 300)];

    const feed = new SpookyCameraFeed(0,[new AnimationFrame(source, 2), new AnimationFrame(source2, 20)], spawn);
    cctvs.push(new SpookyCCTV(feed, null,outputCanvas));
    current_screen = cctvs[0];
    current_screen.play();
    // window.requestAnimationFrame()
    load_other_images();
    canvas.addEventListener('mousemove', clearGhosts);
    
}

const clearGhosts = (event: MouseEvent)=>{
    //don't clear ghost orbs this is literally their whole point
    for (let spawnpoint of (current_screen.cameraFeed as SpookyCameraFeed).shadow_spawn_points) {
        if (spawnpoint.type !== "Orb" && spawnpoint.shadow_spawned) {
            spawnpoint.despawn();
        }else if(spawnpoint.type === "Orb" && spawnpoint.shadow_spawned){
            const rect = outputCanvas.getBoundingClientRect();
            spawnpoint.shadow_current_x = event.clientX-rect.left+200;
            spawnpoint.shadow_current_y = event.clientY-rect.top;
        }
    }
}

//just loads a bunch of images and when they load adds them to the array.
const load_other_images = async () => {
    //first one is special because of the server animation
    //rest are simple.
    //two images for server blinking
    //JR NTOTE TODO some might be regular monster, some might be NotAMinotaur
    const spawnPoints = [];
    const ghost_orb = await addImageProcess(ghost_orb_src) as HTMLImageElement;
    const eye = await addImageProcess(eye_src) as HTMLImageElement;

    const monster_images = [notAMinotaur1, notAMinotaur2, notAMinotaur3, notAMinotaur4];
    const monster_loaded_images: HTMLImageElement[] = [];
    for (let image of monster_images) {
        const img = await addImageProcess(image) as HTMLImageElement;
        monster_loaded_images.push(img);
    }

    //2
    spawnPoints.push([new GhostOrbSpawnPoint([ghost_orb], -100, 300, 8, 1.0, 1600, 300),new ShadowSpawnPoint([monster_left, monster_right], 69, 229, 2, 0.3, 210, 500),new ShadowSpawnPoint([monster_left, monster_right], 283, 184, 15, 1.0, -200, 184)]);
    //3
    spawnPoints.push([new WattSpawnPoint(monster_loaded_images, 150, 470, 80, 1.0, 0, 0)]);

    //4
    spawnPoints.push([new GhostOrbSpawnPoint([ghost_orb], -100, 300, 8, 1.0, 1600, 300),new ShadowSpawnPoint([monster_left, monster_right], 1000, 500, 60, 2.0, -1000, 500),new ShadowSpawnPoint([monster_left, monster_right], -1000, 500, 60, 2.0, 1000, 500)]);
    //5
    spawnPoints.push([new GhostOrbSpawnPoint([ghost_orb], -100, 300, 8, 1.0, 1600, 300),new ShadowSpawnPoint([monster_left, monster_right], -800, 130, 30, 1.5, 1500, 130),new ShadowSpawnPoint([monster_left, monster_right], 1000, 130, 60, 2.0, -1000, 130)]);
    //6
    spawnPoints.push([new GhostOrbSpawnPoint([ghost_orb], -100, 300, 8, 1.0, 1600, 300)]);

    const images = [tunnel2, tunnel3, tunnel4, tunnel5, tunnel6];

    let index = 0;
    for (let image of images) {
        const img = await addImageProcess(image) as HTMLImageElement;
        const feed = new SpookyCameraFeed(cctvs.length, [new AnimationFrame(img,1)], spawnPoints[index]);
        index ++;
        cctvs.push(new SpookyCCTV(feed, eye, outputCanvas))
    }


    const click = () => {
        if (image_index < cctvs.length - 1) {
            image_index++;
            const frame = current_screen.cameraFeed.current_frame;
            current_screen.stop();
            current_screen = cctvs[image_index];
            current_screen.cameraFeed.current_frame = frame;

            current_screen.play();
        } else {
            image_index = 0;
            current_screen.stop();
            const frame = current_screen.cameraFeed.current_frame;
            current_screen = cctvs[0];
            current_screen.cameraFeed.current_frame = frame;
            current_screen.play();
        }
    }

    window.addEventListener('click', click);

}



