//控制层
    app.controller('registrationOfCasesController', function ($scope, $controller,  registrationOfCasesService, toaster) {
        $controller('baseController', {$scope: $scope});//继承
        //定义药品状态数组
        $scope.nature = ['农业户口', '非农业户口'];
        $scope.searchEntity = {};//定义搜索对象
        //搜索
        $scope.search = function (page, rows) {
            registrationOfCasesService.findPage(page, rows, $scope.searchEntity).success(
                function (response) {
                    $scope.list = response.rows;
                    console.log($scope.list);
                    $scope.paginationConf.totalItems = response.total;//更新总记录数
                }
            );
        };
        $scope.pop = function () {
            toaster.pop('success', "添加成功");
        }
        
        $scope.addInformation = function () {
            var serviceObject;//服务层对象
            registrationOfCasesService.insert($scope.entity).success(
                function (response) {
                    if (response.success) {
                        $scope.pop();
                        $("#bt1").click();
                        $scope.reloadList();
                    } else {
                        $("#sp1").html(response.message);
                    }
                }
            )
        }

        $scope.addClick = function () {
            $scope.entity = {};
            $("#sp1").text("");
        }

        //添加退货单之后的保存
        $scope.baoCun = function () {
            if ($scope.entity.unitName == null || $scope.entity.unitName == "") {
               alert("单位名称不能为空");
                return;
            }
            if ($scope.entity.organizationalCode == null || $scope.entity.organizationalCode == "") {
                alert("组织机构代码不能为空");
                return;
            }
            if(!(/^0\d{7}$/.test($scope.entity.organizationalCode))){
                alert("组织机构代码格式有误，请重填");
                return false;
            }


            if ($scope.entity.nameOfTheComplainant == null || $scope.entity.nameOfTheComplainant == "") {
                alert("投诉人姓名不能为空");
                return;
            }
            if ($scope.entity.idCard == null || $scope.entity.idCard == "") {
                alert("投诉人身份证号不能为空");
                return;
            }
            if (!(/^(\d{18}|\d{17}x)$/.test($scope.entity.idCard))) {
                alert("投诉人身份证号格式不正确,请重新填写");
                return;
            }
            if ($scope.entity.phone == null || $scope.entity.phone == "") {
               alert("联系电话不能为空");
                return;
            }
            if(!(/^1(3|5|6|8)\d{9}$/.test($scope.entity.phone))){
                alert("手机号码格式有误，请重填");
                return false;
            }



            if ($scope.entity.nameOfRegistrant == null || $scope.entity.nameOfRegistrant == "") {
               alert("接收人不能为空");
                return;
            }
            if ($scope.entity.accountCharacter == null || $scope.entity.accountCharacter == "") {
                alert("户口性质不能为空");
                return;
            }
            if ($scope.entity.age == null || $scope.entity.age == "") {
                alert("年龄不能为空");
                return;
            }
            if ($scope.entity.sex == null || $scope.entity.sex == "") {
                alert("性别不能为空");
                return;
            }
            if ($scope.entity.complaintContents == null || $scope.entity.complaintContents == "") {
               alert("投诉内容不能为空");
                return;
            }
            $("#sp1").text("");
            $scope.addInformation();
        }
        
        //查询实体
        $scope.findOne = function (id) {
            registrationOfCasesService.findOne(id).success(
                function (response) {
                    $scope.entity2 = response;
                }
            );
        }




        //保存
        $scope.save = function () {
            var serviceObject;//服务层对象
            serviceObject = registrationOfCasesService.update($scope.entity2); //修改
            serviceObject.success(
                function (response) {
                    if (response.success) {
                        $("#bt").click();
                        $scope.reloadList();
                    } else {
                        $("#sp1").html(response.message);
                    }
                }
            );
        }
        //删除单个
        $scope.deleteOne = function (id) {
            dele = confirm("确认删除吗?");
            if(dele==true) {
                registrationOfCasesService.delete(id).success(
                    function (response) {
                        if (response.success) {
                            $scope.reloadList();//刷新列表
                        }
                    }
                );
            }
        }

        //提交
        $scope.updateStatus = function (id) {
            dele = confirm("提交后不允许修改，您确定要执行此操作吗?");
            if(dele==true) {
                registrationOfCasesService.updateStatus(id).success(
                    function (response) {
                        if (response.success) {
                            $scope.reloadList();//刷新列表
                        }
                    }
                );
            }
        }
});
