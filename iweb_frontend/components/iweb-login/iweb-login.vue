<template>
	<view>
		<uni-card title="用户登录">
			<input class="input" type="text" v-model="uname" placeholder="请输入用户邮箱">
			<input class="input" type="password" v-model="upwd" placeholder="请输入登录密码" >
			<button class="button" @click="onLogin">登录</button>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick">
					<view class="switchToRegister">
						没有账号？去注册
					</view>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"iweb-login",
		data() {
			return {

				uname:'',
				upwd:''
			};
		},
		methods:{
			actionsClick(){
				uni.$emit('changeShow')
			},
			onLogin(){
				uni.request({
					url:this.server.userLogin(),
					method:"POST",
					withCredentials:true,//此项为必需的否则会自动申请新的session，覆盖掉之前的session
					data:{
						uname:this.uname,
						upwd:this.upwd
					},
					success: (res) => {
						let body = res.data
						if(body.code===200){
							uni.showToast({
								title:'登录成功！',
								duration:500,
								
							})
							uni.setStorage({
								key: 'userInfo',
								data: body.userInfo,
								success: () => {
									this.$emit('loginComplete')
								}
							});
							// getApp().globalData.userInfo = body.userInfo
							
						}else{
							uni.showModal({
								title:'失败',
								content:'注册失败,错误原因:' + body.msg,
								showCancel:false,
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.input{
		padding: 30rpx 20rpx;
		margin-bottom: 20rpx;
		border: 1rpx solid $uni-border-color;
	}
	.button{
		margin:30rpx 0 10rpx ;
	}
	.switchToRegister{
		margin-bottom: 10rpx;
		text-align: right;
		color: $iweb-theme-color;
	}
</style>