/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*教师列表功能点
请求方法
GET
请求参数
无
请求URL
/teacher/list
返回消息
[
	{
		tid,
		tname,
		mainCourse,
		tpic,
		style
	}
	...
]
*/
	
router.get('/list',(req,res,next)=>{
	let sql = 'SELECT tid,tname,mainCourse,tpic,style FROM teacher'
	pool.query(sql,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
	
})

/*教师详情功能点
请求方法
GET
请求参数
tid 必需 
请求URL
/teacher/detail
返回消息

{
	tid,
	tname,
	mainCourse,
	tpic,
	style,
	experience,
	courseList:[
		{
			cid,
			title, //课程标题
			pic //课程图片
		}
		...
	]
	
}

*/
router.get('/detail',(req,res,next)=>{
	let tid = req.query.tid
	if(!tid){
		let output = {
			code:400,
			msg:'tid required!'
		}
		res.send(output)
		return
	}
	
	let output = {}
	let sql = 'SELECT tid,tname,mainCourse,tpic,style,experience FROM teacher WHERE tid = ?'
	pool.query(sql,tid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length===0){
			res.send(output)
			return
		}
		output = result[0]
		
		let sql = 'SELECT cid,title,pic FROM course WHERE teacherId = ?'
		
		pool.query(sql,tid,(err,result)=>{
			if(err){
				next(err)
				return
			}
			 output.courseList = result
			 res.send(output)
		})
	})
})