export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  title?: string;
  institution?: string;
  gradeLevel?: string;
  bio?: string;
  joinedDate: string;
  status: 'active' | 'suspended' | 'pending';
  interests?: string[];
  streakDays?: number;
  lastActive?: string;
}

export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LessonResource {
  id: string;
  title: string;
  type: 'pdf' | 'code' | 'dataset' | 'link' | 'slides';
  url: string;
  size?: string;
}

export interface KnowledgeCheckQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type LessonContentType = 'video' | 'article' | 'interactive' | 'quiz' | 'assignment';

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  type: LessonContentType;
  durationMinutes: number;
  order: number;
  videoUrl?: string;
  videoThumbnail?: string;
  textContent?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  resources?: LessonResource[];
  knowledgeCheck?: KnowledgeCheckQuestion[];
  isOptional?: boolean;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  subject: 'Computer Science' | 'Mathematics' | 'Physics' | 'Biology' | 'Chemistry' | 'English & Literature' | 'Arts & Humanities';
  difficulty: CourseDifficulty;
  level?: CourseDifficulty;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle: string;
  thumbnail: string;
  thumbnailUrl?: string;
  bannerImage: string;
  estimatedHours: number;
  durationHours?: number;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  status: 'published' | 'draft' | 'archived';
  learningObjectives: string[];
  requirements: string[];
  prerequisites?: string[];
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
  featured?: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercentage: number;
  completedLessons: string[]; // lesson ids
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  completedAt?: string;
  grade?: number;
  letterGrade?: string;
}

export interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  maxPoints: number;
  criteria?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxPoints: number;
  allowedFileTypes: string[];
  rubric: RubricCriterion[];
  attachments?: LessonResource[];
  weightPercent?: number;
  status: 'published' | 'draft';
}

export type SubmissionStatus = 'not_started' | 'in_progress' | 'submitted' | 'late' | 'graded' | 'returned';

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  studentName: string;
  studentAvatar: string;
  courseId: string;
  submittedAt?: string;
  status: SubmissionStatus;
  textSubmission?: string;
  content?: string;
  grade?: number;
  files?: { name: string; size: string; url: string }[];
  score?: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
  rubricScores?: { criterionId: string; score: number; comment?: string }[];
}

export type QuestionType = 'multiple_choice' | 'multiple_select' | 'true_false' | 'short_answer' | 'fill_blank' | 'matching';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  prompt?: string;
  points: number;
  options?: (string | { id: string; text: string })[]; // for multiple choice / multiple select / true-false
  correctAnswer?: string | number | number[] | { [key: string]: string };
  correctAnswerIds?: string[] | number[];
  matchingPairs?: { left: string; right: string }[];
  explanation: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  moduleId?: string;
  title: string;
  description: string;
  timeLimitMinutes: number; // 0 for unlimited
  passingScorePercentage: number;
  maxAttempts: number;
  allowedAttempts?: number;
  questions: QuizQuestion[];
  weightPercent?: number;
  isFinalExam?: boolean;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  courseId: string;
  startedAt: string;
  completedAt?: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  isPassed?: boolean;
  answers: { [questionId: string]: any };
}

export interface DiscussionPost {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  content: string;
  createdAt: string;
  upvotes: number;
  likesCount?: number;
  upvotedBy: string[];
  isVerifiedAnswer?: boolean;
  isAnswer?: boolean;
}

export interface DiscussionThread {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: UserRole;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  isPinned: boolean;
  isLocked: boolean;
  isResolved: boolean;
  posts: DiscussionPost[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  content: string;
  timestamp: string;
  createdAt?: string;
  read: boolean;
  attachment?: { name: string; url: string; size: string };
}

export interface Conversation {
  id: string;
  participants: string[]; // user IDs
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: { [userId: string]: number };
}

export type NotificationType = 
  | 'assignment_new' 
  | 'assignment_due' 
  | 'assignment_graded' 
  | 'quiz_available' 
  | 'lesson_new' 
  | 'announcement' 
  | 'discussion_reply' 
  | 'course_completed' 
  | 'certificate_issued' 
  | 'goal_reached';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string;
  read: boolean;
  linkUrl?: string;
  actionPayload?: { view: string; targetId?: string };
}

export interface CalendarEvent {
  id: string;
  userId?: string; // specific user or all course participants
  courseId?: string;
  courseTitle?: string;
  title: string;
  description?: string;
  startDate: string; // ISO date string
  endDate?: string;
  type: 'assignment' | 'quiz' | 'exam' | 'live_session' | 'goal' | 'announcement';
  priority?: 'low' | 'medium' | 'high';
  isCompleted?: boolean;
}

export interface StudentNote {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  lessonId?: string;
  lessonTitle?: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  timestampSeconds?: number;
  color?: 'amber' | 'blue' | 'emerald' | 'purple' | 'rose';
}

export interface Bookmark {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  lessonId: string;
  lessonTitle: string;
  createdAt: string;
}

export interface LearningGoal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetDate: string;
  category: string;
  targetMetric?: string;
  targetHours?: number;
  currentHours?: number;
  progressPercentage: number;
  isCompleted: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  certificateCode: string; // e.g. "EDU-2026-CS894"
  certificateNumber?: string;
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  issueDate: string;
  gradePercentage: number;
  hoursCompleted: number;
  qrCodeUrl?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  targetType: 'user' | 'course' | 'grade' | 'settings' | 'assignment';
  details: string;
  ipAddress?: string;
}

export interface SystemSettings {
  platformName: string;
  supportEmail: string;
  allowPublicRegistration: boolean;
  defaultGradingScale: { minPercentage: number; grade: string; gpa: number }[];
  enableCourseDiscussions: boolean;
  enablePeerMessaging: boolean;
  maintenanceMode: boolean;
  requireEmailVerification: boolean;
}
