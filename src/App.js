import {all_aspects, initAspects} from "./Modules/Aspect";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
function App() {
  //order matters, themes are needed for aspects, etc;
  const rand = new SeededRandom(13);
  initThemes(rand);
  initAspects(rand);
  return (
    <div>{all_aspects["life"].name_possibilities.join(",")}but i chose {all_aspects["life"].chosen_name}</div>
  );
}

export default App;
