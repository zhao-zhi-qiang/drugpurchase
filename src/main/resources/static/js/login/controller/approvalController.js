//控制层
app.controller('approvalController', function ($scope, $controller, approvalService, toaster) {
    $controller('baseController', {$scope: $scope});//继承
    //定义药品状态数组
    $scope.nature = ['农业户口', '非农业户口'];
    $scope.searchEntity = {};//定义搜索对象
    //搜索
    $scope.search = function (page, rows) {
        approvalService.findPage(page, rows, $scope.searchEntity).success(
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
    //审批通过
    $scope.updateStatusYes = function (id) {
        dele = confirm("审批通过将不允许再次修改，您确定要执行此操作吗?");
        if (dele == true) {
            approvalService.updateStatusYes(id).success(
                function (response) {
                    if (response.success) {
                        $scope.reloadList();//刷新列表
                    }
                }
            );
        }
    }

    $scope.entity = {"registrationOfCasesId": ""};
    //审批不通过
    $scope.updateStatusNo = function (id) {
        console.log(id);
        $scope.entity.registrationOfCasesId = id;
    }

    //添加退货单之后的保存
    $scope.baoCun = function () {
        if ($scope.entity.causeOfAction == null || $scope.entity.causeOfAction == "") {
            $("#sp1").text("案由不能为空");
            return;
        }
        if ($scope.entity.reasonsForTermination == null || $scope.entity.reasonsForTermination == "") {
            $("#sp1").text("终止执行原因不能为空");
            return;
        }
        if ($scope.entity.investigatorViews == null || $scope.entity.investigatorViews == "") {
            $("#sp1").text("调察人意见不能为空");
            return;
        }
        if ($scope.entity.responsibleOpinions == null || $scope.entity.responsibleOpinions == "") {
            $("#sp1").text("负责人意见不能为空");
            return;
        }
        approvalService.updateStatusNo($scope.entity).success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $("#bt1").click();
                    $scope.reloadList();
                }
            }
        );
    }


});
