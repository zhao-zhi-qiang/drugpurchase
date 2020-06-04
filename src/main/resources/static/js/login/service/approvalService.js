//服务层
app.service('approvalService', function ($http) {
    //搜索
    this.findPage = function (page, rows, searchEntity) {
        return $http.post('../Approval/search?page=' + page + "&rows=" + rows, searchEntity);
    }
    //审批通过
    this.updateStatusYes = function (id) {
        return $http.get('../Approval/updateStatusYes?id=' + id);
    }
    //审批不通过
    this.updateStatusNo = function (entity) {
        return $http.post('../Approval/updateStatusNo' ,entity);
    }
});
