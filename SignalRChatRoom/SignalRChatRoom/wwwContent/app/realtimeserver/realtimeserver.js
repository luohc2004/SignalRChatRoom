define(["durandal/app", "jquery", "durandal/system"], function (app, $, system) {
    var fakeBoardCast = function (msg) {
        system.log("fake cast:" + msg);
        app.trigger('msgReceived', msg);
    };
    var fakeEnterRoomCast = function (userName) {
        system.log("fake cast:" + userName+" Enter the Room");
        app.trigger('msgReceived', { userName: "system", text: userName + "has entered room", timestample: (new Date()).toLocaleTimeString() });
    };
    var fakeCheckUserName = function (userName) {
        system.log("fake check \""+userName+"\" and return true")
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