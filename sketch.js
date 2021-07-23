var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordG;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  createCanvas(windowWidth , windowHeight);

  path=createSprite(width/2,200);
  path.addImage(pathImg);
  //path.velocityY = 4;
  
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordG = new Group();
  }

function draw() {
  if(gameState===PLAY){
    background(0);

    boy.x = World.mouseX;

    edges= createEdgeSprites();
    boy.collide(edges);

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    camera.velocityY = 4;
    path.velocityY = camera.velocityY;
    if(path.y > height ){
      path.y = height/2;
    }
    console.log(path.velocityY);

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
    }
    else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150;
    }
    else if(swordG.isTouching(boy)) {
        gameState = END;
        boy.addAnimation("SahilRunning",endImg);
        boy.x = width/2;
        boy.y = height/2;
        boy.scale = 0.8;
        
        cashG.destroyEach();
        cashG.setVelocityEach(0);
        swordG.destroyEach();
    }
  }
  
  drawSprites();

  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-165,40);

}

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50,width-50),40, 10,10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 300 == 0) {
    var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 6;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 7;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 500 == 0) {
    var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));   
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 8;
    sword.lifetime = 150;
    swordG.add(sword);
  }
}