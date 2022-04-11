import { Player } from "../Modules/Player";
import { StatusHeader, StatusRow, StatusBlock, StatusContent } from "./Styles";

interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

export const QuestScreen = (props: StatusProps) => {

    const observer = props.player.observer;

    console.log("JR NOTE: quest screen")




    return (

        <StatusBlock>
            <StatusRow>

                <StatusContent>
                    <div>test</div>JR NOTE: TODO
                    QuestObject

                    UnlockCondition (if met, added to player list
                    FulfillCondition (if met,turn in button enabled)

                    Reward (item for now, but eventually change companion loyalty, add a new one, change stats, unlock skills, etc)
                    Bonus Reward (Game mode only (extra lore, passwords for the rabbit hole, etc))
                    flavor text

                    completion text
                    its vital it feels like HALF a game, just like the skill graph
                </StatusContent>
            </StatusRow>

        </StatusBlock>);
}