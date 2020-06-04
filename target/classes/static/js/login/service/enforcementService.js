//服务层
app.service('enforcementService', function ($http) {

    //查询实体
    this.findOne = function (id) {
        return $http.get('../enforcement/findOne?id=' + id);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../enforcement/search?page=' + page + "&rows=" + rows, searchEntity);
    }


    this.guiDang = function (id) {
        return $http.get("../enforcement/guiDang?id=" + id);
    }

});
