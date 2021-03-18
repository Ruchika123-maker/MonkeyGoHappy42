// Initiating Variables

var HEALTH = 2
var PLAY = 1
var END = 0
var gameState = PLAY
var background,backgroundImage
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground
var gameOver,gameOverImage;
var score
var coverage;

function preload(){
  
// Loading Images
  
  backgroundImage = loadImage("monkey background.jpg");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage = loadImage("gameovermonkey.jpg");
}



function setup() {
  
  createCanvas(400,400);
  
// setting the background
  background = createSprite(200,200);
  background.addImage(backgroundImage);
  background.scale = 2;
  
  
// Creating Monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.2;
  
// Creating Ground
  ground = createSprite(400,350,900,10);
  ground.velocityX =-4;
  ground.shapeColor = "brown";
  
//creating gameover
  gameOver = createSprite(200,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;
  
//creating coverage
  coverage = createSprite(200,50,250,50);
  coverage.shapeColor = "white";
  
// Creating group for banana and obstacles
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
//settting collider for monkey
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
// giving value to score
  score = 0;
}


function draw() {
  
  if(gameState===PLAY) {
     
    // Moving the Ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
    //collider to prevent monkey from falling down
  monkey.collide(ground);
    
     gameOver.visible = false;
     coverage.visible = false;
    
    //making the monkey bigger on eating bananas
  
  if(bananaGroup.isTouching(monkey)) {

     monkey.scale = 0.3;
  }
    
    //making the monkey smaller on hitting obstacles
  
  if(obstacleGroup.isTouching(monkey)) {
     HEALTH=HEALTH-1;
     monkey.scale = 0.1
  }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }
    
    
    // Functions
  spawnObstacles();
  spawnBananas();
  
    
    if(HEALTH === 0){
      
      gameState = END;
    
    }
  } 
    else if(gameState === END){
     monkey.visible=false;
     gameOver.visible=true;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    ground.setVelocity(0,0);
    coverage.visible = true;
     }


  drawSprites();   
  
  if(gameState === END){
    textSize(30);
    
    fill("black");
    text("You Lose!",150,60);
  }
  
// Displaying score
  score = Math.ceil(frameCount/frameRate());
  textSize(20);
  fill("white");
  text("Score:" + score,100,50);
  
}

function spawnBananas() {
  
   if (frameCount % 80 === 0){
   banana = createSprite(600,165,10,40);
   banana.y = Math.round(random(120,200));  
   banana.addImage(bananaImage);
   banana.velocity.x = -6;
   banana.scale = 0.1;
   banana.lifetime = 100;
   bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  
  if (frameCount % 60 === 0){
   obstacle = createSprite(600,330,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -6;
   obstacle.scale = 0.1;
   obstacle.lifetime = 100;
   obstacleGroup.add(obstacle);
  }
}
