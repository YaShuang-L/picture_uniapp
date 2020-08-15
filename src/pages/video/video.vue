<template>
	<view>
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="title_inner">
					<uni-segmented-control
					:current="current" 
					:values="items.map(v=>v.title)" 
					@clickItem="onClickItem" 
					style-type="text" 
					active-color="#d4237a"></uni-segmented-control>
				</view>
				<view class="iconsearch"></view>
			</view>
		    <view class="home_tab_content">
				<view v-if="current<4" :urlobj="{url:items[current].url,params:items[current].params}">
						<video-mian></video-mian>
				</view>
		       <view v-if="current===4">
					<video-category></video-category>
		       </view>
		    </view>
		</view>
		</view>
	</view>
</template>

<script>
	import {uniSegmentedControl} from "@dcloudio/uni-ui";
	import videoCategory from "./video-category/video-category.vue";
	import videoMian from "./video-mian/video-mian.vue"
	export default {
		components: {
			uniSegmentedControl,
			videoCategory,
			videoMian
		},
		data() {
			return {
				items: [
					{
						title:"推荐",
						url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",
						params:{
							limit:30,
							skip:0,
							order:"hot"
						}
					},
					{
						title:"娱乐",
						url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
						params:{
							limit:30,
							skip:0,
							order:"new"
						}
					},
					{
						title:"最新",
						url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params:{
							limit:30,
							skip:0,
							order:"new"
						}
					},
					{
						title:"热门",
						url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params:{
							limit:30,
							skip:0,
							order:"hot"
						}
					},
					{
						title:"分类",
						url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",
						params:{}
					}
					
				],
				current: 0
			}
		},
		
		methods: {
			onClickItem(e) {
			    if (this.current !== e.currentIndex) {
			        this.current = e.currentIndex;
			    }
			}
		}
	}
</script>

<style lang="scss">
.home_tab{
	.home_tab_title{
		position: relative;
		.title_inner{
			width: 60%;
			margin: 0 auto;
		}
		.iconsearch{
			position: absolute;
			// display: block;
			top: 50%;
			transform: translateY(-50%);
			right: 5%;
		}
	}
	.home_tab_content{
		
	}
}
</style>
