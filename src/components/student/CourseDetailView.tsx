import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Star,
  Users,
  Award,
  CheckCircle2,
  Play,
  FileText,
  HelpCircle,
  Download,
  Lock,
  ChevronDown,
  ChevronUp,
  Share2,
  Bookmark,
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export const CourseDetailView: React.FC = () => {
  const {
    activeCourseId,
    courses,
    enrollments,
    currentUser,
    enrollCourse,
    navigateToLesson,
    navigateToQuiz,
    setCurrentView,
    showToast
  } = useLMS();

  const [activeTab, setActiveTab] = useState<'curriculum' | 'overview' | 'instructor' | 'materials'>('curriculum');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-cs1-1': true,
    'mod-cs1-2': true,
    'mod-math1-1': true
  });

  const course = courses.find(c => c.id === activeCourseId) || courses[0];
  if (!course) return null;

  const enrollment = enrollments.find(
    e => e.courseId === course.id && e.userId === currentUser.id
  );
  const isEnrolled = !!enrollment;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  let totalLessons = 0;
  let totalDurationMinutes = 0;
  course.modules.forEach(m => {
    totalLessons += m.lessons.length;
    m.lessons.forEach(l => {
      totalDurationMinutes += l.durationMinutes;
    });
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('catalog')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Courses
      </button>

      {/* Course Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-indigo-900/50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm" variant="purple" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                {course.subject}
              </Badge>
              <Badge size="sm" variant="info" className="bg-white/10 text-white border-white/20">
                {course.difficulty}
              </Badge>
              {isEnrolled && (
                <Badge size="sm" variant="success" dot className="bg-emerald-500 text-white font-bold">
                  Enrolled ({enrollment.progressPercentage}%)
                </Badge>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
              {course.title}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
              {course.description}
            </p>

            {/* Meta stats */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <img
                  src={course.instructorAvatar}
                  alt={course.instructorName}
                  className="w-8 h-8 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <span className="text-slate-400 block text-[10px]">Instructor</span>
                  <span className="font-bold text-white">{course.instructorName}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating.toFixed(1)}</span>
                <span className="text-slate-400 font-normal">({course.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center gap-1 text-slate-300">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{course.enrolledCount} enrolled</span>
              </div>

              <div className="flex items-center gap-1 text-slate-300">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.estimatedHours} hrs</span>
              </div>
            </div>
          </div>

          {/* Right Card / CTA */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-4">
            <div className="relative h-40 rounded-xl overflow-hidden shadow-md">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 fill-indigo-600 ml-1" />
                </div>
              </div>
            </div>

            {isEnrolled ? (
              <div className="space-y-3">
                <ProgressBar
                  value={enrollment.progressPercentage}
                  label="Your Progress"
                  size="md"
                  variant="gradient"
                />
                <button
                  onClick={() => {
                    const firstModule = course.modules[0];
                    const activeLesson =
                      firstModule?.lessons.find(l => l.id === enrollment.lastAccessedLessonId) ||
                      firstModule?.lessons[0];
                    if (activeLesson) navigateToLesson(course.id, activeLesson.id);
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  {enrollment.progressPercentage >= 100 ? 'Review Lessons' : 'Continue Learning'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-white">Free Access</span>
                  <span className="text-xs text-emerald-300 font-semibold">Included in Tuition</span>
                </div>
                <button
                  onClick={() => enrollCourse(course.id)}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Enroll in Course Now
                </button>
              </div>
            )}

            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-white/10">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full lifetime access to {totalLessons} lessons</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Interactive quizzes & downloadable notes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Certificate of Completion</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course Detail Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          {[
            { id: 'curriculum', label: `Curriculum (${course.modules.length} Modules)` },
            { id: 'overview', label: 'Course Overview' },
            { id: 'instructor', label: 'Instructor Bio' },
            { id: 'materials', label: 'Resources & Downloads' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
                activeTab === t.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* 1. CURRICULUM TAB */}
        {activeTab === 'curriculum' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{course.modules.length} modules • {totalLessons} lessons • {Math.round(totalDurationMinutes / 60)}h total duration</span>
              <button
                onClick={() => {
                  const allExpanded = Object.keys(expandedModules).length === course.modules.length;
                  const next: Record<string, boolean> = {};
                  course.modules.forEach(m => {
                    next[m.id] = !allExpanded;
                  });
                  setExpandedModules(next);
                }}
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Expand / Collapse All
              </button>
            </div>

            <div className="space-y-3">
              {course.modules.map((module, idx) => {
                const isExpanded = expandedModules[module.id] ?? true;
                const completedInModule = module.lessons.filter(l =>
                  enrollment?.completedLessons.includes(l.id)
                ).length;

                return (
                  <div
                    key={module.id}
                    className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs transition-all"
                  >
                    <div
                      onClick={() => toggleModule(module.id)}
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {module.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          {completedInModule} / {module.lessons.length} completed
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40">
                        {module.lessons.map(lesson => {
                          const isDone = enrollment?.completedLessons.includes(lesson.id);

                          return (
                            <div
                              key={lesson.id}
                              onClick={() => navigateToLesson(course.id, lesson.id)}
                              className="p-3.5 pl-6 sm:pl-12 flex items-center justify-between hover:bg-slate-100/70 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border-2 border-slate-300 dark:border-slate-600 shrink-0 group-hover:border-indigo-500" />
                                )}

                                <div>
                                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 transition-colors">
                                    {lesson.title}
                                  </span>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                                    <span className="capitalize">{lesson.type}</span>
                                    <span>•</span>
                                    <span>{lesson.durationMinutes} mins</span>
                                  </div>
                                </div>
                              </div>

                              <button className="px-3 py-1 bg-white dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs">
                                <Play className="w-3 h-3 fill-current" />
                                {isDone ? 'Rewatch' : 'Start'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                About this Course
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {course.description}
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                Learning Objectives & Outcomes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {obj}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Prerequisites
              </h3>
              <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1">
                {course.prerequisites.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 3. INSTRUCTOR TAB */}
        {activeTab === 'instructor' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start gap-6">
            <img
              src={course.instructorAvatar}
              alt={course.instructorName}
              className="w-20 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
            />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {course.instructorName}
              </h3>
              <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                Department of {course.subject}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Senior Academic Faculty and Research Specialist. Over 12 years of university teaching experience focusing on interactive STEM education and foundational mastery.
              </p>
            </div>
          </div>
        )}

        {/* 4. MATERIALS & DOWNLOADS */}
        {activeTab === 'materials' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Course Downloads & Supplementary Materials
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Comprehensive Lecture Slides & Notes (PDF)', size: '14.2 MB', ext: 'PDF' },
                { name: 'Problem Sets & Homework Guide (ZIP)', size: '8.5 MB', ext: 'ZIP' },
                { name: 'Code Samples & Laboratory Templates (GitHub)', size: '2.1 MB', ext: 'ZIP' }
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{item.size} • {item.ext}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast('success', 'Download Started', `Downloading ${item.name}`)}
                    className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
