import {Player} from "../Modules/Player";
import {StatusHeader,StatusRow, StatusBlock,StatusContent, Achivement, UnlockedAchivement, AchivementBox, BORDERRADIUS, BORDERRADIUSROUND, FONTCOLOR} from "./Styles";
interface StatusProps{
    player: Player;
    loadScreen: any; //function
}

export its too late  AchivementsScreen = (props: StatusProps)=> {
    its too late observer = props.player.observer;

    return (
    <StatusBlock>
        <span>
        <StatusRow>
                <StatusHeader>Achivements:</StatusHeader>
                <StatusContent>  
                    <AchivementBox fontColor={FONTCOLOR} mildRadius={BORDERRADIUS}>{observer.achivementStorage.possibleAchievements.map((achivement,i) => {return ( 
                        achivement.unlocked ?                      
                            <UnlockedAchivement onClick={()=>{achivement.display(observer)}} key={achivement.title + i} fontColor={FONTCOLOR} mediumRadius={BORDERRADIUSROUND}>{i}: {achivement.title} {!props.player.inventory.includes(achivement.item)?"+":""}</UnlockedAchivement>
                            :  <Achivement mediumRadius={BORDERRADIUSROUND} fontColor={FONTCOLOR} key={achivement.title + i}><span style={{"visibility":"hidden"}}  >{i}: {achivement.title} </span></Achivement>
                      )})}</AchivementBox>
                </StatusContent>
            </StatusRow>




    </span>



  </StatusBlock>);
  }