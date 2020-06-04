//服务层
app.service('pendingService', function ($http) {

    //查询实体
    this.findOne = function (id) {
        return $http.get('../pending/findOne?id=' + id);
    }
    //修改
    this.updateMoney = function (id, state) {
        return $http.get('../pending/updateMoney?id=' + id + "&state=" + state);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../pending/search?page=' + page + "&rows=" + rows, searchEntity);
    }

    this.update = function (id, state) {
        return $http.get('../pending/update?id=' + id + "&state=" + state)
    }

    this.guiDang = function (id) {
        return $http.get("../pending/guiDang?id=" + id);
    }

});
