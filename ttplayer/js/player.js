var Player = function(){
	this.audio = document.querySelectorAll("#player");
	this.songsList = document.querySelectorAll("#songsList");
	this.lrcList = document.querySelectorAll("#lrcList");
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
		this.songsList[0].appendChild(documentframe);
	}
}
window.onload = function(){
	new Player().init();
}
