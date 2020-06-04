//服务层
app.service('newformService', function ($http) {

    //查询实体
    this.findOne = function (id) {
        return $http.get('../newform/findOne?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../newform/update', entity);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../newform/search?page=' + page + "&rows=" + rows, searchEntity);
    }


});
