import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  Maximize2,
  FileText,
  MessageSquare,
  Bookmark,
  Sparkles,
  Download,
  Plus,
  BookOpen,
  Send,
  Trash2
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const LessonPlayerView: React.FC = () => {
  const {
    activeCourseId,
    activeLessonId,
    courses,
    enrollments,
    currentUser,
    markLessonComplete,
    navigateToLesson,
    navigateToCourse,
    addNote,
    notes,
    deleteNote,
    showToast
  } = useLMS();

  const [activeTab, setActiveTab] = useState<'content' | 'notes' | 'discussion' | 'resources'>('content');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [videoProgress, setVideoProgress] = useState(35); // 35%
  const [newNoteText, setNewNoteText] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Find course and current lesson
  const course = courses.find(c => c.id === activeCourseId) || courses[0];
  const allLessons = useMemo(() => {
    if (!course) return [];
    return course.modules.flatMap(m => m.lessons);
  }, [course]);

  const currentLessonIndex = allLessons.findIndex(l => l.id === activeLessonId);
  const lesson = allLessons[currentLessonIndex >= 0 ? currentLessonIndex : 0];

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const enrollment = enrollments.find(
    e => e.courseId === course?.id && e.userId === currentUser.id
  );
  const isLessonComplete = enrollment?.completedLessons.includes(lesson?.id || '');

  // Filter notes for this lesson
  const lessonNotes = notes.filter(
    n => n.userId === currentUser.id && n.lessonId === lesson?.id
  );

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !course || !lesson) return;
    addNote({
      courseId: course.id,
      courseTitle: course.title,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      timestampSeconds: Math.floor((videoProgress / 100) * (lesson.durationMinutes * 60)),
      content: newNoteText.trim(),
      tags: [course.subject]
    });
    setNewNoteText('');
    showToast('success', 'Note Saved', 'Your study note was saved with video timestamp.');
  };

  const handleCompleteAndNext = () => {
    if (course && lesson) {
      markLessonComplete(course.id, lesson.id);
      if (nextLesson) {
        navigateToLesson(course.id, nextLesson.id);
      } else {
        showToast('success', 'Course Complete!', 'Congratulations on completing all lessons!');
      }
    }
  };

  if (!course || !lesson) return null;

  const formatTimestamp = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-950 text-white animate-fade-in overflow-hidden">
      {/* Top Navbar */}
      <div className="h-14 px-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigateToCourse(course.id)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Back to Course Overview"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0">
            <h2 className="text-xs font-bold text-slate-400 truncate">
              {course.title}
            </h2>
            <h1 className="text-sm font-extrabold text-white truncate">
              {lesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Previous / Next buttons */}
          <button
            disabled={!prevLesson}
            onClick={() => prevLesson && navigateToLesson(course.id, prevLesson.id)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition-colors"
            title="Previous Lesson"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            disabled={!nextLesson}
            onClick={() => nextLesson && navigateToLesson(course.id, nextLesson.id)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-200 transition-colors"
            title="Next Lesson"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Mark Complete */}
          <button
            onClick={handleCompleteAndNext}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isLessonComplete
                ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isLessonComplete ? 'Completed' : 'Mark Complete'}
          </button>

          {/* Toggle Sidebar */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors hidden lg:flex items-center gap-1.5 ${
              isSidebarOpen
                ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Syllabus</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Video Player & Content Tabs */}
        <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {/* 16:9 Video Canvas */}
          <div className="relative bg-black w-full aspect-video max-h-[55vh] flex items-center justify-center group">
            {lesson.videoUrl ? (
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-8">
                <FileText className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold">Interactive Reading & Lab Session</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Read through the detailed guide and instructions below.
                </p>
              </div>
            )}
          </div>

          {/* Video Control Bar Simulation */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 text-white hover:text-indigo-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="text-white">
                  {formatTimestamp(Math.floor((videoProgress / 100) * (lesson.durationMinutes * 60)))}
                </span>
                <span>/</span>
                <span>{lesson.durationMinutes}:00</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Playback speed selector */}
              <div className="flex items-center gap-1">
                {[1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      playbackSpeed === speed
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              <Volume2 className="w-4 h-4 text-slate-400" />
              <Maximize2 className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Tabs Navigation (Content, Notes, Discussion, Resources) */}
          <div className="px-6 pt-4 border-b border-slate-800 bg-slate-950 flex items-center gap-4 shrink-0">
            {[
              { id: 'content', label: 'Lesson Notes & Guide', icon: <FileText className="w-4 h-4" /> },
              {
                id: 'notes',
                label: `My Timestamped Notes (${lessonNotes.length})`,
                icon: <Bookmark className="w-4 h-4" />
              },
              { id: 'discussion', label: 'Lesson Q&A', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'resources', label: 'Attachments', icon: <Download className="w-4 h-4" /> }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`pb-3 text-xs font-bold flex items-center gap-2 border-b-2 transition-all ${
                  activeTab === t.id
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 bg-slate-950 flex-1">
            {/* 1. LECTURE CONTENT GUIDE */}
            {activeTab === 'content' && (
              <div className="max-w-3xl space-y-6 text-slate-300">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{lesson.title}</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">{lesson.description}</p>
                </div>

                <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 leading-relaxed text-sm">
                  <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
                    Core Concepts Covered
                  </h3>
                  <p>
                    {lesson.textContent ||
                      'In this lecture, we explore the fundamental principles of algorithmic complexity and data structures. We examine asymptotic growth rates, worst-case versus amortized performance, and practical trade-offs in modern memory architectures.'}
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-400 pt-2">
                    <li>Asymptotic Big-O and Theta mathematical classifications</li>
                    <li>Analyzing recursive tree call-stacks and recursion relations</li>
                    <li>Space complexity tradeoffs in array and pointer-based implementations</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 2. MY TIMESTAMPED NOTES */}
            {activeTab === 'notes' && (
              <div className="max-w-3xl space-y-6">
                <form onSubmit={handleSaveNote} className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-white">Add a New Timestamped Note</span>
                    <span className="font-mono bg-slate-800 px-2 py-0.5 rounded text-indigo-400">
                      @ {formatTimestamp(Math.floor((videoProgress / 100) * (lesson.durationMinutes * 60)))}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Write your key takeaway, formula, or question here..."
                    value={newNoteText}
                    onChange={e => setNewNoteText(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Save Study Note
                    </button>
                  </div>
                </form>

                <div className="space-y-3">
                  {lessonNotes.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">
                      No notes created for this lesson yet. Type above to add one!
                    </p>
                  ) : (
                    lessonNotes.map(n => (
                      <div
                        key={n.id}
                        className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-start justify-between gap-4"
                      >
                        <div>
                          {n.timestampSeconds !== undefined && (
                            <span className="inline-block px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-800 rounded font-mono text-[10px] mb-1.5 font-bold">
                              {formatTimestamp(n.timestampSeconds)}
                            </span>
                          )}
                          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                            {n.content}
                          </p>
                          <span className="text-[10px] text-slate-500 mt-2 block">
                            Saved {new Date(n.updatedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <button
                          onClick={() => deleteNote(n.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* 3. DISCUSSION */}
            {activeTab === 'discussion' && (
              <div className="max-w-3xl space-y-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Ask a question or share a thought on this lecture..."
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => showToast('success', 'Question Posted', 'Instructor & classmates will receive a notification.')}
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">David K. (Student)</span>
                      <span className="text-[10px] text-slate-400">2 days ago</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      At 12:45, does the worst case time complexity change if we switch from a binary search tree to an AVL self-balancing tree?
                    </p>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 mt-2 text-xs">
                      <span className="font-bold text-indigo-400 block mb-1">
                        Prof. Alan Turing (Instructor)
                      </span>
                      <p className="text-slate-300">
                        Yes! With AVL trees, self-balancing rotations guarantee O(log N) lookup in the worst case, avoiding the degenerate O(N) linked-list state.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RESOURCES */}
            {activeTab === 'resources' && (
              <div className="max-w-3xl space-y-3">
                {[
                  { name: 'Lecture Transcripts & Code Sandbox.zip', size: '1.4 MB' },
                  { name: 'Practice Worksheet & Solutions.pdf', size: '640 KB' }
                ].map((res, i) => (
                  <div
                    key={i}
                    className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-indigo-400" />
                      <div>
                        <h4 className="text-xs font-bold text-white">{res.name}</h4>
                        <span className="text-[10px] text-slate-400">{res.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => showToast('success', 'Download Complete', `Saved ${res.name}`)}
                      className="p-2 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Course Curriculum Drawer */}
        {isSidebarOpen && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Course Syllabus
              </h3>
              <p className="text-xs font-semibold text-white truncate mt-0.5">
                {course.title}
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 block px-2">
                    Module {modIdx + 1}: {mod.title}
                  </span>

                  <div className="space-y-1">
                    {mod.lessons.map(l => {
                      const isCurrent = l.id === lesson.id;
                      const isDone = enrollment?.completedLessons.includes(l.id);

                      return (
                        <div
                          key={l.id}
                          onClick={() => navigateToLesson(course.id, l.id)}
                          className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer text-xs transition-all ${
                            isCurrent
                              ? 'bg-indigo-600 text-white font-bold'
                              : 'hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <Play className={`w-3.5 h-3.5 shrink-0 ${isCurrent ? 'fill-white' : 'text-slate-500'}`} />
                            )}
                            <span className="truncate">{l.title}</span>
                          </div>

                          <span className={`text-[10px] shrink-0 ${isCurrent ? 'text-indigo-200' : 'text-slate-500'}`}>
                            {l.durationMinutes}m
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
