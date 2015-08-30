//draw a circle, in the container

//join
var container = d3.select('#container');

var setWidth = d3.scale.linear().domain([0,1]).range([0,600]); 
var setHeight = d3.scale.linear().domain([0,1]).range([0,600]); 
var step = 1000;

window.addEventListener('keydown',function(e){pressedKey(e);});
window.addEventListener('keyup',function(e){pressedKey(e);});

var playerState = {
  up : 0, 
  down : 0,
  right: 0,
  left : 0,
  velX : 0,
  velY : 0,
  speed : 10
};  
var lastTime = Date.now(); 

var pressedKey = function(e){ 
  if(e.keyCode == 87){
    playerState.up = 1;
  }
  if(e.keyCode == 65){
    playerState.left = 1;
  }
  if(e.keyCode == 83){
    playerState.down = 1;
  }
  if(e.keyCode == 68){
    playerState.right = 1;
  }
  console.log(playerState); 
};
var releasedKey = function(e){
 if(e.keyCode === 87){
    playerState.up = 0;
  }
  if(e.keyCode == 65){
    playerState.left = 0;
  }
  if(e.keyCode == 83){
    playerState.down = 0;
  }
  if(e.keyCode == 68){
    playerState.right = 0;
  }
  console.log(playerState); 
};

var ModifySpeed = function(){
  var playerObj = container.selectAll("#player"); 
  if(playerObj){
    var deltaTime = Date.now - lastTime;
    lastTime = Date.now(); 
    playerState.velX += (deltaTime * playerState.right + -1 * deltaTime * playerState.left)*playerState.speed/1000; 
    playerState.velY += (deltaTime * playerState.up + -1 * deltaTime * playerState.down)*playerState.speed/1000;
    var newX = playerObj.attr("cx") + playerState.velX;
    var newY = playerObj.attr("cx") + playerState.velX;
    playerObj.attr("cx" , newX); 
    playerObj.attr("cy", newY); 
  }
};

var dragPlayer = d3.behavior.drag().on("drag", function(d){
  if(!invincible){
    var x = d3.event.x ; 
    var y = d3.event.y ;
    d3.select(this).attr("cx" , x ); 
    d3.select(this).attr("cy" , y ); 
  }
});




//var playerSize = 25;
var playerAttr = {
  id : "player",
  cx : 50,
  cy : 300,
  fill : "orange",
  r : 15
}; 
 

//create update function()
var enemyUpdate = function(data) {
  var enemies = container.selectAll(".enemy")
    .data(data);

//update -- currently nothingu


//enter
  enemies.enter()
    .append("circle")
      .attr("class", "enemy")
      .attr("cy", function(d, i) {return i * 10 + 10;}) //function(data, index)
      .attr("cx", function(d, i) {return i * 10 + 10;})
      .attr("r", function(d, i) {return Math.random() * 8 + 7;}) // 7 - 15
      .attr("fill", function(d) {return d;});



//enter + update
  enemies.transition()
    .duration(step)
    .attr("cx", function() {return setWidth(Math.random());})
    .attr("cy", function() {return setHeight(Math.random());});

//exit

};

var playerUpdate = function(data){
  var player = container.selectAll("#player")
    .data(data);

  player.enter().append("circle")
      .attr(playerAttr)
      .call(dragPlayer); 
};



//update loop

setInterval(function() {
  enemyUpdate(["#888", "#888", "#888", "#888", "#888", "#888", "#888", "#888", "#888", "#888"]);
  playerUpdate([1]); 
}, step);


var collisionCount = 0; 
var highScore = 0;
var currentScore = 0; 
var lastCollision = null; 
var invincible = false; 

var collisionCheck = function(){
  var enemies = container.selectAll(".enemy"); 
  enemies.each(function(d){
    var player = d3.selectAll("#player");
    var asteroid = d3.select(this);
    //enemy pos x - player pos x
    var xDiff = asteroid.attr("cx") - player.attr("cx"); 
    // same with y 
    var yDiff = asteroid.attr("cy") - player.attr("cy"); 
    //square the results = distance squared
    var distanceSqr = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    if (distanceSqr < Number(player.attr("r")) + Number(asteroid.attr("r")) && !invincible) {
      lastCollision = d;
      collision(player);
      return true;
    }
    return false;
  }); 
};

var collision = function (player){
  console.log("collision"); 
  createExplosion(new Array(50), player.attr("cx"), player.attr("cy"));
  collisionCount++; 
  currentScore = 0; 
  invincible = true; 
  player.attr(playerAttr);
  player.attr("fill" , "black");
  player.transition()
    .duration(1000)
    .attr("fill" , "orange"); 
  setTimeout(function(){
    invincible = false;
  }, 1000);  
};
var updateScore = function(){
  currentScore++;
  if (currentScore > highScore) {
      highScore = currentScore;
  } 
  d3.select('.scoreboard .current span').text(currentScore);
  d3.select('.scoreboard .high span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisionCount); 
};
setInterval(updateScore, 100); 

d3.timer(collisionCheck);
//d3.timer(ModifySpeed); 



var colorLerp  = function(startColor, endColor){
  return d3.scale.linear().domain([0,1]).range([startColor, endColor]);
};
var randDistance =  d3.scale.linear().domain([0,1]).range([-100, 100]);
var randDur = d3.scale.linear().domain([0,1]).range([500, 1000]);
console.log(randDistance(Math.random()));
var fireInner = {
  fill : function(){ 
    return colorLerp("yellow", "white")(Math.random());
  },
  r : 2,
  opacity : 0.8,
  class : "inner"
};
var fireOutter = {
  fill : function(){ 
    return colorLerp("red", "orange")(Math.random());
  },
  r : 5,
  opacity : 0.8,
  class : "outter"
};

var startSmoke = {
  fill : function(){ 
    return colorLerp("white", "white")(Math.random());
  },
  r : 10,
  opacity : 0.2,
  class : "smoke"
};

var createExplosion =  function(data,x,y){

    var smoke = container.selectAll(".smoke").data(data).enter().
      append("circle")
      .attr(startSmoke)
      .attr("cx", x)
      .attr("cy", y)
      .transition()
      .duration(function(){
        return randDur(Math.random()) * 2; 
      })
      .ease("linear")
      .attr("cx" , function(){
        return Math.random() * 200 - 100  + Number(x); 
      })
      .attr("cy" , function(){
        return Math.random() * 200 - 100  + Number(y); 
      })
      .attr("fill" , "white")
      .attr("opacity" , 0)
      .attr("r" , 20) 
      .remove(); 


    var Outter = container.selectAll(".outter").data(data).enter().
    append("circle")
    .attr(fireInner)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .delay(100)
    .duration(function(){
      return randDur(Math.random() * 1.2); 
    })
    .ease("quad-out")
    .attr("cx" , function(){
      return Math.random() *100 - 50 + Number(x); 
    })
    .attr("cy" , function(){
      return Math.random() *100 - 50  + Number(y); 
    })
    .attr("fill" , function(){
      return  colorLerp("red", "red")(Math.random());
    })
    .attr("opacity" , 0)
    .attr("r" , 40)
    .remove();

     var Inner = container.selectAll(".inner").data(data).enter().
    append("circle")
    .attr(fireInner)
    .attr("cx", x)
    .attr("cy", y)
    .transition()
    .duration(function(){
      return randDur(Math.random()) * 1; 
    })
    .ease("quad-out")
    .attr("cx" , function(){
      return Math.random() *100 - 50  + Number(x); 
    })
    .attr("cy" , function(){
      return Math.random() *100 - 50  + Number(y); 
    })
    .attr("fill" , function(){
      return  colorLerp("red", "orange")(Math.random());
    })
    .attr("opacity" , 0)
    .attr("r" , 20)
    .remove();


};
createExplosion(new Array(50),100,100); 
