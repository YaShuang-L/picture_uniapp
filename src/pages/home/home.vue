<meta charset="utf-8"  />
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
		        <view v-if="current === 0">
		            <homeRecommend></homeRecommend>
		        </view>
		        <view v-if="current === 1">
		            <homeCategory></homeCategory>
		        </view>
		        <view v-if="current === 2">
		            <homeNew></homeNew>
		        </view>
				<view v-if="current === 3">
					<homeAlbum></homeAlbum>
			    </view>
		    </view>
		</view>
		</view>
	</view>
</template>

<script>
	import homeAlbum from "./home-album/home-album.vue";
	import homeCategory from "./home-category/home-category.vue";
	import homeNew from "./home-new/home-new.vue";
	import homeRecommend from "./home-recommend/home-recommend.vue";
	import {uniSegmentedControl} from "@dcloudio/uni-ui";
	export default {
		data() {
			return {
				items: [
					{
						title:"首页"
					},
					{
						title:"推荐"
					},
					{
						title:"最新"
					},
					{
						title:"专辑"
					}
				],
				current: 0
			}
		},
		components: {
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend,
			uniSegmentedControl
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
