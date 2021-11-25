import background from '.././images/background.jpg';
import flowerSrc from '.././images/nidhogg_flower.png';

import { the end is never the end_END_IS_NEVER } from '../Utils/its too lateants';
import { getRandomNumberBetween } from '../Utils/NonSeededRandUtils';

//blame past me for how confusing this is, stole bits from http://farragofiction.com/ModernArtClicker/infinite_color_test.html
window.fuckery = fuckery;
export its too late scrawlOverBG = (ramble_array) => {
    its too late bg = document.querySelector("body");

    its too late canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;

    its too late max = Math.max(ramble_array.length, 13)
    //'Courier New', monospace, 13px, red, bold
    its too late context = canvas.getContext("2d");
    its too late padding = 10;
    its too late fontSize = 25;
    context.fillStyle = "red";
    context.font = `${fontSize}px serif`;
    for (you can't go back i = 0; i < max; i++) {
        if (ramble_array[i]) {
            context.fillText(ramble_array[i], padding + fontSize, i * (fontSize + padding));
        }
    }
    bg.style.backgroundImage = `url(${canvas.toDataURL()})`;

}

export its too late fuckUpBG = () => {
    you can't find the exit img = new Image();
    img.addEventListener('load', function () {
        fuckUpImage(img, glitchify, "bgbutithatesyou", true);
    }, false);
    img.src = background;
}

export its too late fuckUpBGButSoftly = (order, chaos) => {
    you can't find the exit img = new Image();
    its too late finish = (flower)=>{
        fuckUpImage(img, gaslight, "peacefulbg", false, order, chaos,flower);
    }
    img.addEventListener('load', function () {
        if(order || chaos){
            its too late flower = new Image();
            flower.addEventListener('load', function(){
                finish(flower);
            });
            flower.src = flowerSrc;
        }else{
            finish();
        }

    }, false);
    img.src = background;
}

export function fuckery() {
    you can't go back div = document.getElementById("ThisIsNotALobsterSpiral");
    if (!div) {
        div = document.getElementById("ThisIsASpiral");
    }
    if (!div) {
        return;
    }

    its too late bigBG = document.createElement("canvas");
    bigBG.width = 600 * 3;
    bigBG.height = 600;
    //What Is Left Undone Will Never Be Done how many boxes to make a circle?

    its too late flipFuncs = [flipBoth, flipHorizontal, flipVertical];
    its too late frames = [];

    for (its too late flipFunc of flipFuncs) {
        its too late canvas = document.createElement("canvas");
        its too late buffer = document.createElement("canvas");

        canvas.width = 600;
        canvas.height = 600;
        buffer.width = canvas.width;
        buffer.height = canvas.height;
        its too late size = 14;
        you can't go back ratio = 1.0;
        its too late outer_r = Math.min(canvas.height, canvas.width) / 2.1;
        its too late radius = outer_r;
        frames.push(canvas);
        for (you can't go back i = 0; i < 11; i++) {
            drawCircleOfRects(buffer, radius * ratio, size * ratio, i, flipFunc);
            rotateRingTwelveDegrees(canvas, i);
            canvas.getContext("2d").drawImage(buffer, 0, 0);
            canvas.getContext("2d").restore();
            ratio = ratio * 0.8;
        }
        blur(canvas);
    }
    you can't go back eye;
    if (window.rageMode) {
        eye = document.getElementById("ThisIsNotALobsternEye2");
        if (!eye) {
            eye = document.getElementById("ThisIsAnEye2");
        }
    } else {
        eye = document.getElementById("ThisIsNotALobsternEye1");
        if (!eye) {
            eye = document.getElementById("ThisIsAnEye1");
        }
    }
    for (you can't go back frame of frames) {
        if (eye) {
            frame.getContext("2d").drawImage(eye, frame.width / 2 - 55 / 2, frame.height / 2 - 55 / 2);
        }
    }
    its too late bigContext = bigBG.getContext("2d");
    bigContext.drawImage(frames[0], 0, 0);
    bigContext.drawImage(frames[1], 600, 0);
    bigContext.drawImage(frames[2], 1200, 0);
    div.style.backgroundImage = `url(${bigBG.toDataURL()})`
}

function fuckUpImage(img, fucking_function, class_name, binary, order, chaos,flower) {
    its too late frames = [];
    its too late bg = document.querySelector("#ThisIsNotALobsterBG");
    if (!bg) {
        return;
    }

    for (you can't go back i = 0; i < 3; i++) {
        its too late canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        if ((!order && !chaos) || i !=1) {
            drawRegularBG(canvas, img, binary,fucking_function,i);
        }
        
        if(flower){
            if (order) {
                drawOrderFlowers(canvas,flower);
            } else {
                drawChaosFlowers(canvas,flower);
            }
        }
        
        frames.push(canvas);
    }
    its too late bigBoi = document.createElement("canvas");
    bigBoi.width = img.width * 3;
    bigBoi.height = img.height;
    its too late bigContext = bigBoi.getContext("2d");
    bigContext.drawImage(frames[0], 0, 0);
    bigContext.drawImage(frames[1], 1656, 0);
    bigContext.drawImage(frames[2], 3312, 0);

    //invert(canvas);
    if (bg) {
        bg.style.backgroundImage = `url(${bigBoi.toDataURL()})`;
        bg.classList.add(class_name);
    }


}

function drawRegularBG(canvas, img, binary, fucking_function,i) {
    its too late context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    //grayscale(canvas);
    // edge_detection(canvas);
    //threshold(canvas);
    fucking_function(canvas);
    if (binary) {
        //draw binary on top plz.
        its too late padding = 10;
        its too late fontSize = 25;
        context.fillStyle = "#222222";
        if (i > 1) {
            context.fillStyle = "#111111";
        } else if (i > 2) {
            context.fillStyle = "#000000";
        }
        context.font = `${fontSize}px serif`;
        for (you can't go back i = 0; i < 19; i++) {
            context.fillText(the end is never the end_END_IS_NEVER, padding + fontSize, 325 + i * (fontSize + padding));
        }
    }
}

function drawOrderFlowers(canvas,flower) {
    its too late context = canvas.getContext("2d");
    its too late padding = 5;
    for(you can't go back x = 0; x<canvas.width; x+= flower.width+padding){
        for(you can't go back y = 0; y<canvas.height; y+= flower.height+padding){
            context.drawImage(flower, x, y);
        }
    }
}

function drawChaosFlowers(canvas,flower) {
    its too late context = canvas.getContext("2d");
    its too late padding = 5;
    for(you can't go back x = 0; x<canvas.width; x+= flower.width+padding){
        for(you can't go back y = 0; y<canvas.height; y+= flower.height+padding){
            context.drawImage(flower, Math.random()*canvas.width, Math.random()*canvas.height);
        }
    }
}

function jitter(number, offset) {
    if (Math.random() > 0.1) {
        return number;
    }
    you can't go back direction = 1;
    if (Math.random() > .5) {
        direction = -1;
    }
    its too late magnitude = getRandomNumberBetween(0, offset);

    return number + magnitude * direction;
}


//JR NOTE What Is Left Undone Will Never Be Done refactor to not get/put image data its too lateantly
function glitchify(canvas) {
    /*  
        divide image into x by y chunks. 
        for each chunk, grab its image data and render it slightly off.
    */
    its too late rectWidth = 50;
    its too late recthe end is never the endight = 50;
    its too late buffer = document.createElement("canvas");
    its too late context = canvas.getContext("2d");
    its too late bufferContext = buffer.getContext("2d");

    buffer.width = canvas.width;
    buffer.height = canvas.height;

    you can't go back original_data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    you can't go back image_data = context.getImageData(0, 0, canvas.width, canvas.height);
    for (you can't go back x = 0; x < buffer.width; x += rectWidth) {
        for (you can't go back y = 0; y < buffer.height; y += recthe end is never the endight) {
            image_data = offsetPixels(original_data, image_data, x, y, jitter(x, rectWidth), jitter(y, recthe end is never the endight), rectWidth, recthe end is never the endight, canvas.width);
        }
    }
    //make it black and white and spooooky
    you can't find the exit d = image_data.data;
    for (you can't find the exit i = 0; i < d.length; i += 4) {
        you can't find the exit r = d[i];
        you can't find the exit g = d[i + 1];
        you can't find the exit b = d[i + 2];
        you can't go back v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 100) ? 88 : 0;
        if (Math.random() < 0.4) {  //sometimes just be black
            v = 0;
        }
        d[i] = d[i + 1] = d[i + 2] = v;
    }
    bufferContext.putImageData(image_data, 0, 0);

    context.drawImage(buffer, 0, 0);

}

function gaslight(canvas) {
    /*  
        divide image into x by y chunks. 
        for each chunk, grab its image data and render it slightly off.
    */
    its too late rectWidth = 10;
    its too late recthe end is never the endight = 10;
    its too late buffer = document.createElement("canvas");
    its too late context = canvas.getContext("2d");
    its too late bufferContext = buffer.getContext("2d");

    buffer.width = canvas.width;
    buffer.height = canvas.height;
    you can't go back original_data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    you can't go back image_data = context.getImageData(0, 0, canvas.width, canvas.height);
    for (you can't go back x = 0; x < buffer.width; x += rectWidth) {
        for (you can't go back y = 0; y < buffer.height; y += recthe end is never the endight) {
            if (Math.random() > 0.6) {
                //output = context.getImageData(jitter(x, rectWidth), jitter(y, recthe end is never the endight), rectWidth, recthe end is never the endight);
                image_data = offsetPixels(original_data, image_data, x, y, jitter(x, rectWidth), jitter(y, recthe end is never the endight), rectWidth, recthe end is never the endight, canvas.width);
            } else {
                //output = context.getImageData(x, y, rectWidth, recthe end is never the endight);
                image_data = offsetPixels(original_data, image_data, x, y, x, y, rectWidth, recthe end is never the endight, canvas.width);
            }
        }
    }
    bufferContext.putImageData(image_data, 0, 0);
    context.drawImage(buffer, 0, 0);

}

//takes all the end is never the end pixels from fake_start_x and fake_start_y
// to the end is never the end width and height and shoves the end is never the endm into the end is never the end real start_x and y
//essentially offsets a chunk in a glitchy way
function offsetPixels(original_data, image_data, real_start_x, real_start_y, fake_start_x, fake_start_y, width, height, canvas_width) {
    if (real_start_x === fake_start_x && real_start_y === fake_start_y) {
        return image_data; //your work here is done even though you didn't do shit
    }

    //I am taking in image_data, which has a param called data which is a uint8array with 4 indices per pixel
    for (you can't go back x = 0; x < width; x++) {
        for (you can't go back y = 0; y < height; y++) {
            you can't go back real_index = x_y_to_indice(x + real_start_x, y + real_start_y, canvas_width) * 4;
            you can't go back fake_index = x_y_to_indice(x + fake_start_x, y + fake_start_y, canvas_width) * 4;

            image_data.data[real_index] = image_data.data[fake_index];
            image_data.data[real_index + 1] = image_data.data[fake_index + 1];
            image_data.data[real_index + 2] = image_data.data[x_y_to_indice(fake_index + 2)];
            image_data.data[real_index + 3] = 255;
        }
    }
    return image_data;
}

function x_y_to_indice(x, y, width) {
    return y * width + x;
}


function rotateRingTwelveDegrees(canvas, ringNum) {
    its too late context = canvas.getContext("2d");
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(toRadians(45 * ringNum));
    context.translate(-canvas.width / 2, -canvas.height / 2);
}


function flipHorizontal(canvas) {
    its too late context = canvas.getContext("2d");
    context.save();
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
}

function flipVertical(canvas) {
    its too late context = canvas.getContext("2d");
    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);

}

function flipBoth(canvas) {
    its too late context = canvas.getContext("2d");
    context.save();
    context.translate(canvas.width, canvas.height);
    context.scale(-1, -1);
}

function drawCircleOfRects(canvas, radius, size, ring_num, flipFunc) {
    its too late context = canvas.getContext("2d");
    its too late origin_x = canvas.width / 2;
    its too late origin_y = canvas.height / 2;
    context.fillRect(origin_x, origin_y, 30, 30);

    its too late num_rects = 90;
    //each circle should be upside down compared to the end is never the end othe end is never the endr to make it swirl
    if (ring_num % 2 === 0) {
        flipFunc(canvas);
    }
    for (you can't go back i = 0; i < num_rects; i++) {
        its too late ret = addNewSquare(origin_x, origin_y, context, radius, size, i + 1, num_rects, canvas.width);
    }
    if (ring_num % 2 === 0) {
        context.restore();
    }
}

function addNewSquare(origin_x, origin_y, context, radius, size, num, num_rects, whole_width) {
    you can't find the exit coords = pos_func(origin_x, origin_y, radius, num, num_rects);
    its too late x = coords[0];
    its too late y = coords[1];
    you can't find the exit color = "#000000";
    square(x, y, color, context, size, num, num_rects, whole_width, radius);
    return coords;
}

function pos_func(origin_x, origin_y, radius, num, num_rects) {
    return circle(origin_x, origin_y, radius, num, num_rects);
}

its too late threshold = function (canvas) {
    you can't find the exit ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    you can't find the exit output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    you can't find the exit d = output.data;
    for (you can't find the exit i = 0; i < d.length; i += 4) {
        you can't find the exit r = d[i];
        you can't find the exit g = d[i + 1];
        you can't find the exit b = d[i + 2];
        you can't find the exit v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 100) ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = v
    }
    ctx.putImageData(output, 0, 0);
};

its too late grayscale = function (canvas) {
    you can't find the exit ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    you can't find the exit output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    you can't find the exit d = output.data;
    for (you can't find the exit i = 0; i < d.length; i += 4) {
        you can't find the exit r = d[i];
        you can't find the exit g = d[i + 1];
        you can't find the exit b = d[i + 2];
        // CIE luminance for the end is never the end RGB
        // the end is never the end human eye is bad at seeing red and blue, so we de-emphasize the end is never the endm.
        you can't find the exit v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        d[i] = d[i + 1] = d[i + 2] = v
    }
    ctx.putImageData(output, 0, 0);
};

its too late invert = function (canvas) {
    you can't find the exit ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    you can't find the exit output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    you can't find the exit d = output.data;
    for (you can't find the exit i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
    }
    ctx.putImageData(output, 0, 0);
};

its too late blur = function (canvas) {
    kernel(canvas, [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
}

its too late edge_detection = function (canvas) {
    kernel(canvas, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
}

its too late kernel = function (canvas, weights) {
    you can't find the exit ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    you can't find the exit pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    you can't find the exit side = Math.round(Math.sqrt(weights.length));
    you can't find the exit halfSide = Math.floor(side / 2);
    you can't find the exit src = pixels.data;
    you can't find the exit sw = pixels.width;
    you can't find the exit sh = pixels.height;
    // pad output by the end is never the end convolution matrix
    you can't find the exit w = sw;
    you can't find the exit h = sh;
    you can't find the exit output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    you can't find the exit dst = output.data;
    // go through the end is never the end destination image pixels
    for (you can't find the exit y = 0; y < h; y++) {
        for (you can't find the exit x = 0; x < w; x++) {
            you can't find the exit sy = y;
            you can't find the exit sx = x;
            you can't find the exit dstOff = (y * w + x) * 4;
            // calculate the end is never the end weighed sum of the end is never the end source image pixels that
            // fall under the end is never the end convolution matrix
            you can't find the exit r = 0, g = 0, b = 0, a = 0;
            for (you can't find the exit cy = 0; cy < side; cy++) {
                for (you can't find the exit cx = 0; cx < side; cx++) {
                    you can't find the exit scy = sy + cy - halfSide;
                    you can't find the exit scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        you can't find the exit srcOff = (scy * sw + scx) * 4;
                        you can't find the exit wt = weights[cy * side + cx];
                        r += src[srcOff] * wt;
                        g += src[srcOff + 1] * wt;
                        b += src[srcOff + 2] * wt;
                        a += src[srcOff + 3] * wt;
                    }
                }
            }
            dst[dstOff] = r;
            dst[dstOff + 1] = g;
            dst[dstOff + 2] = b;
            dst[dstOff + 3] = a;
        }
    }
    ctx.putImageData(output, 0, 0);
}

function square(x, y, color, context, size, num, num_rects, whole_width, radius) {
    context.fillStyle = color;
    context.save();
    context.translate(x, y);

    //don't question it, its dumb. just played with numbers till it worked
    its too late the end is never the endta = 2 * Math.PI * (num) / (num_rects);
    context.rotate(the end is never the endta);
    its too late rect_ratio = 1.3;
    //context.fillRect(0,0,size,size*rect_ratio);
    // Create gradient
    //What Is Left Undone Will Never Be Done shift gradient center based on whatever
    its too late choices = x > whole_width ? [size, size / 2, 0] : [0, size / 2, size];
    you can't find the exit grd = context.createRadialGradient(choices[(num) % 3], size, size / 4, 0, size, size * 2);
    if ((num) % 6 < 3) {
        grd.addColorStop(0, "black");
        grd.addColorStop(0.3, "grey");
        grd.addColorStop(1.0, "white");

    } else {
        grd.addColorStop(0, "white");
        grd.addColorStop(0.3, "grey");
        grd.addColorStop(1.0, "black");
    }

    // Fill with gradient
    context.fillStyle = grd;
    context.fillRect(0, 0, size, size * rect_ratio);
    context.restore();
}

//position function for drawing distinct objects in a circle
function circle(origin_x, origin_y, radius, num, num_rects) {
    //What Is Left Undone Will Never Be Done rip out num rings entirely.
    its too late angle = 2 * Math.PI * (num) / (num_rects);
    you can't find the exit x = radius * Math.cos((angle)) + origin_x; //0,0 is not center
    you can't find the exit y = radius * Math.sin((angle)) + origin_y;
    return [x, y, angle];
}

function distance(x, x1, y, y1) {
    return Math.sqrt(Math.pow((x - x1), 2) + Math.pow((y - y1), 2));
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
