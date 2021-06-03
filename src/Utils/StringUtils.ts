export const titleCase = (input:string)=>{
    return replaceStringAt(input,0 , input[0].toUpperCase());
}

function replaceStringAt(str:string, index:number, character:string){
    return str.substr(0, index) + character + str.substr(index+character.length);
}