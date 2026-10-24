import React from 'react';
import { useProgress } from '../../context/ProgressContext';
import { Trophy, Crown, Sparkles, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useProgress();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-[#E8DEC4] rounded-[24px] p-4 shadow-soft-lg flex items-start gap-3.5 transition-all duration-300 animate-slide-up"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#DFF59B] text-[#2E5A14] flex items-center justify-center shrink-0 shadow-sm">
              {toast.type === 'level' ? (
                <Crown className="w-5 h-5 text-[#2E5A14]" />
              ) : toast.type === 'achievement' ? (
                <Trophy className="w-5 h-5 text-[#2E5A14]" />
              ) : (
                <Sparkles className="w-5 h-5 text-[#2E5A14]" />
              )}
            </div>

            <div className="flex-1 pr-2">
              <h4 className="text-sm font-bold font-serif-editorial text-[#1D1A33] leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-[#5A5672] mt-1 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#5A5672] hover:text-[#1D1A33] p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
