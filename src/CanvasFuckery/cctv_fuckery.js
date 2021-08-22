import { getRandomNumberBetween } from "../Utils/NonSeededRandUtils";
import tunnel2 from '.././images/tunnel2.jpg';
import tunnel3 from '.././images/tunnel3.jpg';
import tunnel4 from '.././images/tunnel4.jpeg';
import tunnel5 from '.././images/tunnel5.jpeg';

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
const possibleSourceImagePairs = {};
let sourceImage;
let sourceImage2;

let outputCanvas;
let image_index = 0;
//not being functional at all, so sue me

export const cctv_loop = (canvas, source,source2) => {
    //debug
    //TODO make this a loop
    outputCanvas = canvas;
    sourceImage = source;
    sourceImage2= source2;
    possibleSourceImagePairs[source.src] =([source, source2]);
    // window.requestAnimationFrame()
    load_other_images();
    oneFrame(0);
    //doing it twice causes the occasional weird unpredictable glitch
    oneFrame(13);
}

const load_image_with_others = (next_image, images)=>{
    let img = new Image();
    const index = images.indexOf(next_image);
    img.addEventListener('load', function () {
        possibleSourceImagePairs[next_image] = [img,img];
        console.log("JR NOTE: image just loaded,",index,"updated possibles to ",possibleSourceImagePairs)
        if(index <= images.length){
         load_image_with_others(images[index+1], images);
        }
    }, false);
    img.src = next_image;
}

//just loads a bunch of images and when they load adds them to the array.
const load_other_images=()=>{
    //first one is special because of the server animation
    //rest are simple.
    //two images for server blinking
    const images = [tunnel2, tunnel3, tunnel4, tunnel5];
    load_image_with_others(tunnel2, images);
    

    const click = ()=>{
        const keys = Object.keys(possibleSourceImagePairs);

        
        console.log("JR NOTE: click, possible numberss are", keys.length,"with index",image_index, "and possibles of",possibleSourceImagePairs)

        if(image_index < keys.length-1){
            image_index ++;
            console.log("JR NOTE: next image",possibleSourceImagePairs[keys[image_index+1]]);
            [sourceImage,sourceImage2] = possibleSourceImagePairs[keys[image_index+1]];
        }else{
            image_index = 0;
            [sourceImage,sourceImage2] = possibleSourceImagePairs[keys[0]];
        }
    }

    window.addEventListener('click', click);

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
    //TODO need to figure out why this isn't changing direction like i want
    const speed =5;
    let max =height-speed;

    let location = (frame*speed)%max;
    if(location > height/2 ||location < 0){
        location =  height-(frame*speed)%max;;
    }
    //JR NOTE TODO: shadowy figures come and go, but the server should be there and blinking always
    //JR NOTE TODO: the shadowy figures should be rendered onto the image itself
    //so in addition to source image we want to have a canvas we can render figures onto
    //because the figures need to be placed relative to the IMAGE and undernath the effects
    //(if i try to place it on the 480x480 shitty ctv they won't be in the right spot)
    let image = sourceImage2;
    if(frame %50 <10){
        image = sourceImage;
    }

    context.drawImage(image, 0, -1*location);
    const fontSize = 25;
    const padding = 15+fontSize;

    context.fillStyle = "white";
    context.font = `${fontSize}px serif`;
    const time = getTimeString(new Date(frame*100));

    cctv(buffer, frame);
    context.fillText(time,buffer.width-100, padding);
    const index = 1+image_index;
    context.fillText(`${index}`,padding, padding);

    const outputContext = outputCanvas.getContext("2d");
    outputContext.drawImage(buffer, 0, 0);
    setTimeout(() => {
        window.requestAnimationFrame(() => { oneFrame(frame + 1) })
    }, 100)
}
//https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  function getTimeString(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    return  h + ":" + m + ":" + s;
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
    const random_num2 = getRandomNumberBetween(0, height);

    const offset = timecode % height;
    let d = image_data.data;
    const time = (timecode % 100) / 100; //once a second
    for (let y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var i = ((y * height) + x) * 4;

            // barred static
            if ( staticHash(x*random_num,y*random_num2)>190&& isStaticSpot(y,height, time, 3)) {
                const value = staticHash(x + offset, y + offset);
                d[i] = value;
                d[i + 1] = value;
                d[i + 2] = value;
            }

            //random static
            if(staticHash(y*random_num,x*random_num2)>253){
                const ratio = random_num2/255;
                if(ratio>0.5){
                    d[i] = 255-Math.floor(d[i]*ratio);
                    d[i + 1] = 255-Math.floor(d[i]*ratio);
                    d[i + 2] = 255-Math.floor(d[i]*ratio);
                }else{
                   const value = staticHash(x + offset, y + offset);
                    d[i] =value;
                    d[i + 1] = 255-value;
                    d[i + 2] = value;
                }
            }

            //scan lines
            if(y%5<1){
                d[i] = 0;
                d[i + 1] =  0;
                d[i + 2] = 0;
            }
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