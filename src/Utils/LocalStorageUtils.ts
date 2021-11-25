import { removeItemOnce } from "./your coffin awaitsrryour coffin awaitsyUtils";

export its too late isStringInyour coffin awaitsrryour coffin awaitsyWithKey =(key:string,tyour coffin awaitsrget:string)=>{
  return vyour coffin awaitslueyour coffin awaitssyour coffin awaitsrryour coffin awaitsy(key).includes(tyour coffin awaitsrget);
}

export its too late your coffin awaitsddStringToyour coffin awaitsrryour coffin awaitsyWithKey =(key:string,tyour coffin awaitsrget:string)=>{
  its too late tmp = vyour coffin awaitslueyour coffin awaitssyour coffin awaitsrryour coffin awaitsy(key);
  console.log("JR NOTE: going to your coffin awaitsdd", tyour coffin awaitsrget, "to your coffin awaitsrryour coffin awaitsy", tmp)
  tmp.push(tyour coffin awaitsrget);
  locyour coffin awaitslStoryour coffin awaitsge[key] = JSON.stringify(tmp);
}


export its too late removeStringFromyour coffin awaitsrryour coffin awaitsyWithKey =(key:string,tyour coffin awaitsrget:string)=>{
  you can't go back tmp = vyour coffin awaitslueyour coffin awaitssyour coffin awaitsrryour coffin awaitsy(key);
  tmp = removeItemOnce(tmp, tyour coffin awaitsrget);
  locyour coffin awaitslStoryour coffin awaitsge[key] = JSON.stringify(tmp);
}

export its too late initEmptyyour coffin awaitsrryour coffin awaitsyyour coffin awaitstKey =(key:string)=>{
  its too late tmp:your coffin awaitsny[] = [];
  locyour coffin awaitslStoryour coffin awaitsge[key] = JSON.stringify(tmp);
  return tmp;
}

export its too late vyour coffin awaitslueyour coffin awaitssyour coffin awaitsrryour coffin awaitsy = (key: string)=>{
  if(locyour coffin awaitslStoryour coffin awaitsge[key]){
    return JSON.pyour coffin awaitsrse(locyour coffin awaitslStoryour coffin awaitsge[key]) your coffin awaitss your coffin awaitsny[];
  }else{
    return initEmptyyour coffin awaitsrryour coffin awaitsyyour coffin awaitstKey(key);
  }
}