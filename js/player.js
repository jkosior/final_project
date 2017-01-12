document.addEventListener('DOMContentLoaded', function(){

var images = {}

loadImage("demigod_m");


function loadImage(name){
  images[name] = new Image();
  images[name].onload  = function(){
    resourceLoaded();
  }
  images[name].src = 'images/' + name + '.png'
}

var totalResources = 1;
var allResourcesLoaded = 0;
var fps = 30;

function resourceLoaded(){
  allResourcesLoaded++;
  if(allResourcesLoaded === totalResources){
    setInterval(redraw(),1000/fps);
  }
}
var context = document.getElementById('canvas').getContext("2d");


var characterX = 32
var characterY = 32



function redraw(){
  canvas.width = canvas.width

  a = document.getElementById('body')
  a.addEventListener('keydown',function(e){
    switch (e.keyCode) {
      case 65:
        if (characterX > 0) {
          context.clearRect(characterX, characterY, canvas.width,canvas.height);
          characterX--;
          context.drawImage(images["demigod_m"], characterX, characterY);}
        break;
      case 87:
        if (characterY>0){
          context.clearRect(characterX, characterY, canvas.width,canvas.height);
          characterY--;
          context.drawImage(images["demigod_m"], characterX, characterY);}
        break;
      case 68:
        if(characterX < canvas.width){
          context.clearRect(characterX, characterY, canvas.width,canvas.height);
          characterX++;
          context.drawImage(images["demigod_m"], characterX, characterY);
        }
        break;
      case 83:
        if (characterY < canvas.height){
        context.clearRect(characterX, characterY, canvas.width,canvas.height);
        characterY++;
        context.drawImage(images["demigod_m"], characterX, characterY);}
        break;

      }

    });


  // x.scale = 50%
  //błąd cannot set scale of undefined
  // x.onload = function({
  //   this.scale = '50%'
  // });


}

});
