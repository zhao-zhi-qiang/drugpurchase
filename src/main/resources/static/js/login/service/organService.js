//服务层
app.service('organService', function ($http) {

     //读取列表数据绑定到表单中
    this.findAll=function(){
        return $http.get('../organ/findAll');
    }

    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('../organ/search?page=' + page + "&rows=" + rows, searchEntity);
    }

    //添加
    this.add = function (Entity) {
        return $http.post('../organ/add',Entity);
    }

    //查询实体
    this.findOne = function (id) {
        return $http.get('../organ/findOne?id=' + id);
    }
    //修改
    this.update = function (entity) {
        return $http.post('../organ/update', entity);
    }

    //删除单个
    this.deleteOne = function (id) {
        return $http.get('../organ/deleteOne?id=' + id);
    }
});
