var simpleLevelPlan = [
  "                      ",
  "                      ",
  "  x              = x  ",
  "  x         o o    x  ",
  "  x @      xxxxx   x  ",
  "  xxxxx            x  ",
  "      x!!!!!!!!!!!!x  ",
  "      xxxxxxxxxxxxxx  ",
  "                      "
];

var mess1 = 1;
var mess2 = 1;

var score = 0;
var timegap = 0;

var bla = 0;
var whi = 0;
var cya = 0;
var blu = 0;
var mag = 0;
var re = 0;
var yel = 0;
var gre = 0;

function Level(plan, num) {
  this.number = num;
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.actors = [];
  document.documentElement.style.setProperty(`--base`, "#A0A0A0");
  
  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      var Actor = actorChars[ch];
      if (Actor)
        this.actors.push(new Actor(new Vector(x, y), ch));
      if (ch == "x")
        fieldType = "wall";
      if (ch == "!")
        fieldType = "lava";
      if (ch == "q" || ch == "w" || ch == "e" || ch == "r" || ch == "t" || ch == "y" || ch == "u" || ch == "i" || ch == "p" || ch == "m" || ch == "n")
        fieldType = "door";
     if (ch == "a" || ch == "s" || ch == "d" || ch == "f" || ch == "g" || ch == "h" || ch == "j" || ch == "k" || ch == "l" || ch == "c"  || ch == "z")
       fieldType = "platform";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }

  this.player = this.actors.filter(function(actor) {
    return actor.type == "player";
  })[0];
  this.status = this.finishDelay = null;
}

Level.prototype.isFinished = function() {
  if ((this.status == "lost" || this.status == "won") && this.finishDelay <0)
    return true;
  // return this.status != null && this.finishDelay < 0;
};

function Vector(x, y) {
  this.x = x; this.y = y;
}
Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
};
Vector.prototype.times = function(factor) {
  return new Vector(this.x * factor, this.y * factor);
};

var actorChars = {
  "@": Player,
  "o": Coin,
  "=": Lava, "|": Lava, "v": Lava,
  "1": Paint, "2": Paint, "3": Paint, "4": Paint, "5": Paint, "6": Paint, "7": Paint, "8": Paint,
  "q": Door, "w": Door, "e": Door, "r": Door, "t": Door, "y": Door, "u": Door,  "i": Door, "p": Door, "m": Door,  "n": Door,  
  "a": Platform, "s": Platform, "d": Platform, "f": Platform, "g": Platform, "h": Platform, "j": Platform, "k": Platform, "l": Platform, "c": Platform, "z": Platform, 
};

function Player(pos) {
  this.pos = pos.plus(new Vector(0, -0.5));
  this.size = new Vector(0.8, 1.5);
  this.speed = new Vector(0, 0);
  this.background = "red";
}
Player.prototype.type = "player";

function Lava(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "=") {
    this.speed = new Vector(2, 0);
  } else if (ch == "|") {
    this.speed = new Vector(0, 2);
  } else if (ch == "v") {
    this.speed = new Vector(0, 3);
    this.repeatPos = pos;
  }
}
Lava.prototype.type = "lava";

function Paint(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "1") {
    this.color = "#000000";
    this.type = "paint";
  } else if (ch == "2") {
    this.color = "#FFFFFF";
    this.type = "paint paint2";
  } else if (ch == "3") {
    this.color = "#00FFFF";
    this.type = "paint paint3";
  } else if (ch == "4") {
    this.color = "#0000FF";
    this.type = "paint paint4";
  } else if (ch == "5") {
    this.color = "#FF00FF";
    this.type = "paint paint5";
  } else if (ch == "6") {
    this.color = "#FF0000";
    this.type = "paint paint6";
  }else if (ch == "7") {
    this.color = "#FFFF00";
    this.type = "paint paint7";
  } else if (ch == "8") {
    this.color = "#00FF00";
    this.type = "paint paint8";
  }
}

function Door(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "q") {
    this.color = "#000000";
    this.type = "door";
  } else if (ch == "w") {
    this.color = "#FFFFFF";
    this.type = "door door2";
  } else if (ch == "e") {
    this.color = "#00FFFF";
    this.type = "door door3";
  } else if (ch == "r") {
    this.color = "#0000FF";
    this.type = "door door4";
  } else if (ch == "t") {
    this.color = "#FF00FF";
    this.type = "door door5";
  } else if (ch == "y") {
    this.color = "#FF0000";
    this.type = "door door6";
  } else if (ch == "u") {
    this.color = "#FFFF00";
    this.type = "door door7";
  } else if (ch == "i") {
    this.color = "#00FF00";
    this.type = "door door8";
  } else if (ch == "p") {
    this.color = "#0099FF";
    this.type = "door door9";
  } else if (ch == "m") {
    this.color = "#FF00A3";
    this.type = "door door10";
  } else if (ch == "n") {
    this.color = "#A100FF";
    this.type = "door door11";
  }
}

function Platform(pos, ch) {
  this.pos = pos;
  this.size = new Vector(1, 1);
  if (ch == "a") {
    this.color = "#000000";
    this.type = "platform";
  } else if (ch == "s") {
    this.color = "#FFFFFF";
    this.type = "platform platform2";
  } else if (ch == "d") {
    this.color = "#00FFFF";
    this.type = "platform platform3";
  } else if (ch == "f") {
    this.color = "#0000FF";
    this.type = "platform platform4";
  } else if (ch == "g") {
    this.color = "#FF00FF";
    this.type = "platform platform5";
  } else if (ch == "h") {
    this.color = "#FF0000";
    this.type = "platform platform6";
  } else if (ch == "j") {
    this.color = "#FFFF00";
    this.type = "platform platform7";
  } else if (ch == "k") {
    this.color = "#00FF00";
    this.type = "platform platform8";
  } else if (ch == "l") {
    this.color = "#ADFF00";
    this.type = "platform platform9";
  } else if (ch == "c") {
    this.color = "#FF6F00";
    this.type = "platform platform10";
  } else if (ch == "z") {
    this.color = "#00FFB1";
    this.type = "platform platform11";
  }
}

function Coin(pos) {
  this.basePos = this.pos = pos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.random() * Math.PI * 2;
}
Coin.prototype.type = "coin";

var simpleLevel = new Level(simpleLevelPlan, 0);

function elt(name, className) {
  var elt = document.createElement(name);
  if (className) elt.className = className;
  return elt;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(elt("div", "game"));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorLayer = null;
  this.drawFrame();
}

var scale = 20;

DOMDisplay.prototype.drawBackground = function() {
  var table = elt("table", "background");
  table.style.width = this.level.width * scale + "px";
  this.level.grid.forEach(function(row) {
    var rowElt = table.appendChild(elt("tr"));
    rowElt.style.height = scale + "px";
    row.forEach(function(type) {
      rowElt.appendChild(elt("td", type));
    });
  });
  return table;
};

DOMDisplay.prototype.drawActors = function() {
  var wrap = elt("div");
  this.level.actors.forEach(function(actor) {
    var rect = wrap.appendChild(elt("div",
                                    "actor " + actor.type));
    rect.style.width = actor.size.x * scale + "px";
    rect.style.height = actor.size.y * scale + "px";
    rect.style.left = actor.pos.x * scale + "px";
    rect.style.top = actor.pos.y * scale + "px";
  });
  return wrap;
};

DOMDisplay.prototype.drawFrame = function() {
  if (this.actorLayer)
    this.wrap.removeChild(this.actorLayer);
  this.actorLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = "game " + (this.level.status || "");
  this.scrollPlayerIntoView();
};

DOMDisplay.prototype.scrollPlayerIntoView = function() {
  var width = this.wrap.clientWidth;
  var height = this.wrap.clientHeight;
  var margin = width / 3;

  // The viewport
  var left = this.wrap.scrollLeft, right = left + width;
  var top = this.wrap.scrollTop, bottom = top + height;

  var player = this.level.player;
  var center = player.pos.plus(player.size.times(0.5))
                 .times(scale);

  if (center.x < left + margin)
    this.wrap.scrollLeft = center.x - margin;
  else if (center.x > right - margin)
    this.wrap.scrollLeft = center.x + margin - width;
  if (center.y < top + margin)
    this.wrap.scrollTop = center.y - margin;
  else if (center.y > bottom - margin)
    this.wrap.scrollTop = center.y + margin - height;
};

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
};

Level.prototype.obstacleAt = function(pos, size) {
  var xStart = Math.floor(pos.x);
  var xEnd = Math.ceil(pos.x + size.x);
  var yStart = Math.floor(pos.y);
  var yEnd = Math.ceil(pos.y + size.y);

  if (xStart < 0 || xEnd > this.width || yStart < 0)
    return "wall";
  if (yEnd > this.height)
    return "lava";
  for (var y = yEnd-1; y >= yStart; y--) {
    for (var x = xEnd-1; x >= xStart; x--) {
      var fieldType = this.grid[y][x];
      if (fieldType == "door" && y)
      return this.actorAtSpot(pos, size);
      else if(fieldType == "platform" ) return this.actorAtSpot(pos, size);
      else if (fieldType) return fieldType;
    }
  }
};

Level.prototype.actorAtSpot = function(pos, size) { //.8, 1.5
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (size != other.size &&
      pos.x + size.x > other.pos.x &&
        pos.x < other.pos.x + other.size.x &&
        pos.y + size.y > other.pos.y &&
        pos.y < other.pos.y + other.size.y){
      return other;
    }
  }
};

Level.prototype.actorAt = function(actor) {
  for (var i = 0; i < this.actors.length; i++) {
    var other = this.actors[i];
    if (other != actor &&
        actor.pos.x + actor.size.x > other.pos.x &&
        actor.pos.x < other.pos.x + other.size.x &&
        actor.pos.y + actor.size.y > other.pos.y &&
        actor.pos.y < other.pos.y + other.size.y)
      return other;
  }
};

var maxStep = 0.05;

Level.prototype.animate = function(step, level, keys) {
  timegap+=1;
  if(level.number == 0 && mess1 == 1)
    document.getElementById("textPlace").innerHTML = "Collect all the coins to move to the next level! Try touching the blob of black paint on the hill.";
  if(level.number == 2 && mess2 == 1)
    document.getElementById("textPlace").innerHTML = "You collected all the primary and secondary colors! Your palette has been upgraded. When you pass through a door or stand on a platform, you'll get points based on how close you are to the correct color.";

  if(level.number<2 || level.number>2){
    document.getElementById("base").style.display = "none";
    document.getElementById("wheelimg").style.display = "none";
    document.getElementById("scoreboard").style.display = "none";
  } else {
    document.getElementById("scoreboard").style.display = "inline";
    document.getElementById("scoreboard").innerHTML = "Score: " + Math.trunc(score);
    document.getElementById("base").style.display = "inline";
    document.getElementById("wheelimg").style.display = "inline";
    bla = whi = cya = blu = mag = re = yel = gre = 0;
}
  if(level.number==1)
    bla = whi = 1;

  if(bla == 1)
    document.getElementById("bla").style.visibility = "visible";
  else
    document.getElementById("bla").style.visibility = "hidden";
  if(whi == 1)
    document.getElementById("whi").style.visibility = "visible";
  else
    document.getElementById("whi").style.visibility = "hidden";
  if(cya == 1)
    document.getElementById("cya").style.visibility = "visible";
  else
    document.getElementById("cya").style.visibility = "hidden";
  if(blu == 1)
    document.getElementById("blu").style.visibility = "visible";
  else
    document.getElementById("blu").style.visibility = "hidden";
  if(mag == 1)
    document.getElementById("mag").style.visibility = "visible";
  else
    document.getElementById("mag").style.visibility = "hidden";
  if(re == 1)
    document.getElementById("re").style.visibility = "visible";
  else
    document.getElementById("re").style.visibility = "hidden";
  if(yel == 1)
    document.getElementById("yel").style.visibility = "visible";
  else
    document.getElementById("yel").style.visibility = "hidden";
  if(gre == 1)
    document.getElementById("gre").style.visibility = "visible";
  else
    document.getElementById("gre").style.visibility = "hidden";

  if (this.status != null)
    this.finishDelay -= step;

  while (step > 0) {
    var thisStep = Math.min(step, maxStep);
    this.actors.forEach(function(actor) {
      actor.act(thisStep, this, keys);
    }, this);
    step -= thisStep;
  }
};

Lava.prototype.act = function(step, level) {
  var newPos = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPos, this.size))
    this.pos = newPos;
  else if (this.repeatPos)
    this.pos = this.repeatPos;
  else
    this.speed = this.speed.times(-1);
};

var wobbleSpeed = 8, wobbleDist = 0.07;

Paint.prototype.act = function(step) {
  this.pos = this.pos
}

Door.prototype.act = function(step) {
  this.pos = this.pos
}

Platform.prototype.act = function(step) {
  this.pos = this.pos
}

Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  var wobblePos = Math.sin(this.wobble) * wobbleDist;
  this.pos = this.basePos.plus(new Vector(0, wobblePos));
};

var playerXSpeed = 7;

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerXSpeed;
  if (keys.right) this.speed.x += playerXSpeed;

  var motion = new Vector(this.speed.x * step, 0);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);

  if (obstacle != null && obstacle != "wall" && obstacle != "lava" && obstacle.type.substr(0,4) == "door") {
  var myColor = document.documentElement.style.getPropertyValue(`--base`).substr(1,6);
  var doorColor = obstacle.color.substr(1,6);
    if(distance(myColor, doorColor,level.number) < 20)
  this.pos = newPos;
  
  } else if (obstacle != null && obstacle != "wall" && obstacle != "lava" && obstacle.type.substr(0,8) == "platform") {
  var myColor = document.documentElement.style.getPropertyValue(`--base`).substr(1,6);
  
  var platformColor = obstacle.color.substr(1);
  platformColor = complement(platformColor);

  if(distance(myColor, platformColor,level.number) > 20)
  this.pos = newPos;
  } else if (obstacle)
    level.playerTouched(obstacle);
  else
    this.pos = newPos;
};

var gravity = 30;
var jumpSpeed = 17;

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  var motion = new Vector(0, this.speed.y * step);
  var newPos = this.pos.plus(motion);
  var obstacle = level.obstacleAt(newPos, this.size);
  
  if (obstacle != null && obstacle != "wall" && obstacle != "lava" && obstacle.type.substr(0,4) == "door") {
  var myColor = document.documentElement.style.getPropertyValue(`--base`).substr(1,6);
  var doorColor = obstacle.color.substr(1,6);
    if(distance(myColor, doorColor,level.number) < 20)
    this.pos = newPos;
    else{
      document.getElementById("textPlace").innerHTML = "";
      if (keys.up && this.speed.y > 0)
        this.speed.y = -jumpSpeed;
      else
        this.speed.y = 0;
    }
  } else if (obstacle != null && obstacle != "wall" && obstacle != "lava" && obstacle.type.substr(0,8) == "platform") {
  var myColor = document.documentElement.style.getPropertyValue(`--base`).substr(1,6);
  
  var platformColor = obstacle.color.substr(1);
  platformColor = complement(platformColor);

    if(distance(myColor, platformColor,level.number) > 20)
      this.pos = newPos;
    else{
      document.getElementById("textPlace").innerHTML = "";
      if (keys.up && this.speed.y > 0)
        this.speed.y = -jumpSpeed;
      else
        this.speed.y = 0;
  } 
} else if (obstacle){
    level.playerTouched(obstacle);
    if (keys.up && this.speed.y > 0)
      this.speed.y = -jumpSpeed;
    else
      this.speed.y = 0;
  } else {
    this.pos = newPos;
  }
};

function handleUpdate(e) {
  //if(actorAt(this) != null && actorAt(this).type.substr(0,4)!="door"){
        document.documentElement.style.setProperty(`--base`, this.value);
        console.log(`--$base` +": "+ this.value)
      }

Player.prototype.act = function(step, level, keys) {

  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  var otherActor = level.actorAt(this);
  if (otherActor)
    level.playerTouched(otherActor.type, otherActor);

  // Losing animation
  if (level.status == "lost") {
     this.pos.y += step;
     this.size.y -= step;
  }

  const inputs = [].slice.call(document.querySelectorAll('input'));
  const buttons = [].slice.call(document.querySelectorAll('button'));

  inputs.forEach(input => input.addEventListener('change', handleUpdate));
  buttons.forEach(button => button.addEventListener("click", handleUpdate));
};

Level.prototype.playerTouched = function(type, actor) {
  if (type == "lava") {
    this.status = "lost";
    this.finishDelay = .2;
  } else if (type == "coin") {
    if(this.number >1){
    score += 20;
    mess2=0;
  }
    document.getElementById("textPlace").innerHTML = "";
    //console.log("this is coin");
    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
    if (!this.actors.some(function(actor) {
      return actor.type == "coin";
    })) {
      this.status = "won";
      this.finishDelay = 1;
    }
  } else if (type.length>4 && type.substr(0,5) == "paint") {
    document.documentElement.style.setProperty(`--base`, actor.color);

    if(actor.color == "#000000"){
      bla = 1;
      mess1 = 0;
      document.getElementById("textPlace").innerHTML = "";
    }
    else if(actor.color == "#FFFFFF"){
      whi = 1;
      document.getElementById("textPlace").innerHTML = "Vertical barriers need to be matched; colorful platforms require a complementary color. Try using the buttons at the top of the screen!";
    }
    else if(actor.color == "#00FFFF"){
      cya = 1;
      document.getElementById("textPlace").innerHTML = "You found a primary color! This is CYAN. Keep going at this rate, and soon you'll have the whole spectrum. Keep this in mind: cyan's complement is RED.";
    }
    else if(actor.color == "#0000FF"){
      blu = 1;
      document.getElementById("textPlace").innerHTML = "A secondary color! Hidden behind barriers of cyan and magenta, which can be mixed to produce blue. Blue's comple color is YELLOW.";
    }
    else if(actor.color == "#FF00FF")
      mag = 1;
    else if(actor.color == "#FF0000"){
      re = 1;
       document.getElementById("textPlace").innerHTML = "Red is made by mixing magenta and yellow. Its complement is CYAN.";
    }
    else if(actor.color == "#FFFF00"){
      yel = 1;
      document.getElementById("textPlace").innerHTML = "That's all the primary colors. Now, where could those secondaries be hiding...";
    }
    else if(actor.color == "#00FF00"){
      gre = 1;
       document.getElementById("textPlace").innerHTML = "Yellow and cyan can be mixed to make green. The complementary color of green is MAGENTA.";
    }

    this.actors = this.actors.filter(function(other) {
      return other != actor;
    });
  } else if (type.length>4 && type.substr(0,4) == "door") {
    //console.log("passing through door");
  }else if (type.length>4 && type.substr(0,8) == "platform") {
    //console.log("standing on platform");
  }
};

var arrowCodes = {37: "left", 38: "up", 39: "right"};

function compareHexColor(c1, c2) {
  var temp1 = parseInt(c1, 16);
  var temp2 = parseInt(c2, 16);
  if(temp1>temp2)
  var hexStr = (temp1 - temp2).toString(16);
  else
  var hexStr = (temp2 - temp1).toString(16);
  while (hexStr.length < 2) { hexStr = '0' + hexStr; }
  return hexStr;
}

function distance(c1, c2, n) {
  var temp1 = hexToRgb(c1);
  var temp2 = hexToRgb(c2);
  var toReturn = Math.sqrt(Math.pow((temp1.r-temp2.r),2)+Math.pow((temp1.g-temp2.g),2)+Math.pow((temp1.b-temp2.b),2));
  if(toReturn<20 && timegap>300){
    console.log(n);
      if(n >1){
       console.log(20-toReturn);
       score += 20-toReturn;
       timegap = 0;
     }
  }
  return toReturn;
}

// complement
function complement(platformColor){
  var temprgb=hexToRgb(platformColor);
  temphsv=RGB2HSV(temprgb);
  temphsv.hue=HueShift(temphsv.hue,180.0);
  temprgb=HSV2RGB(temphsv);
  if(platformColor == "FFFFFF")
    return "000000"
  else if(platformColor == "000000")
    return "FFFFFF"
  return rgbToHex(temprgb).toUpperCase();
}

function RGB2HSV(rgb) {
    var hsv = new Object();
    var max=Math.max(rgb.r,rgb.g,rgb.b);
    var dif=max-Math.min(rgb.r,rgb.g,rgb.b);
    hsv.saturation=(max==0.0)?0:(100*dif/max);
    if (hsv.saturation==0) hsv.hue=0;
    else if (rgb.r==max) hsv.hue=60.0*(rgb.g-rgb.b)/dif;
    else if (rgb.g==max) hsv.hue=120.0+60.0*(rgb.b-rgb.r)/dif;
    else if (rgb.b==max) hsv.hue=240.0+60.0*(rgb.r-rgb.g)/dif;
    if (hsv.hue<0.0) hsv.hue+=360.0;
    hsv.value=Math.round(max*100/255);
    hsv.hue=Math.round(hsv.hue);
    hsv.saturation=Math.round(hsv.saturation);
    return hsv;
}

// RGB2HSV and HSV2RGB are based on Color Match Remix [http://color.twysted.net/]
// which is based on or copied from ColorMatch 5K [http://colormatch.dk/]
function HSV2RGB(hsv) {
    var rgb=new Object();
    if (hsv.saturation==0) {
        rgb.r=rgb.g=rgb.b=Math.round(hsv.value*2.55);
    } else {
        hsv.hue/=60;
        hsv.saturation/=100;
        hsv.value/=100;
        i=Math.floor(hsv.hue);
        f=hsv.hue-i;
        p=hsv.value*(1-hsv.saturation);
        q=hsv.value*(1-hsv.saturation*f);
        t=hsv.value*(1-hsv.saturation*(1-f));
        switch(i) {
        case 0: rgb.r=hsv.value; rgb.g=t; rgb.b=p; break;
        case 1: rgb.r=q; rgb.g=hsv.value; rgb.b=p; break;
        case 2: rgb.r=p; rgb.g=hsv.value; rgb.b=t; break;
        case 3: rgb.r=p; rgb.g=q; rgb.b=hsv.value; break;
        case 4: rgb.r=t; rgb.g=p; rgb.b=hsv.value; break;
        default: rgb.r=hsv.value; rgb.g=p; rgb.b=q;
        }
        rgb.r=Math.round(rgb.r*255);
        rgb.g=Math.round(rgb.g*255);
        rgb.b=Math.round(rgb.b*255);
    }
    return rgb;
}

//Adding HueShift via Jacob
function HueShift(h,s) { 
    h+=s; while (h>=360.0) h-=360.0; while (h<0.0) h+=360.0; return h; 
}

function rgbToHex(rgb) {
    var hexr = rgb.r.toString(16);
    var hexg = rgb.g.toString(16);
    var hexb = rgb.b.toString(16);
    if(hexr.length<2)
      hexr = hexr + "0";
    if(hexg.length<2)
      hexg = hexg + "0";
    if(hexb.length<2)
      hexb = hexb + "0";
    var toReturn = hexr + hexg + hexb;
    //console.log(toReturn);
    return toReturn;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function trackKeys(codes) {
  var pressed = Object.create(null);
  function handler(event) {
    if (codes.hasOwnProperty(event.keyCode)) {
      var down = event.type == "keydown";
      pressed[codes[event.keyCode]] = down;
      event.preventDefault();
    }
  }
  addEventListener("keydown", handler);
  addEventListener("keyup", handler);
  return pressed;
}

function runAnimation(frameFunc) {
  var lastTime = null;
  function frame(time) {
    var stop = false;
    if (lastTime != null) {
      var timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }
    lastTime = time;
    if (!stop)
      requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

var arrows = trackKeys(arrowCodes);

function runLevel(level, Display, andThen) {
  var display = new Display(document.body, level);
  runAnimation(function(step) {
    level.animate(step, level, arrows);
    display.drawFrame(step);
    if (level.isFinished()) {
      display.clear();
      if (andThen)
        andThen(level.status);
      return false;
    }
  });
}

function runGame(plans, Display) {
  function startLevel(n) {
    runLevel(new Level(plans[n], n), Display, function(status) {
      if(n<2){
        document.getElementById("base").style.display = "none";
      }
      else{
        document.getElementById("base").style.display = "inline";
            }
      if (status == "lost"){
        document.documentElement.style.setProperty(`--base`, "#A0A0A0");
        if(n==0)
         bla = whi = 0;
        if(n==1)
          cya = blu = mag = re = yel = gre = 0;
        startLevel(n);
      }
      else if (n < plans.length - 1)
        startLevel(n + 1);
      else
        console.log("You win!");
    });
  }
  startLevel(0);
}