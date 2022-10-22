<template><!-- 模板的根元素有且只能有一个 -->
	<view class="content">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(c,i) in carouselList" :key="i">
				<navigator :url="'/pages/courseDetail/courseDetail?cid= ' + c.cid">
					<image :src="server.host + c.picUrl"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 最新课程 -->
		<view class="header">
			<view class="title">最新课程</view>
			<navigator open-type="switchTab" hover-class="link-active" class="link" url="/pages/course/course" >更多</navigator>
		</view>
		
		<view class="course-list">
			<view class="course" v-for="(course,index) in courseNewest " :key="index">
				<navigator :url="'/pages/courseDetail/courseDetail?cid= ' + course.cid">
					<image :src="server.host + course.pic" mode="widthFix"></image>
				</navigator>
				<view class="title">{{course.title}}</view>
				<view class="teacher">讲师:{{course.tname}}</view>
				<view class="price">{{course.price | currency}}</view>
			</view>
		</view>
		<!-- 最热课程 -->
		<view class="header">
			<view class="title">最热课程</view>
			<navigator open-type="switchTab" hover-class="link-active" class="link" url="/pages/course/course" >更多</navigator>
		</view>
		
		<view class="course-list">
				<view class="course" v-for="(course,index) in courseHottest " :key="index">
					<navigator :url="'/pages/courseDetail/courseDetail?cid= ' + course.cid">
						<image :src="server.host + course.pic" mode="widthFix"></image>
					</navigator>
					<view class="title">{{course.title}}</view>
					<view class="teacher">讲师:{{course.tname}}</view>
					<view class="price">{{course.price | currency}}</view>
				</view>
		</view>
		<!-- 名师堂 -->
		<view class="header">
			<view class="title">名师堂</view>
			<navigator open-type="switchTab" hover-class="link-active" class="link" url="/pages/teacher/teacher" >更多</navigator>
		</view>
		<scroll-view class="teacher-list" scroll-x="true" >
			<view class="teacher" v-for="(teacher,index) in teacherList" :key="index">
				<navigator :url="'/pages/teacherDetail/teacherDetail?tid= ' + teacher.tid">
					<image :src="server.host + teacher.tpic" mode="widthFix"></image>
				</navigator>
				<view class="tname">讲师:{{teacher.tname}}</view>
				<view class="mainsourse">
					主讲课程:{{teacher.mainCourse}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList:[],	//轮播广告列表
				courseHottest:[],	//最热课程列表
				courseNewest:[],	//最新课程列表
				teacherList:[]		//讲师列表
			}
		},
		onLoad() {
			//异步请求轮播广告数据
			uni.request({
				url:this.server.carousel(),
				success:(res)=> {
					console.log(res.data)
					this.carouselList = res.data
					
				},
				fail: (err) => {
					uni.showToast({
						title:'请求失败，请稍后重试！',
						icon:"none"
					})
				}
				
			}),
			
			//异步请求最热课程数据
			uni.request({
				url:this.server.courseHottest(),
				success: (res) => {
					this.courseHottest = res.data
				}
			})
			//异步请求最新课程数据
			uni.request({
				url:this.server.courseNewest(),
				success: (res) => {
					console.log(res.data)
					this.courseNewest = res.data
				}
			})
			//异步请求讲师列表数据
			uni.request({
				url:this.server.teacherList(),
				success: (res) => {
					this.teacherList = res.data
				}
			})

		},
		methods: {

		}
	}
</script>

<style lang="scss">
	$swiper-height: 300rpx;
	$swiper-width: 750rpx;
	.swiper{
		width: $swiper-width;
		height: $swiper-height;
		
		navigator{
			height:$swiper-height;
			
			image{
				width: $swiper-width;
				height: $swiper-height;
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
		
		.link{
			flex: 1;
			text-align: right;
			padding: 15rpx 30rpx ;
			font-size: $uni-font-size-sm;
			color: $uni-text-color-grey;
		}
		
		.link-active{
			color: $iweb-theme-reverse;
			background-color: transparent;
		}
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
			
			.title{
				font-size: $uni-font-size-base;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			.teacher{
				font-size: $uni-font-size-sm;
				color:$uni-text-color-grey;
			}
			.price{
				font-size: $uni-font-size-lg;
			}
		}
	}
	
	.teacher-list{
		white-space: nowrap;
		
		.teacher{
			display: inline-block;
			width: 300rpx;
			text-align: center;
			padding: 8rpx 8rpx 40rpx;
			image{
				width:100%;
			}
			.tname{
				font-size: $uni-font-size-base;
			}
			.mainsourse{
				font-size: $uni-font-size-sm;
				color:$uni-text-color-grey
				
			}
		}
		
	}
</style>
