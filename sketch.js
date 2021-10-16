var spaceship , ammo,  bg;
var spaceshipImage;

var redB, greenB, blueB, pinkB, ammoGroup;
var ammoImage;
var asteroid, asteroidImage;
var asteroidGroup;
var gamestate = 0;
var alienGroup;
var alienImg;
var gameOver;
var gameOverimg;



var score=0;

function preload(){
  
  backgroundImage = loadImage("spacebg.jpg");
  spaceshipImage = loadImage("Spaceship_tut.png");
  asteroidImage = loadImage("asteroid-clipart-sprite-7.png");
  ammoImage = loadImage("bullet.png")
  alienImg = loadImage("alien.png")
  gameOverimg = loadImage("gameover.png")
  
}


function setup() {
  
  createCanvas(600, 800);
  
  bg = createSprite(0,400,400,400);
  bg.addImage(backgroundImage);
  bg.scale = 2.5
  gameOver = createSprite(300, 300)
  gameOver.addImage(gameOverimg)
  gameOver.visible=false
  alienships = new Group();
  ammoGroup = new Group();
  asteroidGroup = new Group()
  alienGroup = new Group()
  
  spaceship = createSprite(width/2,600,20,50);
  spaceship.addImage(spaceshipImage); 
  spaceship.scale = 1;
  
   score = 0   
   gamestate = 0 
  
}

function draw() {
 background(0);
    bg.velocityY = 10

    if (bg.y > 800){
      bg.y = 0;
    }
  
    if (keyDown("space")){
      shoot()
    }
    if (keyDown("left_arrow")){
      spaceship.x = spaceship.x -5
    }
    
    if (keyDown("right_arrow")){
      spaceship.x = spaceship.x+5
    }
    
  drawSprites();
  text("Score: "+ score, 300,50);

    if (frameCount % 100 == 0){
      createAsteroid()
    }

    if (frameCount % 200 == 0){
      createAliens()
    }
  if (spaceship.collide(alienGroup)){
    spaceship.destroy()
    gamestate=1
    gameOver.visible=true
    asteroidGroup.destroyEach()
    ammoGroup.destroyEach()
    
  }
  if (ammoGroup.collide(asteroidGroup)){
    asteroidGroup.destroyEach()
    ammoGroup.destroyEach()
    score=score+2

    
  }
}
function shoot() {
  var ammo= createSprite(spaceship.x, spaceship.y, 60, 10);
  ammo.addImage(ammoImage);
  ammo.x=spaceship.x;
  ammo.velocityY = -8;
  ammo.lifetime = 100;
  ammo.scale = 0.3;
  ammoGroup.add(ammo)
}
function createAsteroid() {
  var asteroid= createSprite(Math.round(random(50, 550)), 0, 60, 10);
  asteroid.addImage(asteroidImage);
  asteroid.velocityY = 8;
  asteroid.lifetime = 100;
  asteroid.scale = 0.1;
  console.log(asteroid)
  asteroidGroup.add(asteroid)

}

function createAliens() {
  var alien= createSprite(Math.round(random(50, 550)), 0, 60, 10);
  alien.addImage(alienImg);
  alien.velocityY = 6;
  alien.lifetime = 100;
  alien.scale = 0.1;
  alienGroup.add(alien)

}

 


