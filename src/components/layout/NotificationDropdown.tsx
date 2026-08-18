import React from 'react';
import {
  Bell,
  CheckCheck,
  Award,
  BookOpen,
  FileCheck,
  Calendar,
  MessageSquare,
  Sparkles,
  Trash2
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { NotificationType } from '../../types';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose
}) => {
  const {
    currentUser,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    setCurrentView,
    setActiveAssignmentId,
    setActiveCourseId
  } = useLMS();

  if (!isOpen) return null;

  const userNotifications = notifications.filter(
    n => n.userId === currentUser.id
  );
  const unreadCount = userNotifications.filter(n => !n.read).length;

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'certificate_issued':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'assignment_graded':
      case 'assignment_new':
        return <FileCheck className="w-4 h-4 text-indigo-500" />;
      case 'lesson_new':
        return <BookOpen className="w-4 h-4 text-emerald-500" />;
      case 'assignment_due':
      case 'quiz_available':
        return <Calendar className="w-4 h-4 text-rose-500" />;
      case 'discussion_reply':
        return <MessageSquare className="w-4 h-4 text-sky-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  const handleNotificationClick = (n: typeof notifications[0]) => {
    markNotificationRead(n.id);
    if (n.actionPayload) {
      if (n.actionPayload.view === 'assignments') {
        if (n.actionPayload.targetId) setActiveAssignmentId(n.actionPayload.targetId);
        setCurrentView('assignments');
      } else if (n.actionPayload.view === 'course_detail' && n.actionPayload.targetId) {
        setActiveCourseId(n.actionPayload.targetId);
        setCurrentView('course_detail');
      } else if (n.actionPayload.view === 'certificates') {
        setCurrentView('certificates');
      }
    }
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-4 z-50 animate-scale-up">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
            Notifications
          </h4>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        )}
      </div>

      <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
        {userNotifications.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto stroke-1 mb-2 opacity-50" />
            <p className="text-xs">No notifications right now.</p>
          </div>
        ) : (
          userNotifications.map(n => (
            <div
              key={n.id}
              onClick={() => handleNotificationClick(n)}
              className={`py-3 px-2 flex items-start gap-3 rounded-xl cursor-pointer transition-colors ${
                n.read
                  ? 'hover:bg-slate-50 dark:hover:bg-slate-800/40 opacity-80'
                  : 'bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
              }`}
            >
              <div className="mt-0.5 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-2xs border border-slate-100 dark:border-slate-700/60 shrink-0">
                {getIcon(n.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {n.title}
                  </span>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                  {n.message}
                </p>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block">
                  {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNotification(n.id);
                }}
                className="text-slate-300 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400 p-1 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
