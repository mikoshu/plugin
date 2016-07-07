# some plugin by myself

# banner

+ 轮播无缝滚动

# imgPreLoad

+ 图片预加载插件（回调模式和观察者模式）

# client

+ Promise模式的 ajax 请求插件（不支持promise的浏览器可以引用 bluebird.js ）
+ 用法：

```javascript
	client({
		url: '/api/put/test',
		method: 'PUT',
		setHeader: {'Cache-Control':'no-cache'},
		type: 'json',
		params:{
			name: 'miko',
			age: '18',
			client:'client'
		}
	}).then(function(resp){
		console.log(resp)
	})

	client({
		url: '/api/put/test',
		method: 'GET',
		type: 'text',
		params: {
			haha : "hahah"
		}
	}).then(function(data){ // 请求 /api/test 结束后执行
		console.log(data)  
		return client({    
			url: '/api/test2/',
			method: 'POST',
			params{
				...
			}
		})
	}).then(function(resp){ //请求 /api/test2 结束后执行
		console.log(resp) 
	})

	client({
		url: '/api/put/test',
		method: 'GET',
		params: {
			haha : "hahah"
		}
	}).delay(2000).then(function(data){
		console.log(data)
	})
```

_注意：只有使用了 bluebird.js 才能使用 delay(ms)方法！_

| 参数      | 类型   |                  说明                      |
| --------- |:------:| ------------------------------------------ |
| url       | string | 请求url                                    |
| method    | string | 请求方式 大写字母如 'GET','POST','PUT'...  |
| params    | object | 传递参数，对象形式                         |
| type      | string | 请求得到的数据类型，特殊类型需要服务端配置(具体参数参考jquery ajax dataType 参数) |
| setHeader | object | 设置request Header的一些属性               |

