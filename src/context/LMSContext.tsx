import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserRole,
  Course,
  CourseModule,
  Lesson,
  Enrollment,
  Assignment,
  AssignmentSubmission,
  Quiz,
  QuizAttempt,
  DiscussionThread,
  DiscussionPost,
  Message,
  Notification,
  CalendarEvent,
  StudentNote,
  Bookmark,
  LearningGoal,
  Certificate,
  AuditLog,
  SystemSettings
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_ENROLLMENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_SUBMISSIONS,
  INITIAL_QUIZZES,
  INITIAL_QUIZ_ATTEMPTS,
  INITIAL_DISCUSSIONS,
  INITIAL_MESSAGES,
  INITIAL_NOTIFICATIONS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_NOTES,
  INITIAL_BOOKMARKS,
  INITIAL_GOALS,
  INITIAL_CERTIFICATES,
  INITIAL_AUDIT_LOGS,
  INITIAL_SETTINGS
} from '../data/mockData';

export type AppView =
  | 'dashboard'
  | 'my_courses'
  | 'catalog'
  | 'course_detail'
  | 'lesson_player'
  | 'assignments'
  | 'assessments'
  | 'quiz_player'
  | 'grades'
  | 'progress'
  | 'calendar'
  | 'discussions'
  | 'messages'
  | 'notes'
  | 'certificates'
  | 'goals'
  | 'settings'
  | 'teacher_dashboard'
  | 'teacher_builder'
  | 'teacher_submissions'
  | 'teacher_grading'
  | 'teacher_gradebook'
  | 'teacher_analytics'
  | 'teacher_students'
  | 'admin_dashboard'
  | 'admin_users'
  | 'admin_courses'
  | 'admin_analytics'
  | 'admin_settings'
  | 'admin_audit_logs';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

interface LMSContextType {
  // Auth & User
  currentUser: User;
  users: User[];
  setCurrentUser: (user: User) => void;
  switchUser: (userId: string) => void;
  login: (email: string, role?: UserRole) => boolean;
  register: (data: { name: string; email: string; role: UserRole; institution?: string; gradeLevel?: string }) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updateUserProfile: (updates: Partial<User>) => void;

  // View Navigation
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  activeCourseId: string | null;
  setActiveCourseId: (id: string | null) => void;
  activeLessonId: string | null;
  setActiveLessonId: (id: string | null) => void;
  activeAssignmentId: string | null;
  setActiveAssignmentId: (id: string | null) => void;
  activeQuizId: string | null;
  setActiveQuizId: (id: string | null) => void;
  navigateToCourse: (courseId: string) => void;
  navigateToLesson: (courseId: string, lessonId: string) => void;
  navigateToQuiz: (courseId: string, quizId: string) => void;
  navigateToAssignment: (assignmentId: string) => void;

  // Search & Dialogs
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;

  // Courses & Modules
  courses: Course[];
  createCourse: (course: Partial<Course>) => Course;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  togglePublishCourse: (courseId: string) => void;
  broadcastAnnouncement: (courseId: string, title: string, content: string) => void;

  // Enrollments & Progress
  enrollments: Enrollment[];
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  updateLessonProgress: (courseId: string, lessonId: string, progressPct: number) => void;
  getCourseEnrollment: (courseId: string, userId?: string) => Enrollment | undefined;

  // Assignments & Submissions
  assignments: Assignment[];
  submissions: AssignmentSubmission[];
  createAssignment: (asg: Omit<Assignment, 'id'>) => Assignment;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  submitAssignment: (asgId: string, data: { textSubmission?: string; files?: { name: string; size: string; url: string }[] }) => void;
  gradeSubmission: (subId: string, score: number, feedback: string, rubricScores?: { criterionId: string; score: number }[]) => void;

  // Quizzes & Assessments
  quizzes: Quiz[];
  quizAttempts: QuizAttempt[];
  createQuiz: (quiz: Omit<Quiz, 'id'>) => Quiz;
  updateQuiz: (id: string, updates: Partial<Quiz>) => void;
  submitQuizAttempt: (quizId: string, answers: { [key: string]: any }) => QuizAttempt;

  // Discussions
  discussions: DiscussionThread[];
  createDiscussionThread: (data: { courseId: string; title: string; content: string; tags: string[] }) => void;
  addDiscussionPost: (threadId: string, content: string) => void;
  replyToDiscussion: (threadId: string, content: string) => void;
  toggleUpvotePost: (threadId: string, postId: string) => void;
  likeDiscussionPost: (threadId: string, postId: string) => void;
  togglePinThread: (threadId: string) => void;
  markVerifiedPost: (threadId: string, postId: string) => void;

  // Messaging
  messages: Message[];
  sendMessage: (receiverId: string, content: string, attachment?: { name: string; url: string; size: string }) => void;
  markConversationRead: (otherUserId: string) => void;
  markMessageRead: (messageId: string) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  toggleEventCompleted: (id: string) => void;

  // Notes & Bookmarks
  notes: StudentNote[];
  bookmarks: Bookmark[];
  saveNote: (note: Omit<StudentNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => void;
  addNote: (note: any) => void;
  deleteNote: (id: string) => void;
  toggleBookmark: (courseId: string, courseTitle: string, lessonId: string, lessonTitle: string) => boolean;

  // Goals
  goals: LearningGoal[];
  createGoal: (goal: Omit<LearningGoal, 'id' | 'createdAt'>) => void;
  addGoal: (goal: any) => void;
  updateGoal: (id: string, updates: Partial<LearningGoal>) => void;
  updateGoalProgress: (id: string, progressPercentage: number) => void;
  deleteGoal: (id: string) => void;
  toggleGoalCompleted: (id: string) => void;

  // Certificates
  certificates: Certificate[];
  issueCertificate: (courseId: string) => Certificate;

  // Admin & Settings
  auditLogs: AuditLog[];
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
  updateUserStatus: (userId: string, status: 'active' | 'suspended' | 'pending') => void;
  changeUserRole: (userId: string, role: UserRole) => void;
  deleteUser: (userId: string) => void;
  addAuditLog: (action: string, targetType: AuditLog['targetType'], details: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  removeToast: (id: string) => void;

  // Confetti trigger
  triggerCelebration: () => void;
}

const LMSContext = createContext<LMSContextType | undefined>(undefined);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`edupulse_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`edupulse_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export const LMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State initialization with persistence
  const [users, setUsers] = useState<User[]>(() => loadFromStorage('users', INITIAL_USERS));
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = loadFromStorage<User | null>('current_user', null);
    if (saved && INITIAL_USERS.some(u => u.id === saved.id)) {
      return saved;
    }
    return INITIAL_USERS[0]; // Default Alex Chen (student)
  });

  const [courses, setCourses] = useState<Course[]>(() => loadFromStorage('courses', INITIAL_COURSES));
  const [enrollments, setEnrollments] = useState<Enrollment[]>(() => loadFromStorage('enrollments', INITIAL_ENROLLMENTS));
  const [assignments, setAssignments] = useState<Assignment[]>(() => loadFromStorage('assignments', INITIAL_ASSIGNMENTS));
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(() => loadFromStorage('submissions', INITIAL_SUBMISSIONS));
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => loadFromStorage('quizzes', INITIAL_QUIZZES));
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => loadFromStorage('quiz_attempts', INITIAL_QUIZ_ATTEMPTS));
  const [discussions, setDiscussions] = useState<DiscussionThread[]>(() => loadFromStorage('discussions', INITIAL_DISCUSSIONS));
  const [messages, setMessages] = useState<Message[]>(() => loadFromStorage('messages', INITIAL_MESSAGES));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadFromStorage('notifications', INITIAL_NOTIFICATIONS));
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => loadFromStorage('calendar_events', INITIAL_CALENDAR_EVENTS));
  const [notes, setNotes] = useState<StudentNote[]>(() => loadFromStorage('notes', INITIAL_NOTES));
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => loadFromStorage('bookmarks', INITIAL_BOOKMARKS));
  const [goals, setGoals] = useState<LearningGoal[]>(() => loadFromStorage('goals', INITIAL_GOALS));
  const [certificates, setCertificates] = useState<Certificate[]>(() => loadFromStorage('certificates', INITIAL_CERTIFICATES));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => loadFromStorage('audit_logs', INITIAL_AUDIT_LOGS));
  const [settings, setSettings] = useState<SystemSettings>(() => loadFromStorage('settings', INITIAL_SETTINGS));

  // Navigation & UI state
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (currentUser.role === 'teacher') return 'teacher_dashboard';
    if (currentUser.role === 'admin') return 'admin_dashboard';
    return 'dashboard';
  });

  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeAssignmentId, setActiveAssignmentId] = useState<string | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Theme handling
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('edupulse_theme');
    return (saved as 'light' | 'dark' | 'system') || 'light';
  });

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('edupulse_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
  };

  // Sync to localStorage
  useEffect(() => saveToStorage('users', users), [users]);
  useEffect(() => saveToStorage('current_user', currentUser), [currentUser]);
  useEffect(() => saveToStorage('courses', courses), [courses]);
  useEffect(() => saveToStorage('enrollments', enrollments), [enrollments]);
  useEffect(() => saveToStorage('assignments', assignments), [assignments]);
  useEffect(() => saveToStorage('submissions', submissions), [submissions]);
  useEffect(() => saveToStorage('quizzes', quizzes), [quizzes]);
  useEffect(() => saveToStorage('quiz_attempts', quizAttempts), [quizAttempts]);
  useEffect(() => saveToStorage('discussions', discussions), [discussions]);
  useEffect(() => saveToStorage('messages', messages), [messages]);
  useEffect(() => saveToStorage('notifications', notifications), [notifications]);
  useEffect(() => saveToStorage('calendar_events', calendarEvents), [calendarEvents]);
  useEffect(() => saveToStorage('notes', notes), [notes]);
  useEffect(() => saveToStorage('bookmarks', bookmarks), [bookmarks]);
  useEffect(() => saveToStorage('goals', goals), [goals]);
  useEffect(() => saveToStorage('certificates', certificates), [certificates]);
  useEffect(() => saveToStorage('audit_logs', auditLogs), [auditLogs]);
  useEffect(() => saveToStorage('settings', settings), [settings]);

  // Toast Helpers
  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  };

  // Auth Operations
  const switchUser = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
      if (target.role === 'teacher') {
        setCurrentView('teacher_dashboard');
      } else if (target.role === 'admin') {
        setCurrentView('admin_dashboard');
      } else {
        setCurrentView('dashboard');
      }
      showToast('info', 'Switched Account', `Logged in as ${target.name} (${target.role})`);
    }
  };

  const login = (email: string, role?: UserRole): boolean => {
    let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found && role) {
      found = users.find(u => u.role === role);
    }
    if (found) {
      setCurrentUser(found);
      if (found.role === 'teacher') setCurrentView('teacher_dashboard');
      else if (found.role === 'admin') setCurrentView('admin_dashboard');
      else setCurrentView('dashboard');
      showToast('success', 'Welcome Back', `Logged in as ${found.name}`);
      return true;
    }
    showToast('error', 'Login Failed', 'User not found with provided email.');
    return false;
  };

  const register = (data: { name: string; email: string; role: UserRole; institution?: string; gradeLevel?: string }) => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      institution: data.institution || 'Pacific Institute of Technology',
      gradeLevel: data.gradeLevel || (data.role === 'student' ? 'Freshman' : undefined),
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      streakDays: 1,
      lastActive: new Date().toISOString()
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    if (newUser.role === 'teacher') setCurrentView('teacher_dashboard');
    else if (newUser.role === 'admin') setCurrentView('admin_dashboard');
    else setCurrentView('dashboard');
    showToast('success', 'Account Created', `Welcome to EduPulse, ${newUser.name}!`);
  };

  const logout = () => {
    const studentUser = users.find(u => u.role === 'student') || users[0];
    setCurrentUser(studentUser);
    setCurrentView('dashboard');
    showToast('info', 'Logged Out', 'Returned to student preview mode.');
  };

  const updateProfile = (updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, ...updates } : u));
    showToast('success', 'Profile Updated', 'Your profile information has been updated.');
  };

  // Navigation helpers
  const navigateToCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setCurrentView('course_detail');
  };

  const navigateToLesson = (courseId: string, lessonId: string) => {
    setActiveCourseId(courseId);
    setActiveLessonId(lessonId);
    setCurrentView('lesson_player');
  };

  const navigateToQuiz = (courseId: string, quizId: string) => {
    setActiveCourseId(courseId);
    setActiveQuizId(quizId);
    setCurrentView('quiz_player');
  };

  const navigateToAssignment = (assignmentId: string) => {
    setActiveAssignmentId(assignmentId);
    setCurrentView('assignments');
  };

  // Course management
  const createCourse = (data: Partial<Course>): Course => {
    const newCourse: Course = {
      id: `crs_${Date.now()}`,
      title: data.title || 'Untitled Course',
      subtitle: data.subtitle || '',
      description: data.description || '',
      subject: data.subject || 'Computer Science',
      difficulty: data.difficulty || 'Beginner',
      instructorId: currentUser.id,
      instructorName: currentUser.name,
      instructorAvatar: currentUser.avatar,
      instructorTitle: currentUser.title || 'Instructor',
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
      bannerImage: data.bannerImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      estimatedHours: data.estimatedHours || 20,
      rating: 5.0,
      reviewCount: 0,
      enrolledCount: 0,
      status: data.status || 'draft',
      learningObjectives: data.learningObjectives || [],
      requirements: data.requirements || [],
      modules: data.modules || [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setCourses(prev => [newCourse, ...prev]);
    addAuditLog('COURSE_CREATED', 'course', `Teacher ${currentUser.name} created course "${newCourse.title}"`);
    showToast('success', 'Course Created', `"${newCourse.title}" has been saved as draft.`);
    return newCourse;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : c));
    showToast('success', 'Course Updated', 'Course curriculum and settings updated.');
  };

  const deleteCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    setCourses(prev => prev.filter(c => c.id !== courseId));
    addAuditLog('COURSE_DELETED', 'course', `Deleted course "${course?.title || courseId}"`);
    showToast('info', 'Course Deleted', 'The course has been permanently removed.');
  };

  const togglePublishCourse = (courseId: string) => {
    setCourses(prev => prev.map(c => {
      if (c.id === courseId) {
        const nextStatus = c.status === 'published' ? 'draft' : 'published';
        showToast('success', nextStatus === 'published' ? 'Course Published' : 'Course Unpublished', `"${c.title}" is now ${nextStatus}.`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // Enrollment & Progress
  const enrollCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    const existing = enrollments.find(e => e.userId === currentUser.id && e.courseId === courseId);
    if (existing) {
      showToast('info', 'Already Enrolled', `You are already enrolled in ${course.title}.`);
      return;
    }

    const firstLessonId = course.modules[0]?.lessons[0]?.id;
    const newEnrollment: Enrollment = {
      id: `enr_${Date.now()}`,
      userId: currentUser.id,
      courseId,
      enrolledAt: new Date().toISOString(),
      progressPercentage: 0,
      completedLessons: [],
      lastAccessedLessonId: firstLessonId,
      lastAccessedAt: new Date().toISOString(),
      grade: 100,
      letterGrade: 'A+'
    };

    setEnrollments(prev => [...prev, newEnrollment]);
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolledCount: c.enrolledCount + 1 } : c));
    showToast('success', 'Enrolled Successfully', `You have enrolled in ${course.title}!`);
    triggerCelebration();
  };

  const unenrollCourse = (courseId: string) => {
    setEnrollments(prev => prev.filter(e => !(e.userId === currentUser.id && e.courseId === courseId)));
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolledCount: Math.max(0, c.enrolledCount - 1) } : c));
    showToast('info', 'Unenrolled', 'You have dropped this course.');
  };

  const getCourseEnrollment = (courseId: string, userId = currentUser.id): Enrollment | undefined => {
    return enrollments.find(e => e.userId === userId && e.courseId === courseId);
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Calculate total lessons in course
    let totalLessons = 0;
    course.modules.forEach(m => {
      totalLessons += m.lessons.length;
    });

    setEnrollments(prev => prev.map(e => {
      if (e.userId === currentUser.id && e.courseId === courseId) {
        const completed = e.completedLessons.includes(lessonId)
          ? e.completedLessons
          : [...e.completedLessons, lessonId];
        
        const newProgress = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 100;
        const isFinished = newProgress >= 100 && e.progressPercentage < 100;

        if (isFinished) {
          triggerCelebration();
          showToast('success', 'Course Completed! 🎉', `You completed all lessons in ${course.title}! Check your certificates.`);
          issueCertificate(courseId);
        }

        return {
          ...e,
          completedLessons: completed,
          progressPercentage: newProgress,
          lastAccessedLessonId: lessonId,
          lastAccessedAt: new Date().toISOString(),
          completedAt: isFinished ? new Date().toISOString() : e.completedAt
        };
      }
      return e;
    }));

    showToast('success', 'Lesson Completed', 'Progress saved automatically.');
  };

  const updateLessonProgress = (courseId: string, lessonId: string, progressPct: number) => {
    setEnrollments(prev => prev.map(e => {
      if (e.userId === currentUser.id && e.courseId === courseId) {
        return {
          ...e,
          lastAccessedLessonId: lessonId,
          lastAccessedAt: new Date().toISOString()
        };
      }
      return e;
    }));
  };

  // Assignments
  const createAssignment = (asgData: Omit<Assignment, 'id'>): Assignment => {
    const newAsg: Assignment = {
      ...asgData,
      id: `asg_${Date.now()}`
    };
    setAssignments(prev => [newAsg, ...prev]);
    showToast('success', 'Assignment Created', `"${newAsg.title}" is now active.`);
    return newAsg;
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    showToast('success', 'Assignment Updated', 'Assignment details modified.');
  };

  const submitAssignment = (asgId: string, data: { textSubmission?: string; files?: { name: string; size: string; url: string }[] }) => {
    const asg = assignments.find(a => a.id === asgId);
    if (!asg) return;

    const existingIndex = submissions.findIndex(s => s.assignmentId === asgId && s.userId === currentUser.id);
    const newSub: AssignmentSubmission = {
      id: existingIndex >= 0 ? submissions[existingIndex].id : `sub_${Date.now()}`,
      assignmentId: asgId,
      userId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      courseId: asg.courseId,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      textSubmission: data.textSubmission,
      files: data.files || []
    };

    if (existingIndex >= 0) {
      setSubmissions(prev => prev.map((s, idx) => idx === existingIndex ? newSub : s));
    } else {
      setSubmissions(prev => [newSub, ...prev]);
    }

    showToast('success', 'Assignment Submitted', 'Your work has been submitted to the instructor.');
    triggerCelebration();
  };

  const gradeSubmission = (subId: string, score: number, feedback: string, rubricScores?: { criterionId: string; score: number }[]) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === subId) {
        const updated: AssignmentSubmission = {
          ...s,
          score,
          feedback,
          status: 'graded',
          gradedAt: new Date().toISOString(),
          gradedBy: currentUser.name,
          rubricScores: rubricScores || s.rubricScores
        };

        // Also add a notification for the student
        const asg = assignments.find(a => a.id === s.assignmentId);
        const newNotif: Notification = {
          id: `notif_${Date.now()}`,
          userId: s.userId,
          title: 'Assignment Graded',
          message: `${currentUser.name} graded ${asg?.title || 'your assignment'} (Score: ${score}/${asg?.maxPoints || 100}).`,
          type: 'assignment_graded',
          timestamp: new Date().toISOString(),
          read: false,
          actionPayload: { view: 'assignments', targetId: s.assignmentId }
        };
        setNotifications(nPrev => [newNotif, ...nPrev]);

        return updated;
      }
      return s;
    }));
    showToast('success', 'Grade Published', `Score of ${score} and feedback recorded.`);
  };

  // Quizzes & Assessments
  const createQuiz = (quizData: Omit<Quiz, 'id'>): Quiz => {
    const newQuiz: Quiz = {
      ...quizData,
      id: `q_${Date.now()}`
    };
    setQuizzes(prev => [newQuiz, ...prev]);
    showToast('success', 'Assessment Created', `"${newQuiz.title}" created with ${newQuiz.questions.length} questions.`);
    return newQuiz;
  };

  const updateQuiz = (id: string, updates: Partial<Quiz>) => {
    setQuizzes(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
    showToast('success', 'Assessment Updated', 'Quiz questions and settings saved.');
  };

  const submitQuizAttempt = (quizId: string, answers: { [key: string]: any }): QuizAttempt => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) throw new Error('Quiz not found');

    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(q => {
      totalPoints += q.points;
      const userAnswer = answers[q.id];

      if (q.type === 'multiple_choice' || q.type === 'true_false') {
        if (userAnswer === q.correctAnswer) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'multiple_select') {
        if (Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
          const sortedUser = [...userAnswer].sort().join(',');
          const sortedCorrect = [...(q.correctAnswer as number[])].sort().join(',');
          if (sortedUser === sortedCorrect) {
            earnedPoints += q.points;
          }
        }
      } else if (q.type === 'short_answer' || q.type === 'fill_blank') {
        if (typeof userAnswer === 'string' && typeof q.correctAnswer === 'string') {
          if (userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
            earnedPoints += q.points;
          }
        }
      } else {
        // Partial credit for other types
        if (userAnswer) {
          earnedPoints += q.points;
        }
      }
    });

    const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 100;
    const passed = percentage >= quiz.passingScorePercentage;

    const newAttempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quizId,
      userId: currentUser.id,
      courseId: quiz.courseId,
      startedAt: new Date(Date.now() - 15 * 60000).toISOString(),
      completedAt: new Date().toISOString(),
      score: earnedPoints,
      totalPoints,
      percentage,
      passed,
      answers
    };

    setQuizAttempts(prev => [newAttempt, ...prev]);

    if (passed) {
      triggerCelebration();
      showToast('success', 'Assessment Passed! 🎉', `You scored ${percentage}% (${earnedPoints}/${totalPoints} pts).`);
    } else {
      showToast('warning', 'Assessment Completed', `You scored ${percentage}%. Passing is ${quiz.passingScorePercentage}%.`);
    }

    return newAttempt;
  };

  // Discussions
  const createDiscussionThread = (data: { courseId: string; title: string; content: string; tags: string[] }) => {
    const newThread: DiscussionThread = {
      id: `disc_${Date.now()}`,
      courseId: data.courseId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      title: data.title,
      content: data.content,
      tags: data.tags,
      createdAt: new Date().toISOString(),
      isPinned: false,
      isLocked: false,
      isResolved: false,
      posts: []
    };
    setDiscussions(prev => [newThread, ...prev]);
    showToast('success', 'Thread Started', 'Your discussion post is now live.');
  };

  const addDiscussionPost = (threadId: string, content: string) => {
    const newPost: DiscussionPost = {
      id: `post_${Date.now()}`,
      threadId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      upvotedBy: []
    };

    setDiscussions(prev => prev.map(t => t.id === threadId ? { ...t, posts: [...t.posts, newPost] } : t));
    showToast('success', 'Reply Added', 'Your response has been posted.');
  };

  const toggleUpvotePost = (threadId: string, postId: string) => {
    setDiscussions(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          posts: t.posts.map(p => {
            if (p.id === postId) {
              const alreadyUpvoted = p.upvotedBy.includes(currentUser.id);
              return {
                ...p,
                upvotes: alreadyUpvoted ? p.upvotes - 1 : p.upvotes + 1,
                upvotedBy: alreadyUpvoted ? p.upvotedBy.filter(uid => uid !== currentUser.id) : [...p.upvotedBy, currentUser.id]
              };
            }
            return p;
          })
        };
      }
      return t;
    }));
  };

  const togglePinThread = (threadId: string) => {
    setDiscussions(prev => prev.map(t => t.id === threadId ? { ...t, isPinned: !t.isPinned } : t));
  };

  const markVerifiedPost = (threadId: string, postId: string) => {
    setDiscussions(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          isResolved: true,
          posts: t.posts.map(p => p.id === postId ? { ...p, isVerifiedAnswer: !p.isVerifiedAnswer } : p)
        };
      }
      return t;
    }));
    showToast('success', 'Verified Answer', 'Marked response as instructor-verified answer.');
  };

  // Messaging
  const sendMessage = (receiverId: string, content: string, attachment?: { name: string; url: string; size: string }) => {
    const convId = [currentUser.id, receiverId].sort().join('_');
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId: `conv_${convId}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      receiverId,
      content,
      timestamp: new Date().toISOString(),
      read: false,
      attachment
    };
    setMessages(prev => [...prev, newMsg]);
    showToast('success', 'Message Sent', 'Your message was delivered.');
  };

  const markConversationRead = (otherUserId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.senderId === otherUserId && m.receiverId === currentUser.id && !m.read) {
        return { ...m, read: true };
      }
      return m;
    }));
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.userId === currentUser.id ? { ...n, read: true } : n));
    showToast('info', 'Notifications Cleared', 'All notifications marked as read.');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Calendar
  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = {
      ...eventData,
      id: `ev_${Date.now()}`
    };
    setCalendarEvents(prev => [...prev, newEvent]);
    showToast('success', 'Event Added', `"${newEvent.title}" scheduled on calendar.`);
  };

  const toggleEventCompleted = (id: string) => {
    setCalendarEvents(prev => prev.map(e => e.id === id ? { ...e, isCompleted: !e.isCompleted } : e));
  };

  // Notes & Bookmarks
  const saveNote = (noteData: Omit<StudentNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) => {
    if (noteData.id) {
      setNotes(prev => prev.map(n => n.id === noteData.id ? {
        ...n,
        ...noteData,
        updatedAt: new Date().toISOString()
      } : n));
      showToast('success', 'Note Updated', 'Your study note was saved.');
    } else {
      const newNote: StudentNote = {
        ...noteData,
        id: `note_${Date.now()}`,
        userId: currentUser.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        color: noteData.color || 'amber'
      };
      setNotes(prev => [newNote, ...prev]);
      showToast('success', 'Note Created', 'Saved to your study notebook.');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast('info', 'Note Deleted', 'The note was removed.');
  };

  const toggleBookmark = (courseId: string, courseTitle: string, lessonId: string, lessonTitle: string): boolean => {
    const existing = bookmarks.find(b => b.userId === currentUser.id && b.lessonId === lessonId);
    if (existing) {
      setBookmarks(prev => prev.filter(b => b.id !== existing.id));
      showToast('info', 'Bookmark Removed', `Removed bookmark for "${lessonTitle}".`);
      return false;
    } else {
      const newBookmark: Bookmark = {
        id: `bm_${Date.now()}`,
        userId: currentUser.id,
        courseId,
        courseTitle,
        lessonId,
        lessonTitle,
        createdAt: new Date().toISOString()
      };
      setBookmarks(prev => [newBookmark, ...prev]);
      showToast('success', 'Lesson Bookmarked', `"${lessonTitle}" added to bookmarks.`);
      return true;
    }
  };

  // Goals
  const createGoal = (goalData: Omit<LearningGoal, 'id' | 'createdAt'>) => {
    const newGoal: LearningGoal = {
      ...goalData,
      id: `goal_${Date.now()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setGoals(prev => [newGoal, ...prev]);
    showToast('success', 'Goal Set', `Target date: ${newGoal.targetDate}`);
  };

  const updateGoal = (id: string, updates: Partial<LearningGoal>) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
    showToast('info', 'Goal Removed', 'Learning goal deleted.');
  };

  const toggleGoalCompleted = (id: string) => {
    setGoals(prev => prev.map(g => {
      if (g.id === id) {
        const nextState = !g.isCompleted;
        if (nextState) {
          triggerCelebration();
          showToast('success', 'Goal Achieved! 🎯', `Congratulations on completing "${g.title}"!`);
        }
        return {
          ...g,
          isCompleted: nextState,
          progressPercentage: nextState ? 100 : g.progressPercentage
        };
      }
      return g;
    }));
  };

  // Certificates
  const issueCertificate = (courseId: string): Certificate => {
    const course = courses.find(c => c.id === courseId);
    const existing = certificates.find(cert => cert.userId === currentUser.id && cert.courseId === courseId);
    if (existing) return existing;

    const courseCode = course?.title.split(' ').map(w => w[0]).join('').toUpperCase() || 'CRS';
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const code = `EDU-2026-${courseCode}-${randNum}`;

    const newCert: Certificate = {
      id: `cert_${Date.now()}`,
      certificateCode: code,
      userId: currentUser.id,
      studentName: currentUser.name,
      courseId,
      courseTitle: course?.title || 'Academic Course',
      instructorName: course?.instructorName || 'Academic Director',
      issueDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      gradePercentage: 95.0,
      hoursCompleted: course?.estimatedHours || 30,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://edupulse.edu/verify/${code}`
    };

    setCertificates(prev => [newCert, ...prev]);

    // Send notification
    const notif: Notification = {
      id: `notif_cert_${Date.now()}`,
      userId: currentUser.id,
      title: 'Certificate Awarded! 🎓',
      message: `You earned your verified Certificate of Completion for "${newCert.courseTitle}".`,
      type: 'certificate_issued',
      timestamp: new Date().toISOString(),
      read: false,
      actionPayload: { view: 'certificates' }
    };
    setNotifications(prev => [notif, ...prev]);

    return newCert;
  };

  // Admin Operations
  const addAuditLog = (action: string, targetType: AuditLog['targetType'], details: string) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorId: currentUser.id,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action,
      targetType,
      details,
      ipAddress: '127.0.0.1'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    addAuditLog('SETTINGS_MODIFIED', 'settings', `Platform settings updated by ${currentUser.name}`);
    showToast('success', 'Settings Saved', 'Global platform parameters updated.');
  };

  const updateUserStatus = (userId: string, status: 'active' | 'suspended' | 'pending') => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    addAuditLog('USER_STATUS_UPDATED', 'user', `Updated user (${userId}) status to ${status}`);
    showToast('info', 'User Status Updated', `Account status set to ${status}.`);
  };

  const changeUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
    addAuditLog('USER_ROLE_CHANGED', 'user', `Changed user (${userId}) role to ${role}`);
    showToast('success', 'User Role Changed', `User promoted/assigned to ${role}.`);
  };

  const deleteUser = (userId: string) => {
    const u = users.find(usr => usr.id === userId);
    setUsers(prev => prev.filter(usr => usr.id !== userId));
    addAuditLog('USER_DELETED', 'user', `Deleted user account "${u?.name || userId}"`);
    showToast('warning', 'User Deleted', 'User has been removed from database.');
  };

  const broadcastAnnouncement = (courseId: string, title: string, content: string) => {
    const course = courses.find(c => c.id === courseId);
    showToast('success', 'Announcement Sent', `Broadcast sent to all students in ${course?.title || 'course'}.`);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    updateProfile(updates);
  };

  const replyToDiscussion = (threadId: string, content: string) => {
    addDiscussionPost(threadId, content);
  };

  const likeDiscussionPost = (threadId: string, postId: string) => {
    toggleUpvotePost(threadId, postId);
  };

  const markMessageRead = (messageId: string) => {
    setMessages(prev => prev.map(m => m.id === messageId ? { ...m, read: true } : m));
  };

  const addNote = (note: any) => {
    saveNote(note);
  };

  const addGoal = (goal: any) => {
    createGoal(goal);
  };

  const updateGoalProgress = (id: string, progressPercentage: number) => {
    updateGoal(id, { progressPercentage, isCompleted: progressPercentage >= 100 });
  };

  return (
    <LMSContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        switchUser,
        login,
        register,
        logout,
        updateProfile,
        updateUserProfile,
        currentView,
        setCurrentView,
        activeCourseId,
        setActiveCourseId,
        activeLessonId,
        setActiveLessonId,
        activeAssignmentId,
        setActiveAssignmentId,
        activeQuizId,
        setActiveQuizId,
        navigateToCourse,
        navigateToLesson,
        navigateToQuiz,
        navigateToAssignment,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        theme,
        setTheme,
        courses,
        createCourse,
        updateCourse,
        deleteCourse,
        togglePublishCourse,
        broadcastAnnouncement,
        enrollments,
        enrollCourse,
        unenrollCourse,
        markLessonComplete,
        updateLessonProgress,
        getCourseEnrollment,
        assignments,
        submissions,
        createAssignment,
        updateAssignment,
        submitAssignment,
        gradeSubmission,
        quizzes,
        quizAttempts,
        createQuiz,
        updateQuiz,
        submitQuizAttempt,
        discussions,
        createDiscussionThread,
        addDiscussionPost,
        replyToDiscussion,
        toggleUpvotePost,
        likeDiscussionPost,
        togglePinThread,
        markVerifiedPost,
        messages,
        sendMessage,
        markConversationRead,
        markMessageRead,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        calendarEvents,
        addCalendarEvent,
        toggleEventCompleted,
        notes,
        bookmarks,
        saveNote,
        addNote,
        deleteNote,
        toggleBookmark,
        goals,
        createGoal,
        addGoal,
        updateGoal,
        updateGoalProgress,
        deleteGoal,
        toggleGoalCompleted,
        certificates,
        issueCertificate,
        auditLogs,
        settings,
        updateSettings,
        updateUserStatus,
        changeUserRole,
        deleteUser,
        addAuditLog,
        toasts,
        showToast,
        removeToast,
        triggerCelebration
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};

export const useLMS = (): LMSContextType => {
  const context = useContext(LMSContext);
  if (!context) {
    throw new Error('useLMS must be used within an LMSProvider');
  }
  return context;
};
