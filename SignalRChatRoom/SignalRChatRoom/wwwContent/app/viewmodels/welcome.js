define(['knockout', '../realtimeserver/realtimeserver', 'durandal/app', 'durandal/system', './username'], function (ko, server, app, system, userNameClass) {
    var config = {};
    config.displayName = "SignalR Chat Room";
    config.welcomeWord = "Welcome to SignalR Chat Room where you can utilize the coolest function of signalR to live chat with other user";
    var messages = ko.observableArray();
    var myMessage = ko.observable();
    var userName = new userNameClass(ko, server, app);
    var activate = function () {
        if (!userName.name()) {
            system.log('wait user input userName ');
            app.showDialog(userName).then(function (dialogResult) {
                if (dialogResult || dialogResult == 'OK') {
                    app.on('msgReceived').then(function (msg) {
                        system.log(msg);
                        messages.push(msg);
                    }, this);
                    server.enterRoomCast(userName.name());
                }
            });
        }
    };

    var sendMsg = function () {
        server.boardCast({ userName: userName.name, text: myMessage, timestample: (new Date()).toLocaleTimeString() });
    };


    return {
        displayName: config.displayName,
        welcomeWord: config.welcomeWord,
        messages: messages,
        userName: userName.name(),
        activate: activate,
        myMessage: myMessage,
        sendMsg: sendMsg
    };
});