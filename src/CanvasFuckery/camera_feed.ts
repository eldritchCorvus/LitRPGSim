import { start } from "node:repl";
import { getRandomNumberBetween } from "../Utils/NonSeededRandUtils";


export  class CameraFeed{
    index = 0; //is this the first image in a set? last? just for labeling
    frames: AnimationFrame[];
    current_frame = 0;
        //if there is graffiti layer it on top of the image.
        graffitiSpots:GraffitiSpot[];

    constructor(index: number, frames: AnimationFrame[],graffitiSpots:GraffitiSpot[]=[]){
        this.index = index;
        this.frames = frames;
        this.graffitiSpots = graffitiSpots;

    }

    //how many frames before we repeat?
    loopLength = ()=>{
        return this.frames.reduce((a, b) => a + b.durationInFrames, 0);
    }

    newFrame = (hacked_frame: number)=>{
        this.current_frame ++;
        const current_location  = hacked_frame % this.loopLength();
        let index = 0;
        //if i go in order, the first frame i find that i have no yet passed is what i return;
        for(let frame of this.frames){
            index += frame.durationInFrames;
            if(current_location < index){
                return frame.image;
            }
        }
        //shouldn't get here but this fixes weird bugs and if its glitchy thats part of the charm
        return this.frames[0].image;
    }

}

export class AnimationFrame{
    image: CanvasImageSource;
    durationInFrames: number;
    constructor(image: CanvasImageSource, durationInFrames: number){
        this.image = image;
        this.durationInFrames = durationInFrames;
    }
}
export  class SpookyCameraFeed extends CameraFeed{
    shadow_spawn_points: ShadowSpawnPoint[];

    constructor(index: number,frames: AnimationFrame[], shadow_spawn_points: ShadowSpawnPoint[]){
        super(index,frames);
        this.shadow_spawn_points = shadow_spawn_points;
    }

}

export class GraffitiSpot  {
    text: string;
    upper_left_x: number;
    upper_left_y:number; 
    font: string;
    fontSize: number;
    constructor(text: string, upper_left_x: number, upper_left_y: number, font ="Times New Roman", fontSize=18){
        this.text = text;
        this.upper_left_x = upper_left_x;
        this.upper_left_y = upper_left_y;
        this.font = font;
        this.fontSize = fontSize;
    }
}



//TODO also add the possibility of shitty phasmaphobia orbs

//since only one shadow per spawn point at a time just store their pos here
export  class ShadowSpawnPoint{
    type = "Shadow";
    speed:number;
    start_pos_x: number;
    start_pos_y: number;
    end_pos_x: number;
    end_pos_y: number;
    //left first, then right
    images: HTMLImageElement[];
    scale: number;
    shadow_spawned = false;
    shadow_current_x = 0;
    shadow_current_y = 0;

    constructor(images: HTMLImageElement[], start_pos_x: number, start_pos_y: number, speed: number, scale: number, end_pos_x: number, end_pos_y: number){
        this.images = images;
        this.speed = speed;
        this.start_pos_x = start_pos_x;
        this.start_pos_y = start_pos_y;
        this.end_pos_x = end_pos_x;
        this.end_pos_y = end_pos_y;
        this.scale  = scale;
    }

    spawn=()=>{
        this.shadow_spawned = true;
        this.shadow_current_x = this.start_pos_x;
        this.shadow_current_y = this.start_pos_y;
    }

    drawMonster=(context:CanvasRenderingContext2D)=>{
        const direction = this.direction();

        const monster = this.getAppropriateImage(direction);
        this.shadow_current_x += this.speed * direction;
        if(Math.random()>0.5){
            //bob plz, but not too much
            if(Math.random()>0.5){
                this.shadow_current_y +=getRandomNumberBetween(0,10);
            }else{
                this.shadow_current_y +=-1*getRandomNumberBetween(0,10);  
            }
        }
        if(direction > 0 && this.shadow_current_x > this.end_pos_x){
            this.despawn();
        }else if(direction < 0 && this.shadow_current_x < this.end_pos_x){
            this.despawn();
        }else{
            context.drawImage(monster, this.shadow_current_x,this.shadow_current_y, monster.width*this.scale, monster.height*this.scale);
        }
    }

    despawn=()=>{
        this.shadow_spawned = false;
    }

    direction = ()=>{
        if(this.start_pos_x>this.end_pos_x){
            return -1;
        }
        return 1;
    }

    //used for animation for NotAMinotaur
    getAppropriateImage =(frame: number)=>{
        if(frame<0){
            return this.images[0];
        }
        return this.images[1];
    }
    
}

//watt does not MOVE so much as kind of just. phase into existance. jutter a bit. then leave.
export class GhostOrbSpawnPoint extends ShadowSpawnPoint{
    type = "Orb";

    constructor(images: HTMLImageElement[], start_pos_x: number, start_pos_y: number, speed: number, scale: number, end_pos_x: number, end_pos_y: number){

        super(images, start_pos_x, start_pos_y,speed, scale, end_pos_x, end_pos_y );
    }

    drawMonster=(context:CanvasRenderingContext2D)=>{
        const direction = this.direction();

        const monster = this.images[0];
        this.shadow_current_x += this.speed * direction;
        if(Math.random()>0.5){
            //bob plz, but not too much
            if(Math.random()>0.5){
                this.shadow_current_x += -1* getRandomNumberBetween(0,10);
                this.shadow_current_y +=getRandomNumberBetween(0,15);
            }else{
                this.shadow_current_x += 1* getRandomNumberBetween(0,10);
                this.shadow_current_y +=-1*getRandomNumberBetween(0,15);  
            }
        }
        if(this.shadow_current_x > this.end_pos_x){
            this.despawn();
        }else{
            context.drawImage(monster, this.shadow_current_x,this.shadow_current_y, monster.width*this.scale, monster.height*this.scale);
        }
    }
}

//watt does not MOVE so much as kind of just. phase into existance. jutter a bit. then leave.
export class WattSpawnPoint extends ShadowSpawnPoint{
    type = "NotAMinotaur";

    constructor(images: HTMLImageElement[], start_pos_x: number, start_pos_y: number, speed: number, scale: number, end_pos_x: number, end_pos_y: number){

        super(images, start_pos_x, start_pos_y,speed, scale, end_pos_x, end_pos_y );
    }

    drawMonster=(context:CanvasRenderingContext2D)=>{
        const frameCount = this.shadow_current_x-this.start_pos_x;
        const monster = this.getAppropriateImage(frameCount);
        if(frameCount > this.speed){
            this.despawn();
        }
        
        context.drawImage(monster, this.start_pos_x,this.start_pos_y, monster.width*this.scale, monster.height*this.scale);

    }

     //used for animation for NotAMinotaur
     getAppropriateImage =(frame: number)=>{
         const number = frame % this.images.length;
        if(number<this.images.length){
            return this.images[number];
        }
        return this.images[0];
        
    }
    
}