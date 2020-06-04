//服务层
app.service('notificationService', function ($http) {

    //修改
    this.update = function (id, state) {
        return $http.get('../notification/update?id=' + id + "&state=" + state);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../notification/search?page=' + page + "&rows=" + rows, searchEntity);
    }

    this.guiDang = function (id) {
        return $http.get("../notification/guiDang?id=" + id);
    }

});
