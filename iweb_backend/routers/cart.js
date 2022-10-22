/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*添加商品到购物车功能点
请求方法
POST
请求参数
	userid 必需 从session中获取
    courseid 必需
    count 默认为1
请求URL
/cart/add
返回消息
{
	code:200,
	msg:'course add success!',
	ctId:result.insertId
}
*/
router.post('/add',(req,res,next)=>{
	//获取用户数据

	let userId = req.session.userInfo.uid
	let courseId = req.body.courseId
	if(!courseId){
		let output = {
			code:460,
			msg:'courseId required'
		}
		res.send(output)
		return
	}
	let count = req.body.count
	if(!count){
		count = 1
	}
	
	//查询数据库并插入数据
	let sql  = 'SELECT cid FROM course WHERE cid=?'
	pool.query(sql,courseId,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length===0){
			let output = {
				code:463,
				msg:"the course to be added does not exist"
			}
			res.send(output )
			return
		}
		let sql = 'SELECT userId FROM cart WHERE  courseId=? AND userId=?'
		pool.query(sql,[courseId,userId],(err,result)=>{
			if(err){
				next(err)
				return
			}
			if(result.length>0){
				let sql = 'UPDATE cart SET count=? WHERE courseId=? AND userId=?'
				pool.query(sql,[count,courseId,userId],(err,result)=>{
					if(err){
						next(err)
						return
					}
					
					let output = {
						code:201,
						msg:'course count has been chaged!'
					}
					res.send(output)
				})
			}else{
				let ctTime = Date.now()
				let sql = 'INSERT INTO cart(ctTime,userId,courseId,count) VALUES (?,?,?,?)'
				pool.query(sql,[ctTime,userId,courseId,count],(err,result)=>{
					if(err){
						next(err)
						return
					}
					let output = {
						code:200,
						msg:'course added successfully!',
						ctId:result.insertId,
						ctTime:ctTime
					}
					res.send(output)
				})
			}
		})
		
	})
	 //将消息发送到客户端
})


/*查询购物车功能点
请求方法
GET
请求参数
	userid 必需 从session中获取
请求URL
/cart/check
返回消息
[
	{
		ctId,
		cid,
		title,
		pic,
		price,
		count,
		ctTime
	},
	...	
]

*/
router.get('/check',(req,res,next)=>{
	//获取用户数据
	let userId = req.session.userInfo.uid
	
	//查询数据库
	let sql = 'SELECT ctId,cid,title,pic,price,count,ctTime FROM cart,course WHERE cart.courseId = course.cid AND userId  = ? ORDER BY ctId DESC'
	pool.query(sql,userId,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
	
	//将查询结果发送给用户
})


/*更新购物车功能点
请求方法
POST
请求参数
	userId 必需 从session中获取
	courseId 必需
	count 必需
请求URL
/cart/update
返回消息
{
	code:200,
	msg:'course updated successfully!',
...
}
*/
router.post('/update',(req,res,next)=>{
	//获取用户数据
	let userId = req.session.userInfo.uid
	let courseId = req.body.courseId
	
	if(!courseId){
		let output = {
			code:460,
			msg:'courseId required'
		}
		res.send(output)
		return
	}
	
	let count = req.body.count
	if(!count){
		let output = {
			code:461,
			msg:'count required'
		}
		res.send(output)
		return
	}
	//查询并更新数据库
	let sql = 'SELECT ctId FROM cart WHERE userId=? AND courseId=?'
	pool.query(sql,[userId,courseId],(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length===0){
			let output ={
				code:462,
				msg:'the course to be updated does not exist!'
			}
			res.send(output)
			return
		}
		let sql = 'UPDATE cart SET count=? WHERE userId=? AND courseId=?'
		pool.query(sql,[count,userId,courseId],(err,result)=>{
			if(err){
				next(err)
				return
			}
			let output = {
				code:200,
				msg:'course updated successfully!'
			}
			res.send(output)
		})
	})
	
	//将消息发送给客户端
})

/*清空购物车功能点
请求方法
GET
请求参数
	userId 必需 从session中获取
请求URL
/cart/delete
返回消息
{
	code:200,
	msg:'cart empty',
...
}
*/
router.get('/clear',(req,res,next)=>{
	//获取用户数据
	let userId = req.session.userInfo.uid
	
	//查询数据库并删除对应表单
	let sql  = 'DELETE FROM cart WHERE userId=?'
	pool.query(sql,userId,(err,result)=>{
		if(err){
			next(err)
			return 
		}
		let output = {
			code:200,
			msg:'cart empty'
		}
		res.send(output)
	})
	
	//将消息发送到客户端
})

/*删除购物车商品功能点
请求方法
POST
请求参数
	userId 必需 从session中获取
	courseId
请求URL
/cart/delete
返回消息
{
	code:200,
	msg:'cart empty',
...
}
*/

router.post('/delete',(req,res,next)=>{
	//获取用户数据
	let userId = req.session.userInfo.uid
	let courseId = req.body.courseId
	if(!courseId){
		let output ={
			code:460,
			msg:'courseId required!'
		}
		res.send(output)
		return
	}
	
	//查询数据库并删除对应表单
	let sql  = 'DELETE FROM cart WHERE userId=? '
	if(Object.prototype.toString.call(courseId) === '[object Array]'){
		sql+='AND courseId in(?) '
	}else{
		sql += 'AND courseId =? '
	}

	
	pool.query(sql,[userId,courseId],(err,result)=>{
		if(err){
			next(err)
			return 
		}
		let output = {
			code:200,
			msg:'course delete success!'
		}
		res.send(output)
	})
	
	//将消息发送到客户端
})