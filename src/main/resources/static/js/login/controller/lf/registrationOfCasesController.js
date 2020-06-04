//登记控制层的js

//添加
function addRegistrationOfCases(){
	var add_url = "/mysocial/RegisterController/saveRegister";
	var formdata = $("#form").serializeArray();
	$.post(add_url,formdata,function(returndata){
		if(returndata.resultCode=="SUCCESS"){
			alert("操作成功");
		}else{
			alert("操作失败");
		}
	})
	
	//测试使用
	/*$.post("/mysocial/RegisterController/testOne",{},function(){
		alert("执行成功！！！！！！！")
	})*/
}


