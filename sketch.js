var monkey , monkey_running;
var banana ,bananaImage, obstacle,obstacles, obstacleImage;
var FoodGroup, obstacleGroup;
var score,survialTime;
//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
   FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 315, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  
 //Ground
  ground = createSprite("green");
  ground.velocityX = -4;
  ground.x=ground.width/2;
  
 
  //score
  score = 0;
  survialTime = 0;
}


function draw() {
  
  background(11,156,0,9,2);
  
  //displaying survialtime
  stroke("black");
    fill("black");
      textSize(20);
  
  text("Survial Time:"+  survialTime, 100, 50);
  
  //displaying score
  stroke("black");
    fill("black");
      textSize(20);
  text("Score:"+  score, 300, 100);
  
  monkey.collide(ground);
  
   monkey.velocityY = monkey.velocityY + 0.8;
  survialTime = Math.ceil(frameCount/frameRate());
     
  if(ground.x<200){
      ground.x = ground.width/2;
    }
  
     
    monkey.velocityY = monkey.velocityY + 0.8;
    
   if(keyDown("space")&& monkey.y> 200 ){
      monkey.velocityY = -10; 
    }
    
    
    
   if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+1;
    }
    if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        survialTime =0;
        text("Game Over",150,200,100,300);
    
    }
    
  food();
    obstacles();
  drawSprites();
  }
  

//Banana
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(350,325,10,10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
    
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
     obstacleGroup.add(obstacle);
  }

  }