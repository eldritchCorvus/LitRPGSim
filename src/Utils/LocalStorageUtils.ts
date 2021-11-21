import { removeItemOnce } from "./ArrayUtils";

export const isStringInArrayWithKey =(key:string,target:string)=>{
  return valueAsArray(key).includes(target);
}

export const addStringToArrayWithKey =(key:string,target:string)=>{
  const tmp = valueAsArray(key);
  tmp.push(target);
  localStorage[key] = JSON.stringify(tmp);
}


export const removeStringFromArrayWithKey =(key:string,target:string)=>{
  let tmp = valueAsArray(key);
  tmp = removeItemOnce(tmp, target);
  localStorage[key] = JSON.stringify(tmp);
}

export const valueAsArray = (key: string)=>{
  return JSON.parse(localStorage[key]) as any[];
}