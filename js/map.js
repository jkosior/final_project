var cellW = 64  //Random tile width
var cellH = 64  //Random tile height
var roomW = (cellW/32) * 1280;  //Room width, changes when cell_w changes
var roomH = (cellH/32) * 1280;  // Room height, changes when cell_h changes

var width = parseInt(roomW/cellW);  //number of cells in room in row
var height = parseInt(roomH/cellH);  //number of cells in room in column

// First and last element of array - full wall
var mapArray = [];
var firstAndLast = [];
for (var i = 0; i < (2 * width +1); i++){
  firstAndLast.push(1)
}


mapArray.push(firstAndLast)
for (var i = 0; i < (2 *width) -1; i++){
  var nextLn = [1]
  for(var j = 0; j< (2*height) -1; j++){
    nextLn.push(Math.floor(Math.random()*2))
  }
  nextLn.push(1)

  //Making space to move in row.
  // for (var a=1; a < nextLn.length; a++){
  //   if(nextLn[a] == 1 && nextLn[a-1] == 0 && nextLn[a+1] == 0){
  //     nextLn[a] = 0;
  //   }
  // }
  mapArray.push(nextLn);
}
mapArray.push(firstAndLast);
//Making space to move in column.
for( var b = 1; b < mapArray.length -1; b++){
  for( var c = 1; c < mapArray[b].length; c++ ){
    if (mapArray[b][c] == 1 && mapArray[b-1][c] == 0 && mapArray[b+1][c] == 0 ){
      mapArray[b][c] = 0 ;
      }
    if (mapArray[b][c] == 1 && mapArray[b][c-1] == 0 && mapArray[b][c+1] == 0){
      mapArray[b][c] = 0;
    }
    // xArr = []
    // for (i = 0; i<mapArray.length, i++){
    //   xArr.push(i)
    // }
    // if (mapArray[b][c] == 0 && mapArray[b][c-1] == 1 && mapArray[b][c+1] == 1){
      //  ||
        // mapArray[b][c] == 0 && mapArray[b-1][c] == 1 && mapArray[b+1][c] == 1){
          // x.Arr.forEach(){

          }
        }

      // if (mapArray[b][c] == 1 && mapArray[b][c-1] == 0 && mapArray[b][c+1] == 0){
      //   mapArray[b][c] = 0;
      // }
    // else if (mapArray[b][c] == 0 && mapArray[b-1][c] == 1 && mapArray[b][c-1] == 1 && mapArray[b][c+1] == 1 && mapArray[b+1][c] == 1){
    //   mapArray[b][c] == 1;
    // }
  




function drawMap() {
  var stage = new createjs.Stage("Canvas");
  var background = new createjs.Container();
  for (var y = 0; y < mapArray.length; y++) {
      for (var x = 0; x < mapArray[y].length; x++) {
          if (parseInt(mapArray[y][x]) == 0) {
              var tile = new createjs.Shape()
              tile.graphics.beginFill('brown').drawRect(0,0,64,64);

          }
          if (parseInt(mapArray[y][x]) == 1) {
              var tile = new createjs.Shape();
              tile.graphics.beginFill("black").drawRect(0,0,64,64);

          }
          tile.x = x * 64;
          tile.y = y * 64;
          background.addChild(tile);
      }
  }
  stage.addChild(background);
  stage.update();
}

// document.addEventListener("DOMContentLoaded", function(){
//   var player = document.querySelector("#player")
//   console.log(player);
//   player.clientHeight = 64;
//   player.clientWeigth = 64;
//   player.style.backgroundColor = 'white'
//   player.style.left = 1000
//   player.style.up = 1000
// });
