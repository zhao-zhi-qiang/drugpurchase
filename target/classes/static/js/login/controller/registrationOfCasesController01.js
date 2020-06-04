//控制层
    app.controller('registrationOfCasesController01', function ($scope, $controller,  registrationOfCasesService, toaster) {
        $controller('baseController', {$scope: $scope});//继承
        //定义药品状态数组
        $scope.nature = ['农业户口', '非农业户口'];
        $scope.searchEntity = {};//定义搜索对象
        //搜索
        $scope.search = function (page, rows) {
            registrationOfCasesService.find(page, rows, $scope.searchEntity).success(
                function (response) {
                    $scope.list = response.rows;
                    $scope.paginationConf.totalItems = response.total;//更新总记录数
                }
            );
        };
        $scope.entity={}
        //编辑历史档案
        $scope.findOne=function (id) {
            console.log(id);
            console.log("controller")
            registrationOfCasesService.findAll(id).success(
                function (response) {
                    $scope.entity = response;
                }
            )
        }


});
