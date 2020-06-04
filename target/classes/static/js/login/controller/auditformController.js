//控制层
app.controller('auditformController', function ($scope, $controller, auditformService, toaster) {

    $controller('baseController', {$scope: $scope});//继承


    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        auditformService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems = response.total;//更新总记录数
            }
        );
    }

    $scope.hukou = ['农户', '城镇户'];

    $scope.states = ['否', '是'];


    //查询实体
    $scope.findOne = function (id) {
        auditformService.findOne(id).success(
            function (response) {
                $scope.entity = response;
            }
        );
    }

    //录入缴费基数
    $scope.save = function () {
        if ($scope.entity.baseOfPayment == null || $scope.entity.baseOfPayment.length == 0) {
            toaster.pop('error', "请输入缴费基数！");
            return
        }
        var Fromat = /^[0-9]*[1-9][0-9]*$/;
        if (!Fromat.test($scope.entity.baseOfPayment)) {
            toaster.pop('error', "请输入正整数！");
            return;
        }
        auditformService.update($scope.entity).success(
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


    //上传材料
    $scope.upload = function (id) {
        var form = new FormData();
        var file = document.getElementById("file").files[0];
        form.append("file", file);
        console.log(form);
        console.log(file)
        $.ajax({
            url: "../auditform/upload?id=" + id,
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

    //结案归档
    $scope.guiDang = function (id) {
        auditformService.guiDang(id).success(function (response) {
            toaster.pop('success', response.message);
            $scope.reloadList();
        })
    }
});	
