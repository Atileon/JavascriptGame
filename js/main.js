

let theCanvas = document.getElementById('canvas');
let ctx = theCanvas.getContext('2d');
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
        ctx.fillStyle = (map[i] == 1) ? '#000000' : '#ffffff';
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

let character = function(width,height){
    let x = width;
    let y = height;
    
    let image = new Image(x,y);
    image.onload = drawCharacter;
    image.src = './img/tank_bigRed.png';

    function drawCharacter() {
  
        ctx.drawImage(this, 0, 0, this.width, this.height, x,y,this.width,this.height);
      }
}

character(50,50);


let turni = [
    1,2,3,4,5,6,7,8,9,0
]
function repeatArray(arr,count){
    let length = arr.length;
    let b = [];

    for (let i = 0; i < count; i++){
        b.push(arr);
    
        console.log (b);
    }

}


repeatArray(turni, 2);