
import { ghost_sound } from "..";
import { getRandomNumberBetween, pickFrom } from "../Utils/NonSeededRandUtils";
import { CameraFeed, SpookyCameraFeed } from "./camera_feed";
import { getTimeString } from "../Utils/StringUtils";
export class CCTV {
    //todo in addition to an array of images, include timing data so you know when to change frames
    cameraFeed: CameraFeed;
    outputCanvas: HTMLCanvasElement;
    playing = false;


    //camera feed handles most of what we care about
    constructor(cameraFeed: CameraFeed, outputCanvas: HTMLCanvasElement) {
        this.cameraFeed = cameraFeed;
        this.outputCanvas = outputCanvas;
    }

    stop = () => {
        this.playing = false;
    }

    play = () => {
        //JR NOTE TODO
        this.playing = true;
        this.oneCCTVFrame();
    }


    //autopanning based on time code? back and forth?
    oneCCTVFrame = () => {
        if (!this.playing) {
            return;
        }
        //simulate video glitches
        const frame = this.cameraFeed.current_frame;
        const outputCanvas = this.outputCanvas;
        let hacked_frame = frame;
        if (frame % 30 === 0 || frame % 32 === 0 || frame % 55 === 0 || frame % 111 === 0 || frame % 113 === 0 || frame % 115 === 0) {
            hacked_frame = frame - getRandomNumberBetween(1, 30);
        }
        const buffer = document.createElement("canvas");
        buffer.width = outputCanvas.width;
        buffer.height = outputCanvas.height;
        const context = buffer.getContext("2d");
        if (!context) {
            console.error("how is there not a context");
            return;
        }

        //every other pan change direciton
        //so in addition to source image we want to have a canvas we can render figures onto
        //because the figures need to be placed relative to the IMAGE and undernath the effects
        //(if i try to place it on the 480x480 shitty ctv they won't be in the right spot)
        this.drawInLocation(hacked_frame, context);


        const fontSize = 25;
        const padding = 15 + fontSize;

        context.fillStyle = "white";
        context.font = `${fontSize}px serif`;
        const time = getTimeString(new Date(frame * 100));

        this.cctv_effect(buffer, hacked_frame);
        context.fillText(time, buffer.width - 100, padding);
        context.fillText(`${this.cameraFeed.index}`, padding, padding);

        const outputContext = outputCanvas.getContext("2d");
        outputContext?.drawImage(buffer, 0, 0);
        setTimeout(() => {
            window.requestAnimationFrame(() => { this.oneCCTVFrame() })
        }, 100)
    }

    getCurrentImage = (hacked_frame: number) => {
        let image = this.cameraFeed.newFrame(hacked_frame);
        for (let gs of this.cameraFeed.graffitiSpots) {
                const hacked_image = document.createElement("canvas");
                hacked_image.width = image.width as number;
                hacked_image.height = image.height as number;
                const context = hacked_image.getContext("2d");
                if (!context) {
                    console.error("How is there not a context???");
                    return image;
                }
                const fontSize = gs.fontSize;
        
                context.fillStyle = "#300";
                //JR NOTE TODO USE CUSTOM FONT
                context.font = `bold ${fontSize}px ${gs.font}`;
                context.drawImage(image, 0, 0);
                context.fillText(gs.text, gs.upper_left_x+fontSize, gs.upper_left_y+fontSize);
                image = hacked_image;
    
        }
        return image;
    }


    drawInLocation = (hacked_frame: number, context: CanvasRenderingContext2D) => {
        let image = this.getCurrentImage(hacked_frame);
        const speed = 5;
        let sourceImage = image;
        const width = sourceImage.width as number;
        const height = sourceImage.height as number;


        if (width > height) {
            let max = width - speed;
            let location = (this.cameraFeed.current_frame * speed) % max;

            if (location > width / 2 || location < 0) {
                location = width - (hacked_frame * speed) % max;;
            }
            context.drawImage(image, -1 * location, 0);
        } else {
            let max = height - speed;
            let location = (hacked_frame * speed) % max;

            if (location > height / 2 || location < 0) {
                location = height - (hacked_frame * speed) % max;;
            }
            context.drawImage(image, 0, -1 * location);
        }
    }



    //lines of horizontal static that move up the screen., occasional glitches
    //bigger ones that move down
    cctv_effect = (canvas: HTMLCanvasElement, timecode: number) => {
        const context = canvas.getContext("2d");
        if (!context) {
            console.error("it should not be possible to not have a context");
            return;
        }
        const width = canvas.width;
        const height = canvas.height;

        let image_data = context.getImageData(0, 0, canvas.width, canvas.height);
        const random_num = getRandomNumberBetween(0, width);
        const random_num2 = getRandomNumberBetween(0, height);

        const offset = timecode % height;
        let d = image_data.data;
        const time = (timecode % 100) / 100; //once a second
        for (let y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var i = ((y * height) + x) * 4;

                // barred static or high contrast black and white
                if (staticHash(x * random_num, y * random_num2) > 190 && isStaticSpot(y, height, time, 3)) {
                    const value = staticHash(x + offset, y + offset);
                    d[i] = value;
                    d[i + 1] = value;
                    d[i + 2] = value;
                } else {//https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
                    const r = d[i];
                    const g = d[i + 1];
                    const b = d[i + 2];
                    let v = Math.max(Math.max(r, g), b);
                    //higher the percent the more contrasty it is
                    let contrast = (50 / 100) + 1;  //convert to decimal & shift range: [0..2]
                    var intercept = 128 * (1 - contrast);
                    d[i] = d[i + 1] = d[i + 2] = v * contrast + intercept;;
                }

                //random static
                if (staticHash(y * random_num, x * random_num2) > 253) {
                    const ratio = random_num2 / 255;
                    if (ratio > 0.5) {
                        d[i] = 255 - Math.floor(d[i] * ratio);
                        d[i + 1] = 255 - Math.floor(d[i] * ratio);
                        d[i + 2] = 255 - Math.floor(d[i] * ratio);
                    } else {
                        const value = staticHash(x + offset, y + offset);
                        d[i] = value;
                        d[i + 1] = 255 - value;
                        d[i + 2] = value;
                    }
                }

                //scan lines
                if (y % 5 < 1) {
                    d[i] = 0;
                    d[i + 1] = 0;
                    d[i + 2] = 0;
                }
            }

        }
        context.putImageData(image_data, 0, 0);

    }
}

export class SpookyCCTV extends CCTV {

    getCurrentImage = (hacked_frame: number) => {
        let image = this.cameraFeed.newFrame(hacked_frame);
        if (!(this.cameraFeed as SpookyCameraFeed).shadow_spawn_points) {
            return image;
        }
        const frame = this.cameraFeed.current_frame;
        const spookyCameraFeed = (this.cameraFeed as SpookyCameraFeed);

        //every 10 seconds have a 1 in 2 chance of spawning a ghost
        if (frame > 100 && frame % 100 === 0 && Math.random() > 0.5) {
            const spawnpoint = pickFrom(spookyCameraFeed.shadow_spawn_points);
            if (spawnpoint && !spawnpoint.shadow_spawned) {
                ghost_sound();
                spawnpoint.spawn();
            }
        }
        for (let spawnpoint of spookyCameraFeed.shadow_spawn_points) {
            if (spawnpoint.shadow_spawned) {
                const hacked_image = document.createElement("canvas");
                hacked_image.width = image.width as number;
                hacked_image.height = image.height as number;
                const context = hacked_image.getContext("2d");
                if (!context) {
                    console.error("How is there not a context???");
                    return image;
                }
                context.drawImage(image, 0, 0);
                spawnpoint.drawMonster(context);
                image = hacked_image;
            }
        }
        return image;
    }

}






export const staticHash = (x: number, y: number) => {
    let hash = 31;
    hash = ((hash + x) << 13) - (hash + x);
    hash = ((hash + y) << 13) - (hash + y);
    return Math.abs(hash % 255);
}


export const isStaticSpot = (y: number, height: number, time_percent: number, band_width: number) => {
    const first = -Math.floor(height / 3 - height * time_percent);
    const second = -Math.floor(2 * height / 3 - height * time_percent);
    const third = -Math.floor(height / 4 - height * time_percent);
    const fourth = Math.floor(0 - height * time_percent)
    const fifth = Math.floor(height - height * time_percent)

    const all = [first, fourth, second, fifth, third];
    for (let i = 0; i < all.length; i++) {
        const item = all[i];
        if (Math.abs(item - y) < band_width * i) {
            return true;
        }
    }

    return false;

}

/** thanks pl for this contribution from dart land
 * int hashPair(int x, int y) {
    int hash = 31;
    hash = ((hash + x) << 13) - (hash + x);
    hash = ((hash + y) << 13) - (hash + y);
    return hash;
}
 */