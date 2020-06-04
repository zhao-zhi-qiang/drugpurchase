//控制层
app.controller('notificationController', function ($scope, $controller, notificationService, toaster) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        notificationService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    $scope.hukou = ['农户', '城镇户'];


    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }


    //结案归档
    $scope.guiDang = function (id) {
        notificationService.guiDang(id).success(function (response) {
            toaster.pop('success', response.message);
            $scope.reloadList();
        })
    }

    //更改状态
    $scope.update = function (id, state) {
        notificationService.update(id, state).success(function (response) {
            if (response.success) {
                $scope.pop();
                $scope.reloadList();
            }
        })
    }
});	
