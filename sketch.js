
var monkey , monkey_running
var ground
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400)
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1
  
  ground = createSprite(400,350,900,10) 
  ground.velocityX=-4
  ground.x = ground.width/2  
  console.log(ground.x) 
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score = 0
}


function draw() {
background("white")

  if(ground.x<0) {
    ground.x = ground.width/2
  }
  
  if(keyDown("space") && monkey.y > 314) {
    monkey.velocityY = -18;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: "+ score,150,70)
  
  stroke("black");
  textSize(20);
  fill("black"); 
  survivalTime = Math.ceil(frameCount / frameRate());
  text("Survival Time : " + survivalTime, 100,50);
  
  spawnBananas();
  spawnObstacles();
  
  if(monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }
  if(monkey.isTouching(obstacleGroup)){
    ground.velocityX=0
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score=0
  }
  
  drawSprites();
}

function spawnBananas() {
 if(frameCount % 80 === 0) {
  var banana = createSprite(300,160,10,10)
  banana.y = Math.round(random(120,200))
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -5;
  banana.lifetime = 200;
  FoodGroup.add(banana);
  }  
}

function spawnObstacles() {
 if(frameCount % 300 === 0) { 
  var obstacle = createSprite(300,310,10,10)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.2
  obstacle.velocityX = -5;
  obstacle.lifetime = 200;
  obstacleGroup.add(obstacle);
  
 }
}







