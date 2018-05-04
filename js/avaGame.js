//there would be 
// a main class or function to recall the game itself
//Into the game there must be:
//    -A class Map to generate a map from an array
//    -A class Component to generalize position an dimensions for any element
//    -An extended from Component class for Players 
//    -An extended from Component class for Weapons
//    -An extended from Component class for Obstacles
//
// After creation of this classes I must to create some functions to:
//    -Initialize the game
//    -create the map on canvas
//    -create the player Obj
//    -create weapons on map
//    -update all functions with current/updated values
'use strict';
//=========================CLASSES==============================
class Map {
    constructor(cols,rows,tileW,tileH,arr,ctx){
        this.cols = cols;//columns of map
        this.rows = rows;//rows of map
        this.tileW = tileW;// dimension of tiles on X
        this.tileH = tileH;// dimension of tiles on Y
        this.mapArr = arr; //this is for the map array which would be a bidimensional array 'arr[][]'
        this.context = ctx;//canvas context passed into a variable
        this.mapIdxOffset = -1; //this is the index offset for the map array 
    }
    drawMap(tileSheet){
        // This method will draw the map 
        // and there's need just of a tilesheet image declared into a variable
        // to pass into this method
        //===================================
        //The following for loops get coords of the tilesheet to be drawn on the relative position on board

        //So, this for pass through the rows of the tilesheet 
        for(let rowId = 0; rowId<this.rows; rowId++){
            //And this for trhough the cols of tilesheet
            for(let colId = 0; colId<this.cols; colId++){
                // the tileId is the number of cell at the Tilesheet which are represented starting at 
                // number 1 just for a visual refer to the tilesheet itself. 
                //Thus with the following variable we get the tile Id (see ref. at README.md) to be drawn
                // and substract with the index offset(mapIdxOffset) for the real value on the array
                let tileId = this.mapArr[rowId][colId] + this.mapIdxOffset;
                //For a better explanation about the following 2 variables go to:
                // https://youtu.be/69dHLDT0Eco?t=12m35s
                let srcX = Math.floor(tileId % 10) * 64;//The srcX give us the Source coordinate on X on the tilesheet
                let srcY = Math.floor(tileId / 10) * 64;//The srcY give us the Source coordinate on Y on the tilesheet
                //To draw the image we got to use the drawImage for canvas context
                //Refers on Mozilla developer Network: 
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                this.context.drawImage(tileSheet, srcX, srcY, 64,64, colId*64, rowId*64,64,64);
            }
        }
    }
}//end Map class

class Component{
    constructor(area = 'a',width,height,color){
        // The area variable will set the area where the component would be deployed
        this.area = area;
        //next 3 lines to set a random position for the players
        this.startId = this.startArea();// this simply to set an tile to deploy component followin the starArea method
        this.x = this.getX();// Once the startId is calculated this gets the relative coord on X
        this.y = this.getY();// Once the startId is calculated this gets the relative coord on Y
        this.w = width;// width of component 
        this.h = height;// height of component
        this.color = color; // a fallback color because of future improvements any component will be drawn with image
        // The tileId give us the "visual" Id on map and allow us to use it to compare positions with any other
        // component on game
        this.tileId = this.getId();
    }
    getId(){
        //this method could get us the Tile Id on Map to 
        //compare with any other element to get || fight || detect collition
        this.tileX = Math.floor(this.x/this.w);
        this.tileY = Math.floor(this.y/this.h);
        this.tileId = Math.floor(this.tileY * 10)+ this.tileX;
        return this.tileId;
    }
    drawIt(){
        // This simply draw the Component on canvas
        let context = canvas.getContext('2d');
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.w, this.h);
    }
    startArea(){
        // this method give the component an area to start on map
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
    }
    getX(){
        //This method just to obtain the X coordinate
        let coordX = Math.floor(this.startId % 10)*64;//value on X axis
        return this.x = coordX
    }
    getY(){
        let coordY = Math.floor(this.startId / 10)*64;//value on Y axis
        return this.y = coordY
    }
    
}//end Component class

class Weapon extends Component {
    constructor(area,width,height,color,name, damage){
        super(area,width,height,color);
        this.name = name;// the name of Weapon
        this.damage = damage;// the damage of Weapon
    }
    
}//end Weapon class
class Obstacle extends Component{
    constructor(area,width,height, color,weaponArr){
        super(area,width,height,color);
        //The Obstacle Object takes the Weapons array to prevent overlay with Weapons objects
        this.weapons = weaponArr;
    }

    startObst(){
        //This method let us draw the obstacle on map preventing the overlay with weapons
        for(let weapon of this.weapons){
            //So if the start Id of weapons and obstacles are equals...
            if(this.startId == weapon.startId){
                console.log('==Obstacle at Start Collision==');
                console.log(`Obstacle started at id ${this.tileId}`);
                // ... the statement recalculate for a new start Id when game starts
                let newStart = this.startArea();
                // ... so, new start are passed at constructor for a new start Id 
                this.startId = newStart;
                // ... then we can get new coordinates with the new startId 
                // using the respective methods for X and Y values
                this.x = this.getX();
                this.y = this.getY();
                
                console.log(`So, Obstacle moves on id ${this.startId}`)
            }
        }
    }
    
}//end Obstacle class

class Player extends Component {
    
    constructor(area,width,height,color,name,weaponsArr,startWeapon){
        super(area,width,height,color);
        this.enemy = this.nemesis; //this to set the enemy object (another player object)
        this.name = name; // Name of player
        this.health = 100; // The health of players are 100 by default
        this.weaponArr = weaponsArr; // Here will be passed the weapons array to iterate
        this.weapon = this.weaponArr[startWeapon]; // This sets the basic weapon when game starts
        this.damageP = this.weapon.damage; // This takes the damage value of current weapon
        this.defense = false;// This is the shield of player, if activated this turns True;
    }
    get nemesis(){
       return this.enemy;
    }
    set nemesis(val){
        this.enemy = val;
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
        pElement.textContent = `
        > ${this.name.toUpperCase()} has attacked ${this.enemy.name.toUpperCase()} !! 
        Now ${this.enemy.name.toUpperCase()}'s health is ${this.enemy.health} __
        `;//close template literal
        container.appendChild(pElement);
    }
    shield(){
        this.defense = true;
        console.log('the shield is: '+this.defense);
    }
    
    drawP(img){// this take the global context variable to draw Component
        let context = canvas.getContext('2d');
        context.drawImage(img, this.x, this.y, this.w, this.h);
    }

    // FOR PRESENTATION
    getWeapon(){
        

        for(let i=2; i < this.weaponArr.length; i++){
            if( this.getId() == this.weaponArr[i].getId()){
                let droped = this.weapon;// current weapon to be droped
                this.weapon = this.weaponArr[i]; //this take the new weapon

                this.damageP = this.weaponArr[i].damage;
                console.log( this.weapon.name);
                this.weaponArr[i] = droped;
                this.weaponArr[i].x = this.x;
                this.weaponArr[i].y = this.y;

                this.weaponArr[i].drawIt();
                console.log(this.weaponArr[i].name);
                
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
    
}//end Player class


//========================THE GAME================================
window.addEventListener("load", WindowLoaded, false);

//Once the window is loaded this function would execute the game
function WindowLoaded (){
    avaGame();
}
// Here starts the game app
function avaGame(){    
    //This is the main function and here would be the global variables
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let map = [
        [21,21,21,21,21,21,21,21,21,21],
        [18,18,18,18,18,18,18,18,18,18],
        [11,11,11,11,11,11,11,11,11,11],
        [11,11,11,11,11,11,11,11,11,11],
        [11,11,11,11,11,11,11,11,11,11],
        [11,11,11,11,11,11,11,11,11,11],
        [11,11,11,11,11,11,11,11,11,11],
        [11,11,11,11,11,11,11,11,11,11],
        [19,19,19,19,19,19,19,19,19,19],
        [21,21,21,21,21,21,21,21,21,21],
    ];


    // lets crete the game area
    let gameArea = new Map(10,10,64,64,map,context);

    let weapons = [];//into this array the first two weapons are the basic weapon for the base player damage
    let players = [];// here would be pushed the players
    let obstacles = [];//here would be pushed the obstacles

    // let images = [];

    let tileSheet = new Image();//Actually this is the tilesheet image for the map
    tileSheet.addEventListener('load', drawGame, false);
    tileSheet.src = '../img/tilesheet.png'

    let imgp1 = new Image();
    imgp1.onload = imgLoaded();// Just to console when loaded
    imgp1.src = '../img/playerA.png';

    let imgp2 = new Image();
    imgp2.onload = imgLoaded();// Just to console when loaded
    imgp2.src =  '../img/playerB.png';

    function imgLoaded(){
        console.log('image loaded');
    }
    
    // CREATE WEAPONS: constructor(area,width,height,color,name, damage)
    //Now we must create some weapons to push on the weapons[] empty array
    // The first Two weapons would be basic weapons and would be passed at
    // Players constructor as the last argument
    let tomatoe = new Weapon('b',64,64,'red','tomatoe',10);
    weapons.push(tomatoe);
    let apple = new Weapon('b',64,64,'green','apple',10);
    weapons.push(apple);
    //================================================================
    //The following weapons are the upgraded weapons to be drawn on board
    let banana = new Weapon('b',64,64,'yellow','banana',30);
    weapons.push(banana);
    let coco = new Weapon('b',64,64,'brown','coco',30);
    weapons.push(coco);
    let papaya = new Weapon('b',64,64,'orange','papaya',50);
    weapons.push(papaya);
    let lemon = new Weapon('b',64,64,'greenyellow','lemon',50);
    weapons.push(lemon);

    console.log('weapons has been created: ');
    console.log(weapons);

    // CREATE OBSTACLES: constructor(area,width,height, color,weaponArr)
    // These would be pushed into another array for obstacles
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

    // CREATE PLAYERS : constructor (area,width,height,color,name,weaponsArr,startWeapon)
    //As the weapons Objects we could push the players into an empty array
    // in this case the players[] array
    let kevin = new Player('a',64,64,'black','kevin',weapons,0);
    players.push(kevin);
    let stuart = new Player('c',64,64,'white','stuart',weapons,1);
    players.push(stuart);

    //The following to set the enemy for any player
    kevin.nemesis = stuart;
    stuart.nemesis = kevin;


    console.log('players are on the arena: ');
    console.log(players);

    let p1 = kevin;
    let p2 = stuart;

    let fight = false;
    let dontMove = false;
    //============= position on map displayed on console ================
    console.log('the id of player 1 is: '+p1.tileId);
    console.log('the id of player 2 is: '+p2.tileId);


    // console.log(`Start Id of ${weapons[0].name} is ${weapons[0].tileId}`);
    // console.log(`Start Id of ${weapons[1].name} is ${weapons[1].tileId}`);
    console.log(`Start Id of ${weapons[2].name}(${weapons[2].color}) is ${weapons[2].tileId}`);
    console.log(`Start Id of ${weapons[3].name}(${weapons[3].color}) is ${weapons[3].tileId}`);
    console.log(`Start Id of ${weapons[4].name}(${weapons[4].color}) is ${weapons[4].tileId}`);
    console.log(`Start Id of ${weapons[5].name}(${weapons[5].color}) is ${weapons[5].tileId}`);

    //======================TURN MECHANISM=============================

    // Global Variables
    let moveCounter = 0;
    let playerId = 0;

    window.addEventListener('keydown', function(e){movement(players[playerId],e)});
    
    function movement(obj,e){
        let currentX = obj.x; //current position of player on X
        let currentY = obj.y; //current position of player on Y
        
        switch(e.keyCode){
            //up arrow (W)
            case 87:
            obj.moveUp(); //player method
            moveCounter +=1;// to switch player
            break;
            //down arrow (S)
            case 83:
            obj.moveDown();
            moveCounter +=1;
            break;
            //left arrow (A)
            case 65:
            obj.moveLeft();
            moveCounter +=1;
            break;
            //right arrow (D)
            case 68:
            obj.moveRight();
            moveCounter +=1;
            break;
            // Key (Enter), this to switch immediatly to another player
            case 13:
            moveCounter +=3;
            break;
            // Key (H) to take weapon
            case 72: 
            obj.getWeapon();
            break;
            // Key (N) to attack
            case 78:
            if(fight){
                obj.attack();
                moveCounter +=3;
                break;
            }
            // Key (M) to activate defense shield
            case 77:
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

            playerId ++;// this switch to next player
            moveCounter = 0;// this would be the first player

            if (playerId >= players.length){
                 playerId = 0; // this return to first player
            }

            alert('Player '+(players[playerId].name.toUpperCase())+ ' Turn!!');
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
    

    //=======THE GAME AND COMPONENTS READY TO BE DRAWED=============

    //======================= Clear Canvas Fn =========================
    function clearCanvas(){
        context.clearRect(0,0,canvas.width,canvas.height);
    }

    function drawGame(){
        // Let's Draw the Game!!
        // takeWeapon();
        //====================================================
        //This Fn will draw the weapons and obstacles objects
        function drawComponents(){
            //== In case of WAR Break this comments to get all WEAPONS lol==
            // for(let weapon of weapons){// Thanks ES2015 :)
            //         weapon.drawIt();
            // }

            //This for loop because we dont want the first (basic) weapon on board
            for(let i = 2; i<weapons.length; i++){
                weapons[i].drawIt();
            }
            
            //Let's draw the obstacles!!
            for( let obst of obstacles){
                //This will first detect collision with weapons objects
                //Look into the Player method class
                obst.startObst();
                //Then Obstacles will be draw on board
                obst.drawIt();
            }
        }

        //================================================
        //This Fn draw both players
        function drawPlayers(){

            for(let player of players){
                //This to update position of both players
                player.newPos();
            }
            //Draw Player 1 passing the image variable on drawP() method
            p1.drawP(imgp1);
           //Draw Player 2 passing the image variable on drawP() method
            p2.drawP(imgp2);
        }
        //================================
        //Thus just call the previous functions to draw Game

        //This draw the map with the tile sheet passed on method as a variable
        gameArea.drawMap(tileSheet);
        drawComponents();
        drawPlayers();

    }

    //=============The Game Over===============
    //This just check for players health to get the Game over alert.
    //After the alert the browser will refresh begining a new battle. TADAAA!
    //Another War for the Minions... papaya!
    function gameOver(){
        function winner(element){
            let player = element;
            let container = document.getElementById('winner-cont');
            
            container.classList.add('appear');
            container.textContent = `${player.enemy.name} Wins!`;
        }
        function restart(){
            alert(`Prepare for a new Battle`);
            location.reload(true);
        }
        for(let player of players){
            if(player.health <= 0){
                winner(player);
                alert(`Game Over. ${player.name.toUpperCase()} Has Been Defeated!!!`);
                player.health = 1;

                window.setTimeout(restart,1500);
                
            }
        }
    }

    //===========THE GAME LOOP============================
   
    // This Fn just to update the canvas and the game itself with RAF
    function updateGame(){
        requestAnimationFrame(updateGame);

        gameOver(); 

        clearCanvas();//this clear the canvas
        
        drawGame();//this draw the canvas again with positions updated
    }

    updateGame();

}//end of game app