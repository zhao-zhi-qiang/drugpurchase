document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");

$(function(){
	tiaozhuan(1);
})

function tiaozhuan(pageNum){
	$.post("http://localhost:80/mysocial/NotificationSelectAll",{"pageNum":pageNum},function(data){
		fenye(data)
	})
}
function fenye(data){
	console.log(data);
	$("#tbody").empty();
	$("#fenye").empty();
	$("#fenye").append("<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.options.selectedIndex].value)'></select>");
	for(var j=1;j<=data.rows;j++){
		$("#dangqianyeshu").append("<option value="+j+">"+j+"</option>")
	}
	$("#dangqianyeshu").val(data.pageNum);
	for(var i=0;i<data.list.length;i++){
		if(data.list[i].accountCharacter==0){
			data.list[i].accountCharacter="农业户口";
		}else{
			data.list[i].accountCharacter="非农业户口";
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
				"<td class='text-center' id='operation"+data.list[i].id+"'></td>"+
				"</tr>");
		if(data.list[i].warningTime<5){
			$("#operation"+data.list[i].id).append("<button type='button' class='btn bg-olive btn-xs'>结案归档</button>");
		}else{
			$("#time"+data.list[i].id).append("<span style='color: red'>已超过5个工作日，仍未补缴！</span>");
			$("#operation"+data.list[i].id).append("<button type='button' onclick='update("+data.list_ncm[i].id+",2)' class='btn bg-olive btn-xs'>提请处罚</button>");
			$("#operation"+data.list[i].id).append("<button type='button' onclick='update("+data.list_ncm[i].id+",3)' class='btn bg-olive btn-xs'>银行待查</button>");
		}
	}
}

//模糊查询
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

function update(id,state){
	$.post("http://localhost:80/mysocial/NotificationUpdate",{"id":id,"state":state},function(data){
		if(data==1){
			alert("提交成功");
		}else{
			alert("提交失败");
		}
	})
}