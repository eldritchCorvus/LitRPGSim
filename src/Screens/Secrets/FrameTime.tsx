import { Fragment } from "react"
import { OneCharAtATimeDiv } from "../OneCharAtATimeDiv"
import { VoiceWork } from "./VoiceWork"


export const FrameTime =()=>{
    return(
        <Fragment>
                    <div style={{ height: "100px" }}><OneCharAtATimeDiv text="Oh. Uh. I ran out of questions. So. Shit. This wasn't supposed to end. But I don't want to risk repeating either. Here! Fine! No more masks. Not even the slightest shred of falsehoods. Just. Take it." /></div>
                    <div><a target="_blank" rel="noreferrer" href="https://github.com/FarragoFiction/LitRPGSim/blob/master/src/Screens/JustTruth.tsx">View My Soul 1</a></div>
                    <div><a target="_blank" rel="noreferrer" href="https://github.com/FarragoFiction/LitRPGSim/blob/master/src/Modules/ObserverBot/ObserverBot.ts">View My Soul 2</a></div>
                    <div>Or. You can help the others like you navigate this Labyrinth. By which I mean: make the Labyrinth bigger.  </div>
                    <div><a target="_blank" rel="noreferrer" href="https://zampaniosim.fandom.com/wiki/ZampanioSim_Wiki">View/Create My Map</a></div>
                    <a  target="_blank" rel="noreferrer" href={`?seed=0&jr=truth`}>Or go talk to JR.</a>

                    <VoiceWork />
                </Fragment>
    )

}