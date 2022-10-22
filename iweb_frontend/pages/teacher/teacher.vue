<template>
	<view class="teacher-list">
		<template v-if="teacherList[0]">
			<uni-list>
				<uni-list-item class="teacher" v-for="(teacher,index) in teacherList" :key="index" link :to= '"/pages/teacherDetail/teacherDetail?tid="+teacher.tid '>
					<template v-slot:header >
						<view class="teacher-header">
							<image class="pic" :src="server.host + teacher.tpic" mode="widthFix"></image>
						</view>
					</template>
						
					<template v-slot:body>
						<view class="teacher-body">
							<view class="row">
								<view class="lable">讲师姓名:</view>
								<view class="tname">{{teacher.tname}}</view>
							</view>
							<view class="row">
								<view class="lable">主讲课程:</view>
								<view class="main-course">{{teacher.mainCourse}}</view>
							</view>
							<view class="row">
								<view class="lable">授课风格:</view>
								<view class="style">{{teacher.style}}</view>
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
				teacherList:[]
			};
		},
		onLoad() {
			uni.showLoading({
				title:'数据加载中...'
				
			})
			uni.request({
				url:this.server.teacherList(),
				withCredentials:true ,
				success: (res) => {
					this.teacherList = res.data
					uni.hideLoading()
				}
			})
		}
	}
</script>

<style lang="scss">
	.teacher{
		display: flex; 
		.teacher-header{
			.pic{
				width:200rpx;
			}
		}
		
		.teacher-body{
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
</style>
