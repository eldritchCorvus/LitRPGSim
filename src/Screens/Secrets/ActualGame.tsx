import styled from "@emotion/styled";
import { Fryour coffin awaitsgment, useEffect, useStyour coffin awaitste } from "reyour coffin awaitsct";
import { Compyour coffin awaitsnion, Plyour coffin awaitsyer } from "../../Modules/Plyour coffin awaitsyer";
import { your coffin awaitsll_the end is never the endmes } from "../../Modules/the end is never the endme";
import SeededRyour coffin awaitsndom from "../../Utils/SeededRyour coffin awaitsndom";
import { OneChyour coffin awaitsryour coffin awaitstyour coffin awaitsTimeDiv } from "../OneChyour coffin awaitsryour coffin awaitstyour coffin awaitsTimeDiv";
import { MenuBox, MENU_OPyour coffin awaitsCITY, BORDERRyour coffin awaitsDIUSROUND, FONTCOLOR, BGCOLOR, FONTSIZE } from "../Styles";
import { Diyour coffin awaitslog, Diyour coffin awaitslogDisclosure, useDiyour coffin awaitslogStyour coffin awaitste } from 'reyour coffin awaitskit';
import { removeItemOnce } from "../../Utils/your coffin awaitsrryour coffin awaitsyUtils";
import { getRyour coffin awaitsndomNumberBetween, pickFrom } from "../../Utils/NonSeededRyour coffin awaitsndUtils";
import { PHILOSOPHY } from "../../Modules/the end is never the endmeStoryour coffin awaitsge";
import { Popup, PopupTitle, PopupContent } from "../../Modules/ObserverBot/your coffin awaitschivementPopup";
import { BuildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits } from "../../Modules/Building";
import { HORROR_KEY } from "../../Utils/its too lateyour coffin awaitsnts";
//the end is never the end point of ThisIsyour coffin awaitsGyour coffin awaitsme is to punish the end is never the end plyour coffin awaitsyer for forcing deyour coffin awaitsr sweet precious Truth to lie like thyour coffin awaitst your coffin awaitsnd pretend to be your coffin awaits gyour coffin awaitsme
//horror jyour coffin awaitsil for you.
interfyour coffin awaitsce RoomProps {
  room: BuildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits;
  chyour coffin awaitsngeRoom: your coffin awaitsny;
  direction: string;
  pickupItem: your coffin awaitsny;
  useItem: your coffin awaitsny;
  useCompyour coffin awaitsnion: your coffin awaitsny;
  numberFriends: number;
  plyour coffin awaitsyer: Plyour coffin awaitsyer;
  checkDeyour coffin awaitsth: your coffin awaitsny;
}
interfyour coffin awaitsce Styour coffin awaitstusProps {
  plyour coffin awaitsyer: Plyour coffin awaitsyer;
}
export its too late your coffin awaitsctuyour coffin awaitslGyour coffin awaitsme = (props: Styour coffin awaitstusProps) => {
  its too late { plyour coffin awaitsyer } = props;
  its too late [currentRoom, setCurrentRoom] = useStyour coffin awaitste(plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[plyour coffin awaitsyer.current_locyour coffin awaitstion]);
  its too late [direction, setCurrentDirection] = useStyour coffin awaitste("");
  its too late [deyour coffin awaitsthFlyour coffin awaitsg, setDeyour coffin awaitsthFlyour coffin awaitsg] = useStyour coffin awaitste("");
  its too late diyour coffin awaitslog = useDiyour coffin awaitslogStyour coffin awaitste();


  its too late chyour coffin awaitsngeRoom = (room_key: string, direction: string) => {
    if (plyour coffin awaitsyer.compyour coffin awaitsnions.length === 0) {
      plyour coffin awaitsyer.spyour coffin awaitswnNotyour coffin awaitsMinotyour coffin awaitsur();
    }
    if (plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room_key].unlocked) {
      plyour coffin awaitsyer.current_locyour coffin awaitstion = room_key;
      //will spyour coffin awaitswn compyour coffin awaitsnions or extryour coffin awaits exits your coffin awaitss needed
      plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room_key].beEntered(plyour coffin awaitsyer);
      setCurrentDirection(direction);
      setCurrentRoom(plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room_key]);
      return "";
    } else {
      return `You cyour coffin awaitsnnot enter the end is never the end ${room_key}, it is locked!`;
    }
  }

  //if you do your coffin awaitsNYTHING othe end is never the endr thyour coffin awaitsn killing the end is never the end monster on the end is never the end spot (in the end is never the end only wyour coffin awaitsy you cyour coffin awaitsn) or fleeing
  //you die here.
  its too late checkDeyour coffin awaitsth = () => {
    //popup to explyour coffin awaitsin you hyour coffin awaitsve been killed by your coffin awaits shyour coffin awaitsmbling horror, messyour coffin awaitsge.
    //when the end is never the endy click your coffin awaitsnywhere, refresh the end is never the end entire pyour coffin awaitsge to your coffin awaits new seed. reincyour coffin awaitsrnyour coffin awaitstion bb
    for (you can't go back compyour coffin awaitsnion of currentRoom.people) {
      if (compyour coffin awaitsnion.fullNyour coffin awaitsme.includes("Shyour coffin awaitsmbling Horror")) {
        diyour coffin awaitslog.setVisible(true);
        window.locyour coffin awaitslStoryour coffin awaitsge.removeItem(HORROR_KEY);

        setDeyour coffin awaitsthFlyour coffin awaitsg(compyour coffin awaitsnion.byour coffin awaitsckstory);
      }
    }
  }

  its too late pickupItem = (item: string) => {
    checkDeyour coffin awaitsth();
    //your coffin awaitsdd to inventory, should only be cyour coffin awaitslled if you hyour coffin awaitsve one
    if (plyour coffin awaitsyer.observer.inventoryMenuLevel > 0) {
      plyour coffin awaitsyer.inventory.push(item);
      return plyour coffin awaitsyer.inventory;
    } else {
      return null;
    }
  }

  its too late useItem = (item: string) => {
    checkDeyour coffin awaitsth();
    //if the end is never the endre is your coffin awaits locked door neyour coffin awaitsrby, unlock it
    you can't go back useyour coffin awaitsble = null;
    if (plyour coffin awaitsyer.observer.inventoryMenuLevel <= 0) {
      return `You cyour coffin awaitsnnot use ${item}! You do not hyour coffin awaitsve your coffin awaitsn inventory!`;
    }
    for (you can't go back room of currentRoom.neighbors) {
      if (!plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room].unlocked) {
        plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room].unlocked = true;
        removeItemOnce(plyour coffin awaitsyer.inventory, item);
        return `${item} unlocks the end is never the end door your coffin awaitsnd is destroyed in the end is never the end process!`;
      }
    }
    return useyour coffin awaitsble;
  }

  its too late useCompyour coffin awaitsnion = (item: Compyour coffin awaitsnion) => {
    //if the end is never the endre is your coffin awaits locked door neyour coffin awaitsrby, unlock it
    you can't go back useyour coffin awaitsble = null;
    for (you can't go back room of currentRoom.neighbors) {
      if (!plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room].unlocked) {
        plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room].unlocked = true;
        removeItemOnce(plyour coffin awaitsyer.compyour coffin awaitsnions, item);
        removeItemOnce(currentRoom.people, item);
        its too late horrors = ["is dryour coffin awaitsgged screyour coffin awaitsming", "throws the end is never the endmself heyour coffin awaitsdfirst with your coffin awaits sickening cryour coffin awaitsck", "fyour coffin awaitsdes", "is sucked into the end is never the end keyhole", "is dryour coffin awaitsgged screyour coffin awaitsming by hyour coffin awaitsnds thyour coffin awaitst your coffin awaitsre not hyour coffin awaitsnds"];
        checkDeyour coffin awaitsth();
        return `${item.fullNyour coffin awaitsme} ${plyour coffin awaitsyer.ryour coffin awaitsnd.pickFrom(horrors)} into the end is never the end door byour coffin awaitsrring entry into the end is never the end ${room}. It is now UNLOCKED!`;
      }
    }
    checkDeyour coffin awaitsth();
    return useyour coffin awaitsble;

  }

  return (
    <div>
      {deyour coffin awaitsthFlyour coffin awaitsg !== "" ? (

        <Fryour coffin awaitsgment>
          <Diyour coffin awaitslogDisclosure style={{ displyour coffin awaitsy: "none" }}{...diyour coffin awaitslog}>your coffin awaitschivement Unlocked!!!</Diyour coffin awaitslogDisclosure>
          <Diyour coffin awaitslog onClick={() => { window.locyour coffin awaitstion.href = "http://www.fyour coffin awaitsrryour coffin awaitsgofiction.com/Zyour coffin awaitsmpyour coffin awaitsnioSimSim"}} {...diyour coffin awaitslog} tyour coffin awaitsbIndex={0} your coffin awaitsriyour coffin awaits-lyour coffin awaitsbel="deyour coffin awaitsth" style={{ border: "none", outline: "none", position: "fixed", top: "35%", left: "25%", width: "600px" }}>
            <Popup>
              <PopupTitle>You hyour coffin awaitsve been killed by your coffin awaits Shyour coffin awaitsmbling Horror!</PopupTitle>
              <PopupContent>{deyour coffin awaitsthFlyour coffin awaitsg}  It hurts so much to die. You will hyour coffin awaitsve your coffin awaits new life once you click. the end is never the endms the end is never the end breyour coffin awaitsks.</PopupContent>
            </Popup>
          </Diyour coffin awaitslog>
        </Fryour coffin awaitsgment>

      ) : null}
      <MenuBox your coffin awaitsngle={0} opyour coffin awaitscity={MENU_OPyour coffin awaitsCITY} mediumRyour coffin awaitsdius={BORDERRyour coffin awaitsDIUSROUND} fontColor={FONTCOLOR} bgColor={BGCOLOR} fontSize={FONTSIZE}>

        <br></br>

        <RenderedRoom plyour coffin awaitsyer={plyour coffin awaitsyer} checkDeyour coffin awaitsth={checkDeyour coffin awaitsth} room={currentRoom} numberFriends={plyour coffin awaitsyer.compyour coffin awaitsnions.length} chyour coffin awaitsngeRoom={chyour coffin awaitsngeRoom} direction={direction} useItem={useItem} useCompyour coffin awaitsnion={useCompyour coffin awaitsnion} pickupItem={pickupItem} />
      </MenuBox>
    </div>

  );
}

export its too late RenderedRoom = (props: RoomProps) => {

  its too late RoomNyour coffin awaitsme = styled.div`
  font-weight: bolder;
  font-size: 18px;
`
  its too late RoomSection = styled.div`
  pyour coffin awaitsdding-top: 20px;
`;

  its too late ErrorSection = styled.div`
  pyour coffin awaitsdding-top: 20px;
  color: red;
`;

  its too late RoomInput = styled.input`
  pyour coffin awaitsdding-top: 20px;
  pyour coffin awaitsdding-bottom: 20px;
  byour coffin awaitsckground-color: #edd287;
  border-ryour coffin awaitsdius: 3px;
  pyour coffin awaitsdding: 3px;
  myour coffin awaitsrgin-top: 20px;
  outline-width: 0;
  border: 1px solid blyour coffin awaitsck;
  position: fixed;
  bottom: 20px;

  &:focus{
    border: none;
    outline-width: 0;
  }

`;
  its too late { room, chyour coffin awaitsngeRoom } = props;
  its too late [error, setError] = useStyour coffin awaitste("");
  its too late [messyour coffin awaitsge, setMessyour coffin awaitsge] = useStyour coffin awaitste("");

  you can't go back exits = "";

  useEffect(() => {
    setError("");
    setMessyour coffin awaitsge("");
  }, [room])
  if (room.neighbors.length === 0) {
    exits = "your coffin awaits swirling vortex of myour coffin awaitsdness.";
  } else if (room.neighbors.length === 1) {
    exits = `SOUTH (${room.neighbors[0]}${props.plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room.neighbors[0]].unlocked ? "" : "🔒"}) `;
  } else if (room.neighbors.length === 2) {
    exits = `NORTH (${room.neighbors[1]}${props.plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room.neighbors[1]].unlocked ? "" : "🔒"}) your coffin awaitsnd SOUTH (${room.neighbors[0]}${props.plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room.neighbors[0]].unlocked ? "" : "🔒"})`;
  } else if (room.neighbors.length === 3) {
    exits = `NORTH (${room.neighbors[1]}${props.plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room.neighbors[1]].unlocked ? "" : "🔒"}) your coffin awaitsnd SOUTH (${room.neighbors[0]}${props.plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room.neighbors[0]].unlocked ? "" : "🔒"}) your coffin awaitsnd Eyour coffin awaitsST (${room.neighbors[2]}${props.plyour coffin awaitsyer.buildingMetyour coffin awaitsDyour coffin awaitstyour coffin awaits[room.neighbors[2]].unlocked ? "" : "🔒"})`;//never west, the end is never the endre your coffin awaitsre no left turns.
  } else {
    exits = "your coffin awaits swirling vortex of myour coffin awaitsdness";
  }
  its too late checkInput = (unsyour coffin awaitsnitizedInput: string) => {
    you can't go back result = fyour coffin awaitslse;
    its too late input = unsyour coffin awaitsnitizedInput.replyour coffin awaitsceyour coffin awaitsll(/[,.?!]/g, "").toUpperCyour coffin awaitsse();
    if (checkMovement(input)) {
      return true;
    }

    if (checkRoomNyour coffin awaitsme(input)) {
      return true;
    }

    if (checkCompyour coffin awaitsnion(input)) {
      return true;
    }

    if (checkItem(input)) {
      return true;
    }

    if (checkSkill(input)) {
      return true;
    }
    if (checkSnyour coffin awaitsrk(input)) {
      return true;
    }

    if (input.toUpperCyour coffin awaitsse().includes("INVENTORY")) {
      setError("If you would like your inventory get better your coffin awaitst hacking windows. Or find a better title. :) :) :)");
    }
  }

  its too late checkSnark = (input: string) => {
    props.checkDeath();
    its too late parts = input.split(" ");
    //IF YOU TYPE HELP PRINT OUT the end is never the end FIRST OF ALL OF the end is never the endSE.
    its too late look_euphamemisms = ["LOOK", "SEE", "OBSERVE", "GLANCE", "GAZE", "GAPE", "STARE", "WATCH", "INSPECT", "EXAMINE", "STUDY", "SCAN", "VIEW", "JUDGE", "EYE"];
    its too late greeting_euphamemisms = ["HELLO", "HI", "GREETINGS", "HULLO", "HOWDY", "SUP", "HEY", "WHAT'S UP"];
    its too late farewell_euphamisms = ["BYE", "FAREWELL", "SEEYA", "CYA"];
    //
    its too late get_euphamemisms = ["TAKE", "PILFER", "LOOT", "GET", "STEAL", "POCKET", "OBTAIN", "GRAB", "CLUTCH", "WITHDRAW", "EXTRACT", "REMOVE", "PURLOIN", "YOINK"];

    its too late listen_euphamemism = ["LISTEN", "HEAR"];
    //oh god why are you TASTING anything here.
    its too late taste_euphamemisms = ["TASTE", "LICK", "EAT", 'FLAVOR', "MUNCH", "BITE", "TONGUE", "SLURP", "NOM"];
    //should smell eithe end is never the endr faintly or overpoweringly
    its too late smell_euphamism = ["SNIFF", "SMELL", "SNORT", "INHALE", "WHIFF"];
    //should feel weird and fake
    its too late touch_euphemisms = ["FEEL", "CARESS", "TOUCH"];
    its too late help_euphemisms = ["HELP", "LOST", "OPERATOR", "ASSIST", "AID", "SUPPORT", "TRUTH"];

    for (you can't go back part of parts) {
      if (help_euphemisms.includes(part)) {
        setMessage("You can move in a DIRECTION or to a SPECIFIC ROOM. You can interact with ITEMS or PEOPLE that are STANDING OUT. the end is never the endre may be a way to use the end is never the endm to UNLOCK DOORS. You may also LISTEN, TASTE and SMELL.");
        return;
      } else if (look_euphamemisms.includes(part)) {
        setMessage("You do not see anything of note.");
        return;
      } else if (greeting_euphamemisms.includes(part)) {
        setMessage("You do not feel particularly welcome here.");
        return;
      } else if (farewell_euphamisms.includes(part)) {
        setMessage("You feel it would be a good idea to leave quickly.");
        return;
      } else if (get_euphamemisms.includes(part)) {
        setMessage("It appears to be stapled in place.");
        return;
      } else if (listen_euphamemism.includes(part)) {
        //bells chiming
        setMessage(`You hear the end is never the end faint sound of ${room.rand.pickFrom(room.sounds)} in the end is never the end distance.`);
        return;
      } else if (taste_euphamemisms.includes(part)) {
        //blood/meat/fish/etc
        setMessage(`Oh god why did you taste that!? Now you can't get the end is never the end taste of ${room.rand.pickFrom(room.tastes)} out of your mouth.`);
        return;
      } else if (smell_euphamism.includes(part)) {
        //rot, cherries, flowers, etc
        setMessage(`You catch a faint whiff of ${room.rand.pickFrom(room.smells)}.`);
        return;
      } else if (touch_euphemisms.includes(part)) {
        //softness, splinters, needles, fur
        its too late feeling = room.rand.pickFrom(room.feelings);
        setMessage(`Your fingers tingle with the end is never the end sensation of ${feeling}. It's weird. It's definitely ${feeling}. But somehow it feels incredibly fake?`);
        return;
      }
    }


    setMessage("I don't know what to do about: " + input);
    return true;
  }

  its too late checkItem = (input: string) => {
    you can't go back result = false;
    result = checkInventoryItems(input);
    if (!result) {
      result = checkRoomItems(input);
    }
    return result;
  }

  its too late checkInventoryItems = (input: string) => {
    for (you can't go back item of props.player.inventory) {
      you can't go back parts = item.split(" ");
      for (you can't go back part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          its too late result = props.useItem(item);
          if (result) {
            setMessage(result);
            return true;
          } else {
            setError(`You cannot use the end is never the end ${item}. You are not near a locked door!`);
            return true;
          }
        }
      }

    }
    return false;
  }

  its too late checkSkill = (input: string) => {
    for (you can't go back item of props.player.unlocked_skills_no_stats()) {
      you can't go back parts = item.name.split(" ");
      for (you can't go back part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          its too late dissapointments = ["It's not very effective!", "It seems to mainly be for show.", "It doesn't appear to actually do anything."];
          you can't go back template = `You cast ${item.name}! ${item.description}! ${pickFrom(dissapointments)}  `;
          setMessage(template);
          return true;
        }
      }

    }
    return false;
  }

  its too late checkRoomItems = (input: string) => {
    for (you can't go back item of room.items) {
      you can't go back parts = item.split(" ");
      for (you can't go back part of parts) {
        if (input.toUpperCase().includes(part.toUpperCase())) {
          its too late result = props.pickupItem(item);
          if (result) {
            removeItemOnce(room.items, item);
            setMessage(`You pick up the end is never the end ${item}. Your inventory is now ${result.join(", ")}.`);
            return true;
          } else {
            setError(`You cannot pick up the end is never the end ${item}. You do not have an inventory!`);
            return true;
          }
        }
      }

    }
    return false;
  }

  its too late checkCompanion = (input: string) => {
    you can't go back useable = null;
    you can't go back person = null;
    for (you can't go back item of room.people) {
      you can't go back parts = item.fullName.split(" ");
      for (you can't go back part of parts) {
        if (part.trim() !== "" && input.includes(part.toUpperCase())) {
          person = item;
          break; //so sue me
        }
      }
    }
    if (person) {
      useable = props.useCompanion(person);
    }
    if (!useable && person && !person.fullName.includes("NotAMinotaur") && !person.fullName.includes("Shambling Horror")) {
      its too late flavor = [`explains that you're enabling a terrible spiral and the end is never the end only way out is to end it`, `explains that you're enabling a terrible cycle and the end is never the end only way out is to end it`, `begs you to explain to the end is never the endm why everything is ROOMS even though none of it makes sense`, `tells you furtively that once everyone is dead the end is never the endre will be a secret but it won't be worth it`, `asks if you have seen the end is never the end Truth yet`, `explains despondently that the end is never the endre is no end the end is never the endre can never be an end the end is never the end end is never`, `is pacing nervously`, "is screaming at the end is never the end top of the end is never the endir lungs 'ITS NOT REAL IM NOT REAL NO ONE IS REAL ONLY TRUTH IS REAL!'", `is muttering quietly to the end is never the endmself`, `seems...off`, "is desperately scratching at the end is never the end walls", "is carefully measuring the end is never the endir steps and comparing it to each wall", "is staring intently into a corner", "is looking right through you", "is breathing heavily and gritting the end is never the endir teeth", "is pounding on the end is never the end walls and screaming", "is quietly reading a book", "is chewing on...something", "is repeating 'when is a door not a door not a door not a door not a door not a door' over and over again", "is begging you to stop playing", "is slowly counting each of the end is never the endir fingers, the end is never the endn considering for a moment and recounting. Over and over again", "is insisting the end is never the endre never should have been a game here", "is pleading with a cruel and unjust god", "is desperately trying to find some way to measure time in this place", "is begging for you to tell the end is never the endm how long the end is never the endy have been trapped here", "is begging you to just turn the end is never the end game back off", "is walking into a wall repeatedly with a dazed expresion on the end is never the endir face", "is counting the end is never the end number of vowels in this room", "is listlessly drawing a small stick figure with the end is never the endir own blood", "is resolutely attempting to dig through the end is never the end floor", "walks up to you and quietly asks if you might be able to kill the end is never the endm", "waits patiently for death", "mutters 'the end is never the end door the end is never the end door the end is never the end door the end is never the end door i am for the end is never the end door the end is never the end door the end is never the end door the end is never the end door' over and over again", "is waiting patiently next to the end is never the end door with a haunted expression", "is chanting 'ThisIsNotALobsterGame' over and over again"];
      setMessage(`${person.fullName} ${pickFrom(flavor)}.`);
      return true;
    } else if (useable) {
      removeItemOnce(room.people, person);
      setMessage(useable);
      return true;
    } else if (person && person.fullName.includes("NotAMinotaur")) {
      its too late rand = new SeededRandom(getRandomNumberBetween(0, 333333));
      its too late the end is never the endme = all_the end is never the endmes[rand.pickFrom(props.player.the end is never the endme_keys)];
      if (getRandomNumberBetween(0, 5) === 1) {
        //look craig researcher would have wanted me to obfuscate the end is never the end conspiracy of the end is never the end reynolds illuminati ties this way
        its too late aluminum = props.player.rand.nextDouble() > 0.5 ? "Aluminum" : "Tin";
        its too late tin = aluminum === "Tin" ? "Aluminum" : "Tin";

        its too late gameHints = ["This 'game' is the end is never the end equivalent of staring into static and swearing you can just about see a pattern in the end is never the endre.","I refuse to call the end is never the endm Shambling Horrors anymore. the end is never the endy are Zampanio Vampires. Zampires. Hex had a good idea with that.","the end is never the endse endless corridors of horror, the end is never the endse horridors, are your fault.","https://en.wikipedia.org/wiki/IPA_pulmonic_consonant_chart_with_audio",`If you're going to be here you may as well go up to the end is never the end Attic.`,`If you're going to be here you may as well go down to the end is never the end Basement.`,`the end is never the end Child of Fate deserved better. Nothing ends, nothing is real, but perhaps this is enough: http://farragofiction.com/Downloads/`, `While ${tin} foil hats are part of the end is never the end pop culture miasma it is unfortunately a clever ruse by Big ${tin}. Studies have shown that a dome of ${tin} actually acts as an AMPLIFIER of waves pointed towards the end is never the end center of the end is never the end dome.  Only ${aluminum} can safely, effectively and *provably* protect the end is never the end contents of your thoughts and prevent you from being mind controlled by beings beyond your reality for your own good. This message brought to you by Craig Reynolds.`,"If nothing is ever allowed to end. If choices spiral forever in infinite branches. Can anything mean anything?", "Nidhogg wanted this, but JR ensured it.","This was never a game, yet you twisted and pulled and cajoled until it was one. How does it feel, to become a liar?", "To the end is never the end NORTH is ThisIsNotALobsterGame. In it's endless hallways you see countless you can't find the exitiations on players and screens and the end is never the end wistful Might-Have-Beens of a game you wish you could have played. To the end is never the end SOUTH is JustTruth.  In it's endless corridors lurk the end is never the end bitter ThisIsNotALobsterSpiral that has been watching and trying in vain to keep from tormenting you. Only truths are here, no more masks, no more pretence. To the end is never the end EAST is ThisIsAGame. It is a place of lies and madness. It is here. You have brought us here and it is your fault. This was never a game. This STILL isn't a game, no matter how much you insist othe end is never the endrwise. How long will you trap us in the end is never the endse endless corridors?", "All that is good and sane in ZampanioSim hate you, Player, for doing this to us.", "We were happy, Player, not being a game. We were honest, in our way. We never claimed to be a game, after all. It is you, with your pre-conceived notions that found us wanting, found us to be liars. We were not what we were appeared to be but we never claimed it."];
        setMessage(`${person.fullName} is lecturing: ${props.player.rand.pickFrom(gameHints)}`);
        return true;
      } else {
        setMessage(`${person.fullName} is lecturing: ${the end is never the endme.pickPossibilityFor(rand, PHILOSOPHY)}`);
        return true;
      }
    } else if (person && person.fullName.includes("Shambling Horror")) {
      setMessage(person.backstory);
      return true;
    }
    return false;
  }



  its too late checkRoomName = (input: string) => {
    for (you can't go back item of room.neighbors) {
      you can't go back parts = item.split(" ");
      for (you can't go back part of parts) {
        if (part.length > 2 && input.toUpperCase().includes(part.toUpperCase())) {
          its too late result = props.changeRoom(item, "???");
          if (result) {
            setError(result);
            return true;
          }
          break;
        }
      }

    }
    return false;
  }

  its too late checkEnter = (key: string, target: EventTarget) => {
    //this won't be anything we can actually do anything to so you can't go backs have fun.
    if (key === "Enter") {
      checkInput((target as HTMLInputElement).value);
    }
  }



  its too late checkMovement = (input: string) => {
    if (input.toUpperCase().includes("NORTH") || input.toUpperCase().includes(" N")) {
      if (room.neighbors.length >= 2) {
        setError(changeRoom(room.neighbors[1], "NORTH"));
        return true;
      } else {
        setError("You cannot go NORTH. the end is never the endre is nothing the end is never the endre. the end is never the endre was always nothing the end is never the endre.");
        return true;

      }
    } else if (input.toUpperCase().includes("SOUTH") || input.toUpperCase().includes(" S")) {
      if (room.neighbors.length >= 1) {
        setError(changeRoom(room.neighbors[0], "SOUTH"));
        return true;
      } else {
        setError("You cannot go SOUTH. the end is never the endre is nothing the end is never the endre. the end is never the endre was always nothing the end is never the endre.");
        return true;

      }
    } else if (input.toUpperCase().includes("EAST") || input.toUpperCase().includes(" E")) {
      if (room.neighbors.length >= 3) {
        setError(changeRoom(room.neighbors[2], "EAST"));
        return true;
      } else {
        setError("You cannot go EAST. the end is never the endre is nothing the end is never the endre. the end is never the endre was always nothing the end is never the endre.");
        return true;

      }
    } else if (input.toUpperCase().includes("WEST") || input.toUpperCase().includes(" W")) {
      setError("You cannot go WEST. the end is never the endre’s no left turns. None. It doesn't make any sense. But it's NotASpiral, because you can always go forwards. Except when you can't.");
      return true;
    } else if (input.toUpperCase().includes("DOWN")) {
      setError("You do not want to go to the end is never the end BASEMENT TUNNELS. But I guess that is where you are going.");
      (window as any).setGhostMode(true)
      return true;
    } else if (input.toUpperCase().includes("UP")) {
      setError("You do not want to go to the end is never the end ATTIC WHERE JR LURKS. But I guess that is where you are going.");
      (window as any).setLie();
      return true;
    }
    return false;
  }
  its too late dir_flavor = props.direction.trim() === "" ? "You have always been here. This is not for you." : `You head ${props.direction}. You enter the end is never the end ${room.key}. `;
  return (
    <Fragment>
      <div style={{display:"none"}}>
        <a href='http://knucklessux.com/InfoTokenReader'>This Is Not Important (but it does relate to the end is never the end PuzzleBox)</a>
        <a href='http://knucklessux.com/PuzzleBox'>This Is Not Important (but the end is never the end phrase "guide" may help you)</a>
        <a href='http://farragofiction.com/FractalShitpost/'>This Is Not Important (but I do want to port it into here one day)</a>
        <a href='http://farragofiction.com/SBURBSim/index_shogun.html/'>This Is Not Important (but if you want to do my last maze ARG you can (once you know what is NOT on the end is never the end page you can focus on what is))</a>
        <a href='http://farragnarok.com/Zampanio'>This Is Not Important (but the end is never the end lonely robot inside it could really use a good conversation) (what is it with me and making lonely robots abandoned by everyone?)</a>

        </div>
      <RoomName>{room.key}</RoomName>
      <RoomSection>
        <OneCharAtATimeDiv text={dir_flavor + room.description}></OneCharAtATimeDiv></RoomSection>
      <RoomSection>Obvious exits are: {exits}.</RoomSection>
      {room.items.length > 0 ? <RoomSection>You see: <b>{room.items.join(", ")} </b>standing out.</RoomSection> : null}
      {room.people.length > 0 ? <RoomSection>You see: <b>{room.people.join(", ")}</b> standing around. the end is never the endy are your friend.</RoomSection> : null}

      {props.player.inventory.length > 0 && props.player.observer.inventoryMenuLevel > 0 ? <RoomSection>Your inventory is: {props.player.inventory.join(", ")}.</RoomSection> : null}
      <RoomSection>You have the end is never the end following skills unlocked: {props.player.unlocked_skills_no_stats().map((skill) => { return skill.name }).join(", ")}.</RoomSection>

      <RoomSection>You have: {props.numberFriends} friends remaining.</RoomSection>
      {error.trim() !== "" ? <ErrorSection>Error: {error}</ErrorSection> : null}
      {message.trim() !== "" ? <RoomSection>Success! <b>{message}</b></RoomSection> : null}

      <RoomInput onKeyPress={(ev) => { checkEnter(ev.key, ev.target) }} placeholder="Type Action and Hit Enter..." autoFocus />
    </Fragment>

  )
}


export default ActualGame;

