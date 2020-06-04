document.write("<script type='text/javascript' src='js/pageInfo.js'></script>")

$(function(){
	tiaozhuan(1);
})

function tiaozhuan(pageNum){
	$.post("http://localhost:80/mysocial/BankCasesSelectAll",{"pageNum":pageNum},function(data){
		fenye(data)
	});
}
function fenye(data){
	console.log(data);
	//$("#tbody").empty();
	$("#fenye").empty();
	if(data.onclick == 1){
		$("#fenye").append("<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.options.selectedIndex].value)'></select>");
	}else{
		$("#fenye").append("<select id='dangqianyeshu' onchange='reloadList(this.options[this.options.selectedIndex].value)'></select>");
	}
	for(var j=1;j<=data.rows;j++){
		$("#dangqianyeshu").append("<option value='"+j+"'>"+j+"</option>")
	}
	$("#dangqianyeshu").val(data.pageNum);
	for(var i=0;i<data.list.length;i++){
		if(data.list[i].accountCharacter==0){
			data.list[i].accountCharacter="农业户口";
		}else{
			data.list[i].accountCharacter="非农业户口";
		}
		
		$("#tbody").append("<tr>" +
				"<td><a onclick='findOne("+data.list[i].id+")' data-toggle='modal' data-target='#editModal'>"+data.list[i].unitName+"</a></td>"+
				"<td>"+data.list[i].organizationalCode+"</td>"+
				"<td>"+data.list[i].nameOfRegistrant+"</td>"+
				"<td>"+data.list[i].filingMonth+"</td>"+
				"<td>"+data.list[i].filingTime+"</td>"+
				"<td>"+data.list[i].accountCharacter+"</td>"+
				"<td>"+data.list[i].nameOfTheComplainant+"</td>"+
				"<td>"+data.list[i].complaintContents+"</td>"+
				"<td id='warning"+data.list[i].id+"'></td>"+
				"<td class='text-center' id='operation"+data.list[i].id+"'></td>"+
				"</tr>");
		if(data.onclick == 1){
			if(data.list_pbc[i].haveMoney==0&&data.list[i].warningTime>5){
				$("#warning"+data.list[i].id).append("<span style='color:red'>已经超过5个工作日，仍未进行查询</span>");
			}else if(data.list_pbc[i].haveMoney==0&&data.list[i].warningTime<=5){
				$("#warning"+data.list[i].id).append("<span>请进行银行查询</span>");
			}else if(data.list_pbc[i].haveMoney==0&&data.list[i].warningTime>10){
				$("#warning"+data.list[i].id).append("<span style='color:red'>已经超过10个工作日，银行仍未划拨！</span>");
			}else if(data.list_pbc[i].haveMoney==0&&data.list[i].warningTime<=10){
				$("#warning"+data.list[i].id).append("<span>银行有钱，等待划拨！</span>");
			}
			if(data.list_pbc[i].haveMoney==0){
				$("#operation"+data.list[i].id).append("<button type='button' class='btn bg-olive btn-xs' onclick='updateMoney("+data.list_pbc[i].id+",1)'>银行有钱</button>");
				$("#operation"+data.list[i].id).append("<button type='button' class='btn bg-olive btn-xs' onclick='updateMoney("+data.list_pbc[i].id+",2)'>银行没钱</button>");
			}else if(data.list_pbc[i].haveMoney==1){
				$("#operation"+data.list[i].id).append("<button type='button' class='btn bg-olive btn-xs' onclick='update("+data.list_pbc[i].id+",0)'>划拨成功</button>");
				$("#operation"+data.list[i].id).append("<button type='button' class='btn bg-olive btn-xs' onclick='update("+data.list_pbc[i].id+",1)'>拒不划拨</button>");
			}
		}
	}
}

function updateMoney(id,haveMoney){
	$.post("http://localhost:80/mysocial/BankCasesUpdateMoney",{"id":id,"haveMoney":haveMoney},function(data){
		window.location.reload();
	})
}

function findOne(id){
	$.post("http://localhost:80/mysocial/BankCasesFindOne",{"id":id},function(data){
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
		$("#entity_auditHouseholds").val(data.auditHouseholds);
		$("#entity_amountPaid").val(data.amountPaid);
		$("#entity_filingTime").val(data.filingTime);
	})
}

function reloadList(onchange){
	if(onchange == null || onchange == ''){
		var pageNum = 1;
	}else{
		var pageNum = onchange;
	}
	var unitName = $("#unitName").val();
	var organizationalCode = $("#organizationalCode").val();
	var nameOfRegistrant = $("#nameOfRegistrant").val();
	$.ajax({
		type:"post",
		url:"http://localhost:80/mysocial/BankCasesReloadList",
		data:{"unitName":unitName,
			"pageNum":pageNum,
			"organizationalCode":organizationalCode,
			"nameOfRegistrant":nameOfRegistrant},
		success:function(data){
			fenye(data);
		},
		error:function(){
			
		}
	})
}

function update(id,state){
	$.post("http://localhost:80/mysocial/BankCasesUpdateState",{"id":id,"state":state},function(data){
		window.location.reload();
	})
}