define(['knockout', '../realtimeserver/realtimeserver', 'durandal/app', 'durandal/system'], function (ko, server, app, system) {
    var config = {};
    config.displayName = "SignalR Chat Room";
    config.welcomeWord = "Welcome to SignalR Chat Room where you can utilize the coolest function of signalR to live chat with other user";
    var messages = ko.observableArray();
    var myMessage = ko.observable();
    var userName = new userName(ko, server, app);
    var activate = function () {
        if (!userName.name()) {
            system.log('wait user input userName ');
            app.showDialog(userName, ['OK', 'reset']).then(server.enterRoom(userName.name()));
        }
    };

    var sendMsg = function () {
        server.boardCast({userName:userName.name,text:myMessage,timestample:(new Date()).toLocaleTimeString()});
    };

    function userName(ko, server, app) {
        this.viewUrl = 'views/username';
        this.name = ko.observable();
        this.checkUserName = function () {
            if (name()) {
                return server.checkUserName(name());
            } else {
                return false;
            }
        };
        this.canDeactivate = function () {
            if (!checkUserName()) {
                app.showDialog("Fill in a unused user name for you and go on");
                return false;
            };
        };
        this.reset = function () {
            system.log("reset");
            this.name("");
        };
        this.done = function () {
            system.log("done");
            this.close();
        };
        return this;
    }

    return {
        displayName: config.displayName,
        welcomeWord: config.welcomeWord,
        messages: messages,
        userName: userName,
        activate: activate,
        myMessage: myMessage,
        sendMsg:sendMsg
    };
});