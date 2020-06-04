document.write("<script type='text/javascript' src='js/pageInfo.js'></script>")

$(function(){
	tiaozhuan(1);
})

function tiaozhuan(pageNum){
	$.get("http://localhost:80/mysocial/caseManagementSelectAll",{"pageNum":pageNum},function(data){
		fenye(data);
	})
}
function fenye(data){
	console.log(data);
	$("#tbody").empty();
	$("#fenye").empty();
	$("#fenye").append("<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.options.selectedIndex].value)'></select>")
	for(var j=1;j<=data.rows;j++){
		$("#dangqianyeshu").append("<option value='"+j+"'>"+j+"</option>")
	}
	$("#dangqianyeshu").val(data.pageNum);
	for(var i=0;i<data.list.length;i++){
		if(data.list[i].accountCharacter==0){
			data.list[i].accountCharacter = '农业户口';
		}else{
			data.list[i].accountCharacter = '非农业户口';
		}
		
		$("#tbody").append("<tr>" +
				"<td>"+data.list[i].unitName+"</td>"+
				"<td>"+data.list[i].organizationalCode+"</td>"+
				"<td>"+data.list[i].nameOfRegistrant+"</td>"+
				"<td>"+data.list[i].filingMonth+"</td>"+
				"<td>"+data.list[i].filingTime+"</td>"+
				"<td>"+data.list[i].accountCharacter+"</td>"+
				"<td>"+data.list[i].nameOfTheComplainant+"</td>"+
				"<td>"+data.list[i].complaintContents+"</td>"+
				"<td>"+data.list2[i].baseOfPayment+"</td>"+
				"<td id='time"+data.list[i].id+"'></td>"+
				"<td class='text-center' id='"+data.list[i].id+"'>" +
				"<button type='button' onclick='findOne("+data.list[i].id+")' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>出具补缴通知书</button>" +
				"</td>"+
				"</tr>");
		if(data.list[i].warningTime>5&&data.list[i].warningTime<50){
			$("#time"+data.list[i].id).append("<span style='color:red;'>已经超过五天，仍未出具补缴通知书</span>");
		}else if(data.list[i].warningTime>data.list[i].maxtime){
			$("#time"+data.list[i].id).append("<span style='color:red;'>该案件已超时，请尽快处理！！</span>");
		}else{
			$("#time"+data.list[i].id).append("<span>已核定补缴本金，请出具补缴通知书</span>");
		}
		if(data.list[i].warningTime == 50){
			$("#"+data.list[i].id).append("<button id='lengthen"+data.list[i].id+"' type='button' class='btn bg-olive btn-xs' onclick='yanshi("+data.list[i].id+")'>申请延长日期</button>");
		}
	}
}

function findOne(id){
	$.post("http://localhost:80/mysocial/selectById",{"id":id},function(data){
		console.log(data);
		if(data != null && data != ""){
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
			$("#entity_serviceTime").val(data.serviceTime);
			$("#entity_numberOfAuditors").val(data.numberOfAuditors);
			$("#entity_auditHouseholds").val(data.auditHouseholds);
			$("#entity_amountPaid").val(data.amountPaid);
			$("#entity_filingTime").val(data.filingTime);
		}else{
			alert ("已发送通知书，请勿重复发送")
			window.location.reload();
		}
		})
}

function yanshi(id){
	$.post("http://localhost:80/mysocial/caseManagementYanShi",{"id":id},function(data){
		if(data == 1){
			alert("延时成功");
		}else{
			alert("延时失败");
		}
	})
}

function save(){
	var rocId = sessionStorage.getItem("id");
	var serviceTime = $("#entity_serviceTime").val();
	$.post("http://localhost:80/mysocial/caseManagementSave",{"rocId":rocId,"serviceTime":serviceTime},function(data){
		if(data==1){
			alert("保存成功");
			$("#editModal").remove();
			window.location.reload();
		}else{
			alert("保存失败");
		}
	})
}

function reloadList(onchangeValue){
	if(onchangeValue != null && onchangeValue !=""){
		var pageNum = onchangeValue;
	}else{
		var pageNum = 1;
	}
	var unitName = $("#unitName").val();
	var organizationalCode = $("#organizationalCode").val();
	var nameOfRegistrant = $("#nameOfRegistrant").val();
	$.post("http://localhost:80/mysocial/caseManagementReloadList",{"pageNum":pageNum,"unitName":unitName,"organizationalCode":organizationalCode,"nameOfRegistrant":nameOfRegistrant},function(data){
		fenye(data);
	})
}