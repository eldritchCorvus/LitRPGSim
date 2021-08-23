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
    leftImg:HTMLImageElement;
    rightImg:HTMLImageElement;
    scale: number;
    shadow_spawned = false;
    shadow_current_x = 0;
    shadow_current_y = 0;

    constructor(leftImg: HTMLImageElement, rightImg: HTMLImageElement, start_pos_x: number, start_pos_y: number, speed: number, scale: number, end_pos_x: number, end_pos_y: number){
        this.leftImg  = leftImg;
        this.rightImg = rightImg;
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
        console.log("JR NOTE: spawning monster at", this.shadow_current_x)
    }

    drawMonster=(context:CanvasRenderingContext2D)=>{
        const monster = this.getAppropriateImage();
        const direction = this.direction();
        this.shadow_current_x += this.speed * direction;
        if(Math.random()>0.9){
            //bob plz, but not too much
            if(Math.random()>0.5){
                this.shadow_current_y +=getRandomNumberBetween(0,2);
            }else{
                this.shadow_current_y +=-1*getRandomNumberBetween(0,2);  
            }
        }
        context.drawImage(monster, this.shadow_current_x,this.shadow_current_y, monster.width*this.scale, monster.height*this.scale);
    }

    direction = ()=>{
        if(this.start_pos_x>this.end_pos_x){
            return -1;
        }
        return 1;
    }

    getAppropriateImage =()=>{
        if(this.direction()<0){
            return this.leftImg;
        }
        return this.rightImg;
    }
    
}