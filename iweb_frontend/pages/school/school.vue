<template>
	<view>
		<template v-if="schoolList[0]">
			<uni-list>
			 	<uni-list-item v-for="(school,index) in schoolList" :key="index" :title="school.sname" :note="school.address" thumb="/static/image/school.png" thumb-size="base" link :to='"/pages/schoolDetail/schoolDetail?sid=" + school.sid'>
				</uni-list-item>
			</uni-list>
		</template>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				schoolList:[]
			}
		},
		methods: {
			
		},
		onLoad() {
			uni.showLoading({
				title: '数据加载中...',
			});
			uni.request({
				url:this.server.schoolList(),
				withCredentials:true,
				success: (res) => {
					this.schoolList = res.data
					uni.hideLoading()
				}
			})
		}
		
	}
</script>

<style lang="scss">

</style>
