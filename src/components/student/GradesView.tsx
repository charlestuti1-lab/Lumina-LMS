import React from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  TrendingUp,
  FileCheck,
  Download,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const GradesView: React.FC = () => {
  const {
    currentUser,
    courses,
    enrollments,
    submissions,
    assignments,
    quizAttempts,
    showToast
  } = useLMS();

  const userEnrollments = enrollments.filter(e => e.userId === currentUser.id);

  // Grades table data
  const gradesData = userEnrollments.map(enr => {
    const course = courses.find(c => c.id === enr.courseId);
    const courseAssignments = assignments.filter(a => a.courseId === enr.courseId);
    const userSubmissions = submissions.filter(
      s => courseAssignments.map(a => a.id).includes(s.assignmentId) && s.userId === currentUser.id && s.grade !== undefined
    );

    // Calculate score
    const totalMax = courseAssignments.reduce((acc, a) => acc + a.maxPoints, 0);
    const totalEarned = userSubmissions.reduce((acc, s) => acc + (s.grade || 0), 0);
    const scorePct = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : (enr.progressPercentage >= 100 ? 96 : 91);

    let letterGrade = 'A';
    let gpaPoint = 4.0;
    if (scorePct >= 93) { letterGrade = 'A'; gpaPoint = 4.0; }
    else if (scorePct >= 90) { letterGrade = 'A-'; gpaPoint = 3.7; }
    else if (scorePct >= 87) { letterGrade = 'B+'; gpaPoint = 3.3; }
    else if (scorePct >= 83) { letterGrade = 'B'; gpaPoint = 3.0; }
    else { letterGrade = 'B-'; gpaPoint = 2.7; }

    const creditHours = 4.0;

    return {
      courseId: enr.courseId,
      courseCode: course?.subject === 'Computer Science' ? 'CS-301' : course?.subject === 'Mathematics' ? 'MATH-202' : 'PHYS-101',
      title: course?.title || 'Course',
      instructor: course?.instructorName,
      credits: creditHours,
      scorePct,
      letterGrade,
      gpaPoint,
      progress: enr.progressPercentage,
      status: enr.progressPercentage >= 100 ? 'Completed' : 'In Progress'
    };
  });

  const totalCredits = gradesData.reduce((acc, g) => acc + g.credits, 0);
  const totalQualityPoints = gradesData.reduce((acc, g) => acc + (g.gpaPoint * g.credits), 0);
  const cumulativeGPA = totalCredits > 0 ? (totalQualityPoints / totalCredits).toFixed(2) : '3.92';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in print:p-0 print:m-0">
      {/* Top Title & Print / Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Academic Grades & Official Transcript
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View term GPA, quality points, weighted averages, and official records
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print Transcript
          </button>
          <button
            onClick={() => showToast('success', 'Transcript Exported', 'Downloaded signed academic transcript PDF.')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* GPA & Standing Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 print:grid-cols-3">
        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Cumulative GPA
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-heading text-indigo-600 dark:text-indigo-400">
              {cumulativeGPA}
            </span>
            <span className="text-xs font-bold text-slate-400">/ 4.00 Scale</span>
          </div>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
            Dean's Honors List Standing
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Credits Earned
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-heading text-slate-900 dark:text-white">
              {totalCredits}.0
            </span>
            <span className="text-xs font-bold text-slate-400">Semester Credits</span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            100% On-Track for Graduation
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Current Academic Standing
          </span>
          <div className="mt-2 flex items-center gap-2">
            <CheckCircle2 className="w-7 h-7 text-emerald-500" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Good Standing
            </span>
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Pacific Institute of Technology
          </span>
        </div>
      </div>

      {/* Official Transcript Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
              Course Grade Breakdown — Fall 2026
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Student: {currentUser.name} • ID: PIT-{currentUser.id.substring(0, 6).toUpperCase()}
            </p>
          </div>
          <Badge size="sm" variant="info">
            Official Record
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Course Title</th>
                <th className="py-3 px-4">Instructor</th>
                <th className="py-3 px-4 text-center">Credits</th>
                <th className="py-3 px-4 text-center">Weighted Score</th>
                <th className="py-3 px-4 text-center">Grade</th>
                <th className="py-3 px-4 text-center">GPA Pts</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
              {gradesData.map(item => (
                <tr key={item.courseId} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {item.courseCode}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {item.instructor}
                  </td>
                  <td className="py-3.5 px-4 text-center font-medium text-slate-600 dark:text-slate-300">
                    {item.credits.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-white">
                    {item.scorePct}%
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                      {item.letterGrade}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-white">
                    {item.gpaPoint.toFixed(1)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Badge
                      size="sm"
                      variant={item.status === 'Completed' ? 'success' : 'neutral'}
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
