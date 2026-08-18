import React from 'react';
import {
  HelpCircle,
  Clock,
  Award,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const AssessmentsView: React.FC = () => {
  const {
    quizzes,
    courses,
    quizAttempts,
    currentUser,
    navigateToQuiz
  } = useLMS();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Assessments & Quizzes
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Take timed multiple-choice and conceptual exams, test your mastery, and earn verified credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => {
          const course = courses.find(c => c.id === quiz.courseId);
          const attempts = quizAttempts.filter(
            a => a.quizId === quiz.id && a.userId === currentUser.id
          );
          const highestScore = attempts.length > 0
            ? Math.max(...attempts.map(a => a.percentage))
            : null;
          const isPassed = highestScore !== null && highestScore >= quiz.passingScorePercentage;

          return (
            <div
              key={quiz.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <Badge size="sm" variant="purple">
                    {course?.subject || 'Academic'}
                  </Badge>

                  {highestScore !== null ? (
                    <Badge size="sm" variant={isPassed ? 'success' : 'danger'} dot>
                      {isPassed ? 'Passed' : 'Needs Review'}
                    </Badge>
                  ) : (
                    <Badge size="sm" variant="neutral">
                      Not Started
                    </Badge>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
                    {course?.title}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {quiz.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quiz.timeLimitMinutes} minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>{quiz.questions.length} questions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pass: {quiz.passingScorePercentage}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>{attempts.length}/{quiz.allowedAttempts} attempts</span>
                  </div>
                </div>

                {highestScore !== null && (
                  <div className="flex items-center justify-between p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-xl text-xs">
                    <span className="font-medium text-emerald-800 dark:text-emerald-300">
                      Best Score:
                    </span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                      {highestScore}%
                    </span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 dark:border-slate-800 mt-4">
                <button
                  onClick={() => navigateToQuiz(quiz.courseId, quiz.id)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  {attempts.length > 0 ? 'Retake Quiz' : 'Start Assessment'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
