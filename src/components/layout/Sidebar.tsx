import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  FileCheck,
  HelpCircle,
  Calendar,
  MessageSquare,
  MessagesSquare,
  GraduationCap,
  Award,
  TrendingUp,
  FileText,
  Target,
  Settings,
  PlusCircle,
  Users,
  BarChart3,
  ShieldCheck,
  FileSpreadsheet,
  Layers,
  Sparkles,
  X
} from 'lucide-react';
import { useLMS, AppView } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const {
    currentUser,
    currentView,
    setCurrentView,
    assignments,
    enrollments,
    messages
  } = useLMS();

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);
  const unreadMessagesCount = messages.filter(
    m => m.receiverId === currentUser.id && !m.read
  ).length;

  const pendingAssignmentsCount = assignments.filter(
    a => a.status === 'published'
  ).length;

  interface NavItem {
    id: AppView;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    badgeVariant?: 'primary' | 'success' | 'warning' | 'info';
  }

  const studentNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'my_courses',
      label: 'My Courses',
      icon: <BookOpen className="w-4 h-4" />,
      badge: userEnrollments.length > 0 ? userEnrollments.length : undefined,
      badgeVariant: 'info'
    },
    { id: 'catalog', label: 'Explore Courses', icon: <Compass className="w-4 h-4" /> },
    {
      id: 'assignments',
      label: 'Assignments',
      icon: <FileCheck className="w-4 h-4" />,
      badge: pendingAssignmentsCount > 0 ? pendingAssignmentsCount : undefined,
      badgeVariant: 'warning'
    },
    { id: 'assessments', label: 'Assessments', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
    {
      id: 'messages',
      label: 'Messages',
      icon: <MessageSquare className="w-4 h-4" />,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
      badgeVariant: 'primary'
    },
    { id: 'discussions', label: 'Discussions', icon: <MessagesSquare className="w-4 h-4" /> },
    { id: 'grades', label: 'Grades & GPA', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'certificates', label: 'Certificates', icon: <Award className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'notes', label: 'Notes & Bookmarks', icon: <FileText className="w-4 h-4" /> },
    { id: 'goals', label: 'Learning Goals', icon: <Target className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const teacherNavItems: NavItem[] = [
    { id: 'teacher_dashboard', label: 'Teacher Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'teacher_builder', label: 'Course Builder', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'teacher_submissions', label: 'Review Submissions', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'teacher_gradebook', label: 'Gradebook', icon: <FileSpreadsheet className="w-4 h-4" /> },
    { id: 'teacher_analytics', label: 'Class Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'teacher_students', label: 'Student Directory', icon: <Users className="w-4 h-4" /> },
    { id: 'catalog', label: 'Course Catalog', icon: <Compass className="w-4 h-4" /> },
    { id: 'discussions', label: 'Course Forums', icon: <MessagesSquare className="w-4 h-4" /> },
    { id: 'messages', label: 'Direct Messages', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'calendar', label: 'Academic Calendar', icon: <Calendar className="w-4 h-4" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const adminNavItems: NavItem[] = [
    { id: 'admin_dashboard', label: 'Admin Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'admin_users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'admin_courses', label: 'Course Governance', icon: <Layers className="w-4 h-4" /> },
    { id: 'admin_analytics', label: 'Global Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'admin_settings', label: 'Platform Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'admin_audit_logs', label: 'Audit Trail', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'catalog', label: 'Public Catalog', icon: <Compass className="w-4 h-4" /> },
    { id: 'messages', label: 'System Messages', icon: <MessageSquare className="w-4 h-4" /> }
  ];

  const navItems =
    currentUser.role === 'teacher'
      ? teacherNavItems
      : currentUser.role === 'admin'
      ? adminNavItems
      : studentNavItems;

  const handleNavClick = (id: AppView) => {
    setCurrentView(id);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header Branding */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div
            onClick={() => {
              if (currentUser.role === 'teacher') handleNavClick('teacher_dashboard');
              else if (currentUser.role === 'admin') handleNavClick('admin_dashboard');
              else handleNavClick('dashboard');
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
              L
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white font-heading">
              Lumina LMS
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Role Banner */}
        <div className="px-5 py-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Active Workspace
          </span>
          <Badge
            size="sm"
            variant={
              currentUser.role === 'teacher'
                ? 'success'
                : currentUser.role === 'admin'
                ? 'purple'
                : 'blue'
            }
          >
            {currentUser.role.toUpperCase()}
          </Badge>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
          {navItems.map(item => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-semibold shadow-2xs'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Bento Pro Plan Card & User Info */}
        <div className="p-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-900 rounded-2xl p-4 text-white relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                ACADEMIC TIER
              </p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-sm">Pro Scholar Plan</p>
                <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                  ACTIVE
                </span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500 rounded-full opacity-20 pointer-events-none" />
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate capitalize">
                {currentUser.institution || currentUser.role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
