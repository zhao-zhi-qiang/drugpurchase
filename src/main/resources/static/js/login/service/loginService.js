//服务层
app.service('loginService', function ($http) {

    this.check = function (checkCode) {
        return $http.get('../user/check?checkCode=' + checkCode);
    }

    this.findUid = function (uid) {
        return $http.get('../user/findUid?uid=' + uid);
    }


    this.getUserName = function () {
        return $http.get('../user/getUserName');
    }

    this.getRoleName = function () {
        return $http.get('../user/getRoleName');
    }

});
