<template>
	<scroll-view scroll-y class="album_scroll_view" @scrolltolower="handelToLower">
		<!-- 轮播图 开始 -->
		<view class="banner_swiper">
			<swiper 
			autoplay
			indicator-dots
			circular>
				<swiper-item
				v-for="item in banner"
				:key="item.id">
				<image :src="item.thumb"><image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图 结束 -->
		<!-- 列表 开始 -->
		<view class="album_list">
			<navigator class="album_item"
			v-for="item in album"
			:key="item.id"
			:url="`../album/album?id=${item.id}`">
			<view class="album_img">
				<image mode="aspectFill" :src="item.cover"></image>
			</view>
			<view class="album_info">
				<view class="album_name">{{item.name}}</view>
				<view class="album_desc">{{item.desc}}</view>
				<view class="album_btn">
					<view class="album_attention">+ 关注</view>
				</view>
			</view>
				
			</navigator>
		</view>
		<!-- 列表 结束 -->
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return{
				params:{
					limit:30,
					order:"new",
					skip:0
				},
				//轮播图数组
				banner:[],
				//专辑列表数组
				album:[],
				//是否还有数据
				hasmore:true
			}
		},
		mounted(){
			uni.setNavigationBarTitle({title:"专辑"})
			this.getList();
		},
		methods:{
			getList(){
				this.request({
					url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
					data:this.params
				})
				.then(result=>{
					// console.log(result);
					if(this.banner.length===0){
						this.banner=result.res.banner;
					}
					
					if(result.res.album.length===0){
						this.hasmore=false;
						uni.showToast({
							title:"no data",
							icon:"none"
						})
						return;
					}
					
					//数组拼接
					this.album=[...this.album,...result.res.album];
				})
			},

			//下拉加载
			handelToLower(){
				// console.log("11");
				if(this.hasmore){
					this.params.skip+=this.params.limit;
					this.getList();
				}else{
					uni.showToast({
						title:"no data",
						icon:"none"
					})
				}
			}
		}
		
	}
</script>

<style lang="scss" scoped>
//轮播图
.banner_swiper{
	swiper{
		height: calc(750rpx / 2.3 );
		image{
			height: 100%;
		}
	}
}
//专辑列表
.album_list{
	padding: 10rpx;
	.album_item{
		padding: 10rpx 0;
		display: flex;
		border-bottom:1px solid #ccc;
		.album_img{
			flex:1;
			padding: 10rpx;
			image{
				width: 200rpx;
				height: 200rpx;
			}
		}
				
		.album_info{
			flex:2;
			padding: 0 10rpx;
			
			// 解决容器被撑开
			overflow: hidden;
			.album_name{
				font-size: 30rpx;
				color: #000;
				padding: 10rpx 0;
			}
			.album_desc{
				padding: 10rpx 0;
				font-size: 24rpx;
				color: #000;
				//多出来的字点点点【...】
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.album_btn{
				padding: 10rpx;
				display: flex;
				justify-content: flex-end;
				.album_attention{
					color: $color;
					border: 1px solid #d52a71;
					padding: 10rpx;
				}
			}
				
		}
				
	}
			
}
//scroll-view
.album_scroll_view{
	height: calc(100vh - 42px);
}
	
			
</style>
