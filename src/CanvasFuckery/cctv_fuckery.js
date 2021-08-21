import { getRandomNumberBetween } from "../Utils/NonSeededRandUtils";

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
let sourceImage;
let outputCanvas;
//not being functional at all, so sue me

export const cctv_loop = (canvas, source) => {
    //debug
    //TODO make this a loop
    outputCanvas = canvas;
    sourceImage = source;
    // window.requestAnimationFrame()
    oneFrame(0);

}

//autopanning based on time code? back and forth?
const oneFrame = (frame) => {
    //odds and evens to decide sin vs cos maybe?
    const buffer = document.createElement("canvas");
    buffer.width = outputCanvas.width;
    buffer.height = outputCanvas.height;
    const context = buffer.getContext("2d");
    //TODO allow camera to pan around to view more than just this bit
    const height = sourceImage.height;
    //every other pan change direciton
    let max =height - buffer.height;
    //TODO need to figure out why this isn't changing direction like i want
    const direction = Math.floor((frame*10 /max))%2===0?-1:1;
    const location = (direction*frame*10)%max;
    context.drawImage(sourceImage, 0, location);
    cctv(buffer, frame);
    const outputContext = outputCanvas.getContext("2d");
    outputContext.drawImage(buffer, 0, 0);
    setTimeout(() => {
        window.requestAnimationFrame(() => { oneFrame(frame + 1) })
    }, 100)
}

const isStaticSpot = (y, height, time_percent, band_width) => {
    const first = -Math.floor(height / 3 - height * time_percent);
    const second = -Math.floor(2 * height / 3 - height * time_percent);
    const third = -Math.floor(height / 4 - height * time_percent);
    const fourth = Math.floor(0- height * time_percent)
    const fifth =  Math.floor(height- height * time_percent)

    const all = [first, fourth, second, fifth,third];
    for (let i =0; i<all.length; i++) {
        const item = all[i];
        if (Math.abs(item - y) < band_width*i) {
            return true;
        }
    }

    return false;

}

//lines of horizontal static that move up the screen.
//bigger ones that move down
const cctv = (canvas, timecode) => {
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    let image_data = context.getImageData(0, 0, canvas.width, canvas.height);
    const random_num = getRandomNumberBetween(0, width);
    const offset = timecode % height;
    let d = image_data.data;
    const time = (timecode % 100) / 100; //once a second
    for (let y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var i = ((y * height) + x) * 4;

            // this is the static lines
            if ( staticHash(y*random_num,x*random_num)>190&& isStaticSpot(y,height, time, 3)) {
                const value = staticHash(x + offset, y + offset);
                d[i] = value;
                d[i + 1] = value;
                d[i + 2] = value;
            }

            // other effects can go here using i like before
        }
        if(staticHash(y*random_num,x*random_num)>190){
            const value = staticHash(x + offset, y + offset);
                d[i] = value;
                d[i + 1] = value;
                d[i + 2] = value;
        }
    }
    context.putImageData(image_data, 0, 0);

}

function x_y_to_indice(x, y, width) {
    return y * width + x;
}

function indice_to_y(indice, width) {
    return Math.floor(indice / width);
}

function indice_to_x(indice, width) {
    return indice % width;
}

const staticHash = (x, y) => {
    let hash = 31;
    hash = ((hash + x) << 13) - (hash + x);
    hash = ((hash + y) << 13) - (hash + y);
    return Math.abs(hash % 255);
}

/** thanks pl for this contribution from dart land
 * int hashPair(int x, int y) {
    int hash = 31;
    hash = ((hash + x) << 13) - (hash + x);
    hash = ((hash + y) << 13) - (hash + y);
    return hash;
}
 */