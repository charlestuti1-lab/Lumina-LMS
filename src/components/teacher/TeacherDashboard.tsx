import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  FileCheck,
  Award,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  Send,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Course } from '../../types';

export const TeacherDashboard: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    submissions,
    assignments,
    createCourse,
    broadcastAnnouncement,
    setCurrentView,
    showToast
  } = useLMS();

  const [isNewCourseOpen, setIsNewCourseOpen] = useState(false);
  const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);

  // New course form
  const [courseTitle, setCourseTitle] = useState('');
  const [courseSubject, setCourseSubject] = useState<Course['subject']>('Computer Science');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseLevel, setCourseLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [courseThumb, setCourseThumb] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80');

  // Announcement form
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCourseId, setAnnCourseId] = useState(courses[0]?.id || '');

  // Teacher specific data
  const teacherCourses = courses.filter(c => c.instructorId === currentUser.id);
  const totalEnrolledStudents = enrollments.filter(e =>
    teacherCourses.map(c => c.id).includes(e.courseId)
  ).length;

  const pendingSubmissions = submissions.filter(
    s => s.status === 'submitted' && teacherCourses.some(c => {
      const asg = assignments.find(a => a.id === s.assignmentId);
      return asg?.courseId === c.id;
    })
  );

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle) return;

    createCourse({
      title: courseTitle,
      subject: courseSubject,
      description: courseDesc,
      level: courseLevel,
      thumbnailUrl: courseThumb,
      instructorId: currentUser.id,
      instructorName: currentUser.name,
      instructorAvatar: currentUser.avatar,
      durationHours: 24,
      modules: [
        {
          id: `mod-${Date.now()}-1`,
          courseId: '',
          title: 'Module 1: Foundations & Core Concepts',
          description: 'Introduction and fundamental principles.',
          order: 1,
          lessons: [
            {
              id: `les-${Date.now()}-1`,
              moduleId: `mod-${Date.now()}-1`,
              courseId: '',
              title: 'Lesson 1.1: Course Overview & Architecture',
              description: 'Syllabus walkthrough and setup.',
              order: 1,
              type: 'video',
              durationMinutes: 18,
              videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              resources: []
            }
          ]
        }
      ]
    });

    setIsNewCourseOpen(false);
    setCourseTitle('');
    setCourseDesc('');
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    broadcastAnnouncement(annCourseId || '', annTitle, annContent);

    setIsNewAnnouncementOpen(false);
    setAnnTitle('');
    setAnnContent('');
    showToast('success', 'Announcement Sent', 'Broadcasted announcement to all students.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Teacher Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Instructor Portal
            </span>
            <Badge size="sm" variant="success">
              Faculty Verified
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mt-1">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your courses, grade pending student laboratory work, and publish curriculum modules
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewAnnouncementOpen(true)}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            Broadcast Notice
          </button>
          <button
            onClick={() => setIsNewCourseOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Create Course
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Courses"
          value={teacherCourses.length.toString()}
          icon={<BookOpen className="w-5 h-5" />}
          subtitle="Curriculum published"
          variant="indigo"
        />
        <StatCard
          label="Enrolled Students"
          value={totalEnrolledStudents.toString()}
          icon={<Users className="w-5 h-5" />}
          subtitle="Active learners"
          variant="emerald"
        />
        <StatCard
          label="Pending Submissions"
          value={pendingSubmissions.length.toString()}
          icon={<FileCheck className="w-5 h-5" />}
          subtitle="Requires grading"
          variant={pendingSubmissions.length > 0 ? 'amber' : 'default'}
        />
        <StatCard
          label="Avg Class Score"
          value="91.4%"
          icon={<Award className="w-5 h-5" />}
          subtitle="Cohort performance"
          variant="purple"
        />
      </div>

      {/* Main Content: Courses managed + Submissions needing grading */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Managed courses (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Your Managed Courses ({teacherCourses.length})
            </h2>
            <button
              onClick={() => setIsNewCourseOpen(true)}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Add New
            </button>
          </div>

          <div className="space-y-3">
            {teacherCourses.map(course => {
              const enrolled = enrollments.filter(e => e.courseId === course.id).length;

              return (
                <div
                  key={course.id}
                  className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                          {course.subject}
                        </span>
                        <Badge size="sm" variant="neutral">
                          {course.level}
                        </Badge>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {course.modules.length} Modules • {course.durationHours}h total content
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-bold text-slate-900 dark:text-white block">
                        {enrolled} Students
                      </span>
                      <span className="text-[10px] text-emerald-600">Active</span>
                    </div>

                    <button
                      onClick={() => setCurrentView('teacher_grading')}
                      className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Submissions to grade (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Submissions Needing Review ({pendingSubmissions.length})
            </h2>
            <button
              onClick={() => setCurrentView('teacher_grading')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Grade All
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-2xs divide-y divide-slate-100 dark:divide-slate-800">
            {pendingSubmissions.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                <p>All student submissions have been evaluated!</p>
              </div>
            ) : (
              pendingSubmissions.map(sub => {
                const asg = assignments.find(a => a.id === sub.assignmentId);

                return (
                  <div key={sub.id} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {asg?.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                          {sub.studentName}
                        </span>
                        <span>•</span>
                        <span>{new Date(sub.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentView('teacher_grading')}
                      className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors shrink-0"
                    >
                      Grade Now
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* CREATE COURSE MODAL */}
      <Modal
        isOpen={isNewCourseOpen}
        onClose={() => setIsNewCourseOpen(false)}
        maxWidth="lg"
        title="Create New Course Syllabus"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Systems & Cloud Computing"
              value={courseTitle}
              onChange={e => setCourseTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Academic Subject
              </label>
              <select
                value={courseSubject}
                onChange={e => setCourseSubject(e.target.value as Course['subject'])}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="English & Literature">English & Literature</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Difficulty Level
              </label>
              <select
                value={courseLevel}
                onChange={e => setCourseLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course Description & Objectives
            </label>
            <textarea
              required
              rows={4}
              placeholder="Outline what students will master in this course..."
              value={courseDesc}
              onChange={e => setCourseDesc(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewCourseOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Publish Course
            </button>
          </div>
        </form>
      </Modal>

      {/* BROADCAST ANNOUNCEMENT MODAL */}
      <Modal
        isOpen={isNewAnnouncementOpen}
        onClose={() => setIsNewAnnouncementOpen(false)}
        maxWidth="md"
        title="Broadcast Class Announcement"
      >
        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Announcement Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Midterm exam review session scheduled"
              value={annTitle}
              onChange={e => setAnnTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Course
            </label>
            <select
              value={annCourseId}
              onChange={e => setAnnCourseId(e.target.value)}
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
              Message Content
            </label>
            <textarea
              required
              rows={4}
              placeholder="Provide clear details and updates to students..."
              value={annContent}
              onChange={e => setAnnContent(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsNewAnnouncementOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Broadcast Now
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
