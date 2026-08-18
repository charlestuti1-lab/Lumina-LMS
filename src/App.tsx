import React, { useState } from 'react';
import { LMSProvider, useLMS } from './context/LMSContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { ToastContainer } from './components/common/ToastContainer';

// Student Views
import { StudentDashboard } from './components/student/StudentDashboard';
import { MyCoursesView } from './components/student/MyCoursesView';
import { CourseCatalogView } from './components/student/CourseCatalogView';
import { CourseDetailView } from './components/student/CourseDetailView';
import { LessonPlayerView } from './components/student/LessonPlayerView';
import { AssignmentsView } from './components/student/AssignmentsView';
import { AssessmentsView } from './components/student/AssessmentsView';
import { QuizPlayerView } from './components/student/QuizPlayerView';
import { GradesView } from './components/student/GradesView';
import { ProgressAnalyticsView } from './components/student/ProgressAnalyticsView';
import { CalendarView } from './components/student/CalendarView';
import { DiscussionsView } from './components/student/DiscussionsView';
import { MessagesView } from './components/student/MessagesView';
import { NotesBookmarksView } from './components/student/NotesBookmarksView';
import { CertificatesView } from './components/student/CertificatesView';
import { GoalsView } from './components/student/GoalsView';
import { SettingsView } from './components/student/SettingsView';

// Teacher Views
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherGradingView } from './components/teacher/TeacherGradingView';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentView, isSearchOpen, setIsSearchOpen } = useLMS();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Router dispatcher
  const renderCurrentView = () => {
    switch (currentView) {
      // Core Learning
      case 'dashboard':
        return <StudentDashboard />;
      case 'my_courses':
        return <MyCoursesView />;
      case 'catalog':
        return <CourseCatalogView />;
      case 'course_detail':
        return <CourseDetailView />;
      case 'lesson_player':
        return <LessonPlayerView />;

      // Assessment & Evaluation
      case 'assignments':
        return <AssignmentsView />;
      case 'assessments':
        return <AssessmentsView />;
      case 'quiz_player':
        return <QuizPlayerView />;
      case 'grades':
        return <GradesView />;

      // Progress & Analytics
      case 'progress':
        return <ProgressAnalyticsView />;
      case 'calendar':
        return <CalendarView />;

      // Collaboration & Social
      case 'discussions':
        return <DiscussionsView />;
      case 'messages':
        return <MessagesView />;

      // Productivity & Goals
      case 'notes':
        return <NotesBookmarksView />;
      case 'certificates':
        return <CertificatesView />;
      case 'goals':
        return <GoalsView />;
      case 'settings':
        return <SettingsView />;

      // Teacher Portal
      case 'teacher_dashboard':
        return <TeacherDashboard />;
      case 'teacher_grading':
      case 'teacher_submissions':
        return <TeacherGradingView />;

      // Admin Portal
      case 'admin_dashboard':
      case 'admin_users':
      case 'admin_courses':
      case 'admin_analytics':
      case 'admin_settings':
      case 'admin_audit_logs':
        return <AdminDashboard />;

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Header */}
      <Header
        onOpenSidebar={() => setSidebarOpen(prev => !prev)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Dynamic Route View Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 transition-all custom-scrollbar">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LMSProvider>
      <AppContent />
    </LMSProvider>
  );
}
