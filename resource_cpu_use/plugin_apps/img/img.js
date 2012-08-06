//默认参数
var cfg = {
	autoRun : false
	, url : "http://ctc.qzonestyle.gtimg.cn/qzone/em/e119.gif"
	, amount : 200 //要创建的flash个数
	, cpuUse : 0.2 //CPU的监控值
	, time : 5000 //运行时间	
	, outFile : "out.txt" //输出的文件
}


//设置初始参数，如果是命令行启动，获取传送过来的参数
function init(){
	//获取命令行参数
	var pos = location.href.indexOf("?");
	if(pos>-1){
		var params = location.href.substring(pos+1).split("&");
		if(params.length>0){
			cfg.url = decodeURIComponent( params[0] );
		}
		if(params.length>1){
			cfg.amount= params[1];
		}
		if(params.length>2){
			cfg.cpuUse = params[2];
		}
		if(params.length>3){
			cfg.time = params[3];
		}
		if(params.length>4){
			cfg.outFile = params[4];
		}
		cfg.autoRun = true;
	}
	//显示参数
	QZFL.dom.get("url").value = cfg.url;
	QZFL.dom.get("amount").value = cfg.amount;
	QZFL.dom.get("cpu").value = cfg.cpuUse;
	QZFL.dom.get("time").value = cfg.time;
	QZFL.dom.get("out_file").value = cfg.outFile;
	//如果是命令行自动运行
	if(cfg.autoRun){
		run();
	}
}


//启动测试前，从输入界面获取参数
function setParams(){
	var pass = true;
	if(!QZFL.dom.get("url").value.length>0){
		pass = false;
	}
	if(!/^\d+$/.test(QZFL.dom.get("amount").value)){
		pass = false;
		QZFL.dom.get("amount").value="";
	}
	if(!/^\d+\.?\d*$/.test(QZFL.dom.get("cpu").value)){
		pass = false;
		QZFL.dom.get("cpu").value="";
	}
	if(!/^\d+$/.test(QZFL.dom.get("time").value)){
		pass = false;
		QZFL.dom.get("time").value="";
	}
	if(pass){
		cfg.url = QZFL.dom.get("url").value;
		cfg.amount = parseInt(QZFL.dom.get("amount").value);
		cfg.cpuUse = parseFloat(QZFL.dom.get("cpu").value);
		cfg.time = parseInt(QZFL.dom.get("time").value);
		cfg.outFile = QZFL.dom.get("out_file").value;
	}
	return pass;
}


//提示相应的命令行参数
function showCMD(){
	var cmd = "resource_cpu_use.hta plugin_apps/img/img.html "
		+ cfg.url + " " + cfg.amount + " " + cfg.cpuUse + " " + cfg.time + " " + cfg.outFile;
	QZFL.dom.get("cmd").innerHTML = cmd;
}


//启动测试
function run(){
	if(!setParams()){
		alert("参数有误");
		return;
	}
	//提示相应的命令行参数
	showCMD();
	//创建资源
	var img = "<img src='" + cfg.url + "'>";
	for(var i=0; i<cfg.amount; i++){
		var cnt = QZFL.dom.createElementIn("div","sandbox",false,{style:"float:left"});
		cnt.innerHTML = img;
	}
	//记录结果
	setTimeout(function(){
		var result = QZONE.CPUMonitorAccessory.Stat.getOverPerAmount(cfg.cpuUse, 0, cfg.time);
		FIO.writeFile(cfg.outFile, result);
		if(cfg.autoRun){
			window.parent.close();
		}
	}, cfg.time);
}


QZFL.event.addEvent(QZFL.dom.get("copy"), "click", function(){
	var cmd = QZFL.dom.get("cmd").innerHTML;
    window.clipboardData.clearData();   
    window.clipboardData.setData("Text", cmd);   
    alert("复制成功");
});


QZFL.event.addEvent(QZFL.dom.get("start"), "click", function(){
	//初始化
	QZFL.dom.get("sandbox").innerHTML="";
	QZONE.CPUMonitorAccessory.Stat.dataArray = [];
	//开始测试
	run();
});


window.CPU_DEBUGGER_TURN_ON = true;
QZONE.CPUMonitor.initialize();
QZFL.event.onDomReady(init);