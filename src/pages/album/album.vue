<template>
	<view>
		<!-- 专辑背景 开始 -->
		<view class="album_bg">
			<image mode="widthFix" :src="album.cover"></image>
			<view class="album_info">
				<view class="album_name">{{album.name}}</view>
				<view class="album_btn">关注专辑</view>
			</view>
		</view>
		<!-- 专辑背景 结束-->
		<!-- 专辑作者 开始 -->
		<view class="album_author">
			<view class="album_author_info">
				<image mode="widthFix" :src="album.user.avatar"></image>
				<view class="author_name">{{album.user.name}}</view>
			</view>
			<view class="album_author_desc">
				<!-- 识别特殊符号 -->
				<text>{{album.desc}}</text>
			</view>
		</view>
		<!-- 专辑作者 结束 -->
		<!-- 列表 开始 -->
		<view class="album_list">
			<view class="album_item"
			v-for="(item,index) in wallpaper"
			:key="item.id">
			<go-detail :list="wallpaper" :index="index">
				<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>
			</go-detail>
				
			</view>
			
		</view>
		<!-- 列表 结束 -->
	</view>
</template>

<script>
	import goDetail from "@/components/goDetail.vue"
	export default {
		components:{
			goDetail
		},
		data() {
			return {
					params:{
						limit:30,
						order:"new",
						skip:0,
						first:1
					},
					id:-1,
					album:{},
					wallpaper:[],
					//是否是最后一页
					hasmore:true
			}
		},
		onLoad(options){
			// console.log(options);
			this.id=options.id;
			// this.id="5e5cf679e7bce739db1281e4";
			this.getList();
		},
		//页面触底 (整个页面)
		onReachBottom(){
			console.log("11");
			if(this.hasmore){
			this.params.first=0;
				this.params.skip+=this.params.limit;
				this.getList();
			}else{
				uni.showToast({
					title:"no data",
					icon:"none"
				})
			}
		},
		methods: {
			getList(){
				this.request({
					url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data:this.params
				})
				.then(result=>{
					// console.log(result);
					// console.log(JSON.stringify(result.res.album.desc))
					if(Object.keys(this.album).length===0){
						this.album=result.res.album;
					}
					if(result.res.wallpaper===0){
						this.hasmore=false;
						uni.showToast({
							title:"no data",
							icon:"none"
						});
						return;
					}
					
					this.wallpaper=[...this.wallpaper,...result.res.wallpaper];
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.album_bg{
	position: relative;
	image{
		
	}
	.album_info{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		/* 文字放两边 */
		justify-content: space-between;
		height: 80rpx;
		align-items: center;
		color:#fff;
		padding: 0 15rpx;
		.album_name{
			font-size: 40rpx;
		}
		.album_btn{
			width: 152rpx;
			height: 60rpx;
			background-color: $color;
			display: flex;
			/* 文字居中 */
			justify-content:center;
			align-items: center;
			border-radius: 10rpx;
		}
	}

}
.album_author{
	padding: 10rpx;
	.album_author_info{
		display: flex;
		padding:10rpx 0;
		image {
			width: 50rpx;
		}
		.author_name{
			color: #000;
			// font-size: ;
			margin-left: 15rpx;
		}
	}		
	.album_author_desc{
		
	}
}
.album_list{
	display: flex;
	flex-wrap: wrap;
	.album_item{
		width: 33.33%;
		border: 3rpx solid #fff;
		image{
			height: 160rpx;
		}
	}
}
	
</style>
