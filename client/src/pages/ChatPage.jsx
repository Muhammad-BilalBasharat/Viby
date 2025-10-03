import BorderAnimatedContainer from "../components/BorderAnimatedContainer"
import { useChatStore } from "../store/useChatStore"
import ProfileHeader from "../components/ProfileHeader"
import ActiveTabSwitch from "../components/ActiveTabSwitch"
import ContactsList from "../components/ContactsList"
import ChatsList from "../components/ChatsList "
import ChatContainer from "../components/ChatContainer"
import NoConversationPlaceholder from "../components/NoConversationPlaceholder"

export const ChatPage = () => {
  const { activeTab, selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="relative w-full h-screen">
      <BorderAnimatedContainer>
        {/* Left Sidebar */}
        <div
          className={`
            w-full md:w-80 bg-slate-800 backdrop-blur-sm flex flex-col
            ${selectedUser ? "hidden md:flex" : "flex"}
          `}
        >
          <ProfileHeader />
          <ActiveTabSwitch />
          <div className="flex-1 overflow-y-auto p-4 WelcomeChat">
            {activeTab === "chats" ? <ChatsList /> : <ContactsList />}
          </div>
        </div>

        {/* Right Chat Section */}
        <div
          className={`
            flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm
            ${!selectedUser ? "hidden md:flex" : "flex"}
          `}
        >
          {selectedUser ? (
            <>
              <ChatContainer />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};
