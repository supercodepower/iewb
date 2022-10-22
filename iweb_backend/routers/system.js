/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*系统信息功能点
请求方法
GET
请求参数
无
请求URL
/system/info
返回消息
{
		logoUrl   logo图片路径
		siteName    网站名称
		adminMail   管理员邮箱
		adminPhone  管理员电话
		copyright  版权声明
		companyName    公司名称
		icp
	
}*/


router.get('/system/info',(req,res,next)=>{
	let sql = 'SELECT logoUrl,siteName,adminMail,adminPhone,copyright,companyName,icp FROM basicInfo'
	pool.query(sql,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result[0])
	})
	
})

/*校区列表功能点
请求方法
GET
请求参数
无
请求URL
/carousel
返回消息
[
	{
		cid 	广告编号
		picUrl    图片地址
		herf   引用地址
		title	说明文字
	}
]
*/

router.get('/carousel',(req,res,next)=>{
	let sql = 'SELECT cid,picUrl,herf,title FROM carousel'
	pool.query(sql,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
	
})