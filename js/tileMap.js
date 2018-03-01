let mapIndexOffset = -1;

let mapRows = 10;
let mapCols = 10;

// let mapWidth = 640;
// let mapHeight = 640;

let tileSheet = new Image();
// tileSheet.addEventListener('load', eventSheetLoaded, false);
tileSheet.src = '/img/tilesheet.png';



let map = [
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10],
    [1,2,3,4,5,6,7,8,9,10]
];

let theCanvas = document.getElementById('canvas');
let context = theCanvas.getContext('2d');


for ( let rowId = 0; rowId<mapRows; rowId++){

    for(let colId = 0; colId<mapCols; colId++){
        let tileId = map[rowId][colId] + mapIndexOffset;
        console.log(tileId);
        let srcX = Math.floor(tileId % 10) * 64;
        let srcY = Math.floor(tileId / 10) * 64;
        console.log(tileSheet);
        context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);
    }
}