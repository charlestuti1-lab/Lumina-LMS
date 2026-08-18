import React, { useState } from 'react';
import {
  Award,
  Download,
  Share2,
  CheckCircle2,
  Printer,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { useLMS } from '../../context/LMSContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Certificate } from '../../types';

export const CertificatesView: React.FC = () => {
  const {
    certificates,
    courses,
    currentUser,
    showToast
  } = useLMS();

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const userCerts = certificates.filter(c => c.userId === currentUser.id);

  const handleShare = (cert: Certificate) => {
    navigator.clipboard?.writeText(`https://edupulse.academy/verify/${cert.certificateNumber}`);
    showToast('success', 'Verification Link Copied', 'Certificate public verification link copied to clipboard.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
            Certificates of Completion & Credentials
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official verifiable credentials issued upon 100% course completion and assessment mastery
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge size="lg" variant="success" dot>
            {userCerts.length} Verified Certificates
          </Badge>
        </div>
      </div>

      {/* Certificate Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCerts.map(cert => (
          <div
            key={cert.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/60">
                  <Award className="w-8 h-8" />
                </div>
                <Badge size="sm" variant="success">
                  Verified Official
                </Badge>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Certificate of Mastery
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {cert.courseTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Recipient: <span className="font-semibold text-slate-800 dark:text-slate-200">{cert.studentName}</span>
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-500 space-y-1">
                <div className="flex justify-between">
                  <span>Credential ID:</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{cert.certificateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Issued Date:</span>
                  <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Instructor:</span>
                  <span className="text-slate-700 dark:text-slate-300">{cert.instructorName}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedCert(cert)}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                View Certificate
              </button>
              <button
                onClick={() => handleShare(cert)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-colors"
                title="Share Verification Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DETAILED PRINTABLE CERTIFICATE MODAL */}
      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        maxWidth="4xl"
      >
        {selectedCert && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 print:hidden">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Cryptographically Verified Academic Certificate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
                <button
                  onClick={() => handleShare(selectedCert)}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </button>
              </div>
            </div>

            {/* PRESTIGIOUS CERTIFICATE CANVAS */}
            <div className="relative p-10 sm:p-14 bg-gradient-to-br from-amber-50/60 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 border-8 border-double border-amber-600/40 rounded-3xl shadow-2xl text-center space-y-6 overflow-hidden">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-600/60" />
              <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-600/60" />
              <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-600/60" />
              <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-600/60" />

              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20">
                <GraduationCap className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">
                  Pacific Institute of Technology • EduPulse Academic System
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                  Certificate of Course Mastery
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                This certifies that the recipient has successfully met all curriculum requirements, completed all rigorous laboratory assignments, and demonstrated conceptual mastery in:
              </p>

              <div className="py-2">
                <h3 className="text-xl sm:text-3xl font-black font-heading text-indigo-600 dark:text-indigo-400 tracking-tight">
                  {selectedCert.courseTitle}
                </h3>
                <span className="text-xs text-slate-500 block mt-1">Conferred upon</span>
                <h4 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 border-b-2 border-slate-300 dark:border-slate-700 inline-block px-8 pb-1">
                  {selectedCert.studentName}
                </h4>
              </div>

              {/* Signatures and Seal */}
              <div className="grid grid-cols-3 gap-4 pt-6 items-end">
                <div className="text-center">
                  <div className="font-serif italic text-base text-slate-800 dark:text-slate-200 border-b border-slate-400 pb-1">
                    {selectedCert.instructorName}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                    Course Instructor
                  </span>
                </div>

                {/* Golden Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/10 border-4 border-amber-500 flex items-center justify-center text-amber-600 shadow-md">
                    <Award className="w-8 h-8" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 font-bold mt-1">
                    OFFICIAL SEAL
                  </span>
                </div>

                <div className="text-center">
                  <div className="font-mono text-xs text-slate-800 dark:text-slate-200 border-b border-slate-400 pb-1">
                    {new Date(selectedCert.issueDate).toLocaleDateString()}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">
                    Date of Conferral
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                <span>Credential Verification ID: {selectedCert.certificateNumber}</span>
                <span>Verify at edupulse.academy/verify</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
