/*var canvas = document.getElementById("gameSpace");
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
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  width: 150,
  height: 150,
  color: "#00FF00",
  maxSpeed: 8,
  getKeys: function() {
    if (buttons[38]||buttons[87]){
      this.vy=-3
      //this.vy = Math.min(Math.abs(this.vy-1), this.maxSpeed)/(Math.abs(this.vy)/this.vy)
    }else if (buttons[34]||buttons[83]){
      this.vy=3
    }else{
      this.vy*=0.9
    }
    if (buttons[37]||buttons[65]){
      this.vx=-3
      //this.vy = Math.min(Math.abs(this.vy-1), this.maxSpeed)/(Math.abs(this.vy)/this.vy)
    }else if (buttons[39]||buttons[68]){
      this.vx=3
    }else{
      this.vx*=0.9
    }
  },
  render: function () {
    player.y += player.vy;
    player.x += player.vx;
    ctx.fillStyle = player.color;
    ctx.fillRect(
      player.x,
      player.y,
      player.width,
      player.height
    );
  },
};

function renderChars() {
  canvas.width = canvas.width
  player.getKeys()
  player.render()
  window.requestAnimationFrame(renderChars);
}
renderChars();
window.requestAnimationFrame(renderChars);

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
  let Xsect = (b2-b1)/((a1-a2)+NZZ)
  return (valBW(Xsect, x1, x2)&&valBW(Xsect, x3, x4))
}

function valBW(Qval, val1, val2){
  if (val1 < val2){
    return((val1<Qval)&&(Qval<=val2))
  }else{
    return((val2<Qval)&&(Qval<=val1))
  }
}
  borders.forEach(wall=>(contact = contact||touchWall(player.x+player.vx, player.y+player.vy, player.width, player.height, wall.x1, wall.y1, wall.x2, wall.y2)))
*/
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
  width: 50,
  height: 50,
  color: "#00FF00",
  imageSrc: "",
  maxSpeed: 8,
  getKeys: function() {
	if (buttons[38]||buttons[87]){
	  this.vy=-3
	  //this.vy = Math.min(Math.abs(this.vy-1), this.maxSpeed)/(Math.abs(this.vy)/this.vy)
	}else if (buttons[34]||buttons[83]){
	  this.vy=3
	}else{
	  this.vy*=0.9
	}
	if (buttons[37]||buttons[65]){
	  this.vx=-3
	  //this.vy = Math.min(Math.abs(this.vy-1), this.maxSpeed)/(Math.abs(this.vy)/this.vy)
	}else if (buttons[39]||buttons[68]){
	  this.vx=3
	}else{
	  this.vx*=0.9
	}
  },
  render: function () {
  let contactX = false
  let contactY = false
  //borders.forEach(wall=>(contact = contact||touchWall(player.x+player.vx, player.y+player.vy, player.width, player.height, wall.x1, wall.y1, wall.x2, wall.y2)))
  borders.forEach(wall=>(contactX = contactX||(touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))==(1))
  borders.forEach(wall=>(contactX = contactX||(touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))==(3))
  borders.forEach(wall=>(contactY = contactY||(touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))==(2))
  borders.forEach(wall=>(contactY = contactY||(touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))==(4))
//contact = touchWall(player.x+player.vx, player.y+player.vy, player.width, player.height, borders[0].x1, borders[0].y1, borders[0].x2, borders[0].y2)
//console.log(contact)
  //if (!(touchWall(player.x+player.vx, player.y+player.vy, player.width, player.height, wall.x1, wall.y1, wall.x2, wall.y2))){
  if (!contactX){
	  player.x += player.vx;
  }else{
    player.x -= player.vx
  }
  if (!contactY){
	  player.y += player.vy;
  }else{
   	player.y -= player.vy///(Math.abs(player.vy));
	}
	if (this.imageSrc==""){
	//console.log("draw box")
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height);
	}else{
		let img = new Image()
		img.addEventListener('load', function() {
			ctx.drawImage(img.src, player.x, player.y)
		}, false);
		img.src = this.imageSrc
		//console.log(img.src)
	}
  },
};

function Wall(x1, y1, x2, y2, color){
	this.x1 = x1
	this.y1 = y1
	this.x2 = x2
	this.y2 = y2
	this.color = color
	this.render = function(){
	//console.log("Rendering")
		ctx.strokeStyle = this.color
    //console.log(this.color)
		ctx.moveTo(this.x1-player.x+(canvas.width/2-(player.width/2)), this.y1-player.y+(canvas.height/2-(player.height/2)))
		ctx.lineTo(this.x2-player.x+(canvas.width/2-(player.width/2)), this.y2-player.y+(canvas.height/2-(player.height/2)))
    ctx.lineWidth = 3
		ctx.stroke()
	}
}

let wall = new Wall(400, 0, 0, 400, "#FF0000")
wall.render()
let borders = []
//borders.push(wall)
borders.push(new Wall(200,0,200,400,"#FF0000"))
//borders.push(new Wall(400,0,0,400,"#FF0000"))
borders.push(new Wall(0,0,0,400,"#FF0000"))
borders.push(new Wall(0,400,400,400,"#FF0000"))
//borders.push(new Wall(0,5,400,5,"#FF0000"))
/*
let wall = {
	x1: 400,
	y1: 0,
	x2: 0,
	y2:400,
	color: "#FF00FF",
	render: function (){
	//console.log("Rendering")
		ctx.strokeStyle = this.color
		ctx.moveTo(this.x1, this.y1)
		ctx.lineTo(this.x2, this.y2)
		ctx.stroke()
	}
}*/

//console.log("intersection? " + linesIntersect(100,0,100,500,0,250,400,250))

function renderChars() {
  canvas.width = canvas.width
  player.getKeys()
  player.render()
  borders.forEach(e => e.render())
//console.log(player.x, player.y, player.x, player.y+player.height, borders[2].x1, borders[2].y1, borders[2].x2, borders[2].y2)

  //console.log("intersection? " + linesIntersect(player.x,0,100,500,borders[2].x1,borders[2].y1,borders[2].x2,borders[2].y2))
  window.requestAnimationFrame(renderChars);
}
renderChars();
window.requestAnimationFrame(renderChars);

function touchWall(boxX, boxY, boxWidth, boxHeight, wallX1, wallY1, wallX2, wallY2){
  if (linesIntersect(boxX, boxY, boxX+boxWidth, boxY, wallX1, wallY1, wallX2, wallY2)){
	console.log("top")
	return(1)
  }else if (linesIntersect(boxX+boxWidth, boxY, boxX+boxWidth, boxY+boxHeight, wallX1, wallY1, wallX2, wallY2)){
	console.log("right")
	return(2)
  }else if (linesIntersect(boxX, boxY+boxHeight, boxX+boxWidth, boxY+boxHeight, wallX1, wallY1, wallX2, wallY2)){
	console.log("bottom")
	return(3)
  }else if (linesIntersect(boxX, boxY, boxX, boxY+boxHeight, wallX1, wallY1, wallX2, wallY2)){
   console.log("left")
   return(4)
  }
  //console.log("No more Da Wall")
  return(0)
}

//console.log("known intersection? " + linesIntersect(100,0,100,500,0,250,400,250))

/*function linesIntersect(x1,y1,x2,y2,x3,y3,x4,y4){
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
  //console.log(valBW(Xsect1, x1, x2)&&valBW(Xsect1, x3, x4)&&valBW(Ysect1, y1, y2)&&valBW(Ysect1, y3, y4))
  //console.log("X intersection : " + (valBW(Xsect, x1, x2)&&valBW(Xsect, x3, x4)))
  return ((valBW(Xsect1, x1, x2)&&valBW(Xsect1, x3, x4)&&valBW(Ysect1, y1, y2)&&valBW(Ysect1, y3, y4))||(valBW(Xsect2, x3, x4)&&valBW(Xsect2, x1, x2)&&valBW(Ysect2, y3, y4)&&valBW(Ysect2, y1, y2)))
}*/

//console.log(linesIntersect(player.x, player.y, player.x, player.y+player.height, borders[2].x1, borders[2].y1, borders[2].x2, borders[2].y2))

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
