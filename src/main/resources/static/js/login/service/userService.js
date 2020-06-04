//服务层
app.service('userService', function ($http) {



    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../user/search?page=' + page + "&rows=" + rows, searchEntity);
    }

    //添加
    this.add = function (Entity) {
        return $http.post('../user/add',Entity);
    }

    //查询实体
    this.findOne = function (id) {
        return $http.get('../user/findOne?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../user/update', entity);
    }

    //删除单个
    this.deleteOne = function (id) {
        return $http.get('../user/deleteOne?id=' + id);
    }

});
