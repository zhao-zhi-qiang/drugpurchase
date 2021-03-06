//控制层
app.controller('organController', function ($scope, $controller,organService, toaster) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.searchEntity = {};//定义搜索对象

    $scope.entity = {};//定义添加，修改对象

    //搜索
    $scope.search = function (page, rows) {
        organService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }


    //初始化药品类别列表
    $scope.organlist = [];

    //定义查询所有药品类别的方法
    $scope.selectOrganlist = function () {
        organService.findAll().success(function (response) {
            for (var i = 0; i < response.length; i++) {
                $scope.organlist = response;
            }
        })
    }


    //查询实体
    $scope.findOne = function (id) {
        organService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }


    //点击添加按钮
    $scope.addClick = function (id) {
        $scope.entity={};
    }

    //录入用户信息
    $scope.verify = function () {
        if ($scope.entity.departmentName == null || $scope.entity.departmentName.length == 0) {
            toaster.pop('error',"请输入部门名称！");
            return
        }
        if ($scope.entity.higherAuthoritiesId == null || $scope.entity.higherAuthoritiesId == "") {
            toaster.pop('error',"请输入上级部门id！");
            return;
        }
        $scope.save();

    }

    //保存
    $scope.save = function () {
        var serviceObject;//服务层对象
        if ($scope.entity.id != null) {//如果有ID
            serviceObject = organService.update($scope.entity); //修改
        } else {
            serviceObject = organService.add($scope.entity);//增加
        }
        serviceObject.success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $("#bt1").click();
                    $scope.reloadList();
                } else {
                    $("#sp1").html(response.message);
                }
            }
        );
    }


    //删除单个
    $scope.deleteOne = function (id) {
        organService.deleteOne(id).success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $scope.reloadList();//刷新列表
                }
            }
        );
    }

    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }
});	
