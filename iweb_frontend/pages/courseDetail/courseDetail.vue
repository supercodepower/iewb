<template>
	<view class="content">
		<template v-if="courseDetail.cid">
			<!--解决127.0.0.1:5050/undefined的问题><!-->
			
				<view class="title">
					{{courseDetail.title}}
				</view>
				
				<view class="pic">
					<image :src="server.host + courseDetail.pic" mode="widthFix"></image>
				</view>
				
				<view class="brief-intruduction">
					<view class="row">
						<view class="lable">讲师:</view>
						<navigator class="tname" :url='"/pages/teacherDetail/teacherDetail?tid=" + courseDetail.tid'>{{courseDetail.tname}}</navigator>
					</view>
					
					<view class="row">
						<view class="lable">课时:</view>
						<view class="">
							{{courseDetail.cLength}}
						</view>
					</view>
					
					<view class="row">
						<view class="lable">开课时间:</view>
						<view class="">
							{{courseDetail.startTime}}
						</view>
					</view>
					
					<view class="row">
						<view class="lable">开课地点:</view>					
						<navigator class="address" :url='"/pages/schoolDetail/schoolDetail?sid=" + courseDetail.sid' v-for="(school,index) in courseDetail.schoolList" :key="index">
							{{school.sname}}{{index==courseDetail.schoolList.length-1?'':"、"}}
						</navigator>
					</view>	
					
				</view>
							
				<view class="price-box">
					<view class="lable">
						课程价格:
					</view>
					<view class="price">
						{{courseDetail.price | currency }}
					</view>
					<uni-fav class="favorite" :checked="isFav" @click="addFavorite" circle bgColor="#00be56" bgColorChecked="#f60" fgColor="#fff"></uni-fav>
				</view>		
				
				<view class="details">
					<view class="details-title">
						课程详情:
					</view>
				</view>
				
				<view class="details-content">
					<rich-text  :nodes="courseDetail.details"></rich-text>
				</view>
		</template>
		
		<view class="bottom-box">
			<uni-goods-nav :fill="true"  :options="goodsNavOptions" :buttonGroup="goodsNavButtonGroup"  @click="onOptionClick" @buttonClick="onButtonClick" />
		</view>
		
	</view>
	
</template>
<script>
	export default {
		data() {
			return {
				courseDetail:{},
				isFav:false,
				userInfo:{},
				goodsNavOptions: [
					{
						icon:'more',
						text:'更多'
					}, 
					{
						icon:'heart',
						text:'收藏'
					}, 
					{
						icon: 'cart',
						text: '购物车',
						info: 0
					}],
				goodsNavButtonGroup: [
					{
					  text: '加入购物车',
					  backgroundColor: '#ff0000',
					  color: '#fff'
					},
					{
					  text: '立即购买',
					  backgroundColor: '#ffa200',
					  color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			let cid = options.cid
			this.goodsNavOptions[2].info = 0
			// #ifdef H5
			if(!cid){
				uni.showModal({
					title:'警告',
					content:'页面显示错误！请重新进入该页面！',
					showCancel:false,
					success: () => {
						uni.switchTab({
							url:'/pages/course/course'
						})
					}
					
				})
				
			}
			// #endif
			
			uni.showLoading({
				title:'努力加载中...'
			})
			uni.request({
				url:this.server.courseDetail(cid),
				withCredentials:true,
				success: (res) => {
					this.courseDetail = res.data
					uni.hideLoading()
				}
			})
			
			uni.getStorage({
				key:'userInfo',
				success: (res) => {
					this.userInfo = res.data
					if(this.userInfo.uid){
						uni.request({
							url:this.server.favoriteCheck(cid),
							withCredentials:true,
							success: (res) => {
								if(res.data.code===200){
									this.isFav = true
								}
							}
						})
					}
				}
			})
			
		},
		  methods: {
			  loginTips(content){
				  uni.showModal({
				  	title:'提示',
					content:content,
					complete: (result) => {
						if(result.confirm){
							uni.switchTab({
								url:'/pages/userCenter/userCenter'
							})
						}
					}
				  })
			  },
			  
			  addFavorite(){
				  if(!this.userInfo.uid){//用户未登录
					 let content='登录后才可添加至收藏，点击确定去登录！'
					 this.loginTips(content)
				  }
				  else{
					  uni.request({
					  	url:this.server.favoriteChange(),
						method:"POST",
						data:{
							cid:this.courseDetail.cid
						},
						withCredentials:true,
						success: (res) => {
							if(res.data.code===490){
								//服务会话超时
								let content='会话已超时，点击确定重新登录！'
								this.loginTips(content)
							}else if(res.data.code===200){//收藏成功
								uni.$emit('updateFavorite')
								uni.showToast({
									title:'已收藏！'
								})
								this.isFav = true
							}else if(res.data.code===201){//更新收藏时间
								uni.$emit('updateFavorite')
								uni.showToast({
									title:'已取消收藏！'
								})
								this.isFav = false
							}else{//收藏失败
								uni.showModal({
									title:'提示',
									content:'收藏失败，请稍后重试！原因:' + res.data.msg,
									showCancel:false
								})
							}
						}
					  })
					  
				  }
				  
			  },
		  	  
			  onOptionClick (e) {
		  	   if(e.index===0){//更多商品 TODO:推荐类似的商品
				   uni.switchTab({
				   	url:'/pages/course/course'
				   })
			   }else if(e.index===1){//收藏商品
					if(!this.userInfo.uid){
						let content='登录后才可查看收藏夹，点击确定去登录！'
						this.loginTips(content)
					}else{
						uni.navigateTo({
							url:'/pages/favorite/favorite'
						})
					}
				  
			   }else if(e.index===2){//查看购物车
				   if(!this.userInfo.uid){
					let content='登录后才可查看购物车，点击确定去登录！'
					this.loginTips(content)
				   }else{
					 this.goodsNavOptions[2].info = 0
					  uni.navigateTo({
					 	url:'/pages/cart/cart'
					 })  
				   }
			   }
		  	  },
		  	  onButtonClick (e) {
				  //TODO:验证是否登录
				
				if(e.index===0){//加入购物车
				    
				  	//TODO:发送异步请求将商品添加到购物车
					if(!this.userInfo.uid){
					  let content='登录后才可添加到购物车，点击确定去登录！'
					  this.loginTips(content)
					}else{
						uni.request({
							url:this.server.cartAdd(),
							method:"POST",
							withCredentials:true,
							data:{
								courseId:this.courseDetail.cid,
								count:this.goodsNavOptions[2].info + 1
							},
							success: (res) => {
								if(res.data.code===200||res.data.code===201){
									uni.showToast({
										title: '添加成功，购物车在等亲！'
									});
									this.goodsNavOptions[2].info++
								}else{
									uni.showModal({
										title: '失败',
										content: '添加失败，请稍后再试！',
										showCancel: false,
									});
								}
							}
						})				 
					}
					
				}else if(e.index===1){//立即购买
					if(!this.userInfo.uid){
					  let content='登录后才可购买，点击确定去登录！'
					  this.loginTips(content)
					}else{
						let totalCount = this.courseDetail.price
						let toBuy = []
						this.courseDetail.count=1
						toBuy.push(this.courseDetail)
						getApp().globalData.order = toBuy
	//TODO:登录则跳转到下单页面
						uni.navigateTo({
							url:'/pages/order/order?count=1&totalCount='+totalCount,
						})
					}
					
				}
		  	}
		}
	}
</script>

<style lang="scss">
	.content{
		padding-left: 20rpx;
		padding-right: 20rpx;
		
		.title{
			text-align: center;
			font-weight: bold;
			font-size: $uni-font-size-title;
			margin: 30rpx 0rpx 15rpx;
		}
		
		.pic{
			width: 750rpx;
			padding: 30rpx;
			image{
				width: 100%;
				transform: translateX(-20rpx);		
			}
		}
		
		.row{
			display: flex;
			flex-wrap: wrap;
			line-height: 1.6em;
			background-color: $uni-bg-color-grey;
			.lable{
				font-weight: bold;
				margin-right: 0.6em;
				font-size: $uni-font-size-lg;
			}
			.tname,.address{
				color: $iweb-theme-reverse;
			}
		}
		
		.price-box{
			display: flex;
			padding-top: 30rpx;
		
			.lable{
				margin-left: 20rpx;
				font-weight: bold;
				font-size: $uni-font-size-lg;
			}
			.price{
				font-size: 1.4em;
				margin-right: 100rpx;
				
			}
			.favorite{
			}
		}
		
		.details{
			display: flex;
			margin: 20rpx 0 20rpx;
			border-bottom: 2rpx solid $uni-border-color;
			.details-title{
				padding: 10rpx 20rpx;
				font-size: $uni-font-size-title;
				font-weight: bold;
				border-bottom: 1rpx solid $iweb-theme-dark;
				transform: translateY(2rpx);
			}
		}
		
		.details-content{
			font-size: $uni-font-size-base;
			line-height: 1.4em;
			padding-bottom: 55px;
		}
		
		
	}
	
		.bottom-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		
	}
	
</style>
