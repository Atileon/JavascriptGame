:construction: This project is under construction yet

# Ava's Game Canvas
## Another Openclassrooms Project

This project aims to create a simply gameboard on  __HTML5 Canvas__ for __2 players__ (or more) and deploy up to __4__ weapons _(pineapples would be a weapon :P)_

The function that init the game is  
```js
avaGame();
```
which enclose all the global variables for the game includin images and the array for the map

It's based on JS classes to create:

## The map

```js
let gameMap = new Map(cols,rows,tileW,tileH,arr,ctx);

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

```js
gameMap.drawMap(tilesheet);
//where tilesheet is a variable with the tile sheet image
```

## The Component class

This class gets the basic parameters for any component on the game, like width heigh and positions

```js
class Component (area = 'a',x,y,width,height,color)
// area -> it set an area on map to deploy the component 
// x -> the x value of the objects
// y -> the y value of the objects
// width -> the width of objects on map
// height -> the height 
// color -> the color (by now) of components on map
```
The areas would be :
- a : the Top area
- b : the Middle area
- c : the Bottom area

The area declaration has a default value on the top area ('a')

:warning: _The color value is just temporary because it would be replaced by images_ 

---
Before we get into the next classes there's need of empty arrays for weapons and players to be declared along with the other variables into the avaGame();

```js
let weapons = [];
let players = [];
```
---

> Before we go ahead :warning: Remember that Weapon and Player are extensions of Component Class

:squirrel: Ok, go ahead


## The Weapon Class

Well this class creates a weapon extending the Component class
```js
new Weapon(area,x,y,width,height,color,name, damage)
// name -> just set a name for the new weapon
// damage -> set the amount of damage for weapon
```

Note that I've just explained the name and damage because the another values are the same to be declared as the Component class.



## The Player Class

/play yeah

Ehm!...well, now we can create a player with

```js 
new Player(area,x,y,width,height,color,name,weapons)
// name -> give a birth name to your players, the force would be with them 
// weapons -> gets the array of weapons with weapon objects
```

So, once the player is created __remember to push it into the empty array__ for players 

Now, I will explain some methods on Player class 

---
### _Get a weapon on map_


The method to get a weapon on map is the 
```js
player.getWeapon();
```
which could __compare__ simply the __tile index__ of player with the __weapons__ _objects_ __tile indexes__ and once the tile index of both __(any weapon)__ are __equals__ , the player would decide to take it or not with this method

### _The Battle_

/play dangerzone

:see_no_evil: Violence ... too much violence!!!

When the player tiles indexes are equals, the battle would begin
> look at the console if you download it :shipit:

This is :construction: under construction right now :trollface:

---
### _The Movements of Player_

The methods for move the player are the next
- `moveUp()`
- `moveDown()`
- `moveLeft()`
- `moveRight()`

This movements will update the next method

```js
player.newPos();
```
which __update the position__ coordinates of player with new values take it by the relative method movements described up

