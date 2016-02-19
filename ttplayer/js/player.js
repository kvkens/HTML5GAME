var Player = function(){
	this.audio = document.querySelectorAll("#player");
	this.songsList = document.querySelectorAll("#songsList");
	this.lrcList = document.querySelectorAll("#lrcList")
;}
Player.prototype = {
	constructor : Player,
	init : function(){
		this.initSongsList(this);
	},
	initSongsList : function(ctx){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET","./json/songslist.json",true);
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState==4 && xhttp.status == 200){
				var obj = (JSON.parse(xhttp.responseText));
				alert(typeof obj);
			}
		}
		xhttp.send();
	}
}
window.onload = function(){
	new Player().init();
}
