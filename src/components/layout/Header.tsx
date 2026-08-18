import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  GraduationCap,
  Menu,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Shield,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { NotificationDropdown } from './NotificationDropdown';
import { Badge } from '../common/Badge';

interface HeaderProps {
  onOpenSidebar: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar, onOpenAuth }) => {
  const {
    currentUser,
    notifications,
    theme,
    setTheme,
    setIsSearchOpen,
    setCurrentView,
    logout
  } = useLMS();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => n.userId === currentUser.id && !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadgeVariant = (role: string) => {
    if (role === 'teacher') return 'success';
    if (role === 'admin') return 'purple';
    return 'info';
  };

  return (
    <header className="sticky top-0 z-30 h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between transition-colors">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 -ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => {
              if (currentUser.role === 'teacher') setCurrentView('teacher_dashboard');
              else if (currentUser.role === 'admin') setCurrentView('admin_dashboard');
              else setCurrentView('dashboard');
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
                Lumina <span className="text-blue-600 dark:text-blue-400">LMS</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar Bento Pill */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-3 bg-slate-100 dark:bg-slate-800/90 hover:bg-slate-200/70 dark:hover:bg-slate-800 px-4 py-2.5 rounded-full cursor-pointer transition-colors group border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors shrink-0" />
            <input
              type="text"
              readOnly
              placeholder="Search courses, lessons, assignments..."
              className="bg-transparent border-none outline-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 w-full cursor-pointer pointer-events-none placeholder:text-slate-400"
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-slate-400 shrink-0">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Actions, Notifications, Theme, User */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Quick Role Switcher Button */}
          <button
            onClick={onOpenAuth}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
            title="Switch User or Role"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-blue-700 dark:text-blue-300">
              Role: <span className="capitalize">{currentUser.role}</span>
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(prev => !prev)}
              className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full" />
              )}
            </button>
            <NotificationDropdown
              isOpen={isNotifOpen}
              onClose={() => setIsNotifOpen(false)}
            />
          </div>

          {/* User Profile Menu with Bento Details */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileMenuOpen(prev => !prev)}
              className="flex items-center gap-3 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="hidden sm:block text-right">
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-none">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                  ID: #{currentUser.id.slice(-5).toUpperCase() || '40922'}
                </p>
              </div>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-full object-cover bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
              />
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-scale-up">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {currentUser.email}
                  </p>
                  <div className="mt-1.5">
                    <Badge size="sm" variant={getRoleBadgeVariant(currentUser.role)}>
                      {currentUser.role.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setCurrentView('settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    Student Profile
                  </button>

                  <button
                    onClick={() => {
                      setCurrentView('settings');
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Account Settings
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenAuth();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-xl transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Switch User / Demo
                  </button>

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
