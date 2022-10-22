const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*添加订单功能点
请求方法
POST
请求参数
uid 必需  从session中获取
orderId 必需
courseId 必需
count
请求URL
/order/add
返回消息
[
	code:200,
	msg:'order add success'
	oid:8
]
*/

router.post('/add',(req,res,next)=>{
	let uid = req.session.userInfo.uid
	
	let orderId = req.body.orderId
	if(!orderId){
		let output = {
			code:480,
			msg:'orderId reuired'
		}
	}
})
