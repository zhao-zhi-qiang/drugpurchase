function aa(){
	var unitName1 = document.getElementsByName("unitName1")[0].value;
	var organizationalCode = document.getElementsByName("organizationalCode")[0].value;
	var nameOfTheComplainant = document.getElementsByName("nameOfTheComplainant")[0].value;
	var idCard = document.getElementsByName("idCard")[0].value;
	var phone = document.getElementsByName("phone")[0].value;
	var nameOfRegistrant = document.getElementsByName("")[0].value;
	var age = document.getElementsByName("age")[0].value;
	var sex = document.getElementsByName("sex")[0].value;
	var accountCharacter = document.getElementsByName("accountCharacter")[0].value;
	
	var complaintContents = document.getElementsByName("complaintContents")[0].value;

    if (unitName1 == null || unitName1 == "") {
       alert("单位名称不能为空");
        return;
    }
    if (organizationalCode == null || organizationalCode == "") {
        alert("组织机构代码不能为空");
        return;
    }
    if(!(/^0\d{7}$/.test(organizationalCode))){
        alert("组织机构代码格式有误，请重填");
        return false;
    }


    if (nameOfTheComplainant == null || nameOfTheComplainant == "") {
        alert("投诉人姓名不能为空");
        return;
    }
    if (idCard == null ||idCard == "") {
        alert("投诉人身份证号不能为空");
        return;
    }
    if (!(/^(\d{18}|\d{17}x)$/.test(idCard))) {
        alert("投诉人身份证号格式不正确,请重新填写");
        return;
    }
    if (phone == null || phone == "") {
       alert("联系电话不能为空");
        return;
    }
    if(!(/^1(3|5|6|8)\d{9}$/.test(phone))){
        alert("手机号码格式有误，请重填");
        return false;
    }



    if (nameOfRegistrant == null || nameOfRegistrant == "") {
       alert("接收人不能为空");
        return;
    }
    if (accountCharacter == "undefined") {
        alert("户口性质不能为空");
        return;
    }
    if (age == null || age == "") {
        alert("年龄不能为空");
        return;
    }
    if (sex == null || sex == "") {
        alert("性别不能为空");
        return;
    }
    if (complaintContents == null ||complaintContents == "") {
       alert("投诉内容不能为空");
        return;
    }
    $("#sp1").text("");
    addRegistrationOfCases();

}

function yanzheng(){
	var unitName=$("#entity_unitName").val();
	var complaintContents=$("#entity_complaintContents").val();
	var organizationalCode=$("#entity_organizationalCode").val();
	var nameOfTheComplainant=$("#entity_nameOfTheComplainant").val();
	var idCard=$("#entity_idCard").val();
	var phone=$("#entity_phone").val();
	var nameOfRegistrant=$("#entity_nameOfRegistrant").val();
	var accountCharacter=$("#entity_accountCharacter").val();
	var sex=$("#entity_sex").val();
	var age=$("#entity_age").val();
	var numberOfAuditors=$("#entity_numberOfAuditors").val();
	var auditHouseholds=$("#entity_auditHouseholds").val();
	var amountPaid=$("#entity_amountPaid").val();
	var filingTime=$("#entity_filingTime").val();
	

    if (unitName == null || unitName == "") {
    	alert("单位名称不能为空");
        return;
    }
    if (organizationalCode == null || organizationalCode == "") {
        alert("组织机构代码不能为空");
        return;
    }
    if(!(/^0\d{7}$/.test(organizationalCode))){
        alert("组织机构代码格式有误，请重填");
        return false;
    }
    if (nameOfTheComplainant == null || nameOfTheComplainant == "") {
        alert("投诉人姓名不能为空");
        return;
    }
    if (idCard == null || idCard == "") {
        alert("投诉人身份证号不能为空");
        return;
    }
    if (!(/^(\d{18}|\d{17}x)$/.test(idCard))) {
        alert("投诉人身份证号格式不正确,请重新填写");
        return;
    }
    if (phone == null || phone == "") {
        alert("联系电话不能为空");
        return;
    }
    if(!(/^1(3|5|6|8)\d{9}$/.test(phone))){
        alert("手机号码格式有误，请重填");
        return false;
    }
    if (nameOfRegistrant == null || nameOfRegistrant == "") {
        alert("接收人不能为空");
        return;
    }
    if (accountCharacter === "" || accountCharacter === null) {
        alert("户口性质不能为空");
        return;
    }
    if (sex === null || sex === "") {
        alert("性别不能为空");
        return;
    }
    if (age == null || age == "") {
        alert("年龄");
        return;
    }

    if (numberOfAuditors == null || numberOfAuditors == "") {
        alert("审计人数不能为空");
        return;
    }
    if (auditHouseholds == null || auditHouseholds == "") {
        alert("审计户数不能为空");
        return;
    }
    if (amountPaid == null || amountPaid == "") {
        alert("补缴数额不能为空");
        return;
    }
    if (auditHouseholds == null || auditHouseholds == "") {
        alert("审计户数不能为空");
        return;
    }
    if (filingTime == null || filingTime == "") {
        alert("立案时间不能为空");
        return;
    }
    if(complaintContents == null || complaintContents == ""){
    	alert("投诉内容不能为空")
    	return;
    }
    save();

}