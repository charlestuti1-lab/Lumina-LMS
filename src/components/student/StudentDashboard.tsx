import React from 'react';
import {
  Flame,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowRight,
  TrendingUp,
  Play,
  FileCheck,
  Target,
  Sparkles,
  ChevronRight,
  Bell,
  Star,
  Share2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { StatCard } from '../common/StatCard';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';

export const StudentDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    assignments,
    submissions,
    quizAttempts,
    goals,
    navigateToCourse,
    navigateToLesson,
    navigateToAssignment,
    setCurrentView,
    enrollCourse,
    showToast
  } = useLMS();

  // Calculations
  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);
  const enrolledCourseIds = userEnrollments.map(e => e.courseId);
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const completedCourses = userEnrollments.filter(e => e.progressPercentage >= 100);

  // Overall progress
  const avgProgress =
    userEnrollments.length > 0
      ? Math.round(
          userEnrollments.reduce((acc, e) => acc + e.progressPercentage, 0) /
            userEnrollments.length
        )
      : 0;

  // Active course (most recently accessed or first in progress)
  const activeEnrollment =
    userEnrollments.find(e => e.progressPercentage < 100) || userEnrollments[0];
  const activeCourse = activeEnrollment
    ? courses.find(c => c.id === activeEnrollment.courseId)
    : courses[0];

  const activeProgress = activeEnrollment?.progressPercentage || 68;
  const activeModule = activeCourse?.modules[0];
  const activeLesson =
    activeModule?.lessons.find(l => l.id === activeEnrollment?.lastAccessedLessonId) ||
    activeModule?.lessons[0];

  // Completed lessons count
  const totalLessonsCompleted = userEnrollments.reduce(
    (acc, e) => acc + e.completedLessons.length,
    0
  );

  // Pending lessons left in active course
  const totalLessonsInActive = activeCourse
    ? activeCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0)
    : 24;
  const lessonsLeftCount = Math.max(
    1,
    totalLessonsInActive - (activeEnrollment?.completedLessons.length || 0)
  );

  // Quiz average
  const userQuizAttempts = quizAttempts.filter(a => a.userId === currentUser.id);
  const quizAvg =
    userQuizAttempts.length > 0
      ? Math.round(
          userQuizAttempts.reduce((acc, a) => acc + a.percentage, 0) /
            userQuizAttempts.length
        )
      : 92;

  // Upcoming assignments
  const upcomingAssignments = assignments
    .filter(a => a.status === 'published')
    .slice(0, 3);

  // Weekly study time bars
  const studyDays = [
    { day: 'M', hours: 2.5, height: '50%' },
    { day: 'T', hours: 3.8, height: '75%' },
    { day: 'W', hours: 4.8, height: '100%', isPeak: true },
    { day: 'T', hours: 3.2, height: '65%' },
    { day: 'F', hours: 2.0, height: '40%' },
    { day: 'S', hours: 2.8, height: '55%' },
    { day: 'S', hours: 1.5, height: '30%' }
  ];

  // Recommended courses
  const recommendedCourses = courses
    .filter(c => !enrolledCourseIds.includes(c.id) && c.status === 'published')
    .slice(0, 2);

  const handleShareProgress = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(
      'success',
      'Credential Link Copied',
      'Your verified academic transcript URL has been copied to your clipboard.'
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* 1. TOP GREETING & STREAK BENTO HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Good morning, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            You have {upcomingAssignments.length} deadlines approaching this week.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Streak: {currentUser.streakDays || 14} Days
            </span>
          </div>

          <button
            onClick={() => setCurrentView('catalog')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 rounded-2xl text-xs font-bold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Explore Courses
          </button>
        </div>
      </div>

      {/* 2. PRIMARY BENTO GRID (12 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* BENTO TILE 1: CURRENTLY LEARNING HERO (8 Columns) */}
        {activeCourse ? (
          <div className="md:col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between relative overflow-hidden min-h-[280px]">
            {/* Subtle soft geometric background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-950/30 rounded-full -mr-28 -mt-28 opacity-70 pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <span className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                  Currently Learning
                </span>
                <h2
                  onClick={() => navigateToCourse(activeCourse.id)}
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
                >
                  {activeCourse.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
                  {activeModule ? `Module: ${activeModule.title}` : activeCourse.description}
                </p>
              </div>

              <button
                onClick={() => {
                  if (activeLesson) {
                    navigateToLesson(activeCourse.id, activeLesson.id);
                  } else {
                    navigateToCourse(activeCourse.id);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 self-start group"
              >
                <Play className="w-4 h-4 fill-white" />
                Continue
              </button>
            </div>

            <div className="mt-8 relative z-10">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-slate-700 dark:text-slate-300">Course Progress</span>
                <span className="text-blue-600 dark:text-blue-400">{activeProgress}%</span>
              </div>

              {/* Bento Progress Track */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-700"
                  style={{ width: `${activeProgress}%` }}
                />
              </div>

              {/* Bento Stat Badges */}
              <div className="mt-6 flex flex-wrap gap-4 sm:gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xs font-bold">
                    {lessonsLeftCount}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Lessons left
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-950/60 flex items-center justify-center text-green-600 dark:text-green-400 text-xs font-bold">
                    02
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Quizzes pending
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                    {activeCourse.estimatedHours}h
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Total workload
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="md:col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm flex flex-col justify-center items-center text-center">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-3" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No active courses in progress
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">
              Explore the accredited syllabus catalog to enroll in courses and begin learning.
            </p>
            <button
              onClick={() => setCurrentView('catalog')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              Browse Course Catalog
            </button>
          </div>
        )}

        {/* BENTO TILE 2: UPCOMING TASKS (4 Columns) */}
        <div className="md:col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Upcoming Tasks
              </h3>
              <button
                onClick={() => setCurrentView('assignments')}
                className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {upcomingAssignments.map((asg, idx) => {
                const sub = submissions.find(
                  s => s.assignmentId === asg.id && s.userId === currentUser.id
                );
                const isSubmitted = !!sub;

                // Alternate chips: QUIZ, SUB, READ
                const tagInfo =
                  idx === 0
                    ? { tag: 'QUIZ', bg: 'bg-purple-100 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300' }
                    : idx === 1
                    ? { tag: 'SUB', bg: 'bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300' }
                    : { tag: 'READ', bg: 'bg-orange-100 text-orange-600 dark:bg-orange-950/60 dark:text-orange-300' };

                return (
                  <div
                    key={asg.id}
                    onClick={() => navigateToAssignment(asg.id)}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/80 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-xs ${tagInfo.bg}`}
                    >
                      {tagInfo.tag}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {asg.title}
                      </p>
                      <p
                        className={`text-[11px] mt-0.5 font-semibold ${
                          isSubmitted
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : idx === 0
                            ? 'text-rose-500'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isSubmitted
                          ? 'Completed'
                          : idx === 0
                          ? 'Due in 4 hours'
                          : `Due ${new Date(asg.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}`}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>{upcomingAssignments.length} assignments active</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              GPA Standing: 3.92
            </span>
          </div>
        </div>

        {/* BENTO TILE 3: WEEKLY ACTIVITY (3 Columns) */}
        <div className="md:col-span-6 lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-4">
              Weekly Activity
            </h3>

            {/* Bento vertical activity bars */}
            <div className="flex items-end justify-between h-28 gap-1.5 px-1">
              {studyDays.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      d.isPeak
                        ? 'bg-blue-600'
                        : i % 2 === 0
                        ? 'bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200'
                        : 'bg-blue-200/80 dark:bg-blue-900/60 hover:bg-blue-300'
                    }`}
                    style={{ height: d.height }}
                    title={`${d.day}: ${d.hours} hours`}
                  />
                  <span className="text-[10px] font-bold text-slate-400">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              4.2h Avg/Day
            </span>
            <span className="text-[11px] text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
              +18% vs wk
            </span>
          </div>
        </div>

        {/* BENTO TILE 4: HIGH-CONTRAST RECOMMENDED FOR YOU (6 Columns Dark Bento) */}
        <div className="md:col-span-12 lg:col-span-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl text-white flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-base text-white">Recommended for you</h3>
              <p className="text-xs text-slate-400">Based on your learning goals & interests</p>
            </div>
            <button
              onClick={() => setCurrentView('catalog')}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              Explore all
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {recommendedCourses.map((rc, idx) => (
              <div
                key={rc.id}
                className="bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center text-white font-bold text-xs ${
                      idx === 0 ? 'bg-indigo-600' : 'bg-pink-600'
                    }`}
                  >
                    {rc.subject.slice(0, 3).toUpperCase()}
                  </div>
                  <p className="font-bold text-xs sm:text-sm mb-1 text-white line-clamp-1">
                    {rc.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mb-3">
                    {rc.estimatedHours}h • {rc.modules.reduce((a, m) => a + m.lessons.length, 0)} Lessons
                  </p>
                </div>

                <button
                  onClick={() => enrollCourse(rc.id)}
                  className={`w-full py-2 rounded-xl text-xs font-bold transition-colors ${
                    idx === 0
                      ? 'bg-white text-slate-900 hover:bg-slate-100'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {idx === 0 ? 'Enroll Now' : 'Quick View'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BENTO TILE 5: SHARE PROGRESS HIGHLIGHT TILE (3 Columns Vibrant Blue Bento) */}
        <div className="md:col-span-6 lg:col-span-3 bg-blue-600 rounded-3xl p-6 shadow-sm text-white flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xs">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
              NEW
            </span>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-1 leading-snug">Share Progress</h4>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              Generate a certified link to share your learning results with employers or instructors.
            </p>
            <button
              onClick={handleShareProgress}
              className="w-full py-2 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-bold transition-colors shadow-2xs"
            >
              Copy Credential Link
            </button>
          </div>
        </div>
      </div>

      {/* 3. SECONDARY BENTO ROW: STATS & LEARNING GOALS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Enrolled Courses"
          value={userEnrollments.length}
          icon={<BookOpen className="w-5 h-5" />}
          subtitle={`${completedCourses.length} completed courses`}
          variant="indigo"
          onClick={() => setCurrentView('my_courses')}
        />
        <StatCard
          label="Overall Progress"
          value={`${avgProgress}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          subtitle="Across enrolled subjects"
          variant="emerald"
          onClick={() => setCurrentView('progress')}
        />
        <StatCard
          label="Quiz Average"
          value={`${quizAvg}%`}
          icon={<Award className="w-5 h-5" />}
          subtitle="Grade A Standing"
          variant="purple"
          onClick={() => setCurrentView('assessments')}
        />
        <StatCard
          label="Total Study Time"
          value="21.7 hrs"
          icon={<Clock className="w-5 h-5" />}
          subtitle="+4.2 hrs vs last week"
          variant="amber"
          trend={{ value: '+18%', isPositive: true }}
          onClick={() => setCurrentView('progress')}
        />
      </div>
    </div>
  );
};
