import { useEffect, useState } from "react";
import not_a_minotaur_src from './../../images/notaminotaur.png';
import you_src from './../../images/probablyYou.png';
import { ChatLine, ChatLineComponent } from "./ChatLine";

export const ChatScreen = () => {
      const notAMinotaurName = "NotAMinotaur";
      const yourName = "puzzledPlayer";
      
      const makeNotAMinotaurLine = (text: string)=>{
          return new ChatLine(notAMinotaurName, not_a_minotaur_src, "#cfcd00", text);
      }
  
      const makePlayerLine = (text: string)=>{
          return new ChatLine(yourName, you_src,"#ff0000", text);
      }

      const testLines = [makeNotAMinotaurLine("testing"),makeNotAMinotaurLine("testing2"),makePlayerLine("player line"),makeNotAMinotaurLine("testing 3")];

      const [lines, setLines] = useState(testLines);
      const [processedLines, setProcessedLines] = useState<JSX.Element[]>([]);

      useEffect(()=>{
          setProcessedLines(processChatLines());
      },[lines, setProcessedLines])

      const processChatLines = ()=>{
          const tmp:JSX.Element[] = [];
          let lastSpeaker:string|null = null;
          for(let line of lines){
              if(lastSpeaker === line.username){
                  tmp.push(<ChatLineComponent chatLine={line} displayInfo={false}/>);
              }else{
                tmp.push(<ChatLineComponent chatLine={line} displayInfo={true}/>);
              }
              lastSpeaker = line.username;
          }
        return tmp;
      }


        return(
            <div>{processedLines}</div>
        )
}



