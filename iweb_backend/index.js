/*服务器端应用的入口文件*/
/*1.创建并启用web服务器*/
const express  = require('express')

let port   = 5050
let app = express()
app.listen(port,()=>{
	console.log('server listening on port:',port)
})

/*2.创建前置中间件*/
app.use(express.static('./public'))

const cors  = require('cors')
let corsOptions = {//如果客户端携带了身份认证信息，响应同步不允许指定为 Access-Control-Allow-Origin:*
	origin:['http://localhost:8080','http://127.0.0.1:8080'],
	credentials:true
}
app.use(cors(corsOptions)) //不加参数时，默认添加一个cors消息头，Access-Control-Allow-Origin:*

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//为当前客户端分配session存储空间
const session  = require('express-session')
app.use(session({
	secret:'keyboard cat'	,//自定义生成sessionId的随机数种子
	saveUninitialized:true,
	resave:true
}))



/*3.声明路由和路由器*/
const schoolRouter = require('./routers/school')
app.use('/school',schoolRouter)

const teacherRouter = require('./routers/teacher')
app.use('/teacher',teacherRouter)

const courseRouter = require('./routers/course')
app.use('/course',courseRouter)

const typeRouter = require('./routers/type')
app.use('/type',typeRouter)

const loginCheckMiddleware = require('./middleware/loginCheck')
app.use('/favorite',loginCheckMiddleware)
const favoriteRouter = require('./routers/favorite')
app.use('/favorite',favoriteRouter)

app.use('/cart',loginCheckMiddleware)
const cartRouter = require('./routers/cart')
app.use('/cart',cartRouter)

app.use('/order',loginCheckMiddleware)
const orderRouter = require('./routers/order')
app.use('/order',orderRouter)

app.use('/address',loginCheckMiddleware)
const addressRouter = require('./routers/address')
app.use('/address',addressRouter)

const userRouter = require('./routers/user')
app.use('/user',userRouter)

const systemRouter = require('./routers/system')
app.use('/',systemRouter)

const captchaRouter = require('./routers/captcha')
app.use('/captcha',captchaRouter)

 /*4.常用后置中间件
	访问日志
	错误日志:内置的错误处理中间件
 */

app.use((err,req,res,next)=>{
	
	console.log('出错了！');
	console.log(err)
	res.status(500)
	res.send({
		code:500,
		msg:'Sorry! Server temp error,please retry later!',
		err:err
	})
})