define(["durandal/app", "jquery", "durandal/system", "signalRlib", "signalRhub"], function (app, $, system) {
    if (app.fake) {
        var fakeBoardCast = function (msg) {
            system.log("fake cast:" + msg);
            app.trigger('msgReceived', msg);
        };
        var fakeEnterRoomCast = function (userName) {
            system.log("fake cast:" + userName + " Enter the Room");
            app.trigger('msgReceived', { userName: "system", text: userName + "has entered room", timestample: (new Date()).toLocaleTimeString() });
        };
        var fakeCheckUserName = function (userName) {
            system.log("fake check \"" + userName + "\" and return true")
            return true;
        };
        return {
            boardCast: fakeBoardCast,
            enterRoomCast: fakeEnterRoomCast,
            checkUserName: fakeCheckUserName

        };
    }

    //Real Server Side
    system.log("$.connection" + $.connection);
    var chat = $.connection.chatRoomHub;
    chat.client.updateMessages = function (msg) {
        system.log("server cast: " + msg);
        app.trigger('msgReceived', msg);
    };
    system.log("chat:" + chat);
    $.connection.hub.start();
    var boardCast = function () {
        system.log("unimplement yet");
    };
    var enterRoomCast = function () {
        system.log("unimplement yet");
    };
    var checkUserName = function (userName) {
        system.log("check " + userName + "from server");
        return chat.server.checkUserName(userName);
    };
    return {
        boardCast: boardCast,
        enterRoomCast: enterRoomCast,
        checkUserName: checkUserName
    };
});