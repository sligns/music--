var mysql = require('mysql')
var express = require('express')
var multer = require('multer')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var user = express.Router()
app.use(bodyParser.urlencoded({}))
app.use(multer({dest:'./img'}).any())
app.use('/user', user)

var pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'haozhishuo',
	database: 'login',
	port: 3306
})

//登录
user.post('/denglu', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	var user = req.body.user
	var pass = req.body.pass
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection::' + err)
			return
		}
		connection.query('select * from user where user=?', [user], function(err, data) {
			if(err) {
				console.log('mysql::' + err)
				return
			}
			if(data == '') {
				res.send('用户名不存在')
			} else {
				if(data[0].pass == pass) {
					res.send('登陆成功')
					
				} else {
					res.send('用户名或密码不对')
				}
			}

		})
	})

})



//图片  音乐
user.post('/img',function(req,res){
	res.setHeader('Access-Control-Allow-Origin', '*')
	var img = req.files
	var name = req.files[0].filename
	var newName = name+path.parse(req.files[0].originalname).ext
	fs.rename('./img/'+name,'./img/'+newName,function(err){
		if(err){
			console.log(err)
			return
		}
		res.send('http://localhost:8000/img/'+newName)
	})
	console.log(newName)
})



//注册
user.post('/zhuce', function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	var user = req.body.user
	var pass = req.body.pass
	var hurl = req.body.hurl
	console.log(user + '-' + pass + '-' + hurl)
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection::' + err)
			return
		}

		connection.query('select * from user where user=?', [user], function(err, data) {
			if(err) {
				console.log('mysql::' + err)
				return
			}
			if(data == '') {
				connection.query('insert into user(user,pass,hurl) values(?,?,?)', [user, pass,hurl], function(err, data) {
					if(err) {
						console.log('mysql::' + err)
						return
					}
					res.send('注册成功')
				})
			} else {
				res.send('用户名存在')
			}

		})
	})

})


//获取用户信息
//user.get('/lee2', function(req, res) {
//	pool.getConnection(function(err, connection) {
//		if(err) {
//			console.log('connection：：' + err)
//			return
//		}
//		var s = 'select * from user'
//		connection.query(s,function(err, data) {
//			if(err) {
//				console.log('mysql：：' + err)
//				return
//			}
//
//			res.send(data[data.length-1])
//			connection.end()
//		})
//	})
//
//})



//上传图片音乐信息等
user.post('/lee',function(req,res){ 
	var musicurl = req.body.musicurl
	var singer=req.body.singer
	var name = req.body.name
	var imgurl = req.body.imgurl   
    var times=req.body.times
    res.setHeader('Access-Control-Allow-Origin', '*')
    pool.getConnection(function(err,connection){
    	if(err){
    		console.log('connection::'+err)
    		return
    	}
    	var sql = 'insert into music(musicurl,singer,name,imgurl,times) values(?,?,?,?,?)'
    	var arr = [musicurl,singer,name,imgurl,times]
    	connection.query(sql,arr,function(err,data){
    		if(err){
    			console.log('mysql::'+err)
    			return
    		}
    		if(data==''){
    			
    				connection.query(sql,arr,function(err, data) {
					if(err) {
						console.log('mysql::' + err)
						return
					}
				})		
    		}

    		connection.end()
    	})
    })
})


//添加信息到页面
user.get('/lee1', function(req, res) {
	pool.getConnection(function(err, connection) {
		if(err) {
			console.log('connection：：' + err)
			return
		}
		var s = 'select * from music'
		connection.query(s,function(err, data) {
			if(err) {
				console.log('mysql：：' + err)
				return
			}

			res.send(data)
			connection.end()
		})
	})

})


//搜索
user.post('/search', function (req, res) {
    pool.query(`SELECT * FROM music WHERE singer LIKE '%${req.body.search}%'`, function (err, rows) {
        if (err) throw err;
        res.send(rows);
    })
})



app.use(express.static('./'))
app.listen(8000, function() {
	console.log('ok')
})