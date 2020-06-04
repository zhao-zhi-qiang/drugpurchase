$(function(){
	tiaozhuan();
})

function tiaozhuan(pageNum){
	var realName = $("#realName").val();
	var department = $("#department").val();
	$.post("http://localhost:80/mysocial/adminSelectAll",{"pageNum":pageNum,"realName":realName,"department":department},function(data){
		console.log(data);
		$("#tbody").empty();
		for (var i = 0; i < data.result.length; i++) {
			$("#tbody").append("<tr>" +
					"<td>"+data.result[i].username+"</td>" +
					"<td>"+data.result[i].realName+"</td>" +
					"<td>"+data.result[i].role.roleDesc+"</td>" +
					"</tr>");
		}
	})
}