//服务层
app.service('roleService', function ($http) {

    //读取列表数据绑定到表单中
    this.findAll = function () {
        return $http.get('../role/findAll');
    }


    //查询选中用户的所有角色
    this.findRoleWithId = function (id) {
        return $http.get('../role/findRoleWithId?id=' + id);
    }

    //修改
    this.update = function (id,roleids) {
        return $http.post('../role/update?id=' + id, roleids);
    }

});
