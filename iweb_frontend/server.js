export default {
	host:'http://1.15.186.28:5050/',
	// host:'http://127.0.0.1:5050/',
	carousel(){//获取轮播广告
		return this.host + 'carousel'
	},
	courseNewest(count){//获取最新课程
		if(count){
			return this.host + 'course/newest?count=' + count
		}else{
			return this.host + 'course/newest'
		}
	},
	courseHottest(count){//获取最热课程
		if(count){
			return this.host + 'course/hottest?count=' + count
		}else{
			return this.host + 'course/hottest'
		}
	},
	teacherList(){//获取讲师列表
		return this.host + 'teacher/list'
	},
	teacherDetail(tid){//获取讲师详情
		return this.host + 'teacher/detail?tid=' +tid
	},
	schoolList(){//获取校区列表
		return this.host + 'school/list'
	},
	schoolDetails(sid){
		return this.host + 'school/course?sid=' + sid
	},
	type(){//获取课程类别
		return this.host + 'type'
	},
	courseList(pageNum,typeId){//获取课程列表
		let url = this.host
		if(pageNum){
			url += 'course/list?pageNum=' + pageNum
			
		}else{
			url += 'course/list?pageNum=1'
		}
		if(typeId&& typeId>0){
			url += '&typeId=' + typeId
			
		}
		return url
	},
	courseDetail(cid){//课程详情
		return this.host + 'course/detail?cid=' + cid
	},
	
	userLogin(){//用户登录
		return this.host + 'user/login'
	},
	
	userRegister(){//用户注册
		return this.host + 'user/register'
	},
	userDetails(){//获取用户基本信息
		return this.host + 'user/details'
	},
	changeUserPassword(){//修改用户密码
		return this.host + 'user/changePassword'
	},
	userUploadAvatar(){//上传用户头像，不验证身份信息
		return this.host + 'user/upload/avatar'
	},
	userUpdateAvatar(){//更新用户头像
		return this.host + 'user/update/avatar'
	},
	// TODO:注册时失去焦点时验证用户名是否已经存在
	// TODO:注册时失去焦点时验证电话是否已经存在
	captchaRegister(){//获得登录验证码
		return this.host + 'captcha/register'
	},
	favoriteChange(){//添加到收藏
		return this.host + 'favorite/change'
	},
	favoriteList(){//显示收藏夹内容
		return this.host + 'favorite/list'
	},
	favoriteCheck(cid){//检查课程是否已收藏
		return this.host + 'favorite/check?cid=' + cid
	},
	cartAdd(){
		return this.host + 'cart/add'
	},
	cartCheck(){
		return this.host + 'cart/check'
	},
	cartDelete(){
		return this.host + 'cart/delete'
	},
	cartClear(){
		return this.host + 'cart/clear'
	}
}