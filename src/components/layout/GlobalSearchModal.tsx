import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  BookOpen,
  FileText,
  FileCheck,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { useLMS } from '../../context/LMSContext';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    courses,
    assignments,
    quizzes,
    discussions,
    notes,
    navigateToCourse,
    navigateToLesson,
    navigateToAssignment,
    navigateToQuiz,
    setCurrentView
  } = useLMS();

  const [filterType, setFilterType] = useState<'all' | 'courses' | 'lessons' | 'assignments' | 'quizzes' | 'discussions'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'course' | 'lesson' | 'assignment' | 'quiz' | 'discussion';
      action: () => void;
      tag?: string;
    }> = [];

    // Courses
    if (filterType === 'all' || filterType === 'courses') {
      courses.forEach(c => {
        if (
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.instructorName.toLowerCase().includes(q)
        ) {
          results.push({
            id: c.id,
            title: c.title,
            subtitle: `${c.subject} • ${c.instructorName} • ${c.difficulty}`,
            type: 'course',
            tag: 'Course',
            action: () => {
              navigateToCourse(c.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    // Lessons
    if (filterType === 'all' || filterType === 'lessons') {
      courses.forEach(c => {
        c.modules.forEach(m => {
          m.lessons.forEach(l => {
            if (
              l.title.toLowerCase().includes(q) ||
              l.description.toLowerCase().includes(q) ||
              (l.textContent && l.textContent.toLowerCase().includes(q))
            ) {
              results.push({
                id: l.id,
                title: l.title,
                subtitle: `${c.title} • Module: ${m.title}`,
                type: 'lesson',
                tag: 'Lesson',
                action: () => {
                  navigateToLesson(c.id, l.id);
                  setIsSearchOpen(false);
                }
              });
            }
          });
        });
      });
    }

    // Assignments
    if (filterType === 'all' || filterType === 'assignments') {
      assignments.forEach(a => {
        if (
          a.title.toLowerCase().includes(q) ||
          a.instructions.toLowerCase().includes(q)
        ) {
          const course = courses.find(c => c.id === a.courseId);
          results.push({
            id: a.id,
            title: a.title,
            subtitle: `${course?.title || 'Assignment'} • Max Pts: ${a.maxPoints}`,
            type: 'assignment',
            tag: 'Assignment',
            action: () => {
              navigateToAssignment(a.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    // Quizzes
    if (filterType === 'all' || filterType === 'quizzes') {
      quizzes.forEach(quiz => {
        if (
          quiz.title.toLowerCase().includes(q) ||
          quiz.description.toLowerCase().includes(q)
        ) {
          const course = courses.find(c => c.id === quiz.courseId);
          results.push({
            id: quiz.id,
            title: quiz.title,
            subtitle: `${course?.title || 'Quiz'} • ${quiz.questions.length} questions • ${quiz.timeLimitMinutes} mins`,
            type: 'quiz',
            tag: 'Quiz',
            action: () => {
              navigateToQuiz(quiz.courseId, quiz.id);
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    // Discussions
    if (filterType === 'all' || filterType === 'discussions') {
      discussions.forEach(d => {
        if (
          d.title.toLowerCase().includes(q) ||
          d.content.toLowerCase().includes(q) ||
          d.tags.some(t => t.toLowerCase().includes(q))
        ) {
          results.push({
            id: d.id,
            title: d.title,
            subtitle: `By ${d.authorName} (${d.authorRole}) • ${d.posts.length} replies`,
            type: 'discussion',
            tag: 'Discussion',
            action: () => {
              setCurrentView('discussions');
              setIsSearchOpen(false);
            }
          });
        }
      });
    }

    return results.slice(0, 12);
  }, [searchQuery, filterType, courses, assignments, quizzes, discussions, navigateToCourse, navigateToLesson, navigateToAssignment, navigateToQuiz, setCurrentView, setIsSearchOpen]);

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'lesson':
        return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'assignment':
        return <FileCheck className="w-4 h-4 text-amber-500" />;
      case 'quiz':
        return <HelpCircle className="w-4 h-4 text-purple-500" />;
      case 'discussion':
        return <MessageSquare className="w-4 h-4 text-sky-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Modal
      isOpen={isSearchOpen}
      onClose={() => setIsSearchOpen(false)}
      maxWidth="2xl"
      showCloseButton={false}
    >
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, lessons, assignments, quizzes, forum posts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-10 py-3.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <kbd className="absolute right-3.5 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'courses', label: 'Courses' },
            { id: 'lessons', label: 'Lessons' },
            { id: 'assignments', label: 'Assignments' },
            { id: 'quizzes', label: 'Assessments' },
            { id: 'discussions', label: 'Discussions' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                filterType === tab.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 pr-1 custom-scrollbar">
          {searchQuery.trim() === '' ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto stroke-1 mb-2 opacity-50" />
              <p className="text-sm font-medium">Type a search keyword to find anything across EduPulse.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs text-slate-500">
                <span>Try searching:</span>
                <span className="cursor-pointer hover:underline text-indigo-600 dark:text-indigo-400" onClick={() => setSearchQuery('Algorithms')}>Algorithms</span>
                <span className="cursor-pointer hover:underline text-indigo-600 dark:text-indigo-400" onClick={() => setSearchQuery('React')}>React</span>
                <span className="cursor-pointer hover:underline text-indigo-600 dark:text-indigo-400" onClick={() => setSearchQuery('Calculus')}>Calculus</span>
                <span className="cursor-pointer hover:underline text-indigo-600 dark:text-indigo-400" onClick={() => setSearchQuery('Neural')}>Neural</span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for "{searchQuery}".</p>
              <p className="text-xs text-slate-500 mt-1">Try another term or adjust your category filter.</p>
            </div>
          ) : (
            searchResults.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="py-3 px-3 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h5>
                      {item.tag && (
                        <Badge size="sm" variant="neutral">
                          {item.tag}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors shrink-0" />
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};
