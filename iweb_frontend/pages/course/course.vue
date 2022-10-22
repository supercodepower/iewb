<template>
	<view class="content">
		<!-- 顶部分段器 -->
		<view class="segmented-box">
			<uni-segmented-control :current="current" :values="typeList" @clickItem="onClickItem" activeColor="#00be56"></uni-segmented-control>
		</view>
		
		<!-- 显示课程列表 -->
		<uni-list>
			<uni-list-item class="course" v-for="(course,index) in courseList" :key="index" link :to= '"/pages/courseDetail/courseDetail?cid="+course.cid '>
				<template v-slot:header >
					<view class="course-header">
						<image class="pic" :src="server.host + course.pic" mode="widthFix"></image>
					</view>
					
				</template>
					
				<template v-slot:body>
					<view class="course-body">
						<view class="title">
							{{course.title}}
						</view>
						<view class="tName">
							讲师:{{course.tname}}
						</view>
						<view class="cLength">
							时长:{{course.cLength}}
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

		<!-- 是否有更多数据可供加载 -->
		<button type="default">{{hasmore?'正在努力加载中...':'没有更多的数据了'}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current:0,	//当前选中的课程类别
				typeList:['不限'],  //课程类别列表
				pageNum:0,	//当前加载的页面
				courseList:[],	//已经加载的所有课程
				hasmore:true	//是否还有更多数据可供加载
			};
		},
		onLoad() {
			// 异步请求课程列表数据
			uni.request({
				url:this.server.type(),
				withCredentials:true,
				success: (res) => {
					let type = res.data.map((t,i)=>{
						return t.tpName
					})
					this.typeList = this.typeList.concat(type)
				}
			}),
			this.loadCourse()
		},
		onReachBottom(){
			this.loadCourse()
		},
		methods:{
			onClickItem(e){
				if (this.current != e.currentIndex) {
				    this.current = e.currentIndex;
					//修改课程类别后 重置基础数据
					this.hasmore=true
					this.pageNum = 0
					this.courseList = []
					this.loadCourse()
					}
			},
			//1.加载更多课程：用于1.页面加载完成,2.页面滚动到底部,3.用户切换课程类别

			loadCourse(){
				//2.如果没有更多数据,直接退出
	
				if(!this.hasmore){
					return
				}
				//3.如果有更多数据,显示加载中提示框
		
				uni.showLoading({
					title:'正在加载中...',
					mask:true
				})
				//4.异步请求下一页数据
				this.pageNum++
				
				uni.request({
					url:this.server.courseList(this.pageNum,this.current),
					withCredentials:true,
					success:(res)=>{
						
						//5.拿到课程数据，追加到课程列表
					
						this.courseList = this.courseList.concat(res.data.courseList)
						console.log(this.courseList)
						//6.判断还有更多数据吗？当前页数大于总页数则没有更多数据了
		
						if(this.pageNum>=res.data.pageCount){
							this.hasmore = false
						}
						//7.隐藏加载中数据框
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.segmented-box{
		padding: 10rpx;
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
			.title{
				font-size: $uni-font-size-lg;
				font-weight: bold;
				margin-bottom: $uni-spacing-row-base;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				
			}
			.tName{				
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
	
</style>
