// JavaScript Document
var IMGPATH = "image/"//图片路径前缀
//图片名称数组
var IMG = [
    "bg1-2.jpg",
    "bg1-3.jpg",
		"bg1-4.jpg",
		"bg1-5.jpg",
		"bg2-1.jpg",
		"bg2-2.jpg",
		"bg2-3.jpg",
		"bg2-4.jpg",
		"bg3-1.jpg",
		"bg3-1.jpg",
		"bg4-1.jpg",
		"bg6-1.jpg",
		"bg6-2.jpg",
		"bg6-3.jpg",
		"bg6-4.jpg",
		"bg6-5.jpg",
		"bg5.jpg",
		"about.jpg",
		"back.png",
		"chanye.jpg",
		"connect.jpg",
		"fengcai.jpg",
		"home.jpg",
		"icons.png",
		"icons2.png",
		"index_bg.jpg",
		"jtgk.png",
		"link.jpg",
		"li-on.png",
		"logo.png",
		"logo-bg.png",
		"logo-bg1.png",
		"logo-bg2.png",
		"map.jpg",
		"pic1.jpg",
		"pic2.jpg",
		"pic3.jpg",
		"pic4.jpg",
		"pic5.jpg",
		"pic6.jpg",
		"pic7.jpg",
		"pic8.jpg",
		"pp.png",
		"tab-active.png",
		"tabhead.png",
		"tabhead2.png",
		"tab-liac.png",
		"tab-libg.png",
		"title-bg.png",
		"txt1.png",
		"txt2.png",
		"txt-tle.png",
		"up.png",
		"up2.png",
		"asdfaw.jpg"
];


function preImg(fn){
	this.init(fn);
}

preImg.prototype.init = function(fn){
	var path = IMG;
	for(var i = 0; i<IMG.length;i++){
		path[i] = IMGPATH + path[i];
	}	
	this.isLoaded(path,fn);
}

preImg.prototype.isLoaded = function(imgArr,fn){
	var arr = imgArr,
		length = arr.length,
		img = [],
		 n = 0,
		 error = 0;
	for(var i=0;i<length;i++){
		img[i] = new Image();
		img[i].src = arr[i];
		img[i].onload = function(){
			n++;	
			if(n==length){
				console.log("加载完毕",length);
				fn();	
			}	
		}
		img[i].onerror = function(){
			n++;
			error++;	
			if(n==length){
				console.log("加载完毕但是有"+error+"张图加载失败！");
				fn();
			}
		}	
	}	
}