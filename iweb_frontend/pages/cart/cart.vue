<template>
	<view class="cart-list">
		<template v-if="cartList[0]">
			<view class="page-header">
				<view class="page-header-left">我的购物车</view>
				<view class="page-header-right" @click="onManage">{{this.manage?'退出管理':'管理'}}</view>
				
			</view>
				<uni-list>
					<uni-list-item class="course" v-for="(course,index) in cartList" :key="index" >
						<template v-slot:header >
							
								<label class="check">
									<checkbox :checked="course.checked" :value="String(index)" :name="course.title" @click="onClickCheckbox(index)"/>
								</label>
							
							<view class="course-header">
								<image class="pic" :src="server.host + course.pic" mode="widthFix"></image>
							</view>
						</template>
							
						<template v-slot:body>
							<view class="course-body" @click="onClickCourse(course.cid)">
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
			
			<uni-transition class="page-footer" :mode-class="['fade','slide-bottom']" :show="!manage">
					<view class="page-footer-left">
						<label>
							<checkbox :checked="checkedAll" @click="onCheckedAll"/><text>全选</text>
						</label>
					</view>
					<view class="page-footer-right">
						<view class="count" v-if="count">
							共计{{this.count}}件
						</view>
						<view>合计:</view>
						<view class="price">
							{{totalCount | currency}}
						</view>
						<view class="totalCount"  @click="toOrder">
							结算
						</view>
					</view>
			</uni-transition>
				
			<uni-transition class="page-footer" :mode-class="['fade','slide-bottom']" :show="manage">
					<view class="page-footer-left">
						<label>
							<checkbox :checked="checkedAll" @click="onCheckedAll"/><text>全选</text>
						</label>
					</view>
					<view class="page-footer-right">
						<view class="delete-goods" @click="onDeleteGoods">
							删除
						</view>
					</view>
			</uni-transition>
			
		</template>
		<view class="empty" v-else>
			购物车竟然是空的！
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartList:[],
				toDelete:[],
				toBuy:[],
				totalCount:0,
				checkedAll:false,
				count:0,
				manage:false
			};
		},
		onLoad() {
			uni.showLoading({
				title: '数据加载中...',
			});
			uni.request({
				url:this.server.cartCheck(),
				withCredentials:true,
				success: (res) => {
					
					this.cartList = res.data.map((course)=>{
						course.checked=false
						return course
					})
					uni.hideLoading()
				}
			})
			
		},
		methods:{
			onClickCourse(cid){
				uni.navigateTo({
					url:'/pages/courseDetail/courseDetail?cid='+cid
				})
			},
			
			onClickCheckbox(index){
				
				index =parseInt(index)
				this.cartList[index].checked = !this.cartList[index].checked
				if(this.cartList[index].checked){
					this.totalCount += this.cartList[index].price *this.cartList[index].count
					this.count += this.cartList[index].count
				}else{
					this.totalCount -= this.cartList[index].price *this.cartList[index].count
					this.count -= this.cartList[index].count
				}
				
			},
			
			onCheckedAll(){
				this.checkedAll = !this.checkedAll
				this.cartList.forEach((course)=>{
					course.checked = this.checkedAll
					if(this.checkedAll){
						this.totalCount += course.price*course.count
						this.count += course.count
					}else{
						this.totalCount=0
						this.count = 0
					}
				})
				
			},
			
			onManage(){
				this.manage = !this.manage
				
			},
			
			onDeleteGoods(){
				if(this.count===0){
					uni.showToast({
						title: '您还未选中要删除的物品！',
						icon:"none"
					});
				}else{
					uni.showModal({
						title: '提示',
						content: '确定要删除这'+this.count +'件物品吗？',
						cancelText: '我再想想',
						confirmText: '删除',
						success: res => {
							if(res.confirm){
								this.cartList.forEach((course)=>{
									if(course.checked){
										this.toDelete.push(course.cid)
									}
								})
								uni.request({
									url:this.checkedAll?this.server.cartClear():this.server.cartDelete(),
									method:this.checkedAll?"GET":"POST",
									withCredentials:true,
									data:{
										courseId:this.toDelete
									},
									success: (res) => {
										if(res.data.code===200){
											uni.showToast({
												title: '物品已从购物车移除！'
											});
											uni.redirectTo({
												url:'/pages/cart/cart',
											})
										}else{
											uni.showModal({
												title: '失败',
												content: res.data.msg,
												showCancel: false,
											});
										}
									}
								})
							}
						}
						
					});
				}
				
				
			},
		
			toOrder(){
				if(this.count>0){
					this.toBuy = []
					this.cartList.forEach((course)=>{
						if(course.checked){
							this.toBuy.push(course)
						}
					})
					getApp().globalData.order = this.toBuy
					uni.navigateTo({
						url: '/pages/order/order?count=' + this.count + '&totalCount=' +this.totalCount,
					});
				}else{
					uni.showToast({
						title: '您还未选择物品'
					});
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	.cart-list{
		margin-top: 80rpx;
		margin-bottom: 150rpx;
		.page-header{
			display: flex;
			padding: 20rpx;
			position: fixed;
			top: 0rpx;
			left:0rpx;
			right:0rpx;
			z-index: 10;
			background-color: $uni-text-color-inverse;
			.page-header-left{
				flex: 1;
				font-weight: bold;
				font-size: $uni-font-size-lg;
			}
			.page-header-right{
				color: $uni-text-color-grey;
			}
			
		}
		
		.course{
			display: flex; 
			.check{
				display: flex;
				align-items: center;
			}
			.course-header{
				.pic{
					width:200rpx;
				}
			
			}
			
			.course-body{
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
	
		.page-footer{
			position: fixed;
			bottom: 0rpx;
			left:0rpx;
			right:0rpx;
			display: flex;
			padding: 50rpx  30rpx;
			box-shadow: 0 0 2rpx;
			background-color: $uni-text-color-inverse;
			.page-footer-left{
				flex:1;
			}
			.page-footer-right{
				display:flex;
				.totalCount,.delete-goods{
					width: 150rpx;
					height: 50rpx;
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
				.delete-goods{
					background-color: #f00;
				}
			}
		}
	
		.empty{
			text-align: center;
			font-size: $uni-font-size-lg;
			// font-weight: bold;
			color: $uni-text-color-grey;
		}
	}
	
</style>
