import type React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const appId = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "docmastertools",
  );

  return (
    <footer className="bg-gray-900 border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/assets/generated/logo-transparent.dim_200x60.png"
                alt="DocMasterTools"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Document Master Tools — Your all-in-one platform for PDF, image,
              calculator, and resume tools. 100% free, 100% private, processed
              in your browser.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("calculators")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  {t("nav.calculators")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("pdf-tools")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  {t("nav.pdfTools")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("image-tools")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  {t("nav.imageTools")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("resume-builder")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  {t("nav.resumeBuilder")}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("smart-document-fixer")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Smart Document Fixer
                </button>
              </li>
              <li>
                <a
                  href="https://jobsindiaa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1"
                >
                  JobsIndiaa.com <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href="https://rjytotalmanpowers.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-1"
                >
                  RJY Total Manpowers.com <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">
              {t("footer.legal")}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  data-ocid="footer.sitemap.link"
                  onClick={() => onNavigate("sitemap")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Site Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("contact-us")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("about-us")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("privacy-policy")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("disclaimer")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("terms-and-conditions")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("dmca-policy")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  DMCA Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.verify_certificate.link"
                  onClick={() => onNavigate("verify-certificate")}
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Verify Certificate
                </button>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-bold text-base mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Built for students, professionals, and job seekers across India
              and the world. All tools run entirely in your browser — no data is
              ever uploaded to our servers.
            </p>
            <p className="text-gray-500 text-xs">
              Serving users across India with free, reliable document tools.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {currentYear} RJY TOTAL MANPOWERS SERVICES PRIVATE LIMITED. All
            Rights Reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with <span className="text-red-500">♥</span> using{" "}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
