var result;
$(function(){
	tiaozhuan();
	$("#entity_department").empty();
	$("#department").empty();
	$.ajax({
		type:"get",
		url:"http://localhost:80/mysocial/userSelectRole",
		data:{},
		 async:false,
		success:function(value){
			$("#entity_department").append("<option value = ''>请选择</option>");
			$("#department").append("<option value = ''>请选择</option>");
			for(var i=0;i<value.length;i++){
					$("#entity_department").append("<option value='"+value[i].id+"'>"+value[i].roleDesc+"</option>")
					$("#department").append("<option value='"+value[i].id+"'>"+value[i].roleDesc+"</option>")
			}
		},
		error:function(){
			
		}
	})
})

function tiaozhuan(pageNum){
	$("#pages").empty();
	$("#tbody").empty();
	var realName = $("#realName").val();
	var department = $("#department").val();
	$.post("http://localhost:80/mysocial/userFindAll",{"pageNum":pageNum,"department":department,"realName":realName},function(data){
		result = data.result;
		var list = data.result;
		for(var i=0;i<list.length;i++){
			$("#tbody").append("<tr>" +
					"<td>"+list[i].username+"</td>" +
					"<td>"+list[i].realName+"</td>" +
					"<td>"+list[i].role.roleDesc+"</td>" +
					"<td><button type='button' onclick='findOne("+list[i].id+")' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>编辑</button>" +
						"<button type='button' onclick='deleteOne("+list[i].id+")' class='btn bg-olive btn-xs'>删除</button>" +
							"</td>" +
					"</tr>");
		}
		var pre = data.pageNum== 1?1:data.pageNum-1;
		var next = data.pageNum== data.total?data.total:data.pageNum+1;
		var v = '<tr><td><button type="button" id="firstPage" onclick="tiaozhuan(1)">首页</button></td>';
        	v +='<td><button type="button" id="propPage" onclick="tiaozhuan('+pre+')">上一页</button></td>';
        		v +='	<td id="fenye"></td>';
        			v +='<td><button type="button" id="nextPage" onclick="tiaozhuan('+next+')">下一页</button></td>';
        		v+='<td><button type="button" id="lastPage" onclick="tiaozhuan('+data.total+')">尾页</button></td>';
        		v +='<td>共<input type="text" id="zongyeshu" disabled="disabled" size=1/>页</td></tr>';
        $("#zongyeshu").val(data.count);
		$("#pages").append(v);
		
	})
}

function findOne(id){
	//addClick(2);
	sessionStorage.setItem("id",id);
	for (var i = 0; i < result.length; i++) {
		if (id == result[i].id) {
			$("#username").val(result[i].username);
			$("#password").val(result[i].password);
			$("#entity_realName").val(result[i].realName);
			$("#entity_department").val(result[i].department);
			break;
		}
	}
}

function addClick(){
		$("#username").val("");
		$("#password").val("");
		$("#entity_realName").val("");
	
}

function verify(){
	var id = sessionStorage.getItem("id");
	
	var formData = $("#form1").serialize();
	formData += "&id="+id;
	$.ajax({
		type:"post",
		url:"http://localhost:80/mysocial/userAdd",
		data:formData,
		success:function(data){
			if(data==1){
				alert("添加成功");
			
				$("#editModal").remove();
				window.location.reload();
			}else{
				alert("添加失败");
			}
		},
		error:function(){
			
		}
	})
}

