import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();

  return (
    <div className="tabs tabs-boxed m-2 rounded-xl space-x-2 ">
      <button
        onClick={() => setActiveTab("chats")}
        className={`tab flex-1 rounded-lg transition-all ${
          activeTab === "chats"
            ? "bg-cyan-400 text-black"
            : "bg-cyan-400/20 text-slate-200"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab flex-1 rounded-lg transition-all ${
          activeTab === "contacts"
            ? "bg-cyan-400 text-black"
            : "bg-cyan-400/20 text-slate-200"
        }`}
      >
        Contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
