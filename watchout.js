//draw a circle, in the container

//join
var container = d3.select('#container');

var setWidth = d3.scale.linear().domain([0,1]).range([0,600]); 
var setHeight = d3.scale.linear().domain([0,1]).range([0,600]); 
var step = 1000;

var dragPlayer = d3.behavior.drag().on("drag", function(d){
  var curX = d3.selectAll("#player").attr("x"); 
  var x = d3.event.x ; 
  var y = d3.event.y ;
  console.log(x  + " | " + d3.selectAll("#player").attr("x")); 
  console.log(d3.select(this));
  d3.select(this).attr("cx" , x ); 
  d3.select(this).attr("cy" , y ); 
});

  //store current x and y in Data on dragStart
  //
/*
var dragPlayer = d3.behavior.drag().on("drag", dragMove);
var dragMove = function() {
    //parent x = event x
    //same for y
    console.log("Clicking");
    d3.select(this).parentNode.attr("x", d3.event.x);
    d3.select(this).parentNode.attr("y", d3.eve W

  */

/*
  var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended)

   function dragged(d) {
  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
}
*/

var enemyAttr = {
  x : 50,
  y : 40,
  class : "enemy",
  width : function(d, i) {
    return 2*(i * 10 + 10);
  },
  height :  function(d, i) {
    return 2*(i * 10 + 10);
  }
};


var playerSize = 25;
var playerAttr = {
  id : "player",
  x : 50,
  y : 50,
  width : playerSize,
  height : playerSize
}; 
 

//create update function()
var enemyUpdate = function(data) {
  var enemies = container.selectAll(".enemy")
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
  var player = container.selectAll("#player")
    .data(data);

  player.enter().append("circle")
      .attr("id", "player")
      .attr("cy", playerSize/2)
      .attr("cx", playerSize/2)
      .attr("r", playerSize/4)
      .attr("fill", "black")
      .call(dragPlayer); 
};



//update loop

setInterval(function() {
  enemyUpdate(["red", "black", "yellow", "blue", "green"]);
  playerUpdate([1]); 
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

