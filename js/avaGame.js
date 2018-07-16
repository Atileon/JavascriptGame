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
// import Map from "./modules/ava-map.js";
// import Component from './modules/ava-component.js';
// import Weapon from './modules/ava-weapon.js';
// import Obstacle from './modules/ava-obstacle.js';
// import Player from './modules/ava-player.js';


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
                        //if there's collision the player remains at current position
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