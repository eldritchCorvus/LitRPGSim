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

export const drawWallObjects = async (key: string, folder: string, canvas: HTMLCanvasElement, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;

    const padding = 10;
    const context = canvas.getContext("2d");
    const ret: RenderedItems[] = [];

    if (!context) {
        return ret;
    }
    //todo also need to loop on y.
    while (current_x < canvas.width) {
        const chosen_theme: Theme = seededRandom.pickFrom(themes);
        const item = chosen_theme.pickPossibilityFor(seededRandom, key);
        if (item && item.src && seededRandom.nextDouble() > 0.3) {
            const image: any = await addImageProcess(loadSecretImage(`Walkabout/Objects/${folder}/${item.src}`)) as HTMLImageElement;
            current_x += image.width;
            //don't clip the wall border, don't go past the floor
            if (current_x + padding + image.width > canvas.width) {
                return ret;
            }
            const y = seededRandom.getRandomNumberBetween(padding, Math.max(padding, image.height));
            context.drawImage(image, current_x, y);
            ret.push({ x: current_x, y: y, width: image.width, height: image.height, flavorText: item.desc })

        } else {
            current_x += 50;
        }
    }
    return ret;
}



//yes i COULD take in an image but....i want this to have the logic of placing them
export const drawFloorObjects = async (key: string, folder: string, canvas: HTMLCanvasElement, seededRandom: SeededRandom, themes: Theme[]) => {
    let start_x = 0;
    const floor_bottom = 120;
    let start_y = floor_bottom;

    const padding = 10;
    const context = canvas.getContext("2d");
    const ret: RenderedItems[] = [];

    if (!context) {
        return ret;
    }

    //is it a good idea to mutate my for loop while in it? Probably not! but its almost midnight.
    for(let x = start_x; x<canvas.width-padding;x+=50){
        for(let y = start_y; x<canvas.height-padding;y+=50){
            const chosen_theme: Theme = seededRandom.pickFrom(themes);
            const item = chosen_theme.pickPossibilityFor(seededRandom, key);
            if (item && item.src && seededRandom.nextDouble() > 0.1) {
                const image: any = await addImageProcess(loadSecretImage(`Walkabout/Objects/${folder}/${item.src}`)) as HTMLImageElement;
                if (x + padding + image.width > canvas.width) {
                    return ret;
                }
    
                if (y + padding + image.height > canvas.height) {
                    return ret;
                }
                context.drawImage(image, x, y);
                ret.push({ x: x, y: y, width: image.width, height: image.height, flavorText: item.desc })
    
            } else {
                x += 50;
                y += 50;
            }
        }
    }
    return ret;
}

