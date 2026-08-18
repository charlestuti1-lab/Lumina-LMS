import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  Flag
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

export const QuizPlayerView: React.FC = () => {
  const {
    activeQuizId,
    activeCourseId,
    quizzes,
    courses,
    currentUser,
    submitQuizAttempt,
    setCurrentView,
    triggerCelebration
  } = useLMS();

  const quiz = quizzes.find(q => q.id === activeQuizId) || quizzes[0];
  const course = courses.find(c => c.id === (activeCourseId || quiz?.courseId));

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState((quiz?.timeLimitMinutes || 20) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalAttempt, setFinalAttempt] = useState<any>(null);

  // Countdown timer
  useEffect(() => {
    if (isSubmitted || timeLeftSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted, timeLeftSeconds]);

  if (!quiz) return null;

  const currentQ = quiz.questions[currentQuestionIdx];

  const handleSelectOption = (questionId: string, optionId: string, isMultiple = false) => {
    if (isSubmitted) return;

    setSelectedAnswers(prev => {
      if (isMultiple) {
        const current = prev[questionId] || [];
        const exists = current.includes(optionId);
        const next = exists ? current.filter(id => id !== optionId) : [...current, optionId];
        return { ...prev, [questionId]: next };
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  };

  const toggleFlag = (qId: string) => {
    setFlaggedQuestions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleAutoSubmit = () => {
    handleSubmitQuiz();
  };

  const handleSubmitQuiz = () => {
    const formattedAnswers = Object.entries(selectedAnswers).map(([qId, ans]) => ({
      questionId: qId,
      selectedOptionIds: ans
    }));

    const attempt = submitQuizAttempt(quiz.id, formattedAnswers);
    setFinalAttempt(attempt);
    setIsSubmitted(true);
    if (attempt.isPassed) {
      triggerCelebration();
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {course?.title || 'Academic Course'}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-heading">
            {quiz.title}
          </h1>
        </div>

        {!isSubmitted && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-bold text-sm shadow-xs ${
            timeLeftSeconds < 120
              ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-800 dark:text-rose-400 animate-pulse'
              : 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-300'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>
        )}
      </div>

      {/* QUIZ RESULT VIEW */}
      {isSubmitted && finalAttempt ? (
        <div className="space-y-6 animate-scale-up">
          <div className={`p-8 rounded-3xl border text-center space-y-4 shadow-xl ${
            finalAttempt.isPassed
              ? 'bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-500/30'
              : 'bg-gradient-to-b from-rose-500/10 to-transparent border-rose-500/30'
          }`}>
            <div className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-center mx-auto">
              {finalAttempt.isPassed ? (
                <Award className="w-8 h-8 text-emerald-500" />
              ) : (
                <AlertCircle className="w-8 h-8 text-rose-500" />
              )}
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Assessment Outcome
              </span>
              <h2 className="text-3xl font-black font-heading text-slate-900 dark:text-white mt-1">
                {finalAttempt.isPassed ? 'Assessment Passed! 🎉' : 'Needs More Practice'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                {finalAttempt.isPassed
                  ? `Outstanding achievement! You scored ${finalAttempt.percentage}% and met the requirement of ${quiz.passingScorePercentage}%.`
                  : `You scored ${finalAttempt.percentage}%. The passing threshold is ${quiz.passingScorePercentage}%. Review the explanations below and try again.`}
              </p>
            </div>

            <div className="inline-flex items-baseline gap-2 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {finalAttempt.score}
              </span>
              <span className="text-slate-400 text-sm font-semibold">
                / {finalAttempt.totalPoints} points ({finalAttempt.percentage}%)
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                  setFlaggedQuestions({});
                  setTimeLeftSeconds(quiz.timeLimitMinutes * 60);
                  setCurrentQuestionIdx(0);
                }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Assessment
              </button>

              <button
                onClick={() => setCurrentView('assessments')}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                Back to Assessments
              </button>
            </div>
          </div>

          {/* Question Explanations Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Question-by-Question Solution Breakdown
            </h3>

            <div className="space-y-4">
              {quiz.questions.map((q, idx) => {
                const userAns = selectedAnswers[q.id] || [];
                const correctIds: string[] = Array.isArray(q.correctAnswerIds)
                  ? q.correctAnswerIds.map(String)
                  : Array.isArray(q.correctAnswer)
                  ? q.correctAnswer.map(String)
                  : q.correctAnswer !== undefined
                  ? [String(q.correctAnswer)]
                  : [];

                const isCorrect =
                  userAns.length === correctIds.length &&
                  userAns.every(id => correctIds.includes(String(id)));

                const normalizedOptions = (q.options || []).map((opt, optIdx) =>
                  typeof opt === 'string' ? { id: String(optIdx), text: opt } : opt
                );

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border bg-white dark:bg-slate-900 space-y-4 ${
                      isCorrect
                        ? 'border-emerald-200 dark:border-emerald-900/60'
                        : 'border-rose-200 dark:border-rose-900/60'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isCorrect
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {idx + 1}
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {q.prompt || q.question}
                        </h4>
                      </div>

                      <Badge size="sm" variant={isCorrect ? 'success' : 'danger'}>
                        {isCorrect ? `+${q.points} Pts` : '0 Pts'}
                      </Badge>
                    </div>

                    {/* Options list */}
                    <div className="space-y-2 pl-9">
                      {normalizedOptions.map(opt => {
                        const isChosen = userAns.includes(opt.id);
                        const isAnswer = correctIds.includes(opt.id);

                        return (
                          <div
                            key={opt.id}
                            className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-between ${
                              isAnswer
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200'
                                : isChosen && !isAnswer
                                ? 'bg-rose-50/70 border-rose-300 text-rose-900 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-200'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <span>{opt.text}</span>
                            {isAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            {isChosen && !isAnswer && <XCircle className="w-4 h-4 text-rose-600" />}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="pl-9 pt-2">
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 text-xs space-y-1">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 block">
                            Instructor Explanation:
                          </span>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {q.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE TEST TAKING SCREEN */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Panel: 8 cols */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
              {/* Question Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    Question {currentQuestionIdx + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-xs text-slate-300">•</span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {currentQ.points} Points
                  </span>
                </div>

                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-50 text-amber-700 border border-amber-300 dark:bg-amber-950 dark:text-amber-300'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {flaggedQuestions[currentQ.id] ? 'Flagged for Review' : 'Flag Question'}
                </button>
              </div>

              {/* Prompt */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed font-heading">
                  {currentQ.prompt || currentQ.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {((currentQ.options || []).map((opt, optIdx) =>
                  typeof opt === 'string' ? { id: String(optIdx), text: opt } : opt
                )).map((opt, i) => {
                  const isSelected = (selectedAnswers[currentQ.id] || []).includes(opt.id);
                  const isMulti = currentQ.type === 'multiple_select';

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(currentQ.id, opt.id, isMulti)}
                      className={`p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'border-slate-300 dark:border-slate-600 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>

                      <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                        {opt.text}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Nav buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-40 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentQuestionIdx < quiz.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-md"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Finish & Submit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Question Palette Drawer: 4 cols */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Question Palette
                </h3>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {answeredCount}/{quiz.questions.length} Answered
                </span>
              </div>

              {/* Progress */}
              <ProgressBar
                value={answeredCount}
                max={quiz.questions.length}
                showPercent={false}
                size="sm"
                variant="primary"
              />

              {/* Question Number Badges Grid */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {quiz.questions.map((q, i) => {
                  const isCurrent = currentQuestionIdx === i;
                  const isAnswered = !!selectedAnswers[q.id]?.length;
                  const isFlagged = !!flaggedQuestions[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(i)}
                      className={`relative h-10 rounded-xl text-xs font-bold transition-all flex items-center justify-center border ${
                        isCurrent
                          ? 'ring-2 ring-indigo-600 border-indigo-600 bg-indigo-600 text-white'
                          : isAnswered
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {i + 1}
                      {isFlagged && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600" />
                  <span>Current Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>Flagged for Review</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
