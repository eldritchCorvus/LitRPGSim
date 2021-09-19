import { Fragment } from "react"
import { OneCharAtATimeDiv } from "../OneCharAtATimeDiv"
import { RageStyledButton } from "../Styles"


interface StatusProps {
    simpleContent: string;
    bumpIndex: Function;
    unbumpIndex: Function | null;

}
export const SimpleContent =(props: StatusProps)=>{

    const {simpleContent, bumpIndex, unbumpIndex} =props; 

    return(
        <Fragment>
                    <div style={{ height: "100px" }}><OneCharAtATimeDiv text={simpleContent} /></div>
                    <RageStyledButton onClick={() => { bumpIndex() }}> {">"} Okay?</RageStyledButton>
                    {unbumpIndex? <RageStyledButton onClick={() => { unbumpIndex() }}> {">"} Wait can you go back?</RageStyledButton> : null}

                </Fragment>
    )

}