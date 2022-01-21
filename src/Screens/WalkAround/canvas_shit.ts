import { loadSecretImage } from "../..";
import { Theme } from "../../Modules/Theme";
import { HUNTING, KILLING, WALLBACKGROUND } from "../../Modules/ThemeStorage";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import SeededRandom from "../../Utils/SeededRandom";
import { addImageProcess } from "../../Utils/URLUtils";

export interface RenderedItem {
    x: number;
    y: number;
    width: number;
    height: number;
    flavorText: string;
    themeKeys: string[];
    layer: number;
    src?: string; //needed so i can rerender them as required
    name?: string; //only living creatures have names, not items, its used to update them
}
export const redrawForeground = async (canvas: HTMLCanvasElement, items: RenderedItem[]) => {
    initClear(canvas);
    await drawForeground(canvas, items);
}

export const distance = (x1: number, y1: number, x2: number, y2: number) => {
    const first = (x1 - x2) ** 2;
    const second = (y1 - y2) ** 2;
    return (first + second) ** 0.5
}

export const distanceWithinRadius = (radius: number, x1: number, y1: number, x2: number, y2: number) => {
    return distance(x1, y2, x2, y2) < radius;
}

export const withinY = (myY: number, objectY: number, objectHeight: number) => {
    return myY > objectY && myY < objectY + objectHeight;
}

export const withinX = (myX: number, objectX: number, objectWidth: number) => {
    return myX > objectX && myX < objectX + objectWidth;
}

export const pointWithinBoundingBox = (myX: number, myY: number, objectX: number, objectY: number, objectWidth: number, objectHeight: number) => {

    return withinX(myX, objectX, objectWidth) && withinY(myY, objectY, objectHeight);
}

export const initBlack = (canvas: HTMLCanvasElement) => {
    console.log("JR NOTE: initing black ", canvas.width, canvas.height)
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
}

export const initClear = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
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

//JR NOTE: if for some reason images load once then don't render again, look into image.complete as WELL as image.onload
const drawItem = async (canvas: HTMLCanvasElement, item: RenderedItem) => {
    const context = canvas.getContext("2d");
    if (!context || !item.src) {
        return;
    }
    context.imageSmoothingEnabled = false;
    const scale = 1.5;
    const image: any = await addImageProcess(loadSecretImage(item.src)) as HTMLImageElement;
    context.drawImage(image, item.x, item.y, image.width * scale, image.height * scale);
}

const drawItems = async (canvas: HTMLCanvasElement, items: RenderedItem[], target_layer: number) => {
    for (let item of items) {
        if (item.layer === target_layer) {
            await drawItem(canvas, item);
        }
    }
}

//background is 0 and it doesn't matter order between them
export const drawBackground = async (canvas: HTMLCanvasElement, items: RenderedItem[]) => {
    for (let item of items) {
        if (item.layer === 0) {
            await drawItem(canvas, item);
        }
    }
}

//foreground is 1 and it doesn't matter order between them
export const drawForeground = async (canvas: HTMLCanvasElement, items: RenderedItem[]) => {
    for (let item of items) {
        if (item.layer === 1) {
            await drawItem(canvas, item);
        }
    }
}

//has to be async because it checks the image size for positioning
export const spawnFloorObjects = async (layer: number, key: string, folder: string, canvas: HTMLCanvasElement, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;
    const floor_bottom = 140;
    let current_y = floor_bottom;
    const padding = 10;
    const ret: RenderedItem[] = [];
    const scale = 1.5;
    const y_wiggle = 50;
    const debug = false;
    const clutter_rate = seededRandom.nextDouble(0.5,0.9); //smaller is more cluttered
    while (current_y + padding < canvas.height) {
        current_x = padding;
        while (current_x < canvas.width) {
            const chosen_theme: Theme = seededRandom.pickFrom(themes);
            const item = chosen_theme.pickPossibilityFor(seededRandom, key);
            if (item && item.src && seededRandom.nextDouble() > clutter_rate) {
                const image: any = await addImageProcess(loadSecretImage(`Walkabout/Objects/${folder}/${item.src}`)) as HTMLImageElement;
                current_x += image.width * scale;
                //don't clip the wall border, don't go past the floor
                if (current_x + padding + image.width * scale > canvas.width) {
                    break;
                }
                const y = seededRandom.getRandomNumberBetween(current_y - y_wiggle, current_y + y_wiggle);
                if (y + padding + image.height * scale > canvas.height) {
                    break;
                }
                ret.push({ layer: layer, src: `Walkabout/Objects/${folder}/${item.src}`, themeKeys: [chosen_theme.key], x: current_x, y: y, width: image.width, height: image.height, flavorText: item.desc })
            } else {
                current_x += 50;
            }
            if (debug && ret.length > 0) {
                return ret;
            }
        }
        current_y += y_wiggle;
    }
    return ret;
}

export const spawnVentObject = ()=>{
    return { layer: 1, src: `Walkabout/Objects/FrontWallObjects/closed_vent.png`, themeKeys: [HUNTING], x: 50, y: 90, width: 30, height: 22, flavorText: "TheCloser/closer-mystery"};
}

//coffin is rendered and animated thru the dom so no src
export const spawnCoffinObject = ()=>{
    return { layer: 1, themeKeys: [HUNTING], x: 260, y: 230, width: 50, height: 91, flavorText: "TheWanderersFinalRestingPlace"};

}

//has to be async because it checks the image size for positioning
export const spawnWallObjects = async (layer: number, key: string, folder: string, canvas: HTMLCanvasElement, seededRandom: SeededRandom, themes: Theme[]) => {
    let current_x = 0;
    const padding = 10;
    const context = canvas.getContext("2d");
    const ret: RenderedItem[] = [];
    if (!context) {
        return ret;
    }
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
            ret.push({ layer: layer, src: `Walkabout/Objects/${folder}/${item.src}`, themeKeys: [chosen_theme.key], x: current_x, y: y, width: image.width, height: image.height, flavorText: item.desc })
        } else {
            current_x += 50;
        }
    }
    //vents are rare and what is inside them is true random, because the Eye Killer is moving around in there
    if (layer === 1 && seededRandom.nextDouble()>.9) {
        const files = ["TheCloser/someone_probably_fucking_dies","TheCloser/2_am","TheCloser/closer-alt","TheCloser/closer-watt","TheCloser/closer-tyrfing","TheCloser/closer-hunt","TheCloser/closer-flowerchick"];
        ret.push({ layer: layer, src: `Walkabout/Objects/${folder}/closed_vent.png`, themeKeys: [HUNTING], x: 50, y: 90, width: 30, height: 22, flavorText: pickFrom(files) })
    }
    return ret;
}

