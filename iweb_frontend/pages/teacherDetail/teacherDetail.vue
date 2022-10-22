<template>
	<view class="teacher-details">
		<template v-if="teacherDetails.tid">
			<view class="teacher-introduction">
				<view class="introduction-header">
						<image :src="server.host + teacherDetails.tpic" mode="widthFix"></image>
				</view>
				<view class="introduction-body">
					<view class="row">
						<view class="lable">讲师姓名:</view>
						<view >{{teacherDetails.tname}}</view>
					</view>
					<view class="row">
						<view class="lable">主讲课程:</view>
						<view >{{teacherDetails.mainCourse}}</view>
					</view>
					<view class="row">
						<view class="lable">授课风格:</view>
						<view >{{teacherDetails.style}}</view>
					</view>
				</view>
				
			</view>
			
			<view class="header">
				<view class="title">
					授课经验
				</view>
			</view>
			<view class="exprience">
				<rich-text :nodes="teacherDetails.experience"></rich-text>
			</view>
			<view class="header">
				<view class="title">
					讲师的课程
				</view>
			</view>
			<view class="course-list">
				<view class="course" v-for="(course,index) in teacherDetails.courseList " :key="index">
					<navigator :url="'/pages/courseDetail/courseDetail?cid=' + course.cid">
						<image :src="server.host + course.pic" mode="widthFix"></image>
					</navigator>
					<view class="course-title">{{course.title}}</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				teacherDetails:{}
			};
		},
		onLoad(options) {
			let tid = options.tid
			uni.request({
				url:this.server.teacherDetail(tid),
				withCredentials:true,
				success: (res) => {
					this.teacherDetails = res.data
				}
			})
		}
	}
</script>

<style lang="scss">
	.teacher-details{
		.teacher-introduction{
			display: flex;
			padding: 30rpx 20rpx;
			.introduction-header{
				image{
					width: 250rpx;
				}
			}
			.introduction-body{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 10rpx;
				overflow:hidden;
				
				.row{
					display: flex;
					flex-wrap: wrap;
					line-height: 1.6em;
					font-size: $uni-font-size-base;
					.lable{
						font-weight: 500;
						margin-right: 0.6em;
						margin-left: 0.6em;
						font-size: $uni-font-size-lg;
					}
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
				border-bottom: 1rpx solid $iweb-theme-color;
				transform: translateY(1rpx);
			}
		}
		
		.exprience{
			line-height: 1.5em;
			padding: 12rpx 20rpx;
		}
		
		.course-list{
			display: flex;
			flex-wrap: wrap;
			.course{
				width: 375rpx;
				padding: 6rpx;
				text-align: center;
				overflow: hidden;
				image{
					width: 100%;
				}
				
				.course-title{
					font-size: $uni-font-size-base;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}
			}
			
		}
	}
	
</style>
