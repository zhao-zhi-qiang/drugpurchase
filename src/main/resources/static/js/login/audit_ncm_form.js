document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");

$(function(){
	tiaozhuan(1);
})

//分页跳转
function tiaozhuan(pageNum){
	$.get("http://localhost:80/mysocial/auditNcmFormSelectAll",{"pageNum":pageNum},function(data){
		fenye(data);
	});
}

//分页方法
function fenye(data){
	$("#tbody").empty();
	$("#dangqianyema").append("<select id='dijiye' onchange='tiaozhuan(this.options[this.selectedIndex].value)'></select>");
	for(var i=1;i<=data.rows;i++){
		$("#dijiye").append("<option value='"+i+"'>"+i+"</option>")
	}
	$("#dijiye").val(data.pageNum);
	for(var j=0;j<data.list.length;j++){
		if(data.list.accountCharacter==0){
			data.list.accountCharacter="农业户口";
		}else{
			data.list.accountCharacter="非农业户口";
		}
		$("#tbody").append("<tr id='allSel'><td>"+data.list[j].unitName+"</td>" +
							"<td>"+data.list[j].organizationalCode+"</td>" +
							"<td>"+data.list[j].nameOfTheFiler+"</td>" +
							"<td>"+data.list[j].filingMonth+"</td>" +
							"<td>"+data.list[j].filingTime+"</td>" +
							"<td>"+data.list[j].accountCharacter+"</td>" +
							"<td>"+data.list[j].nameOfTheComplainant+"</td>" +
							"<td>"+data.list[j].complaintContents+"</td>" +
							"<td></td>" +
							"<td><button type='button' id='baseOfPayment"+data.list[j].id+"' onclick=findOne('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>录入缴费基数</button>" +
							"<button type='button' id='state"+data.list[j].id+"' onclick=addIdToSession('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal1'>上传报送材料</button>" +
							"<button type='button'  class='btn bg-olive btn-xs'>结案归档</button></td>" +
							"<td><button type='button'  onclick=findOne('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>编辑</button></td>"+
							"</tr");
		findAuditNcmForm(data.list[j].id);
	}
}

function findOne(id){
	$.post("http://localhost/mysocial/auditNcmFormFindOne",{"id":id},function(data){
		sessionStorage.setItem("id",data.id);
		$("#entity_unitName").val(data.unitName);
		$("#entity_complaintContents").val(data.complaintContents);
		$("#entity_organizationalCode").val(data.organizationalCode);
		$("#entity_nameOfTheComplainant").val(data.nameOfTheComplainant);
		$("#entity_idCard").val(data.idCard);
		$("#entity_phone").val(data.phone);
		$("#entity_nameOfRegistrant").val(data.nameOfRegistrant);
		$("#entity_accountCharacter").val(data.accountCharacter);
		$("#entity_sex").val(data.sex);
		$("#entity_auditHouseholds").val(data.auditHouseholds);
		$("#entity_numberOfAuditors").val(data.numberOfAuditors);
		$("#entity_amountPaid").val(data.amountPaid);
		$("#entity_filingTime").val(data.filingTime);
		
	})
}
function save(){
	var id = sessionStorage.getItem("id");
	var baseOfPayment = $("#entity_baseOfPayment").val();
	$.post("http://localhost/mysocial/auditNcmFormSave",{"id":id,"baseOfPayment":baseOfPayment},function(data){
		if(data==1){
			alert("录入成功");
			$("#editModal").remove();
			window.location.reload();
		}else{
			alert("录入失败");
		}
	})
}


function addIdToSession(id){
	sessionStorage.setItem("id",id);
}
function uploadfile(){
	var id = sessionStorage.getItem("id");
	var file = $("#file")[0].files[0];
	var formData = new FormData();
	formData.append("file",file);
	formData.append("id",id);
	$.ajax({
		type:"post",
		url:"http://localhost:80/mysocial/auditNcmFormUploadFile",
		data:formData,
		contentType:false,
		processData:false,
		success:function(data){
			alert(data);
			$("#editModal1").remove();
			window.location.reload();
		},
		error:function(){
			alert("有问题");
		}
	})
}

function findAuditNcmForm(id){
	$.post("http://localhost/mysocial/auditNcmFormFindAuditNcmForm",{"id":id},function(data){
		console.log(data.baseOfPayment);
		buttonDisplay(data);
	})
}
function buttonDisplay(data){
	if(data.state==1){
		document.getElementById("state"+data.registrationOfCasesId).style.display = "none";
	}
	if(data.baseOfPayment != null){
		document.getElementById("baseOfPayment"+data.registrationOfCasesId).style.display = "none";
	}
}