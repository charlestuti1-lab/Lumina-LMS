import React, { useState } from 'react';
import {
  User,
  Bell,
  Sliders,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Building,
  Sparkles,
  Smartphone,
  Eye
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const SettingsView: React.FC = () => {
  const { currentUser, updateUserProfile, theme, setTheme, showToast } = useLMS();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'security'>('profile');

  // Profile form state
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.bio || 'Computer Science & Pure Mathematics student passionate about machine learning and algorithmic complexity.');
  const [institution, setInstitution] = useState(currentUser.institution || 'Pacific Institute of Technology');
  const [gradeLevel, setGradeLevel] = useState(currentUser.gradeLevel || 'Senior (Class of 2026)');
  const [avatar, setAvatar] = useState(currentUser.avatar);

  // Notification preferences
  const [notifEmailAssignments, setNotifEmailAssignments] = useState(true);
  const [notifEmailGrades, setNotifEmailGrades] = useState(true);
  const [notifDiscussions, setNotifDiscussions] = useState(true);
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);

  // Accessibility
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'default' | 'large'>('default');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      bio,
      institution,
      gradeLevel,
      avatar
    });
    showToast('success', 'Profile Updated', 'Your profile details have been saved successfully.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Account & Portal Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your student identity, notification channels, accessibility, and account security
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {[
          { id: 'profile', label: 'Student Profile', icon: <User className="w-4 h-4" /> },
          { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
          { id: 'appearance', label: 'Appearance & A11y', icon: <Sliders className="w-4 h-4" /> },
          { id: 'security', label: 'Security & Auth', icon: <Shield className="w-4 h-4" /> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-2 transition-all ${
              activeTab === t.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* 1. PROFILE TAB */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <img
              src={avatar}
              alt={name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-600/30 shadow-md"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                {name}
              </h3>
              <p className="text-xs text-slate-500">
                Avatar URL (paste an image link to update your profile photo)
              </p>
              <input
                type="text"
                value={avatar}
                onChange={e => setAvatar(e.target.value)}
                className="w-full max-w-md px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Institution / University
              </label>
              <input
                type="text"
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Academic Standing / Grade Level
              </label>
              <input
                type="text"
                value={gradeLevel}
                onChange={e => setGradeLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Academic Bio & Research Interests
            </label>
            <textarea
              rows={4}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </form>
      )}

      {/* 2. NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Email & In-App Notification Preferences
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-4">
            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Assignment Deadlines & Reminders
                </h4>
                <p className="text-[11px] text-slate-500">
                  Receive alerts 24 hours prior to homework submission cutoff
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifEmailAssignments}
                onChange={e => setNotifEmailAssignments(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Grades & Feedback Releases
                </h4>
                <p className="text-[11px] text-slate-500">
                  Notify immediately when a professor grades an exam or homework
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifEmailGrades}
                onChange={e => setNotifEmailGrades(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Discussion Forum Replies & Mentions
                </h4>
                <p className="text-[11px] text-slate-500">
                  Get notified when someone responds to your questions
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifDiscussions}
                onChange={e => setNotifDiscussions(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  System Announcements & Broadcasts
                </h4>
                <p className="text-[11px] text-slate-500">
                  Important announcements from department administration
                </p>
              </div>
              <input
                type="checkbox"
                checked={notifAnnouncements}
                onChange={e => setNotifAnnouncements(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => showToast('success', 'Preferences Saved', 'Notification settings updated.')}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* 3. APPEARANCE & A11Y */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Interface Theme & Accessibility Options
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Color Palette Theme
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    theme === 'light'
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  ☀️ Academic Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-2xl border text-xs font-bold transition-all ${
                    theme === 'dark'
                      ? 'border-indigo-600 bg-indigo-950 text-indigo-300 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  🌙 Midnight Dark
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  High Contrast Text Mode
                </h4>
                <p className="text-[11px] text-slate-500">
                  Boost contrast borders and text sharpness for maximum readability (WCAG AAA)
                </p>
              </div>
              <input
                type="checkbox"
                checked={highContrast}
                onChange={e => setHighContrast(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
            Password & Security Credentials
          </h3>

          <form
            onSubmit={e => {
              e.preventDefault();
              showToast('success', 'Password Updated', 'Your security credentials were updated.');
            }}
            className="space-y-4 max-w-md"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Current Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
