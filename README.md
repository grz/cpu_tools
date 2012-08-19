<h1>CPU Tools （beta）</h1>  
<p>by GRZ’s Team</p>

欢迎使用CPU性能检测工具

目前非常简陋，请下载后直接运行resource_cpu_use.hta，后面我们会持续优化。
文档会慢慢补上。

Flash 物品CPU工具使用教程：
<a href="https://github.com/grz/cpu_tools/wiki/Flash-%E7%89%A9%E5%93%81%E6%80%A7%E8%83%BD%E6%A3%80%E6%B5%8B%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B" target="_blank">click here</a>

以下地址可以保存到浏览器收藏夹，方便在任意页面一键启动CPU曲线来观察这个页面有没有存在比较明显的性能问题（暂时只支持HTTP协议）：
javascript:function%20cpu(){window.CPU_DEBUGGER_TURN_ON=1;var%20d=document,b=d.body;try{if(!b)throw(0);d.title="%E3%80%90QZONE%20CPU%E3%80%91";if(typeof(QZFL)=="undefined"){var%20s1=d.createElement("scr"+"ipt");s1.setAttribute("src","http://qzs.qq.com/ac/qzone/qzfl/qzfl_2.1.1.4.js");b.appendChild(s1);}if(typeof(QZONE)=="undefined"||typeof(QZONE.CPU)=="undefined"){var%20s2=d.createElement("scr"+"ipt");s2.setAttribute("src","http://qzs.qq.com/qzone/v6/engine/cpu/cpu.js");b.appendChild(s2);}}catch(e){alert(e);}}cpu();void(0)

