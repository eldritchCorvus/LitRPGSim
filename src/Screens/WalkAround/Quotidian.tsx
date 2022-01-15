import styled from "@emotion/styled";
import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import {pointWithinBoundingBox, redrawForeground, RenderedItem } from "./canvas_shit";

import { chomp, doorEffect, loadSecretImage} from '../..';
import SeededRandom from "../../Utils/SeededRandom";
import { MEMORY_KEY, QUOTIDIAN_KEY } from ".";
import { isStringInArrayWithKey, addStringToArrayWithKey, removeStringFromArrayWithKey } from "../../Utils/LocalStorageUtils";
import { pickFrom } from "../../Utils/NonSeededRandUtils";
import { stringtoseed } from "../../Utils/StringUtils";
import { aggregateOpinionsOnThemes, all_themes } from "../../Modules/Theme";
import { removeItemOnce } from "../../Utils/ArrayUtils";
import { ADJ, COMPLIMENT, INSULT, LOCATION, OBJECT, PERSON, SPRITES, SpriteWithDirections } from "../../Modules/ThemeStorage";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { debug } from "console";


interface QuotidianProps {
    itemsRef: MutableRefObject<RenderedItem[]>;
    canvasRef: RefObject<HTMLCanvasElement>;
    themeKeys: string[];
    seededRandom: SeededRandom;
    numberDoors:number;
    trappedInCoffin?: boolean;
    wandaTakeMemoryRef: MutableRefObject<Function|undefined>;
  }

  export const Popup = styled.div`
    border: 2px solid black;
    z-index: 5;
    border-radius: 13px;
    padding: 5px;
    position: absolute;
    top: -50px;
    left: -100px;
    color: black;
    padding-left: 13px;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    padding-right: 13px;
    margin: 10px;
    background: #d1b056;
    box-shadow: 2px 2px 2px 3px rgba(0, 0, 0, .2);
`

const sprite_url_start = `Walkabout/Sprites/`;
const default_sprite = `humanoid_crow.gif`;
export const Quotidian:React.FC<QuotidianProps> = ({trappedInCoffin,wandaTakeMemoryRef,itemsRef,themeKeys,canvasRef,seededRandom,numberDoors}) => {
    
    const playerWidth = 50;
    const playerHeight = 50;

    enum DIRECTIONS {
        w = "w",
        a ="a",
        s="s",
        d="d"
    }

    interface PlayerProps {
        leftSpawn: number;
        topSpawn: number;
    }
    interface QuotidianProps {
        undead: boolean;
    }

    const Quotidian = styled.img`
        position: absolute;
        left:0px;
        top: 0px;
        pointer-events:none;
        z-index: 10;
        opacity: ${(props: QuotidianProps) => props.undead?"10%":"100%" };
    `

    const NameTag = styled.div`
        position: absolute;
        left:-0px;
        top: -25px;
        font-weight: boldest;
        pointer-events:none;
    `

    const Container = styled.div`
        position: absolute;
        left: ${(props: PlayerProps) => props.leftSpawn}px;
        top: ${(props: PlayerProps) => props.topSpawn}px;
    `

    const [spawnPoint, setSpawnPoint] = useState({left:seededRandom.getRandomNumberBetween(0,300),top:seededRandom.getRandomNumberBetween(200,400)});
    const [flavorText, setFlavorText] = useState<string|undefined>();
    const [birbLocation, setBirbLocation] = useState(spawnPoint);
    const [undead, setUndead] = useState(false);

    const [image_src, set_image_src] = useState(sprite_url_start+default_sprite);//they aren't expecting you so they are still birbs when you come in

    const currentHeading = useRef<DIRECTIONS>(DIRECTIONS.w);
    const name = useRef<string>();
    const spriteSet = useRef<SpriteWithDirections>();

    const goalObjectIndex = useRef<number>();
    const speedRef = useRef<number>(new SeededRandom(stringtoseed(themeKeys.join(","))).getRandomNumberBetween(1,30));
    const despawnedRef = useRef(false);

    

    useEffect(()=>{
        const first_names = ["Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Tom","Eve","Jepe","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
        const last_names = ["Researcher","Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Peyote",,"Rilvia","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
        //if you have the same themes you have the same name deal with it, its intentional, recurring cast
        const rand = new SeededRandom(stringtoseed(themeKeys.join(",")));
        const tmp =`${ rand.pickFrom(first_names) } ${rand.pickFrom(last_names) } `;
        name.current = tmp;
    }, [name,themeKeys])

    useEffect(()=>{
        setBirbLocation({top:spawnPoint.top, left:spawnPoint.left})
    }, [spawnPoint])

    const defaultBirb = ()=>{
        spriteSet.current = {left_src: loadSecretImage(sprite_url_start+ default_sprite), right_src: loadSecretImage(sprite_url_start+ default_sprite), up_src: loadSecretImage(sprite_url_start+ default_sprite), down_src: loadSecretImage(sprite_url_start+ default_sprite)};
        set_image_src(spriteSet.current.left_src);
    }

    useEffect(()=>{
        const rand = new SeededRandom(stringtoseed(themeKeys.join(",")));
        const theme = all_themes[rand.pickFrom(themeKeys)];
        const tmp:SpriteWithDirections = theme.pickPossibilityFor(rand,SPRITES);
        if(tmp && !(tmp as any).includes){//if its a string its an error
            spriteSet.current = {left_src: loadSecretImage(sprite_url_start+ tmp.left_src),right_src: loadSecretImage(sprite_url_start+ tmp.right_src),up_src: loadSecretImage(sprite_url_start+ tmp.up_src),down_src: loadSecretImage(sprite_url_start+ tmp.down_src)};
        }else{
            defaultBirb();
        }
    }, [themeKeys])

    useEffect(()=>{
        if(flavorText){
            const timer = setTimeout(()=>{
               setFlavorText(undefined);
            }, 3000)
        
            return () => {
              clearTimeout(timer);
            };
        }

    },[flavorText])

    const findMeInItemRef = ()=>{
        if(name.current && itemsRef.current){
            return itemsRef.current.find((item)=> item.name === name.current);
        }
        return undefined;

    }

    useEffect(()=>{
        //two cases: one, i am not currently in the itemsref and i should be
        //or two, i am in the items ref and i need to tell it my current location.
        const me = findMeInItemRef();
        if(me){
            //JR NOTE: TOdo
            let tmp = itemsRef.current;
            tmp  = removeItemOnce(tmp,me);
            tmp.push({src:"gif_do_not_render",layer: -1,x: birbLocation.left, y: birbLocation.top,width: playerWidth, height: playerHeight,flavorText: me.flavorText,themeKeys: themeKeys,name:name.current })
            itemsRef.current = tmp;
        }else if(name.current){
            const possibleFlavorText = [`${name.current} is just a fucked up lil scrimblo.`,`You pat ${name.current}'s head and they preen a bit.`,`${name.current} is staring at you intensely.`,`${name.current} caws softly to themself as they stare at everything.`];
            const tmp = [...itemsRef.current, {src:"gif_do_not_render",layer: -1,x: birbLocation.left, y: birbLocation.top,width: playerWidth, height: playerHeight,flavorText: seededRandom.pickFrom(possibleFlavorText),themeKeys: themeKeys,name:name.current }]
            itemsRef.current = tmp;
        }

    },[birbLocation,name])
    
    const isMemoryKnowByWanderer = (memory: string)=>{
        return isStringInArrayWithKey(MEMORY_KEY,memory);
    }

    const isMemorySacrificedByWanderer = (memory: string)=>{
        return isStringInArrayWithKey(QUOTIDIAN_KEY,memory);
    }

    const takeMemoryFromWanderer = (memory:string)=>{
        if(wandaTakeMemoryRef.current){
            wandaTakeMemoryRef.current(memory);
        }
    }

    const getOpinionOnItemWithThemes= (judgedKeys:string[])=>{
        const themes = themeKeys.map((theme) => all_themes[theme])
        const judgedThemes = judgedKeys.map((theme) => all_themes[theme]);
        return aggregateOpinionsOnThemes(themes, judgedThemes);
    }

    const getPositiveFlavorText=(themeKeys: string[], opinion: number, objectName: string|undefined)=>{
        const theme = all_themes[seededRandom.pickFrom(themeKeys)];
        const adj = `${theme.pickPossibilityFor(seededRandom,ADJ)}`;
        const location = `${theme.pickPossibilityFor(seededRandom,LOCATION)}`;
        const person = `${theme.pickPossibilityFor(seededRandom,PERSON)}`;
        const dynamic_intensifier = theme.pickPossibilityFor(seededRandom, COMPLIMENT);

        let opionion_intensifier = "";
        let punctuation = "?";
        let thing = "thing";
        if(objectName){
            thing = objectName;
        }

        if(Math.abs(opinion)  > 200){
            punctuation = "!!!";
            opionion_intensifier = seededRandom.pickFrom(["BEST", "MY","LOVE"])
        }else if (Math.abs(opinion)  >100 ){
            punctuation = "!"
            opionion_intensifier = seededRandom.pickFrom(["great", "interesting","wonderful","marvelous","good",dynamic_intensifier])
        }else if (Math.abs(opinion)  >50 ){
            punctuation = "."
            opionion_intensifier = seededRandom.pickFrom(["the"])
        }

        const options = [`${opionion_intensifier} ${adj} ${thing} ${punctuation}`, `Bring ${opionion_intensifier} ${adj} ${thing} to ${person}${punctuation}`,`Get ${opionion_intensifier} ${adj} ${thing} for ${person}${punctuation}`,`Bring ${opionion_intensifier} ${adj} ${thing} to ${location}${punctuation}`];
        return seededRandom.pickFrom(options);
    }

    const getNegativeFlavorText=(themeKeys: string[], opinion: number, objectName: string|undefined)=>{
        const theme = all_themes[seededRandom.pickFrom(themeKeys)];
        const adj = `${theme.pickPossibilityFor(seededRandom,ADJ)}`;
        const location = `${theme.pickPossibilityFor(seededRandom,LOCATION)}`;
        const person = `${theme.pickPossibilityFor(seededRandom,PERSON)}`;
        const dynamic_intensifier = theme.pickPossibilityFor(seededRandom, INSULT);
        let thing = "thing";
        if(objectName){
            thing = objectName;
        }


        let opionion_intensifier = "";
        let punctuation = ".";

        if(Math.abs(opinion) > 200){
            punctuation = "!!!";
            opionion_intensifier = seededRandom.pickFrom(["WORST", "GROSS","HATED"])
        }else if (Math.abs(opinion)  >100 ){
            punctuation = "!"
            opionion_intensifier = seededRandom.pickFrom(["bad","icky","gross",dynamic_intensifier])
        }else if (Math.abs(opinion)  >50 ){
            punctuation = "?"
            opionion_intensifier = seededRandom.pickFrom(["weird","boring","lame"])
        }

        const options = [`${opionion_intensifier} ${adj} ${thing}${punctuation}`, `Bring ${opionion_intensifier} ${adj} ${thing} to ${person}${punctuation}`,`Get ${opionion_intensifier} ${adj} ${thing} for ${person}${punctuation}`,`Bring ${opionion_intensifier} ${adj} ${thing} to ${location}${punctuation}`];
        return seededRandom.pickFrom(options);
    }

    const getFlavorText =(themeKeys: string[], opinion: number, objectName: string|undefined)=>{
        if(trappedInCoffin){
            return "Processing data for Creator. Please hold!";
        }
        if( opinion>0){
            return getPositiveFlavorText(themeKeys, opinion,objectName) + opinion;
        }else{
            return getNegativeFlavorText(themeKeys, opinion,objectName) + opinion;
        }
    }

    const crowify = (text:string)=>{
        const num = seededRandom.nextDouble();
        if(num > 0.6){
            return text;
        }else if (num > 0.3){
            return `caw! ${text}`;
        }else{
            return `${text} caw!`;
        }
    }

    const eatItem = (item: RenderedItem)=>{
        let tmp = itemsRef.current;
        tmp  = removeItemOnce(tmp,item);
        itemsRef.current = tmp;
        if(canvasRef.current && itemsRef.current){
            chomp();
            redrawForeground(canvasRef.current,tmp);
        }
    }
    
    //unlike doors, items are not in set locations, check the items ref
    const checkForItems =(top: number, left: number)=>{
        const wanderer_radius = 25;
        for(let item of itemsRef.current){
            if((item.layer ===1 || item.layer === -1) &&item.name !== name.current && pointWithinBoundingBox(left,top,item.x,item.y,item.width,item.height)){
                eatItem(item);
                if(item.layer === 1){//don't make hte wanderer forget themselves plz, or you for that matter
                    takeMemoryFromWanderer(item.flavorText);
                }
                setFlavorText(crowify(getFlavorText(item.themeKeys,getOpinionOnItemWithThemes(item.themeKeys),item.name)));
                goalObjectIndex.current = undefined;
                return;
            }
        }
    }

    //where is the player? are they near a door?
    const checkForDoor =(top: number, left: number)=>{
        //TODO check how many doors actually exist
        const SOUTH = [250,475,48,48];
        const NORTH = [250,105,48,91]; //x,y,width,height
        const EAST = [475,250,48,48];

        const wanderer_radius = 25;
        let nearDoor = false;

        //there will ALWAYS be a door to the south at the very minimum
        if( pointWithinBoundingBox(left,top,SOUTH[0],SOUTH[1],SOUTH[2],SOUTH[3])){
            nearDoor = true;
        }

        if(numberDoors > 1 && pointWithinBoundingBox(left,top,NORTH[0],NORTH[1],NORTH[2],NORTH[3])){
            nearDoor = true;
        }

        if(numberDoors > 2 && pointWithinBoundingBox(left,top,EAST[0],EAST[1],EAST[2],EAST[3])){
            nearDoor = true;
        }


        //if they weren't already a birb they sure as hell are now
        if(nearDoor){
            defaultBirb();
            doorEffect();
            despawnedRef.current = true;
        }

    }

    const walkTowardsObject= ()=>{
        if(!itemsRef.current || !goalObjectIndex.current){
            return;
        }
        const object = itemsRef.current[goalObjectIndex.current];
        if(!object){
            goalObjectIndex.current = undefined;
            return;
        }
        if(seededRandom.nextDouble()>0.5){
            //if object x is bigger than mine, need to go right, so d
            if(object.x>birbLocation.left){
                currentHeading.current = DIRECTIONS.d;
                processWalk(currentHeading.current);  
            }else{
                currentHeading.current = DIRECTIONS.a;
                processWalk(currentHeading.current);  
            }
        }else{
            //if object y is bigger than mine, need to go down, so s
            if(object.y>birbLocation.top){
                currentHeading.current = DIRECTIONS.s;
                processWalk(currentHeading.current);  
            }else{
                currentHeading.current = DIRECTIONS.w;
                processWalk(currentHeading.current);  
            }
        }
    }

    const debugTick = ()=>{
        processWalk("a");
    }

    const tick = ()=>{
        if(despawnedRef.current === true){
            return;
        }
        if(!goalObjectIndex.current){
            if(Math.random()>0.75){
                const newdir = pickFrom(["w","a","s","d"]);
                currentHeading.current = newdir;
                processWalk(newdir);
                //TODO have a radius i can look in, maybe?
                goalObjectIndex.current = itemsRef.current.indexOf(pickFrom(itemsRef.current));
            }else{
                processWalk(currentHeading.current);  
            }
        }else{
            if(!findMeInItemRef()){//you agree to pretend to be dead.
                setUndead(true);
                return;
            }
            walkTowardsObject();
        }
    }

    useEffect(()=>{
            const timer = setTimeout(()=>{
                tick();
                //debugTick();
            }, 300)
        
            return () => {
              clearTimeout(timer);
            };

    },[birbLocation])

    
    const setImageWithDirection = (direction: string)=>{
        if(spriteSet.current){
            if(direction === "w"){
                set_image_src(spriteSet.current.up_src);
            }else if (direction === "a"){
                set_image_src(spriteSet.current.left_src);
            }else if (direction === "s"){
                set_image_src(spriteSet.current.down_src);
            }else if (direction === "d"){
                set_image_src(spriteSet.current.right_src);
            }
        }
        
    }
 

    const processWalk =(key:string)=>{
        setImageWithDirection(key);
        const minTop = 500-350-50;
        const maxTop = 500-55;
        const maxLeft = 455;
        const minLeft =15;
        if(birbLocation){
            let prevTop = birbLocation.top;

            let prevLeft = birbLocation.left;

            if((key === "s" || key === "ArrowDown")&& prevTop < maxTop){
                prevTop += speedRef.current;
            }
            if((key === "w" || key === "ArrowUp")&& prevTop > minTop){

                prevTop += -speedRef.current
            }
            if((key === "a" || key === "ArrowLeft") && prevLeft > minLeft){

                prevLeft += -speedRef.current;
            }
            if((key === "d" || key === "ArrowRight")&& prevLeft < maxLeft ){

                prevLeft += speedRef.current;
            }
            if(prevTop === birbLocation.top && prevLeft === birbLocation.left){
                goalObjectIndex.current = undefined;
            }
            setBirbLocation({top: prevTop, left: prevLeft});
            const centerX = prevLeft +playerWidth/2;
            const centerY = prevTop +playerHeight/2;

            checkForDoor(centerY, centerX);
            checkForItems(centerY, centerX);
        }
    }

      if(despawnedRef.current === true){
          return null;
      }

      const ponderFlavorText = (text: string)=>{
        if(isMemoryKnowByWanderer(text)){
            return `Tasty!!! ${text}.`;
        }
        return text;
    }
    return(
        <Container leftSpawn={birbLocation.left} topSpawn={birbLocation.top}>
            {flavorText ?<Popup>{ponderFlavorText(flavorText)}</Popup>:null}
            <NameTag>{name.current}</NameTag>
            <Quotidian src={image_src} undead={undead}/>    
        </Container>
 )

}

