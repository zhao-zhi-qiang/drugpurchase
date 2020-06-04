//控制层
app.controller('authorizationController', function ($scope, $controller, roleService, userService) {

    $controller('baseController', {$scope: $scope});//继承

    $scope.searchEntity = {};//定义搜索对象

    $scope.entity = {};//定义添加，修改对象

    $scope.roleids = [];

    $scope.roles= {};

    $scope.allRole= {};

    $scope.userid= {};

    //读取列表数据绑定到表单中
    $scope.findAll = function () {
        roleService.findAll().success(
            function (response) {
                $scope.allRole = response;
            }
        );
    }


    //搜索
    $scope.search = function (page, rows) {
        userService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }



    //查询选中用户的所有角色
    $scope.findRoleWithId = function (id) {
        roleService.findRoleWithId(id).success(
            function (response) {
                $scope.roles = response;
                $scope.roleids = [];
                angular.forEach($scope.roles, function (role) {
                    $scope.roleids.push(role.id);
                })
                $scope.userid=id;
            }
        );
    }


    //保存
    $scope.save = function () {

        var serviceObject;//服务层对象

        serviceObject = roleService.update($scope.userid, $scope.roleids); //修改

        serviceObject.success(
            function (response) {
                if (response.success) {
                    $("#bt1").click();
                } else {
                    toaster.pop('error', response.message);
                }
            }
        );
        $scope.emptyuserid();
    }

    //清空$scope.userid
    $scope.emptyuserid = function () {
        $scope.userid={};
    }



    //更新复选框选中状态
    $scope.checkOne = function ($event, id) {
        //判断选中状态
        if ($event.target.checked) {//选中状态
            $scope.roleids.push(id);
        } else {
            //取消勾选，移除当前id值  //参数一：移除位置的元素的索引值  参数二：从该位置移除几个元素
            var index = $scope.roleids.indexOf(id);
            $scope.roleids.splice(index, 1);
        }
    }

    //决定状态
    $scope.expression = function (id) {
        return $scope.roleids.indexOf(id) != -1;
    }


    $scope.allRole={};
     //查询所有角色
    $scope.selectAllRole = function () {
        roleService.findAll().success(function (response) {
            $scope.allRole = response;
        })
    }

});	
