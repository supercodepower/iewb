/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*校区列表功能点
请求方法
GET
请求参数
无
请求URL
/school/list
返回消息
[
	{
		sid,
		sname,
		address,
		phone,
		postcode
	},
	...
]
*/

router.get('/list',(req,res,next)=>{
	//想MySQL数据库发起查找请求
	
	//想客户端发送响应消息
	let sql = 'SELECT sid,sname,address FROM school'
	pool.query(sql,(err,result)=>{
		if(err) {
			next(err)	
		}
		
		//向客户端发送响应消息
		else{
			res.send(result)
		}
		
	})
	
})

/*校区开课表功能点
请求方法
GET
请求参数
sid 必需
请求URL
/school/course
返回消息
	{
		school:{
			sid,
			sname,
			address,
			phone,
			postcode
		},
		courseList:[
			{
				cid,
				pic,
				cLength,
				startTime,
				price
			},
			...
		]
	}
*/
router.get('/course',(req,res,next)=>{
	//读取请求数据
	let sid = req.query.sid
	if(!sid){
		let output = {
			"code":400,
			"msg":'sid required',
		}
		res.send(output)
		return
	}
	//查询请求数据
	let output = {
		school:{},
		courseList:[]
	}
	
	let sql = 'SELECT sid,sname,address,phone,postcode FROM school WHERE sid = ?'
	
	pool.query(sql,sid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result==0){
			res.send(output)
			return
		}
		output.school = result[0] 
		
		
		let sql = 'SELECT cid,pic,title,cLength,startTime,price FROM course WHERE   cid IN (SELECT courseId FROM schoolCourse WHERE schoolId=?) '
		
		pool.query(sql,sid,(err,result)=>{
			if(err){
				next(err)
				return
			}
			if(result ==0){
				res.send(output)
				return
			}
			output.courseList = result
			
			//返回响应消息
			res.send(output)
		})
	})
	
	
	
	
})