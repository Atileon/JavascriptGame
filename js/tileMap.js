let mapIndexOffset = -1;

let mapRows = 10;
let mapCols = 10;

// let mapWidth = 640;
// let mapHeight = 640;

let tileSheet = new Image();
tileSheet.addEventListener('load', eventSheetLoaded, false);
tileSheet.src = '../img/tilesheet.png';

console.log(tileSheet);

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
console.log(map);
let theCanvas = document.getElementById('canvas');
let context = theCanvas.getContext('2d');

function eventSheetLoaded(){
    for ( let rowId = 0; rowId<mapRows; rowId++){

        for(let colId = 0; colId<mapCols; colId++){
            let tileId = map[rowId][colId] + mapIndexOffset;
            let srcX = Math.floor(tileId % 10) * 64;
            let srcY = Math.floor(tileId / 10) * 64;
            context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);
            
        }
    }
    
    function Player(name,posX,posY){
        this.name = name;
        this.posX = posX;
        this.posY = posY;
        this.life = 100;
        this.baseDamage = 10;
    }
    
    // Player.prototype.moveTo(){
    
    // }
    
    function coordsPlayer(e){
         e.clientX;
        console.log(e.clientX);
    }
    
    let player1 = new Player('carlitos',64, 64);
    
    
    function drawPlayer(){
        context.fillStyle = '#f00';
        context.fillRect(player1.posX, player1.posY, 64, 64);
    }
    
    drawPlayer();
    
}

context.save();
//  eventSheetLoaded();


