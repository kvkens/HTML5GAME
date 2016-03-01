var Player = function(){
	this.audio = document.querySelector("#player");
	this.songsList = document.querySelector("#songsList");
	this.lrcList = document.querySelector("#lrcList");
}
Player.prototype = {
	constructor : Player,
	init : function(){
		this.initSongsList(this);
		
	},
	initSongsList : function(ctx){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET","./json/songslist.json",false);
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState==4 && xhttp.status == 200){
				var obj = (JSON.parse(xhttp.responseText).data);
				ctx.loadSongsHTML(obj);
				ctx.bindEventList(ctx);
			}
		}
		xhttp.send();
	},
	loadSongsHTML : function(data){
		var documentframe = document.createDocumentFragment();
		data.forEach(function(v){
			var a = document.createElement("a"),
				li = document.createElement("li");
			a.href = "javascript:void(0)";
			a.textContent = v.song + " - " + v.singer;
			a.dataset.lrc = v.name;
			li.appendChild(a);
			documentframe.appendChild(li);
		});
		this.songsList.appendChild(documentframe);
		
	},
	bindEventList : function(ctx){
		ctx.songsList.addEventListener("click",function(e){
			
			if(e.target.tagName.toLowerCase() !== "a"){
				return;
			}
			var lrc = e.target.getAttribute("data-lrc");
			//var name = e.target
			console.log(e);
			ctx.play({"lrc": lrc,"name":1});
			
		},false);
	},
	play : function(music){
		var that = this;
		that.audio.src= "./music/" + music.lrc + ".mp3"; 
		that.audio.play();
		console.log("开始唱"+music.name);
	}
}
window.onload = function(){
	new Player().init();
}
