import Birthday from "./Birthday";
import Truth from "./Truth";
import { getParameterByName } from "./Utils/URLUtils";




//game mode is just "is there a seed";


function AppWrapper() {
  
  if (!getParameterByName("seed", null)) {
    return (
      <Birthday/>
    )
  } else {
    return (
      <Truth />
    )
  }
}

export default AppWrapper;

