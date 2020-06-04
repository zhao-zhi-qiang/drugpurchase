document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");

$(function(){
	tiaozhuan(1);
})

function tiaozhuan(pageNum){
	$.post("http://localhost:80/mysocial/EnforcementSelectAll",{"pageNum":pageNum},function(data){
		fenye(data);
	})
}
function fenye(data){
	console.log(data);
	//$("#tbody").empty();
	$("#fenye").empty();
	$("#fenye").append("<select id='dangqianye' onchange='tiaozhuan(this.options[this.options.selectedIndex].value)'></select>");
	for(var j=1;j<=data.rows;j++){
		$("#dangqianye").append("<option value='"+j+"'>"+j+"</option>");
	}
	$("#dangqianye").val(data.pageNum);
	for(var i=0;i<data.list.length;i++){
		if(data.list[i].accountCharacter==0){
			data.list[i].accountCharacter="农业户口";
		}else{
			data.list[i].accountCharacter="非农业户口";
		}
		$("#tbody").append("<tr>" +
				"<td><a onclick='findOne("+data.list[i].id+")' data-toggle='modal' data-target='#editModal'>"+data.list[i].unitName+"</a></td>" +
				"<td>"+data.list[i].organizationalCode+"</td>" +
				"<td>"+data.list[i].nameOfRegistrant+"</td>" +
				"<td>"+data.list[i].filingMonth+"</td>" +
				"<td>"+data.list[i].filingTime+"</td>" +
				"<td>"+data.list[i].accountCharacter+"</td>" +
				"<td>"+data.list[i].nameOfTheComplainant+"</td>" +
				"<td>"+data.list[i].complaintContents+"</td>" +
				"<td id='warning'></td>" +
				"<td class='text-center'><button type='button' onclick='guidang("+data.list[i].id+")' class='btn bg-olive btn-xs'>结案归档</button></td>" +
				"</tr>");
		if(data.list[i].warningTime>=170&&data.list[i].warningTime<=260){
			$("#warning").append("<span style='color:red'>请做强制执行！！！</span>");
		}else if(data.list[i].warningTime>260){
			$("#warning").append("<span style='color:red'>报警提示！！！请处理！！！</span>");
		}
	}
}

function findOne(id){
	$.post("http://localhost:80/mysocial/EnforcementFindOne",{"id":id},function(data){
		$("#entity_unitName").val(data.unitName);
		$("#entity_complaintContents").val(data.complaintContents);
		$("#entity_organizationalCode").val(data.organizationalCode);
		$("#entity_nameOfTheComplainant").val(data.nameOfTheComplainant);
		$("#entity_idCard").val(data.idCard);
		$("#entity_phone").val(data.phone);
		$("#entity_nameOfRegistrant").val(data.nameOfRegistrant);
		$("#entity_accountCharacter").val(data.accountCharacter);
		$("#entity_sex").val(data.sex);
		$("#entity_numberOfAuditors").val(data.numberOfAuditors);
		$("#entity_auditHouseholds").val(data.auditHouseholds);
		$("#entity_amountPaid").val(data.amountPaid);
		$("#entity_filingTime").val(data.filingTime);
	})
}

//模糊查询
function reloadList(onchange){
	if(onchange==null||onchange==''){
		var pageNum=1;
	}else{
		var pageNum=onchange;
	}
	var unitName = $("#unitName").val();
	var organizationalCode = $("#organizationalCode").val();
	var nameOfRegistrant = $("#nameOfRegistrant").val();
	$.post("http://localhost:80/mysocial/EnforcementReloadList",
			{"pageNum":pageNum,"unitName":unitName,"organizationalCode":organizationalCode,"nameOfRegistrant":nameOfRegistrant},
			function(data){
				fenye(data);
			})
}

function guidang(id){
	$.post("http://localhost:80/mysocial/guiDang",{"id":id},function(data){
		alert("结案成功");
	})
}