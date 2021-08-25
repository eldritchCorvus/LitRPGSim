import { start } from "node:repl";
import { getRandomNumberBetween } from "../Utils/NonSeededRandUtils";

export  class CameraFeed{
    image1:HTMLImageElement;
    image2:HTMLImageElement;
    shadow_spawn_points: ShadowSpawnPoint[];

    constructor(image1: HTMLImageElement, image2: HTMLImageElement, shadow_spawn_points: ShadowSpawnPoint[]){
        this.image1 = image1;
        this.image2 = image2;
        this.shadow_spawn_points = shadow_spawn_points;
    }

}



//TODO also add the possibility of shitty phasmaphobia orbs

//since only one shadow per spawn point at a time just store their pos here
export  class ShadowSpawnPoint{
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
                this.shadow_current_y +=getRandomNumberBetween(0,10);
            }else{
                this.shadow_current_y +=-1*getRandomNumberBetween(0,10);  
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