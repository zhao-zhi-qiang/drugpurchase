document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");
function refresh(){
	window.location.reload();
}
function edit(id){
	var value='';
	$.ajax({
		type:"get",
		url:"http://localhost:80/mysocial/selectByPrimaryKey",
		data:{"id":id},
		async:false,
		success:function(data){
			value = data;
			/*$("#unitName1").value=data.unitName;*/
		},
		error:function(){
			alert("失败");
		}
	})
	return value;
}
//添加
function addRegistrationOfCases(){
	var unitName1 = document.getElementsByName("unitName1")[0].value;
	var organizationalCode = document.getElementsByName("organizationalCode")[0].value;
	var nameOfTheComplainant = document.getElementsByName("nameOfTheComplainant")[0].value;
	var idCard = document.getElementsByName("idCard")[0].value;
	var phone = document.getElementsByName("phone")[0].value;
	var name = document.getElementsByName("")[0].value;
	var accountCharacter = document.getElementsByName("accountCharacter")[0].value;
	var age = document.getElementsByName("age")[0].value;
	var sex = document.getElementsByName("sex")[0].value;
	var complaintContents = document.getElementsByName("complaintContents")[0].value;
	$.ajax({
		type:"post",
		datatype:"json",
		url:"http://localhost:80/mysocial/add",
		data:{
			"unitName1":unitName1,
			"organizationalCode":organizationalCode,
			"nameOfTheComplainant":nameOfTheComplainant,
			"idCard":idCard,
			"phone":phone,
			"name":name,
			"accountCharacter":accountCharacter,
			"age":age,
			"sex":sex,
			"complaintContents":complaintContents			
		},
		success:function(data){
			alert(data);
			window.location.reload();
		},
		error:function(){
			alert("300");
		}
	});
}
//模糊查询
function selectByEntity(onchangeValue){
	if(onchangeValue==null||onchangeValue==""){
		var pages = 1;
	}else{
		var pages = onchangeValue;
	}
	var unitName = $("#searchEntity_unitName").val();
	var organizationalCode = $("#searchEntity_organizationalCode").val();
	var nameOfRegistrant = $("#searchEntity_nameOfRegistrant").val();
	/*if((unitName==null||unitName=="")&(organizationalCode==null||organizationalCode=="")&(nameOfRegistrant==null||nameOfRegistrant=="")){
		alert("查询条件不能为空");
	}else{*/
		$.get("http://localhost:80/mysocial/selectByEntity",
				{"pages":pages,"unitName":unitName,"organizationalCode":organizationalCode,"nameOfRegistrant":nameOfRegistrant,"approvalStatus":4,"typeStatus":0},
				function(data){
					fenye(data);
					$("#searchEntity_unitName").val(unitName);
					$("#searchEntity_organizationalCode").val(organizationalCode);
					$("#searchEntity_nameOfRegistrant").val(nameOfRegistrant);
					})
	//}
}
//加载全局
$(function(){
	tiaozhuan(1);
})

//根据id查询
function findOne(id){
	var data = edit(id);
	if(data.typeStatus!=0){
		alert("已提交，不能修改");
		window.location.reload();
	}
	$("#id_table").append("<tr><td><input type='hidden' id='id1'></td></tr>");
	$("#id1").val(data.id);
	$("#unitName1").val(data.unitName);
	$("#organizationalCode1").val(data.organizationalCode);
	$("#nameOfTheComplainant1").val(data.nameOfTheComplainant);
	$("#idCard1").val(data.idCard);
	$("#phone1").val(data.phone);
	$("#nameOfRegistrant1").val(data.nameOfRegistrant);
	$("#accountCharacter1").val(data.accountCharacter);
	$("#age1").val(data.age);
	$("#sex1").val(data.sex);
	$("#nameOfTheFiler1").val(data.nameOfTheFiler);
	$("#filingMonth1").val(data.filingMonth);
	$("#complaintContents1").val(data.complaintContents);
}


//修改
function updataRegistrationOfCases(){
//	var newPerson = persons();
	$.ajax({
		type:"post",
		traditional:true,
		url:"http://localhost:80/mysocial/updataRegistrationOfCases",
		data:{
			'id':$('#id1').val(),
			'unitName':$('#unitName1').val(),
			'organizationalCode':$('#organizationalCode1').val(),
			'nameOfTheComplainant':$('#nameOfTheComplainant1').val(),
			'idCard':$('#idCard1').val(),
			'phone':$('#phone1').val(),
			'nameOfRegistrant':$('#nameOfRegistrant1').val(),
			'accountCharacter':$('#accountCharacter1').val(),
			'age':$('#age1').val(),
			'sex':$('#sex1').val(),
			'complaintContents':$('#complaintContents1').val(),
			'nameOfTheFiler':$('#nameOfTheFiler1').val(),
			'filingMonth':$('#filingMonth1').val()
			
			},
		success:function(data){
			alert(data);
			window.location.reload();
		},
		error:function(){
			alert("有问题");
		}
	});
}

//删除
function deleteOne(id){
	var dele = confirm("确定删除吗？");
	if(dele==true){
		$.post("http://localhost:80/mysocial/deleteByPrimaryKey",{"id":id},function(data){
			alert(data);
			window.location.reload();
		})
	}
}
//提交
function updateStatus(id){
	var value = edit(id);
	if(value.approvalStatus==0){
		alert("已提交，不能再次提交");
	}else{
		var updata = confirm("提交后不允许修改，您确定要执行此操作吗？");
		if(updata==true){
			$.ajax({
				type:"post",
				url:"http://localhost:80/mysocial/updateByPrimaryKey",
				data:JSON.stringify(value),
				contentType: "application/json;charset=UTF-8",
				success:function(data){
					alert(data);
					window.location.reload();
				},
				error:function(){
					alert("有错误");
				}
			})
		}
	}
}

//分页查询
function tiaozhuan(yeshu){
	$.get("http://localhost:80/mysocial/selectAll",{"pages":yeshu},function(data){
		fenye(data);
		})
}

//分页方法
function fenye(data){
	sessionStorage.setItem("data",data);
	$(".context").empty();
	$("#dijiye").remove();
	$("#zongtiaoshu").val(data.count);
	$("#zongyeshu").val(data.rows);
	if(data.onclick=="tiaozhuan"){
		$("#fenye").append("<select id='dijiye' onchange='tiaozhuan(this.options[this.selectedIndex].value)'></select>");
	}else{
		$("#fenye").append("<select id='dijiye' onchange='selectByEntity(this.options[this.selectedIndex].value)'></select>");
	}
	for(var j=1;j<=data.rows;j++){
		$("#dijiye").append("<option value='"+j+"'>"+j+"</option>");
	}
	$("#dijiye").val(data.pages);
	var list = data.list;
	for(var i=0; i <list.length;i++){
		if(list[i].accountCharacter==0){
			list[i].accountCharacter="农业户口"
		}else{
			list[i].accountCharacter="非农业户口"
		}
		$(".context").append("<tr><td>"+list[i].unitName+"</td><td>"+list[i].organizationalCode+"</td><td>"+
				list[i].nameOfRegistrant+"</td><td>"+
				list[i].registrationTime+"</td><td>"+
				list[i].accountCharacter+"</td><td>"+
				list[i].nameOfTheComplainant+"</td><td>"+
				list[i].phone+"</td><td>"+
				list[i].complaintContents+"</td><td><button  type='button' class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal1'onclick='findOne("+list[i].id+")'>修改</button></td>" +
						"<td><button type='button' class='btn bg-olive btn-xs' onclick='deleteOne("+list[i].id+")'>删除</button></td>" +
						"<td><button type='button' class='btn bg-olive btn-xs' onclick='updateStatus("+list[i].id+")'>提交</button></td></tr>");
	}
}

function download(){
	window.location.href="http://localhost:80/mysocial/downloadToXls";
}