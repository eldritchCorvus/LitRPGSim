import {all_aspects, initAspects} from "./Modules/Aspect";
import { all_classes, initClasses } from "./Modules/RPGClass";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player} from "./Modules/Player";
import {StatusScreen} from "./Screens/Status";
import { all_interests, initInterests } from "./Modules/Interest";
function App() {
  //order matters, themes are needed for aspects, etc;
  const rand = new SeededRandom(13);
  initThemes();
  initAspects(rand);
  initClasses(rand);
  initInterests(rand);
  console.log("All Interests are", all_interests);
  const player = new Player(all_classes.seer, all_aspects.life, [all_interests.crafting, all_interests.language], rand);
  return (
    <div>
    <StatusScreen player={player}></StatusScreen>
    Fast TODO
    <ul>
      <li>ability to display player skills as graph (tweaking tier if needed)</li>
      <li>only display unlocked skills and skills adjacent to them</li>
      <li>can click on skill to unlock it</li>
      <li>player has skill points, can only click on skill if you can afford it ("are you sure" popup)</li>
      <li>player stats (stats are just from wigglersim but with lists of names)</li>
      <li>special skill types that unlock other stat pages</li>
      <li>sassy achievement system</li>
    </ul>
    </div>
  );
}

export default App;
