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

export const GenericSupport = ()=>{
    const shit_eating_greetings = ["help you","impress you","wow you","turn your frown upside down","assist you","show you the meaning of zampanio","guide you","resolve your issue","teach you","have worth in your eyes","show you the light of the world","enrich","empower"];
    const defaultRamble = `Hello, my name is ${CURRENT_NAME} and I am a ${CURRENT_TITLE}. How can I ${pickFrom(shit_eating_greetings)} today?`;

    const ramble = new CustomerServiceRamble(defaultRamble, []);


    const Branch = ()=>{
        const defaultRamble = "I can definitely help you do that! Please hold!\n\nThank you for waiting! \nI will need to transfer you to a <INSERT TITLE HERE>, at extension <INSERT EXTENSION HERE>. It may take a while to transfer... If we get disconnected, you can dial their extension directly.";
        const ramble =  new CustomerServiceRamble(defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("No actually talk to me.", ()=>{}));
        return ramble;
    }

    ramble.potential_reponses.push(new PlayerResponse("I would like to report a bug with Zampanio.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to request a Limited Edition Zampanio Community Edition Guide.", Branch));
    return ramble;
}


export const HelloWorld = ()=>{
    const defaultRamble = `Hi there! My name is ${CURRENT_NAME}. You can begin by asking your question below! Someone will be with you shortly. Due to call volume, restriced text only mode has been initiated. Thank you for your patience!`;

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

export const randomSpecialist = ()=>{
    const first_names = ["Craig","John","Jude","Jade","Joey","Rose","Roxy","Jeff","Dave","Dirk","Jove","Jake","Sophie","Jaxon","Basira","Daisy","Martin","Georgie","Sasha","James","Taylor","Victoria","Jean-Paul","Bob","Alice","Carol","Eve","Adam","Rachel","Brian","Aisha","Alexandra","Alex","Tobias","Marco","Cassie","Tom","Lisa","Sarah"," Sylvester","Gordon","Helen","Jamie","Lillian","Mary","Ashton","Peter","Zawhei","Eirikr","Volour","Okarin","Peewee","Hagala","Despap","Othala","Gertrude","Mike","Michael","Peter","Simon","Manuela","Annabel"];
    const last_names = ["Researcher","Gently","Egbert","Claire","Lalonde","Strider","Hussain","King","Stoker","Sims","Blackwood","Barker","James","Blake","Dalon","Vasil","Hebert","Jensen","Lindt","Newell","Laborn","Fell","Wilbourn","Livsey","Lamb","Bacama","Kharun","Reynolds","Braggi","Seelee","Cassan","Folnir","Citato","Grigor","Crew","Robertson","Fairchild","Lukas","Richardson","Dominguez","Cane","Salesa","Shelly"];
    const name =`${ pickFrom(first_names) } ${pickFrom(last_names) } `;
    return new CustomerSupportSpecialist(name, getRandomNumberBetween(2,999), GenericSupport());
}
export const initial_directory ={0: new CustomerSupportSpecialist("Support Bot",0,HelloWorld()), 411: new CustomerSupportSpecialist("Debug Bot",411,Debug()),1: new CustomerSupportSpecialist("Not Found",1,Lost())};
