/**
 * 文件IO接口
 */
var FIO = {
	fso : null,
	writeFile : function(file, content){
		if(!FIO.fso){
			FIO.fso = new ActiveXObject("Scripting.FileSystemObject");
		}
		var textStream = FIO.fso.OpentextFile(file, 2, true);
		textStream.write(content);
		textStream.close();
	}	
};