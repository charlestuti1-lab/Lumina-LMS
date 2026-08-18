import React, { useState } from 'react';
import {
  FileText,
  Bookmark,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  BookOpen,
  Sparkles,
  Tag,
  Clock,
  Download
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const NotesBookmarksView: React.FC = () => {
  const {
    notes,
    courses,
    currentUser,
    addNote,
    deleteNote,
    navigateToLesson,
    showToast
  } = useLMS();

  const userNotes = notes.filter(n => n.userId === currentUser.id);

  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Note state
  const [newCourseId, setNewCourseId] = useState(courses[0]?.id || '');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('Study Guide');

  // Collect all tags
  const allTags = ['all', ...Array.from(new Set(userNotes.flatMap(n => n.tags)))];

  const filteredNotes = userNotes.filter(note => {
    if (selectedTag !== 'all' && !note.tags.includes(selectedTag)) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        note.content.toLowerCase().includes(q) ||
        note.courseTitle.toLowerCase().includes(q) ||
        note.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const course = courses.find(c => c.id === newCourseId) || courses[0];

    addNote({
      courseId: course.id,
      courseTitle: course.title,
      content: newContent.trim(),
      tags: newTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setIsAddModalOpen(false);
    setNewContent('');
    showToast('success', 'Note Created', 'Study note added to your notebook.');
  };

  const handleExportNotes = () => {
    const text = userNotes
      .map(
        n =>
          `# ${n.courseTitle} - ${n.lessonTitle || 'General'}\nTags: ${n.tags.join(', ')}\nDate: ${n.updatedAt}\n\n${n.content}\n\n---\n`
      )
      .join('\n');
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edupulse_study_notes_${currentUser.name.replace(/\s+/g, '_')}.md`;
    a.click();
    showToast('success', 'Notes Exported', 'Markdown notes file downloaded.');
  };

  const formatTimestamp = (totalSecs?: number) => {
    if (totalSecs === undefined) return '';
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `@ ${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Study Notes & Bookmarks
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review your timestamped lecture takeaways, formulas, and synchronized study notes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportNotes}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Markdown
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {tag === 'all' ? 'All Tags' : `#${tag}`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search notes & content..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <div
            key={note.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block truncate">
                    {note.courseTitle}
                  </span>
                  {note.lessonTitle && (
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                      {note.lessonTitle}
                    </h4>
                  )}
                </div>

                {note.timestampSeconds !== undefined && (
                  <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-mono text-[10px] font-bold rounded">
                    {formatTimestamp(note.timestampSeconds)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {note.tags.map(t => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span>{new Date(note.updatedAt).toLocaleDateString()}</span>

              <div className="flex items-center gap-2">
                {note.lessonId && (
                  <button
                    onClick={() => navigateToLesson(note.courseId, note.lessonId!)}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-lg transition-colors"
                    title="Jump to Lesson"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                  title="Delete Note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEW NOTE MODAL */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        maxWidth="md"
        title="Create Study Note"
      >
        <form onSubmit={handleCreateNote} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Course
            </label>
            <select
              value={newCourseId}
              onChange={e => setNewCourseId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              Note Content
            </label>
            <textarea
              required
              rows={6}
              placeholder="Write your study notes, formulas, equations, or lecture summary..."
              value={newContent}
              onChange={e => setNewContent(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. ExamPrep, Formulas, Chapter4"
              value={newTags}
              onChange={e => setNewTags(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Save Note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
