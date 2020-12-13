//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg, happyDogImg;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  var dog = createSprite();
  dog.addImage("dog",dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  textSize(25);
  text("Food Stock: "+ foodS,150,150);

}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if( x<= 0){
    x = 0;
  }else{
    x = x -1
  }
  database.ref('/').update({
    Food:x
  })
}


