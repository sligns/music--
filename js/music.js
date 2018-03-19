window.onload=function(){
		//播放暂停	
    var a = document.getElementsByTagName('audio');
    var p1 = document.getElementsByClassName('.p1');
    var p2 = document.getElementsByClassName('.p2 ');
		//用户头像
		var hurl = ''
		files.onchange = function() {
			var img = this.files[0]
			var images = new FormData()
			images.append('img', img)
			ajax({
				url: 'http://localhost:8000/user/img',
				type: 'post',
				data: images,
				success: function(da) {
					console.log(da)
					var img = document.getElementById('img')
				hurl = da
			img.innerHTML = '<img src="' + da + '" style="width:140px;height:140px">'
				},
				error: function() {
					console.log('失败')
				}
			})
		}
		
		//封面图片
				var imgurl = ''
		pic.onchange = function() {
			var img1 = this.files[0]
			var images = new FormData()
			images.append('img', img1)
			ajax({
				url: 'http://localhost:8000/user/img',
				type: 'post',
				data: images,
				success: function(da) {
					console.log(da)
					var imgs= document.getElementById('imgs')
				imgurl = da
			imgs.innerHTML = '<img src="' + da + '" style="width:140px;height:140px">'
				},
				error: function() {
					console.log('失败')
				}
			})
		}
	
	
		//音乐上传
					var musicurl = ''
		music.onchange = function() {
			div.style.width = '100%'
//			setInterval(function(){
//			div.style.width='0px'
//			},2000);
			var musics = this.files[0]
			console.log( musics)
			var ao = new FormData()
			ao.append('img', musics)
			ajax({
				url: 'http://localhost:8000/user/img',
				type: 'post',
				data: ao,
				success: function(da) {
					console.log(da)
					$('#singer').val(musics.name.split('.')[0])
			musicurl = da

				},
				error: function() {
					console.log('失败')
				}
			})
		}
		


//注册
		zhu.onclick = function() {
			$.ajax({
				url: 'http://localhost:8000/user/zhuce',
				type: 'post',
				data: {
					user: $('#user').val(),
					pass: $('#pass').val(),
					hurl:hurl
				},
				success: function(da) {
					alert(da)	
				},
				error: function() {
					console.log('失败')
				}
			})
		}
//登录
		de.onclick = function() {
			ajax1({
				url: 'http://localhost:8000/user/denglu',
				type: 'post',
				data: {
					user: user.value,
					pass: pass.value,
				},
				success: function(da) {
						alert(da)
				if(da=='登陆成功'){
				f1.className='hide'
				f2.className='show'
				}
					
				},
				error: function() {
					console.log('失败')
				}
			})
		}
		
		//播放暂停
		
		
		//上传信息  待修改  进度条
		okay.onclick=function(){
			$.ajax({
				url: 'http://localhost:8000/user/lee',
				type: 'post',
				data: {
					imgurl:imgurl,
					musicurl:musicurl,
					singer: $('#singer').val(),
					name: $('#name').val()
				},
				success: function(da) {
				},
				error: function() {

				}
			})
			
ajax1({
				url: 'http://localhost:8000/user/lee1',
				type: 'get',
				success: function(da) {
					var datas=eval('('+da+')')
					console.log(datas)
												var str = ''
							for(var i in datas) {
								str += `<tr>
          <td><img style="width:100px;height:100px" src="${datas[i].imgurl}" /></td>
          <td><audio src="${datas[i].musicurl}"></audio></td>
          <td>${datas[i].singer}</td>
          <td>${datas[i].name}</td>
          <td>${datas[i].times}</td>
          <td><button class="p1">播放</button></td>
          <td><button class='p2'>暂停</button></td>
          <td><button class='p3'>停止</button></td>
          </tr>`
							}
							$('#tb').html(str)
 
				},
			error: function() {
			}
			})
			
			
			
//			
//				ajax1({
//				url: 'http://localhost:8000/user/lee2',
//				type: 'get',
//				success: function(da) {
//						console.log(da)
//			
//		var datas=eval('('+da+')')
//					console.log(datas)
////             var str=''
////for(var i in datas){
////	lasts=i;
////	alert(lasts)
////	 str += '<span>' + datas.user+ '</span><img src='+ datas.hurl+'>'
////}
//				  
//					
////			ac.innerHTML=str;
//					
//				},
//				error: function() {
//					console.log('失败')
//				}
//		})
			
			
			
		}
	
				
		
ajax1({
				url: 'http://localhost:8000/user/lee1',
				type: 'get',
				success: function(da) {
					var datas=eval('('+da+')')
					console.log(datas)


								var str = ''
							for(var i in datas) {
								str += `<tr>
          <td><img style="width:100px;height:100px" src="${datas[i].imgurl}" /></td>
          <td><audio src="${datas[i].musicurl}"  controls ></audio></td>
          <td>${datas[i].singer}</td>
          <td>${datas[i].name}</td>
          <td>${datas[i].times}</td>
          <td><button class='p1'>播放</button></td>
          <td><button class='p2'>暂停</button></td>
          <td><button class='p3'>停止</button></td>
          </tr>`
							}
							$('#tb').html(str)
				},
				error: function() {

				}
			})

//ajax1({
//			url: 'http://localhost:8000/user/lee2',
//			type: 'get',
//			success: function(da) {
//						console.log(da)
//				
//	var datas=eval('('+da+')')
//				console.log(datas)
//            var str=''
//		 str += '<span>' + datas.user+ '</span><div><img src='+ datas.hurl+'></div>'
//					
//			ac.innerHTML=str;
//
//	
//				
//			},
//			error: function() {
//				console.log('失败')
//			}
//		})
			


		for(var i=0;i<p1.length;i++){
	p1[i].onclick = function () {
alert('nihao')
            a[i].play();
         
        }
}
for(var i=0;i<p2.length;i++){
	p2[i].onclick = function () {
alert('nihao')
            a[i].pause();
         
        }
}





//ajax
		function ajax(req) {
			//	console.log(req.data)
			if(window.XMLHttpRequest) {
				var ajax = new XMLHttpRequest()
			} else {
				var ajax = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if(req.type == 'get') {
				ajax.open('get', req.url + '?' + strdata(req.data), true)
				ajax.send()
			} else {
				ajax.open('post', req.url, true)
				ajax.send(req.data)
			}
			ajax.onreadystatechange = function() {
				if(ajax.readyState == 4) {
					if(ajax.status >= 200 && ajax.status < 300 || ajax.status == 304) {
						req.success(ajax.responseText)
						//					console.log(ajax.responseText)
					} else {
						req.error(ajax.status)
					}

				}
			}
					function strdata(da) {
				var arr = []
				for(var i in da) {
					arr.push(i + '=' + da[i])
				}
				var strurl = arr.join('&')
				return strurl
			}

		}
		
	//ajax1	
		
		function ajax1(req) {
			//	console.log(req.data)
			if(window.XMLHttpRequest) {
				var ajax = new XMLHttpRequest()
			} else {
				var ajax = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if(req.type == 'get') {
				ajax.open('get', req.url + '?' + strdata(req.data), true)
				ajax.send()
			} else {
				ajax.open('post', req.url, true)
				ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
				ajax.send(strdata(req.data))
			}
			ajax.onreadystatechange = function() {
				if(ajax.readyState == 4) {
					if(ajax.status >= 200 && ajax.status < 300 || ajax.status == 304) {
						req.success(ajax.responseText)
						//					console.log(ajax.responseText)
					} else {
						req.error(ajax.status)
					}

				}
			}

			function strdata(da) {
				var arr = []
				for(var i in da) {
					arr.push(i + '=' + da[i])
				}
				var strurl = arr.join('&')
				return strurl
			}
		}
}
