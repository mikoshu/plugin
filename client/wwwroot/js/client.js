;function client(obj) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        var param = "",sp
        
        for(k in obj.params){
        	param == "" ? sp = "?" : sp = "&"
        	param += sp + k + '=' + obj.params[k]
        }
        param = obj.type == 'jsonp' ? param + '?callback=client' + new Date().getTime() : param
        xhr.onreadystatechange = client_state_Change;
        if(obj.method != 'GET'){
        	obj.url = obj.type == 'jsonp' ? obj.url + '?callback=client' + new Date().getTime() : obj.url
       		xhr.open(obj.method, obj.url,true);
       		xhr.setRequestHeader("Content-Type",'application/x-www-form-urlencoded; charset=UTF-8')
       		if(obj.setHeader){
       			client_setHeader(obj.setHeader)
       		}
       		client_getType()
       		param = param.split("?")[1]
    		xhr.send(param);
        }else{
       		xhr.open(obj.method, obj.url + param,true);
       		if(obj.setHeader){
       			client_setHeader(obj.setHeader)
       		}
       		client_getType()
    		xhr.send(null);
        }

        function client_setHeader(object){
       		for(k in object){
       			xhr.setRequestHeader(k,object[k])
       		}
        }
        function client_state_Change(){
        	if(xhr.readyState == 4){
        		if(xhr.status == 200){
        			xhr.addEventListener("error", function(data){
			        	reject(JSON.parse(xhr.responseText))
			        });
			        xhr.addEventListener("load", function(data){
			        	if(obj.type == 'html' || obj.type == 'text' ){
			        		var resp = xhr.responseText
			        	}else{
			        		var resp = JSON.parse(xhr.responseText)
			        	}
			        	resolve(resp)
			        });
        		}else{
        			console.warn("client:"+xhr.status+":"+xhr.statusText)
        		}
        	}
        }

        function client_getType(){
        	switch(obj.type){
        		case 'json':
        			xhr.setRequestHeader('Accept','application/json, text/javascript, */*; q=0.01')
        			break
        		case 'xml':
        			xhr.setRequestHeader('Accept','application/xml, text/xml, */*; q=0.01')
        			break
        		case 'html':
        			xhr.setRequestHeader('Accept','text/html, */*; q=0.01')
        			break
        		case 'script':
        			xhr.setRequestHeader('Accept','text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01')
        			break
        		case 'jsonp':
        			xhr.setRequestHeader('Accept','text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01')
        			break
        		case 'text':
        			xhr.setRequestHeader('Accept','text/plain, */*; q=0.01')
        			break
        	}
        }

    });
}


