<template>
	<view>
		<template v-if="addressList[0]">
			<uni-list>
			 	<uni-list-item clickable v-for="(address,index) in addressList" :key="index" :title="address.address+address.detail" :note="address.reciveName+address.phone" thumb="/static/image/address.png" thumb-size="base" @click="onChoose(address)">
				</uni-list-item>
			</uni-list>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[
					{
						address:' 浙江省 杭州市 富阳区',
						detail:' 浙江传媒大学生活区',
						phone:' 13826602011',
						reciveName:' 大保健'
					},
					{
						address:'浙江省 杭州市 临安区',
						detail:'浙江工业大学生活区',
						phone:'15326602011',
						reciveName:'大侠李'
					},
					{
						address:'浙江省 杭州市 江干区',
						detail:'杭州电子科技大学大学生活区',
						phone:'15355008826',
						reciveName:'小熊猫'
					}
				]
			};
		},
		methods:{
			onChoose(address){
				uni.$emit('chooseAddress',{address:address})
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
