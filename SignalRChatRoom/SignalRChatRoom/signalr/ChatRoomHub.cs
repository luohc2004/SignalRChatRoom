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
    }
}