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

//since only one shadow per spawn point at a time just store their pos here
export  class ShadowSpawnPoint{
    speed:number;
    start_pos_x: number;
    start_pos_y: number;
    end_pos_x: number;
    end_pos_y: number;
    scale: number;
    shadow_spawned = false;
    shadow_current_x = 0;
    shadow_current_y = 0;

    constructor(start_pos_x: number, start_pos_y: number, speed: number, scale: number, end_pos_x: number, end_pos_y: number){
        this.speed = speed;
        this.start_pos_x = start_pos_x;
        this.start_pos_y = start_pos_y;
        this.end_pos_x = end_pos_x;
        this.end_pos_y = end_pos_y;
        this.scale  = scale;
    }
    
}