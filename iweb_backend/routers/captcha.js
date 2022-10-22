/*校区模块*/
const express  = require('express')
const { MACCE } = require('mysql/lib/protocol/constants/charsets')

const svgCaptcha = require('svg-captcha')
const random = require('../utils/random')

let router = express.Router()

module.exports = router

/*验证码功能点
请求方法
get
请求参数
cid
请求URL
/captcha/register
返回消息
[...]
*/

router.get('/register',(req,res)=>{
	let options = {
		width:100,
		height:30,
		fontSize:35,
		size:5,
		ignoreChars:'oOIl10Zz2',
		noise:5,
		color:true,
		background:random.randColor(180,240)
	}
	
	let captcha = svgCaptcha.create(options)
	

	req.session.captchaRegister = captcha.text.toLowerCase()
	console.log(req.session)
	
	res.type('svg')//修改响应头部：content-type：img/svg + xml
	res.send(captcha.data)
})