<template>
	<view class="user">
		<template v-if="user.uid">
				<image class="avatar" :src="server.host + user.avatar" mode="scaleToFill"></image>
		</template>
		<!-- 功能菜单，折叠组件 -->
		<uni-collapse accordion="">
			<uni-collapse-item title="我的信息" open="">
				<view class="pane">
					<view class="row">
						<view class="lable">用户:</view>
						<view>{{user.uname}}</view>
					</view>
					<view class="row">
						<view class="lable">昵称:</view>
						<view>{{user.nickName}}</view>
					</view>
					<view class="row">
						<view class="lable">电话:</view>
						<view>{{user.phone | phoneMask}}</view>
					</view>
					<view class="row">
						<view class="lable">性别:</view>
						<view>{{user.sex}}</view>
					</view>
					<view class="row">
						<view class="lable">年龄:</view>
						<view>{{user.age}}</view>
					</view>
					<view class="row">
						<view class="lable">学历:</view>
						<view>{{user.edu}}</view>
					</view>
					<view class="row">
						<view class="lable">职业:</view>
						<view>{{user.job}}</view>
					</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="修改密码">
				<view class="pane">
					<input class="pswd" type="password" placeholder="原密码" @blur="getOldPassword">
					<input class="pswd" type="password" placeholder="新密码" @blur="getNewPassword">
					<input class="pswd" type="password" placeholder="再次输入新密码" @blur="getNewPasswordAgain">
					<button class="changePwsd" @click="changePassword">确认修改</button>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="修改头像">
				<view class="pane">
					<button @click="uploadAvatar" class="uploadAvatar">上传头像</button>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="我的订单">
				<view class="pane">
					暂不支持订单查询功能
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="我的收藏">
				<view class="pane">
					<view class="course-list">
						<view class="course" v-for="(course,index) in favoriteList " :key="index">
							<navigator :url="'/pages/courseDetail/courseDetail?cid= ' + course.cid">
								<image :src="server.host + course.pic" mode="widthFix"></image>
							</navigator>
							<view class="title">{{course.title}}</view>
							<view class="price">{{course.price | currency}}</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		name:"iweb-user-info",
		data() {
			return {
				user:{},
				favoriteList:[],
				oldPassword:'',
				newPassword:'',
				reNewPassword:''
			};
		},
		// onLoad() { 自定义组件中没有onload
			
		// }
		mounted() {
			uni.showLoading({
				title:'数据加载中...'
			})
			
			uni.$on('updateFavorite',()=>{
				uni.request({
					url:this.server.favoriteList(),
					withCredentials:true,
					success: (res) => {
						this.favoriteList = res.data
					}
				})
			})
			
			//异步请求用户的登录信息，需携带身份认证
			uni.request({
				url:this.server.userDetails(),
				withCredentials:true,
				success: (res) => {
					this.user = res.data
					uni.request({
						url:this.server.favoriteList(),
						withCredentials:true,
						success: (res) => {
							this.favoriteList = res.data
							uni.hideLoading()
						}
					})
				}
			})
		},
		methods:{
			uploadAvatar(){
				uni.chooseImage({
					count:1,
					success: (result) => {
						let filePath = result.tempFilePaths[0]
						uni.uploadFile({
							//uni.uploadFile()不会自动把响应消息中JSON对象解析成js对象
							url:this.server.userUploadAvatar(),
							filePath:filePath,
							name:'avatar',
							success: (res) => {
								
								let body  = JSON.parse(res.data)
								let fileName = body.fileName
								uni.request({
									url:this.server.userUpdateAvatar(),
									method:"POST",
									data:{
										fileName:fileName
									},
									withCredentials:true,
									success: () => {
										uni.showToast({
											title:'头像上传成功！'
										})
										uni.reLaunch({
											url:'/pages/userCenter/userCenter'
										})
									}
								})
							}
						})
					}
				})
			},
		
			getOldPassword(e){
				this.oldPassword = e.detail.value
			},
		
			getNewPassword(e){
				this.newPassword = e.detail.value
			},
			
			getNewPasswordAgain(e){
				this.reNewPassword = e.detail.value
			},
		
			changePassword(){
				if(this.user.upwd==this.oldPassword&&this.newPassword==this.reNewPassword){
					uni.request({
						url:this.server.changeUserPassword(),
						method:"POST",
						withCredentials:true,
						data:{
							newPassword:this.newPassword
						},
						success: (res) => {
							if(res.data.code===200){
								uni.showModal({
									title: '提示',
									content: '密码修改成功，请重新登录',
									showCancel: false,
									confirmText: '重新登录',
									success: res => {
										this.$emit('passwordChanged')
									}
								});
							}else{
								uni.showModal({
									title: '失败',
									content: '原因:'+res.data.msg,
									showCancel: false,
									})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.avatar{
		width: 140rpx;
		height: 140rpx;
		display: block;
		margin: 20rpx auto;
		box-shadow: 0 0 8rpx #888;
		border-radius: 50%;
	}
	
	.pane{
		background-color: #efefef;
		padding: 20rpx 20rpx 40rpx;
		.pswd,.uploadAvatar,.row,.changePwsd{
			background-color: #fff;
			padding: 15rpx 12rpx;
			margin-bottom: 10rpx;
			box-shadow:0 0 8rpx #888 ;
			border-radius: 20rpx;
		}
		
		.changePwsd{
			width: 200rpx;
			background-color: #eee;
			margin: 30rpx auto 0;
		}
		
		.row{
			display: flex;
			line-height: 1.6em;

			.lable{
				font-weight: bold;
				margin-left: 1em;
				margin-right: 1em;
			}
		}
		
		.course-list{
			display: flex;
			flex-wrap: wrap;
			
			.course{
				width: 350rpx;
				padding: 10rpx;
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
	}
</style>