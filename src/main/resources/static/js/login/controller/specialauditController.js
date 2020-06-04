//控制层
app.controller('specialauditController', function ($scope, $controller, specialauditService, toaster) {
    $controller('baseController', {$scope: $scope});//继承
    //定义药品状态数组
    $scope.nature = ['农业户', '城镇户'];
    $scope.searchEntity = {};//定义搜索对象
    //搜索
    $scope.search = function (page, rows) {
        specialauditService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    };
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }
    //保存
    $scope.save = function () {
        var serviceObject;//服务层对象
        if ($scope.entity.id != null) {//如果有ID
            if (confirm("确认要修改吗？")) {
                serviceObject = specialauditService.update($scope.entity); //修改
            } else {
                return;
            }
        } else {
            serviceObject = specialauditService.save($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $("#bt1").click();
                    $scope.reloadList();
                } else {
                    toaster.pop('error', response.message);
                }
            }
        );
    }

    $scope.yanzheng = function () {
        if ($scope.entity.unitName == null || $scope.entity.unitName == "") {
            toaster.pop('error', "单位名称不能为空");
            return;
        }
        if ($scope.entity.organizationalCode == null || $scope.entity.organizationalCode == "") {
            toaster.pop('error', "组织机构代码不能为空");
            return;
        }
        if ($scope.entity.nameOfTheComplainant == null || $scope.entity.nameOfTheComplainant == "") {
            toaster.pop('error', "投诉人姓名不能为空");
            return;
        }
        if ($scope.entity.idCard == null || $scope.entity.idCard == "") {
            toaster.pop('error', "投诉人身份证号不能为空");
            return;
        }
        if ($scope.entity.phone == null || $scope.entity.phone == "") {
            toaster.pop('error', "联系电话不能为空");
            return;
        }
        if ($scope.entity.nameOfRegistrant == null || $scope.entity.nameOfRegistrant == "") {
            toaster.pop('error', "接收人不能为空");
            return;
        }
        if ($scope.entity.accountCharacter === "" || $scope.entity.accountCharacter === null) {
            toaster.pop('error', "户口性质不能为空");
            return;
        }
        if ($scope.entity.sex === null || $scope.entity.sex === "") {
            toaster.pop('error', "性别不能为空");
            return;
        }
        if ($scope.entity.age == null || $scope.entity.age == "") {
            toaster.pop('error', "年龄");
            return;
        }

        if ($scope.entity.numberOfAuditors == null || $scope.entity.numberOfAuditors == "") {
            toaster.pop('error', "审计人数不能为空");
            return;
        }
        if ($scope.entity.auditHouseholds == null || $scope.entity.auditHouseholds == "") {
            toaster.pop('error', "审计户数不能为空");
            return;
        }
        if ($scope.entity.amountPaid == null || $scope.entity.amountPaid == "") {
            toaster.pop('error', "补缴数额不能为空");
            return;
        }
        if ($scope.entity.auditHouseholds == null || $scope.entity.auditHouseholds == "") {
            toaster.pop('error', "审计户数不能为空");
            return;
        }
        if ($scope.entity.filingTime == null || $scope.entity.filingTime == "") {
            toaster.pop('error', "立案时间不能为空");
            return;
        }
        $scope.save();
    }
    //查询实体
    $scope.findOne = function (id) {
        specialauditService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //删除单个
    $scope.deleteOne = function (id) {
        if (confirm("确认删除吗?")) {
            specialauditService.delete(id).success(
                function (response) {
                    if (response.success) {
                        toaster.pop('success', "成功删除！");
                        $scope.reloadList();//刷新列表
                    }
                }
            );
        }
    }

    //上传材料
    $scope.upload = function (id) {
        var form = new FormData();
        var file = document.getElementById("file").files[0];
        form.append("file", file);
        console.log(form);
        console.log(file)
        $.ajax({
            url: "../specialaudit/upload?id=" + id,
            type: "post",
            data: form,
            datatype: "json",
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                toaster.pop('success', response.message);
                var file1 = $("#file");
                file1.after(file1.clone().val(""));
                file1.remove();
                $("#bt").click();
                $scope.reloadList();
            }
        })
    }
});
