
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
*wave  warp distortion (sin)(diagonal? follows mouse?)

*/
let sourceImage;
let outputCanvas;
//not being functional at all, so sue me

export const cctv_loop =(canvas, source)=>{
    //debug
    //TODO make this a loop
    outputCanvas = canvas;
    sourceImage = source;
    oneFrame(0);
}

const oneFrame=(timecode)=>{
    //odds and evens to decide sin vs cos maybe?
    const context = outputCanvas.getContext("2d");
    //TODO allow camera to pan around to view more than just this bit
    context.drawImage(sourceImage,0,-400);

}