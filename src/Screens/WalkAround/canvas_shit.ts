export const initBlack = (canvas:HTMLCanvasElement) => {
    const context = canvas.getContext("2d");
    if(!context){
        return;
    }
    context.fillRect(0, 0, canvas.width, canvas.height);
}