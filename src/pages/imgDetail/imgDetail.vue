<template>
	<view>
		<!-- 用户信息 开始 -->
		<view class="user_info">
			<view class="user_icon">
				<image :src="imgDetail.user.avatar" mode="widthFix"></image>
			</view>
			<view class="user_desc">
				<view class="user_name">{{imgDetail.user.name}}</view>
				<view class="user_time">{{imgDetail.cnTime}}</view>
			</view>
		</view>
		<!-- 用户信息 结束-->
		<!-- 高清大图 开始 -->
		<view class="high_img">
			<swiper-action @swiperAction="handelSwiperAction">
				<image mode="aspectFill" :src="imgDetail.thumb"></image>
			</swiper-action>
			
		</view>
		<!-- 高清大图 结束 -->
		<!-- 点赞 开始 -->
		<view class="user_rank">
			<view class="rank">
				<text class="iconfont_dianzan">{{imgDetail.rank}}</text>
			</view>
			<view class="user_collect">
				<text class="iconfont_shoucang">收藏</text>
			</view>
		</view>
		<!-- 点赞 结束-->
		<!-- 专辑 开始 -->
		<view class="album_wrap">
			<!-- 标题 -->
			<view class="album_title">相关</view>
			<!-- 内容	 -->
			<view class="album_list">
				<view class="album_item"
				v-for="item in album"
				:key="item.id">
					<!-- 左边 -->
					<view class="album_cover">
						<image :src="item.cover"></image>
					</view>
					<!-- 右边 -->
					<view class="album_info">
						<view class="album_info_text">专辑</view>
						<view class="album_name">{{item.name}}</view>	
						<view class="iconfont"> > </view>
					</view>
				</view>
			</view>
		</view>
		<!-- 专辑 结束 -->	
		<!-- 下载 开始 -->
		<view class="download">
			<view class="download_btn" @click="handelDownload"> 下载图片</view>
			
		</view>
		<!-- 下载 结束 -->
		
	</view>
</template>

<script>
	import swiperAction from "@/components/swiperAction.vue";
	import moment from "moment";
	//设置语言为中文
	moment.locale("zh-cn");
	export default {
		components:{
			swiperAction
		},
		data(){
			return{
				//图片信息对象 包含用户对象
				imgDetail:{},
				//专辑数据 数组
				album:[],
				//最热评论
				hot:[],
				//最新评论
				comment:[],
				//图片索引
				imgIndex:0
			}
		},
		onLoad(){
			// console.log(getApp().globalData)
			const {imgIndex}=getApp().globalData;
			this.imgIndex=imgIndex;
			this.getData();
		},
		methods:{
			//给当前页面赋值得
			getData(){
				const {imgList}=getApp().globalData;
				this.imgDetail=imgList[this.imgIndex];
						
				// this.imgDetail.newThumb=this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360);
				//获取时间数据
				this.imgDetail.cnTime=moment(this.imgDetail.atime*1000).fromNow();
				//获取图片详情id
				// this.imgDetail.id
				this.getComments(this.imgDetail.id);
			},
			//获取热评
			getComments(id){
				this.request({
					url:`http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
				})
				.then(result=>{
					console.log(result);
					//进行赋值
					this.album=result.res.album;
					this.hot=result.res.hot;
					this.comment=result.res.comment;
				})
			},
			//滑动事件 翻页
			handelSwiperAction(e){
				// console.log(e);
				//左滑 imgIndex++ ； 右滑 imgIndex--
				//图片会没有 要判断索引是否越界
				const {imgList}=getApp().globalData;
				if(e.direction==="left" && this.imgIndex<imgList.length-1){
					this.imgIndex++;
					this.getData();
				}else if(e.direction==="right" && this.imgIndex>0){
					this.imgIndex--;
					this.getData();
				}else{
					uni.showToast({
						title:"no picture",
						icon:"none"
					})
				}
			},
			//点击下载图片
			async handelDownload(){
				// uni.downloadFile
				//uni.saveImgToPhotosAlbum
				
				//下载中提示
				await uni.showLoading({
					title:"下载中"
				})
				
				//下载到小程序内存当中 tempFilePath
				const result1=await uni.downloadFile({url:this.imgDetail.img});
				const {tempFilePath}=result1[1];
				
				//将小程序中得临时文件下载到本地
				
				const result2=await uni.saveImageToPhotosAlbum({filePath:tempFilePath});
				
				//提示下载成功
				// console.log('11');
				// uni.hideLoading();
				await uni.showToast({
					title:"下载成功"
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.user_info{
	padding: 20rpx;
	display: flex;
	.user_icon{
		padding: 20rpx 20rpx;
		image{
			width:88rpx;
			border-radius: 50%;
		}
	}
		
	.user_desc{
		padding: 20rpx;
		.user_name{
			color: #000;
			font-weight: 600;
		}
		.user_time{
			color: #ccc;
			padding: 10rpx 0;
			font-size: 24rpx;
		}
	}
}
.high_img{
	image{
		border: 3rpx solid #ccc;
	}
}
.user_rank{
	display: flex;
	height: 80rpx;
	border-bottom: 5rpx solid #eee;
	.rank{
		flex: 1;
		display: flex;
		//水平居中
		justify-content: center;
		//垂直居中
		align-items: center;
		.iconfont_dianzan{
			
		}
	}	
	.user_collect{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.iconfont_shoucang{
			
		}
	}
}
.album_wrap{
	padding: 20rpx;
	.album_title{
		padding: 10rpx 0;
	}
	.album_list{
		.album_item{
			display: flex;
			display: 10rpx 0;
			.album_cover{
				flex: 1;
				image{
					width: 100rpx;
					height: 100rpx;
				}
			}
			.album_info{
				position: relative;
				flex: 3;
				padding: 0 20rpx;
				.album_info_text{
					width: 100rpx;
					height: 50rpx;
					color: #fff;
					background-color: $color;
					display: flex;
					justify-content: center;
					align-items: center;
				}
				.album_name{
					color: #888;
					padding: 10rpx 0;
				}
				.iconfont{
					font-size: 40rpx;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					right: 10%;
					color: #000;
				}
			}
		}
	}
}
//图片下载
.download{
	display: flex;
	height: 120rpx;
	align-items: center;
	justify-content: center;
	.download_btn{
		color: #fff;
		background-color: $color;
		font-weight: 600;
		font-size: 50rpx;
		width: 90%;
		height: 80%;
		display: flex;
		align-items: center;
		justify-content: center;
	}	
}
</style>
