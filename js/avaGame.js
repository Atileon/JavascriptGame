//there would be 
// a main class or function to recall the game itself
//Into the game there must be:
//    -A class Map to generate a map from an array
//    -A class Component to generalize position an dimensions for any element
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
    constructor(area = 'a',width,height,color){
        // The area variable will set the area where the component would be deployed
        this.area = area;

        //next 3 lines to set a random position for the players
        this.startId = this.startArea();// this simply to set an tile to deploy component followin the starArea method
        this.x = this.getX();
        this.y = this.getY();
        
        this.w = width;
        this.h = height;
        this.color = color;

        this.tileId = this.getId();
    }
    getX(){
        let coordX = Math.floor(this.startId % 10)*64;//value on X axis
        return this.x = coordX
    }
    getY(){
        let coordY = Math.floor(this.startId / 10)*64;//value on Y axis
        return this.y = coordY
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
    drawIt(){
        let context = canvas.getContext('2d');
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }

}

class Weapon extends Component {
    constructor(area,width,height,color,name, damage){
        super(area,width,height,color);
        this.name = name;
        this.damage = damage;
    }
    
}
class Obstacle extends Component{
    constructor(area,width,height, color,weaponArr){
        super(area,width,height,color);
        this.weapons = weaponArr;
    }

    startObst(){
        for(let weapon of this.weapons){
            if(this.startId == weapon.startId){
                console.log('the start obst is '+this.startId);
                let newStart = this.startArea();
                this.startId = newStart;
                this.x = this.getX();
                this.y = this.getY();
                console.log('the start obst changed to'+this.startId)
                return this.startId;
            }
        }
    }
    
}

class Player extends Component {
    
    constructor(area,width,height,color,name,weapons){
        super(area,width,height,color);
        this.enemy = this.nemesis;
        this.name = name;
        this.health = 100;
        this.weaponArr = weapons;
        this.weapon = this.weaponArr[0];
        this.damageP = this.weapon.damage;
        this.defense = false;
        // this.upgradeWeapon = this.weaponNew();s
    }
    get nemesis(){
       return this.enemy;
    }
    set nemesis(val){
        this.enemy = val;
    }
    healthPlayer(){
        this.health = this.health;
        console.log(this.health);
    }
    attack(){

        let container = document.getElementById('log-container');
        let pElement = document.createElement('p');

        container.innerHTML = '';
        
        
        this.enemy.hit = this.damageP;        
        if(this.enemy.defense){
            this.enemy.hit = (this.damageP /2);
            this.enemy.defense = false;
        }
        this.enemy.health -= this.enemy.hit;
        console.log('hit on: '+this.enemy.name+ ' is '+this.enemy.hit);
        console.log('enemy health: '+this.enemy.health);

        pElement.id = `${this.name}-attack`;
        pElement.textContent = `> ${this.name} has attacked ${this.enemy.name} !! Now ${this.enemy.name}'s health is ${this.enemy.health} __`;
        container.appendChild(pElement);
    }
    shield(){
        this.defense = true;
        console.log('the shield is: '+this.defense);
    }
    
    drawP(img){// this take the global context variable to draw Component
        let context = canvas.getContext('2d');
        context.drawImage(img, this.x, this.y, this.w, this.h);
        // context.setTransform(1, 0, 0, 1, 0, 0);
    }

    // FOR PRESENTATION
    getWeapon(){

        for(let i=0; i < this.weaponArr.length; i++){
            if( this.getId() == this.weaponArr[i].getId()){
                let droped = this.weapon;// current weapon to be droped
                this.weapon = this.weaponArr[i]; //this take the new weapon

                this.damageP = this.weaponArr[i].damage;
                console.log( this.weapon.name);
                this.weaponArr[i] = droped;
                this.weaponArr[i].x = this.x;
                this.weaponArr[i].y = this.y;

                this.weaponArr[i].drawIt();
                console.log(this.weaponArr[i]);
                
            }else{    
                this.weapon;
            }           
         }
         console.log(this.name+ ' takes the weapon : '+ this.weapon.name);

    }
    newPos(){

        this.x = this.x;//position updated on X
        this.y = this.y;//position updated on Y

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
        // =================
        // for(let i= 0; i < this.weaponArr.length;i++){
            
        //     if((this.x + this.w) > this.weaponArr[i].x
        //         && this.x < (this.weaponArr[i].x + this.w)
        //         && this.y == this.weaponArr[i].y){
        //             console.log('current value of x now! ' +this.x);
        //             this.x = this.x; 
        //             this.y = this.y;
        //         }
        // }
    }
    moveUp(){
        this.y -= this.h;
    }
    moveDown(){
        this.y += this.h;
    }
    moveLeft(){
        this.x -= this.w;
    }
    moveRight(){
        this.x += this.w;
    }
    
}


//========================THE GAME================================
window.addEventListener("load", WindowLoaded, false);


//Once the window is loaded this function would execute the game
function WindowLoaded (){
    avaGame();

}

function avaGame(){    
    //This is the main function and here would be the global variables
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let map = [
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
        [21,21,21,21,21,21,21,21,21,21],
    ];


    // lets crete the game area
    let gameArea = new Map(10,10,64,64,map,context);

    let weapons = [];//into this array (weapon[0]) is the basic weapon for the base player damage
    let players = [];
    let obstacles = [];

    let allComponents;
    let images = [];

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
    let tomatoeOne = new Weapon('b',64,64,'pink','tomatoe',10);
    weapons.push(tomatoeOne);
    let tomatoeTwo = new Weapon('b',64,64,'red','tomatoe',10);
    weapons.push(tomatoeTwo);
    let banana = new Weapon('b',64,64,'yellow','banana',30);
    weapons.push(banana);
    let coco = new Weapon('b',64,64,'brown','coco',30);
    weapons.push(coco);
    let papaya = new Weapon('b',64,64,'orange','papaya',50);
    weapons.push(papaya);
    let lemon = new Weapon('b',64,64,'green','lemon',50);
    weapons.push(lemon);

    console.log('weapons has been created: ');
    console.log(weapons);

    let obst1 = new Obstacle('b',64,64,'gray',weapons);
    obstacles.push(obst1);
    let obst2 = new Obstacle('b',64,64,'gray',weapons);
    obstacles.push(obst2);
    let obst3 = new Obstacle('b',64,64,'gray',weapons);
    obstacles.push(obst3);
    let obst4 = new Obstacle('b',64,64,'gray',weapons);
    obstacles.push(obst4);
    let obst5 = new Obstacle('b',64,64,'gray',weapons);
    obstacles.push(obst5);

    console.log('obstacles has been created: ');
    console.log(obstacles);

    //As the weapons Objects we could push the players into an empty array
    // in this case the players[] array
    let kevin = new Player('a',64,64,'black','kevin',weapons);
    players.push(kevin);
    let stuart = new Player('c',64,64,'white','stuart',weapons);
    players.push(stuart);

    kevin.nemesis = stuart;
    stuart.nemesis = kevin;

    allComponents = players.concat(weapons,obstacles);

    console.log('players are on the arena: ');
    console.log(players);

    let p1 = kevin;
    let p2 = stuart;

    let fight = false;
    let dontMove = false;
    //============= position on map displayed on console ================
    console.log('the id of player 1 is: '+p1.tileId);
    console.log('the id of player 2 is: '+p2.tileId);


    console.log('the id of '+ weapons[0].name+' is: '+weapons[0].tileId);
    console.log('the id of '+ weapons[1].name+' is: '+weapons[1].tileId);
    console.log('the id of '+ weapons[2].name+' is: '+weapons[2].tileId);
    console.log('the id of '+ weapons[3].name+' is: '+weapons[3].tileId);
    console.log('the id of '+ weapons[4].name+' is: '+weapons[4].tileId);
    //===================================================================

    console.log('DrawingCanvas');

    //======================= Clear Canvas Fn =========================
    function clearCanvas(){
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    //======================TURN MECHANISM=============================

    // Global Variables
    let moveCounter = 0;
    let playerId = 0;
    let turnChange = false;

    window.addEventListener('keydown', function(e){movement(players[playerId],e)});
    
    function movement(obj,e){
        let currentX = obj.x; //current position of player on X
        let currentY = obj.y; //current position of player on Y
        
        switch(e.keyCode){
            case 87://up arrow (W)
            obj.moveUp();
            moveCounter +=1;
            break
           
            case 83://down arrow (S)
            obj.moveDown();
            moveCounter +=1;
            break;
            
            case 65://left arrow (A)
            obj.moveLeft();
            moveCounter +=1;
            console.log('now'+obj.name+'is at '+obj.x);
            break;
            
            case 68://right arrow (D)
            
            if(dontMove == false){
                obj.moveRight();
            moveCounter +=1;
            break;
            }
            

            // Enter keyboard, this to switch immediatly to another player
            case 13:
            moveCounter +=3;
            break;

            case 72: // Key (H) to take weapon
            obj.getWeapon();
            break;

            case 78:// Key (N) to attack
            if(fight){
                obj.attack();

            moveCounter +=3;
            break;
            }
                        
            case 77: // Key (M) to activate defense shield
            if(fight){
                obj.shield();
            moveCounter +=3;
            break;
            }
            
        }

        
        
        // ==== The tile collision for players fight event
        if(p1.getId() == p2.getId()){
            fight = true;
            console.log('fight!!!!');
           
            
        }else{
            fight = false;
            
            console.log('fight false');
        }

        // The collision with other components

        for(let i= 0; i < obstacles.length;i++){
            
                if((obj.x + obj.w) > obstacles[i].x
                    && obj.x < (obstacles[i].x + obj.w)
                    && obj.y == obstacles[i].y){
                        // console.log('current value of x now! ' +obj.x);
                        obj.x = currentX; 
                        obj.y = currentY;
                        moveCounter -=1;// this to decrease by 1 the moveCounter increased by keydown
                        console.log (moveCounter);
                    }
            }

        // this could increment the movecounter to switch player
        if(moveCounter >= 3){

            playerId ++;
            moveCounter = 0;

            if (playerId >= players.length){
                 playerId = 0;
            }

            alert('Player '+(players[playerId].name)+ ' Turn!!');
            console.log('the player on Array is: '+playerId);
            console.log(players);

        }
        
        return playerId;
    }
    // console.log('the pid is: '+playerId);

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
    function takeWeapon(){
        for(let player of players){
            for(let weapon of weapons){
                if(player.tileId == weapon.startId){
                    player.getWeapon();
                    console.log('event weapon occurs');
                    break;
                }
            }
        }
    }

    //=======THE GAME AND COMPONENTS READY TO BE DRAWED=============


    // function preventOverlay(arr){
    //     for(let i = 1; i<=arr.length; i++){
    //         if(arr[i-1].startId == arr[i].startId){
    //             console.log('ouch!! collition on '+arr[i].name + arr[i].startId);
    //             arr[i].startId = arr[i].startArea();
    //             console.log('position changed on '+arr[i].name + arr[i].startId);
    //             arr[i].x = arr[i].getX();
    //             arr[i].y = arr[i].getY();
    //             arr[i].drawIt();
    //         }else if(arr[i].startId == arr[i].startId){
    //             arr[i].drawIt();
    //         }
    //     }
    // }

    function drawGame(){
        

        function drawComponents(){
            // for(let weapon of weapons){// Thanks ES2015 :)
            //     if(!weapon[0]){
            //         weapon.drawIt();
            //     }
            // }
            weapons[2].drawIt(context);
            weapons[3].drawIt(context);
            weapons[4].drawIt(context);
            weapons[5].drawIt(context);

            for( let obst of obstacles){
                obst.startObst();
                obst.drawIt();
            }
        }
        function drawPlayers(){

            for(let player of players){
                player.newPos();
                
            }
            // p1.newPos();
            // p2.newPos();
            p1.drawP(imgp1);
           
            p2.drawP(imgp2);

        }

        gameArea.drawMap(tileSheet);
        drawComponents();
        drawPlayers();
        
        // takeWeapon();
    }

    //=============The Game Over===============
    //this just check for players health to get the Game over
    // after the alert the browser will refresh begining a new battle
    function gameOver(){
        if(p1.health <= 0 || p2.health <= 0){
            alert('GAME OVER');// Alert message for the Game Over

            //This for loop set the health of players to 1 to get the alert False
            for(let player of players){
                player.health = 1;
            }
            //after the for loop we Restart the game when the Alert has been closed
            location.reload(true);
        }
    }

    //===========THE GAME LOOP============================
   
    function updateGame(){
        requestAnimationFrame(updateGame);
        gameOver(); 
        clearCanvas();//this clear the canvas
        
        drawGame();//this draw the canvas again with positions updated
    }

    updateGame();

}//end of game app
