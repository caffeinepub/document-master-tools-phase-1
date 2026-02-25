import React from 'react';
import { X, Check, Lock, Zap, Crown } from 'lucide-react';
import { useProAccess } from '@/hooks/useProAccess';

interface ProPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const features = [
  { label: 'Fixes per day', free: '2', pro: 'Unlimited' },
  { label: 'Export quality', free: 'Standard', pro: 'HD' },
  { label: 'Watermark on export', free: 'Yes', pro: 'No' },
  { label: 'A4 printable sheet', free: 'No', pro: 'Yes' },
  { label: 'Advanced enhancements', free: 'No', pro: 'Yes' },
  { label: 'Multi-photo sheet export', free: 'No', pro: 'Yes' },
];

export default function ProPricingModal({ isOpen, onClose }: ProPricingModalProps) {
  const { activatePro } = useProAccess();

  const handleActivate = () => {
    activatePro();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ animation: 'scaleIn 0.2s ease-out' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/15 mb-3">
              <Crown className="w-7 h-7 text-amber-500" />
            </div>
            <h2 id="pro-modal-title" className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Unlock Smart Document Fixer Pro
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Get unlimited fixes, HD exports, A4 printable sheets, and more.
            </p>
          </div>

          {/* Feature Comparison Table */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium border-b border-border">Feature</th>
                  <th className="text-center py-3 px-4 text-muted-foreground font-medium border-b border-border">Free</th>
                  <th className="text-center py-3 px-4 font-semibold border-b border-border">
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                      <Crown className="w-3.5 h-3.5" />
                      Pro
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={feature.label}
                    className={idx % 2 === 0 ? 'bg-muted/20' : ''}
                  >
                    <td className="py-3 px-4 text-foreground font-medium">{feature.label}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">
                      {feature.free === 'No' ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive/15 text-destructive">
                          <X className="w-3 h-3" />
                        </span>
                      ) : feature.free === 'Yes' ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/15 text-amber-600">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span>{feature.free}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.pro === 'No' ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive/15 text-destructive">
                          <X className="w-3 h-3" />
                        </span>
                      ) : feature.pro === 'Yes' ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
                          <Check className="w-3 h-3" />
                        </span>
                      ) : (
                        <span className="font-semibold text-green-600 dark:text-green-400">{feature.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Monthly Plan */}
            <div className="border border-border rounded-xl p-5 flex flex-col gap-3 hover:border-amber-500/50 transition-colors">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Monthly Plan</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">₹499</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  Unlimited fixes per day
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  HD export quality
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  No watermark
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  A4 printable sheet
                </li>
              </ul>
              <button
                onClick={handleActivate}
                className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Activate Pro (Demo)
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="border-2 border-amber-500/60 rounded-xl p-5 flex flex-col gap-3 relative bg-amber-500/5">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                  Save ~33%
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Yearly Plan</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">₹3,999</span>
                  <span className="text-muted-foreground text-sm">/year</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">≈ ₹333/month</p>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground flex-1">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  Everything in Monthly
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  Multi-photo sheet export
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  Advanced enhancements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  Priority support
                </li>
              </ul>
              <button
                onClick={handleActivate}
                className="w-full py-2.5 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                Activate Pro (Demo)
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-muted-foreground">
            <Lock className="w-3 h-3 inline mr-1" />
            Demo only — no real payment processed. This simulates Pro access for UI testing.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
