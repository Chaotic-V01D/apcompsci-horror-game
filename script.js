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
  width: 59*0.3,
  height: 128*0.3,
  color: "#00FF00",
  imageSrc: "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/childArray.png?v=1653430652415",
  //imageSrc: "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/DiscordBotLogo.png?v=1652999556423",
  maxSpeed: 5,
  sprint: 0,
  frameWidth: 59,
  frameHeight: 128,
  frameRate: 16,
  getKeys: function() {
  if (buttons[16]){
    this.sprint = 3 
  }else{
    this.sprint = 0
  }
	if (buttons[38]||buttons[87]){
	  this.vy=-(this.maxSpeed+this.sprint)
  }else if (buttons[34]||buttons[83]){
	  this.vy=(this.maxSpeed+this.sprint)
	}else{
	  this.vy*=0.9
	}
	if (buttons[37]||buttons[65]){
	  this.vx=-(this.maxSpeed+this.sprint)
	}else if (buttons[39]||buttons[68]){
	  this.vx=(this.maxSpeed+this.sprint)
	}else{
	  this.vx*=0.9
	}
  },
  render: function () {
    
  /*this.x += this.vx;
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
    }*/
        this.y+=this.vy
  let contact = false
  borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
  if(contact){
    this.y-=1.1*this.vy
    this.vy*=0.5
  }
        this.x+=this.vx
  contact = false
  borders.forEach(wall=>(contact = contact||touchWall(Math.round(player.x+player.vx), Math.round(player.y+player.vy), Math.round(player.width), Math.round(player.height), wall.x1, wall.y1, wall.x2, wall.y2)))
  if(contact){
    this.x-=1.1*this.vx
    this.vx*=0.5
  }
    
    
	if (this.imageSrc==""){
	ctx.fillStyle = player.color;
	ctx.fillRect(player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height);
	}else{
    //ctx.drawImage(document.getElementById("playerImg"),player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height);
    let img = new Image()
		img.src = this.imageSrc
    if (img.complete){
      ctx.drawImage(img,Math.floor(animationFrameIndex/(60/this.frameRate))%(img.width/this.frameWidth)*this.frameWidth,0,this.frameWidth,this.frameHeight,player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), this.width, this.height)
      //console.log(Math.floor(animationFrameIndex/(60/this.frameRate))%(img.width/this.frameWidth)*this.frameWidth)
      //ctx.drawImage(img,player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height)
    }
    //https://stackoverflow.com/a/21625083
    //Thank ******* GOD that this ************ exists!!! 
    //4 ******* HOURS I SPENT TRYINGTO FIGURE OUT WHY THE **** THIS LITTLE BUGGER DIDN'T WANT TO DRAW
    //Then, ALL OF A SUDDEN I think, what if I only draw it once?
    //THAT WORKS
    //*try it twice*
    //THAT WORKS
    //*put it in a loop*
    //MF WHY
    //So I try a new method
    //I'll load the image into an invisible img tag and pull from there
    //that works
    //complicated? sure, but at least it ******* SHOWS UP
    //So I move on to thinking about *animation* instead
    //My thought: 'Ill draw a portion of a long image, shift the frame, and redraw it
    //FaNcY
    //Okay, so how do I do that
    //*looks it up*
    //clicks first SO link
    //************ IT EXPLAINS WHY IT WASN'T **** WORKING BEFOOOOORE
    //AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    /*
    img.onload = function() {
      ctx.drawImage(img,player.x-player.x+(canvas.width/2-(player.width/2)), player.y-player.y+(canvas.height/2-(player.height/2)), player.width, player.height)
    }*/
	}
  },
};

function Handheld(relativeX, relativeY, frameWidth, frameHeight, renderedWidth, renderedHeight, imageSrc, name, frameRate){
  this.relativeX = relativeX
  this.relativeY = relativeY
  this.frameWidth = frameWidth
  this.frameHeight = frameHeight
  this.renderedWidth = renderedWidth
  this.renderedHeight = renderedHeight
  this.imageSrc = imageSrc//have an index that incrments every time the windows requent animation frma is run
  this.name = name
  this.frameRate = frameRate
	this.render = function(){
    let img = new Image()
		img.src = this.imageSrc
    if (img.complete){
      //console.log(img,Math.floor(animationFrameIndex/(60/this.frameRate))%(img.width/this.frameWidth)*this.frameWidth,0,this.frameWidth,this.frameHeight,player.x-player.x+(canvas.width/2-(player.width/2))+this.relativeX, player.y-player.y+(canvas.height/2-(player.height/2))+this.relativeY, this.renderedWidth, this.renderedHeight)
      ctx.drawImage(img,Math.floor(animationFrameIndex/(60/this.frameRate))%(img.width/this.frameWidth)*this.frameWidth,0,this.frameWidth,this.frameHeight,player.x-player.x+(canvas.width/2-(player.width/2))+this.relativeX, player.y-player.y+(canvas.height/2-(player.height/2))+this.relativeY, this.renderedWidth, this.renderedHeight)
    }
  }
}
let handheldItemsList = []
handheldItemsList.push(new Handheld(12, 15, 14, 30, 7*1.5, 15*1.5, "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/candle-high.png?v=1653092161698", "candle", 12))
        
let flashlight = {
  on: true,
  xCenter: canvas.width/2,
  yCenter: canvas.height/2,
  size: 0.5,
  fadeOff: 0.5,
  flickerRate: 100,
  flickerSize: 50,
  render: function(){
    let sprintShrink = 1
    if (player.sprint&&(Math.abs(player.vx+player.vy)>0.5)){
      sprintShrink = 0.5
    }
    if (this.on){
    ctx.fillStyle = "black";
ctx.beginPath();
ctx.arc(this.xCenter, this.yCenter, (this.size*sprintShrink*(canvas.width/2))-(this.flickerSize*Math.abs(Math.sin(animationFrameIndex/this.flickerRate))), 0, 2 * Math.PI);
//ctx.arc(this.xCenter, this.yCenter, (this.size*(canvas.width/2)), 0, 2 * Math.PI);
//console.log(this.flickerSize*Math.abs(Math.sin(animationFrameIndex/this.flickerRate)))
ctx.rect(canvas.width, 0, -1*canvas.width, canvas.height);
ctx.fill();
    
    var grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 1, canvas.height/2, canvas.width/2, this.size*sprintShrink*(canvas.width/2))
grd.addColorStop(0, "rgba(255, 225, 0, 0.2)");
grd.addColorStop(this.fadeOff*(1+Math.sin(animationFrameIndex/this.flickerRate))/4+1-this.fadeOff, "black");//
//console.log(this.fadeOff*(1+Math.sin(animationFrameIndex/this.flickerRate))/4+1-this.fadeOff)
ctx.fillStyle = grd;
ctx.beginPath();
//ctx.arc(canvas.width/2, canvas.height/2, (this.size*(canvas.width/2))+5, 0, 2 * Math.PI);
//console.log(this.size*(canvas.width/2))-(this.flickerSize*Math.abs(Math.sin(animationFrameIndex/this.flickerRate)))
//console.log((this.size*(canvas.width/2))+1-(this.flickerSize*Math.abs(Math.sin(animationFrameIndex/this.flickerRate))))
ctx.arc(canvas.width/2, canvas.height/2, (this.size*sprintShrink*(canvas.width/2))+1-(this.flickerSize*Math.abs(Math.sin(animationFrameIndex/this.flickerRate))), 0, 2 * Math.PI);
ctx.fill();
    }else{
      ctx.fillStyle = "black";
ctx.beginPath();
ctx.rect(canvas.width, 0, -1*canvas.width, canvas.height);
ctx.fill();
    }
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
    let scale = wallScale
		ctx.moveTo((scale*this.x1)-player.x+(canvas.width/2-(player.width/2)), (scale*this.y1)-player.y+(canvas.height/2-(player.height/2)))
		ctx.lineTo((scale*this.x2)-player.x+(canvas.width/2-(player.width/2)), (scale*this.y2)-player.y+(canvas.height/2-(player.height/2)))
    ctx.lineWidth = 3
		ctx.stroke()
	}
}

let borders = []
const wallScale = 16
//TODO: REMEMBER TO CHANGE THE SCALE
//I CANNOT STRESS THIS ENOUGH
//WHEN YOU MAKE A NEW MAP, REMEBER TO LOAD THE SCALE

/*borders.push(new Wall(200,0,200,400,"#FF0000"))
borders.push(new Wall(0,0,0,400,"#FF0000"))
borders.push(new Wall(0,400,400,400,"#FF0000"))*/

borders.push(new Wall(0,0,31,0,"#FF0000"))
borders.push(new Wall(31,0,31,31,"#FF0000"))
borders.push(new Wall(31,31,0,31,"#FF0000"))
borders.push(new Wall(0,31,0,0,"#FF0000"))
        
borders.push(new Wall(3,0,3,15,"#FF0000"))
borders.push(new Wall(3,15,13,15,"#FF0000"))
borders.push(new Wall(13,15,13,12,"#FF0000"))
borders.push(new Wall(13,12,11,12,"#FF0000"))
borders.push(new Wall(8,12,6,12,"#FF0000"))
borders.push(new Wall(6,12,6,9,"#FF0000"))
borders.push(new Wall(6,9,16,9,"#FF0000"))
borders.push(new Wall(16,9,16,15,"#FF0000"))
borders.push(new Wall(6,9,6,3,"#FF0000"))
borders.push(new Wall(6,3,28,3,"#FF0000"))
borders.push(new Wall(28,3,28,28,"#FF0000"))
borders.push(new Wall(9,6,25,6,"#FF0000"))
borders.push(new Wall(25,6,25,28,"#FF0000"))
borders.push(new Wall(25,28,3,28,"#FF0000"))
borders.push(new Wall(3,28,3,18,"#FF0000"))
borders.push(new Wall(3,18,19,18,"#FF0000"))
borders.push(new Wall(19,18,19,9,"#FF0000"))
borders.push(new Wall(22,9,22,23,"#FF0000"))
borders.push(new Wall(22,21,6,21,"#FF0000"))
borders.push(new Wall(6,23,22,23,"#FF0000"))
borders.push(new Wall(22,25,6,25,"#FF0000"))
borders.push(new Wall(6,25,6,23,"#FF0000"))
        
let jumped = false
let jumpWait = Math.floor(((10)*Math.random()+20)*1000)
//jumpWait = 1
async function jumpscare(){
  await wait(jumpWait)
  jumped = true
  console.log("jumped")
  drawJumpScare(640, 360, 15, "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/monsterArray.png?v=1653442922115")
}
jumpscare()

function drawJumpScare(frameWidth, frameHeight, frameRate, src){
    let img = new Image()
		img.src = src
    /*if (img.complete){
      let drawnHeight = (canvas.width*img.height)/img.width
      ctx.drawImage(img,0,(canvas.height-drawnHeight)/2,canvas.width, drawnHeight)
    }*/
  //console.log("works till here 0")
    let maxSize = Math.max(frameWidth, frameHeight)
    let renderW = 0
    let renderH = 0
    if (frameWidth>frameHeight){
      maxSize = frameWidth
      renderW = canvas.width
      renderH = (renderW*frameHeight)/frameWidth
    }else{
      maxSize = frameHeight
      renderH = canvas.height
      renderW = (renderH*frameWidth)/frameHeight
    }
  console.log("valCalc")
    img.onload = function(){
  let frames = Math.round(img.width/frameWidth)+1
  console.log("drawing jump")
  renderJumpScareFrames(frames,frameRate,img, frameWidth, 0, frameWidth, frameHeight, 0, (canvas.height-renderH)/2, renderW, renderH)
    }
		img.src = src
}
async function renderJumpScareFrames(frames,frameRate,img,startX,startY,frameWidth,frameHeight,canvasX,canvasY,canvasW,canvasH){
 for (var i=0;i<frames;i++){
      //ctx.drawImage(img, 0, 0, 640, 360, 0, 0, 200, 200)
      ctx.drawImage(img, i*frameWidth, 0, frameWidth, frameHeight, canvasX, canvasY, canvasW, canvasH)
    //console.log(img, i*frameWidth, 0, frameWidth, frameHeight, 0, (canvas.height-renderH)/2, renderW, renderH)
    //console.log(Math.floor(i/(60/frameRate))%(img.width/frameWidth)*frameWidth)
  await wait(1000/frameRate)  
  }
}
        
function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let animationFrameIndex = 0
function renderChars() {
  canvas.width = canvas.width
  player.getKeys()
  player.render()
  borders.forEach(e => e.render())
  handheldItemsList.forEach(e => e.render())
  flashlight.render()
  if (!jumped){
    //drawJumpScare(720, 360, 12, "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/monsterArray.png?v=1653442922115")
  window.requestAnimationFrame(renderChars);
  }
  //console.log("rendering")
  animationFrameIndex++
}
renderChars()
function touchWall(boxX, boxY, boxWidth, boxHeight, wallX1, wallY1, wallX2, wallY2){
  let scale = wallScale
  if (linesIntersect(boxX, boxY, boxX+boxWidth, boxY, scale*wallX1, scale*wallY1, scale*wallX2, scale*wallY2)){
	return true
  }else if (linesIntersect(boxX+boxWidth, boxY, boxX+boxWidth, boxY+boxHeight, scale*wallX1, scale*wallY1, scale*wallX2, scale*wallY2)){
	return true
  }else if (linesIntersect(boxX, boxY+boxHeight, boxX+boxWidth, boxY+boxHeight, scale*wallX1, scale*wallY1, scale*wallX2, scale*wallY2)){
	return true
  }else if (linesIntersect(boxX, boxY, boxX, boxY+boxHeight, scale*wallX1, scale*wallY1, scale*wallX2, scale*wallY2)){
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