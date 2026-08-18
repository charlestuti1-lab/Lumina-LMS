import React, { useState } from 'react';
import {
  FileCheck,
  Clock,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Award,
  Send,
  Eye,
  X,
  MessageSquare,
  Search
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { AssignmentSubmission } from '../../types';

export const AssignmentsView: React.FC = () => {
  const {
    assignments,
    courses,
    submissions,
    currentUser,
    submitAssignment,
    activeAssignmentId,
    setActiveAssignmentId,
    showToast
  } = useLMS();

  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [search, setSearch] = useState('');
  const [selectedAsgId, setSelectedAsgId] = useState<string | null>(activeAssignmentId || null);

  // Form submission modal state
  const [submissionModalOpen, setSubmissionModalOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<'text' | 'file' | 'link'>('text');
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('algorithm_hw_solution.py');
  const [fileUrl, setFileUrl] = useState('https://storage.cloud.google.com/edupulse-submissions/hw.py');

  const selectedAssignment = assignments.find(
    a => a.id === (selectedAsgId || activeAssignmentId || assignments[0]?.id)
  );

  const selectedCourse = courses.find(c => c.id === selectedAssignment?.courseId);

  const userSubmission = submissions.find(
    s => s.assignmentId === selectedAssignment?.id && s.userId === currentUser.id
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment) return;

    submitAssignment(selectedAssignment.id, {
      textSubmission: textContent || 'Attached file submission',
      files: submissionType === 'file' ? [{
        name: fileName || 'assignment_submission.pdf',
        url: fileUrl || '#',
        size: '245 KB'
      }] : undefined
    });

    setSubmissionModalOpen(false);
    setTextContent('');
  };

  const filteredAssignments = assignments.filter(asg => {
    const sub = submissions.find(
      s => s.assignmentId === asg.id && s.userId === currentUser.id
    );
    const isSubmitted = !!sub;
    const isGraded = sub?.status === 'graded';

    if (filter === 'pending' && isSubmitted) return false;
    if (filter === 'submitted' && (!isSubmitted || isGraded)) return false;
    if (filter === 'graded' && !isGraded) return false;

    if (search) {
      const q = search.toLowerCase();
      return (
        asg.title.toLowerCase().includes(q) ||
        asg.instructions.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Assignments & Homework
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Submit laboratory solutions, upload homework files, view rubrics, and review instructor grading feedback
        </p>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-full sm:w-auto">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'pending', label: 'To Do (Pending)' },
            { id: 'submitted', label: 'Under Review' },
            { id: 'graded', label: 'Graded' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id as any)}
              className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filter === t.id
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Main Split View: List on Left, Detail & Submission on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List: 5 cols */}
        <div className="lg:col-span-5 space-y-3">
          {filteredAssignments.map(asg => {
            const course = courses.find(c => c.id === asg.courseId);
            const sub = submissions.find(
              s => s.assignmentId === asg.id && s.userId === currentUser.id
            );
            const isSelected = selectedAssignment?.id === asg.id;

            return (
              <div
                key={asg.id}
                onClick={() => setSelectedAsgId(asg.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-500 shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block truncate">
                      {course?.title}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">
                      {asg.title}
                    </h3>
                  </div>

                  <Badge
                    size="sm"
                    variant={
                      sub?.status === 'graded'
                        ? 'success'
                        : sub
                        ? 'info'
                        : 'warning'
                    }
                  >
                    {sub?.status === 'graded'
                      ? `${sub.grade}/${asg.maxPoints} pts`
                      : sub
                      ? 'Submitted'
                      : 'Pending'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Due: {new Date(asg.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                  <span>Max: {asg.maxPoints} Pts</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail & Actions: 7 cols */}
        {selectedAssignment && (
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {selectedCourse?.title}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-1">
                  {selectedAssignment.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>Due: {new Date(selectedAssignment.dueDate).toLocaleString()}</span>
                  <span>•</span>
                  <span>Max Points: {selectedAssignment.maxPoints}</span>
                </div>
              </div>

              {!userSubmission ? (
                <button
                  onClick={() => setSubmissionModalOpen(true)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-2 shrink-0"
                >
                  <UploadCloud className="w-4 h-4" />
                  Submit Work
                </button>
              ) : (
                <Badge size="lg" variant={userSubmission.status === 'graded' ? 'success' : 'info'} dot>
                  {userSubmission.status === 'graded' ? 'Graded' : 'Turned In'}
                </Badge>
              )}
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Instructions & Prompt
              </h3>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-wrap">
                {selectedAssignment.instructions}
              </div>
            </div>

            {/* Rubric Breakdown */}
            {selectedAssignment.rubric && selectedAssignment.rubric.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Grading Rubric
                </h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                  {selectedAssignment.rubric.map(item => (
                    <div key={item.id} className="p-3 flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          {item.criteria}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {item.description}
                        </span>
                      </div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 shrink-0">
                        {item.maxPoints} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submission Status & Feedback Box */}
            {userSubmission && (
              <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/60 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        Your Submission
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        Turned in on {new Date(userSubmission.submittedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {userSubmission.grade !== undefined && (
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                        {userSubmission.grade} / {selectedAssignment.maxPoints}
                      </span>
                      <span className="text-[10px] text-slate-500 block">Final Score</span>
                    </div>
                  )}
                </div>

                {userSubmission.content && (
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {userSubmission.content}
                  </div>
                )}

                {/* Teacher Feedback */}
                {userSubmission.feedback && (
                  <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                        Instructor Feedback:
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-200 leading-relaxed">
                      "{userSubmission.feedback}"
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* SUBMISSION MODAL */}
      <Modal
        isOpen={submissionModalOpen}
        onClose={() => setSubmissionModalOpen(false)}
        maxWidth="lg"
        title={`Submit Work: ${selectedAssignment?.title}`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              type="button"
              onClick={() => setSubmissionType('text')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                submissionType === 'text'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Text / Code Entry
            </button>
            <button
              type="button"
              onClick={() => setSubmissionType('file')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                submissionType === 'file'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              File Upload (.py, .pdf, .zip)
            </button>
          </div>

          {submissionType === 'text' ? (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Your Answer / Code Solution
              </label>
              <textarea
                required
                rows={8}
                placeholder="Type your solution, write code, or explain your methodology..."
                value={textContent}
                onChange={e => setTextContent(e.target.value)}
                className="w-full p-3 font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl text-center space-y-3">
              <UploadCloud className="w-10 h-10 text-indigo-600 mx-auto" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Drop your files here or browse
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Accepts PDF, PY, ZIP, DOCX up to 50MB
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                <FileText className="w-3.5 h-3.5" />
                <span>{fileName} (Ready)</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setSubmissionModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              Confirm & Turn In
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
