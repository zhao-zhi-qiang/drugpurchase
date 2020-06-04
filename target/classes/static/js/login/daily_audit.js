document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");
//加载全局
$(function(){
	tiaozhuan(1);
})

//分页查询
function tiaozhuan(pages){
	$.post("http://localhost:80/mysocial/dailyAuditSelectAll",{"pages":pages,"approvalStatus":0,"typeStatus":1},function(data){
		console.log(data);
		fenye(data);
	})
}

//分页方法
function fenye(data){
	$("#daily_auditContext").empty();
	$("#fenye").empty();
	$("#zongyeshu").val(data.rows)
	$("#zongtiaoshu").val(data.count)
	if(data.onclick==1){
		$("#fenye").append("第<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.selectedIndex].value)'></select>页")
	}else{
		$("#fenye").append("第<select id='dangqianyeshu' onchange='reloadList(this.options[this.selectedIndex].value)'></select>页")
	}
	for(var i=1;i<=data.rows;i++){
		$("#dangqianyeshu").append("<option value='"+i+"'>"+i+"</option>");
	}
	$("#dangqianyeshu").val(data.pages);
	for(var j=0;j<data.list.length;j++){
		if(data.list[j].accountCharacter==0){
			data.list[j].accountCharacter="农业户口";
		}else{
			data.list[j].accountCharacter="城镇户口";
		}
		$("#daily_auditContext").append(
				"<tr>" +
				"<td>"+data.list[j].unitName+"</td>" +
				"<td>"+data.list[j].organizationalCode+"</td>" +
				"<td>"+data.list[j].nameOfRegistrant+"</td>" +
				"<td>"+data.list[j].registrationTime+"</td>" +
				"<td>"+data.list[j].accountCharacter+"</td>" +
				"<td>"+data.list[j].nameOfTheComplainant+"</td>" +
				"<td>"+data.list[j].phone+"</td>" +
				"<td>"+data.list[j].complaintContents+"</td>" +
				"<td><button type='button' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal' onclick=findOne("+data.list[j].id+")>修改</button>" +
				"<button type='button' class='btn bg-olive btn-xs' onclick=deleteOne("+data.list[j].id+")>删除</button>" +
				"<button type='button' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal1' onclick=findOne("+data.list[j].id+")>上传材料</button></td>" +
						"</tr>");
	}
}

//根据ID查询
function findOne(id){
	$.post("http://localhost:80/mysocial/dailyAuditFindOne",{"id":id},function(data){
		console.log(data);
		$(".modal-body").append("<input type='hidden' id='id1'>")
		$("#id1").val(data.id);
		$("#entity_unitName").val(data.unitName);
		$("#entity_complaintContents").val(data.complaintContents);
		$("#entity_organizationalCode").val(data.organizationalCode);
		$("#entity_nameOfTheComplainant").val(data.nameOfTheComplainant);
		$("#entity_idCard").val(data.idCard);
		$("#entity_phone").val(data.phone);
		$("#entity_nameOfRegistrant").val(data.nameOfRegistrant);
		$("#entity_accountCharacter").val(data.accountCharacter);
		$("#entity_sex").val(data.sex);
		$("#entity_age").val(data.age);
		$("#entity_numberOfAuditors").val(data.numberOfAuditors);
		$("#entity_auditHouseholds").val(data.auditHouseholds);
		$("#entity_amountPaid").val(data.amountPaid);
		$("#entity_filingTime").val(data.filingTime);
	})
}


//登记+保存修改
function save(){
	
	var id = $("#id1").val();
	if(typeof(id)=="undefined"){
		var url = "http://localhost:80/mysocial/dailyAuditAddOne";
	}else{
		var url = "http://localhost:80/mysocial/dailyAuditYanzheng";
	}
	$.ajax({
		url:url,
		data:{
	 		"id":$("#id1").val(),
			"unitName":$("#entity_unitName").val(),
			"complaintContents":$("#entity_complaintContents").val(),
			"organizationalCode":$("#entity_organizationalCode").val(),
			"nameOfTheComplainant":$("#entity_nameOfTheComplainant").val(),
			"idCard":$("#entity_idCard").val(),
			"phone":$("#entity_phone").val(),
			"nameOfRegistrant":$("#entity_nameOfRegistrant").val(),
			"accountCharacter":$("#entity_accountCharacter").val(),
			"sex":$("#entity_sex").val(),
			"age":$("#entity_age").val(),
			"numberOfAuditors":$("#entity_numberOfAuditors").val(),
			"auditHouseholds":$("#entity_auditHouseholds").val(),
			"amountPaid":$("#entity_amountPaid").val(),
			"filingTime":$("#entity_filingTime").val(),
			"approvalStatus":0,
			"typeStatus":1},
		success:function(data){
			alert(data);
			window.location.reload();
		},
		error:function(){
			alert("有问题");
		}
	});
	/*$.post("http://localhost:80/mysocial/dailyAuditYanzheng",JSON.stringify(value),"application/json;charset=UTF-8",function(){
		
	})*/
}

//删除
function deleteOne(id){
	var dele = confirm("确定删除吗？");
	if(dele){
		$.get("http://localhost:80/mysocial/dailyAuditDeleteOne",{"id":id},function(data){
			alert(data);
			window.location.reload();
		})
	}
	
}

//上传材料
function upload(){
	var upload = confirm("上传之后不能再次上传，确定要上传吗？");
	var id = $("#id1").val();
				if (upload){
					var file = $("#file")[0].files[0];
					var formData = new FormData();
					formData.append("file",file);
					formData.append("id",id);
					console.log(file);
					$.ajax({
						type:"post",
						url:"http://localhost:80/mysocial/dailyAuditUpload",
						data:formData,
						processData : false,
						contentType : false,
						success:function(valve){
							alert(valve);
							$("#editModal1").remove;
							window.location.reload();
						}
					})
		}

}

//模糊查询
function reloadList(onchangeValue){
	if(onchangeValue==null||onchangeValue==""){
		var pages = 1;
	}else{
		var pages = onchangeValue;
	}
	var unitName = $("#searchEntity_unitName").val();
	var organizationalCode = $("#searchEntity_organizationalCode").val();
	var nameOfRegistrant = $("#searchEntity_nameOfRegistrant").val();
	if((unitName==null||unitName=="")&(organizationalCode==null||organizationalCode=="")&(nameOfRegistrant==null||nameOfRegistrant=="")){
		alert("查询条件不能为空");
	}else{
		$.get("http://localhost:80/mysocial/dailyAuditSelectByEntity",
			{
				"pages":pages,
				"unitName":unitName,
				"organizationalCode":organizationalCode,
				"nameOfRegistrant":nameOfRegistrant,
				"approvalStatus":0,
				"typeStatus":1},
			function(data){
				console.log(data);
				fenye(data);
			})
	}
}
