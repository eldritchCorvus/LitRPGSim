import styled from "@emotion/styled";
import { Fragment, useState } from "react";
import AchivementPopupKickoff from "../Modules/ObserverBot/AchivementPopup";
import { Player } from "../Modules/Player";
import { QuestObject } from "../Modules/Quests/QuestObject";

import { StatusBlock } from "./Styles";

interface StatusProps {
    player: Player;
    loadScreen: any; //function
}

interface QuestItemProps {
    quest: QuestObject;
    player: Player;

}

export const QuestScreen = (props: StatusProps) => {
    const questObjects = props.player.quests;

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
                    if(!item.unlocked(props.player.observer) || item.completed){
                        return null;
                    }
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

    const giveReward = () => {
        player.observer.numberQuestsCompleted++;
        player.storySoFar.push(quest);
        quest.setCompleted();
        setCompleted(true);
        const rewardRes = quest.gatherRewards(player);
        (window as any).refresh();
        AchivementPopupKickoff({ title: "Quest Reward!", text: quest.replaceTags(quest.completionText), skillPoints: 10, reward: rewardRes });
    }

    console.log("JR NOTE: quest is", quest)

    const [completed, setCompleted] = useState(quest.completed);

    return (
        <QuestLine>
            <QuestHeader>
                {quest.replaceTags(quest.title)}
            </QuestHeader>
            <QuestSection>
                {quest.replaceTags(quest.flavorText)}
                {completed ?

                    <Conditions> COMPLETED!</Conditions>
                    :
                    <Fragment>
                        <Conditions>Unlocked via: {quest.unlockTriggers.join(". ") + "."}</Conditions>

                        <Conditions>To Turn In: {quest.turnInTriggers.join(". ") + "."}</Conditions>
                        <button onClick={giveReward} disabled={!quest.canTurnIn(player.observer)} className="styled_button"> TURN IN!</button>
                    </Fragment>
                }
            </QuestSection>
        </QuestLine>
    )

}