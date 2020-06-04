document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");
//加载全局
$(function(){
	tiaozhuan(1)
})

//分页查询
function tiaozhuan(pages){
	$.get("http://localhost:80/mysocial/newCaseManagementSelevtAll",{"pages":pages},function(data){
		console.log(data);
		sessionStorage.setItem('data', data);
		fenye(data);
	})
}
//分页方法
function fenye(data){
	$("#fenye").empty();
	$("#tbody").empty();
	$("#zongyeshu").val(data.rows);
	$("#zongtiaoshu").val(data.count);
	if(data.onclick == 1){
		$("#fenye").append("<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.selectedIndex].value)'></select>");
	}else{
		$("#fenye").append("<select id='dangqianyeshu' onchange='reloadList(this.options[this.selectedIndex].value)'></select>");
	}
	
	for(var i=1;i<=data.rows;i++){
		$("#dangqianyeshu").append("<option value='"+i+"'>"+i+"</>");
	}
	$("#dangqianyeshu").val(data.pages);
	for(var j=0;j<data.list.length;j++){
		if(data.list[j].accountCharacter==0){
			data.list[j].accountCharacter="农业户口";
		}else{
			data.list[j].accountCharacter="非农业户口";
		}
		$("#tbody").append("<tr><td><input type='checkbox' name='select' onchange='window.select()' value='"+data.list[j].id+"'/></td>" +
				"<td>"+data.list[j].unitName+"</td>" +
				"<td>"+data.list[j].organizationalCode+"</td>" +
				"<td>"+data.list[j].nameOfTheFiler+"</td>" +
				"<td>"+data.list[j].filingMonth+"</td>" +
				"<td>"+data.list[j].filingTime+"</td>" +
				"<td>"+data.list[j].accountCharacter+"</td>" +
				"<td>"+data.list[j].nameOfTheComplainant+"</td>" +
				"<td>"+data.list[j].complaintContents+"</td>" +
				"<td>"+data.list[j].warningTime+"</td>" +
				"<td><button type='button' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal' onclick='findOne("+data.list[j].id+")'>编辑</button></td>" +
						"</tr>");
	}
}

function allcheck(){
	if($("#allboxs").is(":checked")){
		$("[name='select']").prop("checked",true);
	}else{
		$("[name='select']").prop("checked",false);
	}
}


function select(){
	var ele = $("#tbody input[type='checkbox']");
	for(var i=0;i<ele.length;i++){
		if(ele.eq(i).is(":checked")){
			$("[id='allboxs']").prop("checked",true);
		}
		if(ele.eq(i).is(":checked") === false){
			$("[id='allboxs']").prop("checked",false);
			break;
		}
	}
}

//批量删除
function piliangshan(){
	var ids =new Array();
	var j = 0;
	var ele = $("#tbody input[type='checkbox']");
	for(var i=0;i<ele.length;i++){
		if(ele.eq(i).is(":checked")){
			ids[j]=ele.eq(i).val();
			j++;
		}
	}
	var str = ids.toString();
	$.post("http://localhost:80/mysocial/newCaseManagementDeleatAll",{"ids":str},function(data){
		alert("删除了"+data+"条");
		window.location.reload();
	})
	console.log(ids);
}

//模糊查询
function reloadList(onchangeValue){
	if(onchangeValue==null||onchangeValue==""){
		var pages = 1;
	}else{
		var pages = onchangeValue;
	}
	$.ajax({
		type:"post",
		url:"http://localhost:80/mysocial/newCaseManagementSelevtByEntity",
		data:{
			"approvalStatus":4,
			"typeStatus":3,
			"pages":pages,
			"unitName":$("#searchEntity_registrationOfCases_unitName").val(),
			"organizationalCode":$("#searchEntity_registrationOfCases_organizationalCode").val(),
			"nameOfRegistrant":$("#searchEntity_registrationOfCases_nameOfRegistrant").val()
		},
		success:function(data){
			console.log(data);
			sessionStorage.setItem('data', data);
			fenye(data);
		}
	})
}

function findOne(id){
	$.post("http://localhost:80/mysocial/newCaseManagementFindOne",{"id":id},function(data){
		sessionStorage.setItem('id', id);
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

function save(){
	$.post("http://localhost:80/mysocial/newCaseManagementSave",{"id":sessionStorage.getItem('id'),"serviceTime":$("#entity_serviceTime").val()},function(data){
		if(data==1){
			alert("保存成功");
			$("#editModal").remove();
			window.location.reload();
		}else if(data==3){
			alert("已保存过");
			$("#editModal").remove();
			window.location.reload();
		}else{
			alert("保存失败");
		}
	})
}

