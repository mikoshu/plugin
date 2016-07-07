var Promise = require('bluebird')
var fs = require('fs')

// Promise.promisifyAll(fs)

// fs.readFileAsync('test.txt',"utf8").then(function(err,data){
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log(data)
// 	}
// })

function read(filename,encoding){
	return new Promise(function(resolve,reject){
		fs.readFile(filename,encoding,function(err,data){
			if(err){
				reject(err)
			}else{
				resolve(data)
			}
		})
	})
}

read("test.txt","utf8").delay(1000).then(function(data){
	console.log(data)
})


function client(obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.addEventListener("error", reject);
        xhr.addEventListener("load", resolve);
        xhr.open(obj.method, obj.url);
        xhr.send(obj.params);
    });
}

client({
	url: 'http://webapp.local.tmued.com/web/v2/residents/statistics',
	params: {
		community_id: 426881792637886464
	},
	method: 'GET'
}).then(function(data){
	console.log(data)
})

