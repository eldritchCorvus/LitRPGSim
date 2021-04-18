import {all_aspects, initAspects} from "./Modules/Aspect";
import { all_classes, initClasses } from "./Modules/RPGClass";
import { Skill } from "./Modules/Skill";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
import {Player} from "./Modules/Player";
import {Status} from "./Screens/Status";
import { all_interests } from "./Modules/Interest";
function App() {
  //order matters, themes are needed for aspects, etc;
  const rand = new SeededRandom(13);
  initThemes();
  initAspects(rand);
  initClasses(rand);
  const player = new Player(all_classes.seer, all_aspects.life, [all_interests.crafting, all_interests.language], rand);
  return (
    <div>
    <Status player={player}></Status>
    Fast TODO
    <ul>
      <li>stub out interests</li>
      <li>abilityt to player skills and turn it into a directed acylcic graph</li>
      <li>ability to visualize said graph</li>
      <li>player object (has stats, skills, etc) (stats are just from wigglersim)</li>
      <li>special skill types that unlock other stat pages</li>
    </ul>
    </div>
  );
}

export default App;
