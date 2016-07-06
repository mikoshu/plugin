;function imgPreLoad(arr){

}
imgPreLoad.prototype = {
	init: function(arr){
		var self = this
		self.emit('ready')
		if(typeof(arr) == 'object' && arr.length){
			var len = arr.length,
				i = 0
			if(Array.prototype.map){
				arr.map(function(value,index){
					var img = new Image()
					img.src = value
					img.onerror = function(err){
						i++
						self.emit('error',err)
					}
					img.onload = function(){
						i++
						if(i == len){
							self.emit('end')
						}
					}
				})	
			}else{
				for(var x=0;x<arr.length;x++){
					var img = new Image()
					img.src = arr[i]
					img.onerror = function(err){
						i++
						self.emit('error',err)
					}
					img.onload = function(){
						i++
						if(i == len){
							self.emit('end')
						}
					}
				}
			}
		}else{
			throw "传入的参数必须为数组！"
		}
	},
	on: function(event,fn){
		var self = this
		self.events[event] == undefined ? self.events[event] = [] : self.events[event] = self.events[event]	
		self.events[event].push(fn)
	},
	emit: function(event,obj){
		var self = this;
		for(k in self.events){
			if(k == event){
				if(Array.prototype.map){
					self.events[event].map(function(fn){
						return fn(obj)
					})
				}else{
					for(var i=0;i<self.events[event].length;i++){
						self.events[event][i](obj)
					}
				}
			}
		}
	},
	events: {}
}