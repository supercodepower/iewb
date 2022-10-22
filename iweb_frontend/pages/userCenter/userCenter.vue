<template>
	<view class="content">
		<!-- 如果用户尚未登录，则可以在登录和注册两个组件中切换 -->
		<template v-if="!alreadyLogin">
				<uni-transition :mode-class="['fade','slide-left']" :show="show">
					<iweb-login class="transition-box" :isShow='show' @loginComplete="alreadyLogin = true"></iweb-login>
				</uni-transition>
			
			<uni-transition :mode-class="['fade','slide-right']" :show="!show">
				<iweb-register class="transition-box" :isShow='show'></iweb-register>
			</uni-transition>
		<!-- 如果用户已经登录，则显示 用户的信息 和 退出登录 -->
		</template>
		<template v-else>
			<iweb-user-info @passwordChanged='passwordChanged'></iweb-user-info>
			<button class="logout" @click="logout">退出登录</button>
		</template>
		
	</view>
</template>

<script>
	import iwebLogin from '../../components/iweb-login/iweb-login.vue'
	import iwebRegister from "@/components/iweb-register/iweb-register.vue"
	import iwebUserInfo from "@/components/iweb-user-info/iweb-user-info.vue"
	export default {
		components: {
			iwebLogin,
			iwebRegister,
			iwebUserInfo
		
		},
		data() {
			return {
				show:true ,
				alreadyLogin:false
			};
		},
		onLoad() {
			uni.$on('changeShow',()=>{
			        this.show = !this.show
			    }),
			uni.getStorage({
				key: 'userInfo',
				success:  (res) =>{
					this.alreadyLogin = true
				}
			})
			
		},
		methods:{
			passwordChanged(){
				uni.removeStorage({
					key: 'userInfo',
					success: function (res) {
						uni.reLaunch({
							url:'/pages/userCenter/userCenter'
						})
					}
				});
			},
			logout(){
				uni.showModal({
					title:'退出登录',
					content:'确定退出登录吗？',
					success: (res) => {
						if(res.confirm){
							uni.removeStorage({
								key: 'userInfo',
								success: function (res) {
									uni.reLaunch({
										url:'/pages/userCenter/userCenter'
									})
								}
							});
						}
					}
				})
				
			}
		}
		
	}
</script>

<style lang="scss">
	.transition-box{
		position: absolute;
		width: 100%;
	}
	.logout{
		width: 450rpx;
		margin:20rpx auto ;
		background-color: #eee;
		padding: 15rpx 12rpx;
		margin-bottom: 10rpx;
		box-shadow:0 0 4rpx #888 ;
		border-radius: 20rpx;
	}
</style>
