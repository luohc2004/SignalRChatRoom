using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace SignalRChatRoom.signalr
{
    public class ChatRoomHub : Hub
    {
        private HashSet<string> users = new HashSet<string>();
        public bool CheckUserName(string name)
        {
            return !users.Contains(name);
        }

        public void EnterRoomCast(string userName)
        {
            users.Add(userName);
            BoardCast(new { userName = "system", text = userName + " has entered our chat room", timestample = DateTime.Now.ToShortTimeString() });
        }

        public void BoardCast(dynamic msg)
        {
            Clients.All.UpdateMessages(msg);
        }
    }
}