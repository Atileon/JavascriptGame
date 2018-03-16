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

//=========================CLASSES==============================
class Map {
    constructor(cols,rows,tileW,tileH,arr,ctx){
        this.cols = cols;
        this.rows = rows;
        this.tileW = tileW;
        this.tileH = tileH;
        this.mapArr = arr; //this is for the map array
        this.context = ctx;
        this.mapIO = -1; //this is the index offset for the map array
    }
    
}

class Component{
    constructor(x,y,width,height,color){
        this.x = x;
        this.y = y;
        this.w = width;
        this.h = height;
        this.color = color;
        this.moveX = 0;
        this.moveY = 0;
    }
    drawIt(context){// this take the global context variable to draw Component
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

}

class Weapon extends Component {
    constructor(x,y,width,height,color,name, damage){
        super(x,y,width,height,color);
        this.name = name;
        this.damage = damage;
    }
    
}

class Player extends Component {
    constructor(x,y,width,height,color,name,weaponObj){
        super(x,y,width,height,color);
        //next 3 lines to set a random position for the players
        let tileId = Math.floor(Math.random()*100-1);
        this.x = Math.floor(tileId % 10)*64;//value on X axis
        this.y = Math.floor(tileId / 10)*64;//value on Y axis

        this.name = name;
        this.health = 100;
        this.weapon = weaponObj;
        this.damage = weaponObj.damage;
        this.posX = this.x;//initial position on X
        this.posY = this.y;//initial position on Y
    }
    // randPos(){
    //     let tileId = Math.floor(Math.random()*100-1);
    //     this.x = Math.floor(tileId % 10)*64;
    //     this.y = Math.floor(tileId / 10)*64;
    //     return this;
    // }
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


//========================================================
window.addEventListener("load", WindowLoaded, false);

//this Debugger would catch with a function/behavior 
//relative message to the console
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

    let now;
    let dt = 0;
    let lastT = performance.now();

    
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
    //time Settings
    let startTime = -1;
    let transitionLength = 500;// milliseconds



    // lets crete the game area
    let gameArea = new Map(10,10,64,64,map,context);

    let weapons = [];
    let players = [];

    let tileSheet = new Image();
    tileSheet.addEventListener('load', drawGame, false);
    tileSheet.src = '../img/tilesheet.png'
    //Now we must create some weapons to push on the weapons empty array
    let mazza = new Weapon(64,64,64,64,'red','mazza',35);
    weapons.push(mazza);
    let banana = new Weapon(384,384,64,64,'yellow','banana',50);
    weapons.push(banana);
    let whipe = new Weapon(576,576,64,64,'green','whipe',60);
    weapons.push(whipe);

    Debugger.log('weapons had been created: ');
    console.log(weapons);

    //As the weapons Objects we could push the players into an empty array
    // in this case the players array
    let carlitos = new Player(0,0,64,64,'black','carlitos',weapons[0]);
    players.push(carlitos);
    let lucifera = new Player(0,0,64,64,'violet','Lucifera',weapons[0]);
    players.push(lucifera);

    Debugger.log('players are on the arena: ');
    console.log(players.length);

    let p1 = carlitos;
    let p2 = lucifera;



    Debugger.log('DrawingCanvas');

    //=================================================================
    function clearCanvas(){
        context.clearRect(0,0,canvas.width,canvas.height);
        // Debugger.log('clearing Canvas');
    }


    function drawMap(){

        for(let rowId = 0; rowId<gameArea.rows; rowId++){
            for(let colId = 0; colId<gameArea.cols; colId++){
                // let tileId = Math.floor(Math.random()*100 + gameArea.mapIO); // lol
                let tileId = gameArea.mapArr[rowId][colId] + gameArea.mapIO;
                let srcX = Math.floor(tileId % 10) * 64;
                let srcY = Math.floor(tileId / 10) * 64;
                context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);

            }                
        }
    }

    //turn mechanism TODO
    let moveCounter = 0;
    let playerId = 0;
    window.addEventListener('keydown', function(e){movement(players[playerId],e)});
    
    function movement(obj,e){

        switch(e.keyCode){
            case 38://up arrow
            obj.moveUp();
            moveCounter +=1;
            break;
            case 40://down arrow
            obj.moveDown();
            moveCounter +=1;
            break;
            case 37://left arrow
            obj.moveLeft();
            moveCounter +=1;
            break;
            case 39://right arrow
            obj.moveRight();
            moveCounter +=1;
            break;
            case 13:// Enter keyboard, this to switch immediatly to another player
            moveCounter +=3;
            break;
        }
        console.log('here the player is: '+playerId);
        if(moveCounter >= 3){
                
            playerId ++;
            console.log('the player on Array is: '+playerId);

            if (playerId == players.length){

                playerId = 0;
            }
            console.log('switch to player '+ playerId);
            console.log('the movecounter now: '+moveCounter);
            moveCounter = 0;
            console.log('the movecounter then: '+moveCounter);
        }

        return playerId;
    }

    
    //==================================================
    function drawGame(){

        function drawComponents(){
            mazza.drawIt(context);
            banana.drawIt(context);
            whipe.drawIt(context);
        }
        function drawPlayers(){
           
            p1.drawIt(context);
            p2.drawIt(context);
        }

       drawMap();
       drawComponents();
       drawPlayers();
    }

    function updateGame(){
        requestAnimationFrame(updateGame);

        
        clearCanvas();//this clear the canvas
        p1.newPos();
        p2.newPos();//this take the new position after mouse input on canvas for player 1
        drawGame();//this draw the canvas again with positions updated
       
    }
    //============================
    //keyboard Controll
    
    // movement(p2);
    
    

    drawGame();
    updateGame();
    



}//end of game app
