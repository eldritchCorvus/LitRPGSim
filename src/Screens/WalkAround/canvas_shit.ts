export const initBlack = (canvas:HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if(!context){
        return;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export const drawDoors = (canvas:HTMLCanvasElement,numberExits:number, doorImage:HTMLImageElement, rugImage: HTMLImageElement) => {
    const context = canvas.getContext("2d");
    if(!context){
        return;
    }
    if(numberExits > 0){
        //south
        context.drawImage(rugImage,250,475);
    }
    if(numberExits > 1){
        //north
        context.drawImage(rugImage,250,105);
        context.drawImage(doorImage,250,37);

    }
    if(numberExits > 2){
        //east
        context.drawImage(rugImage,475,250);
    }
}

//https://stackoverflow.com/questions/14121719/html5-canvas-background-image-repeat
//some floors are just tiled, some are the whole damn thing, its fine
export const drawFloor = (canvas:HTMLCanvasElement, floorImage:HTMLImageElement) => {
    const padding = 10;
    const context = canvas.getContext("2d");
    if(!context){
        return;
    }
    const ptrn = context.createPattern(floorImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    if(!ptrn){
        return;
    }
    context.fillStyle = ptrn;
    context.fillRect(padding, padding, canvas.width-padding*2, canvas.height-padding*2); // context.fillRect(x, y, width, height);
}

export const drawWall = (canvas:HTMLCanvasElement, wallImage:HTMLImageElement) => {
    const padding = 10;
    const context = canvas.getContext("2d");
    if(!context){
        return;
    }
    const ptrn = context.createPattern(wallImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    if(!ptrn){
        return;
    }
    context.fillStyle = ptrn;
    context.fillRect(padding, padding, canvas.width-padding*2, 120);
}