document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");
//加载全局
$(function(){
	tiaozhuan(1);
})

//页面跳转
	function tiaozhuan(pages){
		$.post("http://localhost:80/mysocial/dailyAuditSelectAll",{"pages":pages,"approvalStatus":1,"typeStatus":3},function(data){
			console.log(data);
			fenye(data);
		})
	}

//分页方法
function fenye(data){
	$("#daily_auditContext").empty();
	$("#fenye").empty();
	$("#zongyeshu").val(data.rows);
	$("#zongtiaoshuu").val(data.count);
	if(data.onclick==1){
		$("#fenye").append("第<select id='dangqianyeshu' onchange='tiaozhuan(this.options[this.selectedIndex].value)'></select>页")
	}else{
		$("#fenye").append("第<select id='dangqianyeshu' onchange='reloadList(this.options[this.selectedIndex].value)'></select>页")
	}
	for(var i =1;i<=data.rows;i++){
		$("#dangqianyeshu").append("<option value='"+i+"'>"+i+"</option>")
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
	            "<td>"+data.list[j].filingTime+"</td>" +
	            "<td>"+data.list[j].accountCharacter+"</td>" +
	            "<td>"+data.list[j].nameOfTheComplainant+"</td>" +
	            "<td>"+data.list[j].phone+"</td>" +
	            "<td>"+data.list[j].complaintContents+"</td>" +
	            "<td><button type='button' onclick=updateStatusYes('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal'>审批通过</button></td>"+
	            "<td><button type='button' onclick=updateStatusNo('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>审批不通过</button></td>"+
	            "</tr>");
	}
}

//审批不通过
function updateStatusNo(id){
	var aaa = confirm("确认执行此操作吗");
	if(aaa){
		$.ajax({
			type:"post",
			url:"http://localhost:80/mysocial/registrationOfCasesUpdateStatusNo",
			data:{"id":id,"approvalStatus":2},
			success:function(data){
				if(data==1){
					alert("提交成功");
				}else{
					alert("提交失败")
				}
				window.location.reload();
			},
			error:function(){
				
			}
		})
	}
}

//审批通过
function updateStatusYes(id){
	var aaa = confirm("确认执行此操作吗");
	if(aaa){
		$.ajax({
			type:"post",
			url:"http://localhost:80/mysocial/registrationOfCasesUpdateStatusYes",
			data:{"id":id,"approvalStatus":4},
			success:function(data){
				if(data==1){
					alert("提交成功");
				}else{
					alert("提交失败")
				}
				window.location.reload();
			},
			error:function(){
				
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
    /*if((unitName==null||unitName=="")&(organizationalCode==null||organizationalCode=="")&(nameOfRegistrant==null||nameOfRegistrant=="")){
        alert("查询条件不能为空");
    }else{*/
        $.get("http://localhost:80/mysocial/dailyAuditSelectByEntity",
            {
                "pages":pages,
                "unitName":unitName,
                "organizationalCode":organizationalCode,
                "nameOfRegistrant":nameOfRegistrant,
                "approvalStatus":1,
                "typeStatus":3},
            function(data){
                console.log(data);
                fenye(data);
            })
  //  }
}