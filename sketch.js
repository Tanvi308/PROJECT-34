
  var dog;
  var dogImage, dogImage1;
  var database;
  var foodS, foodStock;

function preload() {
  //load images here
    dogImage = loadImage("images/dogImg.png");
    dogImage1 = loadImage("images/dogImg1.png");
}

function setup() {
  //assigning variable to database
   database = firebase.database();

  //creating canvas
    createCanvas(500,500);
    
  //fetching foodStock from database
    foodStock = database.ref("Food");
  foodStock.on("value",readStock);  
  
  //creating dog sprite
    dog = createSprite(200,200,10,10);
    dog.addImage(dogImage);
    dog.scale = 0.3;
}


function draw() {  
  //background colour
    background(46,139,87);



  //feeding dog using arrow key
    if (keyIsDown(UP_ARROW)) {
      writeStock(foodS);
      dog.addImage(dogImage1);
    }  

    if (keyIsDown("R")) {
      
    }  


  //drawing sprites  
    drawSprites();

  //text
    textSize(20);
    fill(255);
    text("Food remaining :"+ foodS, 100, 50);
}

function readStock (data) {
  foodS = data.val();
} 

function writeStock (x) {
  if (x<=0) {
    x = 0;
  } else {
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

