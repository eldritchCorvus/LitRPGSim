//blame past me for this

/*
TODO: 
* draw rects in circle
* inside rects color a  white or black circle, position depending on angle. bg should be opposite of circle
* circle should be blurry.
* concentric circles. size of rect should be based on size of circle.
*/
export  function fuckery(){
    const canvas = document.getElementById("canvas");
    const origin_x = canvas.width/2;
	const  origin_y = canvas.height/2;
	const outer_r = Math.min(canvas.height, canvas.width)/2.1;
    console.log("JR NOTE canvas is", canvas)
    const context=canvas.getContext("2d");
    console.log("JR NOTE context  is", context)

    //TODO how many boxes to make a circle?
    const radius = outer_r;
    const size = 10;
    const memory = {last_x: 0, last_y:0,last_angle:0};
    for(let i = 0; i<100; i++){
        const ret = addNewSquare(memory.last_x, memory.last_y, memory.last_angle,origin_x, origin_y, context, radius,size);
        memory.last_x = ret[0];
        memory.last_y = ret[1];
        memory.last_angle = ret[2];
    }

}

function addNewSquare(last_x, last_y, last_angle,origin_x, origin_y, context, radius, size){
	var coords = pos_func(last_x, last_y, last_angle, origin_x,origin_y,radius, size);
	const x = coords[0];
	const y = coords[1];
	var color = "#000000";
	square(x,y,color, context,size,coords[2]);
    console.log("JR NOTE: going to return", coords);
    return coords;
}

function pos_func(last_x,last_y,last_angle, origin_x, origin_y,radius,size){
    return circle(last_x, last_y,last_angle, origin_x, origin_y,radius,size);
}

function square(x,y,color, context,size,angle){
    context.fillStyle=color;
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.fillRect(0,0,size,size*2);
    context.restore();
}

//position function for drawing distinct objects in a circle
function circle(x0,y0, last_angle, origin_x, origin_y,radius,size){	
    //TODO rip out num rings entirely.
	var angle = last_angle + (size*0.5);
	var x = radius * Math.cos(toRadians(angle)) + origin_x; //0,0 is not center
	var y = radius * Math.sin(toRadians(angle)) + origin_y;
	//console.log("angle is " + angle + " and x is: " + x);
	return [x,y, angle];
}

function distance(x,x1,y,y1){
	return Math.sqrt(Math.pow((x-x1),2) + Math.pow((y-y1),2));
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
