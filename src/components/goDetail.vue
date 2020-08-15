<template>
	<view @click="handelClick">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		//接收数据传递
		props:{
			list:Array,
			index:Number
		},
		methods:{
			handelClick(){
				//将数据缓存下来
				getApp().globalData.imgList=this.list;
				getApp().globalData.imgIndex=this.index;
				//实现页面跳转
				uni.navigateTo({
					url:"/pages/imgDetail/imgDetail"
				})
			}
		}
	}
</script>

<style>

</style>
