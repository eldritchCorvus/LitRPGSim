import styled from "@emotion/styled";
import { AchievementTrigger } from "../Modules/ObserverBot/AchievementTriggers/AchievementTrigger";
import { ExceedValueTrigger } from "../Modules/ObserverBot/AchievementTriggers/ExceedValue";
import { MenuClicksTrigger } from "../Modules/ObserverBot/AchievementTriggers/MenuClicks";
import { Player } from "../Modules/Player";
import { QuestObject } from "../Modules/Quests/QuestObject";
import { humanJoining } from "../Utils/ArrayUtils";
import { OPTIONS } from "../Utils/constants";
import { StatusHeader, StatusRow, StatusBlock, StatusContent } from "./Styles";

interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

interface QuestItemProps {
    quest: QuestObject;
    player: Player;

}

export const QuestScreen = (props: StatusProps) => {

    const observer = props.player.observer;

    console.log("JR NOTE: quest screen")

    const questObjects = [
        new QuestObject(
            "A New Begining!",
            "After finally joining the wild world of Zampanio, the TUTORIAL NPC has given you a starter Quest! Bring him 4 COOKED RABBITS! You can find them in STARTER MEADOW during the DAY!",
            "test completion1",
            new AchievementTrigger(), //auto unlock
            new AchievementTrigger()) //auto unlock
        , new QuestObject("A Sudden Turn!",
            "Oh no! Doc Slaughter has betrayed the party! No one could possibly have predicted this! Now the race is on to see who will be first to the TOWER OF ETERNITY to claim the EIGHTFOLD SWORD! ",
            "test completion2",
            new ExceedValueTrigger(1, "numClicks"),
            new ExceedValueTrigger(10, "numClicks"))
        , new QuestObject("A Sudden Turn Redux!",
            `Oh no! Doc Slaughter has betrayed the party! Again! No one could possibly have predicted that her dramatic revelation of being a double agent who was only PRETENDING to betray the party was itself a ruse to cover up the fact that she was a QUINTUPLE agent in service to ${props.player.gods[0].name}, god of ${humanJoining(props.player.gods[0].domains.map((item) => item.key))} to fake betray the party only to real betray the party when it mattered most! Can you recover her PHOTO ALBULM in time to remind her of all the real friendships you've all shared? `,
            "test completion2",
            new ExceedValueTrigger(10, "numClicks"),
            new MenuClicksTrigger(OPTIONS))
        , new QuestObject("An Exciting Finish!",
            "The End is upon us. She stares you down, a gentle smile betraying nothing. Certainly not you. Can you meet your promised fate with a smile in return? Or will you defy it. WARNING: TURNING IN THIS QUEST WILL COMPLETE YOUR ARC.",
            "test completion3",
            new ExceedValueTrigger(10000, "timeSpentPlaying"),
            new ExceedValueTrigger(30000, "timeSpentPlaying")
        )]


    return (

        <StatusBlock>

            <div>test</div>
            hey quest objects are {questObjects.length}
            JR NOTE: TODO
            QuestObject

            UnlockCondition (if met, added to player list
            FulfillCondition (if met,turn in button enabled)

            Reward (item for now, but eventually change companion loyalty, add a new one, change stats, unlock skills, etc)
            Bonus Reward (Game mode only (extra lore, passwords for the rabbit hole, etc))
            flavor text

            completion text
            its vital it feels like HALF a game, just like the skill graph
            {
                questObjects.map((item, index) => {
                    return (<QuestItem key={`quest${index}`} quest={item} player={props.player}></QuestItem>)
                })
            }

        </StatusBlock>);
}

const QuestItem: React.FC<QuestItemProps> = ({ quest, player }) => {

    const QuestLine = styled.div`
    padding: 20px;
    font-size: 15px;
    margin-top: 10px;
    border-radius: 5px;
    border: 1px solid black;
`
    const QuestHeader = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 775px;
        font-weight: bolder;
        font-size: 18px;
        margin-bottom: 20px;

    `

    const Conditions = styled.div`
        display: block;
        margin-right: 5px;
        margin-top: 20px;
        font-size: 85%;
        font-style: oblique;
    `
    const QuestSection = styled.div`
        display: inline-block;
        margin-right: 5px;
        width: 800px;
    `
    return (
        <QuestLine>
            <QuestHeader>
                {quest.title}
            </QuestHeader>
            <QuestSection>
                {quest.flavorText}
                <Conditions>To Turn In: {quest.turnInTrigger.toString()}</Conditions>
                <button disabled={!quest.turnInTrigger.triggered(player.observer)} className="styled_button"> TURN IN!</button>
            </QuestSection>
        </QuestLine>
    )

}