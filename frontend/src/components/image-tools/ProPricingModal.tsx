import { X, Check, Crown, Zap, Star } from 'lucide-react';
import { useProAccess } from '../../hooks/useProAccess';

interface ProPricingModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export default function ProPricingModal({ isOpen = true, onClose }: ProPricingModalProps) {
  const { activatePro } = useProAccess();

  const handleActivate = () => {
    activatePro();
    onClose();
  };

  if (!isOpen) return null;

  const features = [
    { label: 'AI Document Enhancement', free: false, pro: true },
    { label: 'Unlimited Daily Fixes', free: '2/day', pro: 'Unlimited' },
    { label: 'Multi-Copy Layout', free: false, pro: true },
    { label: 'A4 PDF Printable Export', free: false, pro: true },
    { label: 'Multi-Photo Sheet', free: false, pro: true },
    { label: 'Watermark-Free Output', free: false, pro: true },
    { label: 'Priority Processing', free: false, pro: true },
    { label: 'Pro Active Badge', free: false, pro: true },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl font-bold text-white">AI Document Enhancer Pro</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white">Monthly</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">₹399</div>
            <div className="text-gray-400 text-sm mb-4">per month</div>
            <button
              onClick={handleActivate}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Activate Monthly
            </button>
          </div>

          <div className="bg-amber-900/20 rounded-xl p-5 border border-amber-500/50 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
              BEST VALUE
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span className="font-semibold text-white">Yearly</span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">₹3,000</div>
            <div className="text-amber-400 text-sm mb-4">per year — Save 37%</div>
            <button
              onClick={handleActivate}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Activate Yearly
            </button>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Feature Comparison
          </h3>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            <div className="grid grid-cols-3 bg-gray-800/50 px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              <span>Feature</span>
              <span className="text-center">Free</span>
              <span className="text-center text-amber-400">Pro</span>
            </div>
            {features.map((feature, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 px-4 py-3 text-sm border-t border-gray-800 ${
                  i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-900/50'
                }`}
              >
                <span className="text-gray-300">{feature.label}</span>
                <span className="text-center">
                  {feature.free === false ? (
                    <span className="text-gray-600">—</span>
                  ) : (
                    <span className="text-gray-400">{feature.free}</span>
                  )}
                </span>
                <span className="text-center">
                  {feature.pro === true ? (
                    <Check className="w-4 h-4 text-green-400 mx-auto" />
                  ) : (
                    <span className="text-green-400">{feature.pro}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 text-center text-xs text-gray-600">
          Demo activation only. No real payment is processed.
        </div>
      </div>
    </div>
  );
}
