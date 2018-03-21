//there would be 
// a main class or function to recall the game itself
//Into the game there must be:
//    -A class Map to generate a map from an array
//    -A class Component to generalize position an width for any element
//    -An extended from Component class for players 
//    -An extended from Component class for weapons
//
// After creation of this classes I must to create some functions to:
//    -Initialize the game
//    -create the map on canvas
//    -create the player Obj
//    -create weapons on map
//    -update all functions with current values
'use strict';
//=========================CLASSES==============================
class Map {
    constructor(cols,rows,tileW,tileH,arr,ctx){
        this.cols = cols;
        this.rows = rows;
        this.tileW = tileW;
        this.tileH = tileH;
        this.mapArr = arr; //this is for the map array which would be a bidimensional array 'arr[][]'
        this.context = ctx;//canvas context passed into a variable
        this.mapIO = -1; //this is the index offset for the map array
    }
    drawMap(tileSheet){
        // This method will draw the map 
        // and there's need just of a tilesheet image declared into a variable
        // to pass into this method

        for(let rowId = 0; rowId<this.rows; rowId++){
            for(let colId = 0; colId<this.cols; colId++){
                // let tileId = Math.floor(Math.random()*100 + gameArea.mapIO); // lol
                let tileId = this.mapArr[rowId][colId] + this.mapIO;
                let srcX = Math.floor(tileId % 10) * 64;
                let srcY = Math.floor(tileId / 10) * 64;
                this.context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);

            }                
        }
    }
}

class Component{
    constructor(area = 'a',x,y,width,height,color){
        // The area variable will set the area where the component would be deployed
        this.area = area;
        //next 4 lines to set a random position for the players
        // let tileId = Math.floor(Math.random()*100-1);//This because we are assuming visualy that there are 100 cells but on array are just 99
        this.startId = this.startArea();// this simply to set an tile to deploy component followin the starArea method
        this.x = Math.floor(this.startId % 10)*64;//value on X axis
        this.y = Math.floor(this.startId / 10)*64;//value on Y axis
        
        this.w = width;
        this.h = height;
        this.color = color;

        
        this.tileId = this.getId();
    }
    getId(){
        //this method could get us the Tile Id on Map to 
        //compare with any other element to get or to fight
        this.tileX = Math.floor(this.x/this.w);
        this.tileY = Math.floor(this.y/this.h);
        this.tileId = Math.floor(this.tileY * 10)+ this.tileX;
        return this.tileId;
    }
    startArea(){
        // this method give the element an area to start on map
        // the Top Area is 'a'
        // the Middle Area is 'b'
        // and the Bottom Area is 'c'

        switch(this.area){
            case 'a':
            let tileIdA = Math.floor(Math.random()*20-1);
            return this.startId = tileIdA;
            break;
            case 'b':
            let tileIdB = Math.floor(Math.random()*(70-30)-1) + 30;
            return this.startId = tileIdB;
            break;
            case 'c':
            let tileIdC = Math.floor(Math.random()*(100-80)-1) + 80;
            return this.startId = tileIdC;
            break;
        }
        return this.startId;
    }
    drawIt(context){// this take the global context variable to draw Component
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

}

class Weapon extends Component {
    constructor(area,x,y,width,height,color,name, damage){
        super(area,x,y,width,height,color);
        this.name = name;
        this.damage = damage;
    }
    
}

class Player extends Component {
    constructor(area,x,y,width,height,color,name,weapons){
        super(area,x,y,width,height,color);

        this.name = name;
        this.health = 100;
        this.weaponArr = weapons;
        this.weapon = this.weaponArr[0];
        this.posX = this.x;//initial position on X
        this.posY = this.y;//initial position on Y
        // this.upgradeWeapon = this.weaponNew();
    }
    drawP(context,img){// this take the global context variable to draw Component
        
        context.drawImage(img, this.x, this.y, this.w, this.h);
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    getWeapon(){
        for(let i=0; i < this.weaponArr.length; i++){
            if( this.getId() == this.weaponArr[i].getId()){
                this.weapon = this.weaponArr[i];
            }else{    
                this.weapon;
            }           
         }
         console.log(this.name+ ' takes the WOW : '+ this.weapon.name);

    }
    newPos(){
        this.x = this.posX;//position updated on X
        this.y = this.posY;//position updated on Y

        //this if else condition would prevent to get out of the canvas
        if (this.x < 0){
            this.moveRight();
        }else if((this.x + this.w) > canvas.width){
            this.moveLeft();
        }else if(this.y < 0){
            this.moveDown();
        }else if((this.y + this.h) > canvas.width){
            this.moveUp();
        }
    }
    
    moveUp(){
        this.posY -= this.h;
    }
    moveDown(){
        this.posY += this.h;
    }
    moveLeft(){
        this.posX -= this.w;
    }
    moveRight(){
        this.posX += this.w;
    }
    // drawPlayer(context){// this take the global context variable to draw player
    //     context.fillStyle = this.color;
    //     context.fillRect(this.x, this.y, this.w, this.h);
    // }
    
    
}


//========================THE GAME================================
window.addEventListener("load", WindowLoaded, false);

//this Debugger would post with a console log
//relative message to the state of game
var Debugger = function () { };
Debugger.log = function (message) {
   try {
      console.log(message);
   } catch (exception) {
      return;
   }
}


//Once the window is loaded this function would execute the game
function WindowLoaded (){
    avaGame();

}

function avaGame(){    
    //This is the main function and here would be the global variables
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

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


    // lets crete the game area
    let gameArea = new Map(10,10,64,64,map,context);

    let weapons = [];//into this array (weapon[0]) is the basic weapon for the base player damage
    let players = [];

    let tileSheet = new Image();//Actually this is the tilesheet image for the map
    tileSheet.addEventListener('load', drawGame, false);
    tileSheet.src = '../img/tilesheet.png'

    let imgp1 = new Image();
    imgp1.onload = imgLoaded();
    imgp1.src = '../img/playerA.png';

    let imgp2 = new Image();
    imgp2.onload = imgLoaded();
    imgp2.src =  '../img/playerB.png';

    function imgLoaded(){
        console.log('image loaded');
    }


    //Now we must create some weapons to push on the weapons[] empty array
    let tomatoe = new Weapon('b',0,0,64,64,'brown','tomatoe',10);
    weapons.push(tomatoe);
    let banana = new Weapon('b',0,0,64,64,'yellow','banana',50);
    weapons.push(banana);
    let pera = new Weapon('b',0,0,64,64,'red','pera',60);
    weapons.push(pera);
    let papaya = new Weapon('b',0,0,64,64,'orange','papaya',60);
    weapons.push(papaya);

    Debugger.log('weapons had been created: ');
    console.log(weapons);

    //As the weapons Objects we could push the players into an empty array
    // in this case the players[] array
    let carlitos = new Player('a',0,0,64,64,'black','carlitos',weapons);
    players.push(carlitos);
    let lucifera = new Player('c',0,0,64,64,'white','Lucifera',weapons);
    players.push(lucifera);

    Debugger.log('players are on the arena: ');
    console.log(players);

    let p1 = carlitos;
    let p2 = lucifera;
    //============= position on map displayed on console ================
    console.log('the id of player 1 is: '+p1.tileId);
    console.log('the id of player 2 is: '+p2.tileId);

    console.log('the tile id of weapon  '+p1.weaponArr[1].tileId);


    console.log('the id of '+ weapons[0].x+' is: '+weapons[0].tileId);
    console.log('the id of '+ weapons[1].name+' is: '+weapons[1].tileId);
    console.log('the id of '+ weapons[2].name+' is: '+weapons[2].tileId);
    console.log('the id of '+ weapons[3].name+' is: '+weapons[3].tileId);
    //===================================================================

    Debugger.log('DrawingCanvas');

    //=================================================================
    function clearCanvas(){
        context.clearRect(0,0,canvas.width,canvas.height);
        // Debugger.log('clearing Canvas');
    }


    // function drawMap(){

    //     for(let rowId = 0; rowId<gameArea.rows; rowId++){
    //         for(let colId = 0; colId<gameArea.cols; colId++){
    //             // let tileId = Math.floor(Math.random()*100 + gameArea.mapIO); // lol
    //             let tileId = gameArea.mapArr[rowId][colId] + gameArea.mapIO;
    //             let srcX = Math.floor(tileId % 10) * 64;
    //             let srcY = Math.floor(tileId / 10) * 64;
    //             context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);

    //         }                
    //     }
    // }

    //======================TURN MECHANISM=============================
    let moveCounter = 0;
    let playerId = 0;
    let turnChange = false;

    window.addEventListener('keydown', function(e){movement(players[playerId],e)});
    
    function movement(obj,e){

        switch(e.keyCode){
            case 87://up arrow (W)
            obj.moveUp();
            moveCounter +=1;
            break;

            case 83://down arrow (S)
            obj.moveDown();
            moveCounter +=1;
            break;

            case 65://left arrow (A)
            obj.moveLeft();
            moveCounter +=1;
            break;

            case 68://right arrow (D)
            obj.moveRight();
            moveCounter +=1;
            break;

            case 13:// Enter keyboard, this to switch immediatly to another player
            moveCounter +=3;
            break;

            case 72: // Key (H) to take weapon
            // getWeapon(players,weapons);
            obj.getWeapon();
            

            break;

        }
        if(moveCounter >= 3){

            playerId ++;
            
            moveCounter = 0;

            

            if (playerId >= players.length){
                
                 playerId = 0;
            }
            alert('Player '+(players[playerId].name)+ ' Turn!!');
            console.log('the player on Array is: '+playerId);
            console.log(players);
            // console.log('switch to player '+ (playerId +1));
            // console.log('the movecounter now: '+moveCounter);
            
            // console.log('the movecounter then: '+moveCounter);
        }
        
        return playerId;
    }
    console.log('the pid is: '+playerId);

    //the next function are activated on the keboard control (H) to take weapon
    // THIS FUNCTION WAS INSERTED AS METHOD ON PLAYER CLASS
    // function getWeapon(playerArr,weapArray){
    //     //loop to go inside the arrays of players[] and weapons[] to evaluate the coordinates
    //     // of each object when player are over the weapon so this would return the 
    //     //object to pass into the constructor of player
    //     // If the coords are not equals return de default value of player the weapon[0] with base damage
    //     for(let p = 0; p < playerArr.length; p++){
    //         for(let i=0; i < weapArray.length; i++){
    //             if( playerArr[p].x == weapArray[i].x && playerArr[p].y == weapArray[i].y){
    //                 playerArr[p].weapon = weapArray[i];
    //             }else{
    //                 playerArr[p].weapon;
    //             }           
    //          }
    //          console.log(playerArr[p].name+' did take the '+playerArr[p].weapon.name);
    //     }
        
    // }

    function updWeapon(){
        // console.log('Look the Id of first p '+p1.getId());
        // console.log('Look the Id of first p '+p2.getId());
        // console.log('Look the Id of weapon p '+weapons[1].getId());
        if(p1.getId()== p2.getId()){
            console.log('BOOOOOOOOOOOOOOOOOOOOOOOOOOOM');
        }
    }

    
    //=======THE GAME AND COMPONENTS READY TO BE DRAWED=============

    function drawGame(){

        function drawComponents(){
            weapons[0].drawIt(context);
            weapons[1].drawIt(context);
            weapons[2].drawIt(context);
            weapons[3].drawIt(context);
        }
        function drawPlayers(){
            p1.newPos();
            p2.newPos();
            p1.drawP(context,imgp1);
            p2.drawP(context,imgp2);
            
            // getWeapon(players,weapons);
            
        }
        
        gameArea.drawMap(tileSheet);
        drawComponents();
        updWeapon();
        drawPlayers();

    }
    //===========THE GAME LOOP============================
    let myRaf;
    function updateGame(){
        myRaf = requestAnimationFrame(updateGame);

        clearCanvas();//this clear the canvas
        
        drawGame();//this draw the canvas again with positions updated
    }
    //============================
    
    
    // drawGame();
    myRaf = requestAnimationFrame(updateGame);
    



}//end of game app
