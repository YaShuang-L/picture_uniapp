<template>
	<view class="home_category">
		<navigator class="cate_item"
		v-for="item in category"
		:key="item.id"
		:url="`../imgCategory/imgCategory?${item.id}`"
		>
			<image mode="aspectFill" :src="item.cover"></image>
			<view class="cate_name">{{item.name}}</view>
		</navigator>
		
	</view>
</template>

<script>
	export default {
		data(){
			return{
				category:[]
			}
		},
		mounted(){
			uni.setNavigationBarTitle({title:"分类"});
			this.getList();
		},
		methods:{
			getList(){
				this.request({
					url:"http://157.122.54.189:9088/image/v1/vertical/category"
				})
				.then(result=>{
					// console.log(result);
					this.category=result.res.category;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.home_category{
	display: flex;
	flex-wrap: wrap;
	.cate_item{
		position: relative;
		border: 5rpx solid #fff;
		width: 33.33%;
		image{
			height: 240rpx;
		}
		.cate_name{
			position: absolute;
			width: 100%;
			height: 40rpx;
			left: 10rpx;
			bottom: 0;
			color: #fff;
			font-size: 40rpx;
			//css3 渐变
			background-image: linear-gradient(to right top,rgba(0,0,0,.2),rgba(0,0,0,0));
			display: flex;
			align-items: center;
		}	
	}
	
}
	
	
</style>
