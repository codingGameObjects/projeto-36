var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;


var Time = new Date();
var FeedTime = Time.getHours();


var inputTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  var lastFedRef = database.ref('Time');
  lastFedRef.on("value", readTime)
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  
  feedDog = createButton("Feed the dog");
  feedDog.position(800,95);
  feedDog.mousePressed(feedsDog);

  //------------------------------------------
  addFood=createButton("Add Food");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();



  console.log();
    

    fill("red")
    textSize(15)
    text("Última refeição: " + lastFed + " horas", 800, 25);
//


  //write code to display text lastFed time here
  

  drawSprites();
}


function readTime(data) {
  Time = data.val();
  lastFed = Time;
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedsDog(){
  dog.addImage(happyDog);

  
  database.ref('/').update({
    Time: FeedTime
  });
  

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if (food_stock_val <= 0) {
    foodObj.updateFoodStock(food_stock_val*0)
  } else {
    foodObj.updateFoodStock(food_stock_val-1)
  }

  database.ref('/').update({
    Food:food_stock_val
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
