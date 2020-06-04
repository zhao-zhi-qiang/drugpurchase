//服务层
app.service('registrationOfCasesService', function ($http) {
    //搜索
    this.findPage = function (page, rows, searchEntity) {
        return $http.post('../RegistrationOfCases/search?page=' + page + "&rows=" + rows, searchEntity);
    }
    //增加
    this.insert = function (entity) {
        return $http.post('../ultimate/insert', entity);
    }

    this.findOne = function (id) {
        console.log(id)
        return $http.get('../RegistrationOfCases/findOne?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../RegistrationOfCases/update', entity);
    }
    //删除单个
    this.delete = function (id) {
        return $http.get('../RegistrationOfCases/delete?id=' + id);
    }
    //修改
    this.updateStatus = function (id) {
        return $http.post('../RegistrationOfCases/updateStatus?id=' + id);
    }
    //查询结案归档
    this.find = function (page, rows, searchEntity) {
        return $http.post('../RegistrationOfCases/find?page=' + page + "&rows=" + rows, searchEntity);
    }
    //科长审核
    this.findUltimate = function (page, rows, searchEntity) {
        return $http.post('../ultimate/search?page=' + page + "&rows=" + rows, searchEntity);
    }
    //审核通过
    this.insertR = function (id) {
        console.log(id)
        return $http.get('../RegistrationOfCases/insert?id=' + id);
    }
    
    //审核不通过
    this.deleteOne = function (id) {
        console.log(id)
        return $http.get('../ultimate/delete?id=' + id);
    }
    //编辑历史档案
    this.findAll=function (id) {
        console.log("历史档案")
        return $http.get('../RegistrationOfCases/findAll?id=' + id);
    }
});
