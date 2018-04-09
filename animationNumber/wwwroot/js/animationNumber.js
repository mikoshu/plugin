var animateNumber = function(obj){
  this.init(obj)
} 

animateNumber.prototype.init = function(obj){
  this.option = {
    start: 0,
    num: 100,
    time: 1000,
    el: 'num',
    type: 'number'
  }

  for(var key in obj){
    this.option[key] = obj[key] 
  }

  var el = document.getElementById(this.option.el)
  var step = parseInt(this.option.time / 16)
  var speed =  (this.option.num - this.option.start)/step
  var n = 0
  var interval
  var self = this
  var timeNum = 0
  function animate(){
      if(self.option.type == 'number'){
        self.option.start += speed
        el.innerHTML = self.option.start.toFixed(0);
      }
      else if(self.option.type == 'time'){
        var arr = self.option.num.split("'")
        var num = arr[0] * 60 + parseInt(arr[1])
        var speed2 = num / step
        timeNum += speed2
        var min = (timeNum % 60).toFixed(0)
        min = min < 10 ? 0 + min : min
        self.option.start = parseInt(timeNum / 60) + "'" + min
        el.innerHTML = self.option.start;
      }
      n++ 
      if (n < step) {
        interval = requestAnimationFrame(animate)
      } else {
        el.innerHTML = self.option.num;
        cancelAnimationFrame(interval)
      }
  }
  animate()
}