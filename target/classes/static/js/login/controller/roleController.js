//控制层
app.controller('roleController', function ($scope, $controller, permissionService, roleService, toaster) {

    //读取列表数据绑定到表单中
    $scope.findAll = function () {
        roleService.findAll().success(
            function (response) {
                $scope.list = response;
            }
        );
    }

    $scope.addClick = function () {
        $("#s1").val([]).trigger('change');
        $scope.entity = {roleName: "", roleDesc: ""};
        $scope.permissionids = [];
    }

    //查询实体
    $scope.findOne = function (id) {
        roleService.findOne(id).success(
            function (response) {
                $scope.entity = response;
                $scope.permissions = $scope.entity.permissionList;
                $scope.permissionids = [];
                angular.forEach($scope.permissions, function (permission) {
                    $scope.permissionids.push(permission.id);
                })
                $("#s1").val($scope.permissionids).trigger('change');
            }
        );
    }

    //保存
    $scope.save = function () {
        if ($scope.entity.roleName.replace(/\s*/g, "") == "") {
            toaster.pop('error', "角色名不可为空！");
            return;
        }
        if ($scope.entity.roleDesc.replace(/\s*/g, "") == "") {
            toaster.pop('error', "角色描述不可为空！");
            return;
        }
        var serviceObject;//服务层对象
        if ($scope.entity.id != null) {//如果有ID
            serviceObject = roleService.update($scope.entity, $scope.permissionids); //修改
        } else {
            serviceObject = roleService.add($scope.entity, $scope.permissionids);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $("#bt1").click();
                    $("#shua").click();
                } else {
                    toaster.pop('error', response.message);
                }
            }
        );
    }
    //删除单个
    $scope.deleteOne = function (id) {
        roleService.deleteOne(id).success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $("#shua").click();
                }
            }
        );
    }

    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }

    $scope.permissionids = [];


    //初始化entity对象
    // $scope.entity={};


    //查询所有权限
    $scope.selectAllPermission = function () {
        permissionService.findAll().success(function (response) {
            $scope.allPermission = response;
        })
    }

});	
