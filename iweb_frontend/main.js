import App from './App'
import server from './server'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
//此处出用于声明不经常改变的全局数据
Vue.prototype.server = server
Vue.filter('currency',(val)=>{
	if(val>=0){
		let n = Number(val)
		return '￥ '+n.toFixed(2) 
	}
})
 
Vue.filter('phoneMask',(val)=>{
	if(val){
		let arr = val.split('')//把字符串用空白拆分为数组
		arr.splice(3,5,"*****")
		return arr.join('')
	}
}) 
 
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif