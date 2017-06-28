define(['durandal/system', 'knockout', '../realtimeserver/realtimeserver', 'durandal/app'], function (system, ko, server, app) {
    var ctor = function userNameClass(ko, server, app) {
        this.viewUrl = 'views/username';
        this.name = ko.observable();
        this.checkUserName = function () {
            if (this.name()) {
                system.log('search sever is the name \"' + this.name() + '\" be used');
                return server.checkUserName(this.name());
            } else {
                system.log('name should not be empty');
                return false;
            }
        };
        
        this.done = function () {
            if (this.checkUserName()) {                
                var dialog = require('plugins/dialog');
                dialog.close(this,this.name());
            } else {
                app.showMessage("The name has been used, choose another", "error", ['OK']);
            }
        };
        return this;
    }

    return ctor;
});