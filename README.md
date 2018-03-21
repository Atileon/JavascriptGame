:warning: This project is under construction yet

# Ava's Game Canvas
## Another Openclassrooms Project

This project aims to create a simply gameboard on  __HTML5 Canvas__ for __2 players__ (or more) and deploy up to __4__ weapons _(pineapples would be a weapon :P)_

It's based on JS classes to create:

## The map

```
new Map(cols,rows,tileW,tileH,arr,ctx)

// cols ->declare how many cols for the map
// rows ->declare how many rows for the map
// tileW -> for the single width of any tile
// tileH -> for the single height of any tile
// arr -> here would be passed a bidimensional array (see the example below)
// ctx -> this to pass a variable with the canvas context

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
```
To draw the map just use the drawMap Method passing a variable with the image tile-sheet :earth_americas:
i.e: assuming the class Map was declared into a gameMap variable and was created a variable with the tile sheet image

```
gameMap.drawMap(tilesheet);
//where tilesheet is a variable with the tile sheet image
```
