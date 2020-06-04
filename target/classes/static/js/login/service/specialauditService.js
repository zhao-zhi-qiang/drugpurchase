//服务层
app.service('specialauditService', function ($http) {

    //查询实体
    this.findOne = function (id) {
        return $http.get('../specialaudit/findOne?id=' + id);
    }

    //删除
    this.delete = function (id) {
        return $http.get('../specialaudit/delete?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../specialaudit/update', entity);
    }

    //增加
    this.save = function (entity) {
        return $http.post('../specialaudit/save', entity);
    }


    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../specialaudit/search?page=' + page + "&rows=" + rows, searchEntity);
    }


});
