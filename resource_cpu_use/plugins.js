//添加插件
function addPlugin(name, url){
	var li = QZFL.dom.createElementIn("li", "menu_bar", false);
	var bt = QZFL.dom.createElementIn("input", li, false, {
		"class": "btn app_btn",
		type: "button",
		id: url,
		name: "main_menu_build",
		value: name
	});
	QZFL.event.addEvent(bt, "click", showIframeFn(url));
}


//根据配置，启动插件
function showIframeFn(url){
	return function(){
		QZFL.dom.get("content_container").innerHTML = "";
		var ifrm = QZFL.dom.createElementIn("iframe", "content_container", false, {
				application	: "yes", //要是没有这个属性iframe内部的页面不能访问外侧hta主程序的资源
				width		: "100%",
				height		: "100%"
		});
		//如果是脚本启动并且带有参数，将参数放到URL
		var params = QZFL.dom.get("cmd_params").data;
		if(params && url.indexOf("?")==-1){
			url += "?" + QZFL.dom.get("cmd_params").data;
		}
		ifrm.src = url;
	}
}


//配置插件
addPlugin("flash性能测试", "plugin_apps/flash/flash.html");
addPlugin("图片性能测试", "plugin_apps/img/img.html");
addPlugin("任务调度器", "plugin_apps/taskmgr/taskmgr.html");
addPlugin("TestTimer", "plugin_apps/testTimer/testTimer.html");
addPlugin("StringConcat", "plugin_apps/testStringConcat/testStringConcat.html");
//命令行启动
if(window.RCU && window.RCU.commandLine){
	var args = RCU.commandLine.split(" ").slice(2);
	var str="";
	for(var i=1; i<args.length; i++){
		if(i==1){
			str += encodeURIComponent( args[i] );
		} else {
			str += args[i];
		}
		if(i<args.length-1){
			str += "&";
		}
	}
	if(str.length>0){
		QZFL.dom.get("cmd_params").data = str;
	}
	args[0] && QZFL.dom.get(args[0]) && QZFL.dom.get(args[0]).click();
};