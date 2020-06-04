//控制层
app.controller('loginController', function ($scope, $controller, loginService, toaster) {

    //成功提示框
    $scope.pop = function () {
        toaster.pop('success', "操作成功");
    }



    $scope.checkCode = "";
    $scope.entity = {uid: "", password: ""};
    //验证验证码是否正确
    $scope.check = function () {
        if ($scope.entity.uid.length == 0) {
            $("#uid").focus();
            $("#sp1").text("账号不可为空！");
            $("#uid").css("border", "1px solid orange");
            return;
        }
        if ($scope.entity.password.length == 0) {
            $("#pw").focus();
            $("#sp2").text("密码不可为空");
            $("#pw").css("border", "1px solid orange");
            return;
        }
        $("#loginForm").submit();
    }


    //验证账户是否存在
    $scope.findUid = function () {
        if ($scope.entity.uid.length == 0) {
            $("#sp1").text("账号不可为空！");
            return;
        }
        loginService.findUid($scope.entity.uid).success(function (response) {
            $("#sp1").text(response.message);
            if (response.success) {
                $("#uid").css("border", "1px solid black");
            } else {
                $("#uid").css("border", "1px solid orange");
            }
        })
    }
    //检验密码
    $scope.checkPw = function () {
        if ($scope.entity.password.length == 0) {
            $("#sp2").text("密码不可为空");
            $("#pw").css("border", "1px solid orange");
        } else {
            $("#sp2").text("");
            $("#pw").css("border", "1px solid black");
        }
    }

    //重置
    $scope.clear = function () {
        $scope.entity = {uid: "", password: ""};
        $scope.checkCode = "";
        $("#sp1").text("");
        $("#sp2").text("");
        $("#checkCode").click();
    }

    //获取角色名
    $scope.getRoleName = function () {
        loginService.getRoleName().success(function (response) {
            $scope.rolenames = response;
        })

    }

    $scope.isInArray = function (array, e) {
        for (i = 0; i < array.length; i++) {
            if (array[i] == e) {
                return true;
            }
        }
        return false;
    }


    //显示密码
    $scope.showPassword = function () {
        $("#pw").prop("type", 'text');
    }

    //隐藏密码
    $scope.hidePassword = function () {
        $("#pw").prop("type", 'password');
    }
    //获取用户名
    $scope.getUserName = function () {
        loginService.getUserName().success(function (response) {
            $scope.loginName = response;
        })
    }

});
