//It seems my reporting abilities are needed.
export  class Observations{
    //all time stats are in milliseconds
    numClicks = 0;
    timePlayed = 0;
    timeWalked = 0;
    timesSkippedCutscene = 0;
    friendsMade = 0;
    skillsUnlocked = 0;
    /*
        TODO have any change to any of these variables call the achievement system to see if any achievement has been earned.
    */
    incrementStat = (statName:string, value: number)=>{
        (this as any)[statName] += value;
   }
}