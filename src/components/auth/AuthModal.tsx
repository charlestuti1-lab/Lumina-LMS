import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Shield,
  UserCheck,
  CheckCircle2,
  Mail,
  Lock,
  Building,
  User as UserIcon,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { useLMS } from '../../context/LMSContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { users, currentUser, switchUser, login, register, showToast } = useLMS();

  const [mode, setMode] = useState<'switch' | 'login' | 'register' | 'forgot'>('switch');

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [institution, setInstitution] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('error', 'Validation Error', 'Please enter your email address.');
      return;
    }
    const ok = login(email);
    if (ok) {
      onClose();
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      showToast('error', 'Validation Error', 'Please fill in all required fields.');
      return;
    }
    register({
      name: fullName,
      email,
      role,
      institution: institution || 'EduPulse Academy',
      gradeLevel: role === 'student' ? (gradeLevel || 'Freshman') : undefined
    });
    onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('info', 'Password Reset Sent', `A recovery link has been simulated for ${email || 'your email'}.`);
    setMode('login');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              {mode === 'switch' && 'Quick Role & Demo Switcher'}
              {mode === 'login' && 'Sign In to EduPulse'}
              {mode === 'register' && 'Create New Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {mode === 'switch' && 'Instantly test Student, Teacher, or Admin capabilities'}
              {mode === 'login' && 'Enter credentials to access your academic dashboard'}
              {mode === 'register' && 'Join the platform as a student or instructor'}
              {mode === 'forgot' && 'We will send a password reset verification link'}
            </p>
          </div>
        </div>
      }
    >
      {/* Mode Navigation Tabs */}
      <div className="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-5">
        <button
          onClick={() => setMode('switch')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mode === 'switch'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Demo Switcher
        </button>
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mode === 'login'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('register')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            mode === 'register'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Register
        </button>
      </div>

      {/* QUICK ROLE SWITCHER */}
      {mode === 'switch' && (
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 rounded-xl text-xs text-indigo-800 dark:text-indigo-300">
            <span className="font-semibold">Role-Based Access Control (RBAC):</span> Switch between predefined accounts to test permissions, authoring tools, and grading flows.
          </div>

          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Students
            </h4>
            {users
              .filter(u => u.role === 'student')
              .map(user => (
                <div
                  key={user.id}
                  onClick={() => {
                    switchUser(user.id);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    currentUser.id === user.id
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                        <Badge size="sm" variant="info">
                          Student
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.title || user.gradeLevel}
                      </p>
                    </div>
                  </div>

                  {currentUser.id === user.id ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Select</span>
                  )}
                </div>
              ))}

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-4">
              Teachers & Instructors
            </h4>
            {users
              .filter(u => u.role === 'teacher')
              .map(user => (
                <div
                  key={user.id}
                  onClick={() => {
                    switchUser(user.id);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    currentUser.id === user.id
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                        <Badge size="sm" variant="success">
                          Teacher
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.title}
                      </p>
                    </div>
                  </div>

                  {currentUser.id === user.id ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Select</span>
                  )}
                </div>
              ))}

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-4">
              System Administrator
            </h4>
            {users
              .filter(u => u.role === 'admin')
              .map(user => (
                <div
                  key={user.id}
                  onClick={() => {
                    switchUser(user.id);
                    onClose();
                  }}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    currentUser.id === user.id
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                        <Badge size="sm" variant="purple">
                          Admin
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {user.title}
                      </p>
                    </div>
                  </div>

                  {currentUser.id === user.id ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Select</span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* SIGN IN FORM */}
      {mode === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="e.g. alex.chen@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setMode('forgot')}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
          >
            Sign In
          </button>
        </form>
      )}

      {/* REGISTRATION FORM */}
      {mode === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Rachel Adams"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="e.g. rachel@university.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Account Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  role === 'student'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole('teacher')}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-all ${
                  role === 'teacher'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Teacher
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Institution / School
            </label>
            <div className="relative">
              <Building className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pacific Institute of Technology"
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
          >
            Create Account
          </button>
        </form>
      )}

      {/* FORGOT PASSWORD */}
      {mode === 'forgot' && (
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Email
            </label>
            <input
              type="email"
              required
              placeholder="e.g. alex.chen@university.edu"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
          >
            Send Reset Instructions
          </button>
        </form>
      )}
    </Modal>
  );
};
