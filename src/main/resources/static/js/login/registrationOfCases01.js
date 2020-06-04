document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");

$(function(){
	tiaozhuan(1);
})

function tiaozhuan(pageNum){
	$.post("http://localhost:80/mysocial/casesSelectAll",{"pageNum":pageNum},function(data){
		fenye(data);
	})
}
function fenye(data){
	console.log(data);
	$("#tbody").empty();
	$("#fenye").empty();
	$("#fenye").append("<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.options.selectedIndex].value)'></select>");
	for(var j=1;j<=data.rows;j++){
		$("#dangqianyeshu").append("<option value='"+j+"'>"+j+"</option>");
	}
	$("#dangqianyeshu").val(data.pageNum);
	for(var i=0;i<data.list.length;i++){
		if(data.list[i].accountCharacter==0){
			data.list[i].accountCharacter="农业户口";
		}else{
			data.list[i].accountCharacter="非农业户口";
		}
		$("#tbody").append("<tr>" +
				"<td><a onclick='fundOne("+data.list[i].id+")' data-toggle='modal' data-target='#editModal'>"+data.list[i].unitName+"</a></td>" +
				"<td>"+data.list[i].organizationalCode+"</td>" +
				"<td>"+data.list[i].nameOfRegistrant+"</td>" +
				"<td>"+data.list[i].filingMonth+"</td>" +
				"<td>"+data.list[i].registrationTime+"</td>" +
				"<td>"+data.list[i].accountCharacter+"</td>" +
				"<td>"+data.list[i].nameOfTheComplainant+"</td>" +
				"<td>"+data.list[i].phone+"</td>" +
				"<td>"+data.list[i].complaintContents+"</td>" +
				"</tr>");
	}
}

function fundOne(id){
	$.post("http://localhost:80/mysocial/casesFundOne",{"id":id},function(data){
		$("#entity_unitName").val(data.unitName);
		$("#entity_complaintContents").val(data.complaintContents);
		$("#entity_organizationalCode").val(data.organizationalCode);
		$("#entity_nameOfTheComplainant").val(data.nameOfTheComplainant);
		$("#entity_idCard").val(data.idCard);
		$("#entity_phone").val(data.phone);
		$("#entity_nameOfRegistrant").val(data.nameOfRegistrant);
		$("#entity_accountCharacter").val(data.accountCharacter);
		$("#entity_sex").val(data.sex);
		$("#entity_filingTime").val(data.filingTime);
	})
}

function reloadList(onchangeValue){
	if(onchangeValue==null||onchangeValue==''){
		var pageNum = 1;
	}else{
		var pageNum = onchangeValue;
	}
	var unitName = $("#unitName").val();
	var organizationalCode = $("#organizationalCode").val();
	var nameOfRegistrant = $("#nameOfRegistrant").val();
	$.ajax({
		type:"post",
		url:"http://localhost:80/mysocial/casesReloadList",
		data:{"unitName":unitName,
			  "organizationalCode":organizationalCode,
			  "nameOfRegistrant":nameOfRegistrant,
			  "pageNum":pageNum},
		success:function(data){
				  fenye(data);
			  },
		error:function(){
			
		}
	})
}