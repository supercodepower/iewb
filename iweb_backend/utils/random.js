module.exports = {
	randNum(min,max	){
		return (Math.floor((Math.random()*(max-min)+min)))
	},
	randColor(min,max){
		let red = this.randNum(min,max)
		
		let green = this.randNum(min,max)
		
		let blue = this.randNum(min,max)
		
		red = red.toString(16)
		red.length<2?'0'+red:red
		
		blue = blue.toString(16)
		blue.length<2?'0'+blue:blue
		
		green = green.toString(16)
		green.length<2?'0'+green:green
		
		return '#'+red+green+blue
	},
	randFileName(oldName){
		let f  = Date.now()
		f = f.toString()
		f+=this.randNum(100000,1000000)
		f+=oldName.substring(oldName.lastIndexOf('.'))
		return f
	}
}