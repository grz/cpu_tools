/*
 * 检查CPU消耗是否在一定时间内平均超过指定值
 * @param {number} busyRate4Check  0 ~ 1 的值，是检测的阀值，你要检查不超过10%的情况，这里就是0.1
 * @param {number} timeRange 持续检查的时间，秒为单位
 * @param {function} higherCallback 在持续时间内平均CPU消耗超出阀值的回调
 * @param {function} lowerCallback 在持续时间内平均CPU消耗低于阀值的回调
 * @param {element} el 将flash嵌入到指定位置来展示，dom节点
 * @param {string} flashUrl 要检测flash的URL
 */
function checkCPUBusyPercentage(busyRate4Check, timeRange, higherCallback, lowerCallback, el, flashUrl){
	//将flash展示
	if(el){
		var swf = QZONE.media.getFlashHtml({
			"src" : flashUrl,
			"width" : "100",
			"height" : "100",
			"allowScriptAccess" : "always",
			"wmode" : "transparent",
			"scale":'noScale'
		});
		var cnt = QZFL.dom.createElementIn("div", el, false);
		cnt.innerHTML = swf;
	}
	//监控cpu消耗
	var time = timeRange*1000;
	window.CPU_DEBUGGER_TURN_ON = true;
	setTimeout(function(){
//		var amout = QZONE.CPUMonitorAccessory.Stat.getOverPerAmount(0.1, 0, 5000);
		var arr = QZONE.CPUMonitorAccessory.Stat.dataArray;
		var sum = 0;
		for(var i=0; i<arr.length; i++){
			sum += arr[i];
		}
		var avg = sum / arr.length;
		window.CPU_DEBUGGER_TURN_ON = true;
		QZONE.CPUMonitorAccessory.Stat.dataArray = [];
		//回调
		if(avg > busyRate4Check && higherCallback){
			higherCallback();
		}
		if(avg <= busyRate4Check && lowerCallback){
			lowerCallback();
		}
		window.console && console.log("cpu平均消耗：" + avg);
	}, time);
}