document.addEventListener('DOMContentLoaded', function(){

var images = {}

loadImage("demigod_m");
loadImage('aragorn')
loadImage('hood_black2')
loadImage('leg_armor00')
loadImage('finisher')
loadImage('h_r_1')
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
var context = document.getElementById('player').getContext("2d");


var characterX = 32
var characterY = 32

var health = document.getElementById("health")
var mana = document.getElementById("mana")

health.style.color = "red";
mana.style.color = "white";

function redraw(){
  canvas.width = canvas.width
  // context.drawImage(images["demigod_m"], characterX, characterY);
  // context.drawImage(images["aragorn"], characterX, characterY);
  // context.drawImage(images["hood_black2"], characterX, characterY);
  // context.drawImage(images["leg_armor00"], characterX, characterY);
  // context.drawImage(images["finisher"], characterX, characterY);
  context.drawImage(images['h_r_1'],characterX, characterY)
  a = document.getElementById('body')
  a.addEventListener('keydown',function(e){
    switch (e.keyCode) {
      case 65:
        if (characterX > 0) {
          context.clearRect(characterX, characterY, canvas.width,canvas.height);
          characterX--;
          context.drawImage(images["demigod_m"], characterX, characterY);
          context.drawImage(images["aragorn"], characterX, characterY);
          context.drawImage(images["hood_black2"], characterX, characterY);
          context.drawImage(images["leg_armor00"], characterX, characterY);
          context.drawImage(images["finisher"], characterX, characterY);
        }
        break;
      case 87:
        if (characterY>0){
          context.clearRect(characterX, characterY, canvas.width,canvas.height);
          characterY--;
          context.drawImage(images["demigod_m"], characterX, characterY);
          context.drawImage(images["aragorn"], characterX, characterY);
          context.drawImage(images["hood_black2"], characterX, characterY);
          context.drawImage(images["leg_armor00"], characterX, characterY);
          context.drawImage(images["finisher"], characterX, characterY);
        }
        break;
      case 68:
        if(characterX < canvas.width){
          context.clearRect(characterX, characterY, canvas.width,canvas.height);
          characterX++;
          context.drawImage(images["demigod_m"], characterX, characterY);
          context.drawImage(images["aragorn"], characterX, characterY);
          context.drawImage(images["hood_black2"], characterX, characterY);
          context.drawImage(images["leg_armor00"], characterX, characterY);
          context.drawImage(images["finisher"], characterX, characterY);
        }
        break;
      case 83:
        if (characterY < canvas.height){
        context.clearRect(characterX, characterY, canvas.width,canvas.height);
        characterY++;
        context.drawImage(images["demigod_m"], characterX, characterY);
        context.drawImage(images["aragorn"], characterX, characterY);
        context.drawImage(images["hood_black2"], characterX, characterY);
        context.drawImage(images["leg_armor00"], characterX, characterY);
        context.drawImage(images["finisher"], characterX, characterY);
      }
        break;
      case 81:
        if (health.value > 0){
        health.value = health.value - 10;}
        break;
      case 90:
        if (mana.value > 0){
          mana.value = mana.value -10;}
          break;
}
// var healthBar  = setInterval()
  //   var healthInterval;
  //
  //     healthInterval = setInterval(function() {
  //       if (health.value < 100){
  //           health.value ++;
  //         }
  //       }, 1000);
  //       console.log(healthInterval);
  //   // window.clearInterval(healthBar)
  // // });
  //   if (mana.value < 100){
  //     window.setInterval(
  //       function(){
  //         mana.value ++
  //       }, 1000);
  //   }

    });


  // x.scale = 50%
  //błąd cannot set scale of undefined
  // x.onload = function({
  //   this.scale = '50%'
  // });


}
});
