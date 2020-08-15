//es6
export default(params)=>{
	//加载中
	uni.showLoading({
		title:"loading"
	})
	return new Promise((resolve,reject)=>{
		wx.request({
			...params,
			success(res){
				resolve(res.data);
			},
			fail(err){
				resolve(err);
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
}