/**
 * 简单的HTML5游戏开发
 * 2016-02-17
 * (c) Copyright 2016 Kvkens. All Rights Reserved. 
 */

/*创建画布*/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var wrap = document.querySelector("#wrap");
canvas.width = 512;
canvas.height = 480;
wrap.appendChild(canvas);
/*背景*/
var bgReady = false;
/*创建背景图形*/
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
}
bgImage.src = "images/background.png";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

/*英雄*/
var hero = {
	speed : 256,
	x : 0,
	y : 0
};
/*怪物*/
var monster = {
	x : 0,
	y : 0
};
/*捕捉数量*/
var monsterCaught = 0;

/*按键处理*/
var keysDown = {};
addEventListener("keydown",function(e){
	console.log(123);
	keysDown[e.keyCode] = true;
},false);
addEventListener("keyup",function(e){
	console.log(456);
	delete keysDown[e.keyCode];
},false);

/*新一轮游戏*/
var reset = function(){
	//重置英雄
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	//随机怪物
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
}
/*更新游戏对象*/
var update = function(modifier){
	//↑
	if(38 in keysDown){
		hero.y -= hero.speed * modifier;
		if(hero.y <0){
			hero.y = 0;
		}
		
	}
	//↓
	if(40 in keysDown){
		hero.y += hero.speed * modifier;
		
		if(hero.y >480-32){
			hero.y = 480-32;
		}
		
	}
	//←
	if(37 in keysDown){
		hero.x -= hero.speed * modifier;
		if(hero.x <0){
			hero.x = 0;
		}
	}
	//→
	if(39 in keysDown){
		hero.x += hero.speed * modifier;
		
		if(hero.x >512-32){
			hero.x = 512-32;
		}
	}
	
	/*怪物碰到*/
	if(
		hero.x <= (monster.x + 32) &&
		monster.x <= (hero.x +32) &&
		hero.y <= (monster.y + 32) &&
		monster.y <= (hero.y + 32)
	){
		++monsterCaught;
		reset();
	}
}

/*渲染物体*/

var render = function(){
	if(bgReady){
		ctx.drawImage(bgImage,0,0);
	}
	if(heroReady){
		ctx.drawImage(heroImage,hero.x,hero.y);
	}
	if(monsterReady){
		ctx.drawImage(monsterImage,monster.x,monster.y);
	}
//	var tmpImage = new Image();
//	tmpImage.src="images/17171-1409151K113-52.png";
//	ctx.drawImage(tmpImage,150,250);
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px microsoft yahei";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("哥布林捕捉：" + monsterCaught,32,32);
	
}

var main = function(){
	var now = new Date();
	var delta = now - then;
	update(delta / 1000);
	render();
	then = now;
	requestAnimationFrame(main);
	//console.log("main");
}
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


var then = Date.now();
reset();
main();
