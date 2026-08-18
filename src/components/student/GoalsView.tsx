import React, { useState } from 'react';
import {
  Target,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  Trash2,
  TrendingUp,
  Award
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { ProgressBar } from '../common/ProgressBar';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const GoalsView: React.FC = () => {
  const {
    goals,
    currentUser,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    showToast
  } = useLMS();

  const userGoals = goals.filter(g => g.userId === currentUser.id);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('2026-09-30');
  const [newTargetMetric, setNewTargetMetric] = useState('Complete 4 core modules and score 90%+ on midterm');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addGoal({
      title: newTitle,
      targetDate: newTargetDate,
      targetMetric: newTargetMetric
    });

    setIsAddOpen(false);
    setNewTitle('');
    showToast('success', 'Goal Created', 'New learning goal added to your dashboard.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Learning Goals & Objectives
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Set ambitious study targets, track completion milestones, and maintain learning consistency
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          Create New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userGoals.map(goal => (
          <div
            key={goal.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Target className="w-6 h-6" />
                </div>
                <Badge size="sm" variant={goal.isCompleted ? 'success' : 'info'}>
                  {goal.isCompleted ? 'Completed' : `${goal.progressPercentage}% Done`}
                </Badge>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {goal.title}
                </h3>
                {goal.targetMetric && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {goal.targetMetric}
                  </p>
                )}
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{goal.progressPercentage}%</span>
                </div>
                <ProgressBar
                  value={goal.progressPercentage}
                  showPercent={false}
                  size="md"
                  variant={goal.isCompleted ? 'success' : 'primary'}
                />
              </div>

              {/* Interactive progress stepper */}
              {!goal.isCompleted && (
                <div className="flex items-center gap-1.5 pt-1">
                  {[25, 50, 75, 100].map(pct => (
                    <button
                      key={pct}
                      onClick={() => updateGoalProgress(goal.id, pct)}
                      className={`flex-1 py-1 text-[11px] font-bold rounded-lg border transition-colors ${
                        goal.progressPercentage >= pct
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800'
                          : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Target: {goal.targetDate}
              </span>
              <button
                onClick={() => deleteGoal(goal.id)}
                className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE GOAL MODAL */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        maxWidth="md"
        title="Set Learning Goal"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Goal Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Linear Algebra Eigenvectors"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Completion Date
            </label>
            <input
              type="date"
              required
              value={newTargetDate}
              onChange={e => setNewTargetDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Specific Target Metric / Criteria
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Complete 5 practice exams, achieve >90% on homework"
              value={newTargetMetric}
              onChange={e => setNewTargetMetric(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Add Goal
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
