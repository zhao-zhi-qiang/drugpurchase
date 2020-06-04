//控制层
app.controller('enforcementController', function ($scope, $controller, enforcementService, toaster) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        enforcementService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    $scope.hukou = ['农户', '城镇户'];


    //查询实体
    $scope.findOne = function (id) {
        enforcementService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }

    //结案归档
    $scope.guiDang = function (id) {
        enforcementService.guiDang(id).success(function (response) {
            toaster.pop('success', response.message);
            $scope.reloadList();
        })
    }
});	
