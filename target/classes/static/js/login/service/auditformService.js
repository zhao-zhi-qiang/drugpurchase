//服务层
app.service('auditformService', function ($http) {

    //查询实体
    this.findOne = function (id) {
        return $http.get('../auditform/findOne?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../auditform/update', entity);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../auditform/search?page=' + page + "&rows=" + rows, searchEntity);
    }

    this.guiDang = function (id) {
        return $http.get("../auditform/guiDang?id=" + id);
    }

});
