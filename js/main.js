let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let map = [
    1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,1,0,0,0,0,1,0,1,
    1,0,0,1,0,0,1,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,0,0,0,0,0,0,0,1,
    1,0,1,0,0,0,0,1,0,1,
    1,0,0,1,0,0,1,0,0,1,
    1,0,0,0,1,1,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1
];

let size =  50;

ctx.canvas.width = 10 * size;
ctx.canvas.height = 10 * size;


let createMap = function(){
    for (let i = 0; i < map.length; i++) {
        ctx.fillStyle = (map[i] == 1) ? '#ff0000' : '#000000';
        ctx.fillRect(
            (i % 10) * size,
            Math.floor(i/10) * size,
            size,
            size
        );  
    }
    ctx.drawImage(ctx.canvas, 0,0, ctx.canvas.width, ctx.canvas.height);
};

createMap();