import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  Users,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { CourseDifficulty } from '../../types';

export const CourseCatalogView: React.FC = () => {
  const {
    courses,
    enrollments,
    currentUser,
    enrollCourse,
    navigateToCourse,
    navigateToLesson
  } = useLMS();

  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'title'>('popular');

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);

  // Subject categories list
  const subjects = [
    'all',
    'Computer Science',
    'Mathematics',
    'Physics',
    'Biology'
  ];

  const filteredCourses = useMemo(() => {
    return courses
      .filter(c => c.status === 'published')
      .filter(course => {
        if (selectedSubject !== 'all' && course.subject !== selectedSubject) return false;
        if (selectedDifficulty !== 'all' && course.difficulty !== selectedDifficulty) return false;
        if (search) {
          const q = search.toLowerCase();
          return (
            course.title.toLowerCase().includes(q) ||
            course.description.toLowerCase().includes(q) ||
            course.instructorName.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return a.title.localeCompare(b.title);
      });
  }, [courses, selectedSubject, selectedDifficulty, search, sortBy]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-8 sm:p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-300 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Discover Knowledge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight">
            Explore Course Catalog
          </h1>
          <p className="text-sm text-indigo-200/90 leading-relaxed">
            Choose from comprehensive, university-grade courses taught by world-class educators with interactive video lectures, coding labs, quizzes, and formal certificates.
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-4">
        {/* Top Row: Search & Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, topic, or instructor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
            >
              <option value="popular">Most Enrolled (Popular)</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest Releases</option>
              <option value="title">Course Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Bottom Row: Subject and Difficulty Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              Subject:
            </span>
            {subjects.map(subj => (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedSubject === subj
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {subj === 'all' ? 'All Subjects' : subj}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 mr-1 hidden sm:inline">
              Level:
            </span>
            {['all', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {diff === 'all' ? 'All Levels' : diff}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const enrollment = userEnrollments.find(e => e.courseId === course.id);
          const isEnrolled = !!enrollment;

          let totalLessons = 0;
          course.modules.forEach(m => {
            totalLessons += m.lessons.length;
          });

          return (
            <div
              key={course.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Banner Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <Badge size="sm" variant="neutral" className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs font-bold">
                      {course.subject}
                    </Badge>
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge
                      size="sm"
                      variant={
                        course.difficulty === 'Beginner'
                          ? 'success'
                          : course.difficulty === 'Intermediate'
                          ? 'warning'
                          : 'danger'
                      }
                      className="font-bold bg-white/95 dark:bg-slate-900/95"
                    >
                      {course.difficulty}
                    </Badge>
                  </div>

                  {isEnrolled && (
                    <div className="absolute bottom-3 right-3">
                      <Badge size="sm" variant="success" dot className="bg-emerald-500 text-white font-bold">
                        Enrolled ({enrollment.progressPercentage}%)
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 flex items-center gap-3 text-white text-xs">
                    <span className="flex items-center text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-300">
                      ({course.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3
                      onClick={() => navigateToCourse(course.id)}
                      className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {course.subtitle || course.description}
                    </p>
                  </div>

                  {/* Instructor row */}
                  <div className="flex items-center gap-2.5 pt-2">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                      {course.instructorName}
                    </span>
                  </div>

                  {/* Metadata stats */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {course.estimatedHours} hrs total
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      {totalLessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {course.enrolledCount} students
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 flex items-center gap-2">
                {isEnrolled ? (
                  <button
                    onClick={() => {
                      const firstModule = course.modules[0];
                      const activeLesson =
                        firstModule?.lessons.find(l => l.id === enrollment.lastAccessedLessonId) ||
                        firstModule?.lessons[0];
                      if (activeLesson) navigateToLesson(course.id, activeLesson.id);
                      else navigateToCourse(course.id);
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Continue Course
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => navigateToCourse(course.id)}
                      className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => enrollCourse(course.id)}
                      className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                    >
                      Enroll Free
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
