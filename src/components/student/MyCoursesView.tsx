import React, { useState } from 'react';
import {
  BookOpen,
  Play,
  Award,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';

export const MyCoursesView: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    navigateToCourse,
    navigateToLesson,
    setCurrentView
  } = useLMS();

  const [tab, setTab] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);
  const enrolledCourseIds = userEnrollments.map(e => e.courseId);
  const userCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  // Filter logic
  const filteredCourses = userCourses.filter(course => {
    const enrollment = userEnrollments.find(e => e.courseId === course.id);
    const progress = enrollment?.progressPercentage || 0;

    // Tab filter
    if (tab === 'in_progress' && progress >= 100) return false;
    if (tab === 'completed' && progress < 100) return false;

    // Subject filter
    if (selectedSubject !== 'all' && course.subject !== selectedSubject) return false;

    // Search filter
    if (
      search &&
      !course.title.toLowerCase().includes(search.toLowerCase()) &&
      !course.instructorName.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  const subjects = ['all', ...Array.from(new Set(userCourses.map(c => c.subject)))];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header with Title and Catalog CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            My Courses
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your enrolled courses, resume active modules, and view certificates
          </p>
        </div>

        <button
          onClick={() => setCurrentView('catalog')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          Explore More Courses
        </button>
      </div>

      {/* Tabs and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {[
            { id: 'all', label: `All (${userCourses.length})` },
            {
              id: 'in_progress',
              label: `In Progress (${userEnrollments.filter(e => e.progressPercentage < 100).length})`
            },
            {
              id: 'completed',
              label: `Completed (${userEnrollments.filter(e => e.progressPercentage >= 100).length})`
            }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === t.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search & Subject Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search my courses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {subjects.map(subj => (
              <option key={subj} value={subj}>
                {subj === 'all' ? 'All Subjects' : subj}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No courses found"
          description={
            userCourses.length === 0
              ? 'You are not currently enrolled in any courses. Check out the catalog to find exciting courses!'
              : 'No courses matched your current filter criteria.'
          }
          actionText={userCourses.length === 0 ? 'Browse Catalog' : 'Clear Filters'}
          onAction={
            userCourses.length === 0
              ? () => setCurrentView('catalog')
              : () => {
                  setTab('all');
                  setSearch('');
                  setSelectedSubject('all');
                }
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const enrollment = userEnrollments.find(e => e.courseId === course.id);
            const progress = enrollment?.progressPercentage || 0;
            const isComplete = progress >= 100;

            const firstModule = course.modules[0];
            const activeLesson =
              firstModule?.lessons.find(l => l.id === enrollment?.lastAccessedLessonId) ||
              firstModule?.lessons[0];

            let totalLessons = 0;
            course.modules.forEach(m => {
              totalLessons += m.lessons.length;
            });

            return (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <Badge size="sm" variant="neutral" className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs font-bold">
                        {course.subject}
                      </Badge>
                    </div>

                    {isComplete && (
                      <div className="absolute top-3 right-3">
                        <Badge size="sm" variant="success" dot className="bg-emerald-500 text-white font-bold">
                          Completed
                        </Badge>
                      </div>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <span className="flex items-center gap-1 font-medium text-slate-200">
                        <Clock className="w-3.5 h-3.5" />
                        {course.estimatedHours} Hours
                      </span>
                      <span className="font-semibold text-emerald-400">
                        {enrollment?.completedLessons.length || 0} / {totalLessons} Lessons
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3
                        onClick={() => navigateToCourse(course.id)}
                        className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer"
                      >
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Instructor: {course.instructorName}
                      </p>
                    </div>

                    {/* Next Lesson Box */}
                    {activeLesson && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 text-xs">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                          {isComplete ? 'Finished' : 'Current Lesson'}
                        </span>
                        <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">
                          {activeLesson.title}
                        </span>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <ProgressBar
                        value={progress}
                        label="Course Progress"
                        size="md"
                        variant={isComplete ? 'success' : 'primary'}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (activeLesson) navigateToLesson(course.id, activeLesson.id);
                      else navigateToCourse(course.id);
                    }}
                    className="flex-1 py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {isComplete ? 'Review Content' : 'Resume Lesson'}
                  </button>

                  {isComplete && (
                    <button
                      onClick={() => setCurrentView('certificates')}
                      className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900 rounded-xl transition-colors"
                      title="View Certificate"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
