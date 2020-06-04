//控制层
app.controller('registrationOfCasesController02', function ($scope, $controller, registrationOfCasesService, toaster) {
    $controller('baseController', {$scope: $scope});//继承
    //定义药品状态数组
    $scope.nature = ['农业户口', '非农业户口'];
    $scope.searchEntity = {};//定义搜索对象
    $scope.pop = function () {
        toaster.pop('success', "添加成功");
    }



    //搜索
    $scope.search = function (page, rows) {
        registrationOfCasesService.findUltimate(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    };




    //审核通过
    $scope.insert = function (id) {
        dele = confirm("您确定要执行此操作吗?");
        if(dele==true) {
        var serviceObject;//服务层对象
        registrationOfCasesService.insertR(id).success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $("#bt1").click();
                    $scope.reloadList();
                } else {
                    $("#sp11").html(response.message);
                }
            }
        )
    }}
    //审核不通过
    $scope.deleteOne = function (id) {
        dele = confirm("您确认要执行此操作吗?");
        if(dele==true) {
            registrationOfCasesService.deleteOne(id).success(
                function (response) {
                    if (response.success) {
                        $scope.reloadList();//刷新列表
                    }
                }
            );
        }
    }
});
