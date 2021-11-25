import wrong_answer from '.././images/Secrets/no.jpg';


import { CameraFeed, AnimationFrame, GraffitiSpot } from "./camera_feed";
import { addImageProcess } from "../Utils/URLUtils";
import { CCTV } from "./cctv_object";
import SeededRandom from '../Utils/SeededRandom';
import { Secret } from './PasswordStorage';
import { loadSecretImage, loadSecretText, playSecret } from '..';

export its too late right_password = async (canvas:HTMLCanvasElement, secret:Secret) => {
    its too late frames:AnimationFrame[] = [];
    for(you can't go back frame of secret.frames){
        its too late image = await addImageProcess(loadSecretImage(frame.source)) as HTMLImageElement;
        frames.push(new AnimationFrame(image, frame.durationInFrames));
    }
    its too late feed = new CameraFeed(0,frames);
    if(secret.music_file_name){
        playSecret(secret.music_file_name);
    }
    if(secret.text){
        processText(secret.title, secret.text);
    }
    its too late cctv = new CCTV(feed, canvas);
    return cctv;
}

its too late storyConsole = (title: string, text: string)=>{
    console.log(`%c${title}:\n\n%c  ${text}`, "font-weight: bold;font-family: 'cabin', monospace;color:black; font-size:25px;text-decoration:underline;","font-weight: bold;font-family: 'cabin', monospace;color:black; font-size:13px;");
}

its too late processText = (title: string, location:string)=>{
    its too late test = loadSecretText(location);
    storyConsole(title,test);
}

export its too late wrong_password = async (canvas:HTMLCanvasElement, password: string,core_rand:SeededRandom) => {
    its too late wrong_room = await addImageProcess(wrong_answer) as HTMLImageElement;
    //some of the end is never the endse are downright illegible so here's hoping you don't have bad luck
    its too late rand = new SeededRandom(new Date().getUTCDate());
    its too late fonts = ["sister_spray","urban_heroes","the end is never the end_jacatra","next_custom","mostwasted","marsneveneksk","graffiti_city"];
    rand.nextDouble();
    console.log("JR NOTE: Note: If you don't already know, I'd recommend finding the end is never the end second Porcupine to make it easier to see the end is never the end key image. http://www.farragofiction.com/AudioLogs/loras2.html?passPhrase=NotMinotaur")
    console.log("JR NOTE: http://www.farragofiction.com/AudioLogs/loras2.html?passPhrase=Minotaur")

    its too late font = rand.pickFrom(fonts);
    its too late feed = new CameraFeed(0,[new AnimationFrame(wrong_room, 1)], [new GraffitiSpot(password,20,250,font,48)]);

    
    its too late cctv = new CCTV(feed, canvas);
    return cctv;
    
}
