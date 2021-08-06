import background from '.././background.jpg';
import { THE_END_IS_NEVER } from '../Utils/constants';
import { getRandomNumberBetween } from '../Utils/NonSeededRandUtils';

//blame past me for how confusing this is, stole bits from http://farragofiction.com/ModernArtClicker/infinite_color_test.html
window.fuckery = fuckery;
export const scrawlOverBG = (ramble_array) => {
    const bg = document.querySelector("body");

    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 600;

    const max = Math.max(ramble_array.length, 13)
    //'Courier New', monospace, 13px, red, bold
    const context = canvas.getContext("2d");
    const padding = 10;
    const fontSize = 25;
    context.fillStyle = "red";
    context.font = `${fontSize}px serif`;
    for (let i = 0; i < max; i++) {
        if (ramble_array[i]) {
            context.fillText(ramble_array[i], padding + fontSize, i * (fontSize + padding));
        }
    }
    bg.style.backgroundImage = `url(${canvas.toDataURL()})`;

}

export const fuckUpBG = () => {
    var img = new Image();
    img.addEventListener('load', function () {
        fuckUpImage(img, glitchify, "bgbutithatesyou", true);
    }, false);
    img.src = background;
}

export const fuckUpBGButSoftly = () => {
    var img = new Image();
    img.addEventListener('load', function () {
        fuckUpImage(img, gaslight, "peacefulbg", false);
    }, false);
    img.src = background;
}

export function fuckery() {
    const div = document.getElementById("ThisIsNotASpiral");

    const bigBG = document.createElement("canvas");
    bigBG.width = 600 * 3;
    bigBG.height = 600;
    //TODO how many boxes to make a circle?

    const flipFuncs = [flipBoth, flipHorizontal, flipVertical];
    const frames = [];

    for (const flipFunc of flipFuncs) {
        const canvas = document.createElement("canvas");
        const buffer = document.createElement("canvas");

        canvas.width = 600;
        canvas.height = 600;
        buffer.width = canvas.width;
        buffer.height = canvas.height;
        const size = 14;
        let ratio = 1.0;
        const outer_r = Math.min(canvas.height, canvas.width) / 2.1;
        const radius = outer_r;
        frames.push(canvas);
        for (let i = 0; i < 11; i++) {
            drawCircleOfRects(buffer, radius * ratio, size * ratio, i, flipFunc);
            rotateRingTwelveDegrees(canvas, i);
            canvas.getContext("2d").drawImage(buffer, 0, 0);
            canvas.getContext("2d").restore();
            ratio = ratio * 0.8;
        }
        blur(canvas);
    }
    let eye;
    if (window.rageMode) {
        eye = document.getElementById("ThisIsNotAnEye2");
    } else {
        eye = document.getElementById("ThisIsNotAnEye1");
    }
    for (let frame of frames) {
        frame.getContext("2d").drawImage(eye, frame.width / 2 - 55 / 2, frame.height / 2 - 55 / 2);
    }
    const bigContext = bigBG.getContext("2d");
    bigContext.drawImage(frames[0], 0, 0);
    bigContext.drawImage(frames[1], 600, 0);
    bigContext.drawImage(frames[2], 1200, 0);
    div.style.backgroundImage = `url(${bigBG.toDataURL()})`
}

function fuckUpImage(img, fucking_function, class_name, binary) {
    const frames = [];
    const bg = document.querySelector("#ThisIsNotABG");

    for (let i = 0; i < 3; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        //grayscale(canvas);
        // edge_detection(canvas);
        //threshold(canvas);
        fucking_function(canvas);
        if (binary) {
            //draw binary on top plz.
            const padding = 10;
            const fontSize = 25;
            context.fillStyle = "#222222";
            if (i > 1) {
                context.fillStyle = "#111111";
            } else if (i > 2) {
                context.fillStyle = "#000000";
            }
            context.font = `${fontSize}px serif`;
            for (let i = 0; i < 19; i++) {
                context.fillText(THE_END_IS_NEVER, padding + fontSize, 325 + i * (fontSize + padding));
            }
        }


        frames.push(canvas);
    }
    const bigBoi = document.createElement("canvas");
    bigBoi.width = img.width * 3;
    bigBoi.height = img.height;
    const bigContext = bigBoi.getContext("2d");
    bigContext.drawImage(frames[0], 0, 0);
    bigContext.drawImage(frames[1], 1656, 0);
    bigContext.drawImage(frames[2], 3312, 0);


    //invert(canvas);
    bg.style.backgroundImage = `url(${bigBoi.toDataURL()})`;
    bg.classList.add(class_name);

}

function jitter(number, offset) {
    if (Math.random() > 0.1) {
        return number;
    }
    let direction = 1;
    if (Math.random() > .5) {
        direction = -1;
    }
    const magnitude = getRandomNumberBetween(0, offset);

    return number + magnitude * direction;
}


//JR NOTE TODO refactor to not get/put image data constantly
function glitchify(canvas) {
    /*  
        divide image into x by y chunks. 
        for each chunk, grab its image data and render it slightly off.
    */
    const rectWidth = 50;
    const rectHeight = 50;
    const buffer = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const bufferContext = buffer.getContext("2d");

    buffer.width = canvas.width;
    buffer.height = canvas.height;

    let original_data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    let image_data = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < buffer.width; x += rectWidth) {
        for (let y = 0; y < buffer.height; y += rectHeight) {
            image_data = offsetPixels(original_data, image_data, x, y, jitter(x, rectWidth), jitter(y, rectHeight), rectWidth, rectHeight, canvas.width);
        }
    }
    //make it black and white and spooooky
    var d = image_data.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        let v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 100) ? 88 : 0;
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
    const rectWidth = 10;
    const rectHeight = 10;
    const buffer = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const bufferContext = buffer.getContext("2d");

    buffer.width = canvas.width;
    buffer.height = canvas.height;
    let original_data = context.getImageData(0, 0, canvas.width, canvas.height).data;

    let image_data = context.getImageData(0, 0, canvas.width, canvas.height);
    for (let x = 0; x < buffer.width; x += rectWidth) {
        for (let y = 0; y < buffer.height; y += rectHeight) {
            if (Math.random() > 0.6) {
                //output = context.getImageData(jitter(x, rectWidth), jitter(y, rectHeight), rectWidth, rectHeight);
                image_data = offsetPixels(original_data, image_data, x, y, jitter(x, rectWidth), jitter(y, rectHeight), rectWidth, rectHeight, canvas.width);
            } else {
                //output = context.getImageData(x, y, rectWidth, rectHeight);
                image_data = offsetPixels(original_data, image_data, x, y, x, y, rectWidth, rectHeight, canvas.width);
            }
        }
    }
    bufferContext.putImageData(image_data, 0, 0);
    context.drawImage(buffer, 0, 0);

}

//takes all the pixels from fake_start_x and fake_start_y
// to the width and height and shoves them into the real start_x and y
//essentially offsets a chunk in a glitchy way
function offsetPixels(original_data, image_data, real_start_x, real_start_y, fake_start_x, fake_start_y, width, height, canvas_width) {
    if (real_start_x === fake_start_x && real_start_y === fake_start_y) {
        return image_data; //your work here is done even though you didn't do shit
    }

    //I am taking in image_data, which has a param called data which is a uint8array with 4 indices per pixel
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let real_index = x_y_to_indice(x + real_start_x, y + real_start_y, canvas_width) * 4;
            let fake_index = x_y_to_indice(x + fake_start_x, y + fake_start_y, canvas_width) * 4;

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
    const context = canvas.getContext("2d");
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(toRadians(45 * ringNum));
    context.translate(-canvas.width / 2, -canvas.height / 2);
}


function flipHorizontal(canvas) {
    const context = canvas.getContext("2d");
    context.save();
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
}

function flipVertical(canvas) {
    const context = canvas.getContext("2d");
    context.save();
    context.translate(0, canvas.height);
    context.scale(1, -1);

}

function flipBoth(canvas) {
    const context = canvas.getContext("2d");
    context.save();
    context.translate(canvas.width, canvas.height);
    context.scale(-1, -1);
}

function drawCircleOfRects(canvas, radius, size, ring_num, flipFunc) {
    const context = canvas.getContext("2d");
    const origin_x = canvas.width / 2;
    const origin_y = canvas.height / 2;
    context.fillRect(origin_x, origin_y, 30, 30);

    const num_rects = 90;
    //each circle should be upside down compared to the other to make it swirl
    if (ring_num % 2 === 0) {
        flipFunc(canvas);
    }
    for (let i = 0; i < num_rects; i++) {
        const ret = addNewSquare(origin_x, origin_y, context, radius, size, i + 1, num_rects, canvas.width);
    }
    if (ring_num % 2 === 0) {
        context.restore();
    }
}

function addNewSquare(origin_x, origin_y, context, radius, size, num, num_rects, whole_width) {
    var coords = pos_func(origin_x, origin_y, radius, num, num_rects);
    const x = coords[0];
    const y = coords[1];
    var color = "#000000";
    square(x, y, color, context, size, num, num_rects, whole_width, radius);
    return coords;
}

function pos_func(origin_x, origin_y, radius, num, num_rects) {
    return circle(origin_x, origin_y, radius, num, num_rects);
}

const threshold = function (canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var d = output.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 100) ? 255 : 0;
        d[i] = d[i + 1] = d[i + 2] = v
    }
    ctx.putImageData(output, 0, 0);
};

const grayscale = function (canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var d = output.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        d[i] = d[i + 1] = d[i + 2] = v
    }
    ctx.putImageData(output, 0, 0);
};

const invert = function (canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var d = output.data;
    for (var i = 0; i < d.length; i += 4) {
        d[i] = 255 - d[i];
        d[i + 1] = 255 - d[i + 1];
        d[i + 2] = 255 - d[i + 2];
    }
    ctx.putImageData(output, 0, 0);
};

const blur = function (canvas) {
    kernel(canvas, [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9]);
}

const edge_detection = function (canvas) {
    kernel(canvas, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
}

const kernel = function (canvas, weights) {
    var ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }
    var pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var side = Math.round(Math.sqrt(weights.length));
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var dst = output.data;
    // go through the destination image pixels
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y * w + x) * 4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r = 0, g = 0, b = 0, a = 0;
            for (var cy = 0; cy < side; cy++) {
                for (var cx = 0; cx < side; cx++) {
                    var scy = sy + cy - halfSide;
                    var scx = sx + cx - halfSide;
                    if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                        var srcOff = (scy * sw + scx) * 4;
                        var wt = weights[cy * side + cx];
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
    const theta = 2 * Math.PI * (num) / (num_rects);
    context.rotate(theta);
    const rect_ratio = 1.3;
    //context.fillRect(0,0,size,size*rect_ratio);
    // Create gradient
    //TODO shift gradient center based on whatever
    const choices = x > whole_width ? [size, size / 2, 0] : [0, size / 2, size];
    var grd = context.createRadialGradient(choices[(num) % 3], size, size / 4, 0, size, size * 2);
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
    //TODO rip out num rings entirely.
    const angle = 2 * Math.PI * (num) / (num_rects);
    var x = radius * Math.cos((angle)) + origin_x; //0,0 is not center
    var y = radius * Math.sin((angle)) + origin_y;
    return [x, y, angle];
}

function distance(x, x1, y, y1) {
    return Math.sqrt(Math.pow((x - x1), 2) + Math.pow((y - y1), 2));
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}
