import React, { useState } from 'react';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  Award,
  User,
  Sparkles,
  FileText
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';

export const TeacherGradingView: React.FC = () => {
  const {
    submissions,
    assignments,
    gradeSubmission,
    currentUser,
    showToast
  } = useLMS();

  const [selectedSubId, setSelectedSubId] = useState<string | null>(submissions[0]?.id || null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');

  const selectedSubmission = submissions.find(
    s => s.id === (selectedSubId || submissions[0]?.id)
  );
  const selectedAssignment = assignments.find(
    a => a.id === selectedSubmission?.assignmentId
  );

  // Grade form state
  const [gradeScore, setGradeScore] = useState<number>(selectedSubmission?.grade || 92);
  const [feedback, setFeedback] = useState<string>(selectedSubmission?.feedback || 'Outstanding implementation! Clean algorithmic structure and excellent time complexity analysis.');

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubmission) return;

    gradeSubmission(selectedSubmission.id, Number(gradeScore), feedback);
  };

  const filteredSubmissions = submissions.filter(s => {
    if (filter === 'pending' && s.status === 'graded') return false;
    if (filter === 'graded' && s.status !== 'graded') return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Instructor Grading & Rubric Evaluation
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review student submissions, evaluate against grading rubrics, and provide constructive feedback
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl w-fit">
        {[
          { id: 'all', label: 'All Submissions' },
          { id: 'pending', label: 'Pending Review' },
          { id: 'graded', label: 'Graded' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id as any)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === t.id
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Split Screen: Submissions list (5 cols) + Evaluation workspace (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Submissions list */}
        <div className="lg:col-span-5 space-y-3">
          {filteredSubmissions.map(sub => {
            const asg = assignments.find(a => a.id === sub.assignmentId);
            const isSelected = selectedSubmission?.id === sub.id;

            return (
              <div
                key={sub.id}
                onClick={() => {
                  setSelectedSubId(sub.id);
                  setGradeScore(sub.grade || 90);
                  setFeedback(sub.feedback || '');
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {sub.studentName}
                    </h4>
                    <span className="text-[11px] text-indigo-600 dark:text-indigo-400 block truncate mt-0.5">
                      {asg?.title}
                    </span>
                  </div>

                  <Badge
                    size="sm"
                    variant={sub.status === 'graded' ? 'success' : 'warning'}
                  >
                    {sub.status === 'graded' ? `${sub.grade} pts` : 'Needs Grade'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Turned in {new Date(sub.submittedAt).toLocaleDateString()}</span>
                  <span>Max: {asg?.maxPoints} pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Evaluation Panel */}
        {selectedSubmission && selectedAssignment && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {selectedAssignment.title}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading mt-1">
                  Student: {selectedSubmission.studentName}
                </h3>
                <span className="text-xs text-slate-500">
                  Submitted on {new Date(selectedSubmission.submittedAt).toLocaleString()}
                </span>
              </div>

              <Badge
                size="lg"
                variant={selectedSubmission.status === 'graded' ? 'success' : 'warning'}
              >
                {selectedSubmission.status === 'graded' ? 'Graded' : 'Pending Evaluation'}
              </Badge>
            </div>

            {/* Student's Submission Content */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Student Work / Code Solution
              </h4>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {selectedSubmission.content || 'Submission contains attached solution file.'}
              </div>
            </div>

            {/* Rubric Criteria */}
            {selectedAssignment.rubric && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Rubric Assessment Checklist
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedAssignment.rubric.map(r => (
                    <div
                      key={r.id}
                      className="p-3 bg-slate-50/50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {r.criteria}
                        </span>
                        <p className="text-[11px] text-slate-500">{r.description}</p>
                      </div>
                      <span className="font-bold text-indigo-600 shrink-0">
                        {r.maxPoints} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Teacher Grading Form */}
            <form onSubmit={handleGrade} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Numeric Score (Max {selectedAssignment.maxPoints} Points)
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  max={selectedAssignment.maxPoints}
                  value={gradeScore}
                  onChange={e => setGradeScore(Number(e.target.value))}
                  className="w-40 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Qualitative Feedback & Guidance
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Provide constructive feedback on what the student excelled at and areas for improvement..."
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Save & Publish Grade
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
