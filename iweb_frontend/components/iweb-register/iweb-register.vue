<template>
	<view>
		<uni-card title="用户注册">
			<!-- 此处在失去焦点时应该有客户端验证 -->
			<input class="input" type="text"  v-model="uname" placeholder="请输入用户邮箱">
			<input class="input" type="password"  v-model="upwd" placeholder="6-12位密码,包含字母和数字" >
			<input class="input" type="password"  v-model="reupwd" placeholder="请再次确认密码" >
			<input class="input" type="number"  v-model="phone" placeholder="请输入电话号码">
			<view class="captcha">
				<input class="captcha-input" type="text"  v-model="captcha" placeholder="请输入验证码">
				<image :src="server.captchaRegister() + '?' + rand" mode="widthFix" @click="rand = Math.random()"></image>
			</view>
			
			<button class="button" @click="onRegister">注册</button>
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="actionsClick">
					<view class="switchToLogin">
						已有账号？去登录
					</view>
				</view>
			</view>
		</uni-card>
	</view>
</template>

<script>
	export default {
		name:"iweb-register",
		data() {
			return {
				rand:0,
				uname:'',
				upwd:'',
				reupwd:'',
				phone:'',
				captcha:''
			};
		},
		methods:{
			actionsClick(){
				uni.$emit('changeShow')
			},
			onRegister(){
				let data = {
					uname:this.uname,
					upwd:this.upwd,
					reupwd:this.reupwd,
					phone:this.phone,
					captcha:this.captcha
				}
				uni.request({
					method:"POST",
					url:this.server.userRegister(),
					data:data,
					withCredentials:true,
					
					success: (res)=> {
						this.rand = Math.random()
						
						let body=res.data
						if(body.code===200){
							uni.showModal({
								title:'成功',
								content:'注册成功,点击"确定"跳转到登录页面!',
								success: (result) => {
									if(result.confirm){
										uni.$emit('changeShow')
									}
								}
							})
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
	
	.captcha{
		display: flex;
		margin-bottom: 30rpx;
		.captcha-input{
			width: 200rpx;
			padding: 30rpx 20rpx;
			border: 1rpx solid $uni-border-color;
		}
		image{
			width: 250rpx;
			margin: 15rpx 30rpx 0rpx 100rpx;
		}
	}
	.button{
		margin:30rpx 0 10rpx ;
	}
	.switchToLogin{
		margin-bottom: 10rpx;
		text-align: right;
		color: $iweb-theme-color;
		} 	
</style>