import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading,subscribeToMessages,unsubscribeFromMessages } =
    useChatStore();
  const messageEndRef = useRef(null);

  // ✅ Scroll to bottom when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
    subscribeToMessages();
    return ()=> unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-6">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-200"
                  } break-words whitespace-pre-wrap 
                     max-w-[90%] sm:max-w-[80%] md:max-w-[75%]`}
                >
                  {/* ✅ text message */}
                  {msg.text && <p className="mt-1">{msg.text}</p>}

                  {/* ✅ image message */}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Sent"
                      className="mt-2 h-48 w-auto rounded-lg object-cover"
                    />
                  )}

                  {/* ✅ timestamp */}
                  <p className="text-xs items-center gap-1 text-slate-500 mt-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true, // <-- AM/PM format
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          selectedUser && (
            <NoChatHistoryPlaceholder name={selectedUser.fullName} />
          )
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
