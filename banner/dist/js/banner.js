
(function ($) {
	$.fn.mySlide = function(options) {
		var slide = {
			el: "li",
			width: "auto",
			nextbtn: "#slide-nxt",
			prebtn: "#slide-pre",
			time: 500,
			point: "#point>li",
			curClass: "on",
			Event: "click",
			autoPlay: true
		}
		$options = $.extend(slide,options)

		var $banner = $(this).find(slide.el),
			width = slide.width=="auto" ? parseInt($banner.width()) : slide.width,
			n = $banner.length,
			index = 0,
			time = slide.time,
			flag = 1
		if(sup("transform")){
			$banner.css({"position":"absolute","x":width,"-webkit-transform":"translateX("+width+"px)"});
			$banner.eq(0).css({"x":0,"-webkit-transform":"translateX("+0+"px)"})
		}else{
			$banner.css({"position":"absolute","left":width+"px"});
			$banner.eq(0).css({"left":"0px"})
		}
		$(slide.nextbtn).on("click",function(){ //点击下一页执行函数
			if(flag){
				index+=1;
				flag = 0;
				if(sup("transform")){
					$banner.eq(index-1).siblings(slide.el).css({"x":width,"-webkit-transform":"translateX("+width+"px)"})
				}else{
					$banner.eq(index-1).siblings(slide.el).css("left",width+"px")
				}
				if(index > n-1){
					action(0,0,time,0)
					action(index-1,-width,time)
				}else{
					action(index,0,time)
					action(index-1,-width,time)
				}
				point()
			}
		})	
		$(slide.prebtn).on("click",function(){ //点击上一页执行函数
			if(flag){
				index-=1;
				flag = 0;
				if(sup("transform")){
					$banner.eq(index+1).siblings(slide.el).css({"x":-width,"-webkit-transform":"translateX("+(-width)+"px)"})
				}else{
					$banner.eq(index+1).siblings(slide.el).css("left",-width+"px")
				}
				
				if(index < 0){
					action(n-1,0,time,n-1)	
					action(0,width,time)
				}else{
					action(index,0,time)
					action(index+1,width,time)	
				}
				point()	
			}
		})	
		$(slide.point).on(slide.Event,function(){
			var po = $(this).index(),
				len = index
			switch(index){
				case n:
				len = 0
				break;
				case -1:
				len = n-1
				break;
			}
			if(po >= len){
				if(flag){
					flag = 0;
					if(sup("transform")){
						$banner.eq(index).siblings(slide.el).css({"x":width,"-webkit-transform":"translateX("+width+"px)"})
					}else{
						$banner.eq(index).siblings(slide.el).css("left",width+"px")
					}
					action(po,0,time)
					if(po !== index){	
						action(index,-width,time)
					}	
					index = po;
					point()
				}
			}else{
				if(flag){
					flag = 0;
					if(sup("transform")){
						$banner.eq(index).siblings(slide.el).css({"x":-width,"-webkit-transform":"translateX("+(-width)+"px)"})
					}else{
						$banner.eq(index).siblings(slide.el).css("left",-width+"px")
					}
					action(po,0,time)
					action(index,width,time)	
					index = po;
					point()
				}	
			}
		})
		if(slide.autoPlay){ //自动播放
			setInterval(function(){
				$(slide.nextbtn).trigger("click")
			},slide.autoPlay)
		}
		function point(){ //选中下标
			var dom = slide.point.split(">"),
				len = index;
			switch(index){
				case n:
				len = 0
				break;
				case -1:
				len = n-1
				break;
			}
			$(dom[0]).find(dom[1]).eq(len).addClass(slide.curClass).siblings(dom[1]).removeClass(slide.curClass)
		}
		function action(a,b,time,c){
			if(sup("transform")){ //如果浏览器支持css3则使用transform方法(还没写)
				if(c+10){ //如果传入了index参数
					$banner.eq(a).animate({"x": b}, {
					    duration:time,
					    step: function(now,fx) {
					        $(this).css('-webkit-transform','translateX('+now+'px)');
						},
						complete: function(){
							index=c;flag=1
						}
					})
				}else{
					$banner.eq(a).animate({"x": b}, {
					    duration:time,
					    step: function(now,fx) {
					        $(this).css('-webkit-transform','translateX('+now+'px)');
						},
						complete: function(){
							flag=1
						}
					})
				}
			}else{
				if(c+10){ //如果传入了index参数
					$banner.eq(a).animate({"left": b + "px"},time,function(){index=c;flag=1})
				}else{
					$banner.eq(a).animate({"left": b + "px"},time,function(){flag=1})
				}
			}	
		}
		function sup(style) {  //验证浏览器否支持css3
			var prefix = ['webkit', 'Moz', 'ms', 'o'], 
			i, 
			humpString = [], 
			htmlStyle = document.documentElement.style, 
			_toHumb = function (string) { 
			return string.replace(/-(\w)/g, function ($0, $1) { 
			return $1.toUpperCase(); 
			}); 
			};  
			for (i in prefix) 
			humpString.push(_toHumb(prefix[i] + '-' + style));  
			humpString.push(_toHumb(style)); 
			for (i in humpString) 
			if (humpString[i] in htmlStyle) return true; 
			return false; 
		}
	}
})(jQuery)










