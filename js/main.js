class Player {
    constructor(size,name='coco',x,y){
        this.sizeX = size;
        this.sizeY = size;
        this.name = name;
        this.damage = 10;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.newPos = function(){
            this.x += this.speedX;
            this.y += this.speedY;
        }
        
    }
}

let player1 = new Player(64,'Jhon',0,0);

let theCanvas = document.getElementById('canvas');
let context = theCanvas.getContext('2d');
let map = [
    [21,21,34,23,23,35,21,21,21,21],
    [21,21,22,21,21,22,21,21,21,21],
    [21,34,26,23,23,32,23,23,35,21],
    [21,22,31,21,31,22,21,21,22,21],
    [21,36,27,23,23,33,23,23,25,21],
    [21,21,22,21,21,22,21,21,22,21],
    [21,34,26,35,21,22,21,21,22,31],
    [21,22,21,36,27,26,27,23,26,35],
    [21,22,21,21,22,31,22,21,31,22],
    [21,36,23,23,37,21,36,23,23,37]
];
let mapIndexOffset = -1;

let mapRows = 10;
let mapCols = 10;

let size =  64;

context.canvas.width = 10 * size;
context.canvas.height = 10 * size;

let tileSheet = new Image();
tileSheet.addEventListener('load', createMap, false);
tileSheet.src = '../img/tilesheet.png';

function createMap(){
    for ( let rowId = 0; rowId<mapRows; rowId++){

        for(let colId = 0; colId<mapCols; colId++){
            let tileId = map[rowId][colId] + mapIndexOffset;
            let srcX = Math.floor(tileId % 10) * 64;
            let srcY = Math.floor(tileId / 10) * 64;
            context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);
            
        }
    }

    let image = new Image();
    image.onload = drawCharacter;
    image.src = './img/tank_bigRed.png';


    function drawCharacter() {
        context.drawImage(image, 0,0,player1.sizeX, player1.sizeY,player1.x,player1.y,player1.sizeX,player1.sizeY);

      }
    
      window.addEventListener('keydown',doKeyDown,true);

      player1.newPos();
      console.log(player1.newPos());

    function moveUp(){
          player1.speedY -= 1;
          return player1.speedY;
      }
      console.log(moveUp());
      
    function moveDown(){
        player1.speedY += 1;
        return player1.speedY;
        }
    function moveLeft(){
        player1.speedX -= 1;
    }
    function moveRight(){
        player1.speedX += 1;
    }

      function doKeyDown(evt){
        switch (evt.keyCode) {
        case 38:  /* Up arrow was pressed */
        if (player1.y > 0){
            moveUp();
            console.log(moveUp());
        }
        break;
        case 40:  /* Down arrow was pressed */
        if ( player1.y < 0){
            moveDown();
        }
        break;
        case 37:  /* Left arrow was pressed */
        if (player1.x > 0){
            moveLeft();
        }
        break;
        case 39:  /* Right arrow was pressed */
        if (player1.x < 0){
            moveRight();
        }
        break;
        }
        }

        
};//Create map


