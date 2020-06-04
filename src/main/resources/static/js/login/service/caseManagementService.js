//服务层
app.service('caseManagementService', function ($http) {

    //查询实体
    this.findOne = function (id) {
        return $http.get('../caseManagement/findOne?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../caseManagement/update', entity);
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../caseManagement/search?page=' + page + "&rows=" + rows, searchEntity);
    }

    this.yanshi = function (id) {
        return $http.get('../caseManagement/yanshi?id=' + id);
    }

});
