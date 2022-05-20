var canvas = document.getElementById("gameSpace");
let canvasDimensions = Math.min(innerWidth-30, innerHeight-30)
canvas.width = canvasDimensions 
canvas.height = canvasDimensions
var ctx = canvas.getContext("2d");

const NZZ = 0.00000000001

let buttons = [];
document.onkeydown = function (e) {
  e = e || window.event;
  buttons[e.keyCode] = true;
};
document.onkeyup = function (e) {
  e = e || window.event;
  buttons[e.keyCode] = false;
};

function getKeys(e) {
  alert("keys");
  if (e.keyCode == 38) {
	alert("up");
	player.vy = player.vy - 1;
	player.render();
  }
}

let player = {
  x: 10,
  y: 10,
  vx: 0,
  vy: 0,
  width: 32,
  height: 32,
  color: "#00FF00",
  imageSrc: "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/mario.png?v=1652929203193",
  maxSpeed: 8,
  getKeys: function() {
	if (buttons[38]||buttons[87]){
	  this.vy=-this.maxSpeed	}else if (buttons[34]||buttons[83]){
	  this.vy=this.maxSpeed
	}else{
	  this.vy*=0.9
	}
	if (buttons[37]||buttons[65]){
	  this.vx=-this.maxSpeed
	}else if (buttons[39]||buttons[68]){
	  this.vx=this.maxSpeed
	}else{
	  this.vx*=0.9
	}
  },
  render: function () {
  this.x += this.vx;
  let contact = false
  borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
    if(contact){
      if(this.vx>0){
        do {
          this.x-=1
          contact = false
          borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
        } while(contact)
      }else{
        do {
          this.x+=1
          contact = false
          borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
        } while(contact)
      }
      this.vx=0-(this.vx/2)
    }
        
  
	this.y += this.vy;
  contact = false
  borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
    if(contact){
      if(this.vy>0){
        do {
          this.y-=1
          contact = false
          borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
        } while(contact)
      }else{
        do {
          this.y+=1
          contact = false
          borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
        } while(contact)
      }
      this.vy=0-(this.vy/2)
    }
	if (this.imageSrc==""){
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height);
	}else{
    ctx.drawImage(document.getElementById("playerImg"),player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height);
		/*let img = new Image()
		img.src = this.imageSrc
    img.onload = function() {
      ctx.drawImage(img,player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height)
    }*/
	}
  },
};
        
let flashlight = {
  on: true,
  xCenter: canvas.width/2,
  yCenter: canvas.height/2,
  size: 0.5,
  fadeOff: 0.15,
  render: function(){
    ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(this.xCenter, this.yCenter, this.size*(canvas.width/2), 0, 2 * Math.PI);
ctx.rect(canvas.width, 0, -1*canvas.width, canvas.height);
ctx.fill();
    
    var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 1, canvas.height/2, canvas.width/2, this.size*(canvas.width/2))
grd.addColorStop(0, "rgba(0, 0, 0, 0.5)");
grd.addColorStop(1-this.fadeOff, "black");
ctx.fillStyle = grd;
ctx.beginPath();
ctx.arc(canvas.width/2, canvas.height/2, (this.size*(canvas.width/2))+5, 0, 2 * Math.PI);
ctx.fill();
  }
}

function Wall(x1, y1, x2, y2, color){
	this.x1 = x1
	this.y1 = y1
	this.x2 = x2
	this.y2 = y2
	this.color = color
	this.render = function(){
		ctx.strokeStyle = this.color
		ctx.moveTo(this.x1-player.x+(canvas.width/2-(player.width/2)), this.y1-player.y+(canvas.height/2-(player.height/2)))
		ctx.lineTo(this.x2-player.x+(canvas.width/2-(player.width/2)), this.y2-player.y+(canvas.height/2-(player.height/2)))
    ctx.lineWidth = 3
		ctx.stroke()
	}
}

let borders = []
borders.push(new Wall(200,0,200,400,"#FF0000"))
borders.push(new Wall(0,0,0,400,"#FF0000"))
borders.push(new Wall(0,400,400,400,"#FF0000"))

function renderChars() {
  canvas.width = canvas.width
  player.getKeys()
  player.render()
  borders.forEach(e => e.render())
  flashlight.render()
  window.requestAnimationFrame(renderChars);
}
renderChars()
function touchWall(boxX, boxY, boxWidth, boxHeight, wallX1, wallY1, wallX2, wallY2){
  if (linesIntersect(boxX, boxY, boxX+boxWidth, boxY, wallX1, wallY1, wallX2, wallY2)){
	return true
  }else if (linesIntersect(boxX+boxWidth, boxY, boxX+boxWidth, boxY+boxHeight, wallX1, wallY1, wallX2, wallY2)){
	return true
  }else if (linesIntersect(boxX, boxY+boxHeight, boxX+boxWidth, boxY+boxHeight, wallX1, wallY1, wallX2, wallY2)){
	return true
  }else if (linesIntersect(boxX, boxY, boxX, boxY+boxHeight, wallX1, wallY1, wallX2, wallY2)){
   return true
  }
  return false
}
        
function linesIntersect(x1,y1,x2,y2,x3,y3,x4,y4){
  let a1= (y2-y1)/((x2-x1)+NZZ)
  let b1 = y1-(a1*x1)
  let a2= (y4-y3)/((x4-x3)+NZZ)
  let b2 = y3-(a2*x3)
  let Xsect1 = Math.round((b2-b1)/((a1-a2)+NZZ))
  let Ysect1 = (a1*Xsect1) + b1
    
let a3= (y4-y3)/((x4-x3)+NZZ)
  let b3 = y3-(a3*x3)
  let a4= (y2-y1)/((x2-x1)+NZZ)
  let b4 = y1-(a4*x1)
  let Xsect2 = Math.round((b4-b3)/((a3-a4)+NZZ))
  let Ysect2 = (a3*Xsect2) + b3

    return ((valBW(Xsect1, x1, x2)&&valBW(Xsect1, x3, x4)&&valBW(Ysect1, y1, y2)&&valBW(Ysect1, y3, y4))||(valBW(Xsect2, x3, x4)&&valBW(Xsect2, x1, x2)&&valBW(Ysect2, y3, y4)&&valBW(Ysect2, y1, y2)))
}

function valBW(Qval, val1, val2){
  if (val1 < val2){
	return((val1<=Qval)&&(Qval<=val2))
  }else{
	return((val2<=Qval)&&(Qval<=val1))
  }
}