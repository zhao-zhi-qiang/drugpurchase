document.write("<script type='text/javascript' src='js/pageInfo.js'></script>");
function refresh(){
	window.location.reload();
}
//加载全局
$(function(){
    tiaozhuan(1);
})

//分页查询
function tiaozhuan(pages){
    $.post("http://localhost:80/mysocial/dailyAuditSelectAll",{"pages":pages,"approvalStatus":0,"typeStatus":3},function(data){
       // console.log(data);
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
        if (data.list[j].warningTime>5){
            var warningTime = "已经超过5个工作日，仍未进行立案审批";
            selectToSeve(data.list[j].id);
            updateStatusNo();
        }else{
            var warningTime = "";
        }
        $("#daily_auditContext").append(
            "<tr>" +
            "<td>"+data.list[j].unitName+"</td>" +
            "<td>"+data.list[j].organizationalCode+"</td>" +
            "<td>"+data.list[j].nameOfRegistrant+"</td>" +
            "<td>"+data.list[j].filingMonth+"</td>" +
            "<td>"+data.list[j].filingTime+"</td>" +
            "<td>"+data.list[j].accountCharacter+"</td>" +
            "<td>"+data.list[j].nameOfTheComplainant+"</td>" +
            "<td>"+data.list[j].phone+"</td>" +
            "<td>"+data.list[j].complaintContents+"</td>" +
            "<td><span style='color:red;'>"+warningTime+"</span></td>" +
            "<td><button type='button' onclick=updateStatusYes('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal'>审批通过</button></td>"+
            "<td><button type='button' onclick=selectToSeve('"+data.list[j].id+"') class='btn bg-olive btn-xs' data-toggle='modal' data-target='#editModal'>审批不通过</button></td>"+
            "</tr>");
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
                "approvalStatus":0,
                "typeStatus":3},
            function(data){
                console.log(data);
                fenye(data);
            })
  //  }
}

function selectToSeve(id){
	sessionStorage.setItem("id",id);
}
//审批不通过
function updateStatusNo(){
    var id = sessionStorage.getItem("id");
    var causeOfAction = $("#entity_causeOfAction").val();
    var reasonsForTermination = $("#entity_reasonsForTermination").val();
    var investigatorViews = $("#entity_investigatorViews").val();
    var responsibleOpinions = $("#entity_responsibleOpinions").val();
    $.ajax({
        type:"post",
        url:"http://localhost:80/mysocial/approvalUpdateStatusNo",
        data:{
            "registrationOfCasesId":id,
            "causeOfAction":causeOfAction,
            "reasonsForTermination":reasonsForTermination,
            "investigatorViews":investigatorViews,
            "responsibleOpinions":responsibleOpinions
        },
        success:function(data){
        	if(data==1){
        		alert("提交成功");
        	}else if(data==3){
        		alert("已经审批过");
        	}else{
        		alert("提交失败");
        	}
        },
        error:function () {
            alert("有问题");
        }
    })
}

//审批通过
function updateStatusYes(id){
	$.ajax({
		type:"post",
		url:"http://localhost:80/mysocial/approvalUpdateStatusYes",
		data:{"id":id},
		success:function(data){
        	if(data==1){
        		alert("提交成功");
        	}else if(data==3){
        		alert("已经审批过");
        	}else{
        		alert("提交失败");
        	}
        },
		error:function(){
			alert("有问题");
		}
	})
}