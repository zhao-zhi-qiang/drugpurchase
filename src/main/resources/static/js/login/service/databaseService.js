//服务层
app.service('databaseService', function ($http) {

    //备份数据库
    this.backups = function () {
        return $http.get('../data/backups');
    }


});
