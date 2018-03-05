'use strict';

let tileSheet = '../img/tilesheet.png';

let theCanvas = 'canvas';

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

class Map{
    constructor (arrMap,rows,cols,tileSize,canvas){
        this.arrMap = arrMap;
        this.canvas = canvas;
        this.rows = rows;
        this.cols = cols;
        this.tileSize = tileSize;
        this.mapIndexOffset = -1;
    }

    set drawMap(){
        let theCanvas = document.getElementById(this.canvas);
        let ctxt = theCanvas.getContext('2d');
        let imgTileSheet = new Image();
        imgTileSheet.src = '../img/tilesheet.png';

        for ( let rowId = 0; rowId<this.rows; rowId++){
    
            for(let colId = 0; colId<this.cols; colId++){
                let tileId = this.arrMap[rowId][colId] + this.mapIndexOffset;
                let srcX = Math.floor(tileId % 10) * this.tileSize;
                let srcY = Math.floor(tileId / 10) * this.tileSize;
                ctxt.drawImage(imgTileSheet, srcX, srcY, this.tileSize,this.tileSize, colId*this.tileSize, rowId*this.tileSize,this.tileSize,this.tileSize);
                return;
            }
        }
    }
}

class Player extends Map{
    constructor(name='foo',weapon){
        super(arrMap,)
        this.name = name;
        this.weapon = weapon;
        this.baseDamage = 10;
        this.life = 100;
        this.tileId = 1;
        this.posX = Math.floor(this.tileId % 10) * 64;
        this.posY = Math.floor(this.tileId / 10) * 64;
        this.dead = false;
        this.moveCount = 0;
    }

    drawPlayer(){
        console.log('works');
        context.fillStyle = '#f00';
        context.fillRect(this.name,this.posX, this.posY, 64, 64);
    }


}//End Player



const theMap = new Map(map,10,10,64,'canvas');
theMap.drawMap();

console.log(theMap);