<template>
	<view class="order">
		<template v-if="buyList[0]">
			<view class="order-header">
				<uni-list>
					<uni-list-item  :title="address.address+' '+address.detail" :note="address.reciveName +' '+ address.phone" link to="/pages/address/address"></uni-list-item >
				</uni-list>
			</view>
			<view class="order-body">
				<uni-list>
					<uni-list-item class="goods" v-for="(course,index) in buyList" :key="index" >
						<template v-slot:header >
							<view class="goods-header">
								<image class="pic" :src="server.host + course.pic" mode="widthFix"></image>
							</view>
						</template>
						<template v-slot:body>
							<view class="goods-body" >
								<view class="title">
									{{course.title}}
								</view>
								<view class="item">
									<view class="price">
										{{course.price | currency}}
									</view>
									<view class="count">x{{course.count}}</view>
								</view>
							</view>	
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="order-footer">
				<view class="order-footer-left">
					
				</view>
				<view class="order-footer-right">
					<view class="count" v-if="count">
						共计{{this.count}}件
					</view>
					<view>合计:</view>
					<view class="price">
						{{totalCount | currency}}
					</view>
					<view class="orderButton"  @click="onSubmitOrder">
						提交订单
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:0,
				totalCount:0,
				buyList:[],
				toDelete:[],
				address:{
					address:'浙江省 杭州市 江干区',
					detail:'杭州电子科技大学大学生活区',
					phone:'15355008826',
					reciveName:'小熊猫'
				}
			};
		},
		onLoad(options) {
			this.count = options.count
			this.totalCount = options.totalCount
			this.buyList = getApp().globalData.order
			uni.$on('chooseAddress',(address)=>{
				this.address = address.address
			})
		},
		methods:{
			onSubmitOrder(){
				uni.showToast({
						title: '付款成功！',
						success: () => {
							this.buyList.forEach((course)=>{
								this.toDelete.push(course.cid)
							})
						}
					});
				uni.request({
					url:this.server.cartDelete(),
					method:"POST",
					withCredentials:true,
					data:{
						courseId:this.toDelete
					},
					success: () => {
						uni.$emit('alreadyBuy')
						setTimeout(()=>{
							this.count = 0
							this.totalCount = 0
							getApp().globalData.orderList.push(this.buyList)
							uni.navigateBack({
								delta:2
							});
						},500)
					}
					
				})
			}
		}
	}
</script>

<style lang="scss">
	.order{
		background-color: $uni-bg-color-grey;
		margin-bottom: 150rpx;
		.order-header{
			width: 730rpx;
			// padding: 0 10rpx;
			margin: 20rpx 0rpx;
			border-radius: 20%;
		}
		
		.goods{
			display: flex; 
			.goods-header{
				.pic{
					width:200rpx;
				}
			}
			
			.goods-body{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 10rpx;
				overflow:hidden;
				.title{
					font-size: $uni-font-size-lg;
					font-weight: bold;
					margin-bottom: $uni-spacing-row-base;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.item{
					display: flex;
					.price{
						flex: 1;
						display: flex;
						align-items:center;
					}
					.count{
						width:2em;
						height:2em ;
						border: 2rpx solid $uni-text-color-grey;
						padding-left: 10rpx;
						border-radius: 30%;
						display: flex;
						align-items: center;
					}
				}
			}
		}
	
		.order-footer{
			position: fixed;
			bottom: 0rpx;
			left:0rpx;
			right:0rpx;
			display: flex;
			padding: 50rpx  30rpx;
			box-shadow: 0 0 2rpx;
			background-color: $uni-text-color-inverse;
			.order-footer-left{
				flex:1;
			}
			.order-footer-right{
				display:flex;
				.orderButton{
					width: 200rpx;
					height: 60rpx;
					padding-top: 10rpx;
					background-color: $iweb-theme-reverse;
					color: $uni-text-color-inverse;
					border-radius: 50rpx;
					text-align: center;
					margin-left: 20rpx;
				}
				.count{
					padding-right:20rpx;
					color: $uni-text-color-grey;
					font-size: $uni-font-size-base;
				}
		}
		}
	}
</style>
