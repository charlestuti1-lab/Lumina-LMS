import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  FileCheck,
  HelpCircle,
  Sparkles,
  Plus
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const CalendarView: React.FC = () => {
  const {
    assignments,
    courses,
    quizzes,
    navigateToAssignment,
    navigateToQuiz
  } = useLMS();

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 7, 1)); // August 2026

  const daysInMonth = 31;
  const startDayOffset = 6; // Saturday

  // Calendar events
  const events = [
    { day: 5, title: 'CS301: Graph Traversal HW', type: 'assignment', id: 'asg-1', time: '11:59 PM' },
    { day: 12, title: 'Calculus: Integration Exam', type: 'quiz', id: 'quiz-2', time: '2:00 PM' },
    { day: 18, title: 'Algorithms Midterm Quiz', type: 'quiz', id: 'quiz-1', time: '10:00 AM' },
    { day: 22, title: 'Physics: Relativity Essay', type: 'assignment', id: 'asg-3', time: '11:59 PM' },
    { day: 28, title: 'Linear Algebra Problem Set', type: 'assignment', id: 'asg-2', time: '5:00 PM' }
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Academic Schedule & Calendar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track assignment deadlines, live lectures, quiz windows, and office hours
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-900 dark:text-white">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
            className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xs">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center py-3 text-xs font-bold uppercase tracking-wider text-slate-500">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 dark:divide-slate-800/80">
          {/* Offset cells for previous month */}
          {Array.from({ length: startDayOffset }).map((_, idx) => (
            <div key={`offset-${idx}`} className="p-2 sm:p-3 min-h-[90px] sm:min-h-[110px] bg-slate-50/40 dark:bg-slate-900/30 text-slate-400 text-xs">
              {25 + idx}
            </div>
          ))}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNumber = idx + 1;
            const dayEvents = events.filter(e => e.day === dayNumber);
            const isToday = dayNumber === 18;

            return (
              <div
                key={`day-${dayNumber}`}
                className={`p-2 sm:p-3 min-h-[90px] sm:min-h-[110px] transition-colors relative flex flex-col justify-between ${
                  isToday ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold inline-flex items-center justify-center w-6 h-6 rounded-full ${
                      isToday
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {dayNumber}
                  </span>
                  {isToday && (
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hidden sm:inline">
                      Today
                    </span>
                  )}
                </div>

                {/* Events in this day */}
                <div className="space-y-1 mt-1.5 flex-1">
                  {dayEvents.map((evt, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (evt.type === 'assignment') navigateToAssignment(evt.id);
                        else if (evt.type === 'quiz') navigateToQuiz('course-cs101', evt.id);
                      }}
                      className={`p-1.5 rounded-lg text-[10px] font-bold truncate cursor-pointer transition-transform hover:scale-102 ${
                        evt.type === 'assignment'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900'
                          : 'bg-purple-50 text-purple-800 border border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-900'
                      }`}
                    >
                      <span>{evt.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
