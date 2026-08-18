import React, { useState } from 'react';
import {
  MessagesSquare,
  Search,
  Plus,
  ThumbsUp,
  MessageSquare,
  Pin,
  CheckCircle2,
  Send,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const DiscussionsView: React.FC = () => {
  const {
    discussions,
    courses,
    currentUser,
    createDiscussionThread,
    replyToDiscussion,
    likeDiscussionPost,
    showToast
  } = useLMS();

  const [search, setSearch] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(discussions[0]?.id || null);
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);

  // New thread form
  const [newTitle, setNewTitle] = useState('');
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Algorithms, Trees');

  // Reply text
  const [replyText, setReplyText] = useState('');

  const activeThread = discussions.find(
    d => d.id === (selectedThreadId || discussions[0]?.id)
  );

  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    createDiscussionThread({
      courseId: newCourseId,
      title: newTitle,
      content: newContent,
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsNewThreadOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThread) return;

    replyToDiscussion(activeThread.id, replyText.trim());
    setReplyText('');
  };

  const filteredThreads = discussions.filter(d => {
    if (search) {
      const q = search.toLowerCase();
      return (
        d.title.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Course Discussions & Forums
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ask technical questions, discuss theoretical topics with professors, and collaborate with classmates
          </p>
        </div>

        <button
          onClick={() => setIsNewThreadOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          New Discussion Thread
        </button>
      </div>

      {/* Main Grid: Thread list on left (5 cols), Thread discussion on right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Thread List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search forum threads & tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-2.5">
            {filteredThreads.map(thread => {
              const isSelected = activeThread?.id === thread.id;

              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {thread.isPinned && (
                        <Pin className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      )}
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                        {thread.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {thread.content}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {thread.authorName} ({thread.authorRole})
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {thread.posts.length} replies
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Discussion Thread */}
        {activeThread && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Thread Header */}
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  {activeThread.tags.map(t => (
                    <Badge key={t} size="sm" variant="purple">
                      {t}
                    </Badge>
                  ))}
                  {activeThread.isPinned && (
                    <Badge size="sm" variant="warning">
                      Pinned by Professor
                    </Badge>
                  )}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                  {activeThread.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {activeThread.authorName}
                  </span>
                  <span>•</span>
                  <span>{new Date(activeThread.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {activeThread.content}
                </div>
              </div>

              {/* Replies list */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Replies & Answers ({activeThread.posts.length})
                </h4>

                {activeThread.posts.map(post => (
                  <div
                    key={post.id}
                    className={`p-4 rounded-xl border space-y-2 ${
                      post.isAnswer
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {post.authorName}
                        </span>
                        <Badge
                          size="sm"
                          variant={post.authorRole === 'teacher' ? 'success' : 'info'}
                        >
                          {post.authorRole}
                        </Badge>
                      </div>

                      {post.isAnswer && (
                        <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accepted Solution</span>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span>{new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <button
                        onClick={() => likeDiscussionPost(activeThread.id, post.id)}
                        className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>{post.likesCount}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Post Reply Box */}
            <form onSubmit={handlePostReply} className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <input
                type="text"
                required
                placeholder="Write your constructive reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-xs shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* CREATE THREAD MODAL */}
      <Modal
        isOpen={isNewThreadOpen}
        onClose={() => setIsNewThreadOpen(false)}
        maxWidth="lg"
        title="Start a New Forum Thread"
      >
        <form onSubmit={handleCreateThread} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Thread Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Question about dynamic programming memoization table"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Associated Course
            </label>
            <select
              value={newCourseId}
              onChange={e => setNewCourseId(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Question Details & Context
            </label>
            <textarea
              required
              rows={5}
              placeholder="Explain what you are trying to solve and where you need clarification..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Topic Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Graph, Dijkstra, Homework3"
              value={newTags}
              onChange={e => setNewTags(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewThreadOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Publish Thread
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
