/*校区模块*/
const express  = require('express')

const pool = require('../pool')

let router = express.Router()

module.exports = router

/*类别列表功能点
请求方法
GET
请求参数
无
请求URL
/type
返回消息
[
	{
		tpId:,
		tpName:
	},
	...
]
*/

router.get('/',(req,res,next)=>{
	let sql = 'SELECT tpId,tpName FROM type ORDER BY tpId'
	pool.query(sql,(err,result)=>{
		if(err){
			next(err)
			return
		}
		res.send(result)
	})
})