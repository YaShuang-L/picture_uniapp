<template>
	
	<scroll-view @scrolltolower="scrollToLower" scroll-y class="recommend_scroll" v-if="recommends.length>0">
	    <!-- 推荐开始 -->
		<view class="recommend_warp">
			<navigator class="recommend_item"
			v-for="item in recommends" 
			:key="item.id"
			:url="`../album/album?id=${item.target}`">
			 <!-- mode="widthFix" 无效 -->
				<image :src="item.thumb" mode="widthFix"></image>
			</navigator>
		</view>
		<!-- 推荐结束 -->
		<!-- 月份开始 -->
		<view class="month_wrap">
			<view class="month_title">
				<view class="month_title_info">
					<view class="month_info">
						<text>{{monthes.DD}}/ </text>
						{{monthes.MM}} 月
					</view>
					<view class="month_text">{{monthes.title}} </view>
				</view>
				<view class="month_title_more">更多 > </view>
			</view>
			<view class="month_content">
				<view class="month_item"
				v-for="(item,index) in monthes.items"
				:key="item.id">
				<go-detail :list="monthes.items" :index="index">
				<image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="aspectFill"></image>	
				</go-detail>
				</view>
			</view>
		</view>
		<!-- 月份结束 -->
		<!-- 热门开始 -->
		<view class="hot_wrap">
			<view class="hot_title">
				<text>热门</text>
			</view>
			<view class="hot_content">
				<view class="hot_item"
				v-for="(item,index) in hots"
				:key="item.id">
				<go-detail :list="hots" :index="index">
					<image :src="item.thumb" mode="widthFix"></image>
				</go-detail>
				
				</view>
			</view>
		</view>
		<!-- 热门结束 -->
	</scroll-view>
</template>

<script>
	import moment from "moment";
	import goDetail from "@/components/goDetail.vue";
	// https://www.showdoc.cc/414855720281749?page_id=3678621017219602
	export default {
		components:{
			goDetail
		},
		data(){
			return{
				recommends:[],
				monthes:{},
				hots:[],
				params:{
					limit:30,
					order:"hot",
					skip:0
				},
				//是否还有下一页
				hasMore:true
			}
		},
		mounted(){
			uni.setNavigationBarTitle({title:"首页"})
			this.getList();
		},
		methods:{
			//获取数据
			getList(){
				this.request({
					url:"http://157.122.54.189:9088/image/v3/homepage/vertical",
					data:this.params
				})
				.then(result=>{
					// console.log(result);
					//判断数据是否还有下一页
					if(result.res.vertical.length===0){
						this.hasMore=false;
						uni.showToast({
							title:"no data",
							icon:"none"
						})
						return;
					}
				    if(this.recommends.length===0){
						this.recommends=result.res.homepage[1].items;
						//月份模块
						this.monthes=result.res.homepage[2];
						//将时间戳 改为 18号/月 moment.js
						this.monthes.MM=moment(this.monthes.stime).format("MM");
						this.monthes.DD=moment(this.monthes.stime).format("DD");
						// console.log(this.monthes);
					}
					
					
					//获取热门数据列表
					//es6的数组拼接
					this.hots=[...this.hots,...result.res.vertical];
					
				})
			},
			//滚动条触底事件
			scrollToLower(){
				// console.log('11');
				if(this.hasMore){
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
.recommend_scroll{
	//height：屏幕的高度-头部标题的高度 calc里面要加空格
	height: calc( 100vh - 42px);
}
// 推荐
.recommend_warp{
	//弹性盒子
	display: flex;
	//换行
	flex-wrap: wrap;
	.recommend_item{
		width:50% ;
		border: 3px solid #fff;
		// image{
			
		// }
	}
}
// 月份
.month_wrap{
	.month_title{
		display: flex;
		//分为两块
		justify-content: space-between;
		padding: 20rpx;
		.month_title_info{
			color: $color;
			font-size: 30rpx;
			font-weight: 600;
			display: flex;
			.month_info{
				text{
					font-size: 36rpx;
				}
			}	
			.month_text{
				font-size: 34rpx;
				color: #000000;
				margin-left: 30rpx;
			}
		}
					
		.month_title_more{
			font-size: 24rpx;
			color: $color;
		}
	}
		
    .month_content{
		display: flex;
		flex-wrap: wrap;
		.month_item{
			width: 33.33%;
			border: 5rpx solid #fff;
		}
	}
}

// 热门
.hot_wrap{
	.hot_title{
		padding: 20rpx;
		text{
			 border-left: 5rpx solid #d52a71;
			 padding-left: 20rpx;
			 font-size: 34rpx;
			 font-weight: 600;
		}
	}
	.hot_content{
		display: flex;
		flex-wrap: wrap;
		.hot_item{
			width: 33.33%;
			border: 5rpx solid #fff;
		} 
	}
}
	
</style>
