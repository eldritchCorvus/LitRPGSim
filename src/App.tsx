import {all_aspects, initAspects} from "./Modules/Aspect";
import { Skill } from "./Modules/Skill";
import {initThemes} from "./Modules/Theme";
import SeededRandom from "./Utils/SeededRandom";
function App() {
  //order matters, themes are needed for aspects, etc;
  const rand = new SeededRandom(13);
  initThemes();
  initAspects(rand);
  const skill_1_test = new Skill([all_aspects.life.themes[0]], rand);
  const skill_2_test = new Skill(all_aspects.life.themes,rand);

  return (
    <div>
    <div>{all_aspects["life"].name_possibilities.join(",")}but i chose {all_aspects["life"].chosen_name}</div>
    <div>
      <div>Skill 1: {skill_1_test.name}: Themes: [{skill_1_test.theme_keys.join(",")}]</div>
      <div>Skill 2: {skill_2_test.name}: Themes: [{skill_2_test.theme_keys.join(",")}]</div>
    </div>
    Fast TODO
    <ul>
      <li>Skill object that has a name and the keys of its themes. its tier is sum of its theme's tiers</li>
      <li>ability to take a list of aspects and generate a skill from them.</li>
      <li>stub out classes</li>
      <li>stub out interests</li>
      <li>ability to take list of aspects, classes and interests and a target tier and generate a skill from them</li>
      <li>ability to take same list as above and generate a mess of skills from them of various tiers</li>
      <li>abilityt to take a mess of skills of various tiers and turn it into a directed acylcic graph</li>
      <li>ability to visualize said graph</li>
    </ul>
    </div>
  );
}

export default App;
