/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*改变收藏功能点
请求方法
POST
请求参数
uid 必需  从session中获取
cid 必需
请求URL
/favorite/add
返回消息
[
	code:200,
	msg:'favorite add success'
	fid:8
]
*/

router.post('/change',(req,res,next)=>{
	// if(!req.session || !req.session.userInfo){
	// 	let output  = {
	// 		code:490,
	// 		msg:'login required'
	// 	}
	// 	res.send(output)
	// 	return
	// }
	
	let uid = req.session.userInfo.uid 
	let cid = req.body.cid 
	let fTime = Date.now()
	
	if(!cid){
		let output = {
			code:400,
			msg:'cid reuired!'
		}
		res.send(output )
		return
	}
	
	let sql = 'SELECT fid FROM favorite WHERE userId =? AND courseId = ?'
	pool.query(sql,[uid,cid],(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length>0){
			
			let sql = 'DELETE FROM favorite WHERE fid =?'
			pool.query(sql,result[0].fid,(err,result)=>{
				if(err){
					next(err)
					return
				}
				let output = {
					code:201,
					msg:'favorite cancel!'
				}
				res.send(output)
				return
			})
		}else{
			let sql = 'INSERT INTO favorite(userId,courseId,fTime) VALUES (?,?,?)'
			
			pool.query(sql,[uid,cid,fTime],(err,result)=>{
				if(err){
					next(err)
					return
				}
				let output = {	
					code:200,
					msg:'favorite add ',
					fid:result.insertId
				}
				res.send(output)
			})
		}
	})
	
})

/*查看收藏列表功能点
请求方法
GET
请求参数
uid 必需  从session中获取
请求URL
/favorite/list
返回消息
[	{
		"title" : "07HTML零基础入门",
		"pic": "img-course\/06.png",
		"price":399,
		"courseId": 7,
		"fid": 2,
		"fTime":1578015036},		...
	}]

*/

router.get('/list',(req,res,next)=>{
	// if(!req.session || !req.session.userInfo){
	// 	let output  = {
	// 		code:490,
	// 		msg:'login required'
	// 	}
	// 	res.send(output)
	// 	return
	// }
	let uid = req.session.userInfo.uid
	
	let sql = 'SELECT title,pic,price,courseId,fid,fTime FROM favorite,course WHERE course.cid= favorite.courseId AND userId = ? ORDER BY fTime DESC'
	pool.query(sql,uid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
	
})

/*查询用户是否收藏该课程功能点
请求方法
GET
请求参数
uid 必需  从session中获取
cid 必需
请求URL
/favorite/check
返回消息{
	code:200,
	msg:'already collected'	...
}
*/

router.get('/check',(req,res,next)=>{
	let cid = req.query.cid
	if(!cid){
		let output = {
			code:400,
			msg:'cid required!'
		}
		res.send(output)
		return
	}
	
	let uid = req.session.userInfo.uid
	
	let sql = 'SELECT fid FROM favorite WHERE courseId=? AND userId=?'
	pool.query(sql,[cid,uid],(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length===0){
			let output = {
				code:201,
				msg:'this course is not fovorite!'
			}
			res.send(output)
			return
		}
		
		let output  = {
			code:200,
			msg:'this course is favorite!'
		}
		res.send(output)
		
	})
})