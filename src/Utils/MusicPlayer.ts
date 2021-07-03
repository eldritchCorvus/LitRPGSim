export function playSong(song:string){
    console.log("trying to play: ",song)
    const audio = new Audio(song);
    audio.play();
}