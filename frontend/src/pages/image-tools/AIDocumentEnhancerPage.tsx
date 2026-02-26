import { useState } from 'react';
import { Crown, Lock, Sparkles, Zap, FileText, Image, Star } from 'lucide-react';
import SEO from '../../components/SEO';
import BreadcrumbNavigation from '../../components/BreadcrumbNavigation';
import BackToHomeButton from '../../components/BackToHomeButton';
import { useProAccess } from '../../hooks/useProAccess';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import ProPricingModal from '../../components/image-tools/ProPricingModal';

interface AIDocumentEnhancerPageProps {
  onNavigate?: (path: string) => void;
}

export default function AIDocumentEnhancerPage({ onNavigate }: AIDocumentEnhancerPageProps) {
  const { isPro } = useProAccess();
  const { login, loginStatus, identity } = useInternetIdentity();
  const [showPricingModal, setShowPricingModal] = useState(false);
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Image Tools', path: '/image-tools' },
    { label: 'AI Document Enhancer' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SEO
        title="AI Document Enhancer - Pro Tool | Document Master Tools"
        description="Enhance your documents with AI-powered tools. Automatically improve image quality, fix lighting, remove noise, sharpen text, and produce office-ready documents. Pro subscription required. Available for government offices, corporate staff, and students worldwide."
        canonicalUrl="https://docmastertools.com/ai-document-enhancer"
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4">
          <BackToHomeButton onNavigate={onNavigate} />
        </div>
        <BreadcrumbNavigation items={breadcrumbItems} onNavigate={onNavigate} />

        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Document Enhancer</h1>
          <span className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-full text-sm font-bold">
            <Crown className="w-3.5 h-3.5" />
            PRO
          </span>
        </div>

        {isPro && isAuthenticated ? (
          // Pro user view
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 border border-green-700/50 rounded-lg w-fit">
              <Star className="w-4 h-4 text-green-400 fill-green-400" />
              <span className="text-green-400 font-semibold text-sm">Pro Active</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <Sparkles className="w-8 h-8 text-blue-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">AI Enhancement</h3>
                <p className="text-sm text-gray-400">Auto-fix lighting, contrast, and sharpness</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <FileText className="w-8 h-8 text-purple-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Text Clarity</h3>
                <p className="text-sm text-gray-400">Sharpen text for office-ready documents</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
                <Image className="w-8 h-8 text-green-400 mb-3" />
                <h3 className="font-semibold text-white mb-1">Noise Removal</h3>
                <p className="text-sm text-gray-400">Remove scan artifacts and noise</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 border-dashed text-center">
              <Zap className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <p className="text-gray-300 font-medium">Upload a document to enhance with AI</p>
              <p className="text-gray-500 text-sm mt-1">Supports JPG, PNG, PDF formats</p>
              <button className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors">
                Upload Document
              </button>
            </div>
          </div>
        ) : (
          // Gate view
          <div className="bg-gray-800 rounded-2xl border border-amber-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/20 px-6 py-8 text-center border-b border-amber-500/20">
              <Lock className="w-12 h-12 text-amber-400 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-white mb-2">Pro Feature</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                AI Document Enhancer is a premium tool. Login and subscribe to unlock AI-powered document enhancement.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="text-2xl font-bold text-white">₹399</div>
                  <div className="text-gray-400 text-sm">per month</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Enhancement</li>
                    <li className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-amber-400" /> Unlimited Documents</li>
                    <li className="flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-amber-400" /> Priority Processing</li>
                  </ul>
                </div>
                <div className="bg-amber-900/20 rounded-xl p-4 border border-amber-500/40">
                  <div className="text-2xl font-bold text-white">₹3,000</div>
                  <div className="text-amber-400 text-sm font-medium">per year — Save 37%</div>
                  <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
                    <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> All Monthly Features</li>
                    <li className="flex items-center gap-2"><Crown className="w-3.5 h-3.5 text-amber-400" /> Pro Badge</li>
                    <li className="flex items-center gap-2"><Star className="w-3.5 h-3.5 text-amber-400" /> Best Value</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!isAuthenticated ? (
                  <button
                    onClick={() => login()}
                    disabled={isLoggingIn}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white rounded-lg font-medium transition-colors min-h-[48px]"
                  >
                    {isLoggingIn ? 'Logging in...' : 'Login to Continue'}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowPricingModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium transition-colors min-h-[48px]"
                  >
                    <Crown className="w-4 h-4" />
                    Subscribe to Pro
                  </button>
                )}
                {isAuthenticated && (
                  <button
                    onClick={() => setShowPricingModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors min-h-[48px]"
                  >
                    View Plans
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {showPricingModal && (
        <ProPricingModal onClose={() => setShowPricingModal(false)} />
      )}
    </div>
  );
}
