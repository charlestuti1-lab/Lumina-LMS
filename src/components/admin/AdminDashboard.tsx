import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  BookOpen,
  GraduationCap,
  Award,
  Search,
  UserCheck,
  UserX,
  Sparkles,
  Server,
  Activity,
  Send,
  Plus,
  Trash2,
  Lock
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { User } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    courses,
    enrollments,
    broadcastAnnouncement,
    currentUser,
    switchUser,
    showToast
  } = useLMS();

  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'system'>('users');
  const [searchUser, setSearchUser] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');

  // Total stats
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalTeachers = users.filter(u => u.role === 'teacher').length;

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;

    broadcastAnnouncement('', broadcastTitle, broadcastContent);

    setIsBroadcastOpen(false);
    setBroadcastTitle('');
    setBroadcastContent('');
    showToast('success', 'Global Announcement Dispatched', 'All students and faculty notified.');
  };

  const filteredUsers = users.filter(u => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (searchUser) {
      const q = searchUser.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Admin Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Institutional Administration
            </span>
            <Badge size="sm" variant="purple">
              Super Admin
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight mt-1">
            EduPulse LMS Administration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            System overview, user role management, course approval catalog, and institutional telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBroadcastOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-4 h-4" />
            Global Announcement
          </button>
        </div>
      </div>

      {/* Admin KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registered Users"
          value={users.length.toString()}
          icon={<Users className="w-5 h-5" />}
          subtitle={`${totalStudents} Students, ${totalTeachers} Teachers`}
          variant="indigo"
        />
        <StatCard
          label="Active Course Catalog"
          value={courses.length.toString()}
          icon={<BookOpen className="w-5 h-5" />}
          subtitle="Accredited Syllabi"
          variant="emerald"
        />
        <StatCard
          label="Total Enrollments"
          value={enrollments.length.toString()}
          icon={<GraduationCap className="w-5 h-5" />}
          subtitle="99.2% Retention Rate"
          variant="purple"
        />
        <StatCard
          label="Platform Uptime"
          value="99.98%"
          icon={<Server className="w-5 h-5" />}
          subtitle="All microservices nominal"
          variant="amber"
        />
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'users'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          User & Role Management
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'courses'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Course Catalog Control
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === 'system'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          System Logs & Audit
        </button>
      </div>

      {/* TAB 1: USERS */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs space-y-4 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {[
                { id: 'all', label: 'All Users' },
                { id: 'student', label: 'Students' },
                { id: 'teacher', label: 'Teachers' },
                { id: 'admin', label: 'Admins' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setRoleFilter(t.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    roleFilter === t.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Institution / Department</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {user.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ID: {user.id}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {user.email}
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge
                        size="sm"
                        variant={
                          user.role === 'admin'
                            ? 'purple'
                            : user.role === 'teacher'
                            ? 'success'
                            : 'info'
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {user.institution || 'Pacific Institute of Technology'}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          switchUser(user.id);
                          showToast('info', 'Switched Persona', `Now simulating ${user.name} (${user.role}).`);
                        }}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold transition-colors"
                      >
                        Impersonate
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: COURSES */}
      {activeTab === 'courses' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Institutional Course Directory
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {courses.map(course => {
              const enrolled = enrollments.filter(e => e.courseId === course.id).length;

              return (
                <div key={course.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={course.thumbnailUrl}
                      alt={course.title}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Instructor: {course.instructorName} • {enrolled} Enrolled Students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge size="sm" variant="success">
                      Published
                    </Badge>
                    <button
                      onClick={() => showToast('info', 'Course Inspected', `Inspecting configuration for ${course.title}.`)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200"
                    >
                      Audit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM AUDIT */}
      {activeTab === 'system' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Live System Activity & Security Logs
          </h3>

          <div className="space-y-2 font-mono text-xs text-slate-600 dark:text-slate-400">
            {[
              { time: '10:45:12 AM', event: 'AUTH_LOGIN_SUCCESS', user: 'alex.chen@edupulse.edu', ip: '192.168.1.104' },
              { time: '10:42:01 AM', event: 'SUBMISSION_GRADED', user: 'dr.marcus.vance@edupulse.edu', score: '94/100' },
              { time: '10:39:55 AM', event: 'QUIZ_ATTEMPT_SUBMITTED', user: 'alex.chen@edupulse.edu', quiz: 'quiz-1' },
              { time: '10:30:18 AM', event: 'COURSE_ENROLLMENT', user: 'elena.rostova@edupulse.edu', course: 'course-math201' },
              { time: '10:15:00 AM', event: 'DB_BACKUP_COMPLETED', target: 'gs://edupulse-backups/daily.sql', status: 'OK' }
            ].map((log, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">{log.time}</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{log.event}</span>
                  <span>{log.user || log.target}</span>
                </div>
                <Badge size="sm" variant="success">
                  SUCCESS
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GLOBAL BROADCAST MODAL */}
      <Modal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        maxWidth="md"
        title="Broadcast System-Wide Announcement"
      >
        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Announcement Headline
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Campus-Wide Maintenance Scheduled"
              value={broadcastTitle}
              onChange={e => setBroadcastTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Broadcast Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="Enter message visible to all students, teachers, and staff..."
              value={broadcastContent}
              onChange={e => setBroadcastContent(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsBroadcastOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Send to All Users
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
