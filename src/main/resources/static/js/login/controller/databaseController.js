//控制层
app.controller('databaseController', function ($scope, $controller,databaseService, toaster) {

    $controller('baseController', {$scope: $scope});//继承

    //删除单个
    $scope.backups = function () {
        databaseService.backups().success(
            function (response) {
                if (response.success) {
                    $scope.pop();
                    $scope.reloadList();//刷新列表
                }
            }
        );
    }

    //导入
    $scope.upload = function () {
        var form = new FormData();
        var file = document.getElementById("file").files[0];
        form.append("file", file);
        console.log(form);
        console.log(file);
        $.ajax({
            url: "../data/reduction",
            type: "post",
            data: form,
            datatype: "json",
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                var file1 = $("#file");
                file1.after(file1.clone().val(""))
                file1.remove();
                $scope.messageText = response.message;
            }

        })
    }

    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }
});	
