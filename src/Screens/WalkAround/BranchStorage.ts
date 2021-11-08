import { getRandomNumberBetween, pickFrom } from "../../Utils/NonSeededRandUtils";
import { One } from "../Attic/LieJR";
import { PlayerResponse } from "../Attic/PlayerResponse";
import { CustomerServiceRamble } from "./CustomerServiceRamble";
import { CustomerSupportSpecialist } from "./CustomerSupportSpecialist";

export const CURRENT_NAME = "CURRENT_NAME";
export const CURRENT_TITLE = "CURRENT_TITLE";
export const NEXT_TITLE = "NEXT_TITLE";
export const NEXT_EXTENSION = "NEXT_EXTENSION";
export const CURRENT_EXTENSION = "CURRENT_EXTENSION";

//NORTH/EAST/NORTH/NORTH/NORTH/NORTH/NORTH/SOUTH/NORTH/EAST/EAST/SOUTH/
export const Debug = ()=>{
    const initialRamble = "Initial Ramble";
    const ramble = new CustomerServiceRamble(initialRamble, []);

    const Branch2 = ()=>{
        //TODO: parse \n as a new chat bubble and take time between each bubble
        const defaultRamble = "Response 2 Part 1\nResponse2  Part 2\nResponse2  Part 3";
        const ramble =  new CustomerServiceRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("Response 2 Option 1", ()=>{console.log("JR NOTE DONE")}));
        return ramble;
    }

    const Branch = ()=>{
        //TODO: parse \n as a new chat bubble and take time between each bubble
        const defaultRamble = "Response 1 Part 1\nResponse1  Part 2\nResponse1  Part 3";
        const ramble =  new CustomerServiceRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("Response 1 Option 1", Branch2));
        return ramble;
    }

    ramble.potential_reponses.push(new PlayerResponse("Initial Option 1", Branch));
    ramble.potential_reponses.push(new PlayerResponse("Initial Option 2", Branch));
    ramble.potential_reponses.push(new PlayerResponse("Initial Option 3", Branch));
    ramble.potential_reponses.push(new PlayerResponse("Initial Option 4", Branch));
    

    return ramble;
}

export const Lost = ()=>{
    const initialRamble = "I'm sorry; I am unable to complete your call as dialed. Please check the number and dial again, or call your operator at exension 0 to help you.";
    const ramble = new CustomerServiceRamble(initialRamble, []);
    return ramble;
}

export const GenericSupport = (frustration_level: number)=>{
    console.log("JR NOTE: frustration level is", frustration_level)
    const greeting_part = ["help you","impress you","wow you","turn your frown upside down","assist you","show you the meaning of zampanio","guide you","resolve your issue","teach you","have worth in your eyes","show you the light of the world","enrich you","empower you"];
    const spiels = ["At Eyedol Games we make games a reality!","Eyedol Games, makers of the hit game ZampanioQuest!","Eyedol is thrilled to have you as a customer!","Thank you for contacting Eyedol Games, where all your wishes come true!","At Eyedol Games, seeing is believing!","At Eyedol games, there's always more to see!"];
    const shit_eating_greetings = [`How can I ${pickFrom(greeting_part)} today?`,`How may I ${pickFrom(greeting_part)} today?`,`How shall I ${pickFrom(greeting_part)} today?`];
    const defaultRamble = `Hello, my name is ${CURRENT_NAME} and I am a ${CURRENT_TITLE}. ${pickFrom(spiels)} ${pickFrom(shit_eating_greetings)}`;

    const ramble = new CustomerServiceRamble(defaultRamble, []);

    //ten levels of frustration give you options.
    const responses = [
        ["I would like to report a bug with Zampanio.","I would like to request a Limited Edition Zampanio Community Edition Guide.","I would like to claim my free gift.","I would like to speak with an Operator."],
        ["I'm trying to report a bug.","I am trying to track down a Guide.","I just want that free gift.","Can I talk to an actual human?"],
        ["I was trying to report that your game is buggy but I think your help desk is too.","Can ANYONE tell me how to play Zampanio?","I think you all might be glitchy chat bots."],
        ["This is so pointless.","No wonder the game doesn't work.","Operator. Human. Get Help. Escalate. Are any of these working?"],
        ["Do you have any idea how long I've been waiting?","Just send in the next person.","How long is this going to last."],
        ["Why am I even still bothering?","I'm pretty sure you're a bot."],
        ["Operator."],
        ["Look, I've been here for forever. Just get me a HUMAN."],
        ["..."],
        ["Fuck you."]
    ]
    let choice = responses[9]

    if(frustration_level < 10){
        choice = responses[frustration_level];
    }else{
        choice = ["I am fucking INCANDESCENT WITH RAGE. I have ascended to a higher plane of rage and if you asked me how angry I was on a scale of 1 to 10 I would be a fucking 1636306336265 and I don't expect anyone to even SEE this complaint but it makes me feel better. By god: FUCK YOU."];
    }


    const Branch1 = ()=>{
        const hook = ["Understood!","I'm sorry you're experiencing this...","I'm going to start looking up ways to resolve your issue now!","Thank you for taking the time to explain that to me!","I hear what you're saying...","Can do!","I can definitely help you do that!","No problem!","Sure thing!","You betcha!","Absolutely!","It would be my pleasure!"];
        const waiting = ["Please hold!\nThank you for waiting!","One second...\nDon't worry, I'm still checking...\nThank you for waiting!","One moment...","Checking...","Just one second!"];
        const transfer = [`I wish I could help you with this, but we'll need a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION} to move forwards.`,`Although I'd love to help you with this, it looks like we'll need a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION}.`,`My apologies, but it seems you'll need a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION} to resolve your issue.`,`I'm so sorry, but it looks like I don't have sufficient permissions to help you with this. I'm going to escalate this to a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION}.`,`Sorry about this, but its my break. I'm going to transfer you to extension ${NEXT_EXTENSION}.`,`Ah, it looks you're mistakenly on our BAN list. Don't worry, we can clear this up with a ${NEXT_TITLE}.\n I'm transfering you to one at extension ${NEXT_EXTENSION}.`,`It looks like I can't find your CUSTOMER SERVICE ACCOUNT anywhere. Not to worry though, a ${NEXT_TITLE} will be able to help you set one up. \n I'm going to transfer you to one at extension ${NEXT_EXTENSION}.`,`Oh no! It looks like I can't find your CUSTOMER SERVICE ACCOUNT!\n Don't worry thought, I will just transfer you to a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION}.\n They will definitely be able to help you!`,`I will need to transfer you to a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION}.`,"I will need to transfer you to a <INSERT TITLE HERE>, at extension <INSERT EXTENSION HERE>."];
        const disconnect = ["I will be transferring you shortly. Thank you for your patience!","It may take a while to transfer...\n If you get disconnected, you can dial their extension directly.","I've heard reports our transfer process is down, you may need to dial their extension directly.","It seems our transfer program is having some issues. You will need to dial their extension directly.","I'm transfering you now!"];

        const defaultRamble = `${pickFrom(hook)} ${pickFrom(waiting)} \n ${pickFrom(transfer)} ${pickFrom(disconnect)}`;
        const ramble =  new CustomerServiceRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("No actually talk to me.", Lost));
        return ramble;
    }



    for(let i = 0; i<choice.length; i++){
        ramble.potential_reponses.push(new PlayerResponse(choice[i], Branch1));

    }

    return ramble;
}


export const HelloWorld = ()=>{
    const defaultRamble = `Hi there! My name is ${CURRENT_NAME}. You can begin by asking your question below! Someone will be with you shortly. Due to call volume, restricted text only mode has been initiated. Thank you for your patience!`;

    const ramble = new CustomerServiceRamble(defaultRamble, []);

    const Branch2 = ()=>{
        const defaultRamble = "I'm afraid I can't do that, Dave.";
        const ramble =  new CustomerServiceRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("No actually talk to me.", ()=>{console.log("JR NOTE: No")}));
        return ramble;
    }

    const Branch = ()=>{
        const defaultRamble = `I can definitely help you do that! Please hold!\n\nThank you for waiting! \nI will need to transfer you to a ${NEXT_TITLE}, at extension ${NEXT_EXTENSION}. It may take a while to transfer.. If we get disconnected, you can dial their extension directly.`;
        const ramble =  new CustomerServiceRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("No actually talk to me.", Branch2));
        return ramble;
    }

    ramble.potential_reponses.push(new PlayerResponse("I would like to report a bug with Zampanio.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to request a Limited Edition Zampanio Community Edition Guide.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to claim my free gift.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to speak with an Operator.", Branch));
    

    return ramble;
}

export const randomSpecialist = (frustration_level:number)=>{
    const first_names = ["Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
    const last_names = ["Researcher","Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
    const name =`${ pickFrom(first_names) } ${pickFrom(last_names) } `;
    return new CustomerSupportSpecialist(name, getRandomNumberBetween(2,999), GenericSupport(frustration_level));
}
export const initial_directory ={0: new CustomerSupportSpecialist("Support Bot",0,HelloWorld()), 411: new CustomerSupportSpecialist("Debug Bot",411,Debug()),1: new CustomerSupportSpecialist("Not Found",1,Lost())};
