//=========================CLASSES==============================
export class Map {
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

export class Component{
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

export class Weapon extends Component {
    constructor(area,width,height,color,name, damage){
        super(area,width,height,color);
        this.name = name;// the name of Weapon
        this.damage = damage;// the damage of Weapon
    }
    
}//end Weapon class
export class Obstacle extends Component{
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

export class Player extends Component {
    
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

