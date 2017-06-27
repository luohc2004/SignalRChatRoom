define(["durandal/app", "jquery", "durandal/system"], function (app, $, system) {
    var fakeBoardCast = function (msg) {
        app.trigger('msgReceived', msg);
    };
    var fakeEnterRoomCast = function (userName) {
        app.trigger('msgReceived', { userName: "system", text: userName + "has entered room", timestamp: (new Date()).toLocaleTimeString() });
    };
    var fakeCheckUserName = function (userName) {
        return true;
    };
    var boardCast = function () {
        system.log("unimplement yet");
    };
    var enterRoomCast = function () {
        system.log("unimplement yet");
    };
    var checkUserName = function () {
        system.log("unimplement yet");
    };
    if (app.fake) {
        return {
            boardCast: fakeBoardCast,
            enterRoomCast: fakeEnterRoomCast,
            checkUserName: fakeCheckUserName

        };
    } else {
        return {
            boardCast: boardCast,
            enterRoomCast: enterRoomCast,
            checkUserName: checkUserName
        };
    }
});