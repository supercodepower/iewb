<template>
	<view class="fav-list">
		<template v-if="favList[0]">
			<uni-list>
				<uni-list-item v-for="(favorite,index) in favList" :key="index" link :to= '"/pages/courseDetail/courseDetail?cid="+favorite.courseId '>
					<template v-slot:header >
						<view class="favorite-header">
							<image class="pic" :src="server.host + favorite.pic" mode="widthFix"></image>
						</view>
					</template>
						
					<template v-slot:body>
						<view class="favorite-body">
							<view class="title">
								{{favorite.title}}
							</view>
							<!-- <view class="price">
								{{favorite.price | currency}}
							</view> -->
							<view class="date">
								<view class="lable">
									收藏时间:
								</view>
								<uni-dateformat :date="parseInt(favorite.fTime)"  format="yyyy-MM-dd"/>
							</view>
						</view>	
					</template>
					
					
					<template v-slot:footer>
						<view class="favorite-footer">
							<view class="price">
								{{favorite.price | currency}}
							</view>
						</view>
					</template>
					
				</uni-list-item>
			</uni-list>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				favList:[]
			};
		},
		onLoad() {
			uni.showLoading({
				title: '数据加载中...',
			});
			uni.request({//请求收藏夹数据
				url:this.server.favoriteList(),
				withCredentials:true,
				success: (res) => {
					this.favList = res.data
					uni.hideLoading()
				}
				
			})
			
		}
	}
</script>

<style lang="scss">
	.fav-list{
		display: flex; 
		.favorite-header{
			
			.pic{
				width:200rpx;
			}
		}
		
		.favorite-body{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding-left: 50rpx;
			overflow:hidden;
			
			.title{
				font-size: $uni-font-size-lg;
				font-weight: bold;
				margin-bottom: $uni-spacing-row-base;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				
			}
			
			.date{
				// text-align: center;
				.lable{
					padding-bottom: 20rpx;
					font-weight: 500;
				}
			}
			
		}
		
		.favorite-footer{
		display: flex;
			align-items: center;
			.price{
				
			}
		}
	}
</style>
