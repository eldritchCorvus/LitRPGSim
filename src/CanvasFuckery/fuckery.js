//blame past me for this

/*
TODO: 
* inside rects color a  white or black circle, position depending on angle. bg should be opposite of circle
* circle should be blurry.
* concentric circles. size of rect should be based on size of circle.
*/
export  function fuckery(){
    const canvas = document.getElementById("canvas");
    
	const outer_r = Math.min(canvas.height, canvas.width)/2.1;

    //TODO how many boxes to make a circle?
    const radius = outer_r;
    const size = 10;
    let ratio = 1.0;
    for(let i =0; i<9; i++){
        drawCircleOfRects(canvas, radius*ratio,size*ratio);
        ratio = ratio -0.1;

    }

    blur(canvas);

}

function drawCircleOfRects(canvas,radius, size){
    const context=canvas.getContext("2d");
    const origin_x = canvas.width/2;
	const  origin_y = canvas.height/2;
    const num_rects = 90;
    for(let i = 0; i<num_rects; i++){
        const ret = addNewSquare(origin_x, origin_y, context, radius,size,i+1,num_rects,canvas.width);
    }
}

function addNewSquare(origin_x, origin_y, context, radius, size,num, num_rects, whole_width){
	var coords = pos_func(origin_x,origin_y,radius,num,num_rects);
	const x = coords[0];
	const y = coords[1];
	var color = "#000000";
	square(x,y,color, context,size,num,num_rects,whole_width);
    console.log("JR NOTE: going to return", coords);
    return coords;
}

function pos_func( origin_x, origin_y,radius,num,num_rects){
    return circle(origin_x, origin_y,radius,num, num_rects);
}

const blur = function(canvas){
    kernel(canvas, [1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9,1/9]);
}

const kernel= function(canvas, weights){
    var ctx = canvas.getContext('2d');
    if(!ctx){
        return;
    }
  	var pixels =ctx.getImageData(0, 0, canvas.width, canvas.height);
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side/2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dst = output.data;
    // go through the destination image pixels
    for (var y=0; y<h; y++) {
      for (var x=0; x<w; x++) {
        var sy = y;
        var sx = x;
        var dstOff = (y*w+x)*4;
        // calculate the weighed sum of the source image pixels that
        // fall under the convolution matrix
        var r=0, g=0, b=0, a=0;
        for (var cy=0; cy<side; cy++) {
          for (var cx=0; cx<side; cx++) {
            var scy = sy + cy - halfSide;
            var scx = sx + cx - halfSide;
            if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
              var srcOff = (scy*sw+scx)*4;
              var wt = weights[cy*side+cx];
              r += src[srcOff] * wt;
              g += src[srcOff+1] * wt;
              b += src[srcOff+2] * wt;
              a += src[srcOff+3] * wt;
            }
          }
        }
        dst[dstOff] = r;
        dst[dstOff+1] = g;
        dst[dstOff+2] = b;
        dst[dstOff+3] = a;
      }
    }
    ctx.putImageData(output, 0, 0);
}

function square(x,y,color, context,size,num,num_rects, whole_width){
    context.fillStyle=color;
    context.save();
    context.translate(x, y);

    //don't question it, its dumb. just played with numbers till it worked
    const theta = 2*Math.PI*(num)/(num_rects);
    context.rotate(theta);
    context.fillRect(0,0,size,size*2);
    // Create gradient
    //TODO shift gradient center based on whatever
    const choices = x>whole_width ?[size,size/2, 0]:[0,size/2, size];
    var grd = context.createRadialGradient(choices[(num)%3],size, 0, size, size, size*2);
    if(num%6<3){
        grd.addColorStop(0, "black");
        grd.addColorStop(1, "white");
    }else{
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "black");
    }

    // Fill with gradient
    context.fillStyle = grd;
    context.fillRect(0,0,size,size*2);
    context.restore();
}

//position function for drawing distinct objects in a circle
function circle(origin_x, origin_y,radius,num, num_rects){	
    //TODO rip out num rings entirely.
    const angle = 2*Math.PI*(num)/(num_rects);
    console.log('angle is ', angle, "num is ", num, "num_rects is", num_rects)
	var x = radius * Math.cos((angle)) + origin_x; //0,0 is not center
	var y = radius * Math.sin((angle)) + origin_y;
	//console.log("angle is " + angle + " and x is: " + x);
	return [x,y, angle];
}

function distance(x,x1,y,y1){
	return Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2));
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
