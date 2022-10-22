/*校区模块*/
const express  = require('express')
const { parseFlagList } = require('mysql/lib/ConnectionConfig')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*校区列表功能点
请求方法
GET
请求参数
typeId 
pageNum
请求URL
/course/list
返回消息
[...]
*/
router.get('/typeId',(req,res,next)=>{
	let cid = req.query.cid
	if(!cid){
		res.send({
			code:400,
			msg:'cid required!'
			
		})
		return
	}
	let output = {}
	let sql = 'SELECT typeId FROM course WHERE cid = ?'
	pool.query(sql,cid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		output.cid = cid 
		output.typeId = result[0].typeId
		res.send(output)
	})
})

router.get('/list',(req,res,next)=>{
	/*1.获取请求数据*/
	let typeId = req.query.typeId
	if(!typeId){
		typeId = 0
	}else{
		typeId = parseInt(typeId)
	}
	
	let pageNum = req.query.pageNum
	if(!pageNum){
		pageNum = 1
	}else{
		pageNum = parseInt(pageNum)
	}
	
	/*2.查询数据库*/
	let condition = ''
	let placeholder = []
	let output = {
		totalCount:0,
		pageSize:6,
		pageCount:0,
		pageNum:1,
		courseList:[]
	}
	
	let sql = `SELECT COUNT(*) AS c FROM course WHERE 1 `
	if(typeId>0){
		sql+=' AND typeId = ? '
		placeholder.push(typeId)
	}
	
	pool.query(sql,placeholder,(err,result)=>{
		if(err){
			next(err)
			return
		}
		output.pageNum = pageNum
		output.totalCount = result[0].c
		output.pageCount = Math.ceil(output.totalCount/output.pageSize)
		
		let placeholder = []
		let sql  = 'SELECT cid,pic,title,cLength,startTime,price,tid,tname FROM course,teacher WHERE course.teacherId = teacher.tid '
		if(typeId>0){
			sql+=' AND typeId = ? '
			placeholder.push(typeId)
		}
		sql += ' ORDER BY cid DESC LIMIT ?,? '
		let start = (pageNum-1)*output.pageSize
		placeholder.push(start)
		placeholder.push(output.pageSize)
		
		pool.query(sql,placeholder,(err,result)=>{
			if(err){
				next(err)
				return
			}
			output.courseList = result
			res.send(output)
		})
		
	})
	
})

/*课程详情功能点
请求方法
GET
请求参数
cid 必需 
请求URL
/course/detail
返回消息
{
	"cid": 1,
	"typeld": 1,
	"title": "01HTML零基础入门",
	"cLength": "1天".
	"startTime": "每周一开课",
	"pic": "img-courseV01.png",
	"price": 399,
	"details": "<p>本课程详细讲解了H"tid": 1,
	"tid":1
	"tname" :"成亮",
	"tpic" : "img-teacher\/zx.jpg" ,
	"schoolList":[
		{sid: ,sname:}
	]
}
*/

router.get('/detail',(req,res,next)=>{
	//获取用户数据
	let cid = req.query.cid
	if(!cid){
		let output = {
			code:400,
			msg:'cid required!'
		}
		res.send(output)
		return
	}
	
	
	//执行数据库查询
	let output ={}
	let sql  = 'SELECT cid,typeId,title,cLength,startTime,pic,price,details,tid,tname,tpic   FROM course,teacher WHERE course.teacherId=teacher.tid AND cid = ?'
	pool.query(sql,cid,(err,result)=>{
		if(err){
			next(err)
			return
		}
		if(result.length===0){
			res.send({})
			return
		}
		output = result[0]
		
		let sql = 'SELECT sid,sname FROM school WHERE sid IN(SELECT schoolId FROM schoolCourse WHERE courseId = ?)'
		pool.query(sql,cid,(err,result)=>{
			if(err){
				next(err)
				return
			}
			output.schoolList = result
			res.send(output)
		})
	})
	
	//将消息发送到客户端
})

/*3.3最新课程功能点
请求方法
GET
请求参数
count 可选 
请求URL
/course/newest
返回消息
[
	{
		cid: ,
		title: ,
		pic: ,
		price: ,
		tname: 
		
	},
	...
]
*/

router.get('/newest',(req,res,next)=>{
	let count = req.query.count //此处count为字符串，需要解析成int类型
	if(!count){
		count = 4
	}
	count = parseInt(count)
	let sql = 'SELECT cid,title,pic,price,tname  FROM course,teacher WHERE course.teacherId = teacher.tid ORDER BY cid DESC LIMIT ?'
	pool.query(sql,count,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
})

/*3.4最热课程功能点
请求方法
GET
请求参数
count 可选 
请求URL
/course/hottest
返回消息
[
	{
		cid: ,
		title: ,
		pic: ,
		price: ,
		tname: 
		
	},
	...
]
*/

router.get('/hottest',(req,res,next)=>{
	let count = req.query.count //此处count为字符串，需要解析成int类型
	if(!count){
		count = 4
	}
	count = parseInt(count)
	let sql = 'SELECT cid,title,pic,price,tname  FROM course,teacher WHERE course.teacherId = teacher.tid ORDER BY buyCount DESC LIMIT ?'
	pool.query(sql,count,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
})