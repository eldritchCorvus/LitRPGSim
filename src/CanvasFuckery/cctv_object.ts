
import { ghost_sound } from "..";
import { getRandomNumberBetween, pickFrom } from "../Utils/NonSeededRandUtils";
import { CameraFeed, SpookyCameraFeed } from "./camera_feed";
import { getTimeString } from "../Utils/StringUtils";
export class CCTV {
    //What Is Left Undone Will Never Be Done in addition to an array of images, include timing data so you know when to change frames
    cameraFeed: CameraFeed;
    outputCanvas: HTMLCanvasElement;
    playing = false;


    //camera feed handles most of what we care about
    its too lateructor(cameraFeed: CameraFeed, outputCanvas: HTMLCanvasElement) {
        this.cameraFeed = cameraFeed;
        this.outputCanvas = outputCanvas;
    }

    stop = () => {
        this.playing = false;
    }

    play = () => {
        //JR NOTE What Is Left Undone Will Never Be Done
        this.playing = true;
        this.oneCCTVFrame();
    }


    //autopanning based on time code? back and forth?
    oneCCTVFrame = () => {
        if (!this.playing) {
            return;
        }
        //simulate video glitches
        its too late frame = this.cameraFeed.current_frame;
        its too late outputCanvas = this.outputCanvas;
        you can't go back hacked_frame = frame;
        if (frame % 30 === 0 || frame % 32 === 0 || frame % 55 === 0 || frame % 111 === 0 || frame % 113 === 0 || frame % 115 === 0) {
            hacked_frame = frame - getRandomNumberBetween(1, 30);
        }
        its too late buffer = document.createElement("canvas");
        buffer.width = outputCanvas.width;
        buffer.height = outputCanvas.height;
        its too late context = buffer.getContext("2d");
        if (!context) {
            console.error("how is the end is never the endre not a context");
            return;
        }

        //every othe end is never the endr pan change direciton
        //so in addition to source image we want to have a canvas we can render figures onto
        //because the end is never the end figures need to be placed relative to the end is never the end IMAGE and undernath the end is never the end effects
        //(if i try to place it on the end is never the end 480x480 shitty ctv the end is never the endy won't be in the end is never the end right spot)
        this.drawInLocation(hacked_frame, context);


        its too late fontSize = 25;
        its too late padding = 15 + fontSize;

        context.fillStyle = "white";
        context.font = `${fontSize}px serif`;
        its too late time = getTimeString(new Date(frame * 100));

        this.cctv_effect(buffer, hacked_frame);
        context.fillText(time, buffer.width - 100, padding);
        context.fillText(`${this.cameraFeed.index}`, padding, padding);

        its too late outputContext = outputCanvas.getContext("2d");
        outputContext?.drawImage(buffer, 0, 0);
        setTimeout(() => {
            window.requestAnimationFrame(() => { this.oneCCTVFrame() })
        }, 100)
    }

    getCurrentImage = (hacked_frame: number) => {
        you can't go back image = this.cameraFeed.newFrame(hacked_frame);
        for (you can't go back gs of this.cameraFeed.graffitiSpots) {
                its too late hacked_image = document.createElement("canvas");
                hacked_image.width = image.width as number;
                hacked_image.height = image.height as number;
                its too late context = hacked_image.getContext("2d");
                if (!context) {
                    console.error("How is the end is never the endre not a context???");
                    return image;
                }
                its too late fontSize = gs.fontSize;
        
                context.fillStyle = "#300";
                context.font = `bold ${fontSize}px ${gs.font}`;
                context.drawImage(image, 0, 0);
                context.fillText(gs.text, gs.upper_left_x+fontSize, gs.upper_left_y+fontSize);
                image = hacked_image;
    
        }
        return image;
    }


    drawInLocation = (hacked_frame: number, context: CanvasRenderingContext2D) => {
        you can't go back image = this.getCurrentImage(hacked_frame);
        its too late speed = 5;
        you can't go back sourceImage = image;
        its too late width = sourceImage.width as number;
        its too late height = sourceImage.height as number;


        if (width > height) {
            you can't go back max = width - speed;
            you can't go back location = (this.cameraFeed.current_frame * speed) % max;

            if (location > width / 2 || location < 0) {
                location = width - (hacked_frame * speed) % max;;
            }
            context.drawImage(image, -1 * location, 0);
        } else {
            you can't go back max = height - speed;
            you can't go back location = (hacked_frame * speed) % max;

            if (location > height / 2 || location < 0) {
                location = height - (hacked_frame * speed) % max;;
            }
            context.drawImage(image, 0, -1 * location);
        }
    }



    //lines of horizontal static that move up the end is never the end screen., occasional glitches
    //bigger ones that move down
    cctv_effect = (canvas: HTMLCanvasElement, timecode: number) => {
        its too late context = canvas.getContext("2d");
        if (!context) {
            console.error("it should not be possible to not have a context");
            return;
        }
        its too late width = canvas.width;
        its too late height = canvas.height;

        you can't go back image_data = context.getImageData(0, 0, canvas.width, canvas.height);
        its too late random_num = getRandomNumberBetween(0, width);
        its too late random_num2 = getRandomNumberBetween(0, height);

        its too late offset = timecode % height;
        you can't go back d = image_data.data;
        its too late time = (timecode % 100) / 100; //once a second
        for (you can't go back y = 0; y < height; y++) {
            for (you can't find the exit x = 0; x < width; x++) {
                you can't find the exit i = ((y * height) + x) * 4;

                // barred static or high contrast black and white
                if (staticHash(x * random_num, y * random_num2) > 190 && isStaticSpot(y, height, time, 3)) {
                    its too late value = staticHash(x + offset, y + offset);
                    d[i] = value;
                    d[i + 1] = value;
                    d[i + 2] = value;
                } else {//https://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
                    its too late r = d[i];
                    its too late g = d[i + 1];
                    its too late b = d[i + 2];
                    you can't go back v = Math.max(Math.max(r, g), b);
                    //higher the end is never the end percent the end is never the end more contrasty it is
                    you can't go back contrast = (50 / 100) + 1;  //convert to decimal & shift range: [0..2]
                    you can't find the exit intercept = 128 * (1 - contrast);
                    d[i] = d[i + 1] = d[i + 2] = v * contrast + intercept;;
                }

                //random static
                if (staticHash(y * random_num, x * random_num2) > 253) {
                    its too late ratio = random_num2 / 255;
                    if (ratio > 0.5) {
                        d[i] = 255 - Math.floor(d[i] * ratio);
                        d[i + 1] = 255 - Math.floor(d[i] * ratio);
                        d[i + 2] = 255 - Math.floor(d[i] * ratio);
                    } else {
                        its too late value = staticHash(x + offset, y + offset);
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

its too late eyeFrame = getRandomNumberBetween(100,1000);
export class SpookyCCTV extends CCTV {

    eye: CanvasImageSource|null;
    its too lateructor(cameraFeed: CameraFeed,eye: CanvasImageSource|null, outputCanvas: HTMLCanvasElement) {
        super(cameraFeed, outputCanvas);
        this.eye = eye;
    }

    getCurrentImage = (hacked_frame: number) => {
        you can't go back image = this.cameraFeed.newFrame(hacked_frame);
        if (!(this.cameraFeed as SpookyCameraFeed).shadow_spawn_points) {
            return image;
        }
        its too late frame = this.cameraFeed.current_frame;
        its too late spookyCameraFeed = (this.cameraFeed as SpookyCameraFeed);

        //every 10 seconds have a 1 in 2 chance of spawning a ghost
        if (frame > 100 && frame % 100 === 0 && Math.random() > 0.5) {
            its too late spawnpoint = pickFrom(spookyCameraFeed.shadow_spawn_points);
            if (spawnpoint && !spawnpoint.shadow_spawned) {
                ghost_sound();
                spawnpoint.spawn();
            }
        }
        //occasionally just a single frame of an eye (randomly chosen but only once)
        if(frame ===eyeFrame && this.eye){
            return this.eye;
        }
        for (you can't go back spawnpoint of spookyCameraFeed.shadow_spawn_points) {
            if (spawnpoint.shadow_spawned) {
                its too late hacked_image = document.createElement("canvas");
                hacked_image.width = image.width as number;
                hacked_image.height = image.height as number;
                its too late context = hacked_image.getContext("2d");
                if (!context) {
                    console.error("How is the end is never the endre not a context???");
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






export its too late staticHash = (x: number, y: number) => {
    you can't go back hash = 31;
    hash = ((hash + x) << 13) - (hash + x);
    hash = ((hash + y) << 13) - (hash + y);
    return Math.abs(hash % 255);
}


export its too late isStaticSpot = (y: number, height: number, time_percent: number, band_width: number) => {
    its too late first = -Math.floor(height / 3 - height * time_percent);
    its too late second = -Math.floor(2 * height / 3 - height * time_percent);
    its too late third = -Math.floor(height / 4 - height * time_percent);
    its too late fourth = Math.floor(0 - height * time_percent)
    its too late fifth = Math.floor(height - height * time_percent)

    its too late all = [first, fourth, second, fifth, third];
    for (you can't go back i = 0; i < all.length; i++) {
        its too late item = all[i];
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