<template>
	<view class="school-details">
		<template v-if="schoolDetails.school">
			<view class="introduction">
				<view class="row">
					<view class="lable">
						校区名称:
					</view>
					<view>{{schoolDetails.school.sname}}</view>
				</view>
				<view class="row">
					<view class="lable address">
						校区地址:
					</view>
					<!-- {{schoolDetails.school.address}} -->
					<view class="address">{{schoolDetails.school.address}}</view>
				</view>
				<view class="row">
					<view class="lable">
						联系电话:
					</view>
					<view>{{schoolDetails.school.phone}}</view>
				</view>
				<view class="row">
					<view class="lable">
						邮编地址:
					</view>
					<view>{{schoolDetails.school.postcode}}</view>
				</view>
			</view>
			
			<view class="header">
				<view class="title">校区开设课程</view>
			</view>
			<uni-list>
				<uni-list-item class="course" v-for="(course,index) in schoolDetails.courseList" :key="index" link :to= '"/pages/courseDetail/courseDetail?cid="+course.cid '>
					<template v-slot:header >
						<view class="course-header">
							<image class="pic" :src="server.host + course.pic" mode="widthFix"></image>
						</view>
						
					</template>
					
					<template v-slot:body>
						<view class="course-body">
							<view class="course-title">
								{{course.title}}
							</view>
							<view class="cLength">
								时长:{{course.cLength}}
							</view>
							<view class="startTime">
								开课时间:{{course.startTime}}
							</view>
						</view>	
					</template>
					
					<template v-slot:footer>
						<view class="course-footer">
							<view class="price">
								{{course.price | currency}}
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
				schoolDetails:{}
			};
		},
		onLoad(options) {
			let sid = options.sid
			
			uni.showLoading({
				title: '数据加载中...',
			});
			uni.request({
				url:this.server.schoolDetails(sid),
				withCredentials:true,
				success: (res) => {
					this.schoolDetails = res.data
					console.log(res.data)
					uni.hideLoading()
				}
			})
		}
		
	}
</script>

<style lang="scss">
	.school-details{
		.introduction{
			padding: 30rpx 20rpx;
			.row{
				display: flex;
				flex-wrap: wrap;
				line-height: 1.8em;
				background-color: $uni-bg-color-grey;
				.lable{
					font-weight: bold;
					margin-right: 0.6em;
					font-size: $uni-font-size-lg;
				}
				.address{
					display: contents;
				}
			}
		}
		
		.header{
			display: flex;
			margin: 30rpx 0rpx 20rpx;
			border-bottom: 1rpx solid $uni-border-color;
			.title{
				font-size: $uni-font-size-title;
				padding: 10rpx 35rpx;
				font-weight: bold;
				border-bottom: 1rpx solid $iweb-theme-color;
				transform: translateY(1rpx);
			}
		}
		
		.course{
			display: flex; 
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
				.course-title{
					font-size: $uni-font-size-lg;
					font-weight: bold;
					margin-bottom: $uni-spacing-row-base;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					
				}
				.startTime{				
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
				}
				.cLength{
					font-size: $uni-font-size-base;
					color: $uni-text-color-grey;
				}
			}
			.course-footer{
				display: flex;
				align-items: center;
				.price{
					
				}
			}
		}
	}
	
	
</style>
