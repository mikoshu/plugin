var request = require('request')
module.exports = function(app){
	//此处暴露 express 服务器 app 可做反代等操作
	// app.all('*/web/*',function(req,res,next){
	// 	var url = req.url.split('/web').pop()
	// 	var path = 'http://cm.one.gzshapp.net/web'+url
	// 	var r = request({
	// 		url: path,
	// 		method: req.method
	// 	})
	// 	req.pipe(r).pipe(res)
	// })
	// app.post("*",function(req,res,next){
	// 	var url = 'http://cm.one.gzshapp.net'+ req.url
	// 	var r = request({
	// 		url: url,
	// 		method: req.method
	// 	})
	// 	req.pipe(r).pipe(res)
	// })
	// 
	//
	 
	app.all("*",function(req,res,next){
		if(!~req.url.indexOf(".")){
			
			var r = request({
				url: "http://cm.one.gzshapp.net"+req.url,
				method: req.method
			})
			req.pipe(r).pipe(res)
			var originalSetHeader = res.setHeader
			res.setHeader = function(name, value) {
				var args = arguments
				var doOriginal = function() {
					originalSetHeader.apply(res, [].slice.call(args, 0))
				}
				if(name == 'set-cookie'){
					var cookie_value = value[0]
					value[0] = cookie_value.replace(/(domain=)(.*?);/,'domain=localhost;')
					originalSetHeader.call(res, name, value)
				}else{
					doOriginal()
				}
			}

		}else{
			next()
		}
	})
	// 

	var bodyParser = require('body-parser');

	app.use(bodyParser.json()); // for parsing application/json
	app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


	app.put('/api/put/test',function(req,res,next){
		var json = {
			'code': 200,
			'data': {
				'name': 'miko',
				'age': 18
			}
		}
		
		console.log(req.body)

		res.send(json)
	})
}