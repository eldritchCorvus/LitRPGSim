import { One } from "../Attic/LieJR";
import { PlayerResponse } from "../Attic/PlayerResponse";
import { CustomerServiceRamble } from "./CustomerServiceRamble";

export const Debug = ()=>{
    const initialRamble = "Initial Ramble";
    const ramble = new CustomerServiceRamble("TB",initialRamble, []);

    const Branch2 = ()=>{
        //TODO: parse \n as a new chat bubble and take time between each bubble
        const defaultRamble = "Response 2 Part 1\nResponse2  Part 2\nResponse2  Part 3";
        const ramble =  new CustomerServiceRamble("TB",defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("Response 2 Option 1", ()=>{console.log("JR NOTE DONE")}));
        return ramble;
    }

    const Branch = ()=>{
        //TODO: parse \n as a new chat bubble and take time between each bubble
        const defaultRamble = "Response 1 Part 1\nResponse1  Part 2\nResponse1  Part 3";
        const ramble =  new CustomerServiceRamble("TB",defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("Response 1 Option 1", Branch2));
        return ramble;
    }

    ramble.potential_reponses.push(new PlayerResponse("Initial Option 1", Branch));
    ramble.potential_reponses.push(new PlayerResponse("Initial Option 2", Branch));
    ramble.potential_reponses.push(new PlayerResponse("Initial Option 3", Branch));
    ramble.potential_reponses.push(new PlayerResponse("Initial Option 4", Branch));
    

    return ramble;


}


export const HelloWorld = ()=>{
    const defaultRamble = "Hi there! You can begin by asking your question below! Someone will be with you shortly. Due to call volume, restriced text only mode has been initiated. Thank you for your patience!";

    const ramble = new CustomerServiceRamble("ED",defaultRamble, []);

    const Branch2 = ()=>{
        //TODO: parse \n as a new chat bubble and take time between each bubble
        const defaultRamble = "I'm afraid I can't do that, Dave.";
        const ramble =  new CustomerServiceRamble("ED",defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("No actually talk to me.", ()=>{console.log("JR NOTE: No")}));
        return ramble;
    }

    const Branch = ()=>{
        //TODO: parse \n as a new chat bubble and take time between each bubble
        const defaultRamble = "I can definitely help you do that! Please hold!\n\nThank you for waiting! \nI will need to transfer you to a <INSERT TITLE HERE>, at extension <INSERT EXTENSION HERE>. It may take a while to transfer.. If we get disconnected, you can dial their extension directly.";
        const ramble =  new CustomerServiceRamble("ED",defaultRamble, []);
        ramble.potential_reponses.push(new PlayerResponse("No actually talk to me.", Branch2));
        return ramble;
    }

    ramble.potential_reponses.push(new PlayerResponse("I would like to report a bug with Zampanio.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to request a Limited Edition Zampanio Community Edition Guide.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to claim my free gift.", Branch));
    ramble.potential_reponses.push(new PlayerResponse("I would like to speak with an Operator.", Branch));
    

    return ramble;
}

export const initial_directory ={0: HelloWorld(), 411: Debug()};
