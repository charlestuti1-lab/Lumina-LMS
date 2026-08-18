import React from 'react';
import {
  TrendingUp,
  Award,
  Clock,
  BookOpen,
  CheckCircle2,
  Calendar,
  Flame,
  Target
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { StatCard } from '../common/StatCard';
import { ProgressBar } from '../common/ProgressBar';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const ProgressAnalyticsView: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    quizAttempts
  } = useLMS();

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);

  // Time series study data
  const weeklyData = [
    { week: 'Week 1', hours: 14.5, quizzes: 3 },
    { week: 'Week 2', hours: 18.2, quizzes: 4 },
    { week: 'Week 3', hours: 12.0, quizzes: 2 },
    { week: 'Week 4', hours: 22.4, quizzes: 5 },
    { week: 'Week 5', hours: 19.8, quizzes: 4 },
    { week: 'Week 6', hours: 24.1, quizzes: 6 }
  ];

  // Subject distribution
  const subjectData = [
    { name: 'Computer Science', value: 45, color: '#6366f1' },
    { name: 'Mathematics', value: 30, color: '#0ea5e9' },
    { name: 'Physics', value: 15, color: '#10b981' },
    { name: 'Biology', value: 10, color: '#f59e0b' }
  ];

  // Competency skill radar
  const skillRadarData = [
    { subject: 'Algorithms', A: 92, fullMark: 100 },
    { subject: 'Data Structures', A: 88, fullMark: 100 },
    { subject: 'Calculus', A: 95, fullMark: 100 },
    { subject: 'Linear Algebra', A: 84, fullMark: 100 },
    { subject: 'Physics Mechanics', A: 78, fullMark: 100 },
    { subject: 'System Design', A: 90, fullMark: 100 }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Learning Progress & Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics on study hours, assessment performance, topic mastery, and completion velocity
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Study Time"
          value="110.8 hrs"
          icon={<Clock className="w-5 h-5" />}
          subtitle="Top 5% of class"
          variant="indigo"
          trend={{ value: '+14% MoM', isPositive: true }}
        />
        <StatCard
          label="Lessons Completed"
          value="48"
          icon={<BookOpen className="w-5 h-5" />}
          subtitle="Across 3 subjects"
          variant="emerald"
        />
        <StatCard
          label="Quiz Average"
          value="93.4%"
          icon={<Award className="w-5 h-5" />}
          subtitle="Mastery Level"
          variant="purple"
        />
        <StatCard
          label="Active Streak"
          value={`${currentUser.streakDays || 14} Days`}
          icon={<Flame className="w-5 h-5 text-amber-500" />}
          subtitle="Longest: 28 days"
          variant="amber"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Study Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Weekly Study Hours & Consistency
              </h3>
              <p className="text-xs text-slate-500">Hours spent engaging with courseware</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 px-2.5 py-1 rounded-full">
              Avg 18.5h / wk
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}h`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  formatter={(val: any) => [`${val} hours`, 'Study Time']}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Mastery Radar */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">
                Subject Mastery & Competencies
              </h3>
              <p className="text-xs text-slate-500">Demonstrated proficiency across topics</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-full">
              Overall 88%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillRadarData}>
                <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" stroke="#64748b" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" fontSize={9} />
                <Radar name="Student Proficiency" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Course Completion Breakdown */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
          Enrolled Courses Progress Trajectory
        </h3>

        <div className="space-y-4">
          {userEnrollments.map(enr => {
            const course = courses.find(c => c.id === enr.courseId);
            return (
              <div key={enr.courseId} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {course?.title || 'Course'}
                  </span>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {enr.progressPercentage}%
                  </span>
                </div>
                <ProgressBar
                  value={enr.progressPercentage}
                  showPercent={false}
                  size="md"
                  variant={enr.progressPercentage >= 100 ? 'success' : 'primary'}
                />
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>Completed {enr.completedLessons.length} lessons</span>
                  <span>Enrolled on {new Date(enr.enrolledAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
