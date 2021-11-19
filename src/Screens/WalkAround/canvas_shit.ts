import { loadSecretImage } from "../..";
import { Theme } from "../../Modules/Theme";
import { WALLBACKGROUND } from "../../Modules/ThemeStorage";
import SeededRandom from "../../Utils/SeededRandom";
import { addImageProcess } from "../../Utils/URLUtils";

export interface RenderedItems {
    x: number;
    y: number;
    width: number;
    height: number;
    flavorText: string;
}

export const initBlack = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export const drawDoors = (canvas: HTMLCanvasElement, numberExits: number, doorImage: HTMLImageElement, rugImage: HTMLImageElement) => {
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    if (numberExits > 0) {
        //south
        context.drawImage(rugImage, 250, 475);
    }
    if (numberExits > 1) {
        //north
        context.drawImage(rugImage, 250, 105);
        context.drawImage(doorImage, 250, 37);

    }
    if (numberExits > 2) {
        //east
        context.drawImage(rugImage, 475, 250);
    }
}

//https://stackoverflow.com/questions/14121719/html5-canvas-background-image-repeat
//some floors are just tiled, some are the whole damn thing, its fine
export const drawFloor = (canvas: HTMLCanvasElement, floorImage: HTMLImageElement) => {
    const padding = 10;
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    const ptrn = context.createPattern(floorImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    if (!ptrn) {
        return;
    }
    context.fillStyle = ptrn;
    context.fillRect(padding, padding, canvas.width - padding * 2, canvas.height - padding * 2); // context.fillRect(x, y, width, height);
}

export const drawWall = (canvas: HTMLCanvasElement, wallImage: HTMLImageElement) => {
    const padding = 10;
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    const ptrn = context.createPattern(wallImage, 'repeat'); // Create a pattern with this image, and set it to "repeat".
    if (!ptrn) {
        return;
    }
    context.fillStyle = ptrn;
    context.fillRect(padding, padding, canvas.width - padding * 2, 120);
}


//yes i COULD take in an image but....i want this to have the logic of placing them
export const drawWallObjects = async (key:string,folder:string,canvas: HTMLCanvasElement, seededRandom: SeededRandom, themes: Theme[]) => {
    /*
        if rand > 0.5 ,pick a theme at random, grab a WALLBACKGROUND from it.
        position it a random amount above the bottom of the floor (but not higher than it can be);
    */
    let current_x = 0;
    const padding = 10;
    const context = canvas.getContext("2d");
    const ret: RenderedItems[] = [];

    if (!context) {
        return ret;
    }
    const floor_bottom = 120;

    while (current_x < canvas.width) {
        const chosen_theme: Theme = seededRandom.pickFrom(themes);
        const item = chosen_theme.pickPossibilityFor(seededRandom, key);
        if (item && item.src && seededRandom.nextDouble() > 0.3) {
            const image: any = await addImageProcess(loadSecretImage(`Walkabout/Objects/${folder}/${item.src}`)) as HTMLImageElement;
            current_x += image.width;
            //don't clip the wall border, don't go past the floor
            if(current_x+padding+image.width > canvas.width){
                return ret;
            }
            context.drawImage(image, current_x, seededRandom.getRandomNumberBetween(padding, Math.max(padding,floor_bottom-image.height)));
            ret.push({ x: current_x, y: 0, width: image.width, height: image.height, flavorText: item.desc })

        } else {
            current_x += 50;
        }
    }


    return ret;



}