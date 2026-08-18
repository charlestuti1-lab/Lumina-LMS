import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  User,
  CheckCheck,
  Sparkles,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const MessagesView: React.FC = () => {
  const {
    currentUser,
    users,
    messages,
    sendMessage,
    markMessageRead
  } = useLMS();

  // Find other users to chat with
  const otherUsers = users.filter(u => u.id !== currentUser.id);
  const [selectedUserId, setSelectedUserId] = useState<string>(otherUsers[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');

  const selectedUser = users.find(u => u.id === selectedUserId) || otherUsers[0];

  // Conversation messages
  const conversation = messages
    .filter(
      m =>
        (m.senderId === currentUser.id && m.receiverId === selectedUser?.id) ||
        (m.senderId === selectedUser?.id && m.receiverId === currentUser.id)
    )
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedUser) return;

    sendMessage(selectedUser.id, inputText.trim());
    setInputText('');
  };

  const filteredUsers = otherUsers.filter(u => {
    if (search) {
      return (
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Direct Messages & Office Hours
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Chat directly with course instructors, academic advisors, and peers
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs grid grid-cols-1 md:grid-cols-12 h-[650px]">
        {/* Left contacts list (4 cols) */}
        <div className="md:col-span-4 border-r border-slate-200/80 dark:border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search people..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 custom-scrollbar">
            {filteredUsers.map(user => {
              const isSelected = user.id === selectedUser?.id;
              const unread = messages.filter(
                m => m.senderId === user.id && m.receiverId === currentUser.id && !m.read
              ).length;

              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`p-3.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </span>
                        <Badge
                          size="sm"
                          variant={
                            user.role === 'teacher'
                              ? 'success'
                              : user.role === 'admin'
                              ? 'purple'
                              : 'info'
                          }
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {user.title || user.gradeLevel}
                      </p>
                    </div>
                  </div>

                  {unread > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-600 text-white rounded-full">
                      {unread}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Chat panel (8 cols) */}
        {selectedUser ? (
          <div className="md:col-span-8 flex flex-col justify-between bg-slate-50/30 dark:bg-slate-900/30">
            {/* Chat header */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedUser.name}
                  </h3>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Online & Active
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages bubbles area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-3 custom-scrollbar">
              {conversation.length === 0 ? (
                <div className="py-20 text-center text-slate-400 text-xs">
                  <MessageSquare className="w-8 h-8 mx-auto stroke-1 mb-2 opacity-50" />
                  <p>Send a message to start this academic conversation.</p>
                </div>
              ) : (
                conversation.map(msg => {
                  const isMe = msg.senderId === currentUser.id;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700 rounded-bl-xs shadow-2xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input composer */}
            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <input
                type="text"
                required
                placeholder={`Message ${selectedUser.name}...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
