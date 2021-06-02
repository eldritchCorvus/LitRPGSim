export const getRandomNumberBetween =(min: number, max:number) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomElementFromArray=(array: any[])=>{
    return array[getRandomNumberBetween(0, array.length -1)];
}

export const  getRandomSeed =()=> {
	var min = 0;
	var max = 413*612*1025;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function numbertoseed(seed:string){
    var output = 0;
       for (var i = 0, len = seed.length; i < len; i++) {
          output += seed[i].charCodeAt(0)
        }
    return output
    }