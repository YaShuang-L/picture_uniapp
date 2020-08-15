<template>
	<view
	@touchstart="handeltouchstart"
	@touchend="handeltouchend"
	>
		<slot></slot>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				//按下时间
				startTime:0,
				//按下坐标
				startX:0,
				startY:0
			}
		},
		methods: {
			handeltouchstart(event){
				// console.log("111");
				// console.log('按下'+event.changedTouches[0].clientX);
				// console.log('按下'+event.changedTouches[0].clientY);
				this.startTime=Date.now();
				this.startX=event.changedTouches[0].clientX;
				this.startY=event.changedTouches[0].clientY;
			},
			handeltouchend(event){
				// console.log("222");
				// console.log('弹起'+event.changedTouches[0].clientX);
				// console.log('弹起'+event.changedTouches[0].clientY);
				const endTime=Date.now();
				const endX=event.changedTouches[0].clientX;
				const endY=event.changedTouches[0].clientY;
				
				//判断按下时长 大于2秒=2000毫秒
				if(endTime-this.startTime>2000){
					return;
				}
				
				
				//滑动方向
				let direction="";
				
				//判断用户滚动距离是否合法 合法：判断滑动方向 注意距离要加上绝对值
				if(Math.abs(endX-this.startX)>10 && Math.abs(endY-this.startY<10)){
					//判断滑动方向
					direction=endX-this.startX>0? "right" : "left";
				}else{
					return;
				}
				
				//用户做了合法得操作
				// console.log(direction);
				//子组件向父组件传递
				this.$emit("swiperAction",{direction});
			}
			
		}
	}
</script>

<style>

</style>
