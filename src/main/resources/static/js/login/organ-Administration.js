var result;
$(function(){
	tiaozhuan();
	$.post("http://localhost:80/mysocial/userSelectRole",{},function(data){
		for (var i = 0; i < data.length; i++) {
			$("#higherAuthoritiesId").append("<option value='"+data[i].id+"'>"+data[i].roleDesc+"</option>")
		}
	});
})
function tiaozhuan(pageNum){
	$("#pages").empty();
	$.post("http://localhost:80/mysocial/organSelectAll",{"pageNum":pageNum},function(data){
		console.log(data);
		result=data.result;
		$("#tbody").empty();
		$("#pages").empty();
		for (var i = 0; i < data.result.length; i++) {
			$("#tbody").append("<tr>" +
					"<td>"+data.result[i].id+"</td>" +
					"<td>"+data.result[i].departmentName+"</td>" +
					"<td>"+data.result[i].higherAuthoritiesId+"</td>" +
					"<td>" +
						"<button type='button' onclick='findOne("+data.result[i].id+")' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>编辑</button>"+
						"<button type='button' onclick='deleteOne("+data.result[i].id+")' class='btn bg-olive btn-xs'>删除</button>"+
					"</td>" +
					"</tr>");
		}
		
		var prop = data.pageNum==1?1:data.pageNum-1;
		var next = data.pageNum==data.total?data.total:data.pageNum+1;
		var v="<tr><td><button type='button' id='firstPage' onclick='tiaozhuan(1)'>首页</button></td>";
		v+="<td><button type='button' id='propPage' onclick='tiaozhuan("+prop+")'>上一页</button></td>";
		v+="<td><button type='button' id='nextPage' onclick='tiaozhuan("+next+")'>下一页</button></td>";
		v+="<td><button type='button' id='lastPage' onclick='tiaozhuan("+data.total+")'>尾页</button></td></tr>";
		$("#pages").append(v);
	})
}

function findOne(id){
	sessionStorage.setItem("id",id);
	for (var i = 0; i < result.length; i++) {
		if (id==result[i].id) {
			$("#departmentName").val(result[i].departmentName)
			$("#higherAuthoritiesId").val(result[i].higherAuthoritiesId)
			break;
		}
	}
}

function verify(){
	var id = sessionStorage.getItem("id");
	var formData = $("#form1").serialize();
	formData+="&id="+id;
	$.post("http://localhost:80/mysocial/organAdd",formData,function(data){
		if (data==1) {
			alert("添加成功");
			$("#editModal").remove();
			window.location.reload();
		}else{
			alert("添加失败");
		}
	})
}