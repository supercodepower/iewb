/*前置中间件*/
const express = require('express')

module.exports = function(req,res,next){
	if(!req.session || !req.session.userInfo){
		let output = {
			code:490,
			msg:'login required'
		}
		res.send(output)
		return
	}
	next( )
}