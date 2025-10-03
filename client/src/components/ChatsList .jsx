import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, setSelectedUser } = useChatStore();
  const {onlineUsers}=useAuthStore();
  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex flex-col gap-3 mt-3 w-full max-w-sm mx-auto">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id)?"avatar-online":"avatar-offline"}`}>
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={chat.profilePic || "/avatar.png"}
                  alt={chat.fullName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ChatsList;
