import { useEffect, useState } from "react";

interface RoomProps {
    text: string;
  }
export const OneCharAtATimeDiv = (props: RoomProps) => {
    const {text} = props;
    const [index, setIndex] = useState(0);

    const incrementIndex = ()=>{
        if(index < text.length){
            setTimeout(()=>{
                window.requestAnimationFrame(()=>{setIndex(index +1)})}, 100)
        }

    }

    useEffect(()=>{
        incrementIndex();
    },[index]);
    return(
        <div>
            {text.substr(0, index)}
        </div>
    )


}