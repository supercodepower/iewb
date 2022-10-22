<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			userInfo:null,
			orderList:[]
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	view {
		box-sizing: border-box; //盒子总宽度margin+ width
	}
	.content{
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// justify-content: center;
		font-size: $uni-font-size-base;
	}
	.price{
		color: $iweb-theme-reverse;
	}
	.h1{
		font-size: $uni-font-size-title;
	}
	.h2{
		font-size: $uni-font-size-subtitle;
	}
	.p{
		font-size: $uni-font-size-paragraph;
	}
</style>
