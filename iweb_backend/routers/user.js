/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*用户注册功能点
请求方法
post
请求参数
类型:application/json
uname	必需  用户名
upwd	必需  用户密码
phone	必需  联系方式
captcha 必需	  验证码
请求URL
/user/register
返回消息
[...]
*/

router.post('/register',(req,res,next)=>{
	let user = req.body
	if(!user.uname){
		res.send({
			code:400,
			msg:'uname required!'
		})
		return 
	}

	let unameRegex = /^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
	//省略了邮箱验证/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if(!unameRegex.test(user.uname)){
		res.send({
			code:401,
			msg:'illegal uname!'
		})
		return
	}
	
	if(!user.upwd){
		res.send({
			code:402,
			msg:'upwd required!'
		})
		return 
	}
	//省略了密码长度验证/^(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z~!@#$%^&*._?]{6,12}$/
	let upwdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z~!@#$%^&*._?]{6,12}$/
	//省略了邮箱验证/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if(!upwdRegex.test(user.upwd)){
		res.send({
			code:402,
			msg:'illegal upwd!'
		})
		return
	}

	
	if(!user.phone){
		res.send({
			code:403,
			msg:'phone required!'
		})
		return
	}
	//省略了电话格式验证((\d{[11])|^((\d{7.8])/(\d[4]\d[3])-(\d(7.8])(\d[4]\d[3])-(\d(7.8])-(\d[4]\d[3]d[2]/\d[1])(Nd[7.8J])-(d{4]/\d{3}/\d{2}/\d{1}))$)
	let phoneRegex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
	//省略了邮箱验证/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	if(!phoneRegex.test(user.phone)){
		res.send({
			code:404,
			msg:'illegal phone number!'
		})
		return
	}

	//省略了captcha验证
	let captcha = req.body.captcha
	
	if(!captcha){
		let output = {
			code:405,
			msg:'captcha required'
		}
		res.send(output)
		return
	}
	
	captcha = captcha.toLowerCase()

	if(captcha!==req.session.captchaRegister){

		let output = {
			code:406,
			msg:'captcha error,please retry later!'
		}
		res.send(output)
		return
	}
	
	delete req.session.captchaRegister
	
	let sql = 'SELECT uname FROM user WHERE uname = ?'
	pool.query(sql,user.uname,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length>0){
			res.send({
				code:500,
				msg:'user name already exists!'
			})
			return
		}
		
		let sql = 'SELECT phone FROM user WHERE phone = ?'
		pool.query(sql,user.phone,(err,result)=>{
			if(err){
				next(err)
				return
			}
			if(result.length>0){
				res.send({
					code:501,
					msg:'phone number already exists!'
				})
				return
			}
			
			let sql = 'INSERT INTO user (uname,upwd,phone) VALUES (?,?,?)'
			pool.query(sql,[user.uname,user.upwd,user.phone],(err,result)=>{
				if(err){
					next(err)
					return
				}
				res.send({
					code:200,
					msg:'register succes!',
					uid:result.insertId
				})
			})
		})		
	})
})

/*用户登录功能点
请求方法
post
请求参数
类型:application/json
uname	必需  用户名
upwd	必需  用户密码
请求URL
/user/login
返回消息
[code:200,
msg:login success,
userInfo:{
	uid:2,
	uname:ranrna@tedu.com,
	nickName:然然
}]
*/

router.post('/login',(req,res,next)=>{
	let uname = req.body.uname
	if(!uname){
		res.send({
			code:401,
			msg:'uname required!'
		})
		return
	}
	
	let upwd = req.body.upwd
	if(!upwd){
		res.send({
			code:403,
			msg:'upwd required!'
		})
		return
	}
	
	let sql = 'SELECT uid,uname,nickName FROM user WHERE uname=? AND upwd=?'
	pool.query(sql,[uname,upwd],(err,result)=>{
		if(err){
			next(err)
			return 
		}
		if(result.length===0){
			let output = {
				code:405,
				msg:'uname or upwd error!'
			}
			res.send(output)
			return 
		}
		/*將當前用户信息保存到服务器端*/
		req.session.userInfo = result[0]
		
		let output = {
			code:200,
			msg:'login success',
			userInfo:result[0]
		}
		res.send(output)
	})
})

router.get('/checkUname',(req,res,next)=>{
	let uname = req.query.uname
	if(!uname){
		res.send({
			code:400,
			msg:'uname require'
		})
		return 
	}
	let sql  = 'SELECT uname FROM user WHERE uname=?'
	pool.query(sql,uname,(err,result)=>{
		if(err){
			next(err)
			return 
		}
		if(result.length >0){
			res.send({
				code:200,
				msg:'user name already exists!'
			})
		}else{
			res.send({
				code:200,
				msg:'user name available!'
			})
		}
	})
})

router.get('/checkphone',(req,res,next)=>{
	let phone = req.query.phone
	if(!phone){
		res.send({
			code:400,
			msg:'phone require'
		})
		return 
	}
	let sql  = 'SELECT phone FROM user WHERE phone=?'
	pool.query(sql,phone,(err,result)=>{
		if(err){
			next(err)
			return 
		}
		if(result.length >0){
			res.send({
				code:200,
				msg:'phone number already exists!'
			})
		}else{
			res.send({
				code:200,
				msg:'phone number available!'
			})
		}
	})
})

/*4.3.1上传用户头像功能点
请求方法
post
请求参数
类型:multipart/form-data
avatar 必需 用户带上传头像
请求URL
/user/upload/avatar
返回消息
[
	code:200,
	msg:'update avatar success',
	fileName:'images/avatar/jdflsfjd.jpg'
]
*/
const random = require('../utils/random')
const fs = require('fs')
 


const multer = require('multer')
let upload = multer({dest:'temp/'})
 
router.post('/upload/avatar',upload.single('avatar'))//使用中间件解析
 
router.post('/upload/avatar',(req,res,next)=>{
	
	let file = req.file 
	let oldPath = file.path 
	let newPath = 'img-avatar/' + random.randFileName(file.originalname)
	fs.rename(oldPath,'./public/'+newPath,(err)=>{
		if(err){
			next(err)
			return
		}
		let output = {
			code:200,
			msg:'avatar upload succ!',
			fileName:newPath
		}
		res.send(output)
	})
})

/*4.3.2上传用户头像功能点
请求方法
post
请求URL
/user/update/avatar
请求参数
fileName 必需
类型:application
avatar 必需 用户带上传头像

返回消息
[
	code:200,
	msg:'avatar update success',
]
*/
const loginCheck = require('../middleware/loginCheck')
router.post('/update/avatar',loginCheck)

router.post('/update/avatar',(req,res,next)=>{
//1.读取客户端上传的文件内容
	let fileName = req.body.fileName
	console.log(fileName)
	//当前登录用户在会话中存储的uid
	let uid = req.session.userInfo.uid
	//3.执行sQL语句，向数据库中提交UPDATE，更改当前登录用户的头像图片地址
	let sql ='UPDATE user SET avatar=? WHERE uid=?'
	pool.query(sql,[fileName,uid],(err,result)=>{
		if(err){
			next(err)
			return
		}
		// 当前登录用户的头像在数据库中修改完成
		let output= {
			code: 200,
			msg: 'avatar update succ!',
			}
		res.send(output)
	})
})


/*获取用户全部信息功能点
请求方法
GET
请求参数

uid	必需  session中获取 

/user/details
返回消息
{
	uid:,
	uname:,
	upwd,
	phone:,
	avatar:,
	job:,
	edu:,
	age:,
	sex:
}
*/
router.get('/details',loginCheck)

router.get('/details',(req,res,next)=>{
	let uid = req.session.userInfo.uid
	let sql = 'SELECT uid,uname,upwd,nickName,phone,avatar,job,edu,age,sex FROM user WHERE uid=?'
	pool.query(sql,uid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		
		res.send(result[0])
	})
})

/*修改用户密码功能点
请求方法
Post
请求参数

uid	必需  session中获取 
newPassword 必需
/user/details
返回消息
{
	code:200,
	msg:'password update succ!'
}
*/

router.post('/changePassword',loginCheck)

router.post('/changePassword',(req,res,next)=>{
	let uid = req.session.userInfo.uid
	let newPassword = req.body.newPassword
	if(!newPassword){
		let output = {
			code:401,
			msg:'newPassword required!'
		}
		res.send(output)
		return
	}
	let sql = 'UPDATE user SET upwd=? WHERE uid=?'
	pool.query(sql,[newPassword,uid],(err,result)=>{
		if(err){
			next(err)
			return
		}
		let output = {
			code:200,
			msg:'Password update succ!'
		}
		res.send(output)
	})
})