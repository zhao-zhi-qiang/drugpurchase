//控制层
app.controller('newformController', function ($scope, $controller, newformService, toaster) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        newformService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    $scope.hukou = ['农户', '城镇户'];

    //查询实体
    $scope.findOne = function (id) {
        newformService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //录入送达日期
    $scope.save = function () {
        if ($scope.entity.serviceTime == null || $scope.entity.serviceTime.length == 0) {
            toaster.pop('error', "请输入送达日期！");
            return
        }
        var DATE_FORMAT = /((?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)|([0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)-02-29)/;
        console.log(DATE_FORMAT.test($scope.entity.serviceTime));
        if (!DATE_FORMAT.test($scope.entity.serviceTime)) {
            toaster.pop('error', "日期格式应为yyyy-MM-dd");
            return;
        }
        newformService.update($scope.entity).success(
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

    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }
});	
