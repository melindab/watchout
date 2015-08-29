//draw a circle, in the container

//join
var container = d3.select('#container');

var setWidth = d3.scale.linear().domain([0,1]).range([0,600]); 
var setHeight = d3.scale.linear().domain([0,1]).range([0,600]); 
var step = 1000;

var enemyAttr = {};
enemyAttr.x = 50; 
enemyAttr.y = 40; 
enemyAttr.class = "enemy";
enemyAttr.width = function(d, i) {
  return 2*(i * 10 + 10);
};
enemyAttr.height = function(d, i) {
  return 2*(i * 10 + 10);
};

var playerSize = 25;
var playerAttr = {}; 
playerAttr.id = "player";
playerAttr.x = 50; 
playerAttr.y = 50; 
playerAttr.width = playerSize; 
playerAttr.height = playerSize; 

//create update function()
var enemyUpdate = function(data) {
  var enemies = container.selectAll("svg.enemies")
    .data(data);

//update -- currently nothingu


//enter
  enemies.enter().append("svg")
    .attr(enemyAttr)
    .append("circle")
      .attr("cy", function(d, i) {return i * 10 + 10;}) //function(data, index)
      .attr("cx", function(d, i) {return i * 10 + 10;})
      .attr("r", function(d, i) {return i * 10 + 10;}) 
      .attr("fill", function(d) {return d;});



//enter + update
  enemies.transition()
    .duration(step)
    .attr("x", function() {return setWidth(Math.random());})
    .attr("y", function() {return setHeight(Math.random());});

//exit

};

var playerUpdate = function(data){
  var player = container.select("svg")
    .data(data);

  player.enter().append("svg")
    .attr(playerAttr)
    .append("circle")
      .attr("cy", playerSize/2)
      .attr("cx", playerSize/2)
      .attr("r", playerSize/4)
      .attr("fill", "black"); 
};



//update loop

setInterval(function() {
  enemyUpdate(["red", "black", "yellow", "blue", "green"]);
  playerUpdate(1); 
}, step);


/*
text.enter().append("text")
      .attr("class", "enter")
      .attr("x", function(d, i) { return i * 32; })
      .attr("dy", ".35em");


<?xml version="1.0"?>
<svg viewBox="0 0 120 120" version="1.1"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="50"/>
</svg>

*/
  


/*
var width = 960,
    height = 500;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(32," + (height / 2) + ")");

function update(data) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var text = svg.selectAll("text")
      .data(data);
*/




// start slingin' some d3 here.

//start of pseudoCode

//make global game variables
    //options
    //stats

//setup the environment
  //create containter object
  //create data set for enemies
  //create a player
      //make player draggable

