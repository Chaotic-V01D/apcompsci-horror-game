var canvas = document.getElementById("gameSpace");
let canvasDimensions = Math.min(innerWidth - 30, innerHeight - 30);
canvas.width = canvasDimensions;
canvas.height = canvasDimensions;
var ctx = canvas.getContext("2d");

const NZZ = 0.00000000001;

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
  x: 500,
  y: 700,
  vx: 0,
  vy: 0,
  width: 59 * 0.65,
  height: 128 * 0.65,
  color: "#00FF00",
  imageSrc:
    "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/childArray.png?v=1653430652415",
  maxSpeed: 3,
  sprint: 0,
  frameWidth: 59,
  frameHeight: 128,
  frameRate: 16,
  getKeys: function () {
    if (buttons[16]) {
      this.sprint = 3;
    } else {
      this.sprint = 0;
    }
    if (buttons[38] || buttons[87]) {
      this.vy = -(this.maxSpeed + this.sprint);
    } else if (buttons[40] || buttons[83]) {
      this.vy = this.maxSpeed + this.sprint;
    } else {
      this.vy *= 0.9;
    }
    if (buttons[37] || buttons[65]) {
      this.vx = -(this.maxSpeed + this.sprint);
    } else if (buttons[39] || buttons[68]) {
      this.vx = this.maxSpeed + this.sprint;
    } else {
      this.vx *= 0.9;
    }
  },
  render: function () {
    this.y += this.vy;
    let contact = false;
    borders.forEach(
      (wall) =>
        (contact =
          contact ||
          touchWall(
            Math.round(player.x + player.vx),
            Math.round(player.y + player.vy + (2 * player.height) / 3),
            Math.round(player.width),
            Math.round(player.height / 3),
            wall.x1,
            wall.y1,
            wall.x2,
            wall.y2
          ))
    );
    if (contact) {
      this.y -= 1.1 * this.vy;
      this.vy *= 0.5;
    }
    this.x += this.vx;
    contact = false;
    borders.forEach(
      (wall) =>
        (contact =
          contact ||
          touchWall(
            Math.round(player.x + player.vx),
            Math.round(player.y + player.vy + (2 * player.height) / 3),
            Math.round(player.width),
            Math.round(player.height / 3),
            wall.x1,
            wall.y1,
            wall.x2,
            wall.y2
          ))
    );
    if (contact) {
      this.x -= 1.1 * this.vx;
      this.vx *= 0.5;
    }

    if (this.imageSrc == "") {
      ctx.fillStyle = player.color;
      ctx.fillRect(
        player.x - player.x + (canvas.width / 2 - player.width / 2),
        player.y - player.y + (canvas.height / 2 - player.height / 2),
        player.width,
        player.height
      );
    } else {
      let img = new Image();
      img.src = this.imageSrc;
      if (img.complete) {
        ctx.drawImage(
          img,
          (Math.floor(animationFrameIndex / (60 / this.frameRate)) %
            (img.width / this.frameWidth)) *
            this.frameWidth,
          0,
          this.frameWidth,
          this.frameHeight,
          player.x - player.x + (canvas.width / 2 - player.width / 2),
          player.y - player.y + (canvas.height / 2 - player.height / 2),
          this.width,
          this.height
        );
      }
      //https://stackoverflow.com/a/21625083
      //Thank ******* GOD that this ************ exists!!!
      //4 ******* HOURS I SPENT TRYINGTO FIGURE OUT WHY THE **** THIS LITTLE BUGGER DIDN'T WANT TO DRAW
      //Then, ALL OF A SUDDEN I think, what if I only draw it once?
      //THAT WORKS
      //*try it twice*
      //THAT WORKS
      //*put it in a loop*
      //** WHY
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
    }
  },
};

function Handheld(
  relativeX,
  relativeY,
  frameWidth,
  frameHeight,
  renderedWidth,
  renderedHeight,
  imageSrc,
  name,
  frameRate
) {
  this.relativeX = relativeX;
  this.relativeY = relativeY;
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;
  this.renderedWidth = renderedWidth;
  this.renderedHeight = renderedHeight;
  this.imageSrc = imageSrc;
  this.name = name;
  this.frameRate = frameRate;
  this.render = function () {
    let img = new Image();
    img.src = this.imageSrc;
    if (img.complete) {
      ctx.drawImage(
        img,
        (Math.floor(animationFrameIndex / (60 / this.frameRate)) %
          (img.width / this.frameWidth)) *
          this.frameWidth,
        0,
        this.frameWidth,
        this.frameHeight,
        player.x -
          player.x +
          (canvas.width / 2 - player.width / 2) +
          this.relativeX,
        player.y -
          player.y +
          (canvas.height / 2 - player.height / 2) +
          this.relativeY,
        this.renderedWidth,
        this.renderedHeight
      );
    }
  };
}
let handheldItemsList = [];
handheldItemsList.push(
  new Handheld(
    30,
    40,
    14,
    30,
    7 * 2.75,
    15 * 2.75,
    "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/candle-high.png?v=1653092161698",
    "candle",
    12
  )
);

let flashlight = {
  on: true,
  xCenter: canvas.width / 2,
  yCenter: canvas.height / 2,
  size: 0.75,
  fadeOff: 0.5,
  flickerRate: 100,
  flickerSize: 50,
  render: function () {
    let sprintShrink = 1;
    if (player.sprint && Math.abs(player.vx + player.vy) > 0.5) {
      sprintShrink = 0.5;
    }
    if (this.on) {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(
        this.xCenter,
        this.yCenter,
        this.size * sprintShrink * (canvas.width / 2) -
          this.flickerSize *
            Math.abs(Math.sin(animationFrameIndex / this.flickerRate)),
        0,
        2 * Math.PI
      );
      ctx.rect(canvas.width, 0, -1 * canvas.width, canvas.height);
      ctx.fill();

      var grd = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        1,
        canvas.height / 2,
        canvas.width / 2,
        this.size * sprintShrink * (canvas.width / 2)
      );
      grd.addColorStop(0, "rgba(255, 225, 0, 0.2)");
      grd.addColorStop(
        (this.fadeOff *
          (1 + Math.sin(animationFrameIndex / this.flickerRate))) /
          4 +
          1 -
          this.fadeOff,
        "black"
      );
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        this.size * sprintShrink * (canvas.width / 2) +
          1 -
          this.flickerSize *
            Math.abs(Math.sin(animationFrameIndex / this.flickerRate)),
        0,
        2 * Math.PI
      );
      ctx.fill();
    } else {
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.rect(canvas.width, 0, -1 * canvas.width, canvas.height);
      ctx.fill();
    }
  },
};

function Wall(x1, y1, x2, y2, color) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.color = color;
  this.render = function () {
    if (this.color !== "#") {
      ctx.strokeStyle = this.color;
    } else {
      ctx.strokeStyle = "rgba(0, 0, 0, 0)";
    }
    let scale = wallScale;
    ctx.moveTo(
      scale * this.x1 - player.x + (canvas.width / 2 - player.width / 2),
      scale * this.y1 - player.y + (canvas.height / 2 - player.height / 2)
    );
    ctx.lineTo(
      scale * this.x2 - player.x + (canvas.width / 2 - player.width / 2),
      scale * this.y2 - player.y + (canvas.height / 2 - player.height / 2)
    );
    ctx.lineWidth = 3;
    ctx.stroke();
  };
}

let borders = [];
const wallScale = 100;
//TODO: REMEMBER TO CHANGE THE SCALE
//I CANNOT STRESS THIS ENOUGH
//WHEN YOU MAKE A NEW MAP, REMEBER TO LOAD THE SCALE

let newBackground = 0

borders.push(new Wall(0, 8.3, 1.2, 4.5, "#"));
borders.push(new Wall(1.2, 4.5, 1.6, 4.7, "#"));
borders.push(new Wall(1.6, 4.7, 3.35, 4, "#"));
borders.push(new Wall(3.35, 4, 3.35, 2.8, "#"));
borders.push(new Wall(3.35, 2.8, 6.75, 2.8, "#"));
borders.push(new Wall(6.75, 2.8, 7.3, 3, "#"));
borders.push(new Wall(7.3, 3, 7.4, 2.8, "#"));
borders.push(new Wall(7.3, 2.8, 7.4, 1.3, "#"));
borders.push(new Wall(7.4, 1.3, 8.1, 1.3, "#"));
borders.push(new Wall(8.1, 1.3, 8.1, 2.8, "#"));
borders.push(new Wall(8.1, 2.8, 8.45, 2.8, "#"));
borders.push(new Wall(8.45, 2.8, 8.9, 4.6, "#"));
borders.push(new Wall(8.9, 4.6, 8.3, 4.3, "#"));
borders.push(new Wall(8.3, 4.3, 6, 5.1, "#"));
borders.push(new Wall(6, 5.1, 5.6, 5.6, "#"));
borders.push(new Wall(5.6, 5.6, 5.6, 5.85, "#"));
borders.push(new Wall(5.6, 5.85, 7.8, 7.1, "#"));
borders.push(new Wall(7.8, 7.1, 8.8, 6.5, "#"));
borders.push(new Wall(8.8, 6.5, 9, 5, "#"));
borders.push(new Wall(9, 5, 9.8, 8.3, "#"));
borders.push(new Wall(9.8, 8.3, 0, 8.3, "#"));

newBackground = new Background(
  1000,
  840,
  [new PortalPoint(775, 200, 1, 700, 500)],
  [new PickupPoint(350, 380, "red key", "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/redKey.png?v=1654404920320")],
  [],
  0,
  "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/bedroom.png?v=1653515776746"
);

function Background(width, height, portalsList, pickupList, animationList, bgIndex, src) {
  //console.log("new BG created w index " + bgIndex)
  this.width = width;
  this.height = height;
  this.portalsList = portalsList;
  this.pickupList = pickupList;
  this.animationList = animationList
  this.bgIndex = bgIndex;
  this.src = src;
  this.checkPoints = function () {
    //When runn while the current background is the hallway, it is giving the wring result
    //it is saying that the new background is the hallway instead of the bedroom
    //console.log("portalsList length " + this.portalsList.length)
    for (var i = 0; i < this.portalsList.length; i++) {
      //console.log(this.portalsList[i])
      if (
        playerOccupiesPoint(
          player.x,
          player.y,
          player.width,
          player.height,
          this.portalsList[i].portalX,
          this.portalsList[i].portalY
        )
      ) {
        console.log("woah there, thats an overlap!");
        //console.log(this.portalsList)
        //console.log(this.portalsList[i].newMap)
        return [
          this.portalsList[i].newMap,
          this.portalsList[i].newX,
          this.portalsList[i].newY,
        ];
      }
    }
    //console.log("no overlap")
    return 0;
  };
  
  this.checkPickup = function(){
    for (var i = 0; i < this.pickupList.length; i++) {
      if (
        playerOccupiesPoint(
          player.x,
          player.y,
          player.width,
          player.height,
          this.pickupList[i].pickupX,
          this.pickupList[i].pickupY
        )
      ) {
        if (!playerInventory.some(element=> element.itemName==this.pickupList[i].itemName)){
        console.log("woah there, thats an overlap! I got me a new ITEM");
          playerInventory.push(new InventoryItem(this.pickupList[i].itemName, 0.15, this.pickupList[i].src))
          jumpWait = Math.max(jumpWait-(20), 0) + 5
        }
      }
    }
    //console.log("no overlap")
    return 0;
  }
  this.renderAnimations = function(){
    this.animationList.forEach(e=>e.render())
  }
  this.render = function () {
    let img = new Image();
    img.src = this.src;
    if (img.complete) {
      ctx.drawImage(
        img,
        0 - player.x + (canvas.width / 2 - player.width / 2),
        0 - player.y + (canvas.height / 2 - player.height / 2),
        this.width,
        this.height
      );
    }
  };
}

function PortalPoint(portalX, portalY, newMap, newX, newY) {
  this.portalX = portalX;
  this.portalY = portalY;
  this.newMap = newMap;
  this.newX = newX;
  this.newY = newY;
}

function PickupPoint(pickupX, pickupY, itemName, src){
  this.pickupX = pickupX
  this.pickupY = pickupY
  this.itemName = itemName
  this.src = src
}

function InventoryItem(itemName, scale, src){
  this.itemName = itemName
  this.scale = scale
  this.src = src
  this.render = function(inventoryIndex){
    let img = new Image();
    img.src = this.src;
    if (img.complete) {
      ctx.drawImage(
        img,
        64,
        inventoryIndex*(this.scale*img.width+32)+64,
        this.scale*img.width,
        this.scale*img.height
      );
    }
  }
}
let playerInventory = []

function AnimPoint(animX, animY, frameW, frameH, animW, animH, animFrameRate, animName, animTrigger, additionalInstructions, src){
  this.animX = animX
  this.animY = animY
  this.frameW = frameW
  this.frameH = frameH
  this.animW = animW
  this.animH = animH
  this.animFrameRate = animFrameRate
  this.animName = animName
  this.animTrigger = animTrigger
  this.additionalInstructions = additionalInstructions
  this.src = src
  this.animRunning = 0
  this.render = function(){
    /*console.log("triggered: " + eval(this.animTrigger))
    console.log(playerOccupiesPoint(
          player.x,
          player.y,
          player.width,
          player.height,
          510,
          420))
    console.log(playerInventory.length>2)*/
      if (eval(this.animTrigger)){
        console.log("triggered")
        if (this.animRunning==-1){
          console.log("hasn't run")
        }
        //this.animRunning = true
        let img = new Image();
        img.src = this.src;
        console.log((this.animRunning+1)*this.frameW)
        console.log(img.width)
        if ((this.animRunning+2)*this.frameW<=img.width){
          this.animRunning+=1
        }else if ((this.animRunning+1)*this.frameW<=img.width){
          eval(this.additionalInstructions)
console.log(this.additonalInstructions)
        }
        if (img.complete) {
              ctx.drawImage(
                img,
                this.animRunning*this.frameW,
                0,
                this.frameW,
                this.frameH,
                this.animX - player.x + (canvas.width / 2 - player.width / 2),
                this.animY - player.y + (canvas.height / 2 - player.height / 2),
                this.animW,
                this.animH);
        }
    }else{
      let img = new Image();
        img.src = this.src;
        if (img.complete) {
              ctx.drawImage(
                img,
                this.animRunning*this.frameW,
                0,
                this.frameW,
                this.frameH,
                this.animX - player.x + (canvas.width / 2 - player.width / 2),
                this.animY - player.y + (canvas.height / 2 - player.height / 2),
                this.animW,
                this.animH);
        }
    }
  }
}

let jumped = false;
//let jumpWait = Math.floor((10 * Math.random() + 20) * 1000);
let jumpWait = 80
//jumpWait = 1
async function jumpscare() {
  for (var i=0;i<jumpWait;i++){
  await wait(1000);
  }
  jumped = true;
  console.log("jumped");
  drawJumpScare(
    640,
    360,
    15,
    "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/monsterArray.png?v=1653442922115"
  );
}
jumpscare();

function drawJumpScare(frameWidth, frameHeight, frameRate, src) {
  let img = new Image();
  img.src = src;
  let maxSize = Math.max(frameWidth, frameHeight);
  let renderW = 0;
  let renderH = 0;
  if (frameWidth > frameHeight) {
    maxSize = frameWidth;
    renderW = canvas.width;
    renderH = (renderW * frameHeight) / frameWidth;
  } else {
    maxSize = frameHeight;
    renderH = canvas.height;
    renderW = (renderH * frameWidth) / frameHeight;
  }
  console.log("valCalc");
  if (jumpWait!=="a"){
  img.onload = function () {
    let frames = Math.round(img.width / frameWidth) + 1;
    console.log("drawing jump");
    renderJumpScareFrames(
      frames,
      frameRate,
      img,
      frameWidth,
      0,
      frameWidth,
      frameHeight,
      0,
      (canvas.height - renderH) / 2,
      renderW,
      renderH
    );
  };
  img.src = src;
  }
}
async function renderJumpScareFrames(
  frames,
  frameRate,
  img,
  startX,
  startY,
  frameWidth,
  frameHeight,
  canvasX,
  canvasY,
  canvasW,
  canvasH
) {
  for (var i = 0; i < frames; i++) {
    ctx.drawImage(
      img,
      i * frameWidth,
      0,
      frameWidth,
      frameHeight,
      canvasX,
      canvasY,
      canvasW,
      canvasH
    );
    await wait(1000 / frameRate);
  }
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let animationFrameIndex = 0;
function renderChars() {
  canvas.width = canvas.width;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  let newBackgroundToSet = newBackground.bgIndex;
  let portalOverlap = newBackground.checkPoints();
  let pickupOverlap = newBackground.checkPickup()
  
  /*for (var i=0;i<playerInventory.length;i++){
    playerInventory[i].render(i)
  }*/
  playerInventory.forEach((inventoryItem, index)=> inventoryItem.render(index))
  
  if (portalOverlap !== 0) {
    newBackgroundToSet = portalOverlap[0];
    player.x = portalOverlap[1];
    player.y = portalOverlap[2];
    //Testing below with repositioning...?
    console.log("the old background is " + newBackground.bgIndex);
    console.log("new background index to set to: " + newBackgroundToSet);
    if (newBackgroundToSet == 0) {
      console.log("the new background is the bedroom");
      borders = [];
      borders.push(new Wall(0, 8.3, 1.2, 4.5, "#"));
      borders.push(new Wall(1.2, 4.5, 1.6, 4.7, "#"));
      borders.push(new Wall(1.6, 4.7, 3.35, 4, "#"));
      borders.push(new Wall(3.35, 4, 3.35, 2.8, "#"));
      borders.push(new Wall(3.35, 2.8, 6.75, 2.8, "#"));
      borders.push(new Wall(6.75, 2.8, 7.3, 3, "#"));
      borders.push(new Wall(7.3, 3, 7.4, 2.8, "#"));
      borders.push(new Wall(7.3, 2.8, 7.4, 1.3, "#"));
      borders.push(new Wall(7.4, 1.3, 8.1, 1.3, "#"));
      borders.push(new Wall(8.1, 1.3, 8.1, 2.8, "#"));
      borders.push(new Wall(8.1, 2.8, 8.45, 2.8, "#"));
      borders.push(new Wall(8.45, 2.8, 8.9, 4.6, "#"));
      borders.push(new Wall(8.9, 4.6, 8.3, 4.3, "#"));
      borders.push(new Wall(8.3, 4.3, 6, 5.1, "#"));
      borders.push(new Wall(6, 5.1, 5.6, 5.6, "#"));
      borders.push(new Wall(5.6, 5.6, 5.6, 5.85, "#"));
      borders.push(new Wall(5.6, 5.85, 7.8, 7.1, "#"));
      borders.push(new Wall(7.8, 7.1, 8.8, 6.5, "#"));
      borders.push(new Wall(8.8, 6.5, 9, 5, "#"));
      borders.push(new Wall(9, 5, 9.8, 8.3, "#"));
      borders.push(new Wall(9.8, 8.3, 0, 8.3, "#"));

      newBackground = new Background(
  1000,
  840,
  [new PortalPoint(775, 200, 1, 700, 500)],
  [new PickupPoint(310, 380, "red key", "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/redKey.png?v=1654404920320")],
        [],
  0,
  "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/bedroom.png?v=1653515776746"
);
      console.log(newBackground);
    } else if (newBackgroundToSet == 1) {
      console.log("the new background is the hallway");
      borders = [];
      borders.push(new Wall(0, 8.3, 0, 7.1, "#"));
      borders.push(new Wall(0, 7.1, 0.7, 6.6, "#"));
      borders.push(new Wall(0.7, 6.6, 0.7, 5.5, "#"));
      borders.push(new Wall(0.7, 5.5, 1.7, 5, "#"));
      borders.push(new Wall(1.7, 5, 1.7, 5.9, "#"));
      borders.push(new Wall(1.7, 5.9, 2, 5.8, "#"));
      borders.push(new Wall(2, 5.8, 2.7, 5.3, "#"));
      borders.push(new Wall(2.7, 5.3, 2.7, 4.6, "#"));
      borders.push(new Wall(2.7, 4.6, 3, 4.4, "#"));
      borders.push(new Wall(3, 4.4, 3, 4.9, "#"));
      borders.push(new Wall(3, 4.9, 3.3, 4.9, "#"));
      borders.push(new Wall(3.3, 4.9, 3.55, 4.7, "#"));
      borders.push(new Wall(3.55, 4.7, 3.55, 4.2, "#"));
      borders.push(new Wall(3.55, 4.2, 3.7, 4.1, "#"));
      borders.push(new Wall(3.7, 4.1, 3.7, 4.5, "#"));
      borders.push(new Wall(3.7, 4.5, 3.8, 4.5, "#"));
      borders.push(new Wall(3.8, 4.5, 4, 4.3, "#"));
      borders.push(new Wall(4, 4.3, 4.3, 4.3, "#"));
      borders.push(new Wall(4.3, 4.3, 4.3, 4, "#"));
      
      borders.push(new Wall(4.3, 4, 5.9, 4, "#"));
      
      borders.push(new Wall(5.9, 4, 5.9, 4.3, "#"));
      borders.push(new Wall(5.9, 4.3, 6.2, 4.3, "#"));
      borders.push(new Wall(6.2, 4.3, 6.5, 4.5, "#"));
      borders.push(new Wall(6.5, 4.5, 6.6, 4.6, "#"));
      borders.push(new Wall(6.6, 4.6, 6.6, 4, "#"));
      borders.push(new Wall(6.6, 4, 6.8, 4.1, "#"));
      borders.push(new Wall(6.8, 4.1, 6.8, 4.7, "#"));
      borders.push(new Wall(6.8, 4.7, 7.2, 5, "#"));
      borders.push(new Wall(7.2, 5, 7.5, 5, "#"));
      borders.push(new Wall(7.5, 5, 7.5, 4.3, "#"));
      borders.push(new Wall(7.5, 4.3, 8, 4.6, "#"));
      borders.push(new Wall(8, 4.6, 8, 5.6, "#"));
      borders.push(new Wall(8, 5.6, 9.1, 6.5, "#"));
      borders.push(new Wall(9.1, 6.5, 9.4, 6.5, "#"));
      borders.push(new Wall(9.4, 6.5, 9.4, 5, "#"));
      borders.push(new Wall(9.4, 5, 10, 5.3, "#"));
      borders.push(new Wall(10, 5.3, 10, 8.3, "#"));
      borders.push(new Wall(10, 8.3, 0, 8.3, "#"));

      newBackground = new Background(
        1000,
        830,
        [new PortalPoint(775, 525, 0, 775, 300), new PortalPoint(120, 615, 2, 740, 750),  new PortalPoint(510, 360, 3, 180, 180)],
        [new PickupPoint(960, 700, "yellow key", "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/yellowKey.png?v=1654404937365")],
         [new AnimPoint(434, 318, 50, 36, 154, 115, 1, "endingDoor", 
          "(playerOccupiesPoint(player.x,player.y,player.width,player.height,510,420)&&playerInventory.length>2)", 
          //"(playerOccupiesPoint(player.x,player.y,player.width,player.height,510,420))", 
          "borders.splice(19, 1, (new Wall(4.3, 4, 4.3, 3.18, '#')));borders.splice(20, 0, (new Wall(4.3, 3.18, 5.9, 3.18, '#')));borders.splice(21, 0, (new Wall(5.9, 3.18, 5.9, 4, '#')))",
          "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/hallwayDoorArray.png?v=1654485020612")],
        1,
        "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/hallway?v=1654090154156"
      );
      console.log("hallway bg");
    } else if (newBackgroundToSet == 2) {
      console.log("the new background is the playroom");
      borders = [];
      borders.push(new Wall(0, 8.3, 0, 6.3, "#"));
      borders.push(new Wall(0, 6.3, 0.85, 6.1, "#"));
      borders.push(new Wall(0.85, 6.1, 0.85, 6.4, "#"));
      borders.push(new Wall(0.85, 6.4, 1.7, 6.6, "#"));
      borders.push(new Wall(1.7, 6.6, 3.3, 6, "#"));
      borders.push(new Wall(3.3, 6, 3.3, 5.4, "#"));
      borders.push(new Wall(3.3, 5.4, 5.1, 5, "#"));
      borders.push(new Wall(5.1, 5, 5.8, 5.2, "#"));
      borders.push(new Wall(5.8, 5.2, 4.8, 6.2, "#"));
      borders.push(new Wall(4.8, 6.2, 4.8, 6.8, "#"));
      borders.push(new Wall(4.8, 6.8, 6, 7, "#"));
      borders.push(new Wall(6, 7, 6.6, 6.6, "#"));
      borders.push(new Wall(6.6, 6.6, 7.6, 7.3, "#"));
      borders.push(new Wall(7.6, 7.3, 9.5, 6.8, "#"));
      borders.push(new Wall(9.5, 6.8, 9.5, 6.1, "#"));
      borders.push(new Wall(9.5, 6.1, 10, 6.2, "#"));
      borders.push(new Wall(10, 6.2, 10, 8.3, "#"));
      borders.push(new Wall(10, 8.3, 0, 8.3, "#"));
      
      newBackground = new Background(
        1000,
        830,
        [new PortalPoint(950, 800, 1, 160, 630)],
        [new PickupPoint(100, 625, "green key", "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/greenKey.png?v=1654404928746")],
       [],
        1,
        "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/playroom?v=1654265997147"
      );
    }else if(newBackgroundToSet == 3) {
      newBackground = new Background(
        360,
        360,
        [],
        [],
       [],
        2,
        "https://cdn.glitch.global/cf3d5119-1db8-4359-89ae-64ec2566a331/credits2.png?v=1654489308956"
      );
      console.log("Everything neutralized")
      player.height = 0
      player.maxSpeed = 0
      handheldItemsList.forEach(e=>e.renderedHeight=0)
      playerInventory.forEach(e=>e.scale = 0)
      jumpWait = "a"
    }
  }
  //console.log("bg pre render: " + newBackground.src)
  newBackground.render();
  newBackground.renderAnimations()
  //console.log("bg post render: " + newBackground.bgIndex);
  player.getKeys();
  player.render();
  borders.forEach((e) => e.render());
  handheldItemsList.forEach((e) => e.render());
  if (jumpWait!=="a"){
  flashlight.render();
  }
  if (!jumped){
  playerInventory.forEach((inventoryItem, index)=> inventoryItem.render(index))
  }
  if (!jumped) {
    window.requestAnimationFrame(renderChars);
  }
  animationFrameIndex++;
}
renderChars();
function playerOccupiesPoint(
  playerX,
  playerY,
  playerWidth,
  playerHeight,
  qx,
  qy
) {
  if (valBW(qx, playerX, playerX + playerWidth)) {
    if (valBW(qy, playerY, playerY + playerHeight)) {
      return true;
    }
  }
  return false;
}
function touchWall(
  boxX,
  boxY,
  boxWidth,
  boxHeight,
  wallX1,
  wallY1,
  wallX2,
  wallY2
) {
  let scale = wallScale;
  if (
    linesIntersect(
      boxX,
      boxY,
      boxX + boxWidth,
      boxY,
      scale * wallX1,
      scale * wallY1,
      scale * wallX2,
      scale * wallY2
    )
  ) {
    return true;
  } else if (
    linesIntersect(
      boxX + boxWidth,
      boxY,
      boxX + boxWidth,
      boxY + boxHeight,
      scale * wallX1,
      scale * wallY1,
      scale * wallX2,
      scale * wallY2
    )
  ) {
    return true;
  } else if (
    linesIntersect(
      boxX,
      boxY + boxHeight,
      boxX + boxWidth,
      boxY + boxHeight,
      scale * wallX1,
      scale * wallY1,
      scale * wallX2,
      scale * wallY2
    )
  ) {
    return true;
  } else if (
    linesIntersect(
      boxX,
      boxY,
      boxX,
      boxY + boxHeight,
      scale * wallX1,
      scale * wallY1,
      scale * wallX2,
      scale * wallY2
    )
  ) {
    return true;
  }
  return false;
}

function valBW(Qval, val1, val2) {
  if (val1 < val2) {
    return val1 <= Qval && Qval <= val2;
  } else {
    return val2 <= Qval && Qval <= val1;
  }
}

function linesIntersect(a, b, c, d, p, q, r, s) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}
/*
 *    Title: Intersection code
 *    Author: SFox, D
 *    Date: 2014
 *    Code version: 2.0
 *    Availability: https://stackoverflow.com/a/24392281*/
